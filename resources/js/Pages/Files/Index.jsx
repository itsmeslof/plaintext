import Button, { ButtonSize, ButtonVariant } from "@/Components/Button";
import Container, { ContainerVariant } from "@/Components/Container";
import InputLabel from "@/Components/InputLabel";
import Link, { LinkSize, LinkVariant } from "@/Components/Link";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import Text, { TextElement, TextVariant } from "@/Components/Text";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { OrderByFilter, ResourceVisibility, valueOrDefault } from "@/utils";
import { Head, useForm } from "@inertiajs/react";

export default function Index({ files }) {
    return (
        <AuthenticatedLayout>
            <Head title="My Files" />

            <Container
                variant={ContainerVariant.MaxWidth}
                extraClasses="space-y-6"
            >
                <Text variant={TextVariant.PageTitle} as={TextElement.H1}>
                    My Files
                </Text>

                <Filters />
                <FilesTable files={files.data} />
                <Pagination paginator={files} />
            </Container>
        </AuthenticatedLayout>
    );
}

function Filters() {
    const queryParams = new URLSearchParams(window.location.search);

    const { data, setData, get } = useForm({
        query: queryParams.get("query") || "",
        visibility: valueOrDefault({
            value: queryParams.get("visibility") || "all",
            allowedValues: ["all", ...Object.values(ResourceVisibility)],
            defaultValue: "all",
        }),
        order_by: valueOrDefault({
            value: queryParams.get("order_by") || "newest",
            allowedValues: Object.values(OrderByFilter),
            defaultValue: OrderByFilter.Newest,
        }),
    });

    function handleSubmit(e) {
        e.preventDefault();
        get(route("files.index"), data);
    }

    function handleVisibilityChange(e) {
        setData(
            "visibility",
            valueOrDefault({
                value: e.target.value,
                allowedValues: ["all", ...Object.values(ResourceVisibility)],
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

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex items-end space-x-4">
                <div>
                    <InputLabel htmlFor="query" value="Search by name" />
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
                    <InputLabel htmlFor="visibility" value="Visibility" />
                    <SelectInput
                        id="visibility"
                        name="visibility"
                        extraClasses="min-w-[160px]"
                        value={data.visibility}
                        onChange={handleVisibilityChange}
                    >
                        <option value="all">All</option>
                        <option value={ResourceVisibility.Private}>
                            Private
                        </option>
                        <option value={ResourceVisibility.Unlisted}>
                            Unlisted
                        </option>
                        <option value={ResourceVisibility.Public}>
                            Public
                        </option>
                    </SelectInput>
                </div>

                <div>
                    <InputLabel htmlFor="order_by" value="Order Results" />
                    <SelectInput
                        id="order_by"
                        name="order_by"
                        type="text"
                        extraClasses="min-w-[160px]"
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

                <Button
                    variant={ButtonVariant.Primary}
                    size={ButtonSize.Medium}
                    type="submit"
                >
                    Apply Filters
                </Button>
            </div>
        </form>
    );
}

function FilesTable({ files }) {
    return (
        <div className="overflow-hidden rounded-lg w-full shadow">
            <table className="table-auto w-full">
                <thead className="bg-gray-50 text-left border-b border-gray-200">
                    <tr>
                        <th className="p-4">File Name</th>
                        <th className="p-4">Visibility</th>
                        <th className="p-4">Created</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {files.map((file) => (
                        <tr key={file.hashid} className="hover:bg-gray-50">
                            <td className="p-4 w-full">
                                <Link
                                    key={file.id}
                                    variant={LinkVariant.Content}
                                    size={LinkSize.Large}
                                    href={route("files.show", file.hashid)}
                                >
                                    {file.name}
                                </Link>
                            </td>
                            <td className="capitalize p-4 min-w-[12ch]">
                                {file.visibility}
                            </td>
                            <td className="p-4 min-w-[15ch]">
                                {file.created_at_humanized}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
