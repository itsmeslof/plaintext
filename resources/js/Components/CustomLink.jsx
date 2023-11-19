import { Link } from "@inertiajs/react";

export default function CustomLink({ extraClasses = "", children, ...props }) {
    return (
        <Link
            className={
                `text-sky-600 hover:text-sky-700 underline underline-offset-2 hover:decoration-2 focus:decoration-2 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition ease-in-out duration-150 ` +
                extraClasses
            }
            {...props}
        >
            {children}
        </Link>
    );
}
