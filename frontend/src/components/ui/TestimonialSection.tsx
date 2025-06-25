import React from "react";
import { Heart } from "lucide-react";

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  age: number;
  avatar: string;
}

interface TestimonialSectionProps {
  testimonials?: Testimonial[];
  onReadSuccessStories?: () => void;
}

const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "Triksha detected an irregular heart pattern two weeks before I experienced any symptoms. My doctor confirmed it was early signs of atrial fibrillation.",
    name: "Priya Sharma",
    title: "Technology Consultant",
    age: 42,
    avatar: "/api/placeholder/40/40",
  },
  {
    id: "2",
    quote:
      "The early warning system helped me catch a potentially serious condition before it became critical. I'm grateful for the peace of mind it provides.",
    name: "Rajesh Kumar",
    title: "Business Owner",
    age: 38,
    avatar: "/api/placeholder/40/40",
  },
  {
    id: "3",
    quote:
      "Thanks to continuous monitoring, I was able to adjust my lifestyle and prevent what could have been a major health event.",
    name: "Anita Desai",
    title: "Software Engineer",
    age: 35,
    avatar: "/api/placeholder/40/40",
  },
];

const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  testimonials = defaultTestimonials,
  onReadSuccessStories,
}) => {
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  // const prevTestimonial = () => {
  //   setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  // };

  React.useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000); // Auto-rotate every 5 seconds
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const currentTestimonialData = testimonials[currentTestimonial];

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-7xl mx-auto mt-16">
      <div className="flex flex-col lg:flex-row">
        {/* Left Panel - Blue Section */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 lg:p-10 text-white lg:w-2/5 flex flex-col justify-center">
          <div className="mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">Prevention Saved My Life</h2>
            <p className="text-blue-100 text-sm lg:text-base leading-relaxed">
              Hear from users who received early warnings that helped them prevent serious health complications.
            </p>
          </div>

          <button
            onClick={onReadSuccessStories}
            className="bg-white/20 hover:bg-white/30 border border-white/30 text-white px-6 py-3 rounded-full font-medium transition-all duration-200 self-start backdrop-blur-sm"
          >
            Read Success Stories
          </button>
        </div>

        {/* Right Panel - Testimonial */}
        <div className="p-8 lg:p-10 lg:w-3/5 flex flex-col justify-center relative">
          <div className="mb-6">
            <blockquote className="text-gray-700 text-lg leading-relaxed italic">
              "{currentTestimonialData.quote}"
            </blockquote>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
              <img
                src={currentTestimonialData.avatar}
                alt={currentTestimonialData.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to initials if image fails
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const initials = currentTestimonialData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("");
                  target.parentElement!.innerHTML = `<div class="w-full h-full bg-blue-500 flex items-center justify-center text-white font-semibold">${initials}</div>`;
                }}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900">{currentTestimonialData.name}</h4>
              <p className="text-gray-500 text-sm">
                {currentTestimonialData.title}, {currentTestimonialData.age}
              </p>
            </div>
          </div>

          {/* Navigation dots */}
          {testimonials.length > 1 && (
            <div className="flex gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentTestimonial ? "bg-blue-500 w-6" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default TestimonialSection;
