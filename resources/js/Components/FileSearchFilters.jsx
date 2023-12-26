import { OrderByFilter, ResourceVisibility, valueOrDefault } from "@/utils";
import { useForm } from "@inertiajs/react";
import TextInput from "./TextInput";
import InputLabel from "./InputLabel";
import SelectInput from "./SelectInput";
import Button, { ButtonSize, ButtonVariant } from "./Button";
import Link, { LinkVariant } from "./Link";

export default function FileSearchFilters({ submitRoute }) {
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
        get(submitRoute, data);
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

                <Link href={submitRoute} variant={LinkVariant.Content}>
                    Reset Filters
                </Link>
            </div>
        </form>
    );
}
