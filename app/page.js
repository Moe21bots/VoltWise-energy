import { useMemo, useState } from 'react';

export default function SolarEnergyPlatform() {
  const [form, setForm] = useState({
    tvs: 1,
    fridges: 1,
    aircons: 0,
    lights: 6,
    routers: 1,
    monthlyBill: 800,
    propertyType: 'Home',
  });

  const wattageMap = {
    tvs: 120,
    fridges: 180,
    aircons: 1200,
    lights: 12,
    routers: 15,
  };

  const recommendation = useMemo(() => {
    const dailyUsageWh =
      form.tvs * wattageMap.tvs * 5 +
      form.fridges * wattageMap.fridges * 12 +
      form.aircons * wattageMap.aircons * 6 +
      form.lights * wattageMap.lights * 8 +
      form.routers * wattageMap.routers * 24;

    const dailyUsageKwh = dailyUsageWh / 1000;

    let inverterSize = '3kW';
    if (dailyUsageKwh > 15) inverterSize = '5kW';
    if (dailyUsageKwh > 25) inverterSize = '8kW';
    if (dailyUsageKwh > 40) inverterSize = '10kW';

    let batterySize = '2.5kWh Lithium';
    if (dailyUsageKwh > 10) batterySize = '5kWh Lithium';
    if (dailyUsageKwh > 20) batterySize = '10kWh Lithium';
    if (dailyUsageKwh > 35) batterySize = '15kWh Lithium';

    const panelCount = Math.max(2, Math.ceil(dailyUsageKwh / 2));

    const estimatedBudget =
      panelCount * 2300 +
      (inverterSize === '3kW'
        ? 6500
        : inverterSize === '5kW'
        ? 8500
        : inverterSize === '8kW'
        ? 14000
        : 18000) +
      (batterySize === '2.5kWh Lithium'
        ? 7000
        : batterySize === '5kWh Lithium'
        ? 14000
        : batterySize === '10kWh Lithium'
        ? 26000
        : 39000);

    const estimatedSavings = Math.round(form.monthlyBill * 0.6);

    return {
      dailyUsageKwh: dailyUsageKwh.toFixed(1),
      inverterSize,
      batterySize,
      panelCount,
      estimatedBudget,
      estimatedSavings,
    };
  }, [form]);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: Number(value),
    }));
  };

  const products = [
    {
      name: '5kW Hybrid Inverter',
      price: 'BWP 8,500',
      desc: 'Perfect for medium homes and small businesses.',
    },
    {
      name: '550W Solar Panel',
      price: 'BWP 2,300',
      desc: 'High-efficiency panel with strong durability.',
    },
    {
      name: 'Lithium Battery 5kWh',
      price: 'BWP 14,000',
      desc: 'Reliable backup power for homes and offices.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">VoltWise Energy</h1>
        </div>

        <div className="hidden md:flex gap-8 text-sm font-medium">
          <a href="#home" className="hover:text-yellow-500 transition">Home</a>
          <a href="#calculator" className="hover:text-yellow-500 transition">Solar Calculator</a>
          <a href="#products" className="hover:text-yellow-500 transition">Products</a>
          <a href="#about" className="hover:text-yellow-500 transition">About</a>
          <a href="#contact" className="hover:text-yellow-500 transition">Contact</a>
        </div>

        <button className="bg-black text-white px-5 py-2 rounded-2xl hover:opacity-90 transition">
          Get Free Quote
        </button>
      </nav>

      {/* Hero */}
      <section
        id="home"
        className="px-6 lg:px-20 py-24 grid lg:grid-cols-2 gap-12 items-center"
      >
        <div>
          <div className="inline-block px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium mb-6">
            Smart Energy Solutions for Homes & Businesses
          </div>

          <h2 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Power Your Future With Smarter Solar Energy
          </h2>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Calculate your energy needs, compare solar systems, and connect with trusted installers — all in one modern platform.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="bg-black text-white px-7 py-4 rounded-2xl text-lg hover:opacity-90 transition shadow-lg">
              Calculate My Solar Needs
            </button>

            <button className="border border-gray-300 px-7 py-4 rounded-2xl text-lg hover:bg-gray-100 transition">
              Explore Products
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-[40px] p-10 shadow-2xl">
          <div className="bg-white rounded-3xl p-8 shadow-lg space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Estimated Monthly Savings</p>
                <h3 className="text-3xl font-bold">BWP 1,250</h3>
              </div>
              <div className="text-5xl">⚡</div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Battery Backup</span>
                  <span>80%</span>
                </div>
                <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                  <div className="bg-yellow-400 h-3 rounded-full w-[80%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Solar Efficiency</span>
                  <span>92%</span>
                </div>
                <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-3 rounded-full w-[92%]" />
                </div>
              </div>
            </div>
          <div className="flex justify-between border-b border-white/10 pb-3">
                <span>Daily Energy Usage</span>
                <span>{recommendation.dailyUsageKwh} kWh</span>
              </div>

              <div className="flex justify-between border-b border-white/10 pb-3">
                <span>Estimated Budget</span>
                <span>BWP {recommendation.estimatedBudget.toLocaleString()}</span>
              </div>
            </div>

            <button className="mt-8 w-full bg-yellow-400 text-black py-4 rounded-2xl font-semibold hover:opacity-90 transition">
              Get Full Quote on WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 lg:px-20 py-20 bg-gray-50">
        <div className="text-center mb-14">
          <h3 className="text-4xl font-bold mb-4">Everything You Need In One Platform</h3>
          <p className="text-gray-600 text-lg">
            From solar calculations to product sourcing and installation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition">
            <div className="text-4xl mb-5">☀️</div>
            <h4 className="text-2xl font-semibold mb-3">Solar Calculator</h4>
            <p className="text-gray-600 leading-relaxed">
              Instantly estimate the perfect solar setup for your home or business.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition">
            <div className="text-4xl mb-5">🔋</div>
            <h4 className="text-2xl font-semibold mb-3">Energy Products</h4>
            <p className="text-gray-600 leading-relaxed">
              Browse trusted inverters, batteries, solar panels, and backup systems.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition">
            <div className="text-4xl mb-5">🤖</div>
            <h4 className="text-2xl font-semibold mb-3">AI Recommendations</h4>
            <p className="text-gray-600 leading-relaxed">
              Get smart recommendations tailored to your electricity usage and budget.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section id="calculator" className="px-6 lg:px-20 py-24">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <h3 className="text-5xl font-bold mb-6">Solar Power Calculator</h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Tell us about your appliances and energy usage to receive an estimated solar recommendation.
            </p>

            <div className="space-y-5">
              <input
                type="number"
                value={form.tvs}
                onChange={(e) => handleChange('tvs', e.target.value)}
                placeholder="Number of TVs"
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <input
                type="number"
                value={form.fridges}
                onChange={(e) => handleChange('fridges', e.target.value)}
                placeholder="Number of Fridges"
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <input
                type="number"
                value={form.aircons}
                onChange={(e) => handleChange('aircons', e.target.value)}
                placeholder="Air Conditioners"
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <input
                type="number"
                value={form.lights}
                onChange={(e) => handleChange('lights', e.target.value)}
                placeholder="Number of Lights"
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <input
                type="number"
                value={form.routers}
                onChange={(e) => handleChange('routers', e.target.value)}
                placeholder="WiFi Routers"
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <input
                type="number"
                value={form.monthlyBill}
                onChange={(e) => handleChange('monthlyBill', e.target.value)}
                placeholder="Monthly Electricity Bill"
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <button className="w-full bg-black text-white py-4 rounded-2xl text-lg hover:opacity-90 transition shadow-lg">
                AI Solar Recommendation Generated
              </button>
            </div>
          </div>

          <div className="bg-black text-white rounded-[40px] p-10 shadow-2xl">
            <p className="uppercase tracking-widest text-sm text-yellow-400 mb-4">
              AI-Powered Recommendation
            </p>

            <h4 className="text-4xl font-bold mb-6">
              {recommendation.inverterSize} Solar Backup System
            </h4>

            <div className="space-y-5 text-lg">
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span>Panels</span>
                <span>{recommendation.panelCount} × 550W</span>
              </div>

              <div className="flex justify-between border-b border-white/10 pb-3">
                <span>Battery</span>
                <span>{recommendation.batterySize}</span>
              </div>

              <div className="flex justify-between border-b border-white/10 pb-3">
                <span>Inverter</span>
                <span>{recommendation.inverterSize} Hybrid</span>
              </div>

              <div className="flex justify-between border-b border-white/10 pb-3">
                <span>Estimated Savings</span>
                <span>BWP {recommendation.estimatedSavings}/month</span>
              </div>
            </div>

            <button className="mt-8 w-full bg-yellow-400 text-black py-4 rounded-2xl font-semibold hover:opacity-90 transition">
              Get Full Quote on WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="px-6 lg:px-20 py-24 bg-gray-50">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6">
          <div>
            <h3 className="text-5xl font-bold mb-3">Featured Products</h3>
            <p className="text-gray-600 text-lg">
              Reliable products for homes, offices, and businesses.
            </p>
          </div>

          <button className="border border-gray-300 px-6 py-3 rounded-2xl hover:bg-white transition">
            View Full Store
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-[30px] overflow-hidden shadow-sm hover:shadow-2xl transition"
            >
              <div className="h-56 bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center text-6xl">
                ⚡
              </div>

              <div className="p-8">
                <h4 className="text-2xl font-semibold mb-2">{product.name}</h4>
                <p className="text-yellow-600 font-bold text-xl mb-4">
                  {product.price}
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {product.desc}
                </p>

                <button className="w-full bg-black text-white py-3 rounded-2xl hover:opacity-90 transition">
                  Inquire on WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-6 lg:px-20 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-[40px] h-[450px] flex items-center justify-center text-8xl shadow-inner">
            🌍
          </div>

          <div>
            <p className="uppercase tracking-widest text-yellow-500 font-semibold mb-4">
              About VoltWise Energy
            </p>

            <h3 className="text-5xl font-bold mb-6 leading-tight">
              Helping Africa Move Toward Smarter Energy
            </h3>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              We simplify solar energy for homes and businesses by combining smart technology, trusted suppliers, and modern digital tools.
            </p>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Our mission is to make clean, reliable, and affordable energy accessible through education, automation, and seamless customer experiences.
            </p>

            <button className="bg-black text-white px-8 py-4 rounded-2xl hover:opacity-90 transition shadow-lg">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-20 py-24">
        <div className="bg-black rounded-[40px] p-12 lg:p-20 text-center text-white shadow-2xl">
          <h3 className="text-5xl font-bold mb-6 leading-tight">
            Ready To Power Your Home Smarter?
          </h3>

          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Get expert recommendations, compare products, and connect with trusted installers today.
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            <button className="bg-yellow-400 text-black px-8 py-4 rounded-2xl font-semibold hover:opacity-90 transition shadow-lg">
              Get Free Quote
            </button>

            <button className="border border-white/20 px-8 py-4 rounded-2xl hover:bg-white hover:text-black transition">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 lg:px-20 py-24 bg-gray-50">
        <div className="grid lg:grid-cols-2 gap-14">
          <div>
            <h3 className="text-5xl font-bold mb-6">Let’s Talk Energy</h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Reach out for free consultations, product inquiries, or installation assistance.
            </p>

            <div className="space-y-5 text-lg">
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                📞 +267 00 000 000
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm">
                📧 info@voltwiseenergy.com
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm">
                📍 Gaborone, Botswana
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[40px] p-10 shadow-lg">
            <div className="space-y-5">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <input
                type="text"
                placeholder="Phone Number"
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <textarea
                rows="5"
                placeholder="Tell us about your energy needs..."
                className="w-full border border-gray-300 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <button className="w-full bg-black text-white py-4 rounded-2xl text-lg hover:opacity-90 transition shadow-lg">
                Send Inquiry
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white px-6 lg:px-20 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <h4 className="text-2xl font-bold mb-3">VoltWise Energy</h4>
            <p className="text-gray-400 max-w-md leading-relaxed">
              Smart solar and backup energy solutions for modern homes and businesses.
            </p>
          </div>

          <div className="flex gap-10 text-gray-400">
            <div>
              <p className="font-semibold text-white mb-3">Company</p>
              <div className="space-y-2">
                <p>About</p>
                <p>Products</p>
                <p>Contact</p>
              </div>
            </div>

            <div>
              <p className="font-semibold text-white mb-3">Support</p>
              <div className="space-y-2">
                <p>FAQ</p>
                <p>Consultation</p>
                <p>Installers</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-gray-500 text-sm">
          © 2026 VoltWise Energy. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
