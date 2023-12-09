import Link, { LinkSize, LinkVariant } from "@/Components/Link";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";

export default function Show({ auth, publicUser }) {
    return (
        <GuestLayout>
            <Head title="Dashboard" />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="flex items-center space-x-6">
                    {auth.user ? (
                        <Link
                            variant={LinkVariant.SecondaryButton}
                            size={LinkSize.Button.Medium}
                            href={route("dashboard")}
                        >
                            <span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    class="w-6 h-6 mr-2"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M7.28 7.72a.75.75 0 010 1.06l-2.47 2.47H21a.75.75 0 010 1.5H4.81l2.47 2.47a.75.75 0 11-1.06 1.06l-3.75-3.75a.75.75 0 010-1.06l3.75-3.75a.75.75 0 011.06 0z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </span>
                            My Dashboard
                        </Link>
                    ) : null}
                    <p className="text-gray-700 inline-flex gap-2">
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="w-6 h-6"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </span>
                        You are viewing {publicUser.username}'s public profile
                    </p>
                </div>

                <div className="mt-12 bg-white overflow-hidden shadow-sm sm:rounded-lg flex flex-col space-y-2 p-6">
                    {publicUser.public_files.map((file) => (
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
        </GuestLayout>
    );
}
