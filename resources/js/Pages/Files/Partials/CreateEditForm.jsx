import Button, { ButtonSize, ButtonVariant } from "@/Components/Button";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { ResourceVisibility, valueOrDefault } from "@/utils";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function CreateEditForm({ file = null }) {
    const [count, setCount] = useState(file?.contents.length || 0);
    const maxContentLength = 65535;

    const {
        data,
        setData,
        patch,
        post,
        errors,
        hasErrors,
        processing,
        recentlySuccessful,
    } = useForm({
        name: file?.name || "",
        extension: valueOrDefault({
            value: file?.extension || ".md",
            allowedValues: [".md", ".txt"],
            defaultValue: ".md",
        }),
        visibility: valueOrDefault({
            value: file?.visibility || "private",
            allowedValues: ["private", "unlisted", "public"],
            defaultValue: "private",
        }),
        contents: file?.contents || "",
    });

    function handleSubmit() {
        if (!file) {
            post(route("files.store"), data);
            return;
        }

        patch(
            route("files.update", {
                file: file.hashid,
            }),
            data
        );
    }

    function handleExtensionChange(e) {
        setData(
            "extension",
            valueOrDefault({
                value: e.target.value,
                allowedValues: [".md", ".txt"],
                defaultValue: ".md",
            })
        );
    }

    function handleVisibilityChange(e) {
        setData(
            "visibility",
            valueOrDefault({
                value: e.target.value,
                allowedValues: ["all", ...Object.values(ResourceVisibility)],
                defaultValue: "all",
            })
        );
    }

    return (
        <div className="space-y-6">
            {hasErrors && (
                <div className="bg-rose-100 border-l-4 border-rose-300 rounded p-4">
                    <ul>
                        {Object.values(errors).map((message) => {
                            return <li key={message}>{message}</li>;
                        })}
                    </ul>
                </div>
            )}
            <Transition
                show={recentlySuccessful}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
            >
                <div className="bg-teal-100 border-l-4 border-teal-300 rounded p-4">
                    <p>File Saved.</p>
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
                        onChange={(e) => setData("name", e.target.value)}
                        extraClasses="block w-full"
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
                        onChange={handleExtensionChange}
                    >
                        <option value=".md">.md</option>
                        <option value=".txt">.txt</option>
                    </SelectInput>
                </div>
                <div>
                    <InputLabel htmlFor="visibility" value="Visibility" />

                    <SelectInput
                        id="visibility"
                        name="visibility"
                        extraClasses="min-w-[160px]"
                        value={data.visibility}
                        onChange={handleVisibilityChange}
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
                    disabled={processing || count > maxContentLength}
                >
                    {file ? "Save File" : "Save & Create File"}
                </Button>
            </div>
            <div className="space-y-2">
                <CharacterCounter
                    count={count}
                    maxContentLength={maxContentLength}
                />
                <textarea
                    spellCheck="false"
                    placeholder="Start typing..."
                    className="w-full min-h-[400px] border-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500 bg-white shadow rounded-lg"
                    value={data.contents}
                    onChange={(e) => {
                        setData("contents", e.target.value);
                        setCount(e.target.value.length);
                    }}
                ></textarea>
            </div>
        </div>
    );
}

function CharacterCounter({ count, maxContentLength }) {
    return (
        <p>
            Character Count:{" "}
            <span className={count > maxContentLength ? "text-rose-600" : ""}>
                {count.toLocaleString()}
            </span>{" "}
            / {maxContentLength.toLocaleString()}
            {count > maxContentLength ? (
                <span className="text-rose-600">
                    {" "}
                    - The file contents can not contain more than{" "}
                    {maxContentLength.toLocaleString()} characters.
                </span>
            ) : null}
        </p>
    );
}
