import Container, { ContainerVariant } from "@/Components/Container";
import Text, { TextElement, TextVariant } from "@/Components/Text";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CreateEditForm from "./Partials/CreateEditForm";

export default function Create() {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <Container
                variant={ContainerVariant.MaxWidth}
                extraClasses="space-y-6"
            >
                <Text variant={TextVariant.PageTitle} as={TextElement.H1}>
                    Create A New File
                </Text>

                <CreateEditForm />
            </Container>
        </AuthenticatedLayout>
    );
}
