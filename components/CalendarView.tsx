
import React from 'react';
import { Transaction } from '../types';

interface CalendarViewProps {
  currentDate: Date;
  transactions: Transaction[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ currentDate, transactions }) => {
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const padding = Array.from({ length: firstDayOfMonth }, (_, i) => null);

  const getTransactionsForDay = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return transactions.filter(t => t.date === dateStr);
  };

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Monthly View</h2>
        <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-px bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 transition-colors">
        {weekdays.map(day => (
          <div key={day} className="bg-slate-50 dark:bg-slate-800/50 py-2 text-center text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            {day}
          </div>
        ))}
        
        {padding.map((_, i) => (
          <div key={`pad-${i}`} className="bg-white dark:bg-slate-900 min-h-[80px] p-2"></div>
        ))}
        
        {days.map(day => {
          const dayTx = getTransactionsForDay(day);
          const dailyExpense = dayTx.filter(t => t.type === 'expense').reduce((sum, e) => sum + e.amount, 0);
          const dailyIncome = dayTx.filter(t => t.type === 'income').reduce((sum, i) => sum + i.amount, 0);
          const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
          
          return (
            <div key={day} className="bg-white dark:bg-slate-900 min-h-[80px] p-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group relative border-t border-l border-slate-100 dark:border-slate-800/50 overflow-hidden">
              <div className={`text-xs font-semibold mb-1 w-6 h-6 flex items-center justify-center rounded-full transition-colors ${isToday ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 dark:shadow-emerald-900/30' : 'text-slate-400 dark:text-slate-500'}`}>
                {day}
              </div>
              <div className="mt-1 space-y-0.5">
                {dailyIncome > 0 && (
                  <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 truncate">
                    +${dailyIncome.toFixed(0)}
                  </div>
                )}
                {dailyExpense > 0 && (
                  <div className="text-[10px] font-bold text-rose-500 dark:text-rose-400 truncate">
                    -${dailyExpense.toFixed(0)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
