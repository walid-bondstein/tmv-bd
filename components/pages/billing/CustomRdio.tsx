import React from "react";

interface CustomRadioProps {
    value: string;
    name: string;
    checked?: boolean;
    onChange?: (value: string) => void;
}

const CustomRadio: React.FC<CustomRadioProps> = ({
    value,
    name,
    checked,
    onChange,
}) => {
    return (
        <label className="flex items-center gap-2 cursor-pointer select-none">
            {/* Custom radio outer circle */}
            <span
                className={`relative w-4 h-4 rounded-full border-4 transition-all duration-200 ${checked ? "border-orange-500" : "border-gray-400"
                    } flex items-center justify-center bg-white`}
                onClick={() => onChange?.(value)}
            >

            </span>

            {/* Hidden native radio for accessibility */}
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={() => onChange?.(value)}
                className="hidden"
            />
        </label>
    );
};

export default CustomRadio;
