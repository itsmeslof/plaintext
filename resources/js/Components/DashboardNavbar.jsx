import { ButtonSize, ButtonVariant } from "./Button";
import Container, { ContainerVariant } from "./Container";
import Link, { LinkSize, LinkVariant } from "./Link";
import NavLink from "./NavLink";

export default function DashboardNavbar({ user }) {
    return (
        <Container variant={ContainerVariant.MaxWidth}>
            <nav className="flex justify-between">
                <div className="flex items-center space-x-4">
                    <NavLink
                        active={route().current("dashboard")}
                        href={route("dashboard")}
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        active={route().current("files.index")}
                        href="/files"
                    >
                        My Files
                    </NavLink>
                    <NavLink
                        active={route().current("profile.edit")}
                        href={route("profile.edit")}
                    >
                        Account Settings
                    </NavLink>
                </div>
                <div className="flex items-center space-x-4">
                    {user.is_admin ? (
                        <Link
                            variant={LinkVariant.SecondaryButton}
                            size={LinkSize.Button.Medium}
                            href={route("admin.settings.show")}
                        >
                            Admin Stuff
                        </Link>
                    ) : null}
                    <Link
                        variant={ButtonVariant.Secondary}
                        size={ButtonSize.Medium}
                        href={route("logout")}
                        method="post"
                        as="button"
                    >
                        Logout
                    </Link>
                    <Link
                        variant={LinkVariant.PrimaryButton}
                        size={LinkSize.Button.Medium}
                        href={route("files.create")}
                    >
                        Create A New File
                    </Link>
                </div>
            </nav>
        </Container>
    );
}
