import Button, { ButtonSize, ButtonVariant } from "@/Components/Button";
import Container, { ContainerVariant } from "@/Components/Container";
import Link, { LinkVariant } from "@/Components/Link";
import Text, { TextElement, TextVariant } from "@/Components/Text";
import TextInput from "@/Components/TextInput";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";
import AccountDetails from "./Partials/AccountDetails";
import { useRef, useState } from "react";
import Modal from "@/Components/Modal";
import Badge, { BadgeVariant } from "@/Components/Badge";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";

export default function Show({ flash, auth: { user }, viewingUser }) {
    return (
        <AdminLayout flash={flash}>
            <Head title={`Manage User - ${viewingUser.username}`} />

            <Container
                variant={ContainerVariant.MaxWidth}
                extraClasses="space-y-6"
            >
                <div className="flex items-center space-x-6 justify-between">
                    <div className="flex items-center space-x-2">
                        <Text
                            variant={TextVariant.PageTitle}
                            as={TextElement.H2}
                        >
                            Manage User: <span>{viewingUser.username}</span>{" "}
                        </Text>
                    </div>
                    <Link
                        variant={LinkVariant.Content}
                        href={route("publicProfile.show", {
                            user: viewingUser.username,
                        })}
                    >
                        View {viewingUser.username}'s Public Profile
                    </Link>
                </div>

                <Container>
                    <AccountDetails user={viewingUser} />
                </Container>

                {user.username !== viewingUser.username ? (
                    <Container>
                        <DeleteUserForm user={viewingUser} />
                    </Container>
                ) : null}
            </Container>
        </AdminLayout>
    );
}

function DeleteUserForm({ user }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const usernameInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        username: "",
    });

    function confirmUserDeletion() {
        setConfirmingUserDeletion(true);
    }

    function deleteUser(e) {
        e.preventDefault();

        destroy(route("admin.users.destroy", { user: user.username }), {
            onSuccess: () => closeModal(),
            onError: () => usernameInput.current.focus(),
            onFinish: () => reset(),
        });
    }

    function closeModal() {
        setConfirmingUserDeletion(false);

        reset();
    }

    return (
        <section className="space-y-6">
            <header>
                <Text variant={TextVariant.SectionTitle} as={TextElement.H2}>
                    Delete User Account
                </Text>

                <div className="mt-4 bg-gray-100 border-l-4 rounded border-gray-300 p-4">
                    <ul className="list-disc list-inside">
                        <li>
                            <Text
                                variant={TextVariant.Content}
                                as={TextElement.Span}
                            >
                                Deleting a user's account will delete all of
                                their data, including all of their files. This
                                action is irreversible.
                            </Text>
                        </li>
                    </ul>
                </div>
            </header>

            <Button
                variant={ButtonVariant.Danger}
                size={ButtonSize.Medium}
                type="button"
                onClick={confirmUserDeletion}
            >
                Delete User Account
            </Button>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <Text
                        variant={TextVariant.SectionTitle}
                        as={TextElement.H2}
                    >
                        Are you sure you want to delete {`${user.username}'s`}{" "}
                        account?
                    </Text>

                    <Text
                        variant={TextVariant.Small}
                        as={TextElement.P}
                        extraClasses="mt-6"
                    >
                        Please enter{" "}
                        <Badge variant={BadgeVariant.Info}>
                            {user.username}
                        </Badge>{" "}
                        to confirm.
                    </Text>

                    <div className="mt-4">
                        <InputLabel
                            htmlFor="username"
                            value="Username"
                            className="sr-only"
                        />

                        <TextInput
                            type="text"
                            id="username"
                            name="username"
                            ref={usernameInput}
                            value={data.username}
                            onChange={(e) =>
                                setData("username", e.target.value)
                            }
                            extraClasses="block w-full"
                            isFocused
                            placeholder="Username"
                            autoComplete="off"
                        />

                        <InputError
                            message={errors.delete_user}
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
                                processing || data.username !== user.username
                            }
                        >
                            Delete User
                        </Button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
