
import React, { useState, useRef } from 'react';
import { Camera, RefreshCw, AlertCircle, Upload } from 'lucide-react';
import { identifyPlasticFromImage } from '../services/geminiService';

const IdentifyPlastic: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        handleAnalyze(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async (base64: string) => {
    setIsAnalyzing(true);
    setResult(null);
    const base64Data = base64.split(',')[1];
    const aiResult = await identifyPlasticFromImage(base64Data);
    setResult(aiResult);
    setIsAnalyzing(false);
  };

  const reset = () => {
    setImage(null);
    setResult(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Visual Plastic Identifier</h2>
        <p className="text-slate-500 mt-1">Upload a photo of an item or recycling code for AI analysis</p>
      </div>

      {!image ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-200 rounded-2xl h-64 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all group"
        >
          <div className="bg-indigo-100 p-4 rounded-full text-indigo-600 group-hover:scale-110 transition-transform">
            <Camera size={32} />
          </div>
          <span className="mt-4 font-medium text-slate-600">Select Image to Analyze</span>
          <span className="text-xs text-slate-400 mt-1">Supports JPEG, PNG</span>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-100">
            <img src={image} alt="Preview" className="w-full h-full object-contain" />
            {isAnalyzing && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center">
                <RefreshCw size={40} className="text-indigo-600 animate-spin" />
                <span className="mt-4 font-semibold text-indigo-700">AI Scientist is analyzing...</span>
              </div>
            )}
          </div>

          {result && (
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                  <AlertCircle size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-2">Analysis Result</h4>
                  <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">{result}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button 
              onClick={reset}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-slate-200 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <RefreshCw size={18} />
              Try Another
            </button>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600 rounded-xl font-semibold text-white hover:bg-indigo-700 shadow-md shadow-indigo-100 transition-all"
            >
              <Upload size={18} />
              Change Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdentifyPlastic;
