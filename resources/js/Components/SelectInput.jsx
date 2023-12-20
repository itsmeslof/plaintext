export default function SelectInput({ extraClasses = "", children, ...props }) {
    return (
        <select
            className={
                `mt-1 bg-gray-200 border-gray-200 focus:border-sky-500 focus:ring-sky-500 rounded font-semibold shadow-sm py-1 text-gray-700 pr-8 ` +
                extraClasses
            }
            {...props}
        >
            {children}
        </select>
    );
}
