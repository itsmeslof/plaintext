export default function Text({
    variant = TextVariant.None,
    as = TextElement.P,
    extraClasses = "",
    children,
    ...props
}) {
    const Element = as;
    return (
        <Element className={`${variant} ${extraClasses}`} {...props}>
            {children}
        </Element>
    );
}

export const TextVariant = {
    None: "",
    PageTitle: "text-gray-800 text-2xl font-semibold",
    SectionTitle: "text-gray-800 text-lg font-medium",
    Content: "text-gray-600 font-medium",
    Small: "text-sm text-gray-600",
    InputLabel: "text-sm text-gray-700 font-medium",
};

export const TextElement = {
    H1: "h1",
    H2: "h2",
    H3: "h3",
    H4: "h4",
    H5: "h5",
    H6: "h6",
    P: "p",
    Span: "span",
};
