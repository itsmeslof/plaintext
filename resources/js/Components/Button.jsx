export const Variant = {
    Primary:
        "bg-sky-200 text-gray-700 border border-sky-200 hover:bg-sky-300 hover:border-sky-300 active:bg-sky-400 active:border-sky-400 focus:bg-sky-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2",
    Secondary:
        "bg-gray-200 text-gray-700 border border-gray-200 hover:bg-gray-300 hover:border-gray-300 active:bg-gray-400 active:border-gray-400 focus:bg-gray-400 focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2",
    Danger: "bg-rose-200 text-gray-700 border border-rose-200 hover:bg-rose-300 hover:border-rose-300 active:bg-rose-400 active:border-rose-400 focus:bg-rose-400 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2",
};

export const Size = {
    Small: "text-sm",
    Medium: "px-3 py-1 font-semibold",
    Large: "text-lg",
};

export default function Button({
    variant = "",
    size = Size.Medium,
    type = "button",
    extraClasses = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            className={`inline-flex items-center rounded shadow-sm disabled:opacity-25 transition ease-in-out duration-150 ${variant} ${size} ${extraClasses} ${
                disabled && "opacity-25"
            }`}
            type={type}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}
