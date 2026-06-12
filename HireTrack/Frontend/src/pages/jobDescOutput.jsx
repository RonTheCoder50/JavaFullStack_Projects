import { useLocation } from "react-router";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Button } from "@base-ui/react/button";
import { useNavigate } from "react-router";

export default function JobMatchingOutput() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;
  const overall = data?.overall_match || 0;

  useEffect(() => {
    if (overall >= 80) {
      toast.success("Excellent Match 🚀");
    } else if (overall >= 60) {
      toast.success("Good Match 👍");
    } else if (overall >= 40) {
      toast.warn("Needs Improvement ⚠️");
    } else {
      toast.error("Low Match ❌");
    }
  }, [overall]);

  return (
    <section className="w-full min-h-screen flex flex-col items-center gap-16 p-2 mt-10">
      <div className="fixed top-10 left-5 my-4 z-50">
        <Button
          onClick={() => navigate("/job-matcher")}
          className={`border border-red-400 py-1.5 px-3 bg-pink-800 text-white/90 rounded-xl cursor-default hover:scale-102`}
        >
          Go Back
        </Button>
      </div>

      <div className="w-full max-w-[85%] md:max-w-[750px] rounded-xl border p-6 text-center">
        <h2>Overall Matching</h2>
        <p className="text-5xl font-bold text-green-500 mt-2">
          {data?.overall_match || 0}%
        </p>
      </div>

      <div className="w-full flex flex-col items-center gap-6">
        <ScroeBar label="Technical Skills" score={data?.technical_match || 0} />

        <ScroeBar label="Experience" score={data?.experience_match || 0} />

        <ScroeBar label="Education" score={data?.education_match || 0} />
      </div>

      {/* Missing skills */}
      <div className="w-full max-w-[85%] md:max-w-[750px] rounded-xl border p-4">
        <h3 className="font-semibold mb-3">Missing Skills</h3>

        <div className="flex flex-wrap gap-2">
          {data?.top_missing_skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ScroeBar({ label, score }) {
  return (
    <div className="w-full max-w-[85%] md:max-w-[750px] space-y-2">
      <div className="flex justify-between">
        <span>{label}</span>
        <span>{score}%</span>
      </div>

      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div
          className="bg-sky-500 h-2 rounded-xl"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
