import { useState } from "react"
import NavbarPage from "./navbar"
import DashBoardPage from "./dashboard"

export default function MainPage() {
    const [status, setStatus] = useState('dashboard'); //dashboar, history, pricing.
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    
    return (
        <section className="w-full min-h-screen flex flex-col gap-14">
            <NavbarPage 
                user={user}
                status={status}
            />

            <DashBoardPage user={user} />
        </section>
    );
}