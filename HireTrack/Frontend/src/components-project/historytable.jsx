// import React from "react";
import { Eye, Trash2 } from "lucide-react";

export default function HistoryTable({ data }) {

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
              <td className="px-6 py-5 text-sm text-gray-800 font-medium">
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
          ))}
        </tbody>
      </table>
    </div>
  );
}
