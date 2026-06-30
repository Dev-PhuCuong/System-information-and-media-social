import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { LogIn, UserPlus, Shield, Globe, Lock, Mail, ChevronRight } from "lucide-react";

export const AuthScreen: React.FC = () => {
  const { language, setLanguage, setIsAuthenticated, setActiveScreen } = useApp();
  const [isLoginTab, setIsLoginTab] = useState(true);
  
  const [email, setEmail] = useState("giuse.an@btt.org");
  const [password, setPassword] = useState("••••••••");
  const [name, setName] = useState("Giuse Nguyễn Văn An");
  const [agreeTerms, setAgreeTerms] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate authentication
    setIsAuthenticated(true);
    setActiveScreen("newsfeed");
  };

  const handleGoogleSignIn = () => {
    setIsAuthenticated(true);
    setActiveScreen("newsfeed");
  };

  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-slate-50 dark:bg-zinc-950">
      
      {/* Left Panel: Aesthetic Inspirational Cover */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-zinc-900 p-12 text-white md:flex">
        
        {/* Background Image with elegant overlay */}
        <div className="absolute inset-0 bg-cover bg-center opacity-45" style={{
          backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB7SmrXFub8i3a_Spigkcgy5Mac0lh5H1SHJRqG-l926ugwZvOPJMGTK4VhqPnvRuWjj0hmtbfTjO0eWTseQXb2j-q0Kc2PYE97rP2yIezIn7m8CW0h8WkFYwox-k1DXMF0GNm3wfI30n1Rl6pzgXMaAeiAbvZdxKajh-5JuD_4Y0CH0Dz-_RKqHj_u5e-JnGcwtH9_W8TcsHFu3RojKZtrm_AV8HWcIA6Hrf0tBbuJanQTRwlTXKCgIOYj_0zgkbmwH0uq3yMRfw')"
        }} />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/60 to-zinc-900/20" />

        {/* Top: Logo */}
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-600 text-white font-serif text-lg font-bold">
            †
          </div>
          <span className="font-sans text-sm font-bold tracking-tight uppercase">
            Theology AI Connect
          </span>
        </div>

        {/* Middle: Inspirational Quote */}
        <div className="relative z-10 space-y-4 max-w-lg my-auto">
          <span className="inline-block rounded-full bg-sky-500/25 px-3 py-1 text-[11px] font-mono font-bold tracking-wider text-sky-400 uppercase">
            {language === "vi" ? "SỨ VỤ TRUYỀN THÔNG SỐ" : "DIGITAL CHURCH MISSION"}
          </span>
          <blockquote className="space-y-2">
            <p className="font-serif text-3xl font-medium leading-tight tracking-tight text-zinc-100">
              {language === "vi" 
                ? "“Hãy đi khắp tứ phương thiên hạ, loan báo Tin Mừng cho mọi loài thọ tạo.”"
                : "“Go into all the world and proclaim the gospel to the whole creation.”"
              }
            </p>
            <cite className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 not-italic">
              — Mark 16:15
            </cite>
          </blockquote>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            {language === "vi"
              ? "Ứng dụng kết nối thông minh, hỗ trợ soạn thảo, tra cứu giáo lý, đồng bộ hóa tư liệu truyền thông cho Giáo xứ và Giáo phận Việt Nam."
              : "Smart connectivity tool, helping write, research dogmas, and synchronize media documents for parishes and dioceses in Vietnam."
            }
          </p>
        </div>

        {/* Bottom: Copyright / Privacy terms links */}
        <div className="relative z-10 flex items-center justify-between text-[11px] font-medium text-slate-400">
          <span>© 2026 Theology AI Connect.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition">
              {language === "vi" ? "Quyền riêng tư" : "Privacy"}
            </a>
            <a href="#" className="hover:text-white transition">
              {language === "vi" ? "Điều khoản" : "Terms"}
            </a>
          </div>
        </div>

      </div>

      {/* Right Panel: Interactive Forms */}
      <div className="flex w-full flex-col justify-center px-6 py-12 md:w-1/2 lg:px-20">
        
        {/* Language selector in top corner */}
        <div className="absolute top-6 right-6 z-10 flex items-center gap-2">
          <Globe className="w-4 h-4 text-slate-400" />
          <div className="flex bg-slate-100 dark:bg-zinc-800 rounded-lg p-0.5 text-xs font-semibold">
            <button 
              onClick={() => setLanguage("vi")}
              className={`px-2 py-1 rounded-md transition-all ${language === "vi" ? "bg-white text-slate-900 shadow-sm dark:bg-zinc-700 dark:text-white" : "text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300"}`}
            >
              VI
            </button>
            <button 
              onClick={() => setLanguage("en")}
              className={`px-2 py-1 rounded-md transition-all ${language === "en" ? "bg-white text-slate-900 shadow-sm dark:bg-zinc-700 dark:text-white" : "text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300"}`}
            >
              EN
            </button>
          </div>
        </div>

        <div className="mx-auto w-full max-w-sm space-y-8">
          
          {/* Form Header */}
          <div className="space-y-2 text-center md:text-left">
            <div className="flex justify-center md:justify-start">
              <div className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 text-white font-serif text-xl font-bold shadow-md shadow-indigo-100 mb-4">
                †
              </div>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {isLoginTab 
                ? (language === "vi" ? "Chào mừng trở lại" : "Welcome back")
                : (language === "vi" ? "Tham gia sứ vụ số" : "Join digital mission")
              }
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
              {isLoginTab 
                ? (language === "vi" ? "Hãy đăng nhập bằng tài khoản nội bộ Ban Truyền Thông." : "Please login with your Diocesan Media account.")
                : (language === "vi" ? "Đăng ký thành viên Biên tập viên để đóng góp nội dung." : "Register as an editor to contribute dogmatic contents.")
              }
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex rounded-xl bg-slate-100 p-1 dark:bg-zinc-800">
            <button 
              onClick={() => setIsLoginTab(true)}
              className={`flex flex-1 items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition ${isLoginTab ? "bg-white text-slate-900 shadow-sm dark:bg-zinc-700 dark:text-white" : "text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-zinc-200"}`}
            >
              <LogIn className="w-4 h-4" />
              <span>{language === "vi" ? "Đăng nhập" : "Sign In"}</span>
            </button>
            <button 
              onClick={() => setIsLoginTab(false)}
              className={`flex flex-1 items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition ${!isLoginTab ? "bg-white text-slate-900 shadow-sm dark:bg-zinc-700 dark:text-white" : "text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-zinc-200"}`}
            >
              <UserPlus className="w-4 h-4" />
              <span>{language === "vi" ? "Đăng ký" : "Sign Up"}</span>
            </button>
          </div>

          {/* Credentials Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Fullname input (Only on Sign Up) */}
            {!isLoginTab && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                  {language === "vi" ? "Họ và Tên thánh, Tên gọi" : "Holy Name & Full Name"}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <UserPlus className="w-4 h-4" />
                  </span>
                  <input 
                    type="text" 
                    required
                    placeholder="Giuse Nguyễn Văn An"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-xs font-medium text-slate-800 outline-none transition focus:border-sky-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                {language === "vi" ? "Địa chỉ Email" : "Email Address"}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input 
                  type="email" 
                  required
                  placeholder="giuse.an@btt.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-xs font-medium text-slate-800 outline-none transition focus:border-sky-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                  {language === "vi" ? "Mật khẩu bảo mật" : "Secret Password"}
                </label>
                {isLoginTab && (
                  <a href="#" className="text-[10px] font-bold text-sky-600 hover:underline dark:text-sky-400">
                    {language === "vi" ? "Quên mật khẩu?" : "Forgot password?"}
                  </a>
                )}
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-xs font-medium text-slate-800 outline-none transition focus:border-sky-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
                />
              </div>
            </div>

            {/* Checkbox agreement */}
            <div className="flex items-start gap-2.5 pt-1">
              <input 
                type="checkbox" 
                id="agree"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded-md border-slate-300 accent-sky-600 dark:border-zinc-800"
              />
              <label htmlFor="agree" className="text-[11px] text-slate-500 dark:text-zinc-400 leading-tight">
                {language === "vi" 
                  ? "Tôi cam kết tuân thủ các chuẩn mực đạo đức báo chí Công giáo và sứ mạng mục vụ."
                  : "I commit to adhere to Catholic journalistic ethical standards and pastoral mission."
                }
              </label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={!agreeTerms}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-100 hover:from-sky-700 hover:to-indigo-700 disabled:opacity-50 disabled:pointer-events-none dark:shadow-none"
            >
              <span>
                {isLoginTab 
                  ? (language === "vi" ? "Đăng nhập hệ thống" : "Log In to Platform")
                  : (language === "vi" ? "Đăng ký thành viên" : "Complete Registration")
                }
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>

          </form>

          {/* SSO and Google Simulation Section */}
          <div className="space-y-4">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-zinc-800" />
              </div>
              <span className="relative bg-slate-50 px-3 text-[10px] font-bold tracking-wider text-slate-400 dark:bg-zinc-950 uppercase">
                {language === "vi" ? "Hoặc dùng cổng kết nối khác" : "Or connect via SSO"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Google integration mockup */}
              <button 
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                {/* SVG Google icon */}
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5.04c1.62 0 3.08.56 4.22 1.65l3.17-3.17C17.47 1.6 14.93 1 12 1 7.37 1 3.4 3.65 1.5 7.55l3.69 2.86C6.07 7.23 8.81 5.04 12 5.04z"/>
                  <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.27H12v4.51h6.43c-.28 1.48-1.12 2.73-2.38 3.58l3.69 2.86c2.16-1.99 3.38-4.93 3.38-8.68z"/>
                  <path fill="#FBBC05" d="M5.19 10.41a7.18 7.18 0 010 3.18L1.5 16.45a11.97 11.97 0 010-8.9l3.69 2.86z"/>
                  <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.69-2.86c-1.11.75-2.52 1.19-4.27 1.19-3.19 0-5.93-2.19-6.89-5.37L1.42 15.9C3.3 19.8 7.27 23 12 23z"/>
                </svg>
                <span>Google Auth</span>
              </button>

              {/* Catholic Diocesan SSO mock */}
              <button 
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                <Shield className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>Diocesan SSO</span>
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
