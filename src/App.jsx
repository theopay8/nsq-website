import { useState } from "react";
import { coaches } from "./data/coaches";
import { divisions } from "./data/divisions";
import { programs } from "./data/programs";
import { news } from "./data/news";
import CoachCard from "./components/cards/CoachCard";
import DivisionCard from "./components/cards/DivisionCard";
import ProgramCard from "./components/cards/ProgramCard";
import AchievementCard from "./components/cards/AchievementCard";
import NewsCard from "./components/cards/NewsCard";

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newsFilter, setNewsFilter] = useState("all"); // 'all', 'achievement', 'news'

  // GANTI LINK INI DENGAN LINK GOOGLE FORM ASLI LU
  const googleFormUrl = "https://forms.gle/LINK_GOOGLE_FORM_LU";

  // Filter news berdasarkan tipe
  const filteredNews =
    newsFilter === "all"
      ? news
      : news.filter((item) => item.type === newsFilter);

  return (
    <div className="min-h-screen bg-nsq-black text-white font-body overflow-x-hidden">
      {/* ================= NAVBAR ================= */}
      <nav className="fixed w-full z-50 bg-nsq-black/90 backdrop-blur-md border-b border-nsq-red/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-nsq-red rounded-full flex items-center justify-center border-2 border-nsq-gold shadow-[0_0_15px_rgba(220,20,60,0.5)]">
                <span className="font-heading font-bold text-white text-2xl">
                  N
                </span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-heading font-bold text-3xl text-white tracking-wider">
                  NSQ
                </span>
                <span className="font-script text-sm text-nsq-gold">
                  Family Academy
                </span>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-nsq-gold font-medium px-3 py-2 border-b-2 border-nsq-gold font-heading font-bold uppercase tracking-wider">
                Home
              </a>
              <a
                href="#about"
                className="text-gray-300 hover:text-white transition-all px-3 py-2 font-heading font-semibold uppercase tracking-wider">
                About
              </a>
              <a
                href="#divisions"
                className="text-gray-300 hover:text-white transition-all px-3 py-2 font-heading font-semibold uppercase tracking-wider">
                Divisions
              </a>
              <a
                href="#programs"
                className="text-gray-300 hover:text-white transition-all px-3 py-2 font-heading font-semibold uppercase tracking-wider">
                Programs
              </a>
              <a
                href="#news"
                className="text-gray-300 hover:text-white transition-all px-3 py-2 font-heading font-semibold uppercase tracking-wider">
                News
              </a>
            </div>

            <div className="hidden md:block">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSc8vhZc8pcpMrh9N_cgQ8LzIvCiDJoXAr-Tc5GFdOkcDEjk5g/viewform?usp=publish-editor"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-nsq-red hover:bg-nsq-darkred text-white font-heading font-bold uppercase tracking-wider px-6 py-2.5 rounded-sm border border-nsq-gold/50 hover:border-nsq-gold transition-all shadow-[0_0_15px_rgba(220,20,60,0.5)] hover:shadow-[0_0_25px_rgba(220,20,60,0.8)] inline-block">
                Join Tryout
              </a>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2">
              {mobileMenuOpen ? (
                <span className="text-2xl">✕</span>
              ) : (
                <span className="text-2xl">☰</span>
              )}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-nsq-red/20 animate-fade-in">
              <div className="flex flex-col space-y-3">
                <a
                  href="#"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-nsq-gold font-heading font-bold uppercase px-3 py-2">
                  Home
                </a>
                <a
                  href="#about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-white font-heading font-semibold uppercase px-3 py-2">
                  About
                </a>
                <a
                  href="#divisions"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-white font-heading font-semibold uppercase px-3 py-2">
                  Divisions
                </a>
                <a
                  href="#programs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-white font-heading font-semibold uppercase px-3 py-2">
                  Programs
                </a>
                <a
                  href="#news"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-white font-heading font-semibold uppercase px-3 py-2">
                  News
                </a>
                <a
                  href={googleFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-nsq-red text-white font-heading font-bold uppercase px-6 py-3 rounded-sm text-center mt-2 inline-block">
                  Join Tryout
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-nsq-red/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            data-aos="fade-down"
            className="inline-flex items-center gap-2 bg-nsq-dark border border-nsq-gold/30 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 bg-nsq-gold rounded-full animate-pulse"></span>
            <span className="text-xs sm:text-sm font-medium text-nsq-gold tracking-wide uppercase font-heading">
              Official Esports Academy • Recognized by KONI Tasikmalaya
            </span>
          </div>

          <h1
            data-aos="zoom-in"
            data-aos-delay="200"
            className="font-heading font-bold text-5xl sm:text-7xl md:text-8xl uppercase leading-none mb-4">
            <span className="block text-white">Together We</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-nsq-red via-nsq-gold to-nsq-red">
              Grow Stronger
            </span>
          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay="400"
            className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-400 font-body leading-relaxed">
            NSQ Academy hadir sebagai wadah pengembangan bakat, minat, dan
            potensi generasi muda di dunia Esports. Membangun atlet yang{" "}
            <span className="text-white font-semibold">kompetitif</span> dan
            menjunjung tinggi{" "}
            <span className="text-nsq-gold font-semibold">sportivitas</span>.
          </p>

          <div
            data-aos="fade-up"
            data-aos-delay="600"
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSc8vhZc8pcpMrh9N_cgQ8LzIvCiDJoXAr-Tc5GFdOkcDEjk5g/viewform?usp=publish-editor"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-nsq-red hover:bg-nsq-darkred text-white font-heading font-bold uppercase tracking-wider px-8 py-4 rounded-sm border-2 border-nsq-gold transition-all shadow-[0_0_20px_rgba(220,20,60,0.4)] hover:shadow-[0_0_30px_rgba(220,20,60,0.7)] hover:scale-105 text-center inline-block">
              🦅 Join The Academy
            </a>
            <a
              href="#divisions"
              className="w-full sm:w-auto bg-transparent hover:bg-white/5 text-white font-heading font-bold uppercase tracking-wider px-8 py-4 rounded-sm border-2 border-white/20 hover:border-nsq-gold transition-all text-center inline-block">
              View Divisions
            </a>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="800"
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-8">
            <div>
              <div className="text-3xl font-heading font-bold text-nsq-gold">
                5
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wider mt-1">
                Game Divisions
              </div>
            </div>
            <div>
              <div className="text-3xl font-heading font-bold text-nsq-gold">
                KONI
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wider mt-1">
                Affiliated
              </div>
            </div>
            <div>
              <div className="text-3xl font-heading font-bold text-nsq-gold">
                100+
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wider mt-1">
                Academy Players
              </div>
            </div>
            <div>
              <div className="text-3xl font-heading font-bold text-nsq-gold">
                Pro
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wider mt-1">
                Coaching Staff
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ================= ABOUT SECTION ================= */}
      <section id="about" className="py-20 bg-nsq-dark relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-aos="fade-up" className="text-center mb-16">
            <span className="text-nsq-red font-heading font-bold uppercase tracking-widest text-sm">
              Who We Are
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mt-2 uppercase">
              About <span className="text-nsq-gold">NSQ Academy</span>
            </h2>
            <div className="w-24 h-1 bg-nsq-red mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <h3 className="font-heading text-3xl font-bold text-white mb-4">
                Membangun Generasi{" "}
                <span className="text-nsq-gold">Atlet Esports</span>
              </h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                NSQ Academy hadir sebagai wadah pengembangan bakat, minat, dan
                potensi generasi muda di dunia Esports. Kami berkomitmen
                membangun komunitas Esports yang positif, kompetitif,
                profesional, serta menjunjung tinggi sportivitas dan kerja sama
                tim.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Bersama NSQ Family, Family Organizer, dan dukungan komunitas
                Esports, mari kita bangun generasi atlet Esports yang
                berprestasi dan mampu bersaing di tingkat nasional maupun
                internasional.
              </p>
            </div>

            <div data-aos="fade-left" className="grid grid-cols-2 gap-4">
              <div className="bg-nsq-black border border-nsq-red/20 rounded-lg p-6 hover:border-nsq-gold transition-all">
                <div className="text-4xl mb-3">🎯</div>
                <h4 className="font-heading font-bold text-white uppercase mb-2">
                  Visi
                </h4>
                <p className="text-gray-400 text-sm">
                  Menjadi akademi esports terdepan di Jawa Barat yang
                  menghasilkan atlet berprestasi.
                </p>
              </div>
              <div className="bg-nsq-black border border-nsq-red/20 rounded-lg p-6 hover:border-nsq-gold transition-all">
                <div className="text-4xl mb-3">🚀</div>
                <h4 className="font-heading font-bold text-white uppercase mb-2">
                  Misi
                </h4>
                <p className="text-gray-400 text-sm">
                  Mengembangkan talenta muda melalui pelatihan profesional dan
                  kompetisi berkualitas.
                </p>
              </div>
              <div className="bg-nsq-black border border-nsq-red/20 rounded-lg p-6 hover:border-nsq-gold transition-all">
                <div className="text-4xl mb-3">🤝</div>
                <h4 className="font-heading font-bold text-white uppercase mb-2">
                  Family
                </h4>
                <p className="text-gray-400 text-sm">
                  Membangun ekosistem kekeluargaan yang solid antar pemain,
                  coach, dan staff.
                </p>
              </div>
              <div className="bg-nsq-black border border-nsq-red/20 rounded-lg p-6 hover:border-nsq-gold transition-all">
                <div className="text-4xl mb-3">🏆</div>
                <h4 className="font-heading font-bold text-white uppercase mb-2">
                  Prestasi
                </h4>
                <p className="text-gray-400 text-sm">
                  Menargetkan juara di setiap turnamen yang diikuti dengan
                  sportivitas tinggi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COACHES SECTION ================= */}
      <section className="py-20 bg-nsq-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-aos="fade-up" className="text-center mb-16">
            <span className="text-nsq-red font-heading font-bold uppercase tracking-widest text-sm">
              Our Leadership
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mt-2 uppercase">
              Meet The <span className="text-nsq-gold">Coaches</span>
            </h2>
            <div className="w-24 h-1 bg-nsq-red mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coaches.map((coach, index) => (
              <div
                key={coach.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}>
                <CoachCard coach={coach} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= DIVISIONS SECTION ================= */}
      <section id="divisions" className="py-20 bg-nsq-dark relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-aos="fade-up" className="text-center mb-16">
            <span className="text-nsq-red font-heading font-bold uppercase tracking-widest text-sm">
              Our Teams
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mt-2 uppercase">
              Game <span className="text-nsq-gold">Divisions</span>
            </h2>
            <div className="w-24 h-1 bg-nsq-red mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {divisions.map((division, index) => (
              <div
                key={division.id}
                data-aos="zoom-in"
                data-aos-delay={index * 100}>
                <DivisionCard division={division} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROGRAMS SECTION ================= */}
      <section id="programs" className="py-20 bg-nsq-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-aos="fade-up" className="text-center mb-16">
            <span className="text-nsq-red font-heading font-bold uppercase tracking-widest text-sm">
              What We Offer
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mt-2 uppercase">
              Academy <span className="text-nsq-gold">Programs</span>
            </h2>
            <div className="w-24 h-1 bg-nsq-red mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <div
                key={program.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}>
                <ProgramCard program={program} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= NEWS & ACHIEVEMENTS SECTION ================= */}
      <section id="news" className="py-20 bg-nsq-dark relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-aos="fade-up" className="text-center mb-12">
            <span className="text-nsq-red font-heading font-bold uppercase tracking-widest text-sm">
              Latest Updates
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mt-2 uppercase">
              News & <span className="text-nsq-gold">Achievements</span>
            </h2>
            <div className="w-24 h-1 bg-nsq-red mx-auto mt-4"></div>
            <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
              Prestasi, sertifikat, dan berita terbaru dari NSQ Academy. Bukti
              nyata perjalanan kami menuju puncak.
            </p>
          </div>

          {/* Filter Tabs */}
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setNewsFilter("all")}
              className={`font-heading font-bold uppercase tracking-wider px-6 py-2 rounded-sm border-2 transition-all cursor-pointer ${
                newsFilter === "all"
                  ? "bg-nsq-gold text-nsq-black border-nsq-gold"
                  : "bg-transparent text-white border-white/20 hover:border-nsq-gold"
              }`}>
              📋 All
            </button>
            <button
              onClick={() => setNewsFilter("achievement")}
              className={`font-heading font-bold uppercase tracking-wider px-6 py-2 rounded-sm border-2 transition-all cursor-pointer ${
                newsFilter === "achievement"
                  ? "bg-nsq-gold text-nsq-black border-nsq-gold"
                  : "bg-transparent text-white border-white/20 hover:border-nsq-gold"
              }`}>
              🏆 Achievements
            </button>
            <button
              onClick={() => setNewsFilter("news")}
              className={`font-heading font-bold uppercase tracking-wider px-6 py-2 rounded-sm border-2 transition-all cursor-pointer ${
                newsFilter === "news"
                  ? "bg-nsq-gold text-nsq-black border-nsq-gold"
                  : "bg-transparent text-white border-white/20 hover:border-nsq-gold"
              }`}>
              📰 News
            </button>
          </div>

          {/* Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item, index) => (
              <div
                key={item.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}>
                {item.type === "achievement" ? (
                  <AchievementCard item={item} />
                ) : (
                  <NewsCard item={item} />
                )}
              </div>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-xl">Tidak ada item untuk ditampilkan.</p>
            </div>
          )}
        </div>
      </section>

      {/* ================= RECRUITMENT SECTION ================= */}
      <section id="recruitment" className="py-20 bg-nsq-black relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div data-aos="fade-up">
            <span className="text-nsq-red font-heading font-bold uppercase tracking-widest text-sm">
              Join Us
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mt-2 uppercase mb-6">
              Become Part of <span className="text-nsq-gold">NSQ Family</span>
            </h2>
            <div className="w-24 h-1 bg-nsq-red mx-auto mb-8"></div>

            <p className="text-gray-400 text-lg mb-12 leading-relaxed">
              Kami mencari talenta muda yang berdedikasi, kompetitif, dan
              menjunjung tinggi sportivitas. Bergabunglah dengan akademi esports
              resmi yang diakui KONI Tasikmalaya.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSc8vhZc8pcpMrh9N_cgQ8LzIvCiDJoXAr-Tc5GFdOkcDEjk5g/viewform?usp=publish-editor"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-nsq-red hover:bg-nsq-darkred text-white font-heading font-bold uppercase tracking-wider px-8 py-4 rounded-sm border-2 border-nsq-gold transition-all shadow-[0_0_20px_rgba(220,20,60,0.4)] hover:shadow-[0_0_30px_rgba(220,20,60,0.7)] hover:scale-105 text-center inline-block">
                📝 Apply Now
              </a>
              <a
                href="#"
                className="w-full sm:w-auto bg-transparent hover:bg-white/5 text-white font-heading font-bold uppercase tracking-wider px-8 py-4 rounded-sm border-2 border-white/20 hover:border-nsq-gold transition-all text-center inline-block">
                💬 Join Discord
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-nsq-black border-t border-nsq-red/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-nsq-red rounded-full flex items-center justify-center border-2 border-nsq-gold">
                  <span className="font-heading font-bold text-white text-2xl">
                    N
                  </span>
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-heading font-bold text-2xl text-white tracking-wider">
                    NSQ
                  </span>
                  <span className="font-script text-sm text-nsq-gold">
                    Family Academy
                  </span>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Official Esports Academy recognized by KONI Tasikmalaya.
                Building the next generation of competitive esports athletes
                with sportivitas and excellence.
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-nsq-dark border border-nsq-red/30 rounded-full flex items-center justify-center hover:border-nsq-gold hover:bg-nsq-red transition-all text-lg">
                  📷
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-nsq-dark border border-nsq-red/30 rounded-full flex items-center justify-center hover:border-nsq-gold hover:bg-nsq-red transition-all text-lg">
                  ▶️
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-nsq-dark border border-nsq-red/30 rounded-full flex items-center justify-center hover:border-nsq-gold hover:bg-nsq-red transition-all text-lg">
                  🎮
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-heading font-bold text-white uppercase mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#about"
                    className="text-gray-400 hover:text-nsq-gold transition-all text-sm">
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#divisions"
                    className="text-gray-400 hover:text-nsq-gold transition-all text-sm">
                    Divisions
                  </a>
                </li>
                <li>
                  <a
                    href="#programs"
                    className="text-gray-400 hover:text-nsq-gold transition-all text-sm">
                    Programs
                  </a>
                </li>
                <li>
                  <a
                    href="#news"
                    className="text-gray-400 hover:text-nsq-gold transition-all text-sm">
                    News
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold text-white uppercase mb-4">
                Contact
              </h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-nsq-red">📍</span> Tasikmalaya, Jawa
                  Barat
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-nsq-red">📧</span> contact@nsqacademy.id
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-nsq-red">📱</span> +62 812-XXXX-XXXX
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © 2026 NSQ Academy. All rights reserved. | Together We Grow
              Stronger 🦅
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
