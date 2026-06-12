import { useTheme } from "./theme";

export default function PricingPage() {
    const { theme } = useTheme();
    return (
        <section className="min-h-screen w-full flex flex-col lg:flex-row items-center gap-8 md:gap-14">
            <div
                className={`
                    p-4 
                    rounded-md 
                    w-full 
                    max-w-[90%] 
                    sm:max-w-[350px]
                    border
                    mx-auto
                    flex 
                    flex-col
                    gap-4 
                    mt-36
                    ${theme === 'dark'
                        ? 'border-green-300'
                        : 'border-sky-300'
                    }
                `}
            >
                <h1 className="">
                    Free
                </h1>
            </div>
        </section>
    );
}

