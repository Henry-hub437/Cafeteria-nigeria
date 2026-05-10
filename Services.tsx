import { motion } from 'motion/react';

const menuItems = [
  {
    category: "Signature Bites",
    items: [
      { name: "Crispy Buttermilk Chicken", desc: "Served with golden fries, thick toast, and signature dips.", price: "From ₦8,500" },
      { name: "Loaded Beef Tacos", desc: "Slow-cooked beef, melted cheddar, fresh pico de gallo.", price: "₦7,000" },
      { name: "Classic American Sliders", desc: "Juicy beef patties, caramelized onions, house sauce.", price: "₦9,500" },
    ]
  },
  {
    category: "Drinks & Happy Hour",
    items: [
      { name: "Craft Cocktails", desc: "Expertly mixed seasonal cocktails and classics.", price: "Happy Hour Specs" },
      { name: "Signature Bubble Tea", desc: "Refreshing boba in various flavors.", price: "₦4,500" },
      { name: "Draft & Bottled Beers", desc: "Local favorites and imported selections.", price: "Varies" },
    ]
  }
];

export default function Services() {
  return (
    <section id="menu" className="py-24 bg-bg-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-16 lg:gap-24 items-start">
          
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-display mb-6">Our Menu Highlights</h2>
            <p className="text-lg text-gray-600 mb-10">
              Dive into our carefully curated selection of American comfort classics, vibrant cocktails, and vegetarian-friendly options. Quality ingredients, unforgettable taste.
            </p>
            
            <div className="space-y-12">
              {menuItems.map((menu, idx) => (
                <div key={idx}>
                  <h3 className="text-2xl font-display border-b border-gray-200 pb-3 mb-6 text-brand-orange">{menu.category}</h3>
                  <div className="space-y-6">
                    {menu.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="group">
                        <div className="flex justify-between items-baseline mb-1">
                          <h4 className="text-lg font-medium text-brand-dark group-hover:text-brand-orange transition-colors">{item.name}</h4>
                          <span className="text-sm font-semibold text-gray-500 whitespace-nowrap ml-4">{item.price}</span>
                        </div>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10">
              <a href="#" className="inline-flex items-center text-brand-orange font-medium hover:text-brand-dark transition-colors">
                View Full Menu <span className="ml-2">→</span>
              </a>
            </div>
          </div>

          <div className="md:w-1/2 w-full grid grid-cols-2 gap-4 h-[600px]">
            <div className="col-span-2 md:col-span-1 h-full rounded-3xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1613514785940-daed07799d9b?auto=format&fit=crop&w=600&q=80" 
                alt="American food spread" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="col-span-2 md:col-span-1 grid grid-rows-2 gap-4 h-full">
              <div className="rounded-3xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80" 
                  alt="Cocktails" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80" 
                  alt="Coffee and drinks" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
