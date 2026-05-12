import { useState } from "react"
import NavbarPage from "./navbar"
import DashBoardPage from "./dashboard"

export default function MainPage() {
    const [status, setStauts] = useState('dashboard'); //dashboar, history, pricing.

    return (
        <section className="w-full min-h-screen flex flex-col gap-14">
            <NavbarPage 
                status={status}
            />

            <DashBoardPage />
        </section>
    );
}