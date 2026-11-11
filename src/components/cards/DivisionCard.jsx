const DivisionCard = ({ division }) => {
  return (
    <div className="relative h-96 border border-nsq-red/30 rounded-lg overflow-hidden hover:border-nsq-gold transition-all duration-500 group hover:shadow-[0_0_40px_rgba(220,20,60,0.4)]">
      {/* BACKGROUND FOTO */}
      <div className="absolute inset-0">
        {division.backgroundImage ? (
          <img
            src={division.backgroundImage}
            alt={`${division.name} background`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-nsq-dark via-nsq-black to-nsq-dark"></div>
        )}
      </div>

      {/* OVERLAY GRADIENT (biar teks tetap terbaca) */}
      <div className="absolute inset-0 bg-gradient-to-t from-nsq-black via-nsq-black/80 to-nsq-black/40"></div>

      {/* GLOW EFFECT di pojok */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-nsq-red/20 rounded-full blur-3xl group-hover:bg-nsq-gold/30 transition-all duration-500"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-nsq-gold/10 rounded-full blur-3xl group-hover:bg-nsq-red/20 transition-all duration-500"></div>

      {/* CONTENT */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
        {/* Logo Game dengan Ring Glow */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            {/* Outer Ring Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-nsq-red to-nsq-gold rounded-full blur-md opacity-50 group-hover:opacity-100 transition-all duration-500"></div>

            {/* Logo Container */}
            <div className="relative w-28 h-28 bg-nsq-black/80 backdrop-blur-sm rounded-full border-2 border-nsq-gold/50 flex items-center justify-center group-hover:border-nsq-gold transition-all duration-500 group-hover:scale-110 overflow-hidden">
              {division.image ? (
                <img
                  src={division.image}
                  alt={division.name}
                  className="w-20 h-20 object-contain drop-shadow-[0_0_10px_rgba(220,20,60,0.5)]"
                />
              ) : (
                <span className="text-5xl">🎮</span>
              )}
            </div>
          </div>
        </div>

        {/* Nama Divisi */}
        <h3 className="font-heading text-3xl font-bold text-white uppercase mb-3 tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
          {division.name}
        </h3>

        {/* Nama Game dengan Badge Keren */}
        <div className="mb-5">
          <span className="inline-block bg-gradient-to-r from-nsq-red to-nsq-darkred border border-nsq-gold/50 text-nsq-gold font-heading font-bold text-sm uppercase tracking-wider px-4 py-1.5 rounded-sm shadow-[0_0_15px_rgba(220,20,60,0.5)]">
            {division.game}
          </span>
        </div>

        {/* Deskripsi */}
        <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
          {division.description}
        </p>
      </div>

      {/* Border Animation on Hover */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-nsq-gold/50 rounded-lg transition-all duration-500 pointer-events-none"></div>
    </div>
  );
};

export default DivisionCard;
