import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Guest({ children }) {
    const flash = usePage().props.flash;

    useEffect(() => {
        if (flash?.status) toast.success(flash.status);
    }, [flash]);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="py-12">
                <main>{children}</main>
            </div>
        </div>
    );
}
