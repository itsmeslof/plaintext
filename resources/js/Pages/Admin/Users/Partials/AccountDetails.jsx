import Badge, { BadgeVariant } from "@/Components/Badge";
import Button, { ButtonSize, ButtonVariant } from "@/Components/Button";
import InputError from "@/Components/InputError";
import Text, { TextElement, TextVariant } from "@/Components/Text";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";

export default function AccountDetails({ user }) {
    return (
        <section>
            <header>
                <Text variant={TextVariant.SectionTitle} as={TextElement.H2}>
                    Account Information
                </Text>
            </header>

            <div className="mt-6 space-y-6">
                <div className="max-w-xl">
                    <Text variant={TextVariant.InputLabel} as={TextElement.P}>
                        Username
                    </Text>

                    <TextInput
                        id="username"
                        name="username"
                        value={user.username}
                        extraClasses="block w-full"
                        disabled
                    />
                </div>

                <div className="max-w-xl">
                    <Text variant={TextVariant.InputLabel} as={TextElement.P}>
                        Email
                    </Text>

                    <TextInput
                        id="email"
                        name="email"
                        value={user.email}
                        extraClasses="block w-full"
                        disabled
                    />
                </div>

                <div className="max-w-xl">
                    <Text variant={TextVariant.InputLabel} as={TextElement.P}>
                        Registration Date
                    </Text>

                    <div className="mt-1 flex items-center space-x-4">
                        <Text variant={TextVariant.Content} as={TextElement.P}>
                            {user.created_at_fmt}
                        </Text>
                    </div>
                </div>

                <EmailVerificationStatus user={user} />
            </div>
        </section>
    );
}

function EmailVerificationStatus({ user }) {
    const verified = user.email_verified_at;

    const verificationVariant = verified
        ? BadgeVariant.AccountStatus.Verified
        : BadgeVariant.AccountStatus.Unverified;

    const verificationText = verified ? "Verified" : "Unverified";

    const { post, errors, processing } = useForm();

    function handleSubmit(e) {
        e.preventDefault();

        post(route("admin.users.verify", { user: user.username }));
    }

    return (
        <div className="max-w-xl flex items-center justify-between w-full">
            <div className="space-y-2">
                <Text variant={TextVariant.InputLabel} as={TextElement.P}>
                    Email Verification Status
                </Text>

                <div className="flex items-center space-x-3">
                    <Badge variant={verificationVariant}>
                        {verificationText}
                    </Badge>
                </div>

                <InputError message={errors.verify_user} />
            </div>

            {!verified ? (
                <form
                    onSubmit={handleSubmit}
                    className="flex items-center space-x-2"
                >
                    <Button
                        variant={ButtonVariant.Primary}
                        size={ButtonSize.Medium}
                        type="submit"
                        disabled={processing}
                    >
                        Manually Verify User
                    </Button>
                </form>
            ) : null}
        </div>
    );
}
