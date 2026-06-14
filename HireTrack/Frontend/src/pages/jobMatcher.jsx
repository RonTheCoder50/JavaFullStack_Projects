// a input that user can upload resume.
// a textArea where user can paste their Job descripion
// manage output in a same page.
// state management + useEffect (track api's)

import ResumeInputComponent from "@/components-project/resumeInput";
import { useTheme } from "./theme";
import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { analyzeJobMatchingAPI } from "@/API";

import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import { Button } from "@base-ui/react/button";

export default function JobMatcherPage() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [text, setText] = useState(""); //job description
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);

    if (file) {
      setFileName(file.name);
      setSelectedFile(file);
    }
  };

  async function analyzeApiCall() {
    if (selectedFile === null) {
      toast.warn("select resume file first!");
      return;
    }

    if (text.trim().length === 0 || text.trim().length < 20) {
      toast.warn("Paste enough job description!");
      return;
    }

    try {
      setLoading(true); // loading ON
      const response = await analyzeJobMatchingAPI(selectedFile, text);

      console.log(response);
      if (response) {
        navigate("/job-matcher-output", {
          state: response,
        });
      }
    } catch (err) {
      const status = err.response?.status;

      if (status === 429) {
        toast.error("AI usage limit reached. Please try later.");
      } else if (status === 503) {
        toast.error("AI service is busy due to high traffic.");
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setLoading(false); // loading OFF (always runs)
      setSelectedFile(null);
      setFileName("");
      setText("");
    }
  }

  return (
    <section
      className={`
        w-full
        min-h-screen
        flex 
        flex-col
        items-center
        gap-20  
        p-6
        mt-4
    `}
    >
      {/* Heading..*/}
      <div
        className="
        w-full 
        border-b-2
        border-gray-500
        rounded-sm
        py-2
        px-4
        flex 
        justify-center
        relative
      "
      >
        <div className="absolute left-0 sm:left-5 p-1 z-50">
          <Button
            onClick={() => navigate("/main")}
            className={`border border-red-400 py-1.5 px-2 sm:px-3 bg-pink-800 text-white/90 rounded-xl cursor-default hover:scale-102 text-xs sm:text-sm`}
          >
            Go Back
          </Button>
        </div>

        <div className="flex flex-col items-center gap-0">
          <h1 className="text-lg sm:text-xl font-semibold text-center">
            Resume vs Job Description
          </h1>

          <p className="text-xs sm:text-sm text-gray-500 mt-2 text-center">
            Get an instant match score, skill gap analysis, and feedback.
          </p>
        </div>
      </div>

      <div className="absolute top-28 left-1/2 -translate-x-1/2">
        <TailSpin
          height={80}
          width={80}
          color="gray"
          ariaLabel="tail-spin-loading"
          visible={loading}
        />
      </div>

      <ResumeInputComponent
        handleClick={handleClick}
        handleFileChange={handleFileChange}
        theme={theme}
        fileName={fileName}
        inputRef={inputRef}
      />

      {/* textarea & buttons */}
      <div className="w-full flex flex-col items-center gap-6">
        <textarea
          disabled={loading}
          value={text}
          placeholder="Paste your job description here."
          onChange={(e) => setText(e.target.value)}
          className={`
            w-full 
            max-w-[400px] 
            sm:max-w-[450px] 
            border
            py-2 px-4
            rounded-md
            text-sm
            tracking-normal
            font-normal
          `}
          rows={8}
        />

        <div className="mt-1 flex flex-wrap justify-center items-center gap-10">
          <Button
            onClick={() => {
              setSelectedFile(null);
              setFileName("");
              setText("");
            }}
            className={`
                  border
                  border-pink-500
                  text-pink-500
                  hover:bg-pink-500
                  hover:text-gray-100
                    transition-all
                    delay-75
                    duration-150
                    ease-linear      
                    py-2 px-6
                    w-24
                    rounded-sm
                    text-sm 
                    tracking-wide
                    font-normal
                    flex justify-center
                  `}
          >
            Clear
          </Button>

          <Button
            onClick={() => analyzeApiCall(selectedFile)}
            className={`
                    border
                  border-gray-500
                  text-gray-500
                  hover:bg-gray-500
                  hover:text-gray-100
                    transition-all
                    delay-75
                    duration-150
                    ease-linear      
                    py-2 px-6
                    w-24
                    rounded-sm
                    text-sm 
                    tracking-wide
                    font-normal
                    flex justify-center
                  `}
          >
            Analyze
          </Button>
        </div>
      </div>
    </section>
  );
}
