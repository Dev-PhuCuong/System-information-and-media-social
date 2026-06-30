import { User } from "../types";

export const PREDEFINED_PROFILES: Record<string, User> = {
  "Tổng Giáo phận Hà Nội": {
    id: "tgp_hanoi",
    name: "Tổng Giáo phận Hà Nội",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcjKAGqf98iDpggYvvGEkLe3tUKh-STKjM7w3Tp3VOYPBHynboVCBQ7q1TPMJPvoVHACSTQv8tJ8bgPTuhUFkTPYsGBzzCrG4ppKMCGJ4d3Omvlk0gm6016zcDfJ188Yz8bpfmAlTeMLhZVjhG7TpySGrW0cch6FFVaUTZ3i2wqFWl9FrbH4b4dqay_bfPAQCrPzKJctA1oSGDZfdBax_NB1mqvL5iaxItPAyFatEddhdhHsVbpQKnBzkSJXtVjwr0yYKSpbIuaQ",
    cover: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7SmrXFub8i3a_Spigkcgy5Mac0lh5H1SHJRqG-l926ugwZvOPJMGTK4VhqPnvRuWjj0hmtbfTjO0eWTseQXb2j-q0Kc2PYE97rP2yIezIn7m8CW0h8WkFYwox-k1DXMF0GNm3wfI30n1Rl6pzgXMaAeiAbvZdxKajh-5JuD_4Y0CH0Dz-_RKqHj_u5e-JnGcwtH9_W8TcsHFu3RojKZtrm_AV8HWcIA6Hrf0tBbuJanQTRwlTXKCgIOYj_0zgkbmwH0uq3yMRfw",
    role: "Kênh truyền thông chính thức",
    roleEn: "Official Communications",
    diocese: "Tổng Giáo phận Hà Nội",
    dioceseEn: "Archdiocese of Hanoi",
    bio: "Trang tin chính thức của Tổng Giáo phận Hà Nội, chuyên đăng tải các sắc lệnh mục vụ, thông báo giáo lý, lịch phụng vụ và các tin tức công ích trong Tổng Giáo tỉnh Hà Nội.",
    bioEn: "The official news page of the Archdiocese of Hanoi, publishing pastoral decrees, dogmatic updates, liturgical calendars, and public interests across Hanoi Ecclesiastical Province.",
    stats: { posts: 1450, followers: "85.2k", likes: "924k", rating: 98 }
  },
  "Sr. Maria Nguyễn": {
    id: "sr_maria",
    name: "Sr. Maria Nguyễn",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBauhsMdCpeKiaRaps5VbVD89R8aMBrASsM39Aru47m_CoEUUQq98DwyZwtGc_5wekZI-dQufdzdC17_8GyzfR0G_2SEJaFSvHluE7thtjDX62qMAeok-DNWjfS-nNgtt8-tl-Lv2YWij3r3uPtYDSdQrcqo5tHWxqGM7Twfmlgb9g_JTl7m6vMk-FdvdLynk7Qmn8LZnAZvzgRfIw5G8G9GSBnQZS2XjzuqhCoKfaWTTNsGXxD5zpYfH0TrvQTn6Pd56MnZcqMJQ",
    cover: "https://lh3.googleusercontent.com/aida-public/AB6AXuADOM67hyIRbJ7DWzOUH8eSGHHI0wYQHSM-wwJcEwi8ml735m3Lfik2sDM1p_h-R0Pk46ZehwPDG1NEEbuGr-zRjOZaI-t2NK9LN9YV6fb93koT4cSbUsW9vA30N02-5bzENdESoeCRnP6xVBnvDK8yDY-Xyu7FkdnFpVbt0jv7RqV7MniYNV5MmJI0BJG-BS3p7SCoG16dMRBPFeLD9eYz2zcG6j7n9skHcBZQe95LyW9yID_OFNi8VlbQUeT1rNRAf52dZLoyMg",
    role: "Ban Văn thư Giáo phận",
    roleEn: "Diocesan Archives Department",
    diocese: "Tổng Giáo phận Hà Nội",
    dioceseEn: "Archdiocese of Hanoi",
    bio: "Nữ tu dòng Mến Thánh Giá, phụ trách bảo tồn tài liệu mục vụ và hướng dẫn quy trình số hóa văn thư lưu trữ giáo lý cho các giáo xứ miền Bắc.",
    bioEn: "Sisters of the Lovers of the Holy Cross, in charge of pastoral document preservation and guides on digitizing archival catechism papers for northern parishes.",
    stats: { posts: 92, followers: "1.8k", likes: "5.4k", rating: 65 }
  },
  "Fr. Thomas Nguyen": {
    id: "conv_thomas",
    name: "Fr. Thomas Nguyen",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcjKAGqf98iDpggYvvGEkLe3tUKh-STKjM7w3Tp3VOYPBHynboVCBQ7q1TPMJPvoVHACSTQv8tJ8bgPTuhUFkTPYsGBzzCrG4ppKMCGJ4d3Omvlk0gm6016zcDfJ188Yz8bpfmAlTeMLhZVjhG7TpySGrW0cch6FFVaUTZ3i2wqFWl9FrbH4b4dqay_bfPAQCrPzKJctA1oSGDZfdBax_NB1mqvL5iaxItPAyFatEddhdhHsVbpQKnBzkSJXtVjwr0yYKSpbIuaQ",
    cover: "https://lh3.googleusercontent.com/aida-public/AB6AXuCI_oB38s6iSOB4LAzBIMuiIqc95x_sIHcYGRGSTQKtTtmrSQnHHt4V4OuuQhawuRYSu46A-detpmM8vwheG9Afox1NYFSuOs259xGftp8wU-2_ky5adir_yy59mUbbaYjxrHUDpeKBuQFSv8j-IICNV-N_H869GyBGEiewgRtHXNqRqsRP2bg0PM_y_3eUijWEhNqT0o2H8_uUuOkBWYrTQ4TdhlwHIXvPDXEKFU2yVIlztumRPahGNgNdJRPr2CO5RRiLOvJxVw",
    role: "Cha Chánh xứ / Trưởng ban Bác Ái",
    roleEn: "Parish Priest / Charity Director",
    diocese: "Tổng Giáo phận Sài Gòn",
    dioceseEn: "Archdiocese of HCMC",
    bio: "Linh mục mục vụ giáo xứ và hoạt động xã hội, đam mê nghiên cứu giáo luật và ứng dụng công nghệ trong truyền giáo điện tử.",
    bioEn: "Parish priest active in social work, passionate about canon law studies and applying modern tech in digital mission and charity campaigns.",
    stats: { posts: 124, followers: "3.2k", likes: "15.4k", rating: 80 }
  },
  "Têrêsa Mai": {
    id: "teresa_mai",
    name: "Têrêsa Mai",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBauhsMdCpeKiaRaps5VbVD89R8aMBrASsM39Aru47m_CoEUUQq98DwyZwtGc_5wekZI-dQufdzdC17_8GyzfR0G_2SEJaFSvHluE7thtjDX62qMAeok-DNWjfS-nNgtt8-tl-Lv2YWij3r3uPtYDSdQrcqo5tHWxqGM7Twfmlgb9g_JTl7m6vMk-FdvdLynk7Qmn8LZnAZvzgRfIw5G8G9GSBnQZS2XjzuqhCoKfaWTTNsGXxD5zpYfH0TrvQTn6Pd56MnZcqMJQ",
    cover: "https://lh3.googleusercontent.com/aida-public/AB6AXuAl9NZuvl4wdcly-A5Ur5wsnrRX7YuxMdFMXsm_2nnc4aCRcRKT4HbQ65lQeQNEND4bgXEfCzNIJWykkhoPo-8JoimG3GP41DiTHeORS51Gz_CH1I0eR0VBO7iopy28DO_Ca3sqjRrOt1kyF0KB6AAo_z2hzAMHHSEDi3UYX-gM2TGDo165RKE6WkdY6YHM8iRV_bRcfo8VQNj9cELtABkfa34NBCtuI2R_RXAx_zpTRczZXg-d5L3UjdVY1kFhPDFU8Ye6sJdJTQ",
    role: "Nhà thiết kế Mỹ thuật Công giáo",
    roleEn: "Catholic Art Designer",
    diocese: "Tổng Giáo phận Sài Gòn",
    dioceseEn: "Archdiocese of HCMC",
    bio: "Nghệ sĩ thiết kế đồ họa phụng vụ, ban truyền thông giới trẻ, chuyên sáng tạo tranh vẽ thánh giáo lý và biểu tượng phụng vụ hiện đại.",
    bioEn: "Liturgical graphic designer and youth media active member, focusing on creative modern catechism illustrations and liturgical icons.",
    stats: { posts: 48, followers: "1.2k", likes: "4.8k", rating: 50 }
  },
  "Linh mục Phêrô": {
    id: "sug_1",
    name: "Linh mục Phêrô",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcjKAGqf98iDpggYvvGEkLe3tUKh-STKjM7w3Tp3VOYPBHynboVCBQ7q1TPMJPvoVHACSTQv8tJ8bgPTuhUFkTPYsGBzzCrG4ppKMCGJ4d3Omvlk0gm6016zcDfJ188Yz8bpfmAlTeMLhZVjhG7TpySGrW0cch6FFVaUTZ3i2wqFWl9FrbH4b4dqay_bfPAQCrPzKJctA1oSGDZfdBax_NB1mqvL5iaxItPAyFatEddhdhHsVbpQKnBzkSJXtVjwr0yYKSpbIuaQ",
    cover: "https://lh3.googleusercontent.com/aida-public/AB6AXuAl9NZuvl4wdcly-A5Ur5wsnrRX7YuxMdFMXsm_2nnc4aCRcRKT4HbQ65lQeQNEND4bgXEfCzNIJWykkhoPo-8JoimG3GP41DiTHeORS51Gz_CH1I0eR0VBO7iopy28DO_Ca3sqjRrOt1kyF0KB6AAo_z2hzAMHHSEDi3UYX-gM2TGDo165RKE6WkdY6YHM8iRV_bRcfo8VQNj9cELtABkfa34NBCtuI2R_RXAx_zpTRczZXg-d5L3UjdVY1kFhPDFU8Ye6sJdJTQ",
    role: "Trưởng ban Mục vụ Giới Trẻ",
    roleEn: "Youth Ministry Director",
    diocese: "Giáo phận Bùi Chu",
    dioceseEn: "Bui Chu Diocese",
    bio: "Linh mục đồng hành cùng giới trẻ Giáo phận Bùi Chu, tổ chức các hội trại tìm hiểu Kinh Thánh, giáo lý và phát triển truyền thông xứ đạo.",
    bioEn: "Spiritual companion for youth in Bui Chu Diocese, organizing Bible camps, catechism courses, and parish media developments.",
    stats: { posts: 64, followers: "1.5k", likes: "3.9k", rating: 58 }
  },
  "Maria Trần": {
    id: "conv_maria",
    name: "Maria Trần",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAF57hyBg1nb9VdodBWToMERRe1n9X9oly49_dXIKXruNQVcEUpB7BSs0slyTGerBHkyQF7lgeEnxmE5xnLdDwSHmmb7waU-hTC_1WRGPCewKuuDT9NY7imXDCMpJUPg_8mXi-tst92O_2yP1NNQZEzvvRVedvTlDCf_mn_QBB5bgwKLBl_RRqOjGm2Md0jJ06KUwoWdcZxPtpkHT4WtAxioLQy_8ZPAGPDAPQAlFBqHJHccFtlA26hRI8NJD5PF8GiM4duOZpiMQ",
    cover: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7SmrXFub8i3a_Spigkcgy5Mac0lh5H1SHJRqG-l926ugwZvOPJMGTK4VhqPnvRuWjj0hmtbfTjO0eWTseQXb2j-q0Kc2PYE97rP2yIezIn7m8CW0h8WkFYwox-k1DXMF0GNm3wfI30n1Rl6pzgXMaAeiAbvZdxKajh-5JuD_4Y0CH0Dz-_RKqHj_u5e-JnGcwtH9_W8TcsHFu3RojKZtrm_AV8HWcIA6Hrf0tBbuJanQTRwlTXKCgIOYj_0zgkbmwH0uq3yMRfw",
    role: "Giáo lý viên xứ đoàn",
    roleEn: "Parish Catechist Coordinator",
    diocese: "Tổng Giáo phận Sài Gòn",
    dioceseEn: "Archdiocese of HCMC",
    bio: "Tông đồ giáo xứ, đam mê dạy giáo lý giới trẻ và hỗ trợ các chương trình từ thiện bác ái cho người nghèo.",
    bioEn: "Parish apostle, passionate about teaching catechism to children and organizing charitable works for poor families.",
    stats: { posts: 25, followers: "800", likes: "1.2k", rating: 30 }
  }
};

export const getProfileForUser = (name: string, fallbackAvatar?: string, fallbackRole?: string, fallbackRoleEn?: string): User => {
  const matched = PREDEFINED_PROFILES[name];
  if (matched) return matched;

  // Search case insensitive matching
  const key = Object.keys(PREDEFINED_PROFILES).find(k => k.toLowerCase() === name.toLowerCase());
  if (key) return PREDEFINED_PROFILES[key];

  // Return generated fallback
  return {
    id: `fallback_${name.replace(/\s+/g, '_').toLowerCase()}`,
    name: name,
    avatar: fallbackAvatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuBauhsMdCpeKiaRaps5VbVD89R8aMBrASsM39Aru47m_CoEUUQq98DwyZwtGc_5wekZI-dQufdzdC17_8GyzfR0G_2SEJaFSvHluE7thtjDX62qMAeok-DNWjfS-nNgtt8-tl-Lv2YWij3r3uPtYDSdQrcqo5tHWxqGM7Twfmlgb9g_JTl7m6vMk-FdvdLynk7Qmn8LZnAZvzgRfIw5G8G9GSBnQZS2XjzuqhCoKfaWTTNsGXxD5zpYfH0TrvQTn6Pd56MnZcqMJQ",
    role: fallbackRole || "Cộng tác viên giáo đoàn",
    roleEn: fallbackRoleEn || "Diocesan Contributor",
    diocese: "Tổng Giáo phận Hà Nội",
    dioceseEn: "Archdiocese of Hanoi",
    bio: "Hiệp thông loan báo Tin Mừng, sẻ chia thông tin đức tin và phụng sự Giáo hội bằng cả con tim.",
    bioEn: "Communion in proclaiming the Gospel, sharing Catholic news, and serving the Church with all my heart.",
    stats: { posts: 12, followers: "150", likes: "890", rating: 15 }
  };
};
