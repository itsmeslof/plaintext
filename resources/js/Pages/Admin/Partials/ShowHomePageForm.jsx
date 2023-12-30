import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Text, { TextElement, TextVariant } from "@/Components/Text";
import SelectInput from "@/Components/SelectInput";
import { valueOrDefault } from "@/utils";
import { useForm } from "@inertiajs/react";
import Button, { ButtonSize, ButtonVariant } from "@/Components/Button";
import { Transition } from "@headlessui/react";

export default function ShowHomepageForm({ show_home_page }) {
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            show_home_page: valueOrDefault({
                value: show_home_page,
                allowedValues: ["0", "1"],
                defaultValue: "0",
            }),
        });

    function handleSubmit(e) {
        e.preventDefault();

        patch(route("admin.settings.update", data));
    }

    function handleShowHomePageChange(e) {
        setData(
            "show_home_page",
            valueOrDefault({
                value: e.target.value,
                allowedValues: ["0", "1"],
                defaultValue: "0",
            })
        );
    }

    return (
        <section className="space-y-6">
            <header>
                <Text variant={TextVariant.SectionTitle} as={TextElement.H2}>
                    Home Page
                </Text>

                <Text
                    variant={TextVariant.Small}
                    as={TextElement.P}
                    extraClasses="mt-1"
                >
                    Determines whether the project home page is shown or not.
                </Text>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="max-w-xl">
                    <InputLabel htmlFor="show_home_page" value="Value" />

                    <SelectInput
                        id="show_home_page"
                        name="show_home_page"
                        extraClasses="w-full"
                        value={data.show_home_page}
                        onChange={handleShowHomePageChange}
                    >
                        <option value={"1"}>Active</option>
                        <option value={"0"}>Inactive</option>
                    </SelectInput>
                </div>

                <InputError message={errors.show_home_page} />

                <div className="flex items-center gap-4">
                    <Button
                        variant={ButtonVariant.Secondary}
                        size={ButtonSize.Medium}
                        type="submit"
                        disabled={processing}
                    >
                        Save Changes
                    </Button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Changes Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
