import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import Button, { ButtonSize, ButtonVariant } from "@/Components/Button";
import Container, { ContainerVariant } from "@/Components/Container";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <Container
                variant={ContainerVariant.MaxWidth}
                extraClasses="flex justify-center"
            >
                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    <div className="mb-4 text-sm text-gray-600">
                        Forgot your password? No problem. Just let us know your
                        email address and we will email you a password reset
                        link that will allow you to choose a new one.
                    </div>

                    <form onSubmit={submit}>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            extraClasses="block w-full"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />

                        <div className="flex items-center justify-end mt-4">
                            <Button
                                variant={ButtonVariant.Primary}
                                size={ButtonSize.Medium}
                                type="submit"
                                extraClasses="ms-4"
                                disabled={processing}
                            >
                                Email Password Reset Link
                            </Button>
                        </div>
                    </form>
                </div>
            </Container>
        </GuestLayout>
    );
}
