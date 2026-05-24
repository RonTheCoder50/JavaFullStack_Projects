import { useEffect, useState } from "react"
import NavbarPage from "./navbar"
import DashBoardPage from "./dashboard"

import { HistoryTable } from "@/components-project/tables";
import { getHistoryAnalysisAPI } from "@/API";

export default function MainPage() {
    const [status, setStatus] = useState('dashboard'); //dashboar, history, pricing.
    const [historyData, setHistoryData] = useState(null);

    useEffect(() => {
        fetchHistoryData();
    }, []);

    async function fetchHistoryData() {
        try {
            const data = await getHistoryAnalysisAPI();
            setHistoryData(data);
        } catch(err) {
            console.log(err);
        }
    }

    function handleStatus(val) {
        if(val === undefined || val === status) {
            return;
        }
        setStatus(val);
    }
    
    return (
        <section className="w-full min-h-screen flex flex-col gap-14 bg-gray-50">
            <NavbarPage 
                status={status}
                handleStatus={handleStatus}
            />

            {status === 'dashboard' &&
                <DashBoardPage />
            }
            
            {status === 'history' && 
                <HistoryTable
                    data={historyData}
                    refresh={fetchHistoryData}
                />
            }
        </section>
    );
}