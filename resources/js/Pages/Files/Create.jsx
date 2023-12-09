import Button, { ButtonSize, ButtonVariant } from "@/Components/Button";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, errors, hasErrors, processing } = useForm({
        name: "",
        extension: ".md",
        visibility: "private",
        contents: "",
    });

    function handleSubmit() {
        post(route("files.store"));
    }

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Create A New File
                    </h2>
                    {hasErrors && (
                        <div className="bg-rose-100 border-l-4 border-rose-300 rounded p-4">
                            <ul>
                                {Object.values(errors).map((message) => {
                                    return <li key={message}>{message}</li>;
                                })}
                            </ul>
                        </div>
                    )}
                    <div className="flex items-end space-x-4">
                        <div className="w-1/3">
                            <InputLabel htmlFor="name" value="File Name" />

                            <TextInput
                                id="name"
                                name="name"
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="mt-1 block w-full"
                                placeholder="File Name"
                                required
                            />
                        </div>
                        <div>
                            <InputLabel htmlFor="extension" value="Extension" />

                            <SelectInput
                                id="extension"
                                name="extension"
                                extraClasses="min-w-[160px]"
                                value={data.extension}
                                onChange={(e) =>
                                    setData("extension", e.target.value)
                                }
                            >
                                <option value=".md">.md</option>
                                <option value=".txt">.txt</option>
                            </SelectInput>
                        </div>
                        <div>
                            <InputLabel
                                htmlFor="visibility"
                                value="Visibility"
                            />

                            <SelectInput
                                id="visibility"
                                name="visibility"
                                extraClasses="min-w-[160px]"
                                value={data.visibility}
                                onChange={(e) =>
                                    setData("visibility", e.target.value)
                                }
                            >
                                <option value="private">Private</option>
                                <option value="unlisted">Unlisted</option>
                                <option value="public">Public</option>
                            </SelectInput>
                        </div>
                        <Button
                            variant={ButtonVariant.Primary}
                            size={ButtonSize.Medium}
                            onClick={handleSubmit}
                        >
                            Save &amp; Create File
                        </Button>
                    </div>
                    <div>
                        <textarea
                            spellCheck="false"
                            placeholder="Start typing..."
                            className="w-full min-h-[200px] border-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500 bg-white shadow rounded-lg"
                            value={data.contents}
                            onChange={(e) =>
                                setData("contents", e.target.value)
                            }
                        ></textarea>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
