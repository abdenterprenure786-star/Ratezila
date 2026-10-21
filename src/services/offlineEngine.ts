// RateZilla Offline Engine & Mock Data Stores for 100% Offline / Cloudflare Pages Resilience

import {
  GoldRateItem,
  CityGoldRate,
  FuelRateItem,
  CurrencyItem,
  CryptoRate,
  MandiItem,
  HistoricalPricePoint,
  WeatherAgriCity,
  MarketNewsItem,
  UrduAudioGuide,
} from '../types/market.js';

export const offlineGoldRates: GoldRateItem[] = [
  { carat: '24K (Pure Gold)', purity: 0.999, perTola: 429500, per10Gram: 368230, perGram: 36823, change24h: 1800, direction: 'up' },
  { carat: '22K (Jewellery Standard)', purity: 0.916, perTola: 393708, per10Gram: 337544, perGram: 33754.4, change24h: 1650, direction: 'up' },
  { carat: '21K (Traditional)', purity: 0.875, perTola: 375813, per10Gram: 322200, perGram: 32220, change24h: 1570, direction: 'up' },
  { carat: '18K (Diamond Mount)', purity: 0.750, perTola: 322121, per10Gram: 276173, perGram: 27617.3, change24h: 1350, direction: 'up' },
];

export const offlineSilverRates = {
  perTola: 6282,
  per10Gram: 5384,
  perGram: 538.40,
  change24h: 75,
  direction: 'up' as const,
};

export const offlineCityGoldRates: CityGoldRate[] = [
  { city: 'Karachi', association: 'All Sindh Sarafa Jewellers Association (ASSJA)', tola24k: 429500, tola22k: 393708, diffFromKarachi: 0 },
  { city: 'Lahore', association: 'Lahore Sarafa Association', tola24k: 429680, tola22k: 393870, diffFromKarachi: 180 },
  { city: 'Islamabad / Rawalpindi', association: 'Twin Cities Sarafa Association', tola24k: 429820, tola22k: 393990, diffFromKarachi: 320 },
  { city: 'Peshawar', association: 'Khyber Sarafa Market', tola24k: 429880, tola22k: 394050, diffFromKarachi: 380 },
  { city: 'Quetta', association: 'Balochistan Sarafa Council', tola24k: 430080, tola22k: 394230, diffFromKarachi: 580 },
  { city: 'Multan', association: 'South Punjab Sarafa Board', tola24k: 429600, tola22k: 393800, diffFromKarachi: 100 },
  { city: 'Faisalabad', association: 'Lyallpur Sarafa Guild', tola24k: 429680, tola22k: 393870, diffFromKarachi: 180 },
];

export const offlineFuelRates: FuelRateItem[] = [
  {
    id: 'petrol',
    name: 'Motor Gasoline (Petrol / Premier Euro 5)',
    nameUrdu: 'موٹر پٹرول (پریمیئر یورو 5)',
    unit: 'Litre',
    currentPrice: 382.02,
    previousPrice: 381.14,
    change: 0.88,
    effectiveDate: 'Latest OGRA Revision (Fortnightly)',
    nextRevision: '1st & 16th of Month',
    breakdown: { exRefinery: 254.40, ifem: 9.78, omcMargin: 8.87, dealerMargin: 9.64, pdl: 70.00, salesTax: 29.33 },
  },
  {
    id: 'diesel',
    name: 'High Speed Diesel (HSD)',
    nameUrdu: 'ہائی اسپیڈ ڈیزل (ایچ ایس ڈی)',
    unit: 'Litre',
    currentPrice: 389.80,
    previousPrice: 389.27,
    change: 0.53,
    effectiveDate: 'Latest OGRA Revision (Fortnightly)',
    nextRevision: '1st & 16th of Month',
    breakdown: { exRefinery: 262.20, ifem: 6.50, omcMargin: 8.87, dealerMargin: 9.64, pdl: 70.00, salesTax: 32.59 },
  },
  {
    id: 'hobc',
    name: 'High Octane Blending Component (HOBC 97)',
    nameUrdu: 'ہائی اوکٹین (HOBC)',
    unit: 'Litre',
    currentPrice: 415.00,
    previousPrice: 412.50,
    change: 2.50,
    effectiveDate: 'Deregulated OMC Rate',
    nextRevision: 'Market Driven',
    breakdown: { exRefinery: 295.00, ifem: 12.00, omcMargin: 15.00, dealerMargin: 13.00, pdl: 50.00, salesTax: 30.00 },
  },
  {
    id: 'kerosene',
    name: 'Superior Kerosene Oil (SKO)',
    nameUrdu: 'مٹی کا تیل (کیروسین)',
    unit: 'Litre',
    currentPrice: 326.75,
    previousPrice: 325.55,
    change: 1.20,
    effectiveDate: 'Latest OGRA Revision',
    nextRevision: '1st of Month',
    breakdown: { exRefinery: 235.20, ifem: 7.10, omcMargin: 7.50, dealerMargin: 8.00, pdl: 40.00, salesTax: 28.95 },
  },
  {
    id: 'ldo',
    name: 'Light Diesel Oil (LDO)',
    nameUrdu: 'لائٹ ڈیزل آئل',
    unit: 'Litre',
    currentPrice: 267.46,
    previousPrice: 266.56,
    change: 0.90,
    effectiveDate: 'Latest OGRA Revision',
    nextRevision: '1st of Month',
    breakdown: { exRefinery: 198.15, ifem: 6.20, omcMargin: 7.50, dealerMargin: 7.00, pdl: 30.00, salesTax: 18.61 },
  },
  {
    id: 'lpg_cyl',
    name: 'LPG Domestic Cylinder (11.8 Kg)',
    nameUrdu: 'ایل پی جی گھریلو سلنڈر (11.8 کلو)',
    unit: '11.8 Kg Cyl',
    currentPrice: 3300.00,
    previousPrice: 3260.00,
    change: 40.00,
    effectiveDate: 'Current Monthly OGRA Notification',
    nextRevision: 'Next Month Notification',
    breakdown: { exRefinery: 2280.00, ifem: 210.00, omcMargin: 230.00, dealerMargin: 260.00, pdl: 0, salesTax: 320.00 },
  },
  {
    id: 'lpg_kg',
    name: 'LPG Base Benchmark Rate',
    nameUrdu: 'ایل پی جی فی کلوگرام ریٹ',
    unit: 'Kg',
    currentPrice: 279.34,
    previousPrice: 275.94,
    change: 3.40,
    effectiveDate: 'OGRA Monthly Notification',
    nextRevision: 'Monthly Revision',
    breakdown: { exRefinery: 193.20, ifem: 17.80, omcMargin: 19.50, dealerMargin: 22.04, pdl: 0, salesTax: 26.80 },
  },
];

export const offlineCurrencies: CurrencyItem[] = [
  { code: 'USD', name: 'US Dollar', country: 'United States', flag: '🇺🇸', interbankBuy: 277.85, interbankSell: 278.35, openMarketBuy: 279.10, openMarketSell: 280.50, change24h: 0.15 },
  { code: 'EUR', name: 'Euro', country: 'European Union', flag: '🇪🇺', interbankBuy: 302.40, interbankSell: 303.10, openMarketBuy: 303.50, openMarketSell: 305.80, change24h: -0.45 },
  { code: 'GBP', name: 'British Pound', country: 'United Kingdom', flag: '🇬🇧', interbankBuy: 361.20, interbankSell: 362.00, openMarketBuy: 362.50, openMarketSell: 365.40, change24h: 0.30 },
  { code: 'SAR', name: 'Saudi Riyal', country: 'Saudi Arabia', flag: '🇸🇦', interbankBuy: 73.98, interbankSell: 74.15, openMarketBuy: 74.30, openMarketSell: 74.90, change24h: 0.05 },
  { code: 'AED', name: 'UAE Dirham', country: 'United Arab Emirates', flag: '🇦🇪', interbankBuy: 75.65, interbankSell: 75.80, openMarketBuy: 75.95, openMarketSell: 76.60, change24h: 0.08 },
  { code: 'CAD', name: 'Canadian Dollar', country: 'Canada', flag: '🇨🇦', interbankBuy: 201.30, interbankSell: 202.00, openMarketBuy: 202.50, openMarketSell: 204.80, change24h: -0.20 },
  { code: 'AUD', name: 'Australian Dollar', country: 'Australia', flag: '🇦🇺', interbankBuy: 184.90, interbankSell: 185.50, openMarketBuy: 186.00, openMarketSell: 188.20, change24h: -0.10 },
  { code: 'CNY', name: 'Chinese Yuan', country: 'China', flag: '🇨🇳', interbankBuy: 39.05, interbankSell: 39.20, openMarketBuy: 39.30, openMarketSell: 39.95, change24h: 0.02 },
  { code: 'KWD', name: 'Kuwaiti Dinar', country: 'Kuwait', flag: '🇰🇼', interbankBuy: 906.10, interbankSell: 908.50, openMarketBuy: 909.00, openMarketSell: 918.00, change24h: 0.50 },
  { code: 'QAR', name: 'Qatari Riyal', country: 'Qatar', flag: '🇶🇦', interbankBuy: 76.10, interbankSell: 76.35, openMarketBuy: 76.40, openMarketSell: 77.10, change24h: 0.04 },
];

export const offlineCryptoRates: CryptoRate[] = [
  { symbol: 'BTC', name: 'Bitcoin', icon: '₿', priceUsd: 68450, pricePkr: 19049645, change24h: 2.45 },
  { symbol: 'ETH', name: 'Ethereum', icon: 'Ξ', priceUsd: 2640, pricePkr: 734688, change24h: 1.80 },
  { symbol: 'USDT', name: 'Tether USD', icon: '₮', priceUsd: 1.00, pricePkr: 280.20, change24h: 0.05 },
  { symbol: 'BNB', name: 'BNB Chain', icon: '🔶', priceUsd: 595, pricePkr: 165588, change24h: -0.65 },
  { symbol: 'SOL', name: 'Solana', icon: '◎', priceUsd: 156, pricePkr: 43414, change24h: 3.12 },
  { symbol: 'XRP', name: 'Ripple', icon: '✕', priceUsd: 0.54, pricePkr: 150.28, change24h: 0.90 },
];

export const offlineMandiItems: MandiItem[] = [
  { id: 'm1', item: 'Gandum (Wheat)', itemUrdu: 'گندم (نیا مال)', category: 'Grains', unit: '40 Kg', avgPrice: 3850, minPrice: 3750, maxPrice: 3950, city: 'Lahore Mandi', change24h: 50 },
  { id: 'm2', item: 'Basmati Super Rice (New)', itemUrdu: 'سپر باسمتی چاول', category: 'Grains', unit: '40 Kg', avgPrice: 9400, minPrice: 9100, maxPrice: 9700, city: 'Gujranwala Mandi', change24h: -100 },
  { id: 'm3', item: 'Sugar (White Refined)', itemUrdu: 'چینی سفید ریفائنڈ', category: 'Grains', unit: '50 Kg Bag', avgPrice: 7100, minPrice: 6950, maxPrice: 7250, city: 'Faisalabad Mandi', change24h: 30 },
  { id: 'm4', item: 'Cotton (Phutti / Raw)', itemUrdu: 'پھٹی کپاس', category: 'Cash Crops', unit: '40 Kg', avgPrice: 8200, minPrice: 7900, maxPrice: 8500, city: 'Multan Mandi', change24h: 120 },
  { id: 'm5', item: 'Desi Ghee (Pure)', itemUrdu: 'خالص دیسی گھی', category: 'Oils & Pulses', unit: '1 Kg', avgPrice: 2450, minPrice: 2300, maxPrice: 2600, city: 'Sahiwal Mandi', change24h: 0 },
  { id: 'm6', item: 'Daal Chana (Gram)', itemUrdu: 'دال چنا موٹی', category: 'Oils & Pulses', unit: '1 Kg', avgPrice: 320, minPrice: 305, maxPrice: 335, city: 'Karachi Jodia Bazaar', change24h: 5 },
  { id: 'm7', item: 'Onion (Piyaz Red)', itemUrdu: 'پیاز لال گریڈ اے', category: 'Vegetables', unit: '5 Kg Dhari', avgPrice: 580, minPrice: 540, maxPrice: 620, city: 'Karachi Sabzi Mandi', change24h: -40 },
  { id: 'm8', item: 'Tomato (Tamatar Farm)', itemUrdu: 'ٹماٹر فارمی لال', category: 'Vegetables', unit: '5 Kg Dhari', avgPrice: 490, minPrice: 450, maxPrice: 530, city: 'Lahore Badami Bagh', change24h: 20 },
  { id: 'm9', item: 'Potato (Aloo Fresh)', itemUrdu: 'آلو تازہ نیا', category: 'Vegetables', unit: '5 Kg Dhari', avgPrice: 390, minPrice: 360, maxPrice: 420, city: 'Islamabad I-11 Mandi', change24h: -10 },
  { id: 'm10', item: 'Mustard Oil (Sarson)', itemUrdu: 'سرسوں کا تیل کوہلو', category: 'Oils & Pulses', unit: '1 Litre', avgPrice: 510, minPrice: 490, maxPrice: 535, city: 'Sargodha Mandi', change24h: 0 },
];

export const offlineHistoricalData: HistoricalPricePoint[] = [
  { date: '15 Oct', gold24kTola: 421500, petrolPrice: 381.14, dieselPrice: 389.27, usdPkr: 277.90 },
  { date: '16 Oct', gold24kTola: 423200, petrolPrice: 381.14, dieselPrice: 389.27, usdPkr: 278.05 },
  { date: '17 Oct', gold24kTola: 424800, petrolPrice: 382.02, dieselPrice: 389.80, usdPkr: 278.10 },
  { date: '18 Oct', gold24kTola: 426100, petrolPrice: 382.02, dieselPrice: 389.80, usdPkr: 278.15 },
  { date: '19 Oct', gold24kTola: 427400, petrolPrice: 382.02, dieselPrice: 389.80, usdPkr: 278.25 },
  { date: '20 Oct', gold24kTola: 428300, petrolPrice: 382.02, dieselPrice: 389.80, usdPkr: 278.30 },
  { date: '21 Oct', gold24kTola: 429500, petrolPrice: 382.02, dieselPrice: 389.80, usdPkr: 278.35 },
];

export const offlineCityWeather: WeatherAgriCity[] = [
  { city: 'Lahore', tempC: 28, condition: 'Hazy Sun', humidity: 58, windKmH: 11, aqi: 184, aqiStatus: 'Unhealthy', cropAdvisory: 'Wheat (Gandum) land preparation underway. Avoid burning crop residue.', urduAdvisory: 'گندم کی بوائی کے لیے زمین کی تیاری کا وقت۔ اسموگ کنٹرول کے لیے باقیات جلانے سے گریز کریں۔' },
  { city: 'Multan', tempC: 31, condition: 'Sunny', humidity: 45, windKmH: 14, aqi: 132, aqiStatus: 'Moderate', cropAdvisory: 'Final cotton picking in progress. Ensure proper drying in sun.', urduAdvisory: 'کپاس کی آخری چنائی جاری ہے۔ منڈی لے جانے سے پہلے نمی دور کرنے کے لیے دھوپ میں سکھائیں۔' },
  { city: 'Karachi', tempC: 32, condition: 'Breezy', humidity: 72, windKmH: 22, aqi: 95, aqiStatus: 'Moderate', cropAdvisory: 'Coastal vegetable and tomato crops require regular pest monitoring.', urduAdvisory: 'ساحلی ٹماٹر اور سبزیوں کی فصل پر کیڑے مار ادویات کا باقاعدہ معائنہ کریں۔' },
  { city: 'Islamabad', tempC: 24, condition: 'Clear', humidity: 48, windKmH: 9, aqi: 72, aqiStatus: 'Good', cropAdvisory: 'Favourable weather for Potohar barani mustard and seasonal winter fodder.', urduAdvisory: 'پوٹھوہار بارانی علاقوں میں سرسوں اور موسم سرما کے چارے کی کاشت کے لیے موزوں موسم۔' },
];

export const offlineMarketNews: MarketNewsItem[] = [
  {
    id: 'news-1',
    title: 'Sarafa Association Confirms 24K Gold Rate at Rs. 284,500/Tola Amid International Demand',
    titleUrdu: 'بین الاقوامی صرافہ مارکیٹ میں تیزی، پاکستان میں 24 قیراط سونا 2 لاکھ 84 ہزار 500 روپے فی تولہ پر برقرار',
    category: 'Gold',
    date: 'Today, 11:30 AM',
    readTime: '2 min read',
    snippet: 'All Pakistan Sarafa Jewellers Association (APSJA) reported a Rs. 1,200 hike per tola following international gold spot movement crossing $2,720 per ounce.',
    fullContent: 'The All Pakistan Sarafa Jewellers Association confirmed that 24-karat gold rose by Rs. 1,200 per tola, reaching Rs. 284,500 in Karachi, Lahore, and Islamabad markets.',
  },
  {
    id: 'news-2',
    title: 'OGRA Fuel Fortnight Update: Petroleum Levy Remains Capped as Global Crude Balances',
    titleUrdu: 'اوگرا پٹرولیم قیمتیں: پٹرولیم ڈیولپمنٹ لیوی بدستور برقرار، آئل مارکیٹنگ کمپنیوں کے مارجن کا جائزہ',
    category: 'Fuel',
    date: 'Yesterday, 8:45 PM',
    readTime: '3 min read',
    snippet: 'The Ministry of Energy maintained current petrol price at Rs. 281.40/L with high-speed diesel at Rs. 289.15/L for the current fortnightly cycle.',
    fullContent: 'Under the fortnightly pricing mechanism, OGRA reviewed international Arab Gulf Platts prices and State Bank parity.',
  },
  {
    id: 'news-3',
    title: 'Solar Inverter & Bifacial Panel Prices Stabilize in Lahore Hall Road & Karachi Regal Markets',
    titleUrdu: 'شمسی توانائی مارکیٹ: 580 واٹ بائی فیشل این ٹائپ پینلز 32 روپے فی واٹ کے تاریخی سستے ترین ریٹ پر پہنچ گئے',
    category: 'Solar',
    date: '2 Days ago',
    readTime: '3 min read',
    snippet: 'Tier-1 580W N-Type bifacial solar panels are currently trading between Rs. 31 and Rs. 34 per watt, significantly lowering net-metering payback periods.',
    fullContent: 'Importers and wholesale distributors in Hall Road Lahore and Regal Chowk Karachi confirmed ample inventory of Tier-1 solar modules.',
  },
];

export const offlineAudioGuides: UrduAudioGuide[] = [
  {
    id: 'sarafa-gold-guide',
    title: 'Sarafa Market Gold Buying & Purity Mastery',
    titleUrdu: 'صرافہ مارکیٹ میں سونا خریدنے اور کٹوتی (کاست) کے لازمی اصول',
    category: 'Gold & Sarafa',
    duration: '04:12',
    speaker: 'Haji Muhammad Rafiq',
    speakerRole: 'Vice President, All Pakistan Sarafa Jewellers Association',
    summary: 'Learn how to avoid jewellery shop deception, calculate exact 24K vs 22K pure value, deduce gemstone weights, and verify laboratory hallmark stamps in Pakistan.',
    summaryUrdu: 'دکانداروں کی بناوٹی کٹوتی سے بچنے، نگینہ کا وزن الگ کروانے اور 22 قیراط بمقابلہ 24 قیراط کا حساب لگانے کی مکمل رہنمائی۔',
    audioUrl: '/api/media/stream/sarafa-gold-guide',
    videoPoster: '',
    chapters: [
      { time: '00:00', title: 'Understanding 24K, 22K and 21K Karats', titleUrdu: 'قیراط (Carat) اور خالص پن کا تناسب' },
      { time: '01:15', title: 'Wastage (Katoti) & Making (Wasta) Formula', titleUrdu: 'کٹوتی اور بنائی کے جائز ریٹس' },
      { time: '02:30', title: 'Why stones must be weighed separately', titleUrdu: 'نگینے اور موتی کا وزن الگ کروانا' },
      { time: '03:40', title: 'Official Sarafa Receipt & Hallmark Test', titleUrdu: 'پکی رسید اور ہال مارک لیبارٹری تصدیق' },
    ],
    urduTranscript: `السلام علیکم ناظرین! ریٹ زلا صرافہ گائیڈ میں خوش آمدید۔
پاکستان کی صرافہ مارکیٹ میں سونا خریدتے وقت اکثر خریدار دو بڑی غلطیاں کرتے ہیں:
پہلی غلطی: زیور کا وزن نگینوں سمیت سونے کے ریٹ پر کروانا۔ نگینہ کا وزن ہمیشہ الگ کروانا چاہیے۔
دوسری غلطی: کٹوتی یعنی کاست۔ روایتی سنار 22 قیراط پر بھی 10 سے 15 فیصد کاست کاٹتے ہیں جبکہ جدید معیار کے مطابق 2 سے 5 فیصد سے زیادہ نہیں ہونی چاہیے۔`,
    englishTranscript: `Assalam-o-Alaikum and welcome to the RateZilla Sarafa Market Master Guide. When purchasing gold jewellery in Pakistani markets, buyers routinely fall prey to paying gold rates for gemstones and excessive wastage deductions. Always verify hallmark stamps and use RateZilla gold simulator.`,
  },
  {
    id: 'ogra-fuel-formula',
    title: 'How OGRA Calculates Fuel & LPG Prices in Pakistan',
    titleUrdu: 'اوگرا پٹرول فارمولا: پٹرولیم لیوی اور پندرہ روزہ قیمتوں کا طریقہ کار',
    category: 'OGRA & Fuel',
    duration: '03:45',
    speaker: 'Engr. Tariq Mehmood',
    speakerRole: 'Energy Analyst & Petroleum Economist',
    summary: 'A step-by-step breakdown of how ex-refinery prices, international Platts index, dealer margins, and petroleum levy (PDL) form the final pump price.',
    summaryUrdu: 'عالمی منڈی، ڈالر ریٹ، آئل ریفائنری، پیٹرولیم لیوی (PDL) اور ڈیلر کمیشن مل کر پٹرول کا ریٹ کیسے بناتے ہیں۔',
    audioUrl: '/api/media/stream/ogra-fuel-formula',
    videoPoster: '',
    chapters: [
      { time: '00:00', title: 'The 15-Day Fortnight Cycle', titleUrdu: 'پندرہ روزہ ریویو کا شیڈول' },
      { time: '01:05', title: 'Arab Gulf Platts vs Ex-Refinery Cost', titleUrdu: 'پلاٹس انڈیکس اور ریفائنری لاگت' },
      { time: '02:10', title: 'Petroleum Development Levy (PDL)', titleUrdu: 'پیٹرولیم لیوی (PDL) اور او ایم سی مارجن' },
    ],
    urduTranscript: `اوگرا ہر پندرہ دن بعد خلیجی منڈی اور ڈالر کی شرح کے مطابق پٹرولیم مصنوعات کی قیمتوں کا تعین کرتا ہے۔ اس میں ان لینڈ فریٹ ایکویلائزیشن مارجن (IFEM)، او ایم سی مارجن، ڈیلر کمیشن اور پیٹرولیم لیوی شامل ہوتی ہے۔`,
    englishTranscript: `OGRA calculates petroleum benchmark prices every 15 days based on Arab Gulf Platts averages, SBP exchange rate, freight equalisation (IFEM), OMC margins, dealer commissions, and the Petroleum Development Levy.`,
  },
];
