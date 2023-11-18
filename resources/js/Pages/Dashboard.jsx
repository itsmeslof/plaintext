import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth, recentFiles }) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {recentFiles.map((file) => (
                            <p key={file.id} className="p-6 text-gray-900">
                                {file.name}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
