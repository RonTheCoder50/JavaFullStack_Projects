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
      
      {/* Navbar */}
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
          
          <div 
            className={`
              inline-flex
              items-center
              rounded-full 
              border 
              px-4 
              py-1 
              text-sm  
              shadow-sm
              ${theme === 'light'
                ? 'text-gray-600 bg-white'
                : 'text-gray-200 bg-zinc-800'
              }
            `}
          >
            AI Powered Resume Analyzer
          </div>

          <h2 
            className={`
              text-4xl
              lg:text-5xl 
              md:text-6xl 
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

          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Upload your resume and get instant ATS analysis,
            improvement suggestions, and smart tracking with HireTrack.
          </p>

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
        </div>
      </main>
    </section>
  );
}