import DashboardNavbar from "@/Components/DashboardNavbar";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Authenticated({ children }) {
    const user = usePage().props.auth.user;
    const flash = usePage().props.flash;

    useEffect(() => {
        if (flash?.status) toast.success(flash.status);
    }, [flash]);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="py-12 space-y-12">
                <DashboardNavbar user={user} />
                <main>{children}</main>
            </div>
        </div>
    );
}
