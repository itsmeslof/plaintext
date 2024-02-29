import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import Button, { ButtonSize, ButtonVariant } from "@/Components/Button";
import Container, { ContainerVariant } from "@/Components/Container";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route("verification.send"));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <Container
                variant={ContainerVariant.MaxWidth}
                extraClasses="flex justify-center"
            >
                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                    <div className="mb-4 text-sm text-gray-600">
                        Thanks for signing up! Before getting started, could you
                        verify your email address by clicking on the link we
                        just emailed to you? If you didn't receive the email, we
                        will gladly send you another.
                    </div>

                    {status === "verification-link-sent" && (
                        <div className="mb-4 font-medium text-sm text-green-600">
                            A new verification link has been sent to the email
                            address you provided during registration.
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div className="mt-4 flex items-center justify-between">
                            <Button
                                variant={ButtonVariant.Primary}
                                size={ButtonSize.Medium}
                                type="submit"
                                disabled={processing}
                            >
                                Resend Verification Email
                            </Button>

                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Log Out
                            </Link>
                        </div>
                    </form>
                </div>
            </Container>
        </GuestLayout>
    );
}
