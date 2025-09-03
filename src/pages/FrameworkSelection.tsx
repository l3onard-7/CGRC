import React, { useState } from 'react';
import { Check, ChevronDown, ArrowRight } from 'lucide-react';
import { frameworks } from '../data/mockData';
import { Framework } from '../types';

interface FrameworkSelectionProps {
  onContinue: () => void;
}

export const FrameworkSelection: React.FC<FrameworkSelectionProps> = ({ onContinue }) => {
  const [selectedFrameworks, setSelectedFrameworks] = useState<Framework[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const categories = ['All', ...new Set(frameworks.map(f => f.category))];
  
  const filteredFrameworks = categoryFilter === 'All' 
    ? frameworks 
    : frameworks.filter(f => f.category === categoryFilter);

  const toggleFramework = (framework: Framework) => {
    setSelectedFrameworks(prev => {
      const exists = prev.find(f => f.id === framework.id);
      if (exists) {
        return prev.filter(f => f.id !== framework.id);
      } else {
        return [...prev, framework];
      }
    });
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Select Your Compliance Frameworks</h1>
          <p className="text-gray-600 text-lg">
            Choose the compliance frameworks that apply to your organization. Our AI will customize your workflow accordingly.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Framework Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredFrameworks.map((framework) => {
            const isSelected = selectedFrameworks.some(f => f.id === framework.id);
            
            return (
              <div
                key={framework.id}
                onClick={() => toggleFramework(framework)}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 shadow-sm'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{framework.name}</h3>
                    <p className="text-gray-600 text-sm">{framework.description}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {isSelected && <Check className="w-4 h-4 text-white" />}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {framework.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selection Summary & Continue */}
        {selectedFrameworks.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Selected Frameworks</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedFrameworks.map(framework => (
                    <span
                      key={framework.id}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {framework.name}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={onContinue}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center space-x-2 shadow-sm hover:shadow-md"
              >
                <span>Continue to Process Mapping</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};