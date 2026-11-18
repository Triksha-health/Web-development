import React from "react";
import { ArrowUpRight } from "lucide-react";
import TiltCard from "./TiltCard";

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
    <TiltCard className="rounded-3xl">
      <div className="bg-canvas-paper rounded-3xl ring-1 ring-[rgba(22,25,29,0.10)] shadow-soft hover:shadow-soft-lg overflow-hidden transition-shadow duration-300">
        <div className="relative h-48 overflow-hidden bg-canvas-soft">
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700 ease-out"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.parentElement!.style.background =
                "linear-gradient(135deg, #ECE2CC 0%, #F3ECDB 100%)";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-canvas-paper/10 via-transparent to-transparent" />
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-canvas-soft ring-1 ring-[rgba(22,25,29,0.08)] flex items-center justify-center">
              {card.icon}
            </div>
            <button
              onClick={() => onLearnMore?.(card.id)}
              className="w-9 h-9 rounded-full bg-canvas-soft ring-1 ring-[rgba(22,25,29,0.10)] flex items-center justify-center text-ink-700 hover:bg-accent-500 hover:text-white hover:ring-accent-500 transition-all"
              aria-label="Learn more"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
          <h3 className="text-lg font-semibold text-ink-900 tracking-tight leading-snug">
            {card.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(22,25,29,0.62)" }}>
            {card.description}
          </p>
        </div>
      </div>
    </TiltCard>
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
