import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextInput(
    { type = "text", className = "", isFocused = false, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                "bg-gray-200 border-gray-200 focus:border-sky-500 focus:ring-sky-500 rounded shadow-sm " +
                className
            }
            ref={input}
        />
    );
});
