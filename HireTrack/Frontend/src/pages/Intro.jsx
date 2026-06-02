import { Button } from "@/components/ui/button"
import { Link } from "react-router"
import { useTheme } from "./theme";

import { MdOutlineWbSunny } from 'react-icons/md';
import { FiMoon } from "react-icons/fi";

export default function IntroPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <section 
      className={`
        min-h-screen 
        ${theme === 'light' 
          ? 'bg-gradient-to-br from-white to-gray-100'
          : 'bg-gradient-to-br from-zinc-900 to to-zinc-800'
        }
        flex 
        flex-col
      `}
    >
      
      <header className="w-full flex items-center justify-between px-8 py-5 border-b backdrop-blur-sm">
        <h1 
          className={`
            text-2xl 
            font-bold 
            tracking-tight 
            ${theme === 'light'
              ? 'text-gray-900'
              : 'text-white/70'
            }
          `}
        >
          HireTrack
          <span className="text-blue-600">.in</span>
        </h1>

        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            variant="outline"
            onClick={() => toggleTheme()}
          >
            {theme === 'light' 
              ? <FiMoon />
              : <MdOutlineWbSunny />
            }
          </Button>
          
          <Link to="/login">
            <Button
              variant="outline"
              className="text-sm font-medium"
            >
              Login
            </Button>
          </Link>

          <Link to="/signup">
            <Button className="rounded-xl px-5">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-3xl text-center space-y-6">
          
        <div className={`
              inline-flex
              items-center
              rounded-full
              border
              border-blue-500/50
              px-4
              py-1
              text-sm
              shadow-sm
              animate-pulse
              ${theme === 'light'
                ? 'bg-white text-gray-600'
                : 'bg-zinc-800 text-gray-200'
              }
            `}
         >
            AI Powered Resume Analyzer
        </div>

          <h2 
            className={`
              text-4xl
              md:text-5xl 
              font-bold 
              tracking-tight 
              leading-tight
              ${theme === 'light' 
                ? 'text-gray-800'
                : 'text-white/90'
              }
            `}
          >
            Track, Analyze & Improve
            <span className="text-blue-600"> Your Resume</span>
          </h2>

          <p className="text-base text-gray-600 leading-relaxed max-w-2xl mx-auto ">
            Upload your resume and receive an instant ATS score, detailed AI-powered feedback, keyword optimization suggestions, and personalized recommendations to help your resume pass applicant tracking systems and stand out to recruiters.
          </p>

          <div className="w-full flex flex-wrap justify-center gap-3 pt-2 ">
            {[
              "ATS Score",
              "AI Feedback",
              "Resume Tracking",
              "Secure Account",
              "Analysis History"
            ].map((item) => (
              <span
                key={item}
                className={`
                  px-4 py-2 rounded-full text-sm border
                  ${theme === 'light'
                    ? 'bg-white text-gray-700'
                    : 'bg-zinc-800 text-gray-200 border-zinc-700'
                  }
                `}
              >
                {item}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Link to="/signup">
              <Button className="px-8 py-6 text-base rounded-2xl shadow-lg">
                Start Free
              </Button>
            </Link>

            <Link to="/login">
              <Button
                variant="outline"
                className={`
                  px-8 
                  py-6 
                  text-base 
                  rounded-2xl
                `}
              >
                Login
              </Button>
            </Link>
          </div>

          <p
            className={`
              relative
              text-center
              text-sm 
              mt-16
              ${theme === 'light'
                ? 'text-gray-500'
                : 'text-gray-400'
              }
            `}
          >
            No complicated setup. Create an account, upload your resume,
            and receive actionable feedback in seconds.
          </p>
        </div>
      </main>
    </section>
  );
}