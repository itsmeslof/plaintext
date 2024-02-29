export default function Guest({ children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="py-12">
                <main>{children}</main>
            </div>
        </div>
    );
}
