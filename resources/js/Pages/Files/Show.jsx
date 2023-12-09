import Link, { LinkSize, LinkVariant } from "@/Components/Link";
import Text, { TextElement, TextVariant } from "@/Components/Text";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Show({ auth, file, mdRenderedHtml }) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
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
                        <Text
                            variant={TextVariant.Content}
                            as={TextElement.P}
                            extraClasses="rounded-full px-2 py-1 bg-gray-300"
                        >
                            Visibility:{" "}
                            <span className="capitalize">
                                {file.visibility}
                            </span>
                        </Text>
                    </div>
                    <div className="mt-2 flex items-center space-x-4">
                        <Link
                            variant={LinkVariant.Content}
                            size={LinkSize.Large}
                            href={route("files.edit", file.hashid)}
                        >
                            Edit File
                        </Link>
                    </div>
                    <div className="mt-6 bg-white rounded-lg shadow p-4">
                        {file.extension === ".txt" ? (
                            <pre className="whitespace-pre-wrap">
                                {file.contents}
                            </pre>
                        ) : (
                            <div
                                id="markdownOutput"
                                className="prose max-w-none"
                                dangerouslySetInnerHTML={{
                                    __html: mdRenderedHtml,
                                }}
                            ></div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
