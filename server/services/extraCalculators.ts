// Extra Calculators: Solar System, Zakat, and Vehicle Excise

import { goldRates, silverRates } from '../data/ratesData.js';

// --- 1. Solar Panel System & Net-Metering ROI Calculator ---
export interface SolarCalcInput {
  monthlyUnits: number;
  systemType: 'on_grid' | 'hybrid' | 'off_grid';
  batteryPreference?: 'tubular' | 'lithium' | 'none';
  phase: 'single_phase' | 'three_phase';
}

export function calculateSolarSystem(input: SolarCalcInput) {
  const units = Math.max(50, input.monthlyUnits || 500);

  // In Pakistan, 1 kW PV capacity produces ~120 to 135 units (kWh) per month
  const rawKwNeeded = units / 125;

  // Round up to nearest standard inverter capacity
  const standardSizes = [3, 5, 6, 8, 10, 12, 15, 20, 25, 30];
  let recommendedKw = standardSizes.find((size) => size >= rawKwNeeded) || Math.ceil(rawKwNeeded);
  if (recommendedKw < 3) recommendedKw = 3;

  // Panel specifications: 580W N-Type Bifacial Tier-1
  const panelWattage = 580;
  const panelCount = Math.ceil((recommendedKw * 1000) / panelWattage);
  const actualSystemWatts = panelCount * panelWattage;
  const actualSystemKw = Number((actualSystemWatts / 1000).toFixed(2));

  // Area required: ~70 sq ft per kW
  const areaSqFt = Math.round(actualSystemKw * 72);

  // Cost breakdowns (PKR)
  const panelPricePerWatt = 41.5; // Benchmark market rate PKR/Watt (40.0 - 45.0/W)
  const panelsCost = Math.round(actualSystemWatts * panelPricePerWatt);

  // Inverter Cost
  let inverterCost = 0;
  if (input.systemType === 'on_grid') {
    // On-grid inverters (Huawei / Growatt / Solis / Sungrow) ~ Rs. 28,000 to 35,000 per kW
    inverterCost = Math.round(actualSystemKw * 28000 + 40000);
  } else if (input.systemType === 'hybrid') {
    // Hybrid inverters (Inverex Nitrox, Deye, Fronus) ~ Rs. 42,000 to 48,000 per kW
    inverterCost = Math.round(actualSystemKw * 44000 + 60000);
  } else {
    // Off-grid inverter
    inverterCost = Math.round(actualSystemKw * 38000 + 50000);
  }

  // Structure / Mounting Frames (L2/L3 Galvanized Iron) ~ Rs. 6,000 per panel
  const structureCost = panelCount * 5800;

  // Electrical accessories, DC DB, AC DB, Surge arrestors, pure copper cables ~ Rs. 14,000 per kW
  const electricalBOS = Math.round(actualSystemKw * 14000 + 25000);

  // Battery cost if applicable
  let batteryCost = 0;
  let batteryDescription = 'No battery (Direct Grid / Net-Metering)';
  if (input.systemType !== 'on_grid') {
    if (input.batteryPreference === 'lithium') {
      // Lithium LiFePO4 battery pack (5kWh to 10kWh)
      const kwhNeeded = Math.min(15, Math.max(5, Math.round(recommendedKw * 0.8)));
      batteryCost = kwhNeeded * 75000; // ~Rs. 75k per kWh
      batteryDescription = `${kwhNeeded} kWh LiFePO4 Wall-Mount Lithium Battery (10-Year Life)`;
    } else {
      // Tall Tubular Batteries (Phoenix / Osaka / Volta 230Ah)
      const numBatteries = recommendedKw <= 5 ? 2 : 4;
      batteryCost = numBatteries * 68000;
      batteryDescription = `${numBatteries}x 230Ah Deep Cycle Tall Tubular Batteries`;
    }
  }

  // Net Metering & DISCO Inspection Charges (for on-grid / hybrid 3-phase)
  const netMeteringCost = input.phase === 'three_phase' ? 145000 : 0;

  // Installation & Labour Turnkey
  const labourCost = Math.round(actualSystemKw * 7500 + 20000);

  const totalEstimatedCost = panelsCost + inverterCost + structureCost + electricalBOS + batteryCost + netMeteringCost + labourCost;

  // Financial ROI & Savings
  // Current average residential tariff across Pakistan slabs is ~Rs. 43/unit (inclusive of FCA + GST)
  const avgTariffPerUnit = 43.5;
  const estimatedMonthlyGenerationUnits = Math.round(actualSystemKw * 125);
  const monthlySavingsPKR = Math.round(Math.min(units, estimatedMonthlyGenerationUnits) * avgTariffPerUnit);
  const annualSavingsPKR = monthlySavingsPKR * 12;
  const paybackYears = Number((totalEstimatedCost / annualSavingsPKR).toFixed(1));
  const lifetime25YearSavings = Math.round(annualSavingsPKR * 25 - totalEstimatedCost);

  return {
    monthlyConsumptionUnits: units,
    systemType: input.systemType,
    phase: input.phase,
    recommendedKw,
    actualSystemKw,
    panelsCount: panelCount,
    panelSpecs: `${panelCount}x 580W Tier-1 N-Type Bifacial Mono-PERC Modules`,
    roofAreaRequiredSqFt: areaSqFt,
    batteryIncluded: input.systemType !== 'on_grid',
    batteryDescription,
    costBreakdown: {
      solarPanelsPKR: panelsCost,
      inverterPKR: inverterCost,
      mountingStructurePKR: structureCost,
      electricalBOSPKR: electricalBOS,
      batteryPKR: batteryCost,
      netMeteringLicensePKR: netMeteringCost,
      turnkeyInstallationPKR: labourCost,
      grandTotalPKR: totalEstimatedCost,
    },
    financialMetrics: {
      estimatedMonthlyGenerationUnits,
      monthlySavingsPKR,
      annualSavingsPKR,
      paybackYears,
      lifetime25YearSavingsPKR: lifetime25YearSavings,
    },
  };
}

// --- 2. Zakat Calculator (Live Gold & Silver Nisab) ---
export interface ZakatInput {
  nisabStandard: 'silver' | 'gold'; // Silver is recommended by contemporary scholars for mixed wealth
  cashInHandAndBank: number;
  goldValuePKR?: number;
  silverValuePKR?: number;
  tradeStockValue: number;
  sharesMutualFunds: number;
  receivableDebts: number;
  liabilitiesDueNow: number;
}

export function calculateZakat(input: ZakatInput) {
  // Nisab threshold constants:
  // Gold Nisab = 7.5 Tola (87.48 grams) of pure 24K gold
  // Silver Nisab = 52.5 Tola (612.36 grams) of pure silver
  const gold24kItem = goldRates.find((r) => r.carat.startsWith('24K'))!;
  const goldPricePerGram = gold24kItem.perTola / 11.664;
  const goldNisabValuePKR = Math.round(87.48 * goldPricePerGram);

  const silverPricePerGram = silverRates.perTola / 11.664;
  const silverNisabValuePKR = Math.round(612.36 * silverPricePerGram);

  const activeNisabThresholdPKR = input.nisabStandard === 'silver' ? silverNisabValuePKR : goldNisabValuePKR;

  // Assets sum
  const cash = Math.max(0, input.cashInHandAndBank || 0);
  const gold = Math.max(0, input.goldValuePKR || 0);
  const silver = Math.max(0, input.silverValuePKR || 0);
  const inventory = Math.max(0, input.tradeStockValue || 0);
  const investments = Math.max(0, input.sharesMutualFunds || 0);
  const receivables = Math.max(0, input.receivableDebts || 0);

  const totalZakatableAssets = cash + gold + silver + inventory + investments + receivables;

  // Liabilities
  const liabilities = Math.max(0, input.liabilitiesDueNow || 0);
  const netZakatableWealth = Math.max(0, totalZakatableAssets - liabilities);

  const isEligibleToPay = netZakatableWealth >= activeNisabThresholdPKR;
  const zakatPayablePKR = isEligibleToPay ? Math.round(netZakatableWealth * 0.025) : 0;

  return {
    nisabStandard: input.nisabStandard,
    goldNisabPKR: goldNisabValuePKR,
    silverNisabPKR: silverNisabValuePKR,
    activeNisabThresholdPKR,
    totalZakatableAssets: Math.round(totalZakatableAssets),
    deductibleLiabilities: Math.round(liabilities),
    netZakatableWealth: Math.round(netZakatableWealth),
    isEligibleToPay,
    zakatPayablePKR,
    guidance: isEligibleToPay
      ? `Your net wealth exceeds the ${input.nisabStandard.toUpperCase()} Nisab (Rs. ${activeNisabThresholdPKR.toLocaleString()}). Zakat is obligatory at 2.5%.`
      : `Your net wealth is below the active ${input.nisabStandard.toUpperCase()} Nisab threshold. No Zakat is currently obligatory.`,
  };
}

// --- 3. Vehicle Excise & Token Tax Estimator ---
export interface VehicleTaxInput {
  province: 'punjab' | 'sindh' | 'islamabad' | 'kpk';
  vehicleType: 'bike' | 'car';
  engineCc: number;
  isFiler: boolean;
  registrationStatus: 'annual_token' | 'new_registration' | 'ownership_transfer';
}

export function calculateVehicleTax(input: VehicleTaxInput) {
  const cc = Math.max(50, input.engineCc);
  const isFiler = input.isFiler;

  if (input.vehicleType === 'bike') {
    // Motorbike rules
    if (cc <= 100) {
      // 70cc to 100cc
      return {
        vehicleType: 'Motorcycle (70cc - 100cc)',
        engineCc: cc,
        province: input.province.toUpperCase(),
        isFiler,
        annualTokenTax: 1200,
        motorVehicleTax: 0,
        professionalTax: 200,
        totalPayablePKR: 1400,
        note: 'Lifetime token tax is standard for motorcycles under 100cc in most provinces.',
      };
    } else {
      // 125cc, 150cc, 250cc+
      return {
        vehicleType: 'Motorcycle / Heavy Bike (125cc+)',
        engineCc: cc,
        province: input.province.toUpperCase(),
        isFiler,
        annualTokenTax: isFiler ? 1800 : 3600,
        motorVehicleTax: 500,
        professionalTax: 200,
        totalPayablePKR: isFiler ? 2500 : 4300,
        note: 'Annual token tax applies for 125cc and higher capacity motorbikes.',
      };
    }
  }

  // Cars / SUVs
  let tokenTaxBase = 0;
  let incomeTaxWithholding = 0;
  let cleanGreenCess = 500;
  let professionalTax = 200;

  if (cc <= 1000) {
    // 660cc - 1000cc (Alto, WagonR, Cultus, Mira)
    tokenTaxBase = 1800;
    incomeTaxWithholding = isFiler ? 800 : 2500;
  } else if (cc <= 1300) {
    // 1001cc - 1300cc (Swift, City 1.2, Yaris 1.3)
    tokenTaxBase = 3000;
    incomeTaxWithholding = isFiler ? 1750 : 5000;
  } else if (cc <= 1500) {
    // 1301cc - 1500cc (City 1.5, Yaris 1.5, Alsvin 1.5)
    tokenTaxBase = 4500;
    incomeTaxWithholding = isFiler ? 2500 : 7500;
  } else if (cc <= 1800) {
    // 1501cc - 1800cc (Corolla, Civic 1.5T/1.8, Elantra)
    tokenTaxBase = 7500;
    incomeTaxWithholding = isFiler ? 4500 : 13500;
  } else if (cc <= 2000) {
    // 1801cc - 2000cc (Sportage, Tucson, Sonata 2.0)
    tokenTaxBase = 10000;
    incomeTaxWithholding = isFiler ? 6000 : 18000;
  } else if (cc <= 2500) {
    // 2001cc - 2500cc (Sonata 2.5, Camry)
    tokenTaxBase = 16000;
    incomeTaxWithholding = isFiler ? 9000 : 27000;
    cleanGreenCess = 1000;
  } else {
    // Above 2500cc (Fortuner 2.8, Prado 3.0/4.0, Land Cruiser V8)
    tokenTaxBase = 25000;
    incomeTaxWithholding = isFiler ? 15000 : 45000;
    cleanGreenCess = 2000;
  }

  // If new registration or ownership transfer
  let registrationWhtFee = 0;
  if (input.registrationStatus === 'new_registration') {
    if (cc <= 1000) registrationWhtFee = isFiler ? 50000 : 150000;
    else if (cc <= 1300) registrationWhtFee = isFiler ? 100000 : 300000;
    else if (cc <= 1600) registrationWhtFee = isFiler ? 150000 : 450000;
    else if (cc <= 1800) registrationWhtFee = isFiler ? 200000 : 600000;
    else if (cc <= 2000) registrationWhtFee = isFiler ? 250000 : 750000;
    else registrationWhtFee = isFiler ? 400000 : 1200000;
  } else if (input.registrationStatus === 'ownership_transfer') {
    registrationWhtFee = isFiler ? Math.round(tokenTaxBase * 1.5) : Math.round(tokenTaxBase * 3.5);
  }

  const grandTotal = tokenTaxBase + incomeTaxWithholding + cleanGreenCess + professionalTax + registrationWhtFee;

  return {
    vehicleType: `Motor Car (${cc}cc)`,
    engineCc: cc,
    province: input.province.toUpperCase(),
    isFiler,
    registrationStatus: input.registrationStatus,
    annualTokenTax: tokenTaxBase,
    advanceIncomeTaxWHT: incomeTaxWithholding,
    cleanGreenCess,
    professionalTax,
    registrationOrTransferWHT: registrationWhtFee,
    totalPayablePKR: grandTotal,
    filerSavings: !isFiler ? incomeTaxWithholding - Math.round(incomeTaxWithholding / 3) : 0,
    note: isFiler
      ? 'Active Filer discount applied. Standard withholding rate used.'
      : 'Non-Filer penalty rate applied (200% higher advance tax). Become an active filer on ATL to save.',
  };
}
