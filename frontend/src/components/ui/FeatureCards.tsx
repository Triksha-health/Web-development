import React from "react";
// import { Heart, AlertTriangle, Shield } from "lucide-react";

interface FeatureCard {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
  onLearnMore?: () => void;
}

interface FeatureCardsProps {
  cards?: FeatureCard[];
  onLearnMore?: (cardId: string) => void;
}

const defaultCards: FeatureCard[] = [];

const FeatureCard: React.FC<{ card: FeatureCard; onLearnMore?: (cardId: string) => void }> = ({
  card,
  onLearnMore,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
      {/* Image */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover scale-105 transition-transform duration-1000 ease-out group-hover:scale-100"
          onError={(e) => {
            // Fallback gradient background if image fails to load
            e.currentTarget.style.display = "none";
            e.currentTarget.parentElement!.style.background = "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)";
          }}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-3">
          <div className="flex-shrink-0 mt-0.5 mb-[1.5rem]">{card.icon}</div>
          <h3 className="text-lg font-bold text-gray-900 leading-tight">{card.title}</h3>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-4">{card.description}</p>

        <button
          onClick={() => onLearnMore?.(card.id)}
          className="text-[#3691ff] hover:text-[#3690ff] font-medium text-sm transition-colors duration-200"
        >
          Learn more
        </button>
      </div>
    </div>
  );
};

const FeatureCards: React.FC<FeatureCardsProps> = ({ cards = defaultCards, onLearnMore }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => (
        <FeatureCard key={card.id} card={card} onLearnMore={onLearnMore} />
      ))}
    </div>
  );
};
export default FeatureCards;
