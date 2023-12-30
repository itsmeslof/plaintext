import Container, { ContainerVariant } from "@/Components/Container";
import Text, { TextElement, TextVariant } from "@/Components/Text";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import EnableUserRegistrationForm from "./Partials/EnableUserRegistrationForm";
import ShowHomepageForm from "./Partials/ShowHomePageForm";

export default function Settings({ auth, settings }) {
    return (
        <AdminLayout>
            <Head title="Admin Settings" />

            <Container
                variant={ContainerVariant.MaxWidth}
                extraClasses="space-y-6"
            >
                <Text variant={TextVariant.PageTitle} as={TextElement.H1}>
                    Admin Settings
                </Text>

                <Container>
                    <EnableUserRegistrationForm
                        enable_user_registration={
                            settings.enable_user_registration
                        }
                    />
                </Container>

                <Container>
                    <ShowHomepageForm
                        show_home_page={settings.show_home_page}
                    />
                </Container>
            </Container>
        </AdminLayout>
    );
}
