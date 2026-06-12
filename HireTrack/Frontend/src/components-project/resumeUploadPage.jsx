import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Upload, ImageIcon } from "lucide-react";
import { analyzedResumeAPI } from "@/API";
import { useTheme } from "@/pages/theme";
import { toast } from "react-toastify";

import { TailSpin } from "react-loader-spinner";
import { Button } from "@base-ui/react/button";
import ResumeInputComponent from "./resumeInput";

export default function ResumeUploadPage() {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFileName(file.name);
      setSelectedFile(file);
    }
  };

  async function analyzeApiCall(file) {
    if (selectedFile === null) {
      toast.warn("select resume file first!");
      return;
    }

    try {
      setLoading(true); // loading ON
      const response = await analyzedResumeAPI(file);

      if (response) {
        navigate("/analysis-output", {
          state: {
            response,
            filename: file?.name,
            from: location.pathname,
          },
        });
      }
    } catch (err) {
      const status = err.response?.status;
      console.log(status);

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
    }
  }
  return (
    <div className="w-full my-4 flex flex-col gap-20 p-4 relative">
      {/* Heading */}
      <div
        className={`
          grid
          grid-cols-3
          items-center
          gap-4
          border
          rounded-md
          p-3
          mt-0
          relative
        `}
      >
        <Button
          onClick={() => navigate("/main")}
          className={`
            border
            hover:border-red-800
            transition-all
            delay-75
            duration-150
            ease-linear
            hover:bg-red-500
            justify-self-start 
            ml-2
            hover:ring
            hover:ring-pink-500
            py-2 px-6
            rounded-md
            text-xs
            sm:text-sm 
            tracking-wide
            font-normal
            hover:scale-102
          `}
        >
          Back
        </Button>

        <h1
          className={`
          text-center 
          text-sm
          sm:text-base 
          lg:text-lg 
          tracking-wide 
          font-normal 
          col-span-2
          sm:col-span-1
        `}
        >
          Analyzed Your Resume by uploading file here.
        </h1>
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

      {/* Input */}
      <ResumeInputComponent
        handleClick={handleClick}
        handleFileChange={handleFileChange}
        theme={theme}
        fileName={fileName}
        inputRef={inputRef}
      />

      <div className="mt-1 flex flex-wrap justify-center items-center gap-10">
        <Button
          onClick={() => {
            setSelectedFile(null);
            setFileName("");
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
  );
}
