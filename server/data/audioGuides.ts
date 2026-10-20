// Urdu Audio Market & Financial Literacy Guides

export interface UrduAudioGuide {
  id: string;
  title: string;
  titleUrdu: string;
  category: 'Gold & Sarafa' | 'OGRA & Fuel' | 'Electricity & WAPDA' | 'FBR & Taxes' | 'Mandi & Agriculture';
  duration: string;
  speaker: string;
  speakerRole: string;
  summary: string;
  summaryUrdu: string;
  audioUrl: string;
  videoPoster: string;
  chapters: { time: string; title: string; titleUrdu: string }[];
  urduTranscript: string;
  englishTranscript: string;
}

export const audioGuides: UrduAudioGuide[] = [
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
    videoPoster: '/src/assets/images/gold_market_vault_1792513322078.jpg',
    chapters: [
      { time: '00:00', title: 'Understanding 24K, 22K and 21K Karats', titleUrdu: 'قیراط (Carat) اور خالص پن کا تناسب' },
      { time: '01:15', title: 'Wastage (Katoti) & Making (Wasta) Formula', titleUrdu: 'کٹوتی اور بنائی کے جائز ریٹس' },
      { time: '02:30', title: 'Why stones must be weighed separately', titleUrdu: 'نگینے اور موتی کا وزن الگ کروانا' },
      { time: '03:40', title: 'Official Sarafa Receipt & Hallmark Test', titleUrdu: 'پکی رسید اور ہال مارک لیبارٹری تصدیق' },
    ],
    urduTranscript: `السلام علیکم ناظرین! ریٹ زلا صرافہ گائیڈ میں خوش آمدید۔
پاکستان کی صرافہ مارکیٹ میں سونا خریدتے وقت اکثر خریدار دو بڑی غلطیاں کرتے ہیں:
پہلی غلطی: زیور کا وزن نگینوں سمیت سونے کے ریٹ پر کروانا۔ یاد رکھیں جب بھی آپ زیور خریدیں یا بیچیں، نگینے، موتی یا کندن کا وزن باقاعدہ کانٹے پر الگ کروا کر رسید پر خالص سونے کا نیٹ وزن لکھوائیں۔
دوسری غلطی: کٹوتی یعنی کاست۔ روایتی سنار 22 قیراط کے زیور پر بھی 10 سے 15 فیصد تک کاست کاٹ لیتے ہیں، جبکہ بین الاقوامی معیار کے مطابق جدید کاسٹنگ جیولری پر 2 سے 5 فیصد سے زیادہ کاست نہیں ہونی چاہیے۔
جب آپ 24 قیراط کا تولہ خریدتے ہیں، تو اس میں 11.664 گرام خالص 99.9 فیصد سونا ہوتا ہے۔ 22 قیراط میں 91.6 فیصد خالص سونا ہوتا ہے۔ ریٹ زلا گولڈ سمولیٹر پر ہمیشہ ریٹ چیک کر کے دکان پر سودا کریں۔`,
    englishTranscript: `Assalam-o-Alaikum and welcome to the RateZilla Sarafa Market Master Guide.
When purchasing gold jewellery in Pakistani markets, buyers routinely fall prey to two costly practices:
First, paying gold rates for gemstones and artificial beads. Always insist that stone weights are weighed separately and recorded on the itemized Sarafa voucher.
Second, excessive "Katoti" or wastage deduction. While traditional smiths deduct up to 10-15%, refined modern casting standards cap genuine loss at 2% to 5%.
Remember that 1 Tola equals exactly 11.664 grams. 24K represents 99.9% purity, while 22K (hallmark 916) represents 91.66% gold. Always benchmark with RateZilla before closing your trade.`,
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
    videoPoster: '/src/assets/images/gold_market_vault_1792513322078.jpg',
    chapters: [
      { time: '00:00', title: 'The 15-Day Fortnight Cycle', titleUrdu: 'پندرہ روزہ ریویو کا شیڈول' },
      { time: '01:05', title: 'Arab Gulf Platts vs Ex-Refinery Cost', titleUrdu: 'پلاٹس انڈیکس اور ریفائنری لاگت' },
      { time: '02:10', title: 'Petroleum Development Levy (PDL) & Margins', titleUrdu: 'پیٹرولیم لیوی (PDL) اور او ایم سی مارجن' },
      { time: '03:00', title: 'How to calculate your vehicle trip cost', titleUrdu: 'موٹروے ٹول اور گاڑی کی ایندھن لاگت' },
    ],
    urduTranscript: `اوگرا یعنی آئل اینڈ گیس ریگولیٹری اتھارٹی ہر ماہ کی 15 تاریخ اور آخری تاریخ کی شام پٹرولیم مصنوعات کی نئی قیمتوں کا تعین کرتی ہے۔
اس فارمولے میں بنیادی چیز پچھلے پندرہ دنوں کے دوران خلیجی منڈی یعنی عرب گلف پلاٹس میں پٹرول اور ڈیزل کا اوسط خام ریٹ اور ڈالر کی ایکسچینج ریٹ ہے۔
اس کے بعد ان لینڈ فریٹ ایکویلائزیشن مارجن (IFEM) شامل کیا جاتا ہے تاکہ پورے پاکستان میں پٹرول کی قیمت یکساں رہے۔
پھر آئل مارکیٹنگ کمپنیوں کا مارجن، پٹرول پمپ ڈیلرز کا کمیشن، اور حکومت کی جانب سے لگائی جانے والی پٹرولیم ڈیولپمنٹ لیوی شامل ہوتی ہے۔
ریٹ زلا فیول ٹول کے ذریعے آپ کسی بھی گاڑی یا بائیک کا موٹروے ٹول سمیت کل خرچ سیکنڈوں میں نکال سکتے ہیں۔`,
    englishTranscript: `The Oil and Gas Regulatory Authority (OGRA) notifies fortnightly fuel benchmarks on the 15th and end of each month.
The foundation rests on the 15-day moving average of Arab Gulf Platts benchmark petroleum cargo prices converted via State Bank interbank USD/PKR parity.
To ensure equitable pricing across remote towns, Inland Freight Equalization Margin (IFEM) balances regional freight costs.
Finally, OMC distribution margins, fuel station dealer commissions, and the parliamentary Petroleum Development Levy (PDL) comprise the final consumer retail price.`,
  },
  {
    id: 'wapda-electricity-slabs',
    title: 'Electricity Bill Slabs & Protected Consumer Guide',
    titleUrdu: 'بجلی کا بل اور پروٹیکٹڈ صارف: 200 یونٹ کی بچت اور ٹیکس سے بچاؤ',
    category: 'Electricity & WAPDA',
    duration: '05:02',
    speaker: 'Muhammad Bilal Khan, FCA',
    speakerRole: 'Public Utility & Tariff Consultant',
    summary: 'Discover the exact NEPRA formula: Base tariff slabs, Protected status threshold (consecutive 6 months under 200 units), Fuel Adjustment (FCA), and Section 235 advance income tax.',
    summaryUrdu: 'نیپرا کے نئے ٹیرف، پروٹیکٹڈ اسٹیٹس برقرار رکھنے، ایف سی اے، کیو ٹی اے اور بجلی کے بل پر انکم ٹیکس سے بچاؤ کا آسان کلیہ۔',
    audioUrl: '/api/media/stream/wapda-electricity-slabs',
    videoPoster: '/src/assets/images/gold_market_vault_1792513322078.jpg',
    chapters: [
      { time: '00:00', title: 'Protected vs Unprotected Consumer Definition', titleUrdu: 'پروٹیکٹڈ بمقابلہ نان پروٹیکٹڈ کی تعریف' },
      { time: '01:30', title: 'Slab Multipliers from 1 to 700+ Units', titleUrdu: 'یونٹ سلیبس اور بنیادی ٹیرف ریٹس' },
      { time: '02:50', title: 'Understanding FCA and QTA Surcharges', titleUrdu: 'فیول چارجز ایڈجسٹمنٹ (FCA) کا اثر' },
      { time: '04:00', title: 'Tax Exemption for Filers on Electricity Bills', titleUrdu: 'فائلرز کے لیے ودہولڈنگ ٹیکس کی چھوٹ' },
    ],
    urduTranscript: `اگر آپ کا گھریلو بجلی کا میٹر پچھلے مسلسل 6 ماہ کے دوران ہر مہینے 200 یونٹ یا اس سے کم استعمال پر رہا ہو، تو آپ 'پروٹیکٹڈ صارف' کہلاتے ہیں۔
جیسے ہی کسی ایک مہینے آپ کا یونٹ 201 پر جاتا ہے، آپ نان پروٹیکٹڈ کیٹیگری میں داخل ہو جاتے ہیں جہاں بنیادی ٹیرف فی یونٹ ڈرامائی طور پر بڑھ جاتا ہے۔
اس کے علاوہ بل میں فیول چارجز ایڈجسٹمنٹ (FCA)، کوارٹرلی ٹیرف ایڈجسٹمنٹ (QTA)، الیکٹریسٹی ڈیوٹی اور جی ایس ٹی لاگو ہوتے ہیں۔
جن نان فائلرز کا ماہانہ بجلی کا بل 25 ہزار روپے سے زیادہ ہو، ان پر سیکشن 235 کے تحت 7.5 فیصد انکم ٹیکس بھی لگ جاتا ہے، جو فائلر بن کر بالکل معاف ہو سکتا ہے۔`,
    englishTranscript: `Under NEPRA distribution rules, a residential consumer qualifies as 'Protected' if their monthly consumption remains below 200 kilowatt-hours (kWh) for six consecutive billing cycles.
Exceeding even 201 units in a single month immediately triggers reclassification into the 'Unprotected' residential tariff schedule where base rates more than double.
Additionally, monthly Fuel Charges Adjustment (FCA) and Quarterly Tariff Adjustment (QTA) are applied based on energy generation fuel mix variances.
Non-filers with residential electricity bills exceeding PKR 25,000 face a mandatory 7.5% Advance Income Tax under Section 235, which can be fully reclaimed or credited by active FBR tax filers.`,
  },
  {
    id: 'fbr-tax-planner-guide',
    title: 'FBR Income Tax Slabs & Filer vs Non-Filer Rights',
    titleUrdu: 'ایف بی آر انکم ٹیکس سلیبس اور فائلر بننے کے مالی فوائد',
    category: 'FBR & Taxes',
    duration: '04:30',
    speaker: 'Advocate Salman Aslam',
    speakerRole: 'High Court Tax Consultant & Corporate Law Advisor',
    summary: 'Clear analysis of new salaried & business tax slabs (up to 35% + surcharge), how withholding tax hurts non-filers in banking, vehicle registration, and property purchase.',
    summaryUrdu: 'تنخواہ دار افراد کے لیے نئے انکم ٹیکس سلیب، بینک ٹرانزیکشن، گاڑیوں اور جائیداد کی خرید و فروخت پر فائلر کے پیسے بچانے کا مکمل طریقہ۔',
    audioUrl: '/api/media/stream/fbr-tax-planner-guide',
    videoPoster: '/src/assets/images/gold_market_vault_1792513322078.jpg',
    chapters: [
      { time: '00:00', title: 'Salaried Exemption Limit (PKR 600,000)', titleUrdu: 'سالانہ 6 لاکھ روپے تک انکم ٹیکس چھوٹ' },
      { time: '01:20', title: 'New Progressive Slabs Breakdown', titleUrdu: 'تنخواہ پر ماہانہ کٹوتی کا حساب' },
      { time: '02:45', title: 'Vehicle & Property Tax Penalty on Non-Filers', titleUrdu: 'نان فائلر پر ڈبل ودہولڈنگ ٹیکس' },
      { time: '03:55', title: 'Steps to File via IRIS Portal', titleUrdu: 'ایف بی آر آئرس پورٹل پر گوشوارہ جمع کرانا' },
    ],
    urduTranscript: `فنانس ایکٹ کے تحت اگر آپ کی سالانہ تنخواہ 6 لاکھ روپے (یعنی ماہانہ 50 ہزار روپے) تک ہے، تو آپ پر کوئی انکم ٹیکس نہیں ہے۔
6 لاکھ سے 12 لاکھ روپے سالانہ پر 6 لاکھ سے زائد رقم کا 5 فیصد ٹیکس ہے۔
12 لاکھ سے 22 لاکھ تک 30 ہزار فکس پلس 15 فیصد۔ اور اسی طرح بتدریج 35 فیصد تک ٹیکس کی شرح جاتی ہے۔
فائلر بننے کا سب سے بڑا فائدہ یہ ہے کہ بینک سے نقد رقم نکالنے پر کوئی ودہولڈنگ ٹیکس نہیں کٹتا، اور جائیداد یا نئی گاڑی خریدتے وقت نان فائلر کی نسبت لاکھوں روپے کم ٹیکس ادا کرنا پڑتا ہے۔
ریٹ زلا کے ایف بی آر کیلکولیٹر سے آپ اپنی نیٹ تنخواہ اور ہر مہینے کٹنے والا ٹیکس فوری چیک کر سکتے ہیں۔`,
    englishTranscript: `Under the prevailing Finance Act schedule, annual taxable salary income up to PKR 600,000 (PKR 50,000 monthly) is taxed at 0%.
Income between PKR 600,000 and 1,200,000 is assessed at 5% of the excess over 600k.
The brackets scale up progressively to 15%, 25%, 30%, and 35% plus applicable super-tax surcharges for high earners.
Maintaining Active Taxpayer List (ATL) status slashes withholding deductions on banking transactions, real estate registration, mutual funds, and motor vehicle token taxes by half or eliminates punitive penalties entirely.`,
  },
];
