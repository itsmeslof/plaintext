import Container, { ContainerVariant } from "@/Components/Container";
import Link, { LinkSize, LinkVariant } from "@/Components/Link";
import Text, { TextElement, TextVariant } from "@/Components/Text";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";

export default function Home({ auth, registrationEnabled }) {
    const user = auth.user;

    return (
        <GuestLayout>
            <Head title={"Home"} />

            <Container variant={ContainerVariant.MaxWidth}>
                <Container>
                    <Text variant={TextVariant.PageTitle} as={TextElement.H1}>
                        Plaintext
                    </Text>
                    <Text
                        variant={TextVariant.SectionTitle}
                        as={TextElement.H2}
                        extraClasses="mt-2"
                    >
                        A self-hosted plain text file management and sharing
                        tool written in Laravel 10, Inertia + React, and
                        Tailwind.
                    </Text>
                    <Text variant={TextVariant.Content} extraClasses="mt-4">
                        Plaintext supports rendering raw text files and markdown with full support for the{" "}
                        <Link
                            pure
                            variant={LinkVariant.Content}
                            href="https://spec.commonmark.org/0.30/"
                        >
                            Commonmark
                        </Link>{" "}
                        and{" "}
                        <Link
                            pure
                            variant={LinkVariant.Content}
                            href="https://github.github.com/gfm/"
                        >
                            GitHub Flavored
                        </Link>{" "}
                        Markdown specs.
                    </Text>

                    <div className="mt-4 space-y-2">
                        <Text variant={TextVariant.Content}>
                            For more information, see the project's{" "}
                            <Link
                                pure
                                variant={LinkVariant.Content}
                                href="https://github.com/itsmeslof/plaintext"
                            >
                                GitHub Repository
                            </Link>
                            .
                        </Text>
                    </div>

                    <div className="mt-8">
                        {user ? (
                            <Link
                                variant={LinkVariant.PrimaryButton}
                                size={LinkSize.Button.Medium}
                                href={route("dashboard")}
                            >
                                My Dashboard
                            </Link>
                        ) : (
                            <div className="space-x-4">
                                <Link
                                    variant={LinkVariant.PrimaryButton}
                                    size={LinkSize.Button.Medium}
                                    href={route("login")}
                                >
                                    Login
                                </Link>
                                {registrationEnabled ? (
                                    <Link
                                        variant={LinkVariant.SecondaryButton}
                                        size={LinkSize.Button.Medium}
                                        href={route("register")}
                                    >
                                        Create Account
                                    </Link>
                                ) : null}
                            </div>
                        )}
                    </div>
                </Container>
            </Container>
        </GuestLayout>
    );
}
