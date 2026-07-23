import { MapPin, Mail, User, Facebook, Twitter, Instagram, Linkedin, Search, PhoneCall, Plane } from 'lucide-react';

export function Header() {
  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-blue-900 text-white py-2 px-4 md:px-8 text-sm flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <MapPin size={16} className="text-orange-500" />
            <span>20 Ocean Avenue, Australia</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail size={16} className="text-orange-500" />
            <span>contact@example.com</span>
          </div>
        </div>
        <div className="flex items-center space-x-6 mt-2 md:mt-0">
          <div className="flex items-center space-x-2 cursor-pointer hover:text-orange-500 transition">
            <User size={16} />
            <span>Sign In - Register</span>
          </div>
          <div className="flex items-center space-x-4">
            <Facebook size={16} className="cursor-pointer hover:text-orange-500 transition" />
            <Twitter size={16} className="cursor-pointer hover:text-orange-500 transition" />
            <Instagram size={16} className="cursor-pointer hover:text-orange-500 transition" />
            <Linkedin size={16} className="cursor-pointer hover:text-orange-500 transition" />
          </div>
        </div>
      </div>
      
      {/* Main Nav */}
      <div className="bg-white py-4 px-4 md:px-8 flex justify-between items-center shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 text-white p-2 rounded-full">
            <Plane size={24} />
          </div>
          <span className="text-2xl font-bold text-blue-900">Traviou</span>
        </div>
        
        <nav className="hidden lg:flex items-center space-x-8 font-medium text-gray-700">
          <a href="#" className="text-orange-500">Home</a>
          <a href="#" className="hover:text-orange-500 transition">Tours</a>
          <a href="#" className="hover:text-orange-500 transition">Destination</a>
          <a href="#" className="hover:text-orange-500 transition">Activities</a>
          <a href="#" className="hover:text-orange-500 transition">Pages</a>
          <a href="#" className="hover:text-orange-500 transition">News</a>
          <a href="#" className="hover:text-orange-500 transition">Contact</a>
        </nav>
        
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex items-center space-x-3">
            <div className="bg-orange-100 p-2 rounded-full text-orange-500">
              <PhoneCall size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500">Call Anytime</p>
              <p className="font-bold text-blue-900">(89) 868 588</p>
            </div>
          </div>
          <Search size={20} className="text-gray-600 cursor-pointer hover:text-orange-500" />
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium transition">
            Start Booking
          </button>
        </div>
      </div>
    </header>
  );
}
