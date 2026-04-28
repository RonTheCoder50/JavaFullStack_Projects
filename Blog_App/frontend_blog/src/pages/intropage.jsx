import { Link } from "react-router";
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router";
import { userLoginAPI, userProfileAPI } from "./API";

export default function IntroPage() {
  const navigate = useNavigate();

  async function handleDemo() {
    localStorage.removeItem('user');
     
    const info = {
      'email': 'recruter123@gmail.com',
      'password': 'recruter@123'
    };

      try {
          const token = await userLoginAPI(info); //login
          localStorage.setItem('token', token); //storing jwt token!
          
          const profile = await userProfileAPI(token);
          console.log('profile: ', profile);

            const userData = {
                id: profile.id,
                username: profile.username,
                email: profile.email,
                password: profile.password,
                role: 'ADMIN'
            }

            localStorage.setItem('user', JSON.stringify(userData)); //store demo user!
            navigate('/dashboard');
      } catch(e) {
        alert('failed to retrive, try again!!');
        console.log(e);
      }
  }

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-300">

      {/* Header */}
      <div className="absolute top-0 w-full text-center py-5 text-xl font-semibold tracking-wide bg-white shadow-sm">
        <h2>Blog Web-App</h2>
        <Button 
          onClick={() => handleDemo()}
          className="absolute top-5 right-5 rounded-md shadow-md border border-gray-600 bg-white text-gray-600 font-medium hover:scale-103 transition-all duration-300 text-sm px-2 py-1"
        >
          DEMO FOR RECRUTERS
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center gap-6 text-center">

        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to Your Blog Platform ✍️
        </h1>

        <p className="text-gray-600 text-lg max-w-md">
          Share your thoughts, explore ideas, and connect with others.
        </p>

        {/* Buttons */}
        <div className="flex gap-6 mt-4">

          <Link
            to="/register"
            className="px-6 py-2 rounded-xl bg-blue-500 text-white font-medium shadow-md hover:bg-blue-600 hover:scale-105 transition-all duration-300"
          >
            Sign Up
          </Link>

          <Link
            to="/login"
            className="px-6 py-2 rounded-xl border border-gray-400 text-gray-700 font-medium hover:bg-gray-800 hover:text-white hover:scale-105 transition-all duration-300"
          >
            Log In
          </Link>
        </div>


      </div>

    </section>
  );
}