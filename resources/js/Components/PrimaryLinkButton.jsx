import { Link } from "@inertiajs/react";

export default function PrimaryLinkButton({ children, ...props }) {
    return (
        <Link
            className="inline-flex items-center px-3 py-1 bg-sky-200 rounded font-semibold text-gray-700 shadow-sm hover:bg-sky-300 active:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition ease-in-out duration-150 underline hover:decoration-2"
            {...props}
        >
            {children}
        </Link>
    );
}
