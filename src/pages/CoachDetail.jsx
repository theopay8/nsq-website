import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getDocumentBySlug, getDocumentById, urlFor } from "../sanity";
import nsqLogo from "../assets/images/logos/nsq-logo.png";

const CoachDetail = () => {
  const { slug } = useParams();
  const [coach, setCoach] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoach = async () => {
      try {
        let data;
        if (slug.startsWith("_")) {
          data = await getDocumentById("coach", slug);
        } else {
          data = await getDocumentBySlug("coach", slug);
        }
        setCoach(data);
      } catch (error) {
        console.error("Error fetching coach:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoach();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-nsq-black flex items-center justify-center">
        <div className="text-nsq-gold text-2xl font-heading">Loading...</div>
      </div>
    );
  }

  if (!coach) {
    return (
      <div className="min-h-screen bg-nsq-black flex flex-col items-center justify-center">
        <h1 className="text-3xl font-heading text-white mb-4">
          Coach Tidak Ditemukan
        </h1>
        <Link to="/" className="text-nsq-gold hover:text-white transition">
          ← Kembali ke Home
        </Link>
      </div>
    );
  }

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

      {/* Content */}
      <div className="pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Foto */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-nsq-red to-nsq-gold rounded-lg blur-xl opacity-30"></div>
              <img
                src={urlFor(coach.image).url()}
                alt={coach.name}
                className="relative w-full rounded-lg border-2 border-nsq-gold/50 shadow-[0_0_30px_rgba(220,20,60,0.3)]"
              />
            </div>

            {/* Info */}
            <div>
              <span className="text-nsq-red font-heading font-bold uppercase tracking-widest text-sm">
                Our Coach
              </span>
              <h1 className="font-heading text-5xl font-bold text-white mt-2 uppercase mb-4">
                {coach.name}
              </h1>
              <div className="inline-block bg-gradient-to-r from-nsq-red to-nsq-darkred border border-nsq-gold/50 text-nsq-gold font-heading font-bold text-sm uppercase tracking-wider px-4 py-2 rounded-sm mb-6">
                {coach.role}
              </div>
              <div className="flex items-center gap-2 text-gray-400 mb-8">
                <span className="text-nsq-red">📍</span>
                <span>{coach.location}</span>
              </div>

              {coach.bio && (
                <div className="prose prose-invert max-w-none">
                  <h3 className="font-heading text-xl text-nsq-gold uppercase mb-3">
                    Biografi
                  </h3>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {coach.bio}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachDetail;
