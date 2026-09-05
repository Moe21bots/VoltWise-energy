"use client";

import { useMemo, useState } from 'react';

const wattageMap = {
  tvs: 120,
  fridges: 180,
  aircons: 1200,
  lights: 12,
  routers: 15,
};

const appliances = [
  { key: 'tvs', label: 'Televisions', hint: '120W · 5 hrs/day' },
  { key: 'fridges', label: 'Fridges / Freezers', hint: '180W · 12 hrs/day' },
  { key: 'aircons', label: 'Air Conditioners', hint: '1200W · 6 hrs/day' },
  { key: 'lights', label: 'Light Bulbs', hint: '12W · 8 hrs/day' },
  { key: 'routers', label: 'Routers / Modems', hint: '15W · 24 hrs/day' },
];

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

const inverterPrices = {
  '3kW': 6500,
  '5kW': 8500,
  '8kW': 14000,
  '10kW': 18000,
};

const batteryPrices = {
  '2.5kWh Lithium': 7000,
  '5kWh Lithium': 14000,
  '10kWh Lithium': 26000,
  '15kWh Lithium': 39000,
};

export default function SolarEnergyPlatform() {
  const [form, setForm] = useState({
    tvs: 1,
    fridges: 1,
    aircons: 0,
    lights: 6,
    routers: 1,
    monthlyBill: 800,
  });

  const updateField = (key, value) => {
    const parsed = Number(value);
    setForm((current) => ({
      ...current,
      [key]: Number.isFinite(parsed) && parsed >= 0 ? parsed : 0,
    }));
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
      panelCount * 2300 + inverterPrices[inverterSize] + batteryPrices[batterySize];

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

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="px-6 lg:px-20 py-6 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-2 text-xl font-bold">
          <span className="text-2xl">⚡</span>
          VoltWise Energy
        </div>
        <a
          href="#calculator"
          className="bg-black text-white px-6 py-3 rounded-2xl text-sm font-medium"
        >
          Size my system
        </a>
      </header>

      <section className="px-6 lg:px-20 py-16 lg:py-24 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-3xl">
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
            Solar sizing for Botswana homes, in seconds.
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Tell us what you run at home and we&apos;ll recommend the right panels,
            inverter and battery — plus what it costs and what you save.
          </p>
          <a
            href="#calculator"
            className="inline-block bg-black text-white px-8 py-4 rounded-2xl font-medium"
          >
            Start the calculator
          </a>
        </div>
      </section>

      <section id="calculator" className="px-6 lg:px-20 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Your energy usage</h2>
            <p className="text-gray-600 mb-8">
              Enter how many of each appliance you run. Results update instantly.
            </p>

            <div className="space-y-5">
              {appliances.map((appliance) => (
                <div key={appliance.key} className="flex items-center justify-between gap-6">
                  <label htmlFor={appliance.key} className="flex-1">
                    <span className="block font-medium">{appliance.label}</span>
                    <span className="block text-sm text-gray-500">{appliance.hint}</span>
                  </label>
                  <input
                    id={appliance.key}
                    type="number"
                    min="0"
                    value={form[appliance.key]}
                    onChange={(event) => updateField(appliance.key, event.target.value)}
                    className="w-28 border border-gray-300 rounded-2xl px-4 py-3 text-right"
                  />
                </div>
              ))}

              <div className="flex items-center justify-between gap-6 pt-5 border-t border-gray-200">
                <label htmlFor="monthlyBill" className="flex-1">
                  <span className="block font-medium">Monthly electricity bill</span>
                  <span className="block text-sm text-gray-500">In BWP</span>
                </label>
                <input
                  id="monthlyBill"
                  type="number"
                  min="0"
                  value={form.monthlyBill}
                  onChange={(event) => updateField('monthlyBill', event.target.value)}
                  className="w-28 border border-gray-300 rounded-2xl px-4 py-3 text-right"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-[30px] border border-gray-200 p-8 lg:p-10 h-fit">
            <h3 className="text-2xl font-semibold mb-6">Recommended system</h3>

            <dl className="space-y-4">
              <div className="flex justify-between gap-4">
                <dt className="text-gray-600">Daily usage</dt>
                <dd className="font-semibold">{recommendation.dailyUsageKwh} kWh</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-600">Solar panels</dt>
                <dd className="font-semibold">{recommendation.panelCount} × 550W</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-600">Inverter</dt>
                <dd className="font-semibold">{recommendation.inverterSize}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-600">Battery</dt>
                <dd className="font-semibold">{recommendation.batterySize}</dd>
              </div>
            </dl>

            <div className="mt-8 pt-6 border-t border-gray-200 space-y-4">
              <div className="flex justify-between gap-4">
                <span className="text-gray-600">Estimated budget</span>
                <span className="text-2xl font-bold">
                  BWP {recommendation.estimatedBudget.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-gray-600">Estimated monthly savings</span>
                <span className="text-xl font-semibold text-yellow-600">
                  BWP {recommendation.estimatedSavings.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              type="button"
              className="w-full mt-8 bg-black text-white py-4 rounded-2xl font-medium"
            >
              Request a quote
            </button>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-20 py-16 bg-gray-50">
        <h2 className="text-3xl font-semibold mb-10">Popular hardware</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.name}
              className="bg-white rounded-[30px] overflow-hidden shadow-sm border border-gray-200"
            >
              <div className="h-56 bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center text-6xl">
                ⚡
              </div>
              <div className="p-8">
                <h4 className="text-2xl font-semibold mb-2">{product.name}</h4>
                <p className="text-yellow-600 font-bold text-xl mb-4">{product.price}</p>
                <p className="text-gray-600 mb-6">{product.desc}</p>
                <button
                  type="button"
                  className="w-full bg-black text-white py-3 rounded-2xl"
                >
                  Inquire on WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-20 py-16">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold mb-2">Tell us about your needs</h2>
          <p className="text-gray-600 mb-6">
            Share any details — backup hours, business load, roof space — and our team
            will refine the recommendation.
          </p>
          <textarea
            rows="5"
            placeholder="Tell us about your energy needs"
            className="w-full border border-gray-300 rounded-2xl px-5 py-4"
          />
          <button
            type="button"
            className="mt-4 bg-black text-white px-8 py-4 rounded-2xl font-medium"
          >
            Send enquiry
          </button>
        </div>
      </section>

      <footer className="bg-black text-white px-6 lg:px-20 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <span>⚡</span> VoltWise Energy
          </div>
          <p className="text-gray-400 text-sm">
            Solar sizing, hardware and installation across Botswana.
          </p>
        </div>
        <div className="border-t border-white/10 pt-6 text-gray-400 text-sm">
          &copy; 2026 VoltWise Energy. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
