function HeroCard({ name, value }) {
    return (
        <div
            className="
                w-full max-w-[85%] sm:max-w-[300px]
                min-h-[220px]
                mx-auto
                rounded-2xl
                border border-gray-200
                bg-white
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
                    className="
                        text-base sm:text-lg
                        font-medium
                        text-gray-500
                        tracking-wide
                    "
                >
                    {name}
                </h2>

                <div className="w-14 h-[3px] bg-sky-400 rounded-full mx-auto" />
            </div>

            <p
                className="
                    text-3xl sm:text-4xl
                    font-bold
                    text-gray-800
                    tracking-tight
                "
            >
                {value}
            </p>
        </div>
    );
}

export default HeroCard;