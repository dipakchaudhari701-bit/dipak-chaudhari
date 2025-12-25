
import { PlasticMaterial } from './types';

export const PLASTICS: PlasticMaterial[] = [
  // COMMODITY PLASTICS
  {
    id: 'pet',
    name: 'PET / PETE',
    fullName: 'Polyethylene Terephthalate',
    recyclingCode: 1,
    description: 'The most common plastic for single-use bottled beverages, PET is clear, strong, and has good gas and moisture barrier properties.',
    properties: {
      density: '1.38',
      meltingPoint: '250-260',
      chemicalResistance: 'Good',
      flexibility: 3,
      transparency: 'High',
    },
    mechanical: {
      tensileStrength: '55-75',
      flexuralModulus: '2.8-3.1',
      hardness: 'R105',
      impactStrength: '15-50'
    },
    injectionMolding: {
      shrinkage: '0.2 - 0.5%',
      meltTemp: '255 - 275',
      moldTemp: '120 - 140',
      draftAngle: '1.0°',
      abrasive: 'No',
      moistureSensitive: 'Critical'
    },
    costing: {
      priceRange: [92, 128],
      marketTrend: 'Stable',
      volatility: 'Medium',
      primaryCostDrivers: ['Crude Oil', 'Reliance Industries Supply', 'Beverage Industry Demand']
    },
    commonUses: ['Beverage bottles', 'Food jars', 'Synthetic fibers (polyester)', 'Salad dressing containers'],
    recyclability: 'Highly Recyclable',
    environmentalImpact: 'Widely accepted in curbside recycling. Often downcycled into fleece or carpet fiber.',
    color: 'bg-blue-500'
  },
  {
    id: 'hdpe',
    name: 'HDPE',
    fullName: 'High-Density Polyethylene',
    recyclingCode: 2,
    description: 'A versatile plastic with good chemical resistance. It is tough, relatively rigid, and has excellent moisture barrier properties.',
    properties: {
      density: '0.94-0.97',
      meltingPoint: '120-130',
      chemicalResistance: 'Excellent',
      flexibility: 4,
      transparency: 'Low',
    },
    mechanical: {
      tensileStrength: '20-32',
      flexuralModulus: '0.6-1.4',
      hardness: 'D60-70',
      impactStrength: '20-200'
    },
    injectionMolding: {
      shrinkage: '1.5 - 3.0%',
      meltTemp: '200 - 280',
      moldTemp: '10 - 60',
      draftAngle: '1.5° - 2.0°',
      abrasive: 'No',
      moistureSensitive: 'No'
    },
    costing: {
      priceRange: [112, 158],
      marketTrend: 'Rising',
      volatility: 'Low',
      primaryCostDrivers: ['Natural Gas', 'Ethylene Import Duties', 'Agricultural Pipe Demand']
    },
    commonUses: ['Milk jugs', 'Detergent bottles', 'Shampoo bottles', 'Piping', 'Buckets'],
    recyclability: 'Highly Recyclable',
    environmentalImpact: 'Very stable, does not leach chemicals easily. Widely recycled into crates, lumber, and bins.',
    color: 'bg-green-600'
  },
  {
    id: 'pvc',
    name: 'PVC',
    fullName: 'Polyvinyl Chloride',
    recyclingCode: 3,
    description: 'A tough and durable plastic that can be rigid or flexible. It has excellent chemical resistance and weatherability.',
    properties: {
      density: '1.3-1.45',
      meltingPoint: '100-260',
      chemicalResistance: 'Excellent',
      flexibility: 2,
      transparency: 'Medium',
    },
    mechanical: {
      tensileStrength: '35-50',
      flexuralModulus: '2.4-3.5',
      hardness: 'D75-85',
      impactStrength: '35-500'
    },
    injectionMolding: {
      shrinkage: '0.1 - 0.5%',
      meltTemp: '170 - 210',
      moldTemp: '20 - 50',
      draftAngle: '0.5° - 1.0°',
      abrasive: 'Corrosive',
      moistureSensitive: 'No'
    },
    costing: {
      priceRange: [78, 115],
      marketTrend: 'Stable',
      volatility: 'High',
      primaryCostDrivers: ['Chlorine Pricing', 'Indian Real Estate Demand', 'Energy Costs']
    },
    commonUses: ['Rigid pipes', 'Window frames', 'Cable insulation', 'Medical tubing', 'Siding'],
    recyclability: 'Hard to Recycle',
    environmentalImpact: 'Contains chlorine and can release toxic dioxins if burned. Difficult to recycle curbside.',
    color: 'bg-red-500'
  },
  {
    id: 'ldpe',
    name: 'LDPE',
    fullName: 'Low-Density Polyethylene',
    recyclingCode: 4,
    description: 'A flexible and tough plastic often used for bags and films. It has good clarity and is easy to process.',
    properties: {
      density: '0.91-0.94',
      meltingPoint: '105-115',
      chemicalResistance: 'Good',
      flexibility: 9,
      transparency: 'High',
    },
    mechanical: {
      tensileStrength: '8-12',
      flexuralModulus: '0.1-0.3',
      hardness: 'D40-50',
      impactStrength: 'No break'
    },
    injectionMolding: {
      shrinkage: '1.5 - 3.5%',
      meltTemp: '180 - 240',
      moldTemp: '10 - 50',
      draftAngle: '1.5° - 2.0°',
      abrasive: 'No',
      moistureSensitive: 'No'
    },
    costing: {
      priceRange: [125, 175],
      marketTrend: 'Stable',
      volatility: 'Medium',
      primaryCostDrivers: ['Crude Oil', 'E-commerce Expansion', 'Packaging Regulations']
    },
    commonUses: ['Plastic bags', 'Squeeze bottles', 'Cling wrap', 'Bread bags', 'Shrink wrap'],
    recyclability: 'Moderately Recyclable',
    environmentalImpact: 'Often requires specialized drop-off locations rather than standard curbside bins.',
    color: 'bg-teal-500'
  },
  {
    id: 'pp',
    name: 'PP',
    fullName: 'Polypropylene',
    recyclingCode: 5,
    description: 'Strong, heat-resistant, and chemically resistant. It is often used for containers that hold hot liquids or food.',
    properties: {
      density: '0.89-0.91',
      meltingPoint: '160-170',
      chemicalResistance: 'Excellent',
      flexibility: 5,
      transparency: 'Medium',
    },
    mechanical: {
      tensileStrength: '31-41',
      flexuralModulus: '1.2-1.7',
      hardness: 'R80-100',
      impactStrength: '20-100'
    },
    injectionMolding: {
      shrinkage: '1.0 - 2.5%',
      meltTemp: '200 - 280',
      moldTemp: '20 - 80',
      draftAngle: '1.0° - 2.0°',
      abrasive: 'No',
      moistureSensitive: 'No'
    },
    costing: {
      priceRange: [105, 145],
      marketTrend: 'Falling',
      volatility: 'Medium',
      primaryCostDrivers: ['Propylene Feedstock', 'Auto-Sector Growth in India', 'FMCG Packaging']
    },
    commonUses: ['Yogurt containers', 'Microwaveable food trays', 'Automotive parts', 'Bottle caps', 'Straws'],
    recyclability: 'Increasingly Recyclable',
    environmentalImpact: 'Growing acceptance in recycling programs. Good resistance to fatigue.',
    color: 'bg-orange-500'
  },
  {
    id: 'ps',
    name: 'PS',
    fullName: 'Polystyrene',
    recyclingCode: 6,
    description: 'Known as Styrofoam in its expanded form. It is lightweight, rigid, and provides good insulation.',
    properties: {
      density: '1.04-1.07',
      meltingPoint: '240',
      chemicalResistance: 'Poor',
      flexibility: 1,
      transparency: 'High',
    },
    mechanical: {
      tensileStrength: '35-55',
      flexuralModulus: '3.0-3.5',
      hardness: 'R110-120',
      impactStrength: '10-20'
    },
    injectionMolding: {
      shrinkage: '0.4 - 0.7%',
      meltTemp: '180 - 260',
      moldTemp: '10 - 60',
      draftAngle: '0.5°',
      abrasive: 'No',
      moistureSensitive: 'No'
    },
    costing: {
      priceRange: [135, 185],
      marketTrend: 'Rising',
      volatility: 'High',
      primaryCostDrivers: ['Benzene Pricing', 'Single-use Plastic Bans', 'Logistics Costs']
    },
    commonUses: ['Plastic cutlery', 'CD cases', 'Styrofoam packaging', 'Disposable plates/cups', 'Take-out containers'],
    recyclability: 'Difficult to Recycle',
    environmentalImpact: 'Breaks easily into small pieces (microplastics). Not commonly recycled curbside.',
    color: 'bg-gray-400'
  },

  // ENGINEERING AND HIGH PERFORMANCE
  {
    id: 'abs',
    name: 'ABS',
    fullName: 'Acrylonitrile Butadiene Styrene',
    recyclingCode: 7,
    description: 'Known for high impact resistance and rigidity. It is a preferred material for durable consumer goods.',
    properties: {
      density: '1.04-1.06',
      meltingPoint: '200-240',
      chemicalResistance: 'Fair',
      flexibility: 2,
      transparency: 'Opaque',
    },
    mechanical: {
      tensileStrength: '40-50',
      flexuralModulus: '2.1-2.4',
      hardness: 'R105-115',
      impactStrength: '200-400'
    },
    injectionMolding: {
      shrinkage: '0.4 - 0.7%',
      meltTemp: '220 - 260',
      moldTemp: '40 - 80',
      draftAngle: '1.0° - 1.5°',
      abrasive: 'No',
      moistureSensitive: 'Yes'
    },
    costing: {
      priceRange: [165, 230],
      marketTrend: 'Stable',
      volatility: 'Medium',
      primaryCostDrivers: ['Styrene monomer', 'Automotive production rates']
    },
    commonUses: ['LEGO bricks', 'Keyboard keys', 'Power tool housings', 'Automotive trim'],
    recyclability: 'Technical Recyclable',
    environmentalImpact: 'Petroleum-based, highly durable, and easily reground for reuse.',
    color: 'bg-yellow-600'
  },
  {
    id: 'pc',
    name: 'Polycarbonate (PC)',
    fullName: 'Polycarbonate',
    recyclingCode: 7,
    description: 'An exceptionally strong, transparent plastic known for extreme impact resistance and optical clarity.',
    properties: {
      density: '1.20',
      meltingPoint: '225-250',
      chemicalResistance: 'Fair',
      flexibility: 4,
      transparency: 'High',
    },
    mechanical: {
      tensileStrength: '60-70',
      flexuralModulus: '2.3-2.5',
      hardness: 'R115-125',
      impactStrength: '600-900'
    },
    injectionMolding: {
      shrinkage: '0.5 - 0.7%',
      meltTemp: '280 - 320',
      moldTemp: '80 - 120',
      draftAngle: '1.0° - 2.0°',
      abrasive: 'No',
      moistureSensitive: 'Critical'
    },
    costing: {
      priceRange: [280, 450],
      marketTrend: 'Stable',
      volatility: 'Low',
      primaryCostDrivers: ['Bisphenol A', 'Optical sector demand']
    },
    commonUses: ['Safety glasses', 'Medical devices', 'Electronic screens', 'Bulletproof glass'],
    recyclability: 'Recyclable',
    environmentalImpact: 'Requires high energy to produce. Very durable, reducing replacement cycles.',
    color: 'bg-indigo-400'
  },
  {
    id: 'nylon',
    name: 'Nylon (PA)',
    fullName: 'Polyamide',
    recyclingCode: 7,
    description: 'Strong and wear-resistant with low friction. Excellent for mechanical moving parts.',
    properties: {
      density: '1.13-1.15',
      meltingPoint: '220-265',
      chemicalResistance: 'Good',
      flexibility: 5,
      transparency: 'Medium',
    },
    mechanical: {
      tensileStrength: '70-90',
      flexuralModulus: '2.4-3.0',
      hardness: 'R110-120',
      impactStrength: '50-150'
    },
    injectionMolding: {
      shrinkage: '0.7 - 2.0%',
      meltTemp: '230 - 300',
      moldTemp: '70 - 100',
      draftAngle: '0.5° - 1.0°',
      abrasive: 'No',
      moistureSensitive: 'Critical'
    },
    costing: {
      priceRange: [240, 380],
      marketTrend: 'Rising',
      volatility: 'Medium',
      primaryCostDrivers: ['Adipic acid', 'Textile demand']
    },
    commonUses: ['Gears', 'Bushings', 'Textiles', 'Zip ties'],
    recyclability: 'Recyclable',
    environmentalImpact: 'Hygroscopic (absorbs water), which can affect dimensional stability.',
    color: 'bg-amber-700'
  },
  {
    id: 'pom',
    name: 'POM / Acetal',
    fullName: 'Polyoxymethylene',
    recyclingCode: 7,
    description: 'A stiff, low-friction plastic used for precision parts that require high dimensional stability.',
    properties: {
      density: '1.41-1.43',
      meltingPoint: '165-175',
      chemicalResistance: 'Excellent',
      flexibility: 2,
      transparency: 'Opaque',
    },
    mechanical: {
      tensileStrength: '60-70',
      flexuralModulus: '2.5-3.0',
      hardness: 'R120',
      impactStrength: '50-100'
    },
    injectionMolding: {
      shrinkage: '1.8 - 2.2%',
      meltTemp: '180 - 210',
      moldTemp: '80 - 105',
      draftAngle: '0.5° - 1.0°',
      abrasive: 'No',
      moistureSensitive: 'No'
    },
    costing: {
      priceRange: [210, 310],
      marketTrend: 'Stable',
      volatility: 'Low',
      primaryCostDrivers: ['Methanol feedstock']
    },
    commonUses: ['Small gears', 'Zippers', 'Precision valves', 'Bearings'],
    recyclability: 'Limited',
    environmentalImpact: 'Difficult to recycle due to potential formaldehyde gas release during processing.',
    color: 'bg-zinc-600'
  },
  {
    id: 'ptfe',
    name: 'PTFE (Teflon)',
    fullName: 'Polytetrafluoroethylene',
    recyclingCode: 7,
    description: 'Extremely low friction and chemically inert. It maintains performance in extreme chemical environments.',
    properties: {
      density: '2.15-2.20',
      meltingPoint: '327',
      chemicalResistance: 'Excellent',
      flexibility: 8,
      transparency: 'Opaque',
    },
    mechanical: {
      tensileStrength: '20-35',
      flexuralModulus: '0.5-0.7',
      hardness: 'D50-60',
      impactStrength: '150-160'
    },
    injectionMolding: {
      shrinkage: 'N/A (Sintered)',
      meltTemp: '330 - 380',
      moldTemp: 'N/A',
      draftAngle: 'N/A',
      abrasive: 'No',
      moistureSensitive: 'No'
    },
    costing: {
      priceRange: [850, 1600],
      marketTrend: 'Rising',
      volatility: 'High',
      primaryCostDrivers: ['Fluorspar supply', 'Energy intensive processing']
    },
    commonUses: ['Non-stick coatings', 'Industrial gaskets', 'Chemical tubing', 'Plumber\'s tape'],
    recyclability: 'Very Difficult',
    environmentalImpact: 'Persistent in the environment (PFAS concerns). Requires specialized disposal.',
    color: 'bg-slate-300'
  },
  {
    id: 'peek',
    name: 'PEEK',
    fullName: 'Polyether Ether Ketone',
    recyclingCode: 7,
    description: 'A high-performance plastic that maintains strength at extreme temperatures and harsh chemical environments.',
    properties: {
      density: '1.30-1.32',
      meltingPoint: '343',
      chemicalResistance: 'Excellent',
      flexibility: 2,
      transparency: 'Opaque',
    },
    mechanical: {
      tensileStrength: '90-110',
      flexuralModulus: '3.7-4.2',
      hardness: 'R125',
      impactStrength: '80-100'
    },
    injectionMolding: {
      shrinkage: '1.2 - 1.4%',
      meltTemp: '360 - 400',
      moldTemp: '160 - 200',
      draftAngle: '1.5° - 2.0°',
      abrasive: 'No',
      moistureSensitive: 'No'
    },
    costing: {
      priceRange: [6500, 12000],
      marketTrend: 'Stable',
      volatility: 'Low',
      primaryCostDrivers: ['Specialized production', 'Aerospace demand']
    },
    commonUses: ['Aerospace parts', 'Medical implants', 'Oil/Gas valves', 'Engine components'],
    recyclability: 'Technical Recovery',
    environmentalImpact: 'High value prevents waste; exceptionally long service life.',
    color: 'bg-stone-800'
  },

  // THERMOSETTING PLASTICS
  {
    id: 'epoxy',
    name: 'Epoxy Resins',
    fullName: 'Thermoset Epoxy',
    recyclingCode: 7,
    description: 'Used for high-strength adhesives and composite materials. Once cured, they create permanent bonds.',
    properties: {
      density: '1.1-1.4',
      meltingPoint: 'N/A (Cured)',
      chemicalResistance: 'Excellent',
      flexibility: 1,
      transparency: 'Medium',
    },
    mechanical: {
      tensileStrength: '40-80',
      flexuralModulus: '3.0-4.5',
      hardness: 'D80-90',
      impactStrength: '20-50'
    },
    injectionMolding: {
      shrinkage: '0.1 - 0.2%',
      meltTemp: 'N/A',
      moldTemp: '60 - 150',
      draftAngle: '1.0°',
      abrasive: 'No',
      moistureSensitive: 'Critical'
    },
    costing: {
      priceRange: [350, 650],
      marketTrend: 'Rising',
      volatility: 'Medium',
      primaryCostDrivers: ['Resin precursors', 'Construction sector']
    },
    commonUses: ['High-strength adhesives', 'Coatings', 'Carbon fiber composites', 'Electronic potting'],
    recyclability: 'Non-recyclable',
    environmentalImpact: 'Permanent structure; research ongoing into chemical recycling.',
    color: 'bg-cyan-800'
  },
  {
    id: 'pu',
    name: 'PUR / TPU',
    fullName: 'Polyurethane',
    recyclingCode: 7,
    description: 'Extremely versatile, ranging from soft foams to high-wear industrial components.',
    properties: {
      density: '1.1-1.3',
      meltingPoint: '180-230',
      chemicalResistance: 'Good',
      flexibility: 8,
      transparency: 'Medium',
    },
    mechanical: {
      tensileStrength: '25-50',
      flexuralModulus: '0.1-1.2',
      hardness: 'A60-D80',
      impactStrength: 'No break'
    },
    injectionMolding: {
      shrinkage: '0.8 - 1.5%',
      meltTemp: '190 - 220',
      moldTemp: '20 - 50',
      draftAngle: '1.5° - 2.0°',
      abrasive: 'No',
      moistureSensitive: 'Yes'
    },
    costing: {
      priceRange: [280, 500],
      marketTrend: 'Stable',
      volatility: 'Medium',
      primaryCostDrivers: ['Isocyanates', 'Footwear sector']
    },
    commonUses: ['Flexible foams (mattresses)', 'Coatings', 'High-wear wheels', 'Shoe soles'],
    recyclability: 'Limited',
    environmentalImpact: 'Can be ground for use as industrial filler or carpet padding.',
    color: 'bg-lime-600'
  },
  {
    id: 'phenolic',
    name: 'Phenolic (Bakelite)',
    fullName: 'Phenol Formaldehyde',
    recyclingCode: 7,
    description: 'Highly heat-resistant material used for electrical components and high-heat applications.',
    properties: {
      density: '1.3-1.7',
      meltingPoint: 'N/A',
      chemicalResistance: 'Excellent',
      flexibility: 1,
      transparency: 'Opaque',
    },
    mechanical: {
      tensileStrength: '45-60',
      flexuralModulus: '7.0-9.0',
      hardness: 'R120-130',
      impactStrength: '15-25'
    },
    injectionMolding: {
      shrinkage: '0.4 - 0.8%',
      meltTemp: 'N/A',
      moldTemp: '150 - 180',
      draftAngle: '2.0°',
      abrasive: 'Yes',
      moistureSensitive: 'No'
    },
    costing: {
      priceRange: [180, 290],
      marketTrend: 'Stable',
      volatility: 'Low',
      primaryCostDrivers: ['Phenol costs']
    },
    commonUses: ['Electrical switches', 'Billiard balls', 'Cookware handles', 'Brake pads'],
    recyclability: 'Non-recyclable',
    environmentalImpact: 'Extreme durability; inert once cured.',
    color: 'bg-rose-950'
  },
  {
    id: 'silicone',
    name: 'Silicone',
    fullName: 'Polysiloxane',
    recyclingCode: 7,
    description: 'Heat-resistant elastomer used in medical and culinary applications due to its biocompatibility.',
    properties: {
      density: '1.1-1.5',
      meltingPoint: 'N/A',
      chemicalResistance: 'Excellent',
      flexibility: 10,
      transparency: 'High',
    },
    mechanical: {
      tensileStrength: '5-10',
      flexuralModulus: 'N/A',
      hardness: 'A20-80',
      impactStrength: 'No break'
    },
    injectionMolding: {
      shrinkage: '2.0 - 5.0%',
      meltTemp: 'N/A',
      moldTemp: '120 - 200',
      draftAngle: '0°',
      abrasive: 'No',
      moistureSensitive: 'No'
    },
    costing: {
      priceRange: [450, 950],
      marketTrend: 'Stable',
      volatility: 'Low',
      primaryCostDrivers: ['Silicon supply']
    },
    commonUses: ['Kitchenware', 'Medical implants', 'Sealants', 'High-temp gaskets'],
    recyclability: 'Downcyclable',
    environmentalImpact: 'Inert and biocompatible; safe for medical use.',
    color: 'bg-pink-400'
  }
];
