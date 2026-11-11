const PlayerCard = ({ player }) => {
  return (
    <div className="bg-nsq-dark border border-nsq-red/20 rounded-lg overflow-hidden hover:border-nsq-gold transition-all duration-300 group hover:shadow-[0_0_20px_rgba(220,20,60,0.3)]">
      {/* Foto Player */}
      <div className="h-64 overflow-hidden bg-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-nsq-black via-transparent to-transparent z-10"></div>
        <img
          src={player.image}
          alt={player.ign}
          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
        />
        {/* Badge Divisi di atas foto */}
        <div className="absolute top-3 right-3 z-20 bg-nsq-red/90 text-white text-xs font-heading font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
          {player.division}
        </div>
      </div>

      {/* Info Player */}
      <div className="p-5 text-center relative z-20 -mt-8">
        <h3 className="font-heading text-3xl font-bold text-white mb-1 uppercase tracking-wide drop-shadow-md">
          "{player.ign}"
        </h3>
        {player.realName && (
          <p className="text-gray-400 text-xs mb-3">{player.realName}</p>
        )}

        <div className="inline-block bg-nsq-black border border-nsq-gold/50 rounded-full px-4 py-1.5">
          <span className="text-nsq-gold font-heading font-bold text-sm uppercase tracking-wider">
            {player.role}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
