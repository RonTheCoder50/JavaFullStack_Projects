import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Upload, ImageIcon } from "lucide-react";
import { analyzedResumeAPI, getStoreAnalyzedAPI } from "@/API";

export default function FileUploadBox({ toggle }) {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();

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
    toggle();  //loading enable..
    try {
      //1. check catched in db is exist?
      const analysis = await getStoreAnalyzedAPI(file?.name);
      if(analysis) {
        console.log("db cache response:", analysis);
        navigate(
          '/analysis-output',
          {
            state: {
              response: JSON.parse(analysis.content),
              filename: analysis.filename,
              date: analysis.date,
              from: location.pathname
            }
          }
        );
        
        return;
      }

      //2. AI response
      const response = await analyzedResumeAPI(file);
      console.log('anlysis response: ', response);

      if(response !== null && response !== undefined) {
        navigate(
          '/analysis-output',
          {
            state: {
              response,
              filename: file?.name,
              from: location.pathname
            }
          }
        );
      }
    } catch(e) {
      alert(`Limit Exceed!`);
      console.log(e);
    } finally {
      toggle();
    }

    setSelectedFile(null);
    setFileName('');
  }

  return (
    <div className="w-full flex justify-center">
      <div
        onClick={handleClick}
        className="
          w-full max-w-md h-72
          border-2 border-dashed border-gray-300
          rounded-3xl
          bg-white
          hover:border-sky-300
          hover:bg-gray-50
          transition-all duration-300
          cursor-pointer
          flex flex-col items-center justify-center
          gap-4 
          shadow-sm
        "
      >
        <div className="p-5 rounded-full bg-gray-100">
          <Upload className="w-10 h-10 text-gray-700" />
        </div>

        <div className="text-center px-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Upload File
          </h2>

          <p className="text-sm text-gray-500 mt-1">
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