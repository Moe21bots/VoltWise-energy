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

const questionnaire = [
  {
    id: 'propertyType',
    question: 'What type of property is this for?',
    options: ['House', 'Apartment / Flat', 'Small business', 'Farm / Plot'],
  },
  {
    id: 'goal',
    question: 'What matters most to you?',
    options: [
      'Backup during load shedding',
      'Lower monthly bills',
      'Going fully off-grid',
      'Not sure yet',
    ],
  },
  {
    id: 'backupHours',
    question: 'How long should the battery keep you running?',
    options: ['2–4 hours', '4–8 hours', '8–12 hours', 'A full day or more'],
  },
  {
    id: 'roof',
    question: 'What is your roof like?',
    options: ['Corrugated metal', 'Tiled', 'Flat concrete', 'Ground mount / no roof'],
  },
  {
    id: 'budget',
    question: 'What budget range are you working with?',
    options: [
      'Under BWP 30,000',
      'BWP 30,000 – 60,000',
      'BWP 60,000 – 100,000',
      'Over BWP 100,000',
    ],
  },
  {
    id: 'timeline',
    question: 'When would you like to install?',
    options: ['As soon as possible', 'Within 3 months', 'In 3–6 months', 'Just researching'],
  },
];

const solarFacts = [
  {
    stat: '3,200+',
    label: 'Sun hours a year',
    desc: 'Botswana gets some of the highest solar irradiation on Earth — among the best places anywhere to generate solar power.',
  },
  {
    stat: '25 yrs',
    label: 'Typical panel life',
    desc: 'Modern panels are warrantied for 25 years and keep producing well beyond that, quietly paying for themselves over time.',
  },
  {
    stat: '~1 hr',
    label: 'Sunlight powers the world',
    desc: 'The energy the sun delivers to Earth in a single hour is more than humanity uses in an entire year.',
  },
  {
    stat: '0 g',
    label: 'CO₂ while generating',
    desc: 'Once installed, panels produce clean electricity with no fuel, no emissions and almost no moving parts to maintain.',
  },
];

const solarBasics = [
  {
    icon: '☀️',
    title: 'Sunlight hits the panel',
    desc: 'Photovoltaic cells absorb sunlight and knock electrons loose, creating direct current (DC) electricity.',
  },
  {
    icon: '🔌',
    title: 'The inverter converts it',
    desc: 'An inverter turns DC into the alternating current (AC) your home appliances actually run on.',
  },
  {
    icon: '🔋',
    title: 'Batteries store the extra',
    desc: 'Energy you do not use during the day is stored in batteries to keep the lights on at night or during load shedding.',
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

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = questionnaire.filter((item) => answers[item.id]).length;

  const selectAnswer = (questionId, option) => {
    setSubmitted(false);
    setAnswers((current) => ({ ...current, [questionId]: option }));
  };

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

      <section className="px-6 lg:px-20 py-16 lg:py-24 bg-gradient-to-b from-sky-50 to-white">
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
            How the sun becomes your power
          </h2>
          <p className="text-lg text-gray-600">
            Watch the sun travel across the sky — every ray that lands on a panel
            is turned into clean electricity for your home. Here is how it works,
            and why it makes so much sense in Botswana.
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl h-72 sm:h-80 lg:h-96 overflow-hidden rounded-[36px] border border-amber-100 bg-gradient-to-b from-sky-200 via-sky-100 to-amber-50">
          <div
            aria-hidden="true"
            className="animate-sun-arc animate-sun-glow absolute h-16 w-16 rounded-full bg-yellow-400"
          />

          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center">
            <div className="grid grid-cols-4 gap-1 rounded-lg bg-slate-800 p-2 shadow-xl [transform:perspective(600px)_rotateX(35deg)]">
              {Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="h-8 w-10 sm:h-10 sm:w-14 rounded-sm bg-gradient-to-br from-sky-500 to-blue-900 ring-1 ring-sky-300/40"
                />
              ))}
            </div>
            <div className="h-16 w-2 bg-slate-700" />
            <div className="h-3 w-40 rounded-t-md bg-slate-600" />
          </div>
        </div>

        <div className="mx-auto max-w-4xl mt-12 grid gap-6 md:grid-cols-3">
          {solarBasics.map((step, index) => (
            <div
              key={step.title}
              className="rounded-3xl border border-gray-200 bg-white p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{step.icon}</span>
                <span className="text-sm font-semibold text-yellow-600">
                  Step {index + 1}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-4xl mt-8 grid gap-6 grid-cols-2 lg:grid-cols-4">
          {solarFacts.map((fact) => (
            <div
              key={fact.label}
              className="rounded-3xl border border-amber-100 bg-amber-50 p-6"
            >
              <p className="text-3xl font-bold text-yellow-600 mb-1">{fact.stat}</p>
              <p className="font-medium mb-2">{fact.label}</p>
              <p className="text-gray-600 text-sm">{fact.desc}</p>
            </div>
          ))}
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
          <h2 className="text-3xl font-semibold mb-2">Tell us about your energy needs</h2>
          <p className="text-gray-600 mb-8">
            Answer a few quick questions and our team will refine your recommendation.
            <span className="block text-sm text-gray-500 mt-1">
              {answeredCount} of {questionnaire.length} answered
            </span>
          </p>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-8"
          >
            {questionnaire.map((item) => (
              <fieldset key={item.id}>
                <legend className="font-medium mb-3">{item.question}</legend>
                <div className="flex flex-wrap gap-3">
                  {item.options.map((option) => {
                    const selected = answers[item.id] === option;
                    return (
                      <label
                        key={option}
                        className={`cursor-pointer rounded-2xl border px-5 py-3 text-sm transition-colors ${
                          selected
                            ? 'border-black bg-black text-white'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-500'
                        }`}
                      >
                        <input
                          type="radio"
                          name={item.id}
                          value={option}
                          checked={selected}
                          onChange={() => selectAnswer(item.id, option)}
                          className="sr-only"
                        />
                        {option}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            ))}

            <fieldset>
              <legend className="font-medium mb-3">Anything else we should know?</legend>
              <textarea
                rows="4"
                value={answers.notes ?? ''}
                onChange={(event) => selectAnswer('notes', event.target.value)}
                placeholder="Optional — roof space, business load, existing equipment…"
                className="w-full border border-gray-300 rounded-2xl px-5 py-4"
              />
            </fieldset>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                className="bg-black text-white px-8 py-4 rounded-2xl font-medium"
              >
                Send enquiry
              </button>
              {submitted && (
                <p role="status" className="text-green-700">
                  Thanks — we&apos;ve got your answers and will be in touch.
                </p>
              )}
            </div>
          </form>
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
