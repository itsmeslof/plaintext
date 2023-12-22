import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import Button, { ButtonSize, ButtonVariant } from "@/Components/Button";
import Text, { TextElement, TextVariant } from "@/Components/Text";
import SelectInput from "@/Components/SelectInput";
import { valueOrDefault } from "@/utils";
import Link, { LinkVariant } from "@/Components/Link";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            username: user.username,
            email: user.email,
            profile_visibility: valueOrDefault({
                value: user.profile_visibility,
                allowedValues: ["private", "public"],
                defaultValue: "private",
            }),
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            <header>
                <Text variant={TextVariant.SectionTitle} as={TextElement.H2}>
                    Profile Information
                </Text>

                <Text
                    variant={TextVariant.Small}
                    as={TextElement.P}
                    extraClasses="mt-1"
                >
                    Update your username and email address.
                </Text>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="max-w-xl">
                    <InputLabel htmlFor="username" value="Username" />

                    <TextInput
                        id="username"
                        extraClasses="block w-full"
                        value={data.username}
                        onChange={(e) => setData("username", e.target.value)}
                        required
                        isFocused
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.username} />
                </div>

                <div className="max-w-xl">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        extraClasses="block w-full"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.{" "}
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                variant={LinkVariant.Content}
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex flex-col items-start">
                    <InputLabel
                        htmlFor="profile_visibility"
                        value="Profile Visibility"
                    />

                    <SelectInput
                        id="profile_visibility"
                        name="profile_visibility"
                        extraClasses="min-w-[160px]"
                        value={data.profile_visibility}
                        onChange={(e) =>
                            setData(
                                "profile_visibility",
                                valueOrDefault({
                                    value: e.target.value,
                                    allowedValues: ["private", "public"],
                                    defaultValue: "private",
                                })
                            )
                        }
                    >
                        <option value="private">Private</option>
                        <option value="public">Public</option>
                    </SelectInput>

                    <InputError
                        className="mt-2"
                        message={errors.profile_visibility}
                    />

                    <div className="mt-4 bg-gray-100 border-l-4 rounded border-gray-300 p-4">
                        <ul className="list-disc list-inside">
                            <li>
                                <Text
                                    variant={TextVariant.Content}
                                    as={TextElement.Span}
                                >
                                    Making your profile{" "}
                                    <span className="font-bold text-gray-800">
                                        Public
                                    </span>{" "}
                                    will allow anyone to view your profile,
                                    including all of your public files.
                                </Text>
                            </li>
                            <li>
                                <Text
                                    variant={TextVariant.Content}
                                    as={TextElement.Span}
                                >
                                    Making your profile{" "}
                                    <span className="font-bold text-gray-800">
                                        Private
                                    </span>{" "}
                                    will not allow anyone to view your profile,
                                    but they can still view any{" "}
                                    <span className="font-bold text-gray-800">
                                        Public
                                    </span>{" "}
                                    or{" "}
                                    <span className="font-bold text-gray-800">
                                        Unlisted
                                    </span>{" "}
                                    files with a direct link. Your username will
                                    be hidden.
                                </Text>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Button
                        variant={ButtonVariant.Secondary}
                        size={ButtonSize.Medium}
                        type="submit"
                        disabled={processing}
                    >
                        Save
                    </Button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
