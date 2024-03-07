"use client"

import React, { useState } from "react";
import { Input } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

type InputType = "text" | "password" | "email" | "number";

interface InputProps {
    type?: InputType;
    label?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
}

const CustomInput: React.FC<InputProps> = ({
    type = "text",
    label,
    placeholder,
    onChange,
}) => {
    const [inputType, setInputType] = useState<InputType>(type);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
        setInputType(showPassword ? "password" : "text");
    };

    return (
        <div className="mb-1">
            {label && <label className="block font-poppins font-[300] mb-2 text-base">{label}</label>}
            <Input
                  className={`w-full  px-3  border rounded-md focus:outline-none text-[#212427] focus:ring-none focus:shadow-none focus:border   !important ${type === 'number' && '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none !important'}`}

                type={type === "password" ? inputType : type}
                placeholder={placeholder}
                onChange={(e) => onChange && onChange(e.target.value)}
                suffix={
                    type === "password" && (
                        <span
                            onClick={handleTogglePasswordVisibility}
                            className="cursor-pointer"
                        >
                            {showPassword ? (
                                <EyeOutlined />
                            ) : (
                                <EyeInvisibleOutlined />
                            )}
                        </span>
                    )
                }
            />
        </div>
    );
};

export default CustomInput;
