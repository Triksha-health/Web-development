import React from "react";
import { Heart, AlertTriangle, Shield } from "lucide-react";

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

const defaultCards: FeatureCard[] = [
  {
    id: "cardiac",
    icon: <Heart className="w-6 h-6 text-blue-500" />,
    title: "Cardiac Issue Detection",
    description: "Early identification of irregular heartbeats and potential cardiovascular concerns.",
    image: "/api/placeholder/300/200",
  },
  {
    id: "emergency",
    icon: <AlertTriangle className="w-6 h-6 text-blue-500" />,
    title: "Emergency Alerts to Family",
    description: "Automatic notifications to loved ones during critical health events.",
    image: "/api/placeholder/300/200",
  },
  {
    id: "insights",
    icon: <Shield className="w-6 h-6 text-blue-500" />,
    title: "Long-term Health Insights",
    description: "Preventive analysis to detect patterns indicating potential chronic disease risk.",
    image: "/api/placeholder/300/200",
  },
];

const FeatureCard: React.FC<{ card: FeatureCard; onLearnMore?: (cardId: string) => void }> = ({
  card,
  onLearnMore,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1 ">
      {/* Image */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback gradient background if image fails to load
            e.currentTarget.style.display = "none";
            e.currentTarget.parentElement!.style.background = "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)";
          }}
        />
        {/* Fallback content for demo */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
          <div className="text-blue-300 opacity-50">{card.icon}</div>
        </div>
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
          className="text-teal-500 hover:text-teal-600 font-medium text-sm transition-colors duration-200"
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
