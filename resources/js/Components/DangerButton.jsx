export default function DangerButton({
    type = "button",
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-3 py-1 bg-rose-200 rounded font-semibold text-gray-700 shadow-sm border border-rose-200 hover:border-rose-300 active:border-rose-400 hover:bg-rose-300 active:bg-rose-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
