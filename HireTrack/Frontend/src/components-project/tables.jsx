import { removeRecentAnalysisAPI, removeUserAPI, viewRecentAnalysisAPI } from "@/API";
import { Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";

import { toggleBlockAPI, viewAnalysesAPI } from "@/API";
import { useTheme } from "@/pages/theme";
// import { useState } from "react";

export function HistoryTable({
  data,
  refresh,
  value,
  handleInput,
  sortBy,
  handleSortBy,
  order,
  handleOrder,
  page,
  handlePage,
  isLastPage
}) {
  const navigate = useNavigate();
  const { theme } = useTheme();

  async function handleViewFile(filename) {
    //access click file data from analysis
    const analysis = await viewRecentAnalysisAPI(filename);

    if(analysis) {
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
    <div className="w-full max-w-[95%] flex flex-col gap-6 mx-auto overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
      <div className="pt-4 flex justify-between px-6 items-center">
        <h1 className="text-lg md:text-xl font-bold tracking-wide">
          HISTORY TABLE
        </h1>

        <div className="flex items-center gap-3">
          <input
            onChange={handleInput}
            value={value}
            type="text" 
            className={`
              border
            border-gray-500
            focus:border-gray-950 
              focus:ring-2 
            ring-sky-400 
              py-1 px-3 
              rounded-md
            `}

            placeholder="search by username"
          />

          <select 
            value={sortBy}
            onChange={(e) => {
              handleSortBy(e.target.value)
            }}

            className={`
              p-2 border rounded-md
              ${theme === 'light' 
                ? 'bg-white text-black'
                : 'bg-black text-white'
              }
            `}
          >
            <option value="fileName">filename</option>
            <option value="date">latest date</option>
            <option value="ats">ATS</option>
          </select>

          <select 
            value={order}  
            onChange={(e) => {
              handleOrder(e.target.value);
            }}
            className={`
              p-2 border rounded-md
              ${theme === 'light' 
                ? 'bg-white text-black'
                : 'bg-black text-white'
              }
            `}
          >
           <option value="asc">ascending</option>
           <option value="desc">descending</option>
          </select>
        </div>
      </div>

      <table className="w-full min-w-[700px] border-collapse">
        <thead className={`
          ${theme === 'light' 
            ? 'bg-gray-50'
            : 'bg-zinc-800'
          }
        `}
        >
          <tr>
            <TableHead value={'Resume Name'} />
            <TableHead value={'ATS Score'} />
            <TableHead value={'Date'} />
            <TableHead value={'Action'} />
          </tr>
        </thead>

        <tbody className="text-center">
          {data?.length === 0 && 
            <tr
              key={0}
              className={`
                border-t
                transition
                ${theme === 'light'
                  ? 'border-gray-100 hover:bg-gray-50'
                  : 'border-gray-400 hover:bg-zinc-950'
                }  
              `}
            >
              <TableData value={'not found'} />
              <TableData value={'0%'} />
              <TableData value={'undefined'} />

              <td className="px-6 py-5">
                <div className="flex items-center justify-center gap-3">
                  <button
                    className={`
                      p-2 rounded-lg
                      transition
                      ${theme === 'light' 
                        ? 'hover:bg-gray-100'
                        : 'hover:bg-gray-700'
                      }
                    `}
                  >
                    <Eye size={18}
                      className={`
                        ${theme === 'light'
                          ? 'text-gray-600'
                          : 'text-gray-200'
                        }
                      `} 
                    />
                  </button>

                  <button
                    className={`
                      p-2 rounded-lg
                      transition
                      ${theme === 'light' 
                        ? 'hover:bg-gray-100'
                        : 'hover:bg-gray-700'
                      }
                    `}
                  >
                    <Trash2 size={18} 
                      className={`
                       text-red-500
                      `} 
                    />
                  </button>
                </div>
              </td>
            </tr>
          }

          {data?.map((resume, index) => (
            <tr
              key={index}
              className={`
                border-t
                transition
                ${theme === 'light'
                  ? 'border-gray-100 hover:bg-gray-50'
                  : 'border-gray-400 hover:bg-zinc-800'
                }  
              `}
            >
              <td  
                className={`
                  px-6
                  py-5 
                  text-sm 
                  font-medium
                  ${theme === 'light' 
                    ? 'text-gray-800'
                    : 'text-gray-200'
                  }
                `}
              >
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

              <td  
                className={`
                  px-6
                  py-5 
                  text-sm 
                  font-medium
                  ${theme === 'light' 
                    ? 'text-gray-500'
                    : 'text-gray-300'
                  }
                `}
              >
                {resume?.date}
              </td>

              <td className="px-6 py-5">
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewFile(resume?.fileName);
                    }}
                    className={`
                      p-2 rounded-lg
                      transition
                      ${theme === 'light' 
                        ? 'hover:bg-gray-100'
                        : 'hover:bg-gray-700'
                      }
                    `}
                  >
                    <Eye size={18} 
                      className={`
                        ${theme === 'light'
                          ? 'text-gray-600'
                          : 'text-gray-200'
                        }
                      `} 
                    />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAnalysis(resume?.fileName);
                    }}
                    className={`
                      p-2 rounded-lg
                      transition
                      ${theme === 'light' 
                        ? 'hover:bg-gray-100'
                        : 'hover:bg-gray-700'
                      }
                    `}
                  >
                    <Trash2 size={18} className="text-red-500" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-center gap-6 mb-4">
        <button
          onClick={() => handlePage('prev')}
          disabled={page === 0}
          className={`
            px-4 py-1 rounded-md border transition
            disabled:opacity-50 disabled:cursor-not-allowed
            ${
              theme === 'light'
                ? 'bg-white text-black hover:bg-gray-100'
                : 'bg-black text-white hover:bg-zinc-900'
            }
          `}
        >
          ← Prev
        </button>

        <span
          className={`font-medium ${
            theme === 'light' ? 'text-black' : 'text-white'
          }`}
        >
          Page {page + 1}
        </span>

        <button
          onClick={() => handlePage('next')}
          disabled={isLastPage}
          className={`
            px-4 py-1 rounded-md border transition
            disabled:opacity-50 disabled:cursor-not-allowed
            ${
              theme === 'light'
                ? 'bg-white text-black hover:bg-gray-100'
                : 'bg-black text-white hover:bg-zinc-900'
            }
          `}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export function DashBoardHistoryFunc({ data, refresh }) {

  const navigate = useNavigate();
  const { theme } = useTheme();

  async function handleViewFile(filename) {
    //access click file data from analysis
    const analysis = await viewRecentAnalysisAPI(filename);

    if(analysis) {
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
    <div className="w-full max-w-[95%] flex flex-col gap-6 mx-auto overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
      <table className="w-full min-w-[700px] border-collapse">
        <thead className={`
          ${theme === 'light' 
            ? 'bg-gray-50'
            : 'bg-zinc-800'
          }
        `}
        >
          <tr>
            <TableHead value={'Resume Name'} />
            <TableHead value={'ATS Score'} />
            <TableHead value={'Date'} />
            <TableHead value={'Action'} />
          </tr>
        </thead>

        <tbody className="text-center">
          {data?.length === 0 && 
            <tr
              key={0}
              className={`
                border-t
                transition
                ${theme === 'light'
                  ? 'border-gray-100 hover:bg-gray-50'
                  : 'border-gray-400 hover:bg-zinc-950'
                }  
              `}
            >
              <TableData value={'not found'} />
              <TableData value={'0%'} />
              <TableData value={'undefined'} />

              <td className="px-6 py-5">
                <div className="flex items-center justify-center gap-3">
                  <button
                    className={`
                      p-2 rounded-lg
                      transition
                      ${theme === 'light' 
                        ? 'hover:bg-gray-100'
                        : 'hover:bg-gray-700'
                      }
                    `}
                  >
                    <Eye size={18}
                      className={`
                        ${theme === 'light'
                          ? 'text-gray-600'
                          : 'text-gray-200'
                        }
                      `} 
                    />
                  </button>

                  <button
                    className={`
                      p-2 rounded-lg
                      transition
                      ${theme === 'light' 
                        ? 'hover:bg-gray-100'
                        : 'hover:bg-gray-700'
                      }
                    `}
                  >
                    <Trash2 size={18} 
                      className={`
                       text-red-500
                      `} 
                    />
                  </button>
                </div>
              </td>
            </tr>
          }

          {data?.map((resume, index) => (
            <tr
              key={index}
              className={`
                border-t
                transition
                ${theme === 'light'
                  ? 'border-gray-100 hover:bg-gray-50'
                  : 'border-gray-400 hover:bg-zinc-800'
                }  
              `}
            >
              <td  
                className={`
                  px-6
                  py-5 
                  text-sm 
                  font-medium
                  ${theme === 'light' 
                    ? 'text-gray-800'
                    : 'text-gray-200'
                  }
                `}
              >
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

              <td  
                className={`
                  px-6
                  py-5 
                  text-sm 
                  font-medium
                  ${theme === 'light' 
                    ? 'text-gray-500'
                    : 'text-gray-300'
                  }
                `}
              >
                {resume?.date}
              </td>

              <td className="px-6 py-5">
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewFile(resume?.fileName);
                    }}
                    className={`
                      p-2 rounded-lg
                      transition
                      ${theme === 'light' 
                        ? 'hover:bg-gray-100'
                        : 'hover:bg-gray-700'
                      }
                    `}
                  >
                    <Eye size={18} 
                      className={`
                        ${theme === 'light'
                          ? 'text-gray-600'
                          : 'text-gray-200'
                        }
                      `} 
                    />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAnalysis(resume?.fileName);
                    }}
                    className={`
                      p-2 rounded-lg
                      transition
                      ${theme === 'light' 
                        ? 'hover:bg-gray-100'
                        : 'hover:bg-gray-700'
                      }
                    `}
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
 
export function UserInfoTable({ 
  refresh,
  data, 
  value, 
  handleInput, 
  sortBy, 
  order,
  handleSortBy,
  handleOrder,
  page,
  handlePage,
  isLastPage
}) {
  
  data = data?.filter(user => !user.roles?.includes('ROLE_ADMIN'));
  const { theme } = useTheme();

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
    <div className="w-full max-w-[97%] mx-auto flex flex-col gap-6 overflow-x-auto rounded-2xl border border-gray-200 shadow-sm mb-4">
      <div className="pt-4 flex justify-between px-6 items-center">
        <h1 className="text-lg md:text-xl font-bold tracking-wide">
          USER INFO CHART
        </h1>

        <div className="flex items-center gap-3">
          <input
            onChange={handleInput}
            value={value}
            type="text" 
            className={`
              border
            border-gray-500
            focus:border-gray-950 
              focus:ring-2 
            ring-sky-400 
              py-1 px-3 
              rounded-md
            `}

            placeholder="search by username"
          />

          <select 
            value={sortBy}
            onChange={(e) => {
              handleSortBy(e.target.value)
              console.log(e.target.value);
            }}

            className={`
              p-2 border rounded-md
              ${theme === 'light' 
                ? 'bg-white text-black'
                : 'bg-black text-white'
              }
            `}
          >
            <option value="id">user id</option>
            <option value="username">username</option>
            <option value="dateOfJoining">dateOfJoining</option>
          </select>

          <select 
            value={order}  
            onChange={(e) => {
              handleOrder(e.target.value);
            }}
            className={`
              p-2 border rounded-md
              ${theme === 'light' 
                ? 'bg-white text-black'
                : 'bg-black text-white'
              }
            `}
          >
           <option value="asc">ascending</option>
           <option value="desc">descending</option>
          </select>
        </div>
      </div>

      <table className="w-full min-w-[900px] border-collapse">

        <thead 
          className={`
            ${theme === 'light' 
              ? 'bg-gray-50'
              : 'bg-zinc-800'
            }
          `}
        >

          <tr 
            className={`
              ${theme === 'light'
                ? 'text-gray-600' 
                : 'text-gray-300'}
          `}
          >

            <th className="px-6 py-4 text-left text-sm font-semibold">
              No.
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              ID
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold ">
              Name
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold ">
              Date Of Joining
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold ">
              Plan
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold ">
              Total Analyses
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold ">
              Avg ATS
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold ">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {data?.map((user, index) => (

            <tr
              key={user?.userId}
              className={`
                border-t 
                border-gray-100 
                hover:bg-gray-50 
                ${theme === 'light'
                  ? 'border-gray-100 hover:bg-gray-50 text-gray-700'
                  : 'hover:bg-zinc-800 text-gray-200'
                }
                transition
              `}
            >

              <td className="px-6 py-5 text-sm ">
                {index + 1}
              </td>

              <td className="px-6 py-5 text-sm">
                #{user?.userId}
              </td>

              <td className="px-6 py-5 text-sm font-medium">
                {user?.username}
              </td>

              <td className="px-6 py-5 text-sm">
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

              <td className="px-6 py-5 text-center text-sm">
                {user?.totalAnalyses}
              </td>

              <td 
                className={`
                  px-6
                  py-5 
                  text-center 
                  text-sm 
                  font-medium 
                  ${theme === 'light' 
                    ? 'text-blue-600' 
                    : 'text-blue-200'
                    }
                `}
              >
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
      
      <div className="flex items-center justify-center gap-6 mb-4">
        <button
          onClick={() => handlePage('prev')}
          disabled={page === 0}
          className={`
            px-4 py-1 rounded-md border transition
            disabled:opacity-50 disabled:cursor-not-allowed
            ${
              theme === 'light'
                ? 'bg-white text-black hover:bg-gray-100'
                : 'bg-black text-white hover:bg-zinc-900'
            }
          `}
        >
          ← Prev
        </button>

        <span
          className={`font-medium ${
            theme === 'light' ? 'text-black' : 'text-white'
          }`}
        >
          Page {page + 1}
        </span>

        <button
          onClick={() => handlePage('next')}
          disabled={isLastPage}
          className={`
            px-4 py-1 rounded-md border transition
            disabled:opacity-50 disabled:cursor-not-allowed
            ${
              theme === 'light'
                ? 'bg-white text-black hover:bg-gray-100'
                : 'bg-black text-white hover:bg-zinc-900'
            }
          `}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export function AnalysesDataTable({
  data, 
  value, 
  handleInput, 
  sortBy, 
  order,
  handleSortBy,
  handleOrder,
  page,
  handlePage,
  isLastPage
}) {
  const navigate = useNavigate();
  const { theme } = useTheme();

  async function handleViewFile(id, filename) {
    //access click file data from analysis
    const analysis = await viewAnalysesAPI(id, filename);

    if(analysis) {
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
    } else {
      alert('failed to open resume analysis!');
    }
  }

  return (
    <div className="w-full max-w-[97%] mx-auto flex flex-col gap-6 overflow-x-auto rounded-2xl border border-gray-200 shadow-sm mb-4">
      <div className="pt-4 flex justify-between px-6 items-center">
        <h1 className="text-lg md:text-xl font-bold tracking-wide">
          USER ANALYSES
        </h1>

        <div className="flex items-center gap-3">
          <input
            onChange={handleInput}
            value={value}
            type="text" 
            className={`
              border
            border-gray-500
            focus:border-gray-950 
              focus:ring-2 
            ring-sky-400 
              py-1 px-3 
              rounded-md
            `}

            placeholder="search by username"
          />

          <select 
            value={sortBy}
            onChange={(e) => {
              handleSortBy(e.target.value)
              console.log(e.target.value);
            }}

            className={`
              p-2 border rounded-md
              ${theme === 'light' 
                ? 'bg-white text-black'
                : 'bg-black text-white'
              }
            `}
          >
            <option value="id">user id</option>
            <option value="filename">filename</option>
            <option value="ats">ATS</option>
            <option value="date">dateTime</option>
          </select>

          <select 
            value={order}  
            onChange={(e) => {
              handleOrder(e.target.value);
            }}
            className={`
              p-2 border rounded-md
              ${theme === 'light' 
                ? 'bg-white text-black'
                : 'bg-black text-white'
              }
            `}
          >
           <option value="asc">ascending</option>
           <option value="desc">descending</option>
          </select>
        </div>
      </div>

      <table className="w-full min-w-[900px] border-collapse">

        <thead 
          className={`
            ${theme === 'light' 
              ? 'bg-gray-50'
              : 'bg-zinc-800'
            }
          `}
        >

          <tr>
            <TableHead value={'No.'} />
            <TableHead value={'username'} />
            <TableHead value={'filename'} />
            <TableHead value={'date'} />
            <TableHead value={'ATS'} />
            <TableHead value={'View'} />
          </tr>

        </thead>

        <tbody>

          {data?.map((analysis, index) => (

            <tr
              key={index}
              className={`
                border-t 
                border-gray-100 
                hover:bg-gray-50 
                ${theme === 'light'
                  ? 'border-gray-100 hover:bg-gray-50 text-gray-700'
                  : 'hover:bg-zinc-800 text-gray-200'
                }
                transition
              `}
            >
              <TableData value={index + 1} />
              <TableData value={analysis?.username} />
              <TableData value={analysis?.filename} />
              <TableData 
                  value={
                    analysis?.time?.split('T')[0] 
                    + ' | ' 
                    + analysis?.time?.split('T')[1].substring(0, 8) 
                    || undefined
                  } 
              />
              <TableData value={analysis?.ats.toFixed(2) + ' ' + '%'} />

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
      
      <div className="flex items-center justify-center gap-6 mb-4">
        <button
          onClick={() => handlePage('prev')}
          disabled={page === 0}
          className={`
            px-4 py-1 rounded-md border transition
            disabled:opacity-50 disabled:cursor-not-allowed
            ${
              theme === 'light'
                ? 'bg-white text-black hover:bg-gray-100'
                : 'bg-black text-white hover:bg-zinc-900'
            }
          `}
        >
          ← Prev
        </button>

        <span
          className={`font-medium ${
            theme === 'light' ? 'text-black' : 'text-white'
          }`}
        >
          Page {page + 1}
        </span>

        <button
          onClick={() => handlePage('next')}
          disabled={isLastPage}
          className={`
            px-4 py-1 rounded-md border transition
            disabled:opacity-50 disabled:cursor-not-allowed
            ${
              theme === 'light'
                ? 'bg-white text-black hover:bg-gray-100'
                : 'bg-black text-white hover:bg-zinc-900'
            }
          `}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

function TableHead({ value }) {
  const { theme } = useTheme();

  return (
    <th 
      className={`
        px-6
        py-4 
        text-center 
        text-sm 
        font-semibold
        ${theme === 'light' 
          ? 'text-gray-700'
          : 'text-gray-300'
        }          
      `}
    >
      {value}
    </th>
  );
}

function TableData({ value }) {
  const { theme } = useTheme();

  return (
    <td 
      className={`
        px-6 
        py-5 
        text-sm
        ${theme === 'light'
          ? 'text-gray-500'
          : 'text-gray-300'
        }
      `}
    >
      {value}
    </td>
  );
}