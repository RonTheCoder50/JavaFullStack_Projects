import FileUploadBox from "@/components-project/fileuploadbox";
import { HistoryTable, UserInfoTable } from "@/components-project/tables";
import HeroCard from "@/components-project/herocard";
import { useEffect, useState } from "react";

import { TailSpin } from "react-loader-spinner";
import { fetchAdminDataAPI, getUserDataAPI } from "@/API";

import { 
    DashboardUserGrowthChart,
    DashboardAnalysisChart,
    DashboardDonutChart
} from "@/components-project/charts";

export default function DashBoardPage() {
    const [data, setData] = useState(null); //userData!
    const [adminData, setAdminData] = useState(null);

    const [loading, setLoading] = useState(false); 
    const user = JSON.parse(localStorage.getItem("user"));

    function handleLoading() {
        setLoading(!loading);
    }

    async function fetchUserData() {
        try {
            setLoading(true);

            const resp = await getUserDataAPI();
            console.log('user data:', resp);
            setData(resp);

        } catch(err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    async function fetchAdminData() {
        const response = await fetchAdminDataAPI();
        if(response) {
            setAdminData(response);
            console.log('admin data: ', response);
        } else {
            alert('failed to fetch user count!');
        }
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        fetchAdminData();
    }, []);

    useEffect(() => {
        localStorage.setItem('block', data?.isBlock
            ? true
            : false
        );
    }, [data]);

    function handleRefresh() {
        fetchAdminData();
    }

    //Admin dashboard
    // overall user info
    if(user.roles.includes('ROLE_ADMIN')) {
        return (
            <section 
                className={`
                    w-full
                    min-h-screen 
                    flex 
                    flex-col 
                    items-center
                    gap-16
                `}
            >
                <h1 className={`poppins-medium text-xl md:text-2xl xl:text-4xl text-center`}>
                    Hello, {user?.username} 👋
                </h1>

                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-8 gap-6 place-items-center p-4">
                    <HeroCard
                        name={'Total Users'}
                        value={adminData?.totalUsers || 0}
                    />

                    <HeroCard
                        name={'Total Analyses'}
                        value={adminData?.totalAnalyses || 0}
                    />

                    <HeroCard
                        name={'Todays Analyses'}
                        value={adminData?.todayAnalyses || 0}
                    />

                    <HeroCard
                        name={'Average ATS Score'}
                        value={adminData?.avgAtsScore.toFixed(2) || 0}
                    />
                </div>
                
                <DashboardUserGrowthChart />

                <DashboardAnalysisChart />

                <DashboardDonutChart data={adminData?.planData} />

                <UserInfoTable refresh={() => handleRefresh()} data={adminData?.userDataList} />
            </section>
        );
    }    

    return (
        <section className={`
            min-h-screen w-full 
            flex flex-col 
            my-4 gap-16
        `}>
            {/* heading */}
            <div className="flex flex-col gap-2 my-3 mx-auto">
                <h1 className={`poppins-medium text-xl md:text-2xl xl:text-4xl text-center`}>
                    Welcome Back, {user?.username} 👋
                </h1>
                <p className={`poppins-regular-italic text-xs sm:text-sm md:text-base text-gray-600`}>
                    Improve your resume ATS Score & Track your progress.
                </p>
            </div>

            {/* Hero-sec boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-8 gap-6 place-items-center p-4">
                <HeroCard 
                    name={'Total Resumes Analyzed'} 
                    value={data?.totalAnalysis || 0}
                />

                <HeroCard 
                    name={'Average ATS Score'} 
                    value={Number(data?.avgAtsScore.toFixed(2)) || 0}
                />

                <HeroCard 
                    name={'Analyzed Usage Left'} 
                    value={data?.limit + '/5' || '5/5'}
                />

                <HeroCard 
                    name={'Current Plan'} 
                    value={data?.plan?.toLowerCase() + ' tier' || 'Free Tier'}
                />
            </div>

            {/* input box */}
            <div className="my-4 flex flex-col gap-6">
                <TailSpin
                    height="80"
                    width="80"
                    color="gray"
                    ariaLabel="tail-spin-loading"
                    visible={loading}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
                <h1 className="text-center underline underline-offset-2 text-base sm:text-lg tracking-wide font-normal decoration-sky-200">
                    Analyzed Your Resume by uploading file here.
                </h1>
                
                <FileUploadBox 
                    setLoading={() => handleLoading()}
                />
            </div>

            {/* History table */}
            <div className="my-4 flex flex-col gap-4">
                <h1 className="p-4 ml-3 sm:ml-6 text-base md:text-xl underline underline-offset-2 decoration-sky-300">
                    Recent Activity
                </h1>
                
                <HistoryTable
                    data={data?.analysisHistory}
                    refresh={fetchUserData}
                />
            </div>

            <footer className="mt-16 border-t border-gray-200 py-6">
                <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    
                    <div>
                        <h2 className="text-sm font-medium text-gray-700">
                            HireTrack
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Improve your resume with AI-powered ATS analysis.
                        </p>
                    </div>

                    <div className="flex items-center gap-5 text-sm text-gray-500">
                        <a href="#" className="hover:text-sky-500 transition">
                            About
                        </a>

                        <a href="#" className="hover:text-sky-500 transition">
                            Privacy
                        </a>

                        <a href="#" className="hover:text-sky-500 transition">
                            GitHub
                        </a>
                    </div>
                </div>
            </footer>
        </section>
    );


    //Moderator dashboard
    //overall user + payment & history + overall controll.
}

