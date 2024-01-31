import Badge, { BadgeVariant } from "@/Components/Badge";
import Button, { ButtonSize, ButtonVariant } from "@/Components/Button";
import Container, { ContainerVariant } from "@/Components/Container";
import InputLabel from "@/Components/InputLabel";
import Link, { LinkSize, LinkVariant } from "@/Components/Link";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import Text, { TextElement, TextVariant } from "@/Components/Text";
import TextInput from "@/Components/TextInput";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    AccountRole,
    AccountStatus,
    OrderByFilter,
    valueOrDefault,
} from "@/utils";
import { Head, useForm } from "@inertiajs/react";

export default function Index({ users }) {
    return (
        <AdminLayout>
            <Head title="Manage Users" />

            <Container
                variant={ContainerVariant.MaxWidth}
                extraClasses="space-y-6"
            >
                <Text variant={TextVariant.PageTitle} as={TextElement.H2}>
                    Manage Users
                </Text>

                <UserSearchFilters submitRoute={route("admin.users.index")} />
                <UsersTable users={users.data} />
                <Pagination paginator={users} />
            </Container>
        </AdminLayout>
    );
}

function UserSearchFilters({ submitRoute }) {
    const queryParams = new URLSearchParams(window.location.search);

    const { data, setData, get } = useForm({
        query: queryParams.get("query") || "",
        account_status: valueOrDefault({
            value: queryParams.get("account_status") || "all",
            allowedValues: ["all", ...Object.values(AccountStatus)],
            defaultValue: "all",
        }),
        account_role: valueOrDefault({
            value: queryParams.get("account_role") || "all",
            allowedValues: ["all", ...Object.values(AccountRole)],
            defaultValue: "all",
        }),
        order_by: valueOrDefault({
            value: queryParams.get("order_by") || "newest",
            allowedValues: Object.values(OrderByFilter),
            defaultValue: OrderByFilter.Newest,
        }),
        order_by_column: valueOrDefault({
            value: queryParams.get("order_by_column") || null,
            allowedValues: ["username", "email"],
            defaultValue: "username",
        }),
    });

    function handleSubmit(e) {
        e.preventDefault();
        get(submitRoute);
    }

    function handleAccountStatusChange(e) {
        setData(
            "account_status",
            valueOrDefault({
                value: e.target.value,
                allowedValues: ["all", ...Object.values(AccountStatus)],
                defaultValue: "all",
            })
        );
    }

    function handleAccountRoleChange(e) {
        setData(
            "account_role",
            valueOrDefault({
                value: e.target.value,
                allowedValues: ["all", ...Object.values(AccountRole)],
                defaultValue: "all",
            })
        );
    }

    function handleOrderChange(e) {
        setData(
            "order_by",
            valueOrDefault({
                value: e.target.value,
                allowedValues: Object.values(OrderByFilter),
                defaultValue: OrderByFilter.Newest,
            })
        );
    }

    function handleOrderColumnChange(e) {
        setData(
            "order_by_column",
            valueOrDefault({
                value: e.target.value,
                allowedValues: ["username", "email"],
                defaultValue: "username",
            })
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex items-end space-x-4">
                <div>
                    <InputLabel
                        htmlFor="query"
                        value="Search by Username or Email"
                    />
                    <TextInput
                        id="query"
                        name="query"
                        type="text"
                        extraClasses="block"
                        placeholder="Search..."
                        value={data.query}
                        onChange={(e) => setData("query", e.target.value)}
                    />
                </div>

                <div>
                    <InputLabel
                        htmlFor="account_status"
                        value="Account Status"
                    />
                    <SelectInput
                        id="account_status"
                        name="account_status"
                        extraClasses="min-w-[140px]"
                        value={data.account_status}
                        onChange={handleAccountStatusChange}
                    >
                        <option value="all">All</option>
                        <option value="verified">Verified</option>
                        <option value="unverified">Unverified</option>
                    </SelectInput>
                </div>

                <div>
                    <InputLabel htmlFor="account_role" value="Account Role" />
                    <SelectInput
                        id="account_role"
                        name="account_role"
                        extraClasses="min-w-[140px]"
                        value={data.account_role}
                        onChange={handleAccountRoleChange}
                    >
                        <option value="all">All</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </SelectInput>
                </div>

                <div>
                    <InputLabel htmlFor="order_by" value="Order Results" />
                    <SelectInput
                        id="order_by"
                        name="order_by"
                        extraClasses="min-w-[140px]"
                        value={data.order_by}
                        onChange={handleOrderChange}
                    >
                        <option value={OrderByFilter.Newest}>
                            Newest First
                        </option>
                        <option value={OrderByFilter.Oldest}>
                            Oldest First
                        </option>
                        <option value={OrderByFilter.AtoZ}>A-Z</option>
                        <option value={OrderByFilter.ZtoA}>Z-A</option>
                    </SelectInput>
                </div>

                {[OrderByFilter.AtoZ, OrderByFilter.ZtoA].includes(
                    data.order_by
                ) ? (
                    <div>
                        <InputLabel
                            htmlFor="order_by_column"
                            value="Order By Column"
                        />
                        <SelectInput
                            id="order_by_column"
                            name="order_by_column"
                            extraClasses="min-w-[140px]"
                            value={data.order_by_column}
                            onChange={handleOrderColumnChange}
                        >
                            <option value="username">Username</option>
                            <option value="email">Email</option>
                        </SelectInput>
                    </div>
                ) : null}

                <Button
                    variant={ButtonVariant.Primary}
                    size={ButtonSize.Medium}
                    type="submit"
                >
                    Apply Filters
                </Button>

                <Link href={submitRoute} variant={LinkVariant.Content}>
                    Reset Filters
                </Link>
            </div>
        </form>
    );
}

function AccountStatusBadge({ user }) {
    const verified = user.email_verified_at;

    const verificationVariant = verified
        ? BadgeVariant.AccountStatus.Verified
        : BadgeVariant.AccountStatus.Unverified;

    const verificationText = verified ? "Verified" : "Unverified";

    return (
        <div className="flex items-center gap-2">
            <Badge variant={verificationVariant}>{verificationText}</Badge>
        </div>
    );
}

function UsersTable({ users }) {
    return (
        <div className="overflow-hidden rounded-lg w-full shadow">
            <table className="table-auto w-full">
                <thead className="bg-gray-50 text-left border-b border-gray-200">
                    <tr>
                        <th className="p-4">Username</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Account Status</th>
                        <th className="p-4">Account Role</th>
                        <th className="p-4">Registration Date</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                        <tr key={user.username} className="hover:bg-gray-50">
                            <td className="p-4 min-w-[25ch]">
                                <Link
                                    variant={LinkVariant.Content}
                                    size={LinkSize.Large}
                                    href={route("admin.users.show", {
                                        user: user.username,
                                    })}
                                >
                                    {user.username}
                                </Link>
                            </td>
                            <td className="p-4">{user.email}</td>
                            <td className="p-4">
                                <AccountStatusBadge user={user} />
                            </td>
                            <td className="p-4">
                                <Badge
                                    variant={
                                        user.is_admin
                                            ? BadgeVariant.Sky
                                            : BadgeVariant.Info
                                    }
                                >
                                    {user.is_admin ? "Admin" : "User"}
                                </Badge>
                            </td>
                            <td className="p-4">{user.created_at_fmt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
