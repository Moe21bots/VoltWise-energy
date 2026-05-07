"use client";

import { useMemo, useState } from 'react';

export default function SolarEnergyPlatform() {
  const [form, setForm] = useState({
    tvs: 1,
    fridges: 1,
    aircons: 0,
    lights: 6,
    routers: 1,
    monthlyBill: 800,
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
      <h1>Hello {form.tvs}</h1>
      <p>{recommendation.dailyUsageKwh}</p>
      <p>{recommendation.estimatedBudget.toLocaleString()}</p>
      <div className="border-white/10">
        <textarea
          rows="5"
          placeholder="Tell us about your energy needs"
          className="w-full border border-gray-300 rounded-2xl px-5 py-4"
        ></textarea>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white rounded-[30px] overflow-hidden shadow-sm border border-gray-200"
          >
            <div className="h-56 bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center text-6xl">
              ⚡
            </div>
            <div className="p-8">
              <h4 className="text-2xl font-semibold mb-2">
                {product.name}
              </h4>
              <p className="text-yellow-600 font-bold text-xl mb-4">
                {product.price}
              </p>
              <p className="text-gray-600 mb-6">
                {product.desc}
              </p>
              <button className="w-full bg-black text-white py-3 rounded-2xl">
                Inquire on WhatsApp
              </button>
            </div>
          </div>
        ))}
      </div>
      <footer className="bg-black text-white px-6 lg:px-20 py-10">
        <div className="border-t border-white/10 pt-6 text-gray-400 text-sm">
          &copy; 2026 VoltWise Energy. All rights reserved.
        </div>
      </footer>
    </div>
  );
}