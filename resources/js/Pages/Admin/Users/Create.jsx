import Button, { ButtonSize, ButtonVariant } from "@/Components/Button";
import Container, { ContainerVariant } from "@/Components/Container";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Link, { LinkVariant } from "@/Components/Link";
import SelectInput from "@/Components/SelectInput";
import Text, { TextElement, TextVariant } from "@/Components/Text";
import TextInput from "@/Components/TextInput";
import AdminLayout from "@/Layouts/AdminLayout";
import { valueOrDefault } from "@/utils";
import { Head, useForm } from "@inertiajs/react";

export default function Index() {
    return (
        <AdminLayout>
            <Head title="Create A New User" />

            <Container
                variant={ContainerVariant.MaxWidth}
                extraClasses="space-y-6"
            >
                <Text variant={TextVariant.PageTitle} as={TextElement.H2}>
                    Create A New User
                </Text>

                <CreateUserForm />
            </Container>
        </AdminLayout>
    );
}

function CreateUserForm() {
    const { data, setData, post, errors, processing } = useForm({
        username: "",
        email: "",
        verify_email_now: "0",
    });

    function handleSubmit(e) {
        e.preventDefault();

        post(route("admin.users.store"));
    }

    return (
        <Container>
            <section>
                <header>
                    <Text
                        variant={TextVariant.SectionTitle}
                        as={TextElement.H2}
                    >
                        Account Information
                    </Text>
                </header>

                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                    <div className="max-w-xl">
                        <InputLabel htmlFor="username" value="Username" />

                        <TextInput
                            id="username"
                            extraClasses="block w-full"
                            value={data.username}
                            onChange={(e) =>
                                setData("username", e.target.value)
                            }
                            required
                            isFocused
                        />

                        <InputError
                            className="mt-2"
                            message={errors.username}
                        />
                    </div>

                    <div className="max-w-xl">
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            extraClasses="block w-full"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />

                        <InputError className="mt-2" message={errors.email} />
                    </div>

                    <div className="max-w-xl">
                        <InputLabel
                            htmlFor="verify_email_now"
                            value="Verify Email Upon Creating User?"
                        />

                        <SelectInput
                            id="email"
                            extraClasses="block w-full"
                            value={data.verify_email_now}
                            onChange={(e) =>
                                setData(
                                    "verify_email_now",
                                    valueOrDefault({
                                        value: e.target.value,
                                        allowedValues: ["0", "1"],
                                        defaultValue: "0",
                                    })
                                )
                            }
                            required
                        >
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </SelectInput>

                        <InputError
                            className="mt-2"
                            message={errors.verify_email_now}
                        />
                    </div>

                    <div className="bg-gray-100 border-l-4 rounded border-gray-300 p-4">
                        <ul className="list-disc list-inside">
                            <li>
                                <Text
                                    variant={TextVariant.Content}
                                    as={TextElement.Span}
                                >
                                    Accounts created here will be generated with
                                    a random password that must be changed by
                                    the User. After creating the account, the
                                    user should visit{" "}
                                    <Link variant={LinkVariant.Content}>
                                        {route("password.request")}
                                    </Link>{" "}
                                    to request a password change and set their
                                    desired password.
                                </Text>
                            </li>
                        </ul>
                    </div>

                    <Button
                        variant={ButtonVariant.Primary}
                        size={ButtonSize.Medium}
                        type="submit"
                        disabled={processing}
                    >
                        Create User
                    </Button>
                </form>
            </section>
        </Container>
    );
}
