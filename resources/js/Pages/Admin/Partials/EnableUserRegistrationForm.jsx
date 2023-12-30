import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Link, { LinkVariant } from "@/Components/Link";
import Text, { TextElement, TextVariant } from "@/Components/Text";
import SelectInput from "@/Components/SelectInput";
import { valueOrDefault } from "@/utils";
import { useForm } from "@inertiajs/react";
import Button, { ButtonSize, ButtonVariant } from "@/Components/Button";
import { Transition } from "@headlessui/react";

export default function EnableUserRegistrationForm({
    enable_user_registration,
}) {
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            enable_user_registration: valueOrDefault({
                value: enable_user_registration,
                allowedValues: ["0", "1"],
                defaultValue: "0",
            }),
        });

    function handleSubmit(e) {
        e.preventDefault();

        patch(route("admin.settings.update", data));
    }

    function handleEnableUserRegistrationChange(e) {
        setData(
            "enable_user_registration",
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
                    User Registration
                </Text>

                <Text
                    variant={TextVariant.Small}
                    as={TextElement.P}
                    extraClasses="mt-1"
                >
                    Determines whether account registration is allowed or not.
                </Text>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="max-w-xl">
                    <InputLabel
                        htmlFor="enable_user_registration"
                        value="Value"
                    />

                    <SelectInput
                        id="enable_user_registration"
                        name="enable_user_registration"
                        extraClasses="w-full"
                        value={data.enable_user_registration}
                        onChange={handleEnableUserRegistrationChange}
                    >
                        <option value={"1"}>Active</option>
                        <option value={"0"}>Inactive</option>
                    </SelectInput>
                </div>

                <InputError message={errors.enable_user_registration} />

                <div className="bg-gray-100 border-l-4 rounded border-gray-300 p-4">
                    <ul className="list-disc list-inside">
                        <li>
                            <Text
                                variant={TextVariant.Content}
                                as={TextElement.Span}
                            >
                                Setting User Registration to{" "}
                                <span className="font-bold text-gray-800">
                                    Active
                                </span>{" "}
                                will allow anyone to visit{" "}
                                <Link
                                    variant={LinkVariant.Content}
                                    href={route("register")}
                                >
                                    {route("register")}
                                </Link>{" "}
                                and create an account.
                            </Text>
                        </li>
                        <li>
                            <Text
                                variant={TextVariant.Content}
                                as={TextElement.Span}
                            >
                                Setting User Registration to{" "}
                                <span className="font-bold text-gray-800">
                                    Inactive
                                </span>{" "}
                                will not allow anyone to create a new account,
                                and the registration form will be unavailable.
                                Existing users will be able to access their
                                account. Site administrators will still be able
                                to manually create new accounts for users.
                            </Text>
                        </li>
                    </ul>
                </div>

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
