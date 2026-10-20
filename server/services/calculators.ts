// RateZilla Financial & Utility Computation Processors

import { goldRates, fuelRates } from '../data/ratesData.js';

// --- 1. Gold Simulator & Brokerage Calculator ---
export interface GoldCalcInput {
  weight: number;
  unit: 'tola' | 'gram' | 'masha' | 'ratti';
  carat: '24K' | '22K' | '21K' | '18K';
  stoneWeightGrams?: number;
  makingChargesType: 'perGram' | 'percentage' | 'fixed';
  makingChargesValue: number;
  katotiPercentage?: number; // Wastage deduction % (e.g. 2% to 10%)
  action: 'buy' | 'sell';
  purchasePricePerTola?: number; // For trade profit simulator
}

export function calculateGoldSimulator(input: GoldCalcInput) {
  // Conversions to standard grams
  let grossWeightGrams = 0;
  if (input.unit === 'tola') {
    grossWeightGrams = input.weight * 11.664;
  } else if (input.unit === 'gram') {
    grossWeightGrams = input.weight;
  } else if (input.unit === 'masha') {
    grossWeightGrams = input.weight * 0.972;
  } else if (input.unit === 'ratti') {
    grossWeightGrams = input.weight * 0.1215;
  }

  const stoneGrams = Math.max(0, input.stoneWeightGrams || 0);
  const netGoldWeightGrams = Math.max(0, grossWeightGrams - stoneGrams);
  const netWeightTola = netGoldWeightGrams / 11.664;

  // Carat purity factor
  const purityMap: Record<string, number> = {
    '24K': 0.999,
    '22K': 0.9166,
    '21K': 0.875,
    '18K': 0.750,
  };
  const purity = purityMap[input.carat] || 0.999;
  const pureGoldGrams = netGoldWeightGrams * (purity / 0.999);

  // Rate lookup from live rates
  const gold24kItem = goldRates.find((r) => r.carat.startsWith('24K'))!;
  const current24kTola = gold24kItem.perTola;
  const current24kGram = current24kTola / 11.664;
  const currentCaratGram = current24kGram * (purity / 0.999);
  const currentCaratTola = current24kTola * (purity / 0.999);

  // Raw Gold Value
  const rawGoldValue = netGoldWeightGrams * currentCaratGram;

  // Making charges
  let makingChargesTotal = 0;
  if (input.makingChargesType === 'perGram') {
    makingChargesTotal = netGoldWeightGrams * input.makingChargesValue;
  } else if (input.makingChargesType === 'percentage') {
    makingChargesTotal = rawGoldValue * (input.makingChargesValue / 100);
  } else {
    makingChargesTotal = input.makingChargesValue;
  }

  // Katoti / Wastage deduction (usually applied when customer sells back jewellery to jeweller)
  const katotiPercent = input.katotiPercentage || 0;
  const katotiDeduction = rawGoldValue * (katotiPercent / 100);

  let finalAmount = 0;
  if (input.action === 'buy') {
    // Consumer buys: Raw gold + Making charges
    finalAmount = rawGoldValue + makingChargesTotal;
  } else {
    // Consumer sells: Raw gold - Katoti (making charges are lost)
    finalAmount = Math.max(0, rawGoldValue - katotiDeduction);
  }

  // Zakat calculation (Nisab is 7.5 Tola = 87.48 grams of pure 24K gold)
  const nisabGrams24K = 87.48;
  const meetsZakatNisab = pureGoldGrams >= nisabGrams24K;
  const zakatPayablePKR = meetsZakatNisab ? rawGoldValue * 0.025 : 0;

  // Trade profit simulator if purchase price provided
  let tradeProfit = null;
  if (input.purchasePricePerTola && input.purchasePricePerTola > 0) {
    const historicalCost = netWeightTola * input.purchasePricePerTola;
    const currentMarketWorth = netWeightTola * currentCaratTola;
    const profitLoss = currentMarketWorth - historicalCost;
    const roiPercent = (profitLoss / historicalCost) * 100;
    tradeProfit = {
      purchasePricePerTola: input.purchasePricePerTola,
      historicalTotalCost: Math.round(historicalCost),
      currentMarketWorth: Math.round(currentMarketWorth),
      profitLoss: Math.round(profitLoss),
      roiPercent: Number(roiPercent.toFixed(2)),
      isProfitable: profitLoss >= 0,
    };
  }

  return {
    grossWeightGrams: Number(grossWeightGrams.toFixed(3)),
    stoneWeightDeductedGrams: Number(stoneGrams.toFixed(3)),
    netGoldWeightGrams: Number(netGoldWeightGrams.toFixed(3)),
    netWeightTola: Number(netWeightTola.toFixed(4)),
    pureGoldEquivalentGrams: Number(pureGoldGrams.toFixed(3)),
    carat: input.carat,
    purityPercentage: Number((purity * 100).toFixed(1)),
    currentGoldRatePerTola: Math.round(currentCaratTola),
    currentGoldRatePerGram: Number(currentCaratGram.toFixed(1)),
    rawGoldValue: Math.round(rawGoldValue),
    makingCharges: Math.round(makingChargesTotal),
    katotiDeduction: Math.round(katotiDeduction),
    finalEstimatedPrice: Math.round(finalAmount),
    zakatAssessment: {
      meetsNisabThreshold: meetsZakatNisab,
      nisabThresholdGrams: nisabGrams24K,
      zakatPayablePKR: Math.round(zakatPayablePKR),
      explanation: meetsZakatNisab
        ? `Weight exceeds 7.5 Tola (87.48g) Nisab. Zakat is 2.5% of current market value.`
        : `Weight is below 7.5 Tola (87.48g) Nisab for single gold holding.`,
    },
    tradeProfit,
  };
}

// --- 2. Fuel Trip & Highway Toll Cost Calculator ---
export interface FuelTripInput {
  distanceKm: number;
  vehicleCategory: string; // 'bike_70', 'bike_125', 'car_1000cc', 'sedan_1500cc', 'sedan_1800cc', 'suv', 'prado_v8', 'hiace_diesel', 'rickshaw'
  acEnabled: boolean;
  fuelType: 'petrol' | 'diesel' | 'cng' | 'lpg';
  tollPlazaCost?: number;
  isRoundTrip: boolean;
  passengersCount: number;
  customFuelPrice?: number;
}

export const vehicleMileageProfiles: Record<string, { label: string; kmPerLitre: number; defaultFuel: string }> = {
  bike_70: { label: '70cc Motorbike (CD70 / United)', kmPerLitre: 50, defaultFuel: 'petrol' },
  bike_125: { label: '125cc / 150cc Bike (CG125 / YBR)', kmPerLitre: 42, defaultFuel: 'petrol' },
  rickshaw: { label: 'CNG Auto Rickshaw / Qingqi', kmPerLitre: 24, defaultFuel: 'cng' },
  car_1000cc: { label: 'Small Hatchback (Alto, Cultus, WagonR, Mira)', kmPerLitre: 17.5, defaultFuel: 'petrol' },
  sedan_1500cc: { label: 'Compact Sedan (City, Yaris, Alsvin 1.3-1.5L)', kmPerLitre: 14.0, defaultFuel: 'petrol' },
  sedan_1800cc: { label: 'Executive Sedan (Civic, Corolla Grande 1.8L)', kmPerLitre: 11.2, defaultFuel: 'petrol' },
  suv: { label: 'Crossover / Compact SUV (Sportage, Tucson, Oshan)', kmPerLitre: 9.8, defaultFuel: 'petrol' },
  prado_v8: { label: 'Full Size 4x4 (Fortuner, Prado, Land Cruiser V8)', kmPerLitre: 7.2, defaultFuel: 'petrol' },
  hiace_diesel: { label: 'Commercial Passenger Van / Hiace (Diesel)', kmPerLitre: 8.5, defaultFuel: 'diesel' },
};

export const popularRoutes = [
  { id: 'lahore_islamabad_m2', name: 'Lahore to Islamabad via M-2 Motorway', distanceKm: 375, tollCar: 1100, tollVan: 1600 },
  { id: 'karachi_hyderabad_m9', name: 'Karachi to Hyderabad via M-9 Motorway', distanceKm: 162, tollCar: 500, tollVan: 750 },
  { id: 'islamabad_peshawar_m1', name: 'Islamabad to Peshawar via M-1 Motorway', distanceKm: 178, tollCar: 550, tollVan: 800 },
  { id: 'lahore_multan_m3', name: 'Lahore to Multan via M-3 Motorway', distanceKm: 238, tollCar: 800, tollVan: 1200 },
  { id: 'multan_sukkur_m5', name: 'Multan to Sukkur via M-5 Motorway', distanceKm: 392, tollCar: 1300, tollVan: 1950 },
  { id: 'lahore_faisalabad_m4', name: 'Lahore to Faisalabad via M-4 / M-3', distanceKm: 184, tollCar: 600, tollVan: 900 },
  { id: 'lahore_karachi_gt_m', name: 'Lahore to Karachi (Complete Highway/M-5)', distanceKm: 1240, tollCar: 3800, tollVan: 5500 },
];

export function calculateFuelTrip(input: FuelTripInput) {
  const profile = vehicleMileageProfiles[input.vehicleCategory] || vehicleMileageProfiles.car_1000cc;
  
  // Base mileage adjustment for AC
  let effectiveKmPerLitre = profile.kmPerLitre;
  if (input.acEnabled) {
    // Air conditioning reduces efficiency by ~12%
    effectiveKmPerLitre = effectiveKmPerLitre * 0.88;
  }

  const multiplier = input.isRoundTrip ? 2 : 1;
  const totalTripDistance = input.distanceKm * multiplier;

  // Determine fuel unit price
  let fuelRate = 281.40; // Default Petrol
  if (input.customFuelPrice && input.customFuelPrice > 0) {
    fuelRate = input.customFuelPrice;
  } else {
    const petrolItem = fuelRates.find((f) => f.id === 'petrol');
    const dieselItem = fuelRates.find((f) => f.id === 'diesel');
    if (input.fuelType === 'diesel' && dieselItem) {
      fuelRate = dieselItem.currentPrice;
    } else if (input.fuelType === 'cng') {
      fuelRate = 220.0; // CNG per kg average
    } else if (input.fuelType === 'lpg') {
      fuelRate = 258.0;
    } else if (petrolItem) {
      fuelRate = petrolItem.currentPrice;
    }
  }

  const litresNeeded = totalTripDistance / effectiveKmPerLitre;
  const fuelCostTotal = litresNeeded * fuelRate;
  const tollCostTotal = (input.tollPlazaCost || 0) * multiplier;
  const grandTotalCost = fuelCostTotal + tollCostTotal;
  const passengers = Math.max(1, input.passengersCount || 1);
  const costPerPerson = grandTotalCost / passengers;
  const costPerKm = grandTotalCost / totalTripDistance;

  return {
    vehicleLabel: profile.label,
    totalDistanceKm: totalTripDistance,
    isRoundTrip: input.isRoundTrip,
    effectiveKmPerLitre: Number(effectiveKmPerLitre.toFixed(2)),
    acPenaltyApplied: input.acEnabled,
    fuelUnitPrice: fuelRate,
    fuelRequiredLitres: Number(litresNeeded.toFixed(2)),
    totalFuelCost: Math.round(fuelCostTotal),
    totalTollTax: Math.round(tollCostTotal),
    grandTotalCost: Math.round(grandTotalCost),
    costPerPassenger: Math.round(costPerPerson),
    costPerKm: Number(costPerKm.toFixed(2)),
    passengers,
  };
}

// --- 3. WAPDA / DISCOs Electricity Bill Estimator ---
export interface ElectricityBillInput {
  disco: string; // 'LESCO', 'IESCO', 'KELECTRIC', 'FESCO', 'GEPCO', 'MEPCO', 'PESCO', 'HESCO', 'QESCO', 'SEPCO'
  unitsConsumed: number;
  isProtected: boolean;
  meterPhase: 'single' | 'three_phase';
  peakUnits?: number; // For 3-phase TOU meters
  offPeakUnits?: number;
  isFiler: boolean;
}

export function calculateElectricityBill(input: ElectricityBillInput) {
  let baseEnergyCharges = 0;
  const units = input.unitsConsumed;

  // NEPRA Tariff calculation for Residential
  if (input.meterPhase === 'three_phase' && (input.peakUnits || input.offPeakUnits)) {
    const peak = input.peakUnits || 0;
    const offPeak = input.offPeakUnits || 0;
    const peakRate = 41.89;
    const offPeakRate = 35.57;
    baseEnergyCharges = peak * peakRate + offPeak * offPeakRate;
  } else if (input.isProtected && units <= 200) {
    // Protected domestic consumer slabs
    if (units <= 50) {
      baseEnergyCharges = units * 3.95;
    } else if (units <= 100) {
      baseEnergyCharges = 50 * 3.95 + (units - 50) * 7.74;
    } else {
      baseEnergyCharges = 50 * 3.95 + 50 * 7.74 + (units - 100) * 10.06;
    }
  } else {
    // Unprotected domestic slabs (Progressive billing in Pakistan)
    if (units <= 100) {
      baseEnergyCharges = units * 16.48;
    } else if (units <= 200) {
      baseEnergyCharges = units * 22.95;
    } else if (units <= 300) {
      baseEnergyCharges = units * 27.14;
    } else if (units <= 400) {
      baseEnergyCharges = units * 32.03;
    } else if (units <= 500) {
      baseEnergyCharges = units * 35.24;
    } else if (units <= 600) {
      baseEnergyCharges = units * 36.66;
    } else if (units <= 700) {
      baseEnergyCharges = units * 37.80;
    } else {
      baseEnergyCharges = units * 42.72;
    }
  }

  // Surcharges & Adjustments
  const fcaRatePerUnit = 3.41; // Fuel Charges Adjustment (FCA)
  const qtaRatePerUnit = 1.75; // Quarterly Tariff Adjustment (QTA)
  const fcSurchargeRatePerUnit = 3.23; // Debt Financing Surcharge

  const fcaAmount = units * fcaRatePerUnit;
  const qtaAmount = units * qtaRatePerUnit;
  const fcSurcharge = units * fcSurchargeRatePerUnit;

  // Electricity Duty (ED) @ 1.5% of base energy
  const electricityDuty = baseEnergyCharges * 0.015;

  // PTV / TV Fee fixed in Pakistan
  const tvFee = 35.0;

  // Subtotal before GST
  const subTotalBeforeTax = baseEnergyCharges + fcaAmount + qtaAmount + fcSurcharge + electricityDuty;

  // General Sales Tax (GST) @ 18%
  const gst = subTotalBeforeTax * 0.18;

  // FBR Advance Income Tax under Section 235:
  // 7.5% applicable on domestic non-filers when bill exceeds PKR 25,000 (0% for active filers)
  const estimatedBillBeforeFBR = subTotalBeforeTax + tvFee + gst;
  let fbrAdvanceTax = 0;
  if (!input.isFiler && estimatedBillBeforeFBR > 25000) {
    fbrAdvanceTax = estimatedBillBeforeFBR * 0.075;
  }

  const grandTotal = Math.round(estimatedBillBeforeFBR + fbrAdvanceTax);

  return {
    disco: input.disco,
    unitsConsumed: units,
    isProtected: input.isProtected && units <= 200,
    baseEnergyCharges: Math.round(baseEnergyCharges),
    fcaCharges: Math.round(fcaAmount),
    qtaCharges: Math.round(qtaAmount),
    fcSurcharge: Math.round(fcSurcharge),
    electricityDuty: Math.round(electricityDuty),
    tvFee: tvFee,
    gst18Percent: Math.round(gst),
    fbrSection235Tax: Math.round(fbrAdvanceTax),
    isFiler: input.isFiler,
    grandTotalBill: grandTotal,
    effectiveUnitCost: units > 0 ? Number((grandTotal / units).toFixed(2)) : 0,
    savingTip:
      units > 200 && input.isProtected
        ? 'Warning: Consumption exceeded 200 units, forfeiting Protected Consumer status for the next 6 cycles.'
        : units <= 200
        ? 'Protected Consumer Status active. Keep below 200 kWh to maintain subsidised lifeline tariff.'
        : 'High slab active. Conserving peak hours (6pm-10pm) can save up to 25% on your monthly bill.',
  };
}

// --- 4. FBR Income Tax Slabs Processor (Finance Act) ---
export interface FBRTaxInput {
  incomePeriod: 'monthly' | 'annual';
  taxableIncome: number;
  employmentType: 'salaried' | 'business';
}

export function calculateFBRTax(input: FBRTaxInput) {
  let annualIncome = 0;
  if (input.incomePeriod === 'monthly') {
    annualIncome = input.taxableIncome * 12;
  } else {
    annualIncome = input.taxableIncome;
  }

  let annualTax = 0;
  let taxBracketDescription = '';

  if (input.employmentType === 'salaried') {
    // Finance Act Salaried Slabs
    if (annualIncome <= 600000) {
      annualTax = 0;
      taxBracketDescription = 'Up to PKR 600,000 (0% Tax Free)';
    } else if (annualIncome <= 1200000) {
      annualTax = (annualIncome - 600000) * 0.05;
      taxBracketDescription = 'PKR 600,001 to 1,200,000 (5% on excess over 600k)';
    } else if (annualIncome <= 2200000) {
      annualTax = 30000 + (annualIncome - 1200000) * 0.15;
      taxBracketDescription = 'PKR 1,200,001 to 2,200,000 (PKR 30,000 + 15% on excess)';
    } else if (annualIncome <= 3200000) {
      annualTax = 180000 + (annualIncome - 2200000) * 0.25;
      taxBracketDescription = 'PKR 2,200,001 to 3,200,000 (PKR 180,000 + 25% on excess)';
    } else if (annualIncome <= 4100000) {
      annualTax = 430000 + (annualIncome - 3200000) * 0.30;
      taxBracketDescription = 'PKR 3,200,001 to 4,100,000 (PKR 430,000 + 30% on excess)';
    } else {
      annualTax = 700000 + (annualIncome - 4100000) * 0.35;
      taxBracketDescription = 'Above PKR 4,100,000 (PKR 700,000 + 35% on excess)';
    }
  } else {
    // Non-Salaried Individual / AOP Business Slabs
    if (annualIncome <= 600000) {
      annualTax = 0;
      taxBracketDescription = 'Up to PKR 600,000 (0% Tax Free)';
    } else if (annualIncome <= 1200000) {
      annualTax = (annualIncome - 600000) * 0.15;
      taxBracketDescription = 'PKR 600,001 to 1,200,000 (15% on excess)';
    } else if (annualIncome <= 1600000) {
      annualTax = 90000 + (annualIncome - 1200000) * 0.20;
      taxBracketDescription = 'PKR 1,200,001 to 1,600,000 (PKR 90,000 + 20% on excess)';
    } else if (annualIncome <= 3200000) {
      annualTax = 170000 + (annualIncome - 1600000) * 0.30;
      taxBracketDescription = 'PKR 1,600,001 to 3,200,000 (PKR 170,000 + 30% on excess)';
    } else if (annualIncome <= 5600000) {
      annualTax = 650000 + (annualIncome - 3200000) * 0.40;
      taxBracketDescription = 'PKR 3,200,001 to 5,600,000 (PKR 650,000 + 40% on excess)';
    } else {
      annualTax = 1610000 + (annualIncome - 5600000) * 0.45;
      taxBracketDescription = 'Above PKR 5,600,000 (PKR 1,610,000 + 45% on excess)';
    }
  }

  // Super Tax / Surcharge on high income (> PKR 10 Million) @ 10% of income tax
  let highIncomeSurcharge = 0;
  if (annualIncome > 10000000) {
    highIncomeSurcharge = annualTax * 0.10;
  }

  const totalAnnualTax = annualTax + highIncomeSurcharge;
  const monthlyTax = totalAnnualTax / 12;
  const monthlyGross = annualIncome / 12;
  const monthlyNet = monthlyGross - monthlyTax;
  const effectiveTaxRate = annualIncome > 0 ? (totalAnnualTax / annualIncome) * 100 : 0;

  return {
    annualGrossIncome: Math.round(annualIncome),
    monthlyGrossIncome: Math.round(monthlyGross),
    employmentType: input.employmentType,
    taxBracket: taxBracketDescription,
    baseAnnualTax: Math.round(annualTax),
    highIncomeSurcharge: Math.round(highIncomeSurcharge),
    totalAnnualTax: Math.round(totalAnnualTax),
    monthlyTaxDeduction: Math.round(monthlyTax),
    monthlyNetTakeHome: Math.round(monthlyNet),
    effectiveTaxRatePercent: Number(effectiveTaxRate.toFixed(2)),
  };
}

// --- 5. Construction Cost Calculator (Pakistan Real Estate) ---
export interface ConstructionInput {
  plotSize: '3marla' | '5marla' | '10marla' | '1kanal' | 'custom';
  coveredAreaSqFt: number;
  finishQuality: 'grey' | 'standard_a' | 'premium_plus' | 'luxury';
  city: 'Lahore' | 'Karachi' | 'Islamabad' | 'Rawalpindi' | 'Faisalabad' | 'Peshawar';
}

export function calculateConstructionCost(input: ConstructionInput) {
  const coveredArea = input.coveredAreaSqFt || 2000;

  // Rate benchmarks in Pakistan (per sq ft)
  // Grey Structure ~ Rs. 2,600 to 2,900/sq ft
  // Standard A ~ Rs. 4,800 to 5,200/sq ft
  // Premium A+ ~ Rs. 6,400 to 6,900/sq ft
  // Luxury Executive ~ Rs. 8,200 to 9,000/sq ft
  const ratePerSqFtMap: Record<string, number> = {
    grey: 2750,
    standard_a: 5050,
    premium_plus: 6650,
    luxury: 8600,
  };

  const ratePerSqFt = ratePerSqFtMap[input.finishQuality] || 5050;
  const totalEstimatedCost = coveredArea * ratePerSqFt;

  // Bill of Quantities (BOQ) standard engineering formulas for Pakistan
  // Bricks ~ 27 bricks per sq ft covered
  const bricksCount = Math.round(coveredArea * 26);
  const brickUnitPrice = 14.0;
  const bricksTotal = bricksCount * brickUnitPrice;

  // Cement ~ 0.42 bags per sq ft
  const cementBagsCount = Math.round(coveredArea * 0.42);
  const cementBagPrice = 1420;
  const cementTotal = cementBagsCount * cementBagPrice;

  // Steel (Grade-60 TMT sarya) ~ 3.4 kg per sq ft -> convert to metric tons
  const steelKg = coveredArea * 3.4;
  const steelTons = Number((steelKg / 1000).toFixed(2));
  const steelPricePerTon = 260000;
  const steelTotal = steelTons * steelPricePerTon;

  // Sand (Chenab & Ravi) and Crush (Margalla / Sargodha)
  const sandAndCrushCost = Math.round(coveredArea * 380);

  // Labour Contractor cost
  const labourRatePerSqFt = input.finishQuality === 'grey' ? 460 : 780;
  const labourTotal = Math.round(coveredArea * labourRatePerSqFt);

  // Finishing materials (Plumbing, Electrical, Tile/Marble, Woodwork, Paint)
  let finishingCost = 0;
  if (input.finishQuality !== 'grey') {
    finishingCost = totalEstimatedCost - (bricksTotal + cementTotal + steelTotal + sandAndCrushCost + labourTotal);
  }

  return {
    plotSize: input.plotSize,
    coveredAreaSqFt: coveredArea,
    finishQuality: input.finishQuality,
    city: input.city,
    ratePerSqFt: ratePerSqFt,
    totalEstimatedCostPKR: Math.round(totalEstimatedCost),
    itemizedBOQ: {
      bricks: { count: bricksCount, unitPrice: brickUnitPrice, totalPKR: Math.round(bricksTotal) },
      cement: { bags: cementBagsCount, unitPrice: cementBagPrice, totalPKR: Math.round(cementTotal) },
      steel: { tons: steelTons, pricePerTon: steelPricePerTon, totalPKR: Math.round(steelTotal) },
      sandAndCrush: { totalPKR: sandAndCrushCost },
      labour: { ratePerSqFt: labourRatePerSqFt, totalPKR: labourTotal },
      finishingAndFittings: { totalPKR: Math.max(0, Math.round(finishingCost)) },
    },
  };
}
