const NewsCard = ({ item }) => {
  return (
    <div className="bg-nsq-dark border border-nsq-red/20 rounded-lg overflow-hidden hover:border-nsq-gold transition-all duration-300 group hover:shadow-[0_0_20px_rgba(220,20,60,0.3)]">
      {/* Gambar */}
      <div className="h-48 overflow-hidden bg-gray-900 relative">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 bg-nsq-red text-white font-heading font-bold text-xs uppercase px-3 py-1 rounded-sm">
          {item.category}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-nsq-dark via-transparent to-transparent"></div>
      </div>

      {/* Info */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-gray-500 text-xs">📅 {item.date}</span>
        </div>

        <h3 className="font-heading text-xl font-bold text-white mb-3 uppercase leading-tight group-hover:text-nsq-gold transition-colors">
          {item.title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {item.description}
        </p>

        <button className="text-nsq-gold font-heading font-bold text-sm uppercase tracking-wider hover:text-white transition-colors flex items-center gap-2">
          Read More <span>→</span>
        </button>
      </div>
    </div>
  );
};

export default NewsCard;
