import Container, { ContainerVariant } from "@/Components/Container";
import Link, { LinkSize, LinkVariant } from "@/Components/Link";
import Text, { TextElement, TextVariant } from "@/Components/Text";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Index({ files }) {
    return (
        <AuthenticatedLayout>
            <Head title="My Files" />

            <Container
                variant={ContainerVariant.MaxWidth}
                extraClasses="space-y-6"
            >
                <Text variant={TextVariant.PageTitle} as={TextElement.H1}>
                    My Files
                </Text>

                <FilesTable files={files.data} />
            </Container>
        </AuthenticatedLayout>
    );
}

function FilesTable({ files }) {
    return (
        <div className="overflow-hidden rounded-lg w-full shadow">
            <table className="table-auto w-full">
                <thead className="bg-gray-50 text-left border-b border-gray-200">
                    <tr>
                        <th className="p-4">File Name</th>
                        <th className="p-4">Visibility</th>
                        <th className="p-4">Created</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {files.map((file) => (
                        <tr key={file.hashid} className="hover:bg-gray-50">
                            <td className="p-4 w-full">
                                <Link
                                    key={file.id}
                                    variant={LinkVariant.Content}
                                    size={LinkSize.Large}
                                    href={route("files.show", file.hashid)}
                                >
                                    {file.name}
                                </Link>
                            </td>
                            <td className="capitalize p-4 min-w-[12ch]">
                                {file.visibility}
                            </td>
                            <td className="p-4 min-w-[15ch]">
                                {file.created_at_humanized}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
