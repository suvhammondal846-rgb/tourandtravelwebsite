import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0b1c3c] text-gray-300 pt-20 pb-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-gray-800 pb-12 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-blue-600 text-white p-1 rounded-full">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6L2.5 8l6.4 3.2L5 15H2l-1 1 4 4 1-1v-3l3.8-3.9 3.2 6.4 1.2-1.2c.4-.2.7-.6.6-1.1Z"/></svg>
            </div>
            <h3 className="text-2xl font-bold text-white">Traviou</h3>
          </div>
          <p className="mb-6 text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center hover:bg-orange-500 text-white transition"><Facebook size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center hover:bg-orange-500 text-white transition"><Twitter size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center hover:bg-orange-500 text-white transition"><Instagram size={18} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center hover:bg-orange-500 text-white transition"><Linkedin size={18} /></a>
          </div>
        </div>
        
        <div>
          <h4 className="text-xl font-bold text-white mb-6">Quick Links</h4>
          <ul className="space-y-3">
            <li><a href="#" className="hover:text-orange-500 transition flex items-center gap-2"><span className="w-1 h-1 bg-orange-500 rounded-full"></span> About Us</a></li>
            <li><a href="#" className="hover:text-orange-500 transition flex items-center gap-2"><span className="w-1 h-1 bg-orange-500 rounded-full"></span> Destinations</a></li>
            <li><a href="#" className="hover:text-orange-500 transition flex items-center gap-2"><span className="w-1 h-1 bg-orange-500 rounded-full"></span> Tour Packages</a></li>
            <li><a href="#" className="hover:text-orange-500 transition flex items-center gap-2"><span className="w-1 h-1 bg-orange-500 rounded-full"></span> Our Blogs</a></li>
            <li><a href="#" className="hover:text-orange-500 transition flex items-center gap-2"><span className="w-1 h-1 bg-orange-500 rounded-full"></span> Contact Us</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-xl font-bold text-white mb-6">Contact Info</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin size={20} className="text-orange-500 shrink-0 mt-1" />
              <span>20 Ocean Avenue, Sydney, Australia</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={20} className="text-orange-500 shrink-0" />
              <span>+61 (89) 868 588</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={20} className="text-orange-500 shrink-0" />
              <span>contact@example.com</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-xl font-bold text-white mb-6">Newsletter</h4>
          <p className="mb-4 text-gray-400">Subscribe our newsletter to get latest updates.</p>
          <div className="relative mt-4">
            <input type="email" placeholder="Email Address" className="w-full bg-blue-900/30 border border-gray-700 rounded-full py-3 pl-6 pr-14 text-white focus:outline-none focus:ring-2 focus:ring-orange-500" />
            <button className="absolute right-1 top-1 bottom-1 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Traviou. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
          <a href="#" className="hover:text-white transition">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
