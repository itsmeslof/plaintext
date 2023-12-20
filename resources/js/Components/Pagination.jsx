import { useEffect, useState } from "react";
import Link, { LinkVariant } from "./Link";

export default function Pagination({ paginator }) {
    let [links, setLinks] = useState([]);
    const items = paginator.data;
    const meta = paginator.meta;

    useEffect(() => {
        /**
         * Generates a v4 UUID for link break items that have no unique value ("..." breaks).
         *
         * This is probably unnecessary and using the index as a key would work fine here
         * since we don't re-order the links array from this component, but using the index
         * as a key feels nasty so this exists to stop me from going crazy.
         *
         * @returns array
         */
        function generateUUIDSForLinks() {
            return paginator.meta.links.map((link) => {
                return { ...link, key: crypto.randomUUID() };
            });
        }

        setLinks(generateUUIDSForLinks());
    }, []);

    /**
     * Get the number of the first item in the slice.
     *
     * @returns int|null
     */
    function firstItem() {
        return items.length > 0
            ? (meta.current_page - 1) * meta.per_page + 1
            : null;
    }

    /**
     * Get the number of the last item in the slice.
     *
     * @returns int|null
     */
    function lastItem() {
        return items.length > 0 ? firstItem() + items.length - 1 : null;
    }

    function ResultsText() {
        return (
            <p className="text-sm text-gray-700">
                Showing{" "}
                {firstItem() ? (
                    <>
                        <span className="font-medium">{firstItem()}</span> to{" "}
                        <span className="font-medium">{lastItem()}</span>
                    </>
                ) : (
                    <span>{items.length}</span>
                )}{" "}
                of {meta.total} results
            </p>
        );
    }

    function Links() {
        return links.length > 3 ? (
            <div className="flex space-x-2">
                {links.map((link) => {
                    return link.url && !link.active ? (
                        <Link
                            preserveScroll
                            key={link.key}
                            href={link.url}
                            variant={LinkVariant.Content}
                        >
                            {link.label}
                        </Link>
                    ) : (
                        <span key={link.key}>{link.label}</span>
                    );
                })}
            </div>
        ) : null;
    }

    return (
        <div className="flex flex-1 justify-between items-center">
            <ResultsText />
            <Links />
        </div>
    );
}
