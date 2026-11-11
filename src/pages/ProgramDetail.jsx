import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { client, urlFor } from "../sanity";
import nsqLogo from "../assets/images/logos/nsq-logo.png";

const ProgramDetail = () => {
  const { id } = useParams();
  const [program, setProgram] = useState(null);
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const programData = await client.fetch(
          `*[_type == "program" && _id == "${id}"][0]`,
        );
        const footer = await client.fetch('*[_type == "footerSettings"][0]');
        setProgram(programData);
        setFooterData(footer);
      } catch (error) {
        console.error("Error fetching program:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  const f = footerData || {};

  if (loading) {
    return (
      <div className="min-h-screen bg-nsq-black flex items-center justify-center">
        <div className="text-nsq-gold text-2xl font-heading animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-screen bg-nsq-black flex flex-col items-center justify-center">
        <h1 className="text-3xl font-heading text-white mb-4">
          Program Tidak Ditemukan
        </h1>
        <Link
          to="/"
          className="text-nsq-gold hover:text-white transition font-heading font-bold">
          ← Kembali ke Home
        </Link>
      </div>
    );
  }

  const bannerUrl = program.bannerImage
    ? urlFor(program.bannerImage).url()
    : null;
  const aspectRatio =
    program.bannerImage?.metadata?.dimensions?.aspectRatio || 16 / 9;

  return (
    <div className="min-h-screen bg-nsq-black text-white font-body flex flex-col">
      {/* Navbar */}
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
            <Link
              to="/"
              className="text-gray-300 hover:text-nsq-gold transition font-heading font-bold uppercase tracking-wider">
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Banner dengan Aspect Ratio Dinamis */}
        <div className="relative pt-20">
          {bannerUrl && (
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: aspectRatio }}>
              <img
                src={bannerUrl}
                alt={`${program.title} banner`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-nsq-black via-nsq-black/70 to-transparent"></div>
            </div>
          )}

          {/* Content */}
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 pb-20">
            <div className="bg-nsq-dark/90 backdrop-blur-md border border-nsq-red/30 rounded-lg p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">{program.icon || "🎯"}</div>
                <span className="text-nsq-red font-heading font-bold uppercase tracking-widest text-sm">
                  Academy Program
                </span>
                <h1 className="font-heading text-5xl font-bold text-white mt-2 uppercase mb-4">
                  {program.title}
                </h1>
              </div>

              {program.description && (
                <div className="mb-8">
                  <h3 className="font-heading text-xl text-nsq-gold uppercase mb-3">
                    Ringkasan
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {program.description}
                  </p>
                </div>
              )}

              {program.longDescription && (
                <div>
                  <h3 className="font-heading text-xl text-nsq-gold uppercase mb-3">
                    Detail Program
                  </h3>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {program.longDescription}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-nsq-black border-t border-nsq-red/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                Official Esports Academy recognized by Esi Kabupaten
                Tasikmalaya. Building the next generation of competitive esports
                athletes with sportivitas and excellence.
              </p>
              <div className="flex gap-3">
                {f.instagram && (
                  <a
                    href={f.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-nsq-dark border border-nsq-red/30 rounded-full flex items-center justify-center hover:border-nsq-gold hover:bg-nsq-red transition-all text-lg">
                    📷
                  </a>
                )}
                {f.youtube && (
                  <a
                    href={f.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-nsq-dark border border-nsq-red/30 rounded-full flex items-center justify-center hover:border-nsq-gold hover:bg-nsq-red transition-all text-lg">
                    ▶️
                  </a>
                )}
                {f.discord && (
                  <a
                    href={f.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-nsq-dark border border-nsq-red/30 rounded-full flex items-center justify-center hover:border-nsq-gold hover:bg-nsq-red transition-all text-lg">
                    🎮
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
                  <Link
                    to="/#about"
                    className="text-gray-400 hover:text-nsq-gold transition-all text-sm">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#divisions"
                    className="text-gray-400 hover:text-nsq-gold transition-all text-sm">
                    Divisions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#roster"
                    className="text-gray-400 hover:text-nsq-gold transition-all text-sm">
                    Roster
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#programs"
                    className="text-gray-400 hover:text-nsq-gold transition-all text-sm">
                    Programs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#news"
                    className="text-gray-400 hover:text-nsq-gold transition-all text-sm">
                    News
                  </Link>
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
};

export default ProgramDetail;
