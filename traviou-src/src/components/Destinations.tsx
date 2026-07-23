export function Destinations() {
  const destinations = [
    { name: 'Italy', tours: '15+ tours', img: 'https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&q=80&w=400' },
    { name: 'France', tours: '12+ tours', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=400' },
    { name: 'Maldives', tours: '20+ tours', img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=400' },
    { name: 'Greece', tours: '10+ tours', img: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=400' },
  ];

  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto mt-16 md:mt-8">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div className="max-w-md">
          <p className="text-blue-600 font-semibold mb-2 flex items-center uppercase tracking-wider text-sm">
            <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 text-xs">+</span> Destination List
          </p>
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Explore the Beautiful Places Around World</h2>
          <p className="text-gray-500 mb-6">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-medium transition">
            Discover More
          </button>
        </div>
        
        <div className="flex space-x-6 mt-12 md:mt-0 overflow-x-auto pb-4 w-full md:w-auto">
          {destinations.map((dest, i) => (
            <div key={i} className="flex flex-col items-center min-w-[200px]">
              <div className="w-48 h-64 rounded-full overflow-hidden mb-6 relative group cursor-pointer shadow-lg">
                <img src={dest.img} alt={dest.name} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black bg-opacity-20 transition group-hover:bg-opacity-10"></div>
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                  {dest.tours}
                </div>
              </div>
              <h3 className="text-xl font-bold text-blue-900">{dest.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
