import Container, { ContainerVariant } from "./Container";
import Link, { LinkSize, LinkVariant } from "./Link";
import NavLink from "./NavLink";

export default function AdminNavbar() {
    return (
        <Container
            variant={ContainerVariant.MaxWidth}
            extraClasses="flex items-center justify-between"
        >
            <nav className="flex justify-between">
                <div className="flex items-center space-x-4">
                    <NavLink
                        active={route().current("admin.settings.show")}
                        href={route("admin.settings.show")}
                    >
                        Settings
                    </NavLink>
                    <NavLink
                        active={route().current("admin.users.index")}
                        href={route("admin.users.index")}
                    >
                        Users
                    </NavLink>
                </div>
            </nav>

            {route().current("admin.users.create") ? null : (
                <Link
                    variant={LinkVariant.PrimaryButton}
                    size={LinkSize.Button.Medium}
                    href={route("admin.users.create")}
                >
                    Create New User
                </Link>
            )}
        </Container>
    );
}
