import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import Container, { ContainerVariant } from "@/Components/Container";
import Text, { TextElement, TextVariant } from "@/Components/Text";
import Link, { LinkVariant } from "@/Components/Link";

export default function Edit({ auth, mustVerifyEmail, status }) {
    const user = auth.user;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <Container
                variant={ContainerVariant.MaxWidth}
                extraClasses="space-y-6"
            >
                <div className="flex items-center space-x-6 justify-between">
                    <Text variant={TextVariant.PageTitle} as={TextElement.H1}>
                        Account Settings
                    </Text>
                    <Link
                        variant={LinkVariant.Content}
                        href={route("publicProfile.show", {
                            user: user.username,
                        })}
                    >
                        View My Public Profile
                    </Link>
                </div>

                <Container>
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                    />
                </Container>

                <Container>
                    <UpdatePasswordForm className="max-w-xl" />
                </Container>

                <Container>
                    <DeleteUserForm className="max-w-xl" />
                </Container>
            </Container>
        </AuthenticatedLayout>
    );
}
