const ProgramCard = ({ program }) => {
  return (
    <div className="bg-nsq-dark border border-nsq-red/20 rounded-lg overflow-hidden hover:border-nsq-gold transition-all duration-500 group hover:shadow-[0_0_40px_rgba(220,20,60,0.4)] relative">
      {/* Banner Image dengan Aspect Ratio Dinamis */}
      {program.bannerImage && (
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: "16/9" }}>
          <img
            src={program.bannerImage}
            alt={program.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-nsq-dark via-nsq-dark/50 to-transparent"></div>
        </div>
      )}

      {/* Content */}
      <div className="p-6 relative">
        <div className="text-5xl mb-4">{program.icon || "🎯"}</div>
        <h3 className="font-heading text-2xl font-bold text-white uppercase mb-3 tracking-wide">
          {program.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {program.description}
        </p>
        <div className="inline-flex items-center gap-2 text-nsq-gold font-heading font-bold text-sm uppercase tracking-wider group-hover:gap-3 transition-all">
          <span>Lihat Detail</span>
          <span>→</span>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;
