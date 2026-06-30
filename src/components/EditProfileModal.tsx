import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { X, Save, Camera } from "lucide-react";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, setCurrentUser, language } = useApp();

  const [name, setName] = useState(currentUser.name);
  const [role, setRole] = useState(currentUser.role);
  const [roleEn, setRoleEn] = useState(currentUser.roleEn);
  const [diocese, setDiocese] = useState(currentUser.diocese);
  const [dioceseEn, setDioceseEn] = useState(currentUser.dioceseEn);
  const [bio, setBio] = useState(currentUser.bio);
  const [bioEn, setBioEn] = useState(currentUser.bioEn);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [cover, setCover] = useState(currentUser.cover);

  // Preset virtual avatars & covers to choose from
  const avatarPresets = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCqNsi671MhACR5R3DfbeLObqjh-kMu51QgS710p3_kR4FSDJF95oB5kJvPkmsfeW1f6sUud7ONPT20KJUCIclq35fMsERy680aSKLn9demJTzKVcceltLbdXv5tAwNYvGY7aYSmKHq-dSVMOaNQGkWnro4PrZVh1q1QX6h28ide_EnWyvT5FCrxq_okyVC6b3FEsgup2aWlBE0gRhkxMxrxGA0ySHwUX--q3HV4pjUBn60zMaSCy_ZX_u1thOBWMjWFbWpMM6ZBg",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBauhsMdCpeKiaRaps5VbVD89R8aMBrASsM39Aru47m_CoEUUQq98DwyZwtGc_5wekZI-dQufdzdC17_8GyzfR0G_2SEJaFSvHluE7thtjDX62qMAeok-DNWjfS-nNgtt8-tl-Lv2YWij3r3uPtYDSdQrcqo5tHWxqGM7Twfmlgb9g_JTl7m6vMk-FdvdLynk7Qmn8LZnAZvzgRfIw5G8G9GSBnQZS2XjzuqhCoKfaWTTNsGXxD5zpYfH0TrvQTn6Pd56MnZcqMJQ",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAF57hyBg1nb9VdodBWToMERRe1n9X9oly49_dXIKXruNQVcEUpB7BSs0slyTGerBHkyQF7lgeEnxmE5xnLdDwSHmmb7waU-hTC_1WRGPCewKuuDT9NY7imXDCMpJUPg_8mXi-tst92O_2yP1NNQZEzvvRVedvTlDCf_mn_QBB5bgwKLBl_RRqOjGm2Md0jJ06KUwoWdcZxPtpkHT4WtAxioLQy_8ZPAGPDAPQAlFBqHJHccFtlA26hRI8NJD5PF8GiM4duOZpiMQ"
  ];

  const coverPresets = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAl9NZuvl4wdcly-A5Ur5wsnrRX7YuxMdFMXsm_2nnc4aCRcRKT4HbQ65lQeQNEND4bgXEfCzNIJWykkhoPo-8JoimG3GP41DiTHeORS51Gz_CH1I0eR0VBO7iopy28DO_Ca3sqjRrOt1kyF0KB6AAo_z2hzAMHHSEDi3UYX-gM2TGDo165RKE6WkdY6YHM8iRV_bRcfo8VQNj9cELtABkfa34NBCtuI2R_RXAx_zpTRczZXg-d5L3UjdVY1kFhPDFU8Ye6sJdJTQ",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB7SmrXFub8i3a_Spigkcgy5Mac0lh5H1SHJRqG-l926ugwZvOPJMGTK4VhqPnvRuWjj0hmtbfTjO0eWTseQXb2j-q0Kc2PYE97rP2yIezIn7m8CW0h8WkFYwox-k1DXMF0GNm3wfI30n1Rl6pzgXMaAeiAbvZdxKajh-5JuD_4Y0CH0Dz-_RKqHj_u5e-JnGcwtH9_W8TcsHFu3RojKZtrm_AV8HWcIA6Hrf0tBbuJanQTRwlTXKCgIOYj_0zgkbmwH0uq3yMRfw",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuADOM67hyIRbJ7DWzOUH8eSGHHI0wYQHSM-wwJcEwi8ml735m3Lfik2sDM1p_h-R0Pk46ZehwPDG1NEEbuGr-zRjOZaI-t2NK9LN9YV6fb93koT4cSbUsW9vA30N02-5bzENdESoeCRnP6xVBnvDK8yDY-Xyu7FkdnFpVbt0jv7RqV7MniYNV5MmJI0BJG-BS3p7SCoG16dMRBPFeLD9eYz2zcG6j7n9skHcBZQe95LyW9yID_OFNi8VlbQUeT1rNRAf52dZLoyMg"
  ];

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser(prev => ({
      ...prev,
      name,
      role,
      roleEn,
      diocese,
      dioceseEn,
      bio,
      bioEn,
      avatar,
      cover
    }));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-100 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-zinc-800 shrink-0">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            {language === "vi" ? "Chỉnh sửa Hồ sơ cá nhân" : "Edit Profile Info"}
          </h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-slate-500 hover:bg-slate-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Avatar & Cover Presets selection */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-700 dark:text-zinc-300 uppercase tracking-wider">
              {language === "vi" ? "Hình ảnh đại diện & Hình nền" : "Avatar & Cover Selections"}
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Avatar options */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 dark:text-zinc-400">
                  {language === "vi" ? "Chọn ảnh đại diện:" : "Select Avatar Preset:"}
                </label>
                <div className="flex gap-3">
                  {avatarPresets.map((preset, index) => (
                    <img 
                      key={index}
                      src={preset}
                      alt="Preset"
                      onClick={() => setAvatar(preset)}
                      className={`h-12 w-12 rounded-full object-cover cursor-pointer border-2 transition-all ${avatar === preset ? "border-sky-500 scale-110" : "border-transparent opacity-70 hover:opacity-100"}`}
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
              </div>

              {/* Cover options */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 dark:text-zinc-400">
                  {language === "vi" ? "Chọn ảnh bìa:" : "Select Cover Preset:"}
                </label>
                <div className="flex gap-2">
                  {coverPresets.map((preset, index) => (
                    <img 
                      key={index}
                      src={preset}
                      alt="Preset"
                      onClick={() => setCover(preset)}
                      className={`h-10 w-16 rounded-md object-cover cursor-pointer border-2 transition-all ${cover === preset ? "border-sky-500 scale-115" : "border-transparent opacity-70 hover:opacity-100"}`}
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-100 dark:bg-zinc-800" />

          {/* Text Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                {language === "vi" ? "Họ và Tên" : "Full Name"}
              </label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-800 outline-none transition-all focus:border-sky-500 focus:bg-white dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:focus:border-sky-500"
              />
            </div>

            {/* Diocese (Vietnamese) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                {language === "vi" ? "Giáo phận" : "Diocese (VI)"}
              </label>
              <input 
                type="text" 
                required
                value={diocese}
                onChange={(e) => setDiocese(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-800 outline-none transition-all focus:border-sky-500 focus:bg-white dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
              />
            </div>

            {/* Diocese (English) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                {language === "vi" ? "Giáo phận (Tiếng Anh)" : "Diocese (EN)"}
              </label>
              <input 
                type="text" 
                required
                value={dioceseEn}
                onChange={(e) => setDioceseEn(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-800 outline-none transition-all focus:border-sky-500 focus:bg-white dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
              />
            </div>

            {/* Role (Vietnamese) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                {language === "vi" ? "Chức vụ" : "Role (VI)"}
              </label>
              <input 
                type="text" 
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-800 outline-none transition-all focus:border-sky-500 focus:bg-white dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
              />
            </div>

            {/* Role (English) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                {language === "vi" ? "Chức vụ (Tiếng Anh)" : "Role (EN)"}
              </label>
              <input 
                type="text" 
                required
                value={roleEn}
                onChange={(e) => setRoleEn(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-800 outline-none transition-all focus:border-sky-500 focus:bg-white dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
              />
            </div>
          </div>

          {/* Bio (Vietnamese) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">
              {language === "vi" ? "Tiểu sử" : "Bio (VI)"}
            </label>
            <textarea 
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-800 outline-none transition-all focus:border-sky-500 focus:bg-white dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
            />
          </div>

          {/* Bio (English) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">
              {language === "vi" ? "Tiểu sử (Tiếng Anh)" : "Bio (EN)"}
            </label>
            <textarea 
              rows={3}
              value={bioEn}
              onChange={(e) => setBioEn(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-800 outline-none transition-all focus:border-sky-500 focus:bg-white dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
            />
          </div>

        </form>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-5 border-t border-slate-100 dark:border-zinc-800 shrink-0 bg-slate-50 dark:bg-zinc-900/40">
          <button 
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            {language === "vi" ? "Hủy" : "Cancel"}
          </button>
          <button 
            type="button"
            onClick={handleSave}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-md hover:from-sky-700 hover:to-indigo-700"
          >
            <Save className="w-4 h-4" />
            <span>{language === "vi" ? "Lưu thay đổi" : "Save changes"}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
