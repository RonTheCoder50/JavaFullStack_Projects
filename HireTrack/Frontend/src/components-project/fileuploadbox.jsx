import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Upload, ImageIcon } from "lucide-react";
import { analyzedResumeAPI } from "@/API";
import { useTheme } from "@/pages/theme";

export default function FileUploadBox({ setLoading }) {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState("");
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
      console.log("file: ", file);

      analyzeApiCall(file);
    }
  };

 
  async function analyzeApiCall(file) {
    setLoading(true); // loading ON

    try {
      const response = await analyzedResumeAPI(file);

      if (response) {
        navigate('/analysis-output', {
          state: {
            response,
            filename: file?.name,
            from: location.pathname,
          },
        });
      }
    } catch (err) {
      alert('daily ' + err.response?.data?.message || 'limit exceed!');
    } finally {
      setLoading(false); // loading OFF (always runs)
      setSelectedFile(null);
      setFileName('');
    }
  }
  return (
    <div className="w-full flex justify-center">
      <div
        onClick={handleClick}
        className={`
          w-full max-w-md h-72
          border-2
          border-dashed 
          rounded-3xl
          hover:border-sky-300
          ${theme === 'light'
            ? 'hover:bg-gray-50 border-gray-300'
            : 'hover:bg-zinc-800 border-gray-500'
          }
          transition-all duration-300
          cursor-pointer
          flex flex-col items-center justify-center
          gap-4 
          shadow-sm
        `}
      >
        <div className="p-5 rounded-full bg-gray-100">
          <Upload className="w-10 h-10 text-gray-700" />
        </div>

        <div className="text-center px-4">
          <h2 
            className={`
              text-xl 
              font-semibold 
              ${theme === 'light' 
                ? 'text-gray-800'
                : 'text-gray-300'
              }
            `}
          >
            Upload File
          </h2>

          <p 
            className={`
              text-sm
              mt-1
              ${theme === 'light' 
                ? 'text-gray-500'
                : 'text-gray-400'
              }
            `}
            >
            Click here to browse your files
          </p>

          {fileName && (
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-green-600 font-medium">
              <ImageIcon size={18} />
              {fileName}
            </div>
          )}
        </div>

        <input
          type="file"
          ref={inputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}