import Text, { TextElement, TextVariant } from "@/Components/Text";
import Link, { LinkSize, LinkVariant } from "@/Components/Link";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Container, { ContainerVariant } from "@/Components/Container";

export default function Dashboard({ auth, recentFiles }) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <Container variant={ContainerVariant.MaxWidth}>
                <Text variant={TextVariant.PageTitle} as={TextElement.H1}>
                    Recent Files
                </Text>

                <Container extraClasses="mt-4 flex flex-col space-y-2">
                    {recentFiles.map((file) => (
                        <Link
                            key={file.id}
                            variant={LinkVariant.Content}
                            size={LinkSize.Large}
                            href={route("files.show", file.hashid)}
                        >
                            {file.name}
                        </Link>
                    ))}
                </Container>
            </Container>
        </AuthenticatedLayout>
    );
}
