import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  TrendingUp, 
  TrendingDown, 
  Award,
  Globe,
  Compass
} from "lucide-react";

export const StatisticsScreen: React.FC = () => {
  const { language } = useApp();
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);
  const [activeDiocese, setActiveDiocese] = useState<string | null>(null);

  // General Metrics
  const statsSummary = [
    {
      id: "m_1",
      labelVi: "Biên tập viên",
      labelEn: "Active Editors",
      value: "1,248",
      change: "+12.4%",
      isPositive: true,
      icon: Users,
      color: "text-blue-600 bg-blue-50 dark:bg-blue-950/20 dark:text-blue-400"
    },
    {
      id: "m_2",
      labelVi: "Bài viết truyền thông",
      labelEn: "Media Publications",
      value: "45,820",
      change: "+22.8%",
      isPositive: true,
      icon: BookOpen,
      color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 dark:text-emerald-400"
    },
    {
      id: "m_3",
      labelVi: "Tổng lượt tương tác",
      labelEn: "Total Interactions",
      value: "924.5k",
      change: "-2.4%",
      isPositive: false,
      icon: BarChart3,
      color: "text-amber-600 bg-amber-50 dark:bg-amber-950/20 dark:text-amber-400"
    },
    {
      id: "m_4",
      labelVi: "Chỉ số số hóa",
      labelEn: "Digital Index",
      value: "84.5%",
      change: "+5.1%",
      isPositive: true,
      icon: Award,
      color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/20 dark:text-indigo-400"
    }
  ];

  // System Traffic Bar Data (Weekdays)
  const trafficData = [
    { dayVi: "T.Hai", dayEn: "Mon", value: 3200 },
    { dayVi: "T.Ba", dayEn: "Tue", value: 4500 },
    { dayVi: "T.Tư", dayEn: "Wed", value: 5800 },
    { dayVi: "T.Năm", dayEn: "Thu", value: 6200 },
    { dayVi: "T.Sáu", dayEn: "Fri", value: 7100 },
    { dayVi: "T.Bảy", dayEn: "Sat", value: 8900 },
    { dayVi: "Chủ Nhật", dayEn: "Sun", value: 12400 }
  ];

  const maxTrafficValue = Math.max(...trafficData.map(d => d.value));

  // Staff demographics circular data representation
  const demographicData = [
    { roleVi: "Giáo dân", roleEn: "Laity", percentage: 65, color: "#0ea5e9", count: "811" },
    { roleVi: "Tu sĩ", roleEn: "Sisters & Brothers", percentage: 22, color: "#6366f1", count: "275" },
    { roleVi: "Linh mục / Tu sĩ cao cấp", roleEn: "Priests & Clergy", percentage: 13, color: "#f59e0b", count: "162" }
  ];

  // Diocese Map coordinates simulation
  const diocesesDistribution = [
    { nameVi: "TGP. Hà Nội", nameEn: "Hanoi Archdiocese", share: 35, posts: "16,037", color: "from-sky-500 to-indigo-500", x: "42%", y: "25%" },
    { nameVi: "TGP. Sài Gòn", nameEn: "HCMC Archdiocese", share: 42, posts: "19,244", color: "from-emerald-500 to-teal-500", x: "55%", y: "78%" },
    { nameVi: "TGP. Huế", nameEn: "Hue Archdiocese", share: 15, posts: "6,873", color: "from-amber-500 to-rose-500", x: "48%", y: "50%" },
    { nameVi: "GP. Lạng Sơn", nameEn: "Lang Son Diocese", share: 8, posts: "3,666", color: "from-purple-500 to-indigo-500", x: "46%", y: "15%" }
  ];

  // Highlights Articles publications
  const topArticles = [
    { id: "art_1", titleVi: "Sứ vụ loan báo Tin Mừng trên xa lộ thông tin số", titleEn: "Gospel proclamation on the digital superhighway", author: "Lm. Gioan Kim", views: "14,230", likes: "2,422" },
    { id: "art_2", titleVi: "Ý nghĩa Bí tích Thánh Thể qua lăng kính Giáo lý hội thánh", titleEn: "The meaning of Holy Eucharist through CCC", author: "Sr. Maria Teresa", views: "11,840", likes: "1,980" },
    { id: "art_3", titleVi: "Lưu ý mục vụ trong công tác số hóa văn bản xứ đạo", titleEn: "Pastoral notes in digitizing parish documents", author: "Giuse Nguyễn Văn An", views: "9,450", likes: "1,550" }
  ];

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-6">
      
      {/* Page Title Header */}
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
          {language === "vi" ? "Phân tích & Thống kê mục vụ" : "Pastoral Media Analytics"}
        </h2>
        <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
          {language === "vi" ? "Dữ liệu cập nhật thời gian thực trên toàn giáo tỉnh Việt Nam." : "Realtime analytics across Vietnamese ecclesiastical provinces."}
        </p>
      </div>

      {/* Bento Grid Summary Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {statsSummary.map((item) => {
          const Icon = item.icon;
          return (
            <div 
              key={item.id}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-center justify-between">
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`flex items-center gap-0.5 text-[10px] font-bold font-mono ${item.isPositive ? "text-emerald-600" : "text-rose-600"}`}>
                  {item.isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  <span>{item.change}</span>
                </span>
              </div>
              <div className="mt-4 space-y-1">
                <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-bold uppercase tracking-wider block">
                  {language === "vi" ? item.labelVi : item.labelEn}
                </span>
                <span className="text-xl font-bold text-slate-900 dark:text-white leading-none font-sans block">
                  {item.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Graphs block: Traffic chart vs Demographic shares */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* System Traffic SVG Bar chart */}
        <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 lg:col-span-2">
          <div className="mb-6 flex items-center justify-between border-b border-slate-50 dark:border-zinc-800/40 pb-3">
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                {language === "vi" ? "Lưu lượng truy cập hệ thống" : "System Traffic Analytics"}
              </h3>
              <p className="text-[10px] text-slate-400 dark:text-zinc-500 font-medium">
                {language === "vi" ? "Số lượt truy vấn và đọc tư liệu trong tuần qua." : "Queries & document readings over the past 7 days."}
              </p>
            </div>
            <span className="rounded-lg bg-sky-50 px-2.5 py-1 text-[10px] font-bold text-sky-600 dark:bg-sky-950/20 dark:text-sky-400">
              {language === "vi" ? "7 ngày qua" : "Last 7 Days"}
            </span>
          </div>

          {/* Interactive Chart Container */}
          <div className="relative flex h-64 items-end justify-between px-2 pt-6">
            
            {/* Grid background lines */}
            <div className="absolute inset-x-0 bottom-8 top-6 flex flex-col justify-between pointer-events-none">
              <div className="w-full border-t border-slate-100/50 dark:border-zinc-800/30" />
              <div className="w-full border-t border-slate-100/50 dark:border-zinc-800/30" />
              <div className="w-full border-t border-slate-100/50 dark:border-zinc-800/30" />
            </div>

            {trafficData.map((d, index) => {
              const heightPercent = (d.value / maxTrafficValue) * 75; // max 75% height
              const isHovered = hoveredBarIndex === index;

              return (
                <div 
                  key={index}
                  className="relative flex flex-col items-center flex-1"
                  onMouseEnter={() => setHoveredBarIndex(index)}
                  onMouseLeave={() => setHoveredBarIndex(null)}
                >
                  {/* Tooltip on hover */}
                  {isHovered && (
                    <div className="absolute -top-10 z-10 rounded-lg bg-zinc-950 px-2 py-1 text-[9px] font-bold text-white shadow-md dark:bg-white dark:text-zinc-950 transition-all font-mono">
                      {d.value.toLocaleString()}
                    </div>
                  )}

                  {/* SVG Rounded Bar */}
                  <div 
                    className={`
                      w-7 rounded-t-lg bg-gradient-to-t from-indigo-500 to-sky-500 cursor-pointer transition-all duration-300
                      ${isHovered ? "brightness-110 scale-x-105" : "opacity-90"}
                    `}
                    style={{ height: `${heightPercent}%` }}
                  />

                  {/* Axis Label */}
                  <span className="mt-2.5 text-[9px] font-bold text-slate-400 dark:text-zinc-500 tracking-tight font-sans">
                    {language === "vi" ? d.dayVi : d.dayEn}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Demographic circular structures */}
        <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-6 flex flex-col justify-between border-b border-slate-50 dark:border-zinc-800/40 pb-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider leading-tight">
              {language === "vi" ? "Cơ cấu thành viên" : "Staff Demographics"}
            </h3>
            <p className="text-[10px] text-slate-400 dark:text-zinc-500 font-medium">
              {language === "vi" ? "Phân nhóm nhân sự ban truyền thông." : "Media personnel role classifications."}
            </p>
          </div>

          <div className="space-y-5">
            {/* Demographic Bars */}
            {demographicData.map((d, index) => (
              <div key={index} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="text-slate-800 dark:text-zinc-300">
                      {language === "vi" ? d.roleVi : d.roleEn}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400 font-mono">
                    <span>{d.count}</span>
                    <span className="text-[10px] font-bold text-slate-900 dark:text-white">({d.percentage}%)</span>
                  </div>
                </div>

                {/* Progress bar line */}
                <div className="h-2 w-full rounded-full bg-slate-50 dark:bg-zinc-800 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      backgroundColor: d.color,
                      width: `${d.percentage}%`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Map distribution and Top Articles row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        
        {/* Diocese Distribution Map representation */}
        <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-6 border-b border-slate-50 dark:border-zinc-800/40 pb-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {language === "vi" ? "Bản đồ đóng góp Giáo phận" : "Diocesan Contributions Map"}
            </h3>
            <p className="text-[10px] text-slate-400 dark:text-zinc-500 font-medium">
              {language === "vi" ? "Phần trăm bài viết đóng góp bởi các Tổng Giáo phận lớn." : "Publications shared across core Archdiocese hubs."}
            </p>
          </div>

          {/* Map canvas container */}
          <div className="relative h-64 rounded-xl bg-slate-50 dark:bg-zinc-950/40 border border-slate-100/50 dark:border-zinc-800/20 overflow-hidden flex items-center justify-center">
            
            {/* Grid grid background overlay */}
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 opacity-[0.03] pointer-events-none">
              {Array.from({ length: 72 }).map((_, i) => (
                <div key={i} className="border-r border-b border-slate-900 dark:border-white" />
              ))}
            </div>

            {/* Simulated abstract map line S-shape of Vietnam */}
            <svg className="absolute h-full w-full opacity-10 text-slate-400 dark:text-zinc-600 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M 40 10 Q 55 15 45 35 T 50 60 T 55 90" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeDasharray="3 3" />
            </svg>

            {/* Core Archdiocese nodes overlay */}
            {diocesesDistribution.map((dio, index) => {
              const isActive = activeDiocese === dio.nameVi;
              return (
                <div 
                  key={index}
                  className="absolute cursor-pointer transition-all duration-300"
                  style={{ left: dio.x, top: dio.y }}
                  onMouseEnter={() => setActiveDiocese(dio.nameVi)}
                  onMouseLeave={() => setActiveDiocese(null)}
                >
                  {/* Glowing Node anchor circle */}
                  <div className={`relative flex h-5 w-5 items-center justify-center rounded-full bg-white dark:bg-zinc-900 border-2 border-indigo-500 shadow-md ${isActive ? 'scale-120' : ''}`}>
                    <span className="absolute h-full w-full rounded-full bg-indigo-500 opacity-25 animate-ping" />
                    <span className="h-2 w-2 rounded-full bg-indigo-600" />
                  </div>

                  {/* Node label */}
                  <div className="absolute left-6 -top-2 bg-white/95 dark:bg-zinc-900/95 border border-slate-100 dark:border-zinc-800/80 px-2 py-1 rounded-lg shadow-sm whitespace-nowrap z-10 space-y-0.5">
                    <span className="text-[9px] font-bold text-slate-800 dark:text-zinc-200">
                      {language === "vi" ? dio.nameVi : dio.nameEn}
                    </span>
                    <span className="text-[8px] font-mono text-indigo-500 font-bold block leading-none">
                      {dio.share}% • {dio.posts} bài
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Default overlay helper */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[9px] font-bold text-slate-400 dark:text-zinc-500">
              <Compass className="w-3.5 h-3.5" />
              <span>{language === "vi" ? "Rê chuột vào các điểm nút để xem chi tiết" : "Hover node points to details"}</span>
            </div>
          </div>
        </section>

        {/* Highlights Top editorial papers list */}
        <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-6 border-b border-slate-50 dark:border-zinc-800/40 pb-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {language === "vi" ? "Sáng kiến truyền thông nổi bật" : "Pastoral Media Highlights"}
            </h3>
            <p className="text-[10px] text-slate-400 dark:text-zinc-500 font-medium">
              {language === "vi" ? "Nội dung có lưu lượng đọc và thảo luận cao nhất." : "Most read and engaged pastoral articles."}
            </p>
          </div>

          <div className="space-y-4">
            {topArticles.map((art, index) => (
              <div 
                key={art.id}
                className="flex items-start gap-3.5 p-2 rounded-xl transition hover:bg-slate-50/50 dark:hover:bg-zinc-800/20"
              >
                {/* Badge medal ranking */}
                <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold font-mono ${index === 0 ? 'bg-amber-100 text-amber-600' : index === 1 ? 'bg-slate-100 text-slate-600' : 'bg-orange-50 text-orange-600'}`}>
                  {index + 1}
                </div>

                <div className="flex-1 space-y-1">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight line-clamp-2">
                    {language === "vi" ? art.titleVi : art.titleEn}
                  </h4>
                  <div className="flex items-center justify-between text-[9px] font-bold font-mono text-slate-400 dark:text-zinc-500">
                    <span className="font-sans">{art.author}</span>
                    <div className="flex items-center gap-3">
                      <span>{art.views} views</span>
                      <span>{art.likes} likes</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

    </div>
  );
};
