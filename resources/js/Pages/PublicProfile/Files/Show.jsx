import Badge, { BadgeVariant } from "@/Components/Badge";
import Container, { ContainerVariant } from "@/Components/Container";
import Text, { TextElement, TextVariant } from "@/Components/Text";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import HeaderMessage from "../Partials/HeaderMessage";

export default function Show({ auth, publicUser, file, mdRenderedHtml }) {
    return (
        <GuestLayout>
            <Head title={`${publicUser.username}'s Profile`} />

            <Container variant={ContainerVariant.MaxWidth}>
                <HeaderMessage user={auth?.user} publicUser={publicUser} />

                <Text variant={TextVariant.PageTitle} as={TextElement.H1}>
                    {file.name}
                    {file.extension}
                </Text>
                <div className="mt-2 flex items-center space-x-4">
                    <Text variant={TextVariant.Content} as={TextElement.P}>
                        Created {file.created_at_humanized}
                    </Text>
                    <Text variant={TextVariant.Content} as={TextElement.P}>
                        Update {file.updated_at_humanized}
                    </Text>
                    <Badge variant={BadgeVariant.Info}>
                        Visibility:{" "}
                        <span className="capitalize">{file.visibility}</span>
                    </Badge>
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
        </GuestLayout>
    );
}
