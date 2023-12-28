import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Link, { LinkSize, LinkVariant } from "@/Components/Link";
import Text, { TextElement, TextVariant } from "@/Components/Text";
import Container, { ContainerVariant } from "@/Components/Container";
import CreateEditForm from "./Partials/CreateEditForm";

export default function Edit({ file }) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <Container
                variant={ContainerVariant.MaxWidth}
                extraClasses="space-y-6"
            >
                <div className="space-y-1">
                    <Link
                        variant={LinkVariant.Content}
                        size={LinkSize.Large}
                        href={route("files.show", file.hashid)}
                    >
                        Cancel
                    </Link>
                    <Text variant={TextVariant.PageTitle} as={TextElement.H1}>
                        Edit File
                    </Text>
                </div>

                <CreateEditForm file={file} />
            </Container>
        </AuthenticatedLayout>
    );
}
