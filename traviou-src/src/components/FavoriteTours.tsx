import { Star, Clock, MapPin } from 'lucide-react';

export function FavoriteTours() {
  const tours = [
    {
      title: 'Beautiful Taj Mahal With Golden Triangle',
      location: 'Agra, India',
      price: '$450',
      duration: '4 Days - 3 Nights',
      rating: 4.8,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=600',
      badge: 'SALE'
    },
    {
      title: 'Sydney Opera House & Harbour Bridge',
      location: 'Sydney, Australia',
      price: '$520',
      duration: '5 Days - 4 Nights',
      rating: 4.9,
      reviews: 86,
      image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=600',
      badge: 'POPULAR'
    },
    {
      title: 'Enjoy The Beautiful Maldives Beach',
      location: 'Maldives',
      price: '$890',
      duration: '6 Days - 5 Nights',
      rating: 5.0,
      reviews: 210,
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=600',
      badge: 'SALE'
    }
  ];

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-blue-600 font-semibold mb-2 inline-flex items-center uppercase tracking-wider text-sm">
          <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 text-xs">+</span> Featured Tours
        </p>
        <h2 className="text-4xl font-bold text-blue-900 mb-4">Most Favorite Tour Place</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tours.map((tour, idx) => (
          <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition group border border-gray-100">
            <div className="relative h-64 overflow-hidden">
              <img src={tour.image} alt={tour.title} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
              <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                {tour.badge}
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-1 text-orange-500 text-sm">
                  <Star size={16} fill="currentColor" />
                  <span className="font-bold">{tour.rating}</span>
                  <span className="text-gray-400">({tour.reviews})</span>
                </div>
                <div className="text-xl font-bold text-blue-600">{tour.price}</div>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3 line-clamp-2 hover:text-orange-500 cursor-pointer transition">{tour.title}</h3>
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                <MapPin size={16} /> {tour.location}
              </div>
              <div className="border-t border-gray-100 pt-4 flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 text-gray-600 font-medium">
                  <Clock size={16} className="text-blue-600" /> {tour.duration}
                </div>
                <button className="text-orange-500 font-semibold hover:text-orange-600">
                  Book Now →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
