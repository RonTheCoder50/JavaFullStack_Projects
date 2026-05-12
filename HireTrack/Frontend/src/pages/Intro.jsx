import { Button } from "@/components/ui/button"
import { Link } from "react-router"

export default function IntroPage() {
    return (
        <section className="w-full min-h-screen flex flex-col items-center gap-20">
            <h1 className="text-xl font-medium tracking-wide p-4 w-full shadow-md text-center">
                HireTrack.in
            </h1>
            <div className="my-6 p-4 flex items-center gap-10 tracking-wide">
                <Button className={`text-base font-medium py-2 px-4`}>
                    <Link to={'/signup'}>
                        Signup
                    </Link>
                </Button>

                <Button className={`text-base font-medium py-2 px-4`}>
                    <Link to={'/login'}>
                        Login
                    </Link>
                </Button>
            </div>
        </section>
    )
}