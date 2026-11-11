import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getDocumentBySlug, getDocumentById, urlFor } from "../sanity";
import nsqLogo from "../assets/images/logos/nsq-logo.png";

const AchievementDetail = () => {
  const { slug } = useParams();
  const [achievement, setAchievement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievement = async () => {
      try {
        let data;
        if (slug.startsWith("_")) {
          data = await getDocumentById("achievement", slug);
        } else {
          data = await getDocumentBySlug("achievement", slug);
        }
        setAchievement(data);
      } catch (error) {
        console.error("Error fetching achievement:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievement();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-nsq-black flex items-center justify-center">
        <div className="text-nsq-gold text-2xl font-heading">Loading...</div>
      </div>
    );
  }

  if (!achievement) {
    return (
      <div className="min-h-screen bg-nsq-black flex flex-col items-center justify-center">
        <h1 className="text-3xl font-heading text-white mb-4">
          Achievement Tidak Ditemukan
        </h1>
        <Link to="/" className="text-nsq-gold hover:text-white transition">
          ← Kembali ke Home
        </Link>
      </div>
    );
  }

  const imageUrl = achievement.image ? urlFor(achievement.image).url() : null;
  const aspectRatio =
    achievement.image?.metadata?.dimensions?.aspectRatio || 16 / 9;
  const formattedDate = achievement.date
    ? new Date(achievement.date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="min-h-screen bg-nsq-black text-white font-body">
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

      <div className="relative pt-20">
        {imageUrl && (
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: aspectRatio }}>
            <img
              src={imageUrl}
              alt={achievement.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-nsq-black via-nsq-black/70 to-transparent"></div>
          </div>
        )}

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 pb-20">
          <div className="bg-nsq-dark/90 backdrop-blur-md border border-nsq-red/30 rounded-lg p-8 md:p-12">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="bg-nsq-gold text-nsq-black font-heading font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-sm">
                🏆 {achievement.rank}
              </span>
              {achievement.category && (
                <span className="bg-nsq-red/20 border border-nsq-red/50 text-nsq-gold font-heading font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-sm">
                  {achievement.category}
                </span>
              )}
              {formattedDate && (
                <span className="bg-nsq-black/50 border border-white/20 text-gray-300 font-heading text-xs uppercase tracking-wider px-3 py-1 rounded-sm">
                  📅 {formattedDate}
                </span>
              )}
            </div>

            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white uppercase mb-6">
              {achievement.title}
            </h1>

            {achievement.description && (
              <div className="mb-6">
                <p className="text-gray-300 text-lg leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            )}

            {achievement.longDescription && (
              <div className="border-t border-white/10 pt-6">
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {achievement.longDescription}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementDetail;
