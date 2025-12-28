
import React, { useState, useEffect } from 'react';
import { Transaction } from '../types';
import { getFinancialInsights } from '../services/geminiService';

interface InsightsProps {
  transactions: Transaction[];
}

const Insights: React.FC<InsightsProps> = ({ transactions }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchInsights = async () => {
    setLoading(true);
    const text = await getFinancialInsights(transactions);
    setInsight(text);
    setLoading(false);
  };

  useEffect(() => {
    if (transactions.length > 0) {
      fetchInsights();
    }
  }, [transactions.length]);

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-emerald-600 p-6 rounded-2xl shadow-lg shadow-indigo-100 text-white">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
        </div>
        <h2 className="font-bold text-lg">Smart Insights</h2>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-white/80 animate-pulse">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <span className="text-sm">Analyzing your habits...</span>
        </div>
      ) : insight ? (
        <div className="text-sm leading-relaxed text-indigo-50 prose prose-invert max-w-none">
          {insight.split('\n').map((line, i) => (
            <p key={i} className="mb-2">{line}</p>
          ))}
        </div>
      ) : (
        <p className="text-sm text-white/70 italic">Add some data to get personalized tips!</p>
      )}

      <button
        onClick={fetchInsights}
        disabled={loading}
        className="mt-4 text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all border border-white/20 disabled:opacity-50"
      >
        Refresh Analysis
      </button>
    </div>
  );
};

export default Insights;
