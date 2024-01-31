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

const BASE_CLASSES = "rounded-full text-sm px-2 py-1 font-medium";

export const BadgeVariant = {
    None: "",
    Info: `${BASE_CLASSES} bg-gray-300 text-gray-700`,
    Sky: `${BASE_CLASSES} bg-sky-200 text-sky-700`,

    AccountStatus: {
        Verified: `${BASE_CLASSES} bg-emerald-200 text-emerald-700`,
        Unverified: `${BASE_CLASSES} bg-orange-200 text-orange-700`,
    },
};
