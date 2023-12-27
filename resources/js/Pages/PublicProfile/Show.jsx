import Container, { ContainerVariant } from "@/Components/Container";
import Link, { LinkSize, LinkVariant } from "@/Components/Link";
import Pagination from "@/Components/Pagination";
import Text, { TextElement, TextVariant } from "@/Components/Text";
import GuestLayout from "@/Layouts/GuestLayout";
import FileSearchFilters from "@/Components/FileSearchFilters";
import { Head } from "@inertiajs/react";
import HeaderMessage from "./Partials/HeaderMessage";

export default function Show({ auth, publicUser, publicFiles }) {
    return (
        <GuestLayout>
            <Head title={`${publicUser.username}'s Profile`} />

            <Container
                variant={ContainerVariant.MaxWidth}
                extraClasses="space-y-6"
            >
                <HeaderMessage user={auth?.user} publicUser={publicUser} />

                <Text variant={TextVariant.PageTitle} as={TextElement.H1}>
                    {`${publicUser.username}'s Public Files`}
                </Text>

                <FileSearchFilters
                    submitRoute={route("publicProfile.show", {
                        user: publicUser.username,
                    })}
                />
                <FilesTable files={publicFiles.data} />
                <Pagination paginator={publicFiles} />
            </Container>
        </GuestLayout>
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
                                    href={route("publicProfile.files.show", {
                                        user: route().params.user,
                                        file: file.hashid,
                                    })}
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
