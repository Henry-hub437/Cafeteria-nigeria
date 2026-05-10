
import React, { useState, useEffect, useRef } from 'react';
import { 
  Utensils, 
  Clock, 
  MapPin, 
  Phone, 
  Star, 
  ChevronDown, 
  Menu, 
  X, 
  Coffee, 
  Heart, 
  CheckCircle2, 
  Instagram, 
  Facebook, 
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// 1. FORMSPREE RESERVATION BACKEND
// ==========================================
const FORMSPREE_URL = "https://formspree.io/f/xqenyjdy";

// ==========================================
// 2. STATIC DATA
// ==========================================
const MENU_ITEMS = [
  {
    title: "Signature Jollof & Grilled Chicken",
    description: "Rich, smoky party-style Jollof rice served with perfectly seasoned grilled chicken and sweet plantains.",
    price: "₦7,500",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Gourmet Breakfast Platter",
    description: "Fluffy scrambled eggs, artisanal pastries, fresh avocado, and your choice of house-brewed coffee.",
    price: "₦9,000",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Freshly Baked Croissant Sandwich",
    description: "Buttery, flaky house-baked French croissant filled with creamy scrambled eggs, cheese, and fresh herbs.",
    price: "₦5,500",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600"
  }
];

const REVIEWS = [
  {
    name: "Tola A.",
    role: "Regular Guest",
    content: "The absolute best lunch spot in the city. The Jollof is perfectly smoky, and the service is incredibly fast!",
    rating: 5
  },
  {
    name: "Obinna K.",
    role: "Food Enthusiast",
    content: "Amazing pastries and the coffee is world-class. It’s my go-to remote workspace during the week.",
    rating: 5
  }
];

const FAQS = [
  {
    question: "What are your opening hours?",
    answer: "We are open daily from 7:30 AM to 9:30 PM, serving fresh breakfast, lunch, and dinner options."
  },
  {
    question: "Do you offer delivery or pickup?",
    answer: "Yes! You can order directly through our website for swift pickup, or find us on your favorite local delivery apps."
  },
  {
    question: "Can I host a private event or corporate meeting here?",
    answer: "Absolutely. We offer space reservations and custom catering packages for both corporate events and private gatherings."
  }
];

// ==========================================
// 3. MAIN APP
// ==========================================
export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // Reservation States
  const [name, setName] = useState('');
  const [guests, setGuests] = useState('2 People');
  const [time, setTime] = useState('');
  const [isReserved, setIsReserved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    setIsOpen(false);
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleReserve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !time) {
      alert("Please fill in your name and preferred time!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ name, guests, time }),
      });

      if (response.ok) {
        setIsReserved(true);
      } else {
        alert("Submission failed. Please check your Formspree link.");
      }
    } catch (error) {
      alert("Error sending reservation. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50/30 font-sans text-stone-800 selection:bg-orange-200">
      
      {/* NAVIGATION */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm border-b border-orange-100' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="font-serif text-2xl tracking-tight text-orange-600 flex items-center gap-2 font-bold">
            <Utensils className="w-6 h-6 text-orange-500" />
            <span>Cafeteria Nigeria</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#menu" className="hover:text-orange-600 transition-colors">Our Menu</a>
            <a href="#about" className="hover:text-orange-600 transition-colors">Our Story</a>
            <a href="#reviews" className="hover:text-orange-600 transition-colors">Reviews</a>
            <button 
              onClick={scrollToContact}
              className="px-6 py-2.5 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-all shadow-md shadow-orange-600/20"
            >
              Book a Table
            </button>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-stone-800">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 bg-white border-b border-orange-100 p-6 flex flex-col gap-4 text-center shadow-lg z-50"
            >
              <a href="#menu" onClick={() => setIsOpen(false)} className="text-lg font-medium py-2">Our Menu</a>
              <a href="#about" onClick={() => setIsOpen(false)} className="text-lg font-medium py-2">Our Story</a>
              <a href="#reviews" onClick={() => setIsOpen(false)} className="text-lg font-medium py-2">Reviews</a>
              <button 
                onClick={scrollToContact}
                className="bg-orange-600 text-white px-6 py-3 rounded-full font-medium shadow-md"
              >
                Book a Table
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO & RESERVATION */}
      <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
        {/* Background Decorative Shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-100/40 rounded-l-[100px] z-0 hidden lg:block" />
        
        <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Lagos’ Favorite Modern Café</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-stone-900 tracking-tight">
              Flavors that feel like <span className="text-orange-600">home</span>.
            </h1>
            <p className="text-lg text-stone-600 max-w-xl leading-relaxed">
              Step into a warm space designed for good food, great conversations, and local culinary masterpieces crafted fresh daily.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a href="#menu" className="px-8 py-4 bg-orange-600 text-white rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/30">
                <span>View Menu</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <div className="flex items-center gap-2 justify-center sm:justify-start text-stone-600 font-medium">
                <CheckCircle2 className="text-orange-500 w-5 h-5" />
                <span>Open Daily · 7:30 AM - 9:30 PM</span>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-5">
            <div ref={contactRef} className="bg-white p-8 rounded-3xl shadow-xl border border-orange-100">
              <h3 className="text-2xl font-bold mb-2 text-stone-900 text-center">Book Your Spot</h3>
              
              {isReserved ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-orange-500/20">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-stone-900">We've Saved Your Table!</h4>
                  <p className="text-stone-600 text-sm">
                    Thank you, <strong>{name}</strong>. We look forward to hosting <strong>{guests}</strong> at <strong>{time}</strong>.
                  </p>
                  <button 
                    onClick={() => { setIsReserved(false); setName(''); setTime(''); }}
                    className="mt-2 text-sm font-semibold text-orange-600 hover:underline"
                  >
                    Reserve another spot
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-stone-500 text-sm text-center mb-6">Skip the wait and reserve your dining space instantly.</p>
                  <form onSubmit={handleReserve} className="space-y-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-bold mb-1.5 text-stone-600 ml-1">Full Name</label>
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all" 
                        placeholder="Your Name" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-bold mb-1.5 text-stone-600 ml-1">Guests</label>
                        <select 
                          value={guests}
                          onChange={(e) => setGuests(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                        >
                          <option>1 Person</option>
                          <option>2 People</option>
                          <option>4 People</option>
                          <option>6+ People</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider font-bold mb-1.5 text-stone-600 ml-1">Time</label>
                        <input 
                          type="time" 
                          required
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-orange-500 outline-none transition-all" 
                        />
                      </div>
                    </div>
                    <button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-full py-4 bg-orange-600 text-white font-bold rounded-2xl shadow-lg shadow-orange-600/20 hover:bg-orange-700 active:scale-[0.98] transition-all disabled:opacity-50 mt-2"
                    >
                      {isLoading ? "Booking..." : "Confirm Reservation"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* MENU SECTION */}
      <section id="menu" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-orange-600 font-bold tracking-wider text-xs uppercase">Curated Specialties</span>
            <h2 className="text-4xl font-extrabold text-stone-900 tracking-tight">On The Menu</h2>
            <p className="text-stone-500">A perfect fusion of local Nigerian heritage and classic cafeteria favorites.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {MENU_ITEMS.map((item, idx) => (
              <div key={idx} className="bg-orange-50/20 rounded-3xl overflow-hidden border border-orange-100 hover:shadow-xl transition-all duration-300 group">
                <div className="h-56 overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-1 rounded-full text-orange-600 font-bold text-sm shadow-sm">
                    {item.price}
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="text-xl font-bold text-stone-900">{item.title}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 bg-orange-50/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-orange-600 font-bold tracking-wider text-xs uppercase">Guest Love</span>
            <h2 className="text-4xl font-extrabold text-stone-900">What People Are Saying</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {REVIEWS.map((rev, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-orange-100/60 relative space-y-4">
                <div className="flex text-orange-500">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-stone-600 italic leading-relaxed">"{rev.content}"</p>
                <div>
                  <h4 className="font-bold text-stone-900">{rev.name}</h4>
                  <p className="text-orange-600 text-xs font-semibold">{rev.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16 space-y-3">
            <span className="text-orange-600 font-bold tracking-wider text-xs uppercase">Common Inquiries</span>
            <h2 className="text-4xl font-extrabold text-stone-900">Have Questions?</h2>
          </div>
          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="bg-orange-50/10 rounded-2xl overflow-hidden border border-orange-100">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-orange-50/30 transition-colors"
                >
                  <span className="font-bold text-stone-900">{faq.question}</span>
                  <ChevronDown className={`text-orange-500 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-stone-600 text-sm leading-relaxed border-t border-orange-100/30 pt-3">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-stone-900 text-stone-300 pt-16 pb-8 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Utensils className="w-5 h-5 text-orange-500" />
              <span>Cafeteria Nigeria</span>
            </h3>
            <p className="text-sm text-stone-400">Bringing clean spaces, fresh brews, and local flavors to you daily.</p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="hover:text-orange-500 text-stone-400"><Instagram size={20} /></a>
              <a href="#" className="hover:text-orange-500 text-stone-400"><Facebook size={20} /></a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick Info</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>Open Daily: 7:30 AM - 9:30 PM</li>
              <li className="flex gap-2 items-center"><MapPin size={14} className="text-orange-500" /> Victoria Island, Lagos</li>
              <li className="flex gap-2 items-center"><Phone size={14} className="text-orange-500" /> 08035795879</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Our Philosophy</h4>
            <p className="text-sm text-stone-400 leading-relaxed">
              We believe in locally sourced ingredients, warm atmospheres, and culinary quality that doesn't compromise.
            </p>
          </div>
        </div>
        <div className="border-t border-stone-800 pt-8 text-center text-xs text-stone-500">
          <p>&copy; {new Date().getFullYear()} Cafeteria Nigeria. All Rights Reserved.</p>
        </div>
      </footer>

    </div>
  );
}
