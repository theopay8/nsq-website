const ProgramCard = ({ program }) => {
  return (
    <div className="bg-nsq-dark border border-nsq-red/20 rounded-lg p-8 hover:border-nsq-gold transition-all duration-300 group hover:shadow-[0_0_20px_rgba(220,20,60,0.3)]">
      {/* Icon */}
      <div className="text-5xl mb-6">{program.icon}</div>

      {/* Info */}
      <h3 className="font-heading text-2xl font-bold text-white mb-3 uppercase">
        {program.title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed">
        {program.description}
      </p>
    </div>
  );
};

export default ProgramCard;
