import { Link as InertiaLink } from "@inertiajs/react";

export default function Link({
    defaultClasses = "transition ease-in-out duration-150",
    variant = LinkVariant.None,
    size = LinkSize.Default,
    extraClasses = "",
    pure = false,
    children,
    ...props
}) {
    const Element = pure ? 'a' : InertiaLink;

    return (
        <Element
            className={`${defaultClasses} ${variant} ${size} ${extraClasses}`}
            {...props}
        >
            {children}
        </Element>
    );
}

export const LinkVariant = {
    None: "",
    Content:
        "inline-flex text-sky-700 hover:text-sky-600 focus-visible:text-sky-500 underline hover:decoration-2 focus-visible:decoration-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2",
    NavLink:
        "text-lg font-semibold hover:decoration-2 focus-visible:decoration-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2",
    PrimaryButton:
        "inline-flex items-center bg-sky-200 text-gray-700 border border-sky-200 hover:bg-sky-300 hover:border-sky-300 active:bg-sky-400 active:border-sky-400 focus-visible:bg-sky-400 focus-visible:border-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 rounded shadow-sm underline hover:decoration-2 focus-visible:decoration-2",
    SecondaryButton:
        "inline-flex items-center bg-gray-200 text-gray-700 border border-gray-200 hover:bg-gray-300 hover:border-gray-300 active:bg-gray-400 active:border-gray-400 focus-visible:bg-gray-400 focus-visible:border-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 rounded shadow-sm underline hover:decoration-2 focus-visible:decoration-2",
};

export const LinkSize = {
    Default: "",
    Large: "text-lg",
    Button: {
        Medium: "px-3 py-1 font-semibold",
    },
};
