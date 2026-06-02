export default function AboutSection() {
    const theme = localStorage.getItem('theme');

    return (
        <section
            id="about"
            className={`
                w-full
                py-20
                px-4
                flex
                justify-center
                ${theme === 'light' ? 'bg-white' : 'bg-zinc-900'}
            `}
        >
            <div className="max-w-4xl w-full flex flex-col gap-8">
                
                <div className="flex flex-col gap-2">
                    <p className="text-sky-500 font-medium tracking-wider uppercase">
                        About Me
                    </p>

                    <h2
                        className={`
                            text-3xl
                            md:text-5xl
                            font-bold
                            tracking-tight
                            ${theme === 'light' ? 'text-zinc-900' : 'text-white'}
                        `}
                    >
                        Full Stack Developer
                    </h2>
                </div>

                <div
                    className={`
                        rounded-2xl
                        border
                        p-8
                        leading-8
                        ${
                            theme === 'light'
                                ? 'bg-gray-50 border-gray-200 text-gray-700'
                                : 'bg-zinc-800 border-zinc-700 text-gray-300'
                        }
                    `}
                >
                    <p className="text-lg">
                        Hi, I'm <span className="font-semibold text-sky-600">Rohan</span> 👋
                    </p>

                    <p className="mt-4">
                        I'm a final-year Computer Science student passionate about
                        building modern web applications and solving real-world problems
                        through software.
                    </p>

                    <p className="mt-4">
                        My primary stack includes Java, Spring Boot, React,
                        MySQL, and REST APIs. I enjoy designing backend systems,
                        creating responsive user interfaces, and writing clean,
                        maintainable code.
                    </p>

                    <p className="mt-4">
                        I've built projects such as HireTrack, a full-stack job
                        tracking & Resume analyze (with ATS score & feedback response) platform, and a multi-user Blog Application
                        featuring authentication, role-based access, and RESTful APIs.
                    </p>

                    <p className="mt-4">
                        Currently seeking Software Developer and Java Full Stack
                        Developer opportunities where I can contribute, learn,
                        and grow as an engineer.
                    </p>
                </div>

                <div className="flex justify-center sm:justify-normal flex-wrap gap-3">
                    {[
                        "Java",
                        "Spring Boot",
                        "React",
                        "Tailwind CSS",
                        "MySQL",
                        "REST APIs",
                        "DSA",
                        "Git",
                        "GitHub"
                    ].map((skill) => (
                        <span
                            key={skill}
                            className="
                                px-4
                                py-2
                                rounded-full
                                bg-sky-500/10
                                text-sky-500
                                border
                                border-sky-500/20
                                text-sm
                                tracking-wide
                            "
                        >
                            {skill}
                        </span>
                    ))}
                </div>

                <div className="max-w-4xl w-full border border-gray-400 flex flex-col p-6 gap-8 rounded-xl mt-10">
                    <h1 className="text-gray-400 text-lg md:text-3xl tracking-normal font-medium">
                        contact
                    </h1>
                    
                    <div className="flex flex-col gap-2 ">
                        <p className="flex items-center gap-2">Email:
                            <span className="text-blue-500 underline">
                                rohanvaybhase50@gmail.com
                            </span>
                        </p>

                        <p className="flex items-center gap-2">
                            X (Twitter):
                            <a
                                href="https://x.com/Inosukeei_coder"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                @Inosukeei_coder
                            </a>
                        </p>

                        <p className="flex items-center gap-2">
                            Linkedin:
                             
                            <a
                                href="https://www.linkedin.com/in/rohan-vaybhase-15661533a/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                            >
                                @Rohan Vaybhase
                            </a>
                        </p>
                    </div>

                    <h2 className="text-sm tracking-wide font-medium">
                        NOTE:  CURRENTLY OPEN TO WORK!
                    </h2>
                </div>
            </div>
        </section>
    );
}