import { Link } from "react-router";
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router";
import { userLoginAPI, userProfileAPI } from "./API";
import { useEffect, useState } from "react";

import { testCall } from "./API";
import { toast } from "sonner";

export default function IntroPage() {
  const navigate = useNavigate();
  const [demo, setDemo] = useState(false);
  const [wakeup, setWakeup] = useState(false);

  useEffect(() => {
    async function wakeUpServer() {
      const resp = await testCall();
      if (resp.status === 200) {
        setWakeup(true);
        toast.success("server wake up.");
      }
    }

    wakeUpServer();
  }, []);

  async function handleDemo() {
    setDemo(true);
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

  return (
    <section className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white">
      {/* Navbar */}
      <header className="flex items-center justify-between px-8 py-6">
        <h2 className="text-2xl font-bold tracking-wide">
          Blog<span className="text-blue-500">App</span>
        </h2>

        <Button
          disabled={demo}
          onClick={handleDemo}
          className={`
            text-white 
            rounded-lg
            ${
              !wakeup
                ? "pointer-events-none bg-gray-700 text-gray-400"
                : "bg-blue-600 hover:bg-blue-700"
            }
          `}
        >
          {demo ? "wait..." : "Demo Account"}
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
              className={`
                rounded-lg 
                px-7 
                py-3 
                font-medium 
                transition 
                ${
                  !wakeup
                    ? "pointer-events-none bg-gray-700 text-gray-400"
                    : "bg-blue-600 hover:bg-blue-700"
                }
              `}
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className={`
                rounded-lg 
                border 
                border-zinc-700 
                px-7 
                py-3 
                font-medium 
                transition 
                hover:bg-zinc-800
                ${!wakeup ? "pointer-events-none text-gray-500" : "text-white"}
              `}
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
