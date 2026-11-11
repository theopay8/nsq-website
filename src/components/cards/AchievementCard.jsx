const AchievementCard = ({ item }) => {
  return (
    <div className="bg-nsq-dark border-2 border-nsq-gold/30 rounded-lg overflow-hidden hover:border-nsq-gold transition-all duration-300 group shadow-lg hover:shadow-[0_0_30px_rgba(255,215,0,0.3)]">
      {/* Badge Juara di Atas */}
      <div className="relative">
        <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-nsq-gold to-yellow-500 text-nsq-black font-heading font-bold px-4 py-1.5 rounded-full text-sm shadow-lg">
          {item.rank}
        </div>
        <div className="h-48 overflow-hidden bg-gray-900">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-nsq-dark via-transparent to-transparent"></div>
        </div>
      </div>

      {/* Info */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-nsq-red/20 text-nsq-gold text-xs font-heading font-bold uppercase px-3 py-1 rounded-full border border-nsq-gold/30">
            {item.category}
          </span>
          <span className="text-gray-500 text-xs">📅 {item.date}</span>
        </div>

        <h3 className="font-heading text-xl font-bold text-white mb-3 uppercase leading-tight group-hover:text-nsq-gold transition-colors">
          {item.title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed">
          {item.description}
        </p>

        {/* Trophy Icon */}
        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-2xl">🏆</span>
          <span className="text-nsq-gold font-heading font-bold text-xs uppercase tracking-wider">
            Achievement Unlocked
          </span>
        </div>
      </div>
    </div>
  );
};

export default AchievementCard;
