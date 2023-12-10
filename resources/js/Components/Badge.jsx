export default function Badge({
    variant = BadgeVariant.None,
    extraClasses = "",
    children,
    ...props
}) {
    return (
        <span className={`${variant} ${extraClasses}`} {...props}>
            {children}
        </span>
    );
}

export const BadgeVariant = {
    None: "",
    Info: "rounded-full px-2 py-1 bg-gray-300 text-gray-600 font-medium",
};
