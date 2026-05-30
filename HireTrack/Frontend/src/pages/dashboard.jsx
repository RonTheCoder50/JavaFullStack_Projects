import FileUploadBox from "@/components-project/fileuploadbox";
import { HistoryTable } from "@/components-project/tables";
import HeroCard from "@/components-project/herocard";

import { TailSpin } from "react-loader-spinner";

import { 
    DashboardUserGrowthChart,
    DashboardAnalysisChart,
    DashboardDonutChart,
} from "@/components-project/charts";
import { useTheme } from "./theme";

export default function DashBoardPage({ user, data, isLoad, setLoading, refresh}) {
    const { theme } = useTheme();

    //Admin dashboard
    if(user.roles?.includes('ROLE_ADMIN')) {
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

                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-8 gap-6 place-items-center place-content-center p-4">
                    <HeroCard
                        name={'Total Users'}
                        value={data?.totalUsers || 0}
                    />

                    <HeroCard
                        name={'Total Analyses'}
                        value={data?.totalAnalyses || 0}
                    />

                    <HeroCard
                        name={'Todays Analyses'}
                        value={data?.todayAnalyses || 0}
                    />

                    <HeroCard
                        name={'Average ATS Score'}
                        value={data?.avgAtsScore.toFixed(2) || 0}
                    />
                </div>
                
                <DashboardUserGrowthChart />

                <DashboardAnalysisChart />

                <DashboardDonutChart data={data?.planData} />
            </section>
        );
    }    

    //User dashboard
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
                    visible={isLoad}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
                <h1 className="text-center underline underline-offset-2 text-base sm:text-lg tracking-wide font-normal decoration-sky-200">
                    Analyzed Your Resume by uploading file here.
                </h1>
                
                <FileUploadBox 
                    setLoading={setLoading}
                />
            </div>

            {/* History table */}
            <div className="my-4 flex flex-col gap-4">
                <h1 className="p-4 ml-3 sm:ml-6 text-base md:text-xl underline underline-offset-2 decoration-sky-300">
                    Recent Activity
                </h1>
                
                <HistoryTable
                    data={data?.analysisHistory}
                    refresh={() => refresh()}
                />
            </div>

            <footer 
                className={`
                    mt-16
                    border-t 
                    py-6
                    ${theme === 'light' 
                        ? 'border-gray-200'
                        : 'border-gray-600'
                    }
                `}
            >

                <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    
                    <div>
                        <h2 
                            className={`
                                text-sm 
                                font-medium 
                                ${theme === 'light' 
                                    ? 'text-gray-700'
                                    : 'text-gray-200'
                                }
                            `}
                        >
                            HireTrack
                        </h2>

                        <p 
                            className={`
                                text-sm 

                                mt-1
                                ${theme === 'light' 
                                    ? 'text-gray-500'
                                    : 'text-gray-400'
                                }
                            `}
                        >
                            Improve your resume with AI-powered ATS analysis.
                        </p>
                    </div>

                    <div className="flex items-center gap-5 text-sm text-gray-500">
                        <a href="#" className="hover:text-sky-500 transition">
                            About
                        </a>

                        <a 
                            onClick={() => 
                                alert('lol \n kidding you are safe :) ')
                            } 
                        className="hover:text-sky-500 transition">
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
}

