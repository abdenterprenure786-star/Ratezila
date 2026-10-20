// RateZilla Comprehensive Backend API Router

import { Router, Request, Response } from 'express';
import {
  goldRates,
  silverRates,
  cityGoldRates,
  fuelRates,
  currencies,
  mandiItems,
  historicalPriceData,
} from '../data/ratesData.js';
import { audioGuides } from '../data/audioGuides.js';
import { cryptoRates, cityWeatherAgri, marketNewsList } from '../data/extraToolsData.js';
import {
  calculateGoldSimulator,
  calculateFuelTrip,
  calculateElectricityBill,
  calculateFBRTax,
  calculateConstructionCost,
} from '../services/calculators.js';
import {
  calculateSolarSystem,
  calculateZakat,
  calculateVehicleTax,
} from '../services/extraCalculators.js';

const router = Router();

// In-memory cache metadata
let lastRefreshed = new Date().toISOString();

// 1. Summary Endpoint
router.get('/rates/summary', (req: Request, res: Response) => {
  res.json({
    success: true,
    portal: 'RateZilla',
    tagline: "Pakistan's Ultimate Live Market Rates, Gold Simulator & Utility Portal",
    timestamp: new Date().toISOString(),
    lastRefreshed,
    status: 'ONLINE',
    marketStatus: {
      sarafaMarket: 'OPEN',
      interbankForex: 'OPEN',
      ograCycle: 'ACTIVE',
      mandiBazaar: 'ACTIVE',
    },
    topBenchmarks: {
      gold24kTolaPKR: goldRates[0].perTola,
      gold24kChange: goldRates[0].change24h,
      petrolPKR: fuelRates[0].currentPrice,
      dieselPKR: fuelRates[1].currentPrice,
      usdPkrInterbank: currencies[0].interbankSell,
      sarPkr: currencies[3].interbankSell,
      btcPkr: cryptoRates[0].pricePkr,
    },
  });
});

// 2. Gold Sarafa Rates & Historical Data
router.get('/rates/gold', (req: Request, res: Response) => {
  res.json({
    success: true,
    benchmarkDate: 'Today',
    rates: goldRates,
    silver: silverRates,
    cityRates: cityGoldRates,
    historicalTrends: historicalPriceData,
  });
});

// 3. Fuel Benchmark Prices
router.get('/rates/fuel', (req: Request, res: Response) => {
  res.json({
    success: true,
    authority: 'Oil and Gas Regulatory Authority (OGRA)',
    products: fuelRates,
  });
});

// 4. Currency Exchange Rates
router.get('/rates/currencies', (req: Request, res: Response) => {
  res.json({
    success: true,
    source: 'State Bank of Pakistan (SBP) & Forex Association of Pakistan',
    currencies,
  });
});

// 5. Crypto Rates in PKR
router.get('/rates/crypto', (req: Request, res: Response) => {
  res.json({
    success: true,
    cryptos: cryptoRates,
  });
});

// 6. Mandi Bazaar Rates
router.get('/rates/mandi', (req: Request, res: Response) => {
  const category = req.query.category as string;
  let items = mandiItems;
  if (category && category !== 'All') {
    items = mandiItems.filter((i) => i.category.toLowerCase() === category.toLowerCase());
  }
  res.json({
    success: true,
    items,
  });
});

// 7. Weather & Agricultural Advisory
router.get('/weather/alerts', (req: Request, res: Response) => {
  res.json({
    success: true,
    cities: cityWeatherAgri,
  });
});

// 8. Market News Feed
router.get('/news', (req: Request, res: Response) => {
  res.json({
    success: true,
    news: marketNewsList,
  });
});

// 9. Audio Guides & Video Showcase
router.get('/media/audio-guides', (req: Request, res: Response) => {
  res.json({
    success: true,
    guides: audioGuides,
  });
});

// 10. Synthetic Audio Stream Endpoint (generates a valid audible WAV sound wave)
router.get('/media/stream/:id', (req: Request, res: Response) => {
  const guide = audioGuides.find((g) => g.id === req.params.id) || audioGuides[0];

  // Synthesize a valid minimal PCM WAV tone for playback demonstration
  const sampleRate = 8000;
  const numSeconds = 3;
  const numSamples = sampleRate * numSeconds;
  const buffer = Buffer.alloc(44 + numSamples);

  // RIFF Header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + numSamples, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // subchunk1 size
  buffer.writeUInt16LE(1, 20); // PCM audio format
  buffer.writeUInt16LE(1, 22); // Mono channel
  buffer.writeUInt32LE(sampleRate, 24); // sample rate
  buffer.writeUInt32LE(sampleRate, 28); // byte rate
  buffer.writeUInt16LE(1, 32); // block align
  buffer.writeUInt16LE(8, 34); // bits per sample
  buffer.write('data', 36);
  buffer.writeUInt32LE(numSamples, 40);

  // Generate warm harmonic tones
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const tone = Math.sin(2 * Math.PI * 440 * t) * 0.4 + Math.sin(2 * Math.PI * 554 * t) * 0.3;
    const sample = Math.floor((tone + 1) * 127.5);
    buffer.writeUInt8(sample, 44 + i);
  }

  res.setHeader('Content-Type', 'audio/wav');
  res.setHeader('Content-Length', buffer.length);
  res.setHeader('Accept-Ranges', 'bytes');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.send(buffer);
});

// 11. Built-in Speed Test Endpoints
router.get('/speedtest/ping', (req: Request, res: Response) => {
  res.json({
    server: 'RateZilla Islamabad Edge Server',
    clientTimestamp: req.query.t || Date.now(),
    serverTimestamp: Date.now(),
  });
});

router.get('/speedtest/download', (req: Request, res: Response) => {
  const sizeMb = Math.min(10, Math.max(1, parseInt(req.query.size as string) || 2));
  const chunk = Buffer.alloc(1024 * 64, 0x41); // 64KB chunk of 'A'
  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Content-Disposition', 'attachment; filename="speedtest.bin"');
  res.setHeader('Content-Length', sizeMb * 1024 * 1024);

  const totalChunks = (sizeMb * 1024) / 64;
  let sentChunks = 0;

  const interval = setInterval(() => {
    if (sentChunks < totalChunks) {
      res.write(chunk);
      sentChunks++;
    } else {
      clearInterval(interval);
      res.end();
    }
  }, 5);

  req.on('close', () => {
    clearInterval(interval);
  });
});

// --- Calculators POST Endpoints ---

// 12. Gold Simulator POST
router.post('/tools/gold-simulator', (req: Request, res: Response) => {
  try {
    const result = calculateGoldSimulator(req.body);
    res.json({ success: true, result });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 13. Fuel Trip Calculator POST
router.post('/tools/fuel-trip', (req: Request, res: Response) => {
  try {
    const result = calculateFuelTrip(req.body);
    res.json({ success: true, result });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 14. Electricity Bill Estimator POST
router.post('/tools/electricity-bill', (req: Request, res: Response) => {
  try {
    const result = calculateElectricityBill(req.body);
    res.json({ success: true, result });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 15. FBR Tax Calculator POST
router.post('/tools/fbr-tax', (req: Request, res: Response) => {
  try {
    const result = calculateFBRTax(req.body);
    res.json({ success: true, result });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 16. Construction Cost Calculator POST
router.post('/tools/construction-cost', (req: Request, res: Response) => {
  try {
    const result = calculateConstructionCost(req.body);
    res.json({ success: true, result });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 17. Solar Panel Calculator POST
router.post('/tools/solar-calculator', (req: Request, res: Response) => {
  try {
    const result = calculateSolarSystem(req.body);
    res.json({ success: true, result });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 18. Zakat Calculator POST
router.post('/tools/zakat-calculator', (req: Request, res: Response) => {
  try {
    const result = calculateZakat(req.body);
    res.json({ success: true, result });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 19. Vehicle Excise & Token Tax POST
router.post('/tools/vehicle-tax', (req: Request, res: Response) => {
  try {
    const result = calculateVehicleTax(req.body);
    res.json({ success: true, result });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

export default router;
