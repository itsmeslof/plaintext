import { useRef, useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import Button, { ButtonSize, ButtonVariant } from "@/Components/Button";
import Text, { TextElement, TextVariant } from "@/Components/Text";

export default function DeleteUserForm({ className = "" }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <Text variant={TextVariant.SectionTitle} as={TextElement.H2}>
                    Delete Account
                </Text>

                <Text
                    variant={TextVariant.Small}
                    as={TextElement.P}
                    extraClasses="mt-1"
                >
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Before deleting your account,
                    please download any data or information that you wish to
                    retain.
                </Text>
            </header>

            <Button
                variant={ButtonVariant.Danger}
                size={ButtonSize.Medium}
                type="button"
                onClick={confirmUserDeletion}
            >
                Delete Account
            </Button>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <Text
                        variant={TextVariant.SectionTitle}
                        as={TextElement.H2}
                    >
                        Are you sure you want to delete your account?
                    </Text>

                    <Text
                        variant={TextVariant.Small}
                        as={TextElement.P}
                        extraClasses="mt-1"
                    >
                        Once your account is deleted, all of its resources and
                        data will be permanently deleted. Please enter your
                        password to confirm you would like to permanently delete
                        your account.
                    </Text>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            extraClasses="block w-full"
                            isFocused
                            placeholder="Password"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button
                            variant={ButtonVariant.Secondary}
                            size={ButtonSize.Medium}
                            onClick={closeModal}
                        >
                            Cancel
                        </Button>

                        <Button
                            variant={ButtonVariant.Danger}
                            size={ButtonSize.Medium}
                            type="submit"
                            extraClasses="ms-3"
                            disabled={processing}
                        >
                            Delete Account
                        </Button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
