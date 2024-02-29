import DashboardNavbar from "@/Components/DashboardNavbar";
import { usePage } from "@inertiajs/react";

export default function Authenticated({ children }) {
    const user = usePage().props.auth.user;

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="py-12 space-y-12">
                <DashboardNavbar user={user} />
                <main>{children}</main>
            </div>
        </div>
    );
}
