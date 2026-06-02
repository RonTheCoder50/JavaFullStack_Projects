import { useCallback, useEffect, useState } from "react";
import { useTheme } from "./theme";

import { getUserDataAPI, getHistoryAnalysisAPI } from "@/API";

import UserNavbar from "./userNavbar";
import HeroCard from "@/components-project/herocard";

import { TailSpin } from "react-loader-spinner";

import FileUploadBox from "@/components-project/fileuploadbox";
import { DashBoardHistoryFunc, HistoryTable } from "@/components-project/tables";
import { useNavigate } from "react-router";
 

export default function UserDashBoard() {
    //states - status, loading, theme, other..
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [historyData, setHistoryData] = useState(null);
    const [searchInput, setSearchInput] = useState('');

    const [status, setStatus] = useState('dashboard');
    const [loading, setLoading] = useState(false);
    const { theme } = useTheme();

    const [customConfig, setCustomConfig] = useState({
        sort: '', page: 0, order: 'asc'
    });

    //IS Current login Block Checking.. 
    useEffect(() => {
        if(data?.isBlock === null) {
            localStorage.setItem('block', 'Active');
        } else {
            data?.isBlock 
            ? localStorage.setItem('block', 'Blocked')
            : localStorage.setItem('block', 'Active')
        }
    }, [data]);
    
    //functions
    async function fetchUserData() {
        try {
            setLoading(true);

            const resp = await getUserDataAPI();
            setData(resp);

            console.log('user data:', resp);
        } catch(err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const fetchHistoryData = useCallback(async () => {
        const response = await getHistoryAnalysisAPI(
            searchInput,
            customConfig.page,
            10,
            customConfig.sort,
            customConfig.order
        );
    
        if(response) {
            setHistoryData(response);
        }
    }, [searchInput, customConfig]);

    function handleSearchInput(e) {
        const val = e.target.value;
        setSearchInput(val);
    }

    const handleStatus = (val) => {
        if (val === undefined || val === status) return;
        setStatus(val);
    }

    function handleSort(val) {
        setCustomConfig({ ...customConfig, sort: val });
    }
    function handleOrder(val) {
        setCustomConfig({ ...customConfig, order:val });
    }

    function handlePage(val) {
         if(val.trim() === 'prev') {
            setCustomConfig({...customConfig, page: historyData?.pageable?.pageNumber-1});
        } else {
            setCustomConfig({ ...customConfig, page: historyData?.pageable?.pageNumber+1 });
        }
    }

    //useEffects - (userdata, pagination-history-data)
    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        if(status === 'history') {
            fetchHistoryData();
        }
    }, [fetchHistoryData, status]);
    

    if(localStorage.getItem('block') === 'Blocked') {
        return (
            <p className="text-xl lg:text-2xl font-medium tracking-wide text-center mt-28">
                user is blocked!
            </p>
        );
    }

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
            <UserNavbar
                status={status} 
                handleStatus={handleStatus}
            />

            {status === 'dashboard' && data
                ? <section className={`
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
                            setLoading={setLoading}
                        />
                    </div>

                    {/* History table */}
                    <div className="my-4 flex flex-col gap-4">
                        <h1 className="p-4 ml-3 sm:ml-6 text-base md:text-xl underline underline-offset-2 decoration-sky-300">
                            Recent Activity
                        </h1>
                        
                        <DashBoardHistoryFunc 
                            data={data?.analysisHistory}
                            refresh={() => fetchUserData()}
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
                                <a  onClick={() => navigate('/about')}
                                    className="hover:text-sky-500 transition">
                                    About Me
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
                : status === 'dashboard' && 
                <p className="text-center text-2xl font-medium mt-14">
                    Loading...
                </p> 
            }    

            {status === 'history' && 
                historyData
                ? <HistoryTable
                    data={historyData?.content}
                    refresh={fetchHistoryData}

                    value={searchInput}
                    handleInput={handleSearchInput}

                    sortBy={customConfig.sort}
                    handleSortBy={handleSort}

                    order={customConfig.order}
                    handleOrder={handleOrder}

                    page={customConfig.page}
                    handlePage={handlePage}
                    isLastPage={historyData?.last}
                />
                : status === 'history' && <p className="text-center text-2xl font-medium mt-14">
                    Loading...
                </p>
            }

            {status === 'pricing' &&
                <p className="text-center text-2xl font-medium mt-20">
                    Comming Soon..
                </p>
            }
        </section>
    );
}