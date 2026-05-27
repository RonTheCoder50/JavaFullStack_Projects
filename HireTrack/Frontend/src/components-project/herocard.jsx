import { useTheme } from "@/pages/theme";

function HeroCard({ name, value }) {
    const { theme } = useTheme();
    return (
        <div
            className="
                w-full max-w-[85%] sm:max-w-[300px]
                min-h-[220px]
                mx-auto
                rounded-2xl
                border border-gray-200
                shadow-sm
                hover:shadow-lg
                hover:-translate-y-1
                hover:border-sky-300
                transition-all duration-300
                flex flex-col items-center justify-center
                gap-5
                px-6 py-8
            "
        >
            <div className="space-y-2 text-center">
                <h2
                    className={`
                        text-base sm:text-lg
                        font-medium
                        tracking-wide
                         ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}
                    `}
                >
                    {name}
                </h2>

                <div className="w-14 h-[3px] bg-sky-400 rounded-full mx-auto" />
            </div>

            <p
                className={`
                    text-3xl sm:text-4xl
                    font-bold
                    tracking-tight
                    ${theme === 'light' ? 'text-gray-800' : 'text-gray-300'}
                `}
            >
                {value}
            </p>
        </div>
    );
}

export default HeroCard;