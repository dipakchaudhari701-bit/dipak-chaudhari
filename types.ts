
export interface PlasticMaterial {
  id: string;
  name: string;
  fullName: string;
  recyclingCode: number;
  description: string;
  properties: {
    density: string; // g/cm³
    meltingPoint: string; // °C
    chemicalResistance: 'Excellent' | 'Good' | 'Fair' | 'Poor';
    flexibility: number; // 1-10
    transparency: 'High' | 'Medium' | 'Low' | 'Opaque';
  };
  mechanical: {
    tensileStrength: string; // MPa
    flexuralModulus: string; // GPa
    hardness: string; // Shore D or Rockwell
    impactStrength: string; // J/m
  };
  injectionMolding: {
    shrinkage: string; // %
    meltTemp: string; // °C
    moldTemp: string; // °C
    draftAngle: string; // degrees
    abrasive: 'Yes' | 'No' | 'Corrosive';
    moistureSensitive: 'Yes' | 'No' | 'Critical';
  };
  costing: {
    priceRange: [number, number]; // [min, max] in INR/kg
    marketTrend: 'Rising' | 'Stable' | 'Falling';
    volatility: 'High' | 'Medium' | 'Low';
    primaryCostDrivers: string[];
  };
  commonUses: string[];
  recyclability: string;
  environmentalImpact: string;
  color: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export type ViewState = 'catalog' | 'detail' | 'chat' | 'identify' | 'index';
