export default function Container({
    variant = ContainerVariant.Default,
    extraClasses = "",
    children,
    ...props
}) {
    return (
        <div className={`${variant} ${extraClasses}`} {...props}>
            {children}
        </div>
    );
}

export const ContainerVariant = {
    Default: "p-4 sm:p-8 bg-white shadow sm:rounded-lg",
    MaxWidth: "max-w-7xl mx-auto sm:px-6 lg:px-8",
};
