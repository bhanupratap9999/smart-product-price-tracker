"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getPriceHistory } from "@/app/actions";
import { Loader2 } from "lucide-react";

import { TrendingDown, TrendingUp, BarChart, Info } from "lucide-react";

export default function PriceChart({ productId }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ min: 0, max: 0, avg: 0 });

  useEffect(() => {
    async function loadData() {
      const history = await getPriceHistory(productId);

      if (history.length > 0) {
        const prices = history.map(h => parseFloat(h.price));
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
        
        setStats({ min, max, avg });

        const chartData = history.map((item) => ({
          date: new Date(item.checked_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
          price: parseFloat(item.price),
        }));

        setData(chartData);
      }
      setLoading(false);
    }

    loadData();
  }, [productId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-gray-400 w-full animate-pulse">
        <Loader2 className="w-6 h-6 animate-spin mr-3 text-orange-500" />
        <span className="font-bold tracking-widest text-[10px] uppercase">Fetching Analytics...</span>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-6 text-center w-full bg-orange-50/50 dark:bg-orange-500/5 rounded-2xl border border-orange-100 dark:border-orange-500/10">
        <Info className="w-8 h-8 text-orange-400 mb-3" />
        <p className="text-sm font-bold text-orange-700 dark:text-orange-400">No History Available</p>
        <p className="text-xs text-orange-600/70 dark:text-orange-400/60 mt-1">Price history will appear after the first few updates.</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown className="w-3 h-3 text-green-500" />
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Lowest</span>
          </div>
          <p className="text-sm font-black text-gray-900 dark:text-white">
            {stats.min.toFixed(2)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-3 h-3 text-red-500" />
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Highest</span>
          </div>
          <p className="text-sm font-black text-gray-900 dark:text-white">
            {stats.max.toFixed(2)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <BarChart className="w-3 h-3 text-blue-500" />
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Average</span>
          </div>
          <p className="text-sm font-black text-gray-900 dark:text-white">
            {stats.avg.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[200px] w-full pr-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} opacity={0.5} />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fontWeight: 700, fill: '#9ca3af' }}
              dy={10}
            />
            <YAxis 
              hide={true}
              domain={['auto', 'auto']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#111827",
                border: "none",
                borderRadius: "12px",
                padding: "8px 12px",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
              }}
              itemStyle={{ color: "#fff", fontWeight: 800, fontSize: "12px" }}
              labelStyle={{ color: "#9ca3af", fontWeight: 700, fontSize: "10px", marginBottom: "4px" }}
              formatter={(value) => [`$${value}`, 'Price']}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#F97316"
              strokeWidth={3}
              dot={{ fill: "#F97316", strokeWidth: 2, r: 4, stroke: "#fff" }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
