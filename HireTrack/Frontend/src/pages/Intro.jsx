import { Button } from "@/components/ui/button"
import { Link } from "react-router"

// export default function IntroPage() {
//     return (
//         <section className="w-full min-h-screen flex flex-col items-center gap-20">
//             <h1 className="text-xl font-medium tracking-wide p-4 w-full shadow-md text-center">
//                 HireTrack.in
//             </h1>
//             <div className="my-6 p-4 flex items-center gap-10 tracking-wide">
//                 <Button className={`text-base font-medium py-2 px-4`}>
//                     <Link to={'/signup'}>
//                         Signup
//                     </Link>
//                 </Button>

//                 <Button className={`text-base font-medium py-2 px-4`}>
//                     <Link to={'/login'}>
//                         Login
//                     </Link>
//                 </Button>
//             </div>
//         </section>
//     )
// }

export default function IntroPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex flex-col">
      
      {/* Navbar */}
      <header className="w-full flex items-center justify-between px-8 py-5 border-b bg-white/80 backdrop-blur-sm">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          HireTrack
          <span className="text-blue-600">.in</span>
        </h1>

        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button
              variant="ghost"
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
          
          <div className="inline-flex items-center rounded-full border px-4 py-1 text-sm text-gray-600 bg-white shadow-sm">
            AI Powered Resume Analyzer
          </div>

          <h2 className="text-4xl lg:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
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
                className="px-8 py-6 text-base rounded-2xl"
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