import { ShieldCheck, Users, Trophy, CheckCircle } from 'lucide-react';

export function AboutUs() {
  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        {/* Images */}
        <div className="lg:w-1/2 relative">
          <div className="flex gap-4">
            <div className="w-1/2 mt-12">
              <img src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&q=80&w=400" alt="Couple traveling" className="w-full h-80 object-cover rounded-3xl rounded-tl-[100px]" />
            </div>
            <div className="w-1/2">
              <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=400" alt="Paris" className="w-full h-80 object-cover rounded-3xl rounded-br-[100px]" />
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-full shadow-xl">
            <div className="bg-orange-500 w-24 h-24 rounded-full flex flex-col items-center justify-center text-white text-center border-4 border-white shadow-inner">
              <span className="text-2xl font-bold">50%</span>
              <span className="text-xs uppercase font-semibold">Discount</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:w-1/2">
          <p className="text-blue-600 font-semibold mb-2 flex items-center uppercase tracking-wider text-sm">
            <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 text-xs">+</span> Get To Know Us
          </p>
          <h2 className="text-4xl font-bold text-blue-900 mb-6">Experience the World with Our Company</h2>
          <p className="text-gray-500 mb-8">
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                <Users size={24} />
              </div>
              <div>
                <h4 className="font-bold text-blue-900 mb-2">Friendly Guide</h4>
                <p className="text-gray-500 text-sm">There are many variations of passages of lorem ipsum.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-blue-900 mb-2">Safety Travel</h4>
                <p className="text-gray-500 text-sm">There are many variations of passages of lorem ipsum.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-orange-50 p-6 rounded-2xl border border-orange-100">
            <div className="flex items-center gap-4 mb-4 sm:mb-0">
              <div className="text-orange-500 bg-white p-3 rounded-full shadow-sm">
                <Trophy size={32} />
              </div>
              <div>
                <h4 className="font-bold text-blue-900 text-lg">Award Winning</h4>
                <p className="text-gray-500 text-sm">Agency</p>
              </div>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle size={16} className="text-blue-600" /> Many variations of passages
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle size={16} className="text-blue-600" /> Expert many variations
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
