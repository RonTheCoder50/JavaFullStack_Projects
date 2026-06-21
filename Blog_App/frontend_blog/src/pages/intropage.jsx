import { Link } from "react-router";
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router";
import { userLoginAPI, userProfileAPI } from "./API";

export default function IntroPage() {
  const navigate = useNavigate();

  async function handleDemo() {
    localStorage.removeItem("user");

    const info = {
      email: "demo0123@gmail.com",
      password: "demo0123$",
    };

    try {
      const token = await userLoginAPI(info); //login
      localStorage.setItem("token", token); //storing jwt token!

      const profile = await userProfileAPI(token);
      const userData = {
        id: profile.id,
        username: profile.username,
        email: profile.email,
        role: "ADMIN",
      };

      localStorage.setItem("user", JSON.stringify(userData)); //store demo user!
      navigate("/dashboard");
    } catch (e) {
      alert("failed to retrive, try again!!");
      console.log(e);
    }
  }

  // return (
  //   <section className="min-h-screen w-full flex flex-col items-center justify-center bg-zinc-950">
  //     {/* Header */}
  //     <div className="absolute top-0 w-full text-center py-5 text-xl font-semibold tracking-wide shadow-sm bg-zinc-900">
  //       <h2 className="text-gray-100">Blog Web-App</h2>
  //       <Button
  //         onClick={() => handleDemo()}
  //         className="absolute top-5 right-5 rounded-md shadow-md border border-gray-600  text-gray-100 font-medium hover:scale-103 transition-all duration-300 text-sm px-2 py-1"
  //       >
  //         DEMO FOR RECRUTERS
  //       </Button>
  //     </div>

  //     {/* Main Content */}
  //     <div className="flex flex-col items-center gap-6 text-center">
  //       <h1 className="text-4xl font-bold text-gray-800">
  //         Welcome to Your Blog Platform ✍️
  //       </h1>

  //       <p className="text-gray-600 text-lg max-w-md">
  //         Share your thoughts, explore ideas, and connect with others.
  //       </p>

  //       {/* Buttons */}
  //       <div className="flex gap-6 mt-4">
  //         <Link
  //           to="/register"
  //           className="px-6 py-2 rounded-xl bg-blue-500 text-white font-medium shadow-md hover:bg-blue-600 hover:scale-105 transition-all duration-300"
  //         >
  //           Sign Up
  //         </Link>

  //         <Link
  //           to="/login"
  //           className="px-6 py-2 rounded-xl border border-gray-400 text-gray-700 font-medium hover:bg-gray-800 hover:text-white hover:scale-105 transition-all duration-300"
  //         >
  //           Log In
  //         </Link>
  //       </div>
  //     </div>
  //   </section>
  // );

  return (
    <section className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white">
      {/* Navbar */}
      <header className="flex items-center justify-between px-8 py-6">
        <h2 className="text-2xl font-bold tracking-wide">
          Blog<span className="text-blue-500">App</span>
        </h2>

        <Button
          onClick={handleDemo}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Demo Account
        </Button>
      </header>

      {/* Hero Section */}
      <div className="mt-8 flex min-h-[80vh] items-center justify-center px-6 py-4">
        <div className="max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Share Ideas.
            <br />
            Write Stories.
            <br />
            <span className="text-blue-500">Connect People.</span>
          </h1>

          <p className="mt-6 text-zinc-400 text-lg max-w-xl mx-auto">
            A modern blogging platform where users can write articles, manage
            posts, and explore content from other creators.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              to="/register"
              className="rounded-lg bg-blue-600 px-7 py-3 font-medium transition hover:bg-blue-700"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="rounded-lg border border-zinc-700 px-7 py-3 font-medium transition hover:bg-zinc-800"
            >
              Login
            </Link>
          </div>

          {/* Features */}
          <div className="mt-16 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <h3 className="font-semibold">✍️ Create Posts</h3>
              <p className="mt-2 text-sm text-zinc-400">
                Publish and manage your articles.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <h3 className="font-semibold">🔒 Secure Auth</h3>
              <p className="mt-2 text-sm text-zinc-400">
                JWT authentication and protected routes.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <h3 className="font-semibold">⚡ Fast Experience</h3>
              <p className="mt-2 text-sm text-zinc-400">
                Built using React and Spring Boot.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
