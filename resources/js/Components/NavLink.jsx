import { Link } from "@inertiajs/react";

export default function NavLink({ active = false, children, ...props }) {
    return (
        <Link
            className={
                `focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition ease-in-out duration-150 text-lg font-semibold ` +
                (active
                    ? "text-sky-600"
                    : "text-gray-700 hover:text-sky-600 underline underline-offset-2 hover:decoration-2 focus:decoration-2")
            }
            {...props}
        >
            {children}
        </Link>
    );
}
