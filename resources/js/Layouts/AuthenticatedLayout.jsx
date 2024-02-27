import DashboardNavbar from "@/Components/DashboardNavbar";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Authenticated({ children }) {
    const user = usePage().props.auth.user;
    const flash = usePage().props.flash;

    useEffect(() => {
        /**
         * I really hate to do this, as it will remove the toast when navigating,
         * getting rid of that seamless SPA feel.
         * Without this, navigating to another view without a refresh will cause
         * the last dismissed toast to flicker on every navigation until reloading.
         * Don't have the time to figure out what's broken D:
         */
        toast.remove();
        if (flash?.status) toast.success(flash.status);
    }, [flash]);

    return (
        <div className="min-h-screen bg-gray-100">
            <Toaster />
            <div className="py-12 space-y-12">
                <DashboardNavbar user={user} />
                <main>{children}</main>
            </div>
        </div>
    );
}
