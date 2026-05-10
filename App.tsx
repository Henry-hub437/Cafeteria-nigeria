/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import Reviews from './components/Reviews';
import Faq from './components/Faq';
import Cta from './components/Cta';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans antialiased text-gray-900 selection:bg-brand-orange/30">
      <Navbar />
      <main>
        <Hero />
        <WhyUs />
        <Services />
        <Reviews />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
