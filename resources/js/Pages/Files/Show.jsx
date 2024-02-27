import Badge, { BadgeVariant } from "@/Components/Badge";
import Button, { ButtonSize, ButtonVariant } from "@/Components/Button";
import Container, { ContainerVariant } from "@/Components/Container";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Link, { LinkSize, LinkVariant } from "@/Components/Link";
import Modal from "@/Components/Modal";
import Text, { TextElement, TextVariant } from "@/Components/Text";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useRef, useState } from "react";

export default function Show({ file, mdRenderedHtml }) {
    const [confirmingFileDeletion, setConfirmingFileDeletion] = useState(false);
    const filenameInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        filename: "",
    });

    function confirmFileDeletion() {
        setConfirmingFileDeletion(true);
    }

    function deleteFile(e) {
        e.preventDefault();

        destroy(route("files.destroy", { file: file.hashid }), {
            onSuccess: () => closeModal(),
            onError: () => filenameInput.current.focus(),
            onFinish: () => reset(),
        });
    }

    function closeModal() {
        setConfirmingFileDeletion(false);
        reset();
    }

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <Container variant={ContainerVariant.MaxWidth}>
                <div className="flex items-center justify-between">
                    <div>
                        <Text
                            variant={TextVariant.PageTitle}
                            as={TextElement.H1}
                        >
                            {file.name}
                            {file.extension}
                        </Text>
                        <div className="mt-2 flex items-center space-x-4">
                            <Text
                                variant={TextVariant.Content}
                                as={TextElement.P}
                            >
                                Created {file.created_at_humanized}
                            </Text>
                            <Text
                                variant={TextVariant.Content}
                                as={TextElement.P}
                            >
                                Update {file.updated_at_humanized}
                            </Text>
                            <Badge variant={BadgeVariant.Info}>
                                Visibility:{" "}
                                <span className="capitalize">
                                    {file.visibility}
                                </span>
                            </Badge>
                        </div>
                        <div className="mt-2 flex items-center space-x-4">
                            <Link
                                variant={LinkVariant.Content}
                                size={LinkSize.Large}
                                href={route("files.edit", file.hashid)}
                            >
                                Edit File
                            </Link>
                            <Link
                                variant={LinkVariant.Content}
                                size={LinkSize.Large}
                                href={route("files.raw.show", {
                                    file: file.hashid,
                                })}
                            >
                                View Raw
                            </Link>
                        </div>
                    </div>

                    <Button
                        variant={ButtonVariant.Danger}
                        size={ButtonSize.Medium}
                        type="button"
                        onClick={confirmFileDeletion}
                    >
                        Delete File
                    </Button>

                    <Modal show={confirmingFileDeletion} onClose={closeModal}>
                        <form onSubmit={deleteFile} className="p-6">
                            <Text
                                variant={TextVariant.SectionTitle}
                                as={TextElement.H2}
                            >
                                Are you sure you want to delete{" "}
                                <Badge variant={BadgeVariant.Info}>
                                    {file.name}
                                    {file.extension}
                                </Badge>
                                ?
                            </Text>

                            <Text
                                variant={TextVariant.Small}
                                as={TextElement.P}
                                extraClasses="mt-1"
                            >
                                This action is permanent and the file's contents
                                can not be recovered once deleted.
                            </Text>

                            <Text
                                variant={TextVariant.Small}
                                as={TextElement.P}
                                extraClasses="mt-6"
                            >
                                Please enter{" "}
                                <Badge variant={BadgeVariant.Info}>
                                    {file.name}
                                    {file.extension}
                                </Badge>{" "}
                                to confirm.
                            </Text>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="filename"
                                    value="File name"
                                    className="sr-only"
                                />

                                <TextInput
                                    type="text"
                                    id="filename"
                                    name="filename"
                                    ref={filenameInput}
                                    value={data.filename}
                                    onChange={(e) =>
                                        setData("filename", e.target.value)
                                    }
                                    extraClasses="block w-full"
                                    isFocused
                                    placeholder="File name"
                                    autoComplete="off"
                                />

                                <InputError
                                    message={errors.delete_file}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-6 flex justify-end">
                                <Button
                                    variant={ButtonVariant.Secondary}
                                    size={ButtonSize.Medium}
                                    type="button"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    variant={ButtonVariant.Danger}
                                    size={ButtonSize.Medium}
                                    type="submit"
                                    extraClasses="ms-3"
                                    disabled={
                                        processing ||
                                        data.filename !==
                                            `${file.name}${file.extension}`
                                    }
                                >
                                    Delete File
                                </Button>
                            </div>
                        </form>
                    </Modal>
                </div>
                <div className="mt-6 bg-white rounded-lg shadow p-4">
                    {file.extension === ".md" ? (
                        <div
                            id="markdownOutput"
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{
                                __html: mdRenderedHtml,
                            }}
                        ></div>
                    ) : (
                        <pre className="whitespace-pre-wrap">
                            {file.contents}
                        </pre>
                    )}
                </div>
            </Container>
        </AuthenticatedLayout>
    );
}
