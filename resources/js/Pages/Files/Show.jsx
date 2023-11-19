import CustomLink from "@/Components/CustomLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Show({ auth, file, mdRenderedHtml }) {
    const fileData = file.data;

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {fileData.name}
                        {fileData.extension}
                    </h2>
                    <div className="mt-2 flex items-center space-x-4">
                        <p>Created {fileData.created_at_humanized}</p>
                        <p>Updated {fileData.updated_at_humanized}</p>
                    </div>
                    <div className="mt-2 flex items-center space-x-4">
                        <CustomLink href={route("files.edit", fileData.hashid)}>
                            Edit File
                        </CustomLink>
                    </div>
                    <div className="mt-6 bg-white rounded-lg shadow p-4">
                        {fileData.extension === ".txt" ? (
                            <pre className="whitespace-pre-wrap">
                                {fileData.contents}
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
