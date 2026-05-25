import { removeRecentAnalysisAPI, removeUserAPI, viewRecentAnalysisAPI } from "@/API";
import { Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";

import { toggleBlockAPI, viewAnalysesAPI } from "@/API";

export function HistoryTable({ data, refresh }) {
  const navigate = useNavigate();

  async function handleViewFile(filename) {
    //access click file data from analysis
    const analysis = await viewRecentAnalysisAPI(filename);
    console.log(analysis);

    if(analysis) {
      navigate(
          '/analysis-output',
          {
            state: {
              response: JSON.parse(analysis.content),
              filename: analysis.filename,
              date: analysis.date
            }
          }
      );
    } else {
      alert('failed to open resume analysis!');
    }
  }

  async function handleDeleteAnalysis(filename) {
    const permission = confirm(
      'do you want to delete ?'
    );

    if(!permission) {
      return;
    }

    await removeRecentAnalysisAPI(filename);
    await refresh(); //refreshing new data!
  }

  return (
    <div className="w-full max-w-[95%] mx-auto overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full min-w-[700px] border-collapse">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
              Resume Name
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
              ATS Score
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
              Date
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {data?.length === 0 && 
            <tr
              key={0}
              className="border-t border-gray-100 hover:bg-gray-50 transition"
            >
              <td className="px-6 py-5 text-sm text-gray-800 font-medium">
                not found
              </td>

              <td className="px-6 py-5">
                <span
                  className={`
                    px-3 py-1 rounded-full text-xs font-semibold
                     bg-green-100 text-green-700    
                  `}
                >
                  {0}%
                </span>
              </td>

              <td className="px-6 py-5 text-sm text-gray-500">
                undefined
              </td>

              <td className="px-6 py-5">
                <div className="flex items-center justify-center gap-3">
                  <button
                    className="
                      p-2 rounded-lg
                      hover:bg-gray-100
                      transition
                    "
                  >
                    <Eye size={18} className="text-gray-600" />
                  </button>

                  <button
                    className="
                      p-2 rounded-lg
                      hover:bg-red-100
                      transition
                    "
                  >
                    <Trash2 size={18} className="text-red-500" />
                  </button>
                </div>
              </td>
            </tr>
          }

          {data?.map((resume, index) => (
            <tr
              key={index}
              className="border-t border-gray-100 hover:bg-gray-50 transition"
            >
              <td  className="px-6 py-5 text-sm text-gray-800 font-medium">
                {resume?.fileName}
              </td>

              <td className="px-6 py-5">
                <span
                  className={`
                    px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      resume.score >= 85
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  `}
                >
                  {resume?.avgAtsScore}%
                </span>
              </td>

              <td className="px-6 py-5 text-sm text-gray-500">
                {resume?.date}
              </td>

              <td className="px-6 py-5">
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewFile(resume?.fileName);
                    }}
                    className="
                      p-2 rounded-lg
                      hover:bg-gray-100
                      transition
                    "
                  >
                    <Eye size={18} className="text-gray-600" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAnalysis(resume?.fileName);
                    }}
                    className="
                      p-2 rounded-lg
                      hover:bg-red-100
                      transition
                    "
                  >
                    <Trash2 size={18} className="text-red-500" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function UserInfoTable({ refresh, data, value, handleInput }) {

  data = data?.filter(user => !user.roles?.includes('ROLE_ADMIN'));

  //api call to block/unblock..
  async function handleBlock(id, username) {
    if(!confirm('do you want to block/unblock the click user?')) {
      return;
    }
    
    const response = await toggleBlockAPI(id, username);
    if(response) {
      refresh(); //for rerender admin_data!
      console.log(response);
    }
  }

  //delete user
  async function handleDeleteUser(id, username) {
    if(!confirm(`Are you serious about to remove user ${ username} ?`)) {
      return;
    }

    const response = await removeUserAPI(id, username);
    if(response) {
      refresh();
      console.log(response);
    } 
  } 

  return (
    <div className="w-full max-w-[97%] mx-auto flex flex-col gap-6 overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm mb-4">
      <div className="pt-4 flex justify-around items-center">
        <h1 className="text-lg md:text-xl font-bold tracking-wide">
          USER INFO CHART
        </h1>

        <input
          onChange={handleInput}
          value={value}
          type="text" 
          className={`
            border
          border-gray-400
          focus:border-gray-950 
            focus:ring-2 
          ring-sky-400 
            py-1 px-3 
            rounded-md
          `}

          placeholder="search by username"
        />
      </div>

      <table className="w-full min-w-[900px] border-collapse">

        <thead className="bg-gray-50">

          <tr>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
              No.
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
              ID
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
              Name
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
              Date Of Joining
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
              Plan
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
              Total Analyses
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
              Avg ATS
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {data?.map((user, index) => (

            <tr
              key={user?.userId}
              className="border-t border-gray-100 hover:bg-gray-50 transition"
            >

              <td className="px-6 py-5 text-sm text-gray-700">
                {index + 1}
              </td>

              <td className="px-6 py-5 text-sm text-gray-700">
                #{user?.userId}
              </td>

              <td className="px-6 py-5 text-sm font-medium text-gray-800">
                {user?.username}
              </td>

              <td className="px-6 py-5 text-sm text-gray-700">
                {user?.dateOfJoining}
              </td>

              <td className="px-6 py-5 text-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${
                    user.plan === "PRO"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {user?.plan}
                </span>
              </td>

              <td className="px-6 py-5 text-center text-sm text-gray-700">
                {user?.totalAnalyses}
              </td>

              <td className="px-6 py-5 text-center text-sm font-medium text-blue-600">
                {user?.avgAtsScore.toFixed(2)}%
              </td>

              <td className="px-6 py-5">

                <div className="flex items-center justify-center gap-3">

                  <button
                    onClick={() =>
                      handleBlock(user?.userId, user?.username)
                    }
                    className="px-4 py-2 rounded-lg bg-yellow-100 text-yellow-700 text-sm font-medium hover:bg-yellow-200 transition"
                  >
                    {user?.isBlock ? 'Unblock' : 'Block'}
                  </button>

                  <button
                    onClick={() => 
                      handleDeleteUser(user?.userId, user?.username)
                    }
                    className="px-4 py-2 rounded-lg bg-red-100 text-red-700 text-sm font-medium hover:bg-red-200 transition"
                  >
                    Delete
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export function AnalysesDataTable({ data, value, handleInput }) {
  const navigate = useNavigate();

  async function handleViewFile(id, filename) {
    //access click file data from analysis
    const analysis = await viewAnalysesAPI(id, filename);
    console.log(id + ' ' + filename);
    console.log(analysis);

    if(analysis) {
      navigate(
          '/analysis-output',
          {
            state: {
              response: JSON.parse(analysis.content),
              filename: analysis.filename,
              date: analysis.date
            }
          }
      );
    } else {
      alert('failed to open resume analysis!');
    }
  }

  return (
    <div className="w-full max-w-[97%] mx-auto flex flex-col gap-6 overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm mb-4">
      <div className="pt-4 flex justify-around items-center">
        <h1 className="text-lg md:text-xl font-bold tracking-wide">
          USER ANALYSES CHART
        </h1>

        <input
          onChange={handleInput}
          value={value}
          type="text" 
          className={`
            border
          border-gray-400
          focus:border-gray-950 
            focus:ring-2 
          ring-sky-400 
            py-1 px-3 
            rounded-md
          `}

          placeholder="search by username"
        />
      </div>

      <table className="w-full min-w-[900px] border-collapse">

        <thead className="bg-gray-50">

          <tr>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
              No.
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
              username
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
              filename
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
              date
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
              ATS
            </th>
          
            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
              View
            </th>

          </tr>

        </thead>

        <tbody>

          {data?.map((analysis, index) => (

            <tr
              key={index}
              className="border-t border-gray-100 hover:bg-gray-50 transition"
            >

              <td className="px-6 py-5 text-sm text-gray-700">
                {index + 1}
              </td>

              <td className="px-6 py-5 text-sm font-medium text-gray-800">
                {analysis?.username}
              </td>

              <td className="px-6 py-5 text-sm font-medium text-gray-800">
                {analysis?.filename}
              </td>

              <td className="px-6 py-5 text-sm text-gray-700">
                {
                  analysis?.time?.split('T')[0] 
                  + ' | ' + analysis?.time?.split('T')[1].substring(0, 8) 
                  || undefined
                }
              </td>

              <td className="px-6 py-5 text-center text-sm font-medium text-blue-600">
                {analysis?.ats.toFixed(2)}%
              </td>

              <td className="px-6 py-5">

                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => handleViewFile(analysis?.uid, analysis?.filename)}
                    className="px-4 py-2 rounded-lg bg-red-100 text-red-700 text-sm font-medium hover:bg-red-200 transition"
                  >
                    <Eye />
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}