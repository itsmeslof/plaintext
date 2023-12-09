import Text, { TextElement, TextVariant } from "@/Components/Text";
import Link, { LinkSize, LinkVariant } from "@/Components/Link";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth, recentFiles }) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Text variant={TextVariant.PageTitle} as={TextElement.H1}>
                        Recent Files
                    </Text>

                    <div className="mt-4 bg-white overflow-hidden shadow-sm sm:rounded-lg flex flex-col space-y-2 p-6">
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
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
