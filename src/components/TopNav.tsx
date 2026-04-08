import { Bell, Search, User } from 'lucide-react';

export default function TopNav() {
  return (
    <header className="h-20 px-8 flex items-center justify-between glass border-t-0 border-x-0 sticky top-0 z-40">
      <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-full border border-white/10 w-96">
        <Search size={18} className="text-slate-400" />
        <input 
          type="text" 
          placeholder="Search schedules, teachers, rooms..." 
          className="bg-transparent border-none outline-none text-sm w-full text-slate-200 placeholder:text-slate-500"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-950" />
        </button>
        
        <div className="h-8 w-[1px] bg-white/10" />

        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-200">Admin User</p>
            <p className="text-xs text-slate-500">System Administrator</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center border-2 border-white/10 shadow-lg">
            <User size={20} className="text-white" />
          </div>
        </div>
      </div>
    </header>
  );
}
