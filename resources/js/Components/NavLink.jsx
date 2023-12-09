import Link, { LinkVariant } from "./Link";

export default function NavLink({ active = false, children, ...props }) {
    return (
        <Link
            variant={LinkVariant.NavLink}
            extraClasses={
                active
                    ? "text-sky-600"
                    : "text-gray-700 hover:text-sky-600 underline"
            }
            {...props}
        >
            {children}
        </Link>
    );
}
