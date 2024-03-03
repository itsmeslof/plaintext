import Container, { ContainerVariant } from "@/Components/Container";
import Link, { LinkSize, LinkVariant } from "@/Components/Link";
import Text, { TextElement, TextVariant } from "@/Components/Text";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";

export default function Error({ status }) {
    const title =
        {
            503: "503: Service Unavailable",
            500: "500: Server Error",
            404: "404: Page Not Found",
            403: "403: Forbidden",
        }[status] || "Unknown Error";

    const description =
        {
            503: "Service is unavailable at this time.",
            500: "An internal error occured.",
            404: "The page you are looking for could not be found.",
            403: "Access to this page is restricted.",
        }[status] || "An unknown error has occured.";

    return (
        <GuestLayout>
            <Head title={title} />

            <Container variant={ContainerVariant.MaxWidth}>
                <Container>
                    <Text variant={TextVariant.PageTitle} as={TextElement.H1}>
                        {title}
                    </Text>
                    <Text variant={TextVariant.Content} as={TextElement.P}>
                        {description}
                    </Text>
                    <Link
                        variant={LinkVariant.Content}
                        size={LinkSize.Large}
                        extraClasses="mt-4"
                        href={route("home")}
                    >
                        Back To Home
                    </Link>
                </Container>
            </Container>
        </GuestLayout>
    );
}
