import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function BaseLayout({ children }) {
    const flash = usePage().props.flash;

    useEffect(() => {
        if (flash?.status) toast.success(flash.status);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    return (
        <div>
            <Toaster />
            {children}
        </div>
    );
}
