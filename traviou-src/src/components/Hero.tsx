import { MapPin, Settings, Calendar, DollarSign } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative pt-16 pb-32 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 pr-8 z-10">
          <p className="text-orange-500 font-medium mb-4 italic text-xl">Amazing places to relax</p>
          <h1 className="text-5xl md:text-6xl font-bold text-blue-900 leading-tight mb-6">
            Beginning of <br/> your Travel <br/> Journey
          </h1>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-medium transition mt-4">
            Discover More
          </button>
        </div>
        <div className="lg:w-1/2 mt-12 lg:mt-0 relative">
          <img 
            src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800" 
            alt="Traveler" 
            className="w-full h-auto rounded-3xl object-cover"
          />
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-11/12 max-w-5xl bg-white rounded-full shadow-xl flex flex-col md:flex-row items-center justify-between p-4 md:px-8 border border-gray-100 gap-4 md:gap-0">
        <div className="flex flex-1 items-center space-x-4 md:border-r border-gray-200 md:pr-4 w-full md:w-auto">
          <MapPin className="text-orange-500" />
          <div>
            <p className="text-xs text-gray-400 font-medium">Location</p>
            <p className="font-semibold text-blue-900">Where to Next?</p>
          </div>
        </div>
        
        <div className="flex flex-1 items-center space-x-4 md:border-r border-gray-200 md:px-4 w-full md:w-auto">
          <Settings className="text-orange-500" />
          <div>
            <p className="text-xs text-gray-400 font-medium">Type</p>
            <p className="font-semibold text-blue-900">Trip Type</p>
          </div>
        </div>
        
        <div className="flex flex-1 items-center space-x-4 md:border-r border-gray-200 md:px-4 w-full md:w-auto">
          <Calendar className="text-orange-500" />
          <div>
            <p className="text-xs text-gray-400 font-medium">Duration</p>
            <p className="font-semibold text-blue-900">0 Days - 3 Days</p>
          </div>
        </div>
        
        <div className="flex flex-1 items-center space-x-4 md:px-4 w-full md:w-auto">
          <DollarSign className="text-orange-500" />
          <div>
            <p className="text-xs text-gray-400 font-medium">Price</p>
            <p className="font-semibold text-blue-900">$99 - $359</p>
          </div>
        </div>
        
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-medium transition w-full md:w-auto mt-4 md:mt-0">
          <span>Search</span>
        </button>
      </div>
    </section>
  );
}
