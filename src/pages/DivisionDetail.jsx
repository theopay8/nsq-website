import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getDocumentBySlug, getDocumentById, urlFor } from "../sanity";
import nsqLogo from "../assets/images/logos/nsq-logo.png";

const DivisionDetail = () => {
  const { slug } = useParams();
  const [division, setDivision] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDivision = async () => {
      try {
        let data;
        if (slug.startsWith("_")) {
          data = await getDocumentById("division", slug);
        } else {
          data = await getDocumentBySlug("division", slug);
        }
        setDivision(data);
      } catch (error) {
        console.error("Error fetching division:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDivision();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-nsq-black flex items-center justify-center">
        <div className="text-nsq-gold text-2xl font-heading">Loading...</div>
      </div>
    );
  }

  if (!division) {
    return (
      <div className="min-h-screen bg-nsq-black flex flex-col items-center justify-center">
        <h1 className="text-3xl font-heading text-white mb-4">
          Division Tidak Ditemukan
        </h1>
        <Link to="/" className="text-nsq-gold hover:text-white transition">
          ← Kembali ke Home
        </Link>
      </div>
    );
  }

  const bannerUrl = division.backgroundImage
    ? urlFor(division.backgroundImage).url()
    : null;
  const aspectRatio =
    division.backgroundImage?.metadata?.dimensions?.aspectRatio || 16 / 9;

  return (
    <div className="min-h-screen bg-nsq-black text-white font-body">
      {/* Navbar Simple */}
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

      {/* Banner dengan Aspect Ratio Dinamis */}
      <div className="relative pt-20">
        {bannerUrl && (
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: aspectRatio }}>
            <img
              src={bannerUrl}
              alt={`${division.name} banner`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-nsq-black via-nsq-black/70 to-transparent"></div>
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 pb-20">
          <div className="bg-nsq-dark/90 backdrop-blur-md border border-nsq-red/30 rounded-lg p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-nsq-red to-nsq-gold rounded-full blur-md opacity-50"></div>
                <div className="relative w-32 h-32 bg-nsq-black rounded-full border-2 border-nsq-gold flex items-center justify-center overflow-hidden">
                  {division.image ? (
                    <img
                      src={urlFor(division.image).url()}
                      alt={division.name}
                      className="w-24 h-24 object-contain"
                    />
                  ) : (
                    <span className="text-5xl">🎮</span>
                  )}
                </div>
              </div>
              <div className="text-center md:text-left">
                <span className="text-nsq-red font-heading font-bold uppercase tracking-widest text-sm">
                  Game Division
                </span>
                <h1 className="font-heading text-5xl font-bold text-white mt-2 uppercase mb-3">
                  {division.name}
                </h1>
                <div className="inline-block bg-gradient-to-r from-nsq-red to-nsq-darkred border border-nsq-gold/50 text-nsq-gold font-heading font-bold text-sm uppercase tracking-wider px-4 py-2 rounded-sm">
                  {division.game}
                </div>
              </div>
            </div>

            {division.description && (
              <div className="mb-8">
                <h3 className="font-heading text-xl text-nsq-gold uppercase mb-3">
                  Tentang Divisi
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {division.description}
                </p>
              </div>
            )}

            {division.longDescription && (
              <div>
                <h3 className="font-heading text-xl text-nsq-gold uppercase mb-3">
                  Informasi Lengkap
                </h3>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {division.longDescription}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DivisionDetail;
