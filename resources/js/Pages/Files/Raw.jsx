import { Head } from "@inertiajs/react";

export default function Raw({ file }) {
    return (
        <div className="min-h-screen bg-gray-100 p-2">
            <Head title={`${file.name}${file.extension} - Raw`} />
            <pre className="whitespace-pre-line">{file.contents}</pre>
        </div>
    );
}
