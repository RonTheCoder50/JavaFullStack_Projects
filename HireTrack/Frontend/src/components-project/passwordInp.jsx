import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({
    value,
    onChange,
    placeholder = "Enter password"
}) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative w-full">
            <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full rounded-md border px-3 py-2 pr-10"
            />

            <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
                {showPassword ? (
                    <EyeOff size={18} />
                ) : (
                    <Eye size={18} />
                )}
            </button>
        </div>
    );
}