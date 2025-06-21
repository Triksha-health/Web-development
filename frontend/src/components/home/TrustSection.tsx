import { ShieldCheck, Lock, CreditCard, BadgeCheck } from 'lucide-react';

function TrustSection() {
  const testimonials = [
    {
      quote:
        'After a lifetime of trying to manage my diabetes, Triksha has changed everything. The early warnings have helped me avoid three serious health episodes in just six months.',
      name: 'Rajiv K.',
      title: 'Early Tester, Age 58',
      image:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      quote:
        'As someone with a family history of heart disease, Triksha gives me peace of mind. The predictive alerts helped me identify a potential issue months before my regular checkup would have caught it.',
      name: 'Anika S.',
      title: 'Beta Participant, Age 42',
      image:
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      quote:
        'We deployed Triksha in our corporate wellness program and saw a 37% reduction in preventable health incidents and a significant boost in employee wellbeing scores.',
      name: 'Vikram M.',
      title: 'HR Director, Fortune 500 Company',
      image:
        'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ];

  return (
    <section className="section bg-gray-50">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="p-6 rounded-xl bg-white shadow-md flex flex-col items-center text-center">
            <ShieldCheck className="w-12 h-12 text-primary-500 mb-4" />
            <h3 className="font-bold mb-2">Medical-Grade Privacy</h3>
            <p className="text-sm text-gray-600">
              HIPAA-compliant data protection with end-to-end encryption
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white shadow-md flex flex-col items-center text-center">
            <Lock className="w-12 h-12 text-primary-500 mb-4" />
            <h3 className="font-bold mb-2">Data Ownership</h3>
            <p className="text-sm text-gray-600">
              You control your health data and who can access it
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white shadow-md flex flex-col items-center text-center">
            <CreditCard className="w-12 h-12 text-primary-500 mb-4" />
            <h3 className="font-bold mb-2">Secure Checkout</h3>
            <p className="text-sm text-gray-600">
              PCI DSS compliant payment processing
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white shadow-md flex flex-col items-center text-center">
            <BadgeCheck className="w-12 h-12 text-primary-500 mb-4" />
            <h3 className="font-bold mb-2">Quality Assurance</h3>
            <p className="text-sm text-gray-600">
              ISO 13485 certified medical device manufacturing
            </p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-10">What Early Users Are Saying</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl">
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="inline-block w-5 h-5 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medical advisors */}
        <div className="text-center">
          <div className="inline-block px-4 py-1 bg-primary-50 text-primary-600 rounded-full text-sm font-medium mb-4">
            Expert Verified
          </div>
          <h2 className="text-2xl font-bold mb-4">Backed by Medical Professionals</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Triksha's technology has been developed in collaboration with leading doctors and researchers from
            prestigious institutions across India.
          </p>

          <div className="flex flex-wrap justify-center gap-8">
            {['AIIMS', 'Apollo Hospitals', 'Medanta', 'Narayana Health', 'Fortis'].map((hospital, i) => (
              <div key={i} className="text-gray-400 text-lg font-semibold">
                {hospital}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustSection;
