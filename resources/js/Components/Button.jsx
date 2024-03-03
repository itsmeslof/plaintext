export default function Button({
    defaultClasses = "inline-flex items-center disabled:opacity-25 transition ease-in-out duration-150",
    variant = ButtonVariant.None,
    size = ButtonSize.Default,
    extraClasses = "",
    type = "button",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            className={`${defaultClasses} ${variant} ${size} ${extraClasses}`}
            disabled={disabled}
            type={type}
            {...props}
        >
            {children}
        </button>
    );
}

export const ButtonVariant = {
    None: "",
    Primary:
        "bg-sky-200 text-gray-700 border border-sky-200 hover:bg-sky-300 hover:border-sky-300 active:bg-sky-400 active:border-sky-400 focus-visible:bg-sky-400 focus-visible:border-sky-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 rounded shadow-sm",
    Secondary:
        "bg-gray-200 text-gray-700 border border-gray-200 hover:bg-gray-300 hover:border-gray-300 active:bg-gray-400 active:border-gray-400 focus-visible:bg-gray-400 focus-visible:border-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 rounded shadow-sm",
    Danger: "bg-rose-200 text-gray-700 border border-rose-200 hover:bg-rose-300 hover:border-rose-300 active:bg-rose-400 active:border-rose-400 focus-visible:bg-rose-400 focus-visible:border-rose-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 rounded shadow-sm",
};

export const ButtonSize = {
    Default: "",
    Medium: "px-3 py-1 font-semibold",
};
