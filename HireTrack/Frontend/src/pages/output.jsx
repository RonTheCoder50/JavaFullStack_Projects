import {
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  FileText,
  Sparkles,
} from "lucide-react";

import { Button } from "@base-ui/react/button";

import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router";

const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function AnalysisOutputPage() {
  // backend response
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state.response;
  const filename = location.state.filename;

  const dt = (location.state.date 
    ? location.state.date.split("T") 
    : null
  );

  let rawDate; 
  let newDate = new Date();
  rawDate = (dt !== null ? new Date(dt[0]) : newDate);
  
  const time = (dt !== null 
    ? dt[1].substring(0, 8)
    : `${newDate.getHours()} : ${newDate.getMinutes()}`
  );
  const date = `${rawDate.getDate()} ${month[rawDate.getMonth()]} ${rawDate.getFullYear()} `

  const scoreColor =
    data?.ats_score >= 80
      ? "text-green-500"
      : data?.ats_score >= 60
      ? "text-yellow-500"
      : "text-red-500";

  return (
    <section className="min-h-screen bg-[#0f172a] text-white px-4 py-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <div className="fixed top-10 right-10 my-4 z-50">
          <Button
            onClick={() => navigate(location.state?.from)}
            className={`border border-red-400 py-1.5 px-3 bg-pink-800 text-white/90 rounded-xl cursor-default hover:scale-102`}>
            Go Back
          </Button>
        </div>

        {/* top card */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Sparkles className="text-sky-400" />
                Resume Analysis
              </h1>

              <p className="text-gray-400 text-sm">
                File: {filename}
              </p>

              <p className="text-gray-500 text-sm">
                Generated on: {" "}
                <span className="text-gray-400">
                  {date + ' | ' + time}
                </span>
              </p>
            </div>

            {/* ATS SCORE */}
            <div className="flex flex-col gap-2 items-center justify-center">
              <div
                className={`text-6xl font-bold ${scoreColor}`}
              >
                {data?.ats_score}
              </div>

              <p className="text-gray-400 tracking-wide">
                ATS SCORE
              </p>
            </div>
          </div>
        </div>

        {/* summary */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <FileText className="text-sky-400" />
            Professional Summary
          </h2>

          <p className="text-gray-300 leading-7">
            {data?.summary}
          </p>
        </div>

        {/* grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* skills */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
              <CheckCircle2 className="text-green-400" />
              Skills
            </h2>

            <div className="flex flex-wrap gap-3">
              {data?.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-300 text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* missing skills */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
              <AlertTriangle className="text-yellow-400" />
              Missing Skills
            </h2>

            <div className="flex flex-wrap gap-3">
              {data?.missing_skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* strengths + weaknesses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* strengths */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h2 className="text-xl font-semibold mb-5 text-green-400">
              Strengths
            </h2>

            <ul className="flex flex-col gap-4">
              {data?.strengths.map((item, idx) => (
                <li
                  key={idx}
                  className="text-gray-300 flex gap-3"
                >
                  <CheckCircle2
                    size={20}
                    className="text-green-400 mt-1"
                  />

                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* weaknesses */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h2 className="text-xl font-semibold mb-5 text-red-400">
              Weaknesses
            </h2>

            <ul className="flex flex-col gap-4">
              {data?.weaknesses.map((item, idx) => (
                <li
                  key={idx}
                  className="text-gray-300 flex gap-3"
                >
                  <AlertTriangle
                    size={20}
                    className="text-red-400 mt-1"
                  />

                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* improvements */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <TrendingUp className="text-sky-400" />
            Suggested Improvements
          </h2>

          <div className="flex flex-col gap-4">
            {data?.improvements.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 text-gray-300"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}