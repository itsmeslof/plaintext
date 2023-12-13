import DashboardNavbar from "@/Components/DashboardNavbar";

export default function Authenticated({ children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="py-12 space-y-12">
                <DashboardNavbar />
                <main>{children}</main>
            </div>
        </div>
    );
}
