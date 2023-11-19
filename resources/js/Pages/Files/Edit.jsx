import CustomLink from "@/Components/CustomLink";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Transition } from "@headlessui/react";
import { Head, useForm } from "@inertiajs/react";

export default function Edit({ flash, file }) {
    const fileData = file.data;

    const {
        data,
        setData,
        patch,
        errors,
        hasErrors,
        processing,
        recentlySuccessful,
    } = useForm({
        name: fileData.name || "",
        extension: fileData.extension || ".md",
        visibility: fileData.visibility || "private",
        contents: fileData.contents || "",
    });

    function handleSubmit() {
        patch(route("files.update", fileData.hashid));
    }

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="space-y-1">
                        <CustomLink href={route("files.show", fileData.hashid)}>
                            Cancel
                        </CustomLink>
                        <h2 className="text-lg font-medium text-gray-900">
                            Edit File
                        </h2>
                    </div>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <div className="bg-teal-100 border-l-4 border-teal-300 rounded p-4">
                            <p>{flash.status}</p>
                        </div>
                    </Transition>
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
                        <PrimaryButton onClick={handleSubmit}>
                            Save File
                        </PrimaryButton>
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
