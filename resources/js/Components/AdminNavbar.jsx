import Container, { ContainerVariant } from "./Container";
import NavLink from "./NavLink";

export default function AdminNavbar() {
    return (
        <Container variant={ContainerVariant.MaxWidth}>
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
        </Container>
    );
}
