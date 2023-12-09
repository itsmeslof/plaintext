import Link, { LinkSize, LinkVariant } from "./Link";
import NavLink from "./NavLink";

export default function DashboardNavbar() {
    return (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <nav className="flex justify-between">
                <div className="flex items-center space-x-4">
                    <NavLink
                        active={route().current("dashboard")}
                        href={route("dashboard")}
                    >
                        Dashboard
                    </NavLink>
                    <NavLink href="/files">My Files</NavLink>
                    <NavLink
                        active={route().current("profile.edit")}
                        href={route("profile.edit")}
                    >
                        Manage Account
                    </NavLink>
                </div>
                <Link
                    variant={LinkVariant.PrimaryButton}
                    size={LinkSize.Button.Medium}
                    href={route("files.create")}
                >
                    Create A New File
                </Link>
            </nav>
        </div>
    );
}
