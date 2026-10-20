// Extra Tools Data: Crypto, Vehicle Tax, Solar Systems, Weather Alerts, Market News

export interface CryptoRate {
  symbol: string;
  name: string;
  icon: string;
  priceUsd: number;
  pricePkr: number;
  change24h: number;
}

export const cryptoRates: CryptoRate[] = [
  { symbol: 'BTC', name: 'Bitcoin', icon: '₿', priceUsd: 68450, pricePkr: 19049645, change24h: 2.45 },
  { symbol: 'ETH', name: 'Ethereum', icon: 'Ξ', priceUsd: 2640, pricePkr: 734688, change24h: 1.80 },
  { symbol: 'USDT', name: 'Tether USD', icon: '₮', priceUsd: 1.00, pricePkr: 280.20, change24h: 0.05 },
  { symbol: 'BNB', name: 'BNB Chain', icon: '🔶', priceUsd: 595, pricePkr: 165588, change24h: -0.65 },
  { symbol: 'SOL', name: 'Solana', icon: '◎', priceUsd: 156, pricePkr: 43414, change24h: 3.12 },
  { symbol: 'XRP', name: 'Ripple', icon: '✕', priceUsd: 0.54, pricePkr: 150.28, change24h: 0.90 },
];

export interface WeatherAgriCity {
  city: string;
  tempC: number;
  condition: string;
  humidity: number;
  windKmH: number;
  aqi: number;
  aqiStatus: 'Good' | 'Moderate' | 'Unhealthy' | 'Very Unhealthy' | 'Hazardous';
  cropAdvisory: string;
  urduAdvisory: string;
}

export const cityWeatherAgri: WeatherAgriCity[] = [
  {
    city: 'Lahore',
    tempC: 28,
    condition: 'Hazy Sun',
    humidity: 58,
    windKmH: 11,
    aqi: 184,
    aqiStatus: 'Unhealthy',
    cropAdvisory: 'Wheat (Gandum) land preparation underway. Avoid burning crop residue to control smog levels.',
    urduAdvisory: 'گندم کی بوائی کے لیے زمین کی تیاری کا وقت۔ اسموگ کنٹرول کے لیے باقیات جلانے سے گریز کریں۔',
  },
  {
    city: 'Multan',
    tempC: 31,
    condition: 'Sunny',
    humidity: 45,
    windKmH: 14,
    aqi: 132,
    aqiStatus: 'Moderate',
    cropAdvisory: 'Final cotton picking in progress. Ensure proper drying in sun before Mandi dispatch to avoid moisture deductions.',
    urduAdvisory: 'کپاس کی آخری چنائی جاری ہے۔ منڈی لے جانے سے پہلے نمی دور کرنے کے لیے دھوپ میں سکھائیں۔',
  },
  {
    city: 'Karachi',
    tempC: 32,
    condition: 'Breezy & Humid',
    humidity: 72,
    windKmH: 22,
    aqi: 95,
    aqiStatus: 'Moderate',
    cropAdvisory: 'Coastal vegetable and tomato crops require regular pest monitoring due to high sea humidity.',
    urduAdvisory: 'ساحلی ٹماٹر اور سبزیوں کی فصل پر کیڑے مار ادویات کا باقاعدہ معائنہ کریں۔',
  },
  {
    city: 'Islamabad',
    tempC: 24,
    condition: 'Clear',
    humidity: 48,
    windKmH: 9,
    aqi: 72,
    aqiStatus: 'Good',
    cropAdvisory: 'Favourable weather for Potohar barani mustard and seasonal winter fodder plantation.',
    urduAdvisory: 'پوٹھوہار بارانی علاقوں میں سرسوں اور موسم سرما کے چارے کی کاشت کے لیے موزوں موسم۔',
  },
  {
    city: 'Faisalabad',
    tempC: 29,
    condition: 'Hazy',
    humidity: 52,
    windKmH: 12,
    aqi: 165,
    aqiStatus: 'Unhealthy',
    cropAdvisory: 'Sugarcane harvesting season starting soon; calibrate mills and arrange logistics.',
    urduAdvisory: 'کماد یعنی گنے کی کٹائی کا سیزن شروع ہونے والا ہے، ملوں سے پیشگی رابطہ کریں۔',
  },
  {
    city: 'Peshawar',
    tempC: 26,
    condition: 'Mild',
    humidity: 50,
    windKmH: 10,
    aqi: 120,
    aqiStatus: 'Moderate',
    cropAdvisory: 'Citrus and sugarbeet beds require balanced irrigation before temperature drop in November.',
    urduAdvisory: 'سٹرس باغات اور چقندر کی فصل کو نومبر کی ٹھنڈ سے پہلے متوازن پانی فراہم کریں۔',
  },
];

export interface MarketNewsItem {
  id: string;
  title: string;
  titleUrdu: string;
  category: 'Gold' | 'Fuel' | 'Economy' | 'Solar' | 'Mandi';
  date: string;
  readTime: string;
  snippet: string;
  fullContent: string;
}

export const marketNewsList: MarketNewsItem[] = [
  {
    id: 'news-1',
    title: 'Sarafa Association Confirms 24K Gold Rate at Rs. 284,500/Tola Amid International Demand',
    titleUrdu: 'بین الاقوامی صرافہ مارکیٹ میں تیزی، پاکستان میں 24 قیراط سونا 2 لاکھ 84 ہزار 500 روپے فی تولہ پر برقرار',
    category: 'Gold',
    date: 'Today, 11:30 AM',
    readTime: '2 min read',
    snippet: 'All Pakistan Sarafa Jewellers Association (APSJA) reported a Rs. 1,200 hike per tola following international gold spot movement crossing $2,720 per ounce.',
    fullContent: 'The All Pakistan Sarafa Jewellers Association confirmed that 24-karat gold rose by Rs. 1,200 per tola, reaching Rs. 284,500 in Karachi, Lahore, and Islamabad markets. Local dealers attribute the spike to high international bullion demand, currency hedging by domestic institutional investors, and wedding season retail volume.',
  },
  {
    id: 'news-2',
    title: 'OGRA Fuel Fortnight Update: Petroleum Levy Remains Capped as Global Crude Balances',
    titleUrdu: 'اوگرا پٹرولیم قیمتیں: پٹرولیم ڈیولپمنٹ لیوی بدستور برقرار، آئل مارکیٹنگ کمپنیوں کے مارجن کا جائزہ',
    category: 'Fuel',
    date: 'Yesterday, 8:45 PM',
    readTime: '3 min read',
    snippet: 'The Ministry of Energy maintained the current petrol price at Rs. 281.40/L with high-speed diesel at Rs. 289.15/L for the current fortnightly cycle.',
    fullContent: 'Under the fortnightly pricing mechanism, OGRA reviewed international Arab Gulf Platts prices and State Bank parity. With Brent crude trading near $74-$76 a barrel, the federal government retained the Petroleum Development Levy (PDL) at Rs. 70 per litre while keeping consumer rates stable.',
  },
  {
    id: 'news-3',
    title: 'Solar Inverter & Bifacial Panel Prices Stabilize in Lahore Hall Road & Karachi Regal Markets',
    titleUrdu: 'شمسی توانائی مارکیٹ: 580 واٹ بائی فیشل این ٹائپ پینلز 32 روپے فی واٹ کے تاریخی سستے ترین ریٹ پر پہنچ گئے',
    category: 'Solar',
    date: '2 Days ago',
    readTime: '3 min read',
    snippet: 'Tier-1 580W N-Type bifacial solar panels are currently trading between Rs. 31 and Rs. 34 per watt, significantly lowering net-metering project payback periods.',
    fullContent: 'Importers and wholesale distributors in Hall Road Lahore and Regal Chowk Karachi confirmed ample inventory of Tier-1 solar modules. For a standard 10 kW residential net-metering system, turnkey installation costs have decreased by nearly 30% compared to last year, allowing average households to recover capital investment in approximately 2.5 years.',
  },
  {
    id: 'news-4',
    title: 'Punjab Ghalla Mandi Report: Wheat Support Price & Basmati Arrivals Steady',
    titleUrdu: 'پنجاب غلہ منڈی رپورٹ: سپر باسمتی اور گندم کی منڈیوں میں آمد تیز، قیمتوں میں استحکام',
    category: 'Mandi',
    date: '3 Days ago',
    readTime: '2 min read',
    snippet: 'Wholesale markets in Gujranwala, Hafizabad, and Lahore recorded robust arrivals of newly harvested paddy and dry basmati super rice varieties.',
    fullContent: 'Agricultural markets across Punjab reported stable wholesale rates with Basmati Super Rice averaging Rs. 9,400 per 40 kg maund. Milling operators reported good grain moisture compliance, while fertilizer and DAP supply chain distribution remains closely monitored by district agriculture administrations.',
  },
];
