const DivisionCard = ({ division }) => {
  return (
    <div className="bg-nsq-dark border border-nsq-red/20 rounded-lg p-8 hover:border-nsq-gold transition-all duration-300 group hover:shadow-[0_0_20px_rgba(220,20,60,0.3)]">
      {/* Icon Game */}
      <div className="w-16 h-16 bg-nsq-red/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-nsq-red/20 transition-all">
        <span className="text-3xl">🎮</span>
      </div>

      {/* Info */}
      <h3 className="font-heading text-2xl font-bold text-white mb-2 uppercase">
        {division.name}
      </h3>
      <p className="text-gray-400 text-sm mb-4 leading-relaxed">
        {division.description}
      </p>

      {/* Stats */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div>
          <div className="text-nsq-gold font-heading font-bold text-lg">
            {division.players}
          </div>
          <div className="text-xs text-gray-500 uppercase">Players</div>
        </div>
        <div className="text-right">
          <div className="text-nsq-gold font-heading font-bold text-xs uppercase">
            {division.shortName}
          </div>
          <div className="text-xs text-gray-500">Active Division</div>
        </div>
      </div>
    </div>
  );
};

export default DivisionCard;
