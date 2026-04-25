import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function AboutPage() {
  const navigate = useNavigate();
  const techStack = [
    "React.js",
    "Spring Boot",
    "JWT Auth",
    "MySQL",
    "Tailwind CSS",
    "REST APIs",
  ];

  const features = [
    "User Authentication & Authorization (JWT)",
    "Role-Based Access (Admin/User)",
    "Create, Edit, Delete Blogs",
    "Like, Comment, Bookmark",
    "Search & Filter Blogs",
    "Dark Mode Support",
    "Responsive Design",
  ];

  return (
    <div className="min-h-screen px-6 py-10 md:px-16 lg:px-24 bg-gray-800 text-white">
        <Button 
            className={'absolute top-10 left-10 p-4 py-2'}
            onClick={() => navigate('/dashboard')}
        >
            back
        </Button>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          About This Blog App
        </h1>
        <p className="text-base md:text-lg text-gray-400 dark:text-gray-300">
          A full-stack blogging platform built to share ideas, explore content,
          and practice real-world development skills.
        </p>
      </motion.div>

      {/* Tech Stack */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>
        <div className="flex flex-wrap gap-3">
          {techStack.map((tech, index) => (
            <Badge key={index} className="p-4 text-sm border hover:border-sky-500">
              {tech}
            </Badge>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-12 grid md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="rounded-2xl bg-gray-600 shadow-md text-white hover:translate-y-1 transition-all delay-75 ease-in-out duration-200 border border-gray-500 hover:border-sky-500">
            <CardContent className="px-4 py-2">
              <p className="text-sm md:text-base">{feature}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* About Developer */}
      <section className="mt-16 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4">About Developer</h2>
        <p className="text-gray-400">
          Hi I'm rohan👋, I'm a Computer Science student passionate about full-stack
          development. This project showcases my skills in building scalable web
          applications using modern technologies.
        </p>
      </section>

      {/* Footer */}
      <footer className="mt-16 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Blog App. Built with ❤️
      </footer>
    </div>
  );
}
