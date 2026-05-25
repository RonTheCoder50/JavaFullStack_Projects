import { fetchUserChartAPI, fetchAnalysesChartAPI } from "@/API";
 
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

export function DashboardUserGrowthChart() {  
    const [type, setType] = useState('weekly');
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
      async function fetchChartData() {
        const resp = await fetchUserChartAPI(type);
        if(resp) {
          setChartData(resp);
        } else {
          console.log('failed to fetch user growth chart data with type: ' + type);
        }
      }

      fetchChartData();
    }, [type]);

  
    return (
      <div className="w-full max-w-[97%] mx-auto h-75 bg-white rounded-xl p-4 shadow">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold mb-4 ml-6">
            User Growth
          </h2>
          
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              console.log(e.target.value);
            }}
            className="p-1 border"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="label" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#2563eb"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
}

export function DashboardAnalysisChart() {
  const [type, setType] = useState('weekly');
  const [chartData, setChartData] = useState([]);

    useEffect(() => {
      async function fetchChartData() {
        const resp = await fetchAnalysesChartAPI(type);
        if(resp) {
          setChartData(resp);
        } else {
          console.log('failed to fetch analyses chart data with type: ' + type);
        }
      }

      fetchChartData();
    }, [type]);

  return (
      <div className="w-full  max-w-[97%] mx-auto h-75 bg-white rounded-xl p-4 shadow">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold mb-4 ml-6">
            Resume Analysis
          </h2>
          
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              console.log(e.target.value);
            }}
            className="p-1 border"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="label" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#2563eb"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
}

export function DashboardDonutChart({ data }) {
  return (
    <div className="w-full max-w-[97%] mx-auto h-80 bg-white rounded-xl p-6 my-4 shadow">

      <h2 className="text-lg font-semibold mb-4 p-2">
        Free vs Pro Users
      </h2>

      <ResponsiveContainer width="100%" height="100%">

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            innerRadius={70}   // makes donut
            outerRadius={100}
            paddingAngle={3}
            label
          >
            <Cell fill="#3B82F6" />
            <Cell fill="#10B981" />
          </Pie>

          <Tooltip />
          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}