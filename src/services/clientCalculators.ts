// Client-side execution bindings using the unified calculation engines

export {
  calculateGoldSimulator,
  calculateFuelTrip,
  calculateElectricityBill,
  calculateFBRTax,
  calculateConstructionCost,
  vehicleMileageProfiles,
  popularRoutes,
} from '../../server/services/calculators.js';

export {
  calculateSolarSystem,
  calculateZakat,
  calculateVehicleTax,
} from '../../server/services/extraCalculators.js';
