import { useState } from "react";
import axios from "axios";

export default function AnalyzeResumePage() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [isSent, setIsSent] = useState(false);

  //backend call !
  async function handleSubmit() {
    console.log('saved file: ', file);
    setIsSent(true);

    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const request = await axios.post(`http://localhost:8080/file/upload`, formData);
      if(request.status === 500) {
        console.log('unsupported file type!');
        return;
      }

      setData(request.data);
      setFile(null);
      setIsSent(false);
      console.log('backend AI response: ', request.data);
    } catch(err) {
      console.log(err.response.data);
    }
  }

  //saved file in a state!
  function handleFileInput(e) {
    const seletedFile = e.target.files[0];
    console.log(seletedFile);
    setFile(seletedFile);
  }
  
  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center p-4 gap-6">
      <input 
        onChange={(e) => handleFileInput(e)}
        type="file" 
        className="border p-3 bg-slate-300"
      />

      <button
        onClick={() => handleSubmit()} 
        disabled={!file}
        className={`border py-1 px-4 rounded-sm
        ${!file 
          ? 'bg-gray-300 text-black/60' 
          : 'bg-red-500 text-white'}`
        }
      >
        {isSent ? 'Uploading...' : 'Upload File'}
      </button>
        
      <hr className="border-gray-500 mt-6 w-full max-w-[90%]" />

      {/* resume detailed expanded */}
      <div className="my-8 p-2 text-base font-medium tracking-wide">
        {data === null 
          ? 'No data found.' 
          : <Result data={data} /> 
        }
      </div>
    </section>
  );
}
 
function Result({ data }) {
  return (
    <div className="p-6 space-y-6 bg-gray-900 text-white shadow-lg/40 rounded-lg">

      <h1># ATS Score: {data.ats_score}/100</h1>

      <div>
        <h2># Summary</h2>
        <p>{data.summary}</p>
      </div>

      <div style={{ display: "flex", gap: "40px" }}>
        <div>
          <h2>1. Skills</h2>
          {data.skills.map((s, i) => <p key={i}>{s}</p>)}
        </div>

        <div>
          <h2>2. Missing Skills</h2>
          {data.missing_skills.map((s, i) => <p key={i}>{s}</p>)}
        </div>
      </div>

      <div>
        <h2>3. Strengths</h2>
        {data.strengths.map((s, i) => <p key={i}>{s}</p>)}
      </div>

      <div>
        <h2>4. Weaknesses</h2>
        {data.weaknesses.map((s, i) => <p key={i}>{s}</p>)}
      </div>

      <div>
        <h2>5. Improvements</h2>
        {data.improvements.map((s, i) => <p key={i}>{s}</p>)}
      </div>

    </div>
  );
}