const DivisionCard = ({ division }) => {
  return (
    <div className="bg-nsq-dark border border-nsq-red/20 rounded-lg p-8 hover:border-nsq-gold transition-all duration-300 group hover:shadow-[0_0_30px_rgba(220,20,60,0.3)] relative overflow-hidden">
      {/* Glow effect di background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-nsq-red/10 rounded-full blur-3xl group-hover:bg-nsq-gold/10 transition-all"></div>

      <div className="relative z-10">
        {/* Logo Game */}
        <div className="mb-6 flex justify-center">
          <div className="w-24 h-24 bg-nsq-black rounded-full border-2 border-nsq-gold/30 flex items-center justify-center group-hover:border-nsq-gold transition-all group-hover:scale-110 duration-300 overflow-hidden">
            {division.image ? (
              <img
                src={division.image}
                alt={division.name}
                className="w-16 h-16 object-contain"
              />
            ) : (
              <span className="text-4xl">🎮</span>
            )}
          </div>
        </div>

        {/* Nama Divisi */}
        <h3 className="font-heading text-2xl font-bold text-white uppercase mb-2 text-center tracking-wide">
          {division.name}
        </h3>

        {/* Nama Game */}
        <div className="text-center mb-4">
          <span className="inline-block bg-nsq-red/20 border border-nsq-red/50 text-nsq-gold font-heading font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-sm">
            {division.game}
          </span>
        </div>

        {/* Deskripsi */}
        <p className="text-gray-400 text-sm text-center leading-relaxed">
          {division.description}
        </p>
      </div>
    </div>
  );
};

export default DivisionCard;
