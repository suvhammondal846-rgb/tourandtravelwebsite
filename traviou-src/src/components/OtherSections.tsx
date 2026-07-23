import { Anchor, Camera, Mountain, Map, Plane, Navigation, Star, ArrowRight } from 'lucide-react';

export function TourTypes() {
  const types = [
    { icon: <Anchor size={32} />, name: 'Cruises' },
    { icon: <Mountain size={32} />, name: 'Hiking' },
    { icon: <Camera size={32} />, name: 'Wildlife' },
    { icon: <Navigation size={32} />, name: 'Boat Tour' },
    { icon: <Map size={32} />, name: 'City Tour' },
    { icon: <Plane size={32} />, name: 'Flights' },
  ];

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto bg-gray-50/50 my-10 rounded-[3rem]">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-blue-900 mb-2">Choose Our Tour Types</h2>
        <p className="text-gray-500">& Enjoy Now</p>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {types.map((t, i) => (
          <div key={i} className="flex flex-col items-center justify-center bg-white border border-gray-100 hover:border-blue-200 hover:shadow-lg rounded-2xl w-32 h-32 cursor-pointer transition group">
            <div className="text-blue-600 group-hover:text-orange-500 transition mb-3">
              {t.icon}
            </div>
            <span className="font-semibold text-gray-700">{t.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto my-12">
      <div className="text-center mb-16">
        <p className="text-blue-600 font-semibold mb-2 inline-flex items-center uppercase tracking-wider text-sm">
          <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 text-xs">+</span> Testimonials
        </p>
        <h2 className="text-4xl font-bold text-blue-900">See what they are talking about?</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pt-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.05)] relative pt-12 border border-gray-50">
            <div className="absolute -top-8 left-8">
              <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="w-16 h-16 rounded-full border-4 border-white shadow-md" />
            </div>
            <div className="flex text-orange-500 mb-4">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
            </div>
            <p className="text-gray-600 italic mb-6">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."</p>
            <div>
              <h4 className="font-bold text-blue-900">John Doe</h4>
              <p className="text-sm text-gray-500">Traveler</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CallToAction() {
  return (
    <section className="bg-blue-600 py-16 px-4 md:px-8 mt-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10 text-white">
        <div className="mb-8 md:mb-0">
          <h2 className="text-4xl font-bold mb-4">Let's Make Your Travel<br/>Dream Come True</h2>
          <p className="text-blue-100 max-w-md mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-medium transition">
            Contact Us Now
          </button>
        </div>
        <div className="flex flex-wrap gap-8 md:gap-12 justify-center">
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-400 mb-2">10.5K+</div>
            <div className="text-blue-100 text-sm uppercase tracking-wider">Satisfied Clients</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-400 mb-2">8.5K+</div>
            <div className="text-blue-100 text-sm uppercase tracking-wider">Success Tours</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-400 mb-2">4.5K+</div>
            <div className="text-blue-100 text-sm uppercase tracking-wider">Pro Guides</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Gallery() {
  const images = [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1504150558240-0b4fd8946624?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=300',
    'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=300',
  ];
  return (
    <section className="py-16 w-full overflow-hidden bg-white">
      <div className="flex justify-center gap-4 px-4 overflow-x-auto pb-4 max-w-[1600px] mx-auto">
        {images.map((img, i) => (
          <img key={i} src={img} alt="Gallery" className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover shadow-md shrink-0 border-4 border-white hover:scale-105 transition cursor-pointer" />
        ))}
      </div>
    </section>
  );
}

export function WhyChooseUs() {
  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-16 items-center">
        <div className="md:w-1/2">
          <p className="text-blue-600 font-semibold mb-2 inline-flex items-center uppercase tracking-wider text-sm">
            <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 text-xs">+</span> Core Features
          </p>
          <h2 className="text-4xl font-bold text-blue-900 mb-6">Why You Should Choose Our Company</h2>
          <div className="space-y-6">
            {[
              { title: 'Best Price Guarantee', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.' },
              { title: 'Easy Booking', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.' },
              { title: 'Pro Tour Guides', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.' }
            ].map((f, i) => (
              <div key={i} className="flex gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
                <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center shrink-0">
                  <Star size={20} fill="currentColor" />
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 mb-1">{f.title}</h4>
                  <p className="text-gray-500 text-sm">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="md:w-1/2 relative">
          <div className="rounded-full w-full aspect-square overflow-hidden border-8 border-white shadow-2xl">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" alt="Why Choose Us" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-3xl shadow-xl flex items-center gap-4">
             <div className="bg-orange-500 text-white w-12 h-12 rounded-full flex items-center justify-center">
               <Star fill="currentColor" />
             </div>
             <div>
               <p className="text-sm font-bold text-blue-900">4.9/5 Rating</p>
               <p className="text-xs text-gray-500">Based on 10k reviews</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Blog() {
  const posts = [
    { title: '10 Best Places to Visit in Europe', date: 'Oct 12, 2023', img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=400' },
    { title: 'How to Travel on a Budget in 2024', date: 'Oct 15, 2023', img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=400' },
    { title: 'Tips for Solo Travelers', date: 'Oct 18, 2023', img: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=400' }
  ];
  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto my-12">
      <div className="text-center mb-16">
        <p className="text-blue-600 font-semibold mb-2 inline-flex items-center uppercase tracking-wider text-sm">
          <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 text-xs">+</span> Our Blog
        </p>
        <h2 className="text-4xl font-bold text-blue-900">Latest News & Articles</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((p, i) => (
          <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition border border-gray-100">
            <img src={p.img} alt={p.title} className="w-full h-56 object-cover" />
            <div className="p-6">
              <div className="text-orange-500 text-sm font-semibold mb-3">{p.date}</div>
              <h3 className="text-xl font-bold text-blue-900 mb-4 hover:text-orange-500 cursor-pointer">{p.title}</h3>
              <a href="#" className="flex items-center font-bold text-blue-600 hover:text-blue-800 transition">
                Read More <ArrowRight size={16} className="ml-2" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
