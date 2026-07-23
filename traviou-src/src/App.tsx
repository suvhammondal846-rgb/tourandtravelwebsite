/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Destinations } from './components/Destinations';
import { AboutUs } from './components/AboutUs';
import { FavoriteTours } from './components/FavoriteTours';
import { TourTypes, Testimonials, CallToAction, Gallery, WhyChooseUs, Blog } from './components/OtherSections';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <Header />
      <main>
        <Hero />
        <Destinations />
        <AboutUs />
        <FavoriteTours />
        <TourTypes />
        <Testimonials />
        <CallToAction />
        <Gallery />
        <WhyChooseUs />
        <Blog />
      </main>
      <Footer />
    </div>
  );
}
