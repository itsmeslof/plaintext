import AdminNavbar from "@/Components/AdminNavbar";
import Container, { ContainerVariant } from "@/Components/Container";
import Link, { LinkSize, LinkVariant } from "@/Components/Link";

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="w-full bg-gray-700 p-3">
                <Container variant={ContainerVariant.MaxWidth}>
                    <div className="flex items-center space-x-4">
                        <Link
                            variant={LinkVariant.PrimaryButton}
                            size={LinkSize.Button.Medium}
                            href={route("dashboard")}
                        >
                            <span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6 mr-2"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7.28 7.72a.75.75 0 010 1.06l-2.47 2.47H21a.75.75 0 010 1.5H4.81l2.47 2.47a.75.75 0 11-1.06 1.06l-3.75-3.75a.75.75 0 010-1.06l3.75-3.75a.75.75 0 011.06 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                            My Dashboard
                        </Link>
                        <p className="font-medium text-lg text-gray-100">
                            Super Secret Admin Area
                        </p>
                    </div>
                </Container>
            </div>
            <div className="py-12 space-y-12">
                <AdminNavbar />
                <main>{children}</main>
            </div>
        </div>
    );
}
