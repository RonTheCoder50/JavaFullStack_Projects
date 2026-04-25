import { useNavigate } from "react-router";

export default function PostPanelPage({ blogData, filterData, theme }) {
    return (
        <>
            {/* Header */}
            <div className="w-full max-w-6xl mx-auto px-4 mt-8 mb-4">
                <div className="flex items-center justify-between">
                    <h1 className={`
                        text-3xl 
                        font-semibold   
                        tracking-tight
                        ${theme === 'dark' ? 'text-white/85' : 'text-gray-800'}
                    `}>
                        Your Blogs
                    </h1>

                    <div className="text-sm text-gray-500">
                        {blogData?.length || 0} posts
                    </div>
                </div>

                <div className="mt-3 h-[2px] w-full bg-gradient-to-r from-violet-500 via-purple-400 to-transparent rounded-full" />
            </div> 

            {/* Blog Grid */}
            <section className="w-full max-w-6xl mx-auto px-4 pb-10">
                <div className="grid 
                    grid-cols-1 
                    place-content-center
                    sm:grid-cols-2 
                    md:grid-cols-3 
                    gap-6
                ">

                    {
                        filterData?.length !== 0 
                        ? filterData?.map(data => (
                            <div key={data.id} className="transform hover:-translate-y-1 transition duration-300">
                                <BlogCard key={data?.id} data={data} theme={theme} />
                            </div>
                        )) 
                        : 
                        Array.isArray(blogData) &&
                        blogData?.map((data) => (
                            <div key={data.id} className="transform hover:-translate-y-1 transition duration-300">
                                <BlogCard key={data?.id} data={data} theme={theme} />
                            </div>
                        ))
                    }

                    <div className="h-[220px] rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm hover:border-violet-400 transition">
                        + New Blog Coming Soon
                    </div>

                    <div className="h-[220px] rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm hover:border-violet-400 transition">
                        + Draft Placeholder
                    </div>
                </div>
            </section> 
        </>
    )
}

function BlogCard({ data, theme }) {
    let date = [];
    const navigate = useNavigate();

    const likes = data?.likes.length;

    if (data) {
        date = data.updatedAt == null ? data.createdAt.split('T') : data.updatedAt.split('T');
    }

    return (
        <div className={`
            border rounded-md  
            shadow-sm w-full max-w-[90%] 
            sm:max-w-85 px-5 
            py-4 flex flex-col 
            gap-6 hover:scale-101
            ${theme === 'dark' 
                ? 'border-sky-200 hover:border-sky-300 bg-gray-800 text-white/80' 
                : 'border-sky-100 hover:border-sky-200 bg-white text-black/90'
            }
        `}>
            <div className="text-base font-medium tracking-wide text-indigo-400">
                {data ? data.title : 'Blog Title'}
            </div>

            <p className="text-xs tracking-wide text-gray-500 line-clamp-2">
                {data ? data.content : '-- no blog data --'}
            </p>

            <div className="flex items-center justify-between text-xs tracking-wide px-2">
                <span className="text-gray-400">
                    {date !== null ? date[0] : 'undefined'}
                </span>

                <span className="italic text-slate-700">
                    {data ? data.author : 'unknwon'}
                </span>
            </div>

            <div className="flex items-center justify-around mt-3">
                <span className="text-sm font-light tracking-wide">
                    likes: { + " " + likes ? likes : 0}
                </span>
            
                <button
                    onClick={() =>
                        navigate(`/blog/${data.id}`)
                    }
                    className="border rounded-sm py-1 px-2 text-sm hover:border-sky-300 hover:translate-y-1 transition-all delay-75 duration-300 ease-in-out text-sky-400 hover:text-sky-600 cursor-pointer"
                >
                    view more.
                </button>
            </div>
        </div>
    );
}