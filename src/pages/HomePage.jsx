import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CoachCard from "../components/cards/CoachCard";
import DivisionCard from "../components/cards/DivisionCard";
import ProgramCard from "../components/cards/ProgramCard";
import AchievementCard from "../components/cards/AchievementCard";
import NewsCard from "../components/cards/NewsCard";
import PlayerCard from "../components/cards/PlayerCard";
import nsqLogoDefault from "../assets/images/logos/nsq-logo.png";
import { client, urlFor } from "../sanity";

const HomePage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newsFilter, setNewsFilter] = useState("all");
  const [playerFilter, setPlayerFilter] = useState("all");
  const [activeSection, setActiveSection] = useState("home");

  const [achievementSlideIndex, setAchievementSlideIndex] = useState(0);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const [heroData, setHeroData] = useState(null);
  const [aboutData, setAboutData] = useState(null);
  const [footerData, setFooterData] = useState(null);
  const [sanityCoaches, setSanityCoaches] = useState([]);
  const [sanityNews, setSanityNews] = useState([]);
  const [sanityPlayers, setSanityPlayers] = useState([]);
  const [sanityDivisions, setSanityDivisions] = useState([]);
  const [sanityPrograms, setSanityPrograms] = useState([]);

  const filteredNews =
    newsFilter === "all"
      ? sanityNews
      : sanityNews.filter((item) => item.type === newsFilter);
  const filteredPlayers =
    playerFilter === "all"
      ? sanityPlayers
      : sanityPlayers.filter((player) => player.division === playerFilter);
  const h = heroData || {};
  const a = aboutData || {};
  const f = footerData || {};

  const nsqLogo = h.nsqLogo ? urlFor(h.nsqLogo).url() : nsqLogoDefault;

  const defaultGoogleForm =
    "https://docs.google.com/forms/d/e/1FAIpQLSc8vhZc8pcpMrh9N_cgQ8LzIvCiDJoXAr-Tc5GFdOkcDEjk5g/viewform?usp=publish-editor";
  const joinAcademyUrl = h.joinAcademyUrl || defaultGoogleForm;
  const applyNowUrl = h.applyNowUrl || defaultGoogleForm;
  const joinDiscordUrl = h.joinDiscordUrl || "#";

  useEffect(() => {
    client.fetch('*[_type == "heroSettings"][0]').then(setHeroData);
    client.fetch('*[_type == "aboutSettings"][0]').then(setAboutData);
    client.fetch('*[_type == "footerSettings"][0]').then(setFooterData);
    client.fetch('*[_type == "coach"]').then(setSanityCoaches);
    client.fetch('*[_type == "division"]').then(setSanityDivisions);
    client.fetch('*[_type == "program"]').then(setSanityPrograms);
    client
      .fetch('*[_type == "player" && isActive == true]')
      .then(setSanityPlayers);

    Promise.all([
      client.fetch('*[_type == "news"]'),
      client.fetch('*[_type == "achievement"]'),
    ]).then(([newsData, achievementData]) => {
      const newsWithType = newsData.map((item) => ({ ...item, type: "news" }));
      const achievementsWithType = achievementData.map((item) => ({
        ...item,
        type: "achievement",
      }));
      const combined = [...newsWithType, ...achievementsWithType];

      combined.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        const dateA = a.date ? new Date(a.date) : new Date();
        const dateB = b.date ? new Date(b.date) : new Date();
        return dateB - dateA;
      });
      setSanityNews(combined);
    });
  }, []);

  // ✅ OPTIMASI SCROLL: Mencegah patah-patah dengan requestAnimationFrame & passive: true
  useEffect(() => {
    let ticking = false;
    let currentSection = "home";

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = [
            "home",
            "about",
            "divisions",
            "roster",
            "programs",
            "news",
          ];
          const scrollPos = window.scrollY + 200; // Offset yang lebih pas

          for (const section of sections) {
            const el = document.getElementById(section);
            if (el) {
              const top = el.offsetTop;
              const bottom = top + el.offsetHeight;
              if (scrollPos >= top && scrollPos < bottom) {
                // Hanya update state jika section benar-benar berubah (mencegah re-render berlebihan)
                if (currentSection !== section) {
                  currentSection = section;
                  setActiveSection(section);
                }
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // { passive: true } memberi tahu browser bahwa event ini tidak akan memanggil preventDefault(),
    // sehingga browser bisa melakukan scroll secara asynchronous (jauh lebih mulus).
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const achievements = filteredNews.filter(
      (item) => item.type === "achievement",
    );
    if (achievements.length <= 1) return;
    const interval = setInterval(() => {
      setAchievementSlideIndex((prev) => (prev + 1) % achievements.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [filteredNews]);

  useEffect(() => {
    setAchievementSlideIndex(0);
  }, [newsFilter]);

  const navLinkClass = (section) =>
    activeSection === section
      ? "text-nsq-gold font-medium px-3 py-2 border-b-2 border-nsq-gold font-heading font-bold uppercase tracking-wider"
      : "text-gray-300 hover:text-white transition-all px-3 py-2 font-heading font-semibold uppercase tracking-wider";

  return (
    <div className="min-h-screen bg-nsq-black text-white font-body overflow-x-hidden">
      {/* ================= NAVBAR ================= */}
      <nav className="fixed w-full z-50 bg-nsq-black/90 backdrop-blur-md border-b border-nsq-red/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3">
              <img src={nsqLogo} alt="NSQ Logo" className="h-12 w-auto" />
              <div className="flex flex-col leading-none">
                <span className="font-heading font-bold text-3xl text-white tracking-wider">
                  NSQ
                </span>
                <span className="font-script text-sm text-nsq-gold">
                  Family Academy
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <a href="#home" className={navLinkClass("home")}>
                Home
              </a>
              <a href="#about" className={navLinkClass("about")}>
                About
              </a>
              <a href="#divisions" className={navLinkClass("divisions")}>
                Divisions
              </a>
              <a href="#roster" className={navLinkClass("roster")}>
                Roster
              </a>
              <a href="#programs" className={navLinkClass("programs")}>
                Programs
              </a>
              <a href="#news" className={navLinkClass("news")}>
                News
              </a>
            </div>

            <div className="hidden md:block">
              <a
                href={joinAcademyUrl}
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
                  href="#home"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setActiveSection("home");
                  }}
                  className={
                    activeSection === "home"
                      ? "text-nsq-gold font-heading font-bold uppercase px-3 py-2 border-l-4 border-nsq-gold bg-nsq-gold/10"
                      : "text-gray-300 hover:text-white font-heading font-semibold uppercase px-3 py-2 border-l-4 border-transparent"
                  }>
                  Home
                </a>
                <a
                  href="#about"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setActiveSection("about");
                  }}
                  className={
                    activeSection === "about"
                      ? "text-nsq-gold font-heading font-bold uppercase px-3 py-2 border-l-4 border-nsq-gold bg-nsq-gold/10"
                      : "text-gray-300 hover:text-white font-heading font-semibold uppercase px-3 py-2 border-l-4 border-transparent"
                  }>
                  About
                </a>
                <a
                  href="#divisions"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setActiveSection("divisions");
                  }}
                  className={
                    activeSection === "divisions"
                      ? "text-nsq-gold font-heading font-bold uppercase px-3 py-2 border-l-4 border-nsq-gold bg-nsq-gold/10"
                      : "text-gray-300 hover:text-white font-heading font-semibold uppercase px-3 py-2 border-l-4 border-transparent"
                  }>
                  Divisions
                </a>
                <a
                  href="#roster"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setActiveSection("roster");
                  }}
                  className={
                    activeSection === "roster"
                      ? "text-nsq-gold font-heading font-bold uppercase px-3 py-2 border-l-4 border-nsq-gold bg-nsq-gold/10"
                      : "text-gray-300 hover:text-white font-heading font-semibold uppercase px-3 py-2 border-l-4 border-transparent"
                  }>
                  Roster
                </a>
                <a
                  href="#programs"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setActiveSection("programs");
                  }}
                  className={
                    activeSection === "programs"
                      ? "text-nsq-gold font-heading font-bold uppercase px-3 py-2 border-l-4 border-nsq-gold bg-nsq-gold/10"
                      : "text-gray-300 hover:text-white font-heading font-semibold uppercase px-3 py-2 border-l-4 border-transparent"
                  }>
                  Programs
                </a>
                <a
                  href="#news"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setActiveSection("news");
                  }}
                  className={
                    activeSection === "news"
                      ? "text-nsq-gold font-heading font-bold uppercase px-3 py-2 border-l-4 border-nsq-gold bg-nsq-gold/10"
                      : "text-gray-300 hover:text-white font-heading font-semibold uppercase px-3 py-2 border-l-4 border-transparent"
                  }>
                  News
                </a>
                <a
                  href={joinAcademyUrl}
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

      {/* ================= HERO ================= */}
      <header
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12 md:pt-20">
        <img
          src={nsqLogo}
          alt="NSQ Background Watermark"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[800px] opacity-[0.15] pointer-events-none z-0 select-none"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-nsq-red/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <div
            data-aos="fade-down"
            className="inline-flex items-center gap-2 bg-nsq-dark border border-nsq-gold/30 rounded-full px-4 py-2 mb-6 md:mb-8 mx-auto">
            <span className="w-2 h-2 bg-nsq-gold rounded-full animate-pulse"></span>
            <span className="text-xs sm:text-sm font-medium text-nsq-gold tracking-wide uppercase font-heading px-2">
              {h.topBadge ||
                "Official Esports Academy • Recognized by KONI Tasikmalaya"}
            </span>
          </div>
          <h1
            data-aos="zoom-in"
            data-aos-delay="200"
            className="font-heading font-bold text-4xl sm:text-5xl md:text-7xl lg:text-8xl uppercase leading-tight mb-4 md:mb-6">
            <span className="block text-white">
              {h.titleLine1 || "Together We"}
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-nsq-red via-nsq-gold to-nsq-red">
              {h.titleLine2 || "Grow Stronger"}
            </span>
          </h1>
          <p
            data-aos="fade-up"
            data-aos-delay="400"
            className="mt-4 md:mt-6 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-400 font-body leading-relaxed px-2">
            {h.description ||
              "NSQ Academy hadir sebagai wadah pengembangan bakat, minat, dan potensi generasi muda di dunia Esports. Membangun atlet yang kompetitif dan menjunjung tinggi sportivitas."}
          </p>
          <div
            data-aos="fade-up"
            data-aos-delay="600"
            className="mt-6 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 px-4">
            <a
              href={joinAcademyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-nsq-red hover:bg-nsq-darkred text-white font-heading font-bold uppercase tracking-wider px-6 py-3 md:px-8 md:py-4 rounded-sm border-2 border-nsq-gold transition-all shadow-[0_0_20px_rgba(220,20,60,0.4)] hover:shadow-[0_0_30px_rgba(220,20,60,0.7)] hover:scale-105 text-center inline-block text-sm md:text-base">
              {" "}
              Join The Academy
            </a>
            <a
              href="#divisions"
              className="w-full sm:w-auto bg-transparent hover:bg-white/5 text-white font-heading font-bold uppercase tracking-wider px-6 py-3 md:px-8 md:py-4 rounded-sm border-2 border-white/20 hover:border-nsq-gold transition-all text-center inline-block text-sm md:text-base">
              View Divisions
            </a>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="800"
            className="mt-8 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-t border-white/10 pt-6 md:pt-8 px-2">
            <div>
              <div className="text-2xl md:text-3xl font-heading font-bold text-nsq-gold">
                {h.stat1Value || "5"}
              </div>
              <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wider mt-1">
                {h.stat1Label || "Game Divisions"}
              </div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-heading font-bold text-nsq-gold">
                {h.stat2Value || "KONI"}
              </div>
              <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wider mt-1">
                {h.stat2Label || "Affiliated"}
              </div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-heading font-bold text-nsq-gold">
                {h.stat3Value || "100+"}
              </div>
              <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wider mt-1">
                {h.stat3Label || "Academy Players"}
              </div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-heading font-bold text-nsq-gold">
                {h.stat4Value || "Pro"}
              </div>
              <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wider mt-1">
                {h.stat4Label || "Coaching Staff"}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ================= ABOUT ================= */}
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
                {a.mainDescription ||
                  "NSQ Academy hadir sebagai wadah pengembangan bakat, minat, dan potensi generasi muda di dunia Esports. Kami berkomitmen membangun komunitas Esports yang positif, kompetitif, profesional, serta menjunjung tinggi sportivitas dan kerja sama tim."}
              </p>
            </div>
            <div data-aos="fade-left" className="grid grid-cols-2 gap-4">
              <div className="bg-nsq-black border border-nsq-red/20 rounded-lg p-6 hover:border-nsq-gold transition-all">
                <div className="text-4xl mb-3">🎯</div>
                <h4 className="font-heading font-bold text-white uppercase mb-2">
                  {a.visionTitle || "Visi"}
                </h4>
                <p className="text-gray-400 text-sm">
                  {a.visionDesc ||
                    "Menjadi akademi esports terdepan di Jawa Barat yang menghasilkan atlet berprestasi."}
                </p>
              </div>
              <div className="bg-nsq-black border border-nsq-red/20 rounded-lg p-6 hover:border-nsq-gold transition-all">
                <div className="text-4xl mb-3">🚀</div>
                <h4 className="font-heading font-bold text-white uppercase mb-2">
                  {a.missionTitle || "Misi"}
                </h4>
                <p className="text-gray-400 text-sm">
                  {a.missionDesc ||
                    "Mengembangkan talenta muda melalui pelatihan profesional dan kompetisi berkualitas."}
                </p>
              </div>
              <div className="bg-nsq-black border border-nsq-red/20 rounded-lg p-6 hover:border-nsq-gold transition-all">
                <div className="text-4xl mb-3">🤝</div>
                <h4 className="font-heading font-bold text-white uppercase mb-2">
                  {a.familyTitle || "Family"}
                </h4>
                <p className="text-gray-400 text-sm">
                  {a.familyDesc ||
                    "Membangun ekosistem kekeluargaan yang solid antar pemain, coach, dan staff."}
                </p>
              </div>
              <div className="bg-nsq-black border border-nsq-red/20 rounded-lg p-6 hover:border-nsq-gold transition-all">
                <div className="text-4xl mb-3">🏆</div>
                <h4 className="font-heading font-bold text-white uppercase mb-2">
                  {a.prestasiTitle || "Prestasi"}
                </h4>
                <p className="text-gray-400 text-sm">
                  {a.prestasiDesc ||
                    "Menargetkan juara di setiap turnamen yang diikuti dengan sportivitas tinggi."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COACHES ================= */}
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
            {sanityCoaches.length > 0 ? (
              sanityCoaches.map((coach, index) => (
                <div
                  key={coach._id}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  onClick={() => setSelectedCoach(coach)}
                  className="cursor-pointer">
                  <CoachCard
                    coach={{
                      id: coach._id,
                      name: coach.name,
                      role: coach.role,
                      location: coach.location,
                      image: urlFor(coach.image).url(),
                    }}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-500 py-12">
                Belum ada coach.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= DIVISIONS ================= */}
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
            {sanityDivisions.length > 0 ? (
              sanityDivisions.map((division, index) => (
                <div
                  key={division._id}
                  data-aos="zoom-in"
                  data-aos-delay={index * 100}>
                  <DivisionCard
                    division={{
                      ...division,
                      image: division.image ? urlFor(division.image).url() : "",
                      backgroundImage: division.backgroundImage
                        ? urlFor(division.backgroundImage).url()
                        : "",
                    }}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-500 py-12">
                Belum ada divisi.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= ROSTER ================= */}
      <section id="roster" className="py-20 bg-nsq-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-aos="fade-up" className="text-center mb-12">
            <span className="text-nsq-red font-heading font-bold uppercase tracking-widest text-sm">
              Our Warriors
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mt-2 uppercase">
              Active <span className="text-nsq-gold">Roster</span>
            </h2>
            <div className="w-24 h-1 bg-nsq-red mx-auto mt-4"></div>
            <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
              Kenali para pemain aktif yang berjuang membawa nama NSQ Academy di
              berbagai turnamen.
            </p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setPlayerFilter("all")}
              className={`font-heading font-bold uppercase tracking-wider px-6 py-2 rounded-sm border-2 transition-all cursor-pointer ${playerFilter === "all" ? "bg-nsq-gold text-nsq-black border-nsq-gold" : "bg-transparent text-white border-white/20 hover:border-nsq-gold"}`}>
              🌟 All Divisions
            </button>
            <button
              onClick={() => setPlayerFilter("Mobile Legends")}
              className={`font-heading font-bold uppercase tracking-wider px-6 py-2 rounded-sm border-2 transition-all cursor-pointer ${playerFilter === "Mobile Legends" ? "bg-nsq-gold text-nsq-black border-nsq-gold" : "bg-transparent text-white border-white/20 hover:border-nsq-gold"}`}>
              MLBB
            </button>
            <button
              onClick={() => setPlayerFilter("PUBG Mobile")}
              className={`font-heading font-bold uppercase tracking-wider px-6 py-2 rounded-sm border-2 transition-all cursor-pointer ${playerFilter === "PUBG Mobile" ? "bg-nsq-gold text-nsq-black border-nsq-gold" : "bg-transparent text-white border-white/20 hover:border-nsq-gold"}`}>
              PUBGM
            </button>
            <button
              onClick={() => setPlayerFilter("Free Fire")}
              className={`font-heading font-bold uppercase tracking-wider px-6 py-2 rounded-sm border-2 transition-all cursor-pointer ${playerFilter === "Free Fire" ? "bg-nsq-gold text-nsq-black border-nsq-gold" : "bg-transparent text-white border-white/20 hover:border-nsq-gold"}`}>
              Free Fire
            </button>
            <button
              onClick={() => setPlayerFilter("Honor of Kings")}
              className={`font-heading font-bold uppercase tracking-wider px-6 py-2 rounded-sm border-2 transition-all cursor-pointer ${playerFilter === "Honor of Kings" ? "bg-nsq-gold text-nsq-black border-nsq-gold" : "bg-transparent text-white border-white/20 hover:border-nsq-gold"}`}>
              HoK
            </button>
            <button
              onClick={() => setPlayerFilter("Lokapala")}
              className={`font-heading font-bold uppercase tracking-wider px-6 py-2 rounded-sm border-2 transition-all cursor-pointer ${playerFilter === "Lokapala" ? "bg-nsq-gold text-nsq-black border-nsq-gold" : "bg-transparent text-white border-white/20 hover:border-nsq-gold"}`}>
              Lokapala
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPlayers.length > 0 ? (
              filteredPlayers.map((player, index) => (
                <div
                  key={player._id}
                  data-aos="fade-up"
                  data-aos-delay={index * 50}>
                  <PlayerCard
                    player={{
                      ...player,
                      image: player.image
                        ? urlFor(player.image).url()
                        : "https://via.placeholder.com/400x500?text=No+Image",
                    }}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-12">
                Belum ada player aktif di divisi ini.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= PROGRAMS ================= */}
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
            {sanityPrograms.length > 0 ? (
              sanityPrograms.map((program, index) => (
                <Link
                  key={program._id}
                  to={`/program/${program._id}`}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="block">
                  <ProgramCard
                    program={{
                      ...program,
                      icon: program.icon || "🎯",
                      bannerImage: program.bannerImage
                        ? urlFor(program.bannerImage).url()
                        : "",
                    }}
                  />
                </Link>
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-500 py-12">
                Belum ada program.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= NEWS & ACHIEVEMENTS ================= */}
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
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setNewsFilter("all")}
              className={`font-heading font-bold uppercase tracking-wider px-6 py-2 rounded-sm border-2 transition-all cursor-pointer ${newsFilter === "all" ? "bg-nsq-gold text-nsq-black border-nsq-gold" : "bg-transparent text-white border-white/20 hover:border-nsq-gold"}`}>
              📋 All
            </button>
            <button
              onClick={() => setNewsFilter("achievement")}
              className={`font-heading font-bold uppercase tracking-wider px-6 py-2 rounded-sm border-2 transition-all cursor-pointer ${newsFilter === "achievement" ? "bg-nsq-gold text-nsq-black border-nsq-gold" : "bg-transparent text-white border-white/20 hover:border-nsq-gold"}`}>
              🏆 Achievements
            </button>
            <button
              onClick={() => setNewsFilter("news")}
              className={`font-heading font-bold uppercase tracking-wider px-6 py-2 rounded-sm border-2 transition-all cursor-pointer ${newsFilter === "news" ? "bg-nsq-gold text-nsq-black border-nsq-gold" : "bg-transparent text-white border-white/20 hover:border-nsq-gold"}`}>
              📰 News
            </button>
          </div>
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.length > 0 ? (
              filteredNews.map((item, index) => {
                const imageSrc = item.image
                  ? urlFor(item.image).url()
                  : item.image;
                return (
                  <div
                    key={item._id || index}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}>
                    {item.type === "achievement" ? (
                      <div
                        onClick={() => setSelectedAchievement(item)}
                        className="cursor-pointer">
                        <AchievementCard item={{ ...item, image: imageSrc }} />
                      </div>
                    ) : (
                      <NewsCard item={{ ...item, image: imageSrc }} />
                    )}
                  </div>
                );
              })
            ) : (
              <div className="col-span-3 text-center text-gray-500 py-12">
                Belum ada berita atau news.
              </div>
            )}
          </div>
          <div className="md:hidden">
            {filteredNews.filter((item) => item.type === "achievement").length >
            0 ? (
              <div className="relative">
                <div className="overflow-hidden rounded-lg">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                      transform: `translateX(-${achievementSlideIndex * 100}%)`,
                    }}>
                    {filteredNews
                      .filter((item) => item.type === "achievement")
                      .map((item, index) => {
                        const imageSrc = item.image
                          ? urlFor(item.image).url()
                          : item.image;
                        return (
                          <div
                            key={item._id || index}
                            className="w-full flex-shrink-0 px-2">
                            <div
                              onClick={() => setSelectedAchievement(item)}
                              className="cursor-pointer">
                              <AchievementCard
                                item={{ ...item, image: imageSrc }}
                              />
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <button
                  onClick={() =>
                    setAchievementSlideIndex((prev) =>
                      prev === 0
                        ? filteredNews.filter(
                            (item) => item.type === "achievement",
                          ).length - 1
                        : prev - 1,
                    )
                  }
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-nsq-black/80 border border-nsq-gold/50 rounded-full flex items-center justify-center text-white hover:bg-nsq-red transition z-10">
                  ‹
                </button>
                <button
                  onClick={() =>
                    setAchievementSlideIndex(
                      (prev) =>
                        (prev + 1) %
                        filteredNews.filter(
                          (item) => item.type === "achievement",
                        ).length,
                    )
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-nsq-black/80 border border-nsq-gold/50 rounded-full flex items-center justify-center text-white hover:bg-nsq-red transition z-10">
                  ›
                </button>
                <div className="flex justify-center gap-2 mt-4">
                  {filteredNews
                    .filter((item) => item.type === "achievement")
                    .map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setAchievementSlideIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${achievementSlideIndex === index ? "bg-nsq-gold w-6" : "bg-white/30"}`}
                      />
                    ))}
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                Belum ada achievement.
              </div>
            )}
            {filteredNews.filter((item) => item.type === "news").length > 0 && (
              <div className="mt-8 space-y-6">
                <h3 className="font-heading text-xl font-bold text-white uppercase mb-4">
                  {" "}
                  Latest News
                </h3>
                {filteredNews
                  .filter((item) => item.type === "news")
                  .map((item, index) => {
                    const imageSrc = item.image
                      ? urlFor(item.image).url()
                      : item.image;
                    return (
                      <div
                        key={item._id || index}
                        data-aos="fade-up"
                        data-aos-delay={index * 100}>
                        <NewsCard item={{ ...item, image: imageSrc }} />
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= RECRUITMENT ================= */}
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
                href={applyNowUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-nsq-red hover:bg-nsq-darkred text-white font-heading font-bold uppercase tracking-wider px-8 py-4 rounded-sm border-2 border-nsq-gold transition-all shadow-[0_0_20px_rgba(220,20,60,0.4)] hover:shadow-[0_0_30px_rgba(220,20,60,0.7)] hover:scale-105 text-center inline-block">
                📝 Apply Now
              </a>
              <a
                href={joinDiscordUrl}
                target="_blank"
                rel="noopener noreferrer"
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
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12 pb-8 border-b border-white/10">
            {f.esiLogo && (
              <div className="flex items-center gap-4 bg-nsq-dark/50 px-5 py-3 rounded-lg border border-nsq-gold/30">
                <img
                  src={urlFor(f.esiLogo).url()}
                  alt="ESI Logo"
                  className="h-14 w-auto object-contain"
                />
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                    Official Federation
                  </p>
                  <p className="text-sm font-heading font-bold text-nsq-gold">
                    ESI Kabupaten Tasikmalaya
                  </p>
                </div>
              </div>
            )}
            <div className="hidden md:block w-px h-14 bg-white/20"></div>
            <div className="text-center md:text-left">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
                Event Organizer
              </p>
              <p className="text-xl font-heading font-bold text-white">
                {f.organizerText || "Organizer by Family Organizer"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src={nsqLogo} alt="NSQ Logo" className="h-12 w-auto" />
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
                Official Esports Academy recognized by ESI Kabupaten
                Tasikmalaya. Building the next generation of competitive esports
                athletes with sportivitas and excellence.
              </p>
              <div className="flex gap-3">
                {f.instagram && (
                  <a
                    href={f.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-10 h-10 bg-nsq-dark border border-nsq-red/30 rounded-full flex items-center justify-center hover:border-pink-500 hover:bg-pink-500/20 transition-all">
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-pink-500 transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                )}
                {f.facebook && (
                  <a
                    href={f.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-10 h-10 bg-nsq-dark border border-nsq-red/30 rounded-full flex items-center justify-center hover:border-blue-600 hover:bg-blue-600/20 transition-all">
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                )}
                {f.youtube && (
                  <a
                    href={f.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-10 h-10 bg-nsq-dark border border-nsq-red/30 rounded-full flex items-center justify-center hover:border-red-600 hover:bg-red-600/20 transition-all">
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                )}
                {f.discord && (
                  <a
                    href={f.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-10 h-10 bg-nsq-dark border border-nsq-red/30 rounded-full flex items-center justify-center hover:border-indigo-500 hover:bg-indigo-500/20 transition-all">
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                  </a>
                )}
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
                    href="#roster"
                    className="text-gray-400 hover:text-nsq-gold transition-all text-sm">
                    Roster
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
                  <span className="text-nsq-red">📍</span>{" "}
                  {f.address || "Tasikmalaya, Jawa Barat"}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-nsq-red">📧</span>{" "}
                  {f.email || "contact@nsqacademy.id"}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-nsq-red">📱</span>{" "}
                  {f.phone || "+62 812-XXXX-XXXX"}
                </li>
              </ul>
            </div>
          </div>

          {f.sponsors && f.sponsors.length > 0 && (
            <div className="mb-8 pb-8 border-b border-white/10">
              <h4 className="font-heading font-bold text-white uppercase mb-6 text-center text-xs tracking-[0.2em] text-gray-400">
                Supported By Our Sponsors
              </h4>
              <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
                {f.sponsors.map((sponsor, idx) => (
                  <div
                    key={idx}
                    className="w-20 h-20 md:w-28 md:h-28 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center p-3 hover:border-nsq-gold/50 hover:bg-white/10 transition-all">
                    <img
                      src={urlFor(sponsor).url()}
                      alt="Sponsor"
                      className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © 2026 NSQ Academy. All rights reserved. | Together We Grow
              Stronger 🦅
            </p>
          </div>
        </div>
      </footer>

      {/* ================= MODAL COACH ================= */}
      {selectedCoach && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedCoach(null)}>
          <div
            className="bg-nsq-dark border-2 border-nsq-gold/50 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <img
                src={urlFor(selectedCoach.image).url()}
                alt={selectedCoach.name}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <button
                onClick={() => setSelectedCoach(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-nsq-black/80 border border-nsq-gold rounded-full text-white hover:bg-nsq-red transition flex items-center justify-center text-xl">
                ✕
              </button>
            </div>
            <div className="p-8">
              <span className="text-nsq-red font-heading font-bold uppercase tracking-widest text-sm">
                Coach
              </span>
              <h2 className="font-heading text-4xl font-bold text-white uppercase mt-2 mb-2">
                {selectedCoach.name}
              </h2>
              <div className="inline-block bg-gradient-to-r from-nsq-red to-nsq-darkred border border-nsq-gold/50 text-nsq-gold font-heading font-bold text-sm uppercase tracking-wider px-4 py-2 rounded-sm mb-4">
                {selectedCoach.role}
              </div>
              <div className="flex items-center gap-2 text-gray-400 mb-6">
                <span className="text-nsq-red">📍</span>
                <span>{selectedCoach.location}</span>
              </div>
              {selectedCoach.bio && (
                <div className="border-t border-white/10 pt-6">
                  <h3 className="font-heading text-xl text-nsq-gold uppercase mb-3">
                    Biografi
                  </h3>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {selectedCoach.bio}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL ACHIEVEMENT ================= */}
      {selectedAchievement && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedAchievement(null)}>
          <div
            className="bg-nsq-dark border-2 border-nsq-gold/50 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              {selectedAchievement.image && (
                <img
                  src={urlFor(selectedAchievement.image).url()}
                  alt={selectedAchievement.title}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
              )}
              <button
                onClick={() => setSelectedAchievement(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-nsq-black/80 border border-nsq-gold rounded-full text-white hover:bg-nsq-red transition flex items-center justify-center text-xl">
                ✕
              </button>
            </div>
            <div className="p-8">
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="bg-nsq-gold text-nsq-black font-heading font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-sm">
                  🏆 {selectedAchievement.rank}
                </span>
                {selectedAchievement.category && (
                  <span className="bg-nsq-red/20 border border-nsq-red/50 text-nsq-gold font-heading font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-sm">
                    {selectedAchievement.category}
                  </span>
                )}
                {selectedAchievement.date && (
                  <span className="bg-nsq-black/50 border border-white/20 text-gray-300 font-heading text-xs uppercase tracking-wider px-3 py-1 rounded-sm">
                    📅{" "}
                    {new Date(selectedAchievement.date).toLocaleDateString(
                      "id-ID",
                      { year: "numeric", month: "long", day: "numeric" },
                    )}
                  </span>
                )}
              </div>
              <h2 className="font-heading text-3xl font-bold text-white uppercase mb-4">
                {selectedAchievement.title}
              </h2>
              {selectedAchievement.description && (
                <p className="text-gray-300 leading-relaxed mb-4">
                  {selectedAchievement.description}
                </p>
              )}
              {selectedAchievement.longDescription && (
                <div className="border-t border-white/10 pt-4">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {selectedAchievement.longDescription}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
