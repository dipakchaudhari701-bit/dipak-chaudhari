
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { PlasticMaterial } from '../types';

interface PropertyChartProps {
  material: PlasticMaterial;
}

const PropertyChart: React.FC<PropertyChartProps> = ({ material }) => {
  // Helper to normalize values for the radar (1-10 scale)
  const getStrengthScore = (m: PlasticMaterial) => {
    const val = parseFloat(m.mechanical.tensileStrength);
    if (isNaN(val)) return 5;
    return Math.min(10, Math.max(1, (val / 80) * 10));
  };

  const getHardnessScore = (m: PlasticMaterial) => {
    if (m.mechanical.hardness.startsWith('R')) return 8; // Rockwell R is generally hard
    if (m.mechanical.hardness.startsWith('D')) {
       const val = parseInt(m.mechanical.hardness.replace(/\D/g, ''));
       return (val / 100) * 10;
    }
    return 5;
  };

  const data = [
    { subject: 'Flexibility', A: material.properties.flexibility, fullMark: 10 },
    { subject: 'Transparency', A: material.properties.transparency === 'High' ? 10 : material.properties.transparency === 'Medium' ? 6 : material.properties.transparency === 'Low' ? 3 : 1, fullMark: 10 },
    { subject: 'Strength', A: getStrengthScore(material), fullMark: 10 },
    { subject: 'Resistance', A: material.properties.chemicalResistance === 'Excellent' ? 10 : material.properties.chemicalResistance === 'Good' ? 7 : material.properties.chemicalResistance === 'Fair' ? 4 : 2, fullMark: 10 },
    { subject: 'Recyclability', A: material.recyclingCode === 1 || material.recyclingCode === 2 ? 10 : material.recyclingCode === 5 ? 7 : material.recyclingCode === 4 ? 5 : 2, fullMark: 10 },
    { subject: 'Hardness', A: getHardnessScore(material), fullMark: 10 },
  ];

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" fontSize={10} fontWeight={600} />
          <PolarRadiusAxis angle={30} domain={[0, 10]} axisLine={false} tick={false} />
          <Radar
            name={material.name}
            dataKey="A"
            stroke="#4f46e5"
            fill="#6366f1"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PropertyChart;
