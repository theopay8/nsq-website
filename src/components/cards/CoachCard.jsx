const CoachCard = ({ coach }) => {
  return (
    <div className="bg-nsq-dark border border-nsq-red/20 rounded-lg overflow-hidden hover:border-nsq-gold transition-all duration-300 group shadow-lg hover:shadow-[0_0_20px_rgba(220,20,60,0.3)]">
      {/* Bagian Foto */}
      <div className="h-72 overflow-hidden bg-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-nsq-black via-transparent to-transparent z-10"></div>
        <img
          src={coach.image}
          alt={coach.name}
          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      {/* Bagian Info */}
      <div className="p-6 text-center relative z-20 -mt-12">
        <div className="bg-nsq-black border border-nsq-gold/50 rounded-full px-4 py-1 inline-block mb-3">
          <span className="text-nsq-gold font-heading font-bold text-xs uppercase tracking-widest">
            {coach.role}
          </span>
        </div>
        <h3 className="font-heading text-3xl font-bold text-white mb-1 uppercase tracking-wide">
          {coach.name}
        </h3>
        <p className="text-gray-400 text-sm flex items-center justify-center gap-2 mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-nsq-red"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {coach.location}
        </p>
      </div>
    </div>
  );
};

export default CoachCard;
