import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, Clock, AlertCircle, ChevronRight } from 'lucide-react';
import { processSteps } from '../data/mockData';
import { StatusBadge } from '../components/StatusBadge';
import { ProcessStep } from '../types';

export const ProcessMapping: React.FC = () => {
  const [steps, setSteps] = useState<ProcessStep[]>(processSteps);
  const [activeStep, setActiveStep] = useState<string | null>(null);

  const completedSteps = steps.filter(step => step.status === 'completed').length;
  const progressPercentage = Math.round((completedSteps / steps.length) * 100);

  const handleStepClick = (stepId: string) => {
    setActiveStep(activeStep === stepId ? null : stepId);
  };

  const handleFileUpload = (stepId: string) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId 
        ? { ...step, status: 'completed', hasDocument: true }
        : step
    ));
    alert('Document uploaded successfully!');
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Process Mapping</h1>
          <p className="text-gray-600 text-lg">
            Follow our guided workflow to complete your GDPR compliance requirements.
          </p>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Overall Progress</h2>
            <span className="text-2xl font-bold text-blue-600">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>{completedSteps} of {steps.length} steps completed</span>
            <span>Estimated completion: 2-3 weeks</span>
          </div>
        </div>

        {/* Process Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div 
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                onClick={() => handleStepClick(step.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {getStepIcon(step.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-sm font-medium text-gray-500">Step {index + 1}</span>
                        <StatusBadge status={step.status} size="sm" />
                        {step.required && (
                          <span className="text-xs text-red-600 font-medium">Required</span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  <ChevronRight 
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                      activeStep === step.id ? 'rotate-90' : ''
                    }`} 
                  />
                </div>
              </div>

              {/* Expanded Content */}
              {activeStep === step.id && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="pt-6">
                    {step.hasDocument ? (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="font-medium text-green-800">Document Available</p>
                            <p className="text-sm text-green-600">{step.documentType} has been uploaded</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <h4 className="font-medium text-blue-900 mb-2">Required: {step.documentType}</h4>
                          <p className="text-sm text-blue-700 mb-4">
                            Upload an existing document or complete our guided questionnaire to generate one.
                          </p>
                        </div>
                        
                        <div className="flex space-x-4">
                          <button
                            onClick={() => handleFileUpload(step.id)}
                            className="flex-1 bg-white border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group"
                          >
                            <div className="text-center">
                              <Upload className="w-8 h-8 text-gray-400 group-hover:text-blue-500 mx-auto mb-3" />
                              <p className="font-medium text-gray-700 group-hover:text-blue-700">Upload Existing Document</p>
                              <p className="text-sm text-gray-500">PDF, DOCX, or other formats</p>
                            </div>
                          </button>
                          
                          <button className="flex-1 bg-blue-600 text-white rounded-lg p-6 hover:bg-blue-700 transition-colors duration-200">
                            <div className="text-center">
                              <FileText className="w-8 h-8 text-blue-200 mx-auto mb-3" />
                              <p className="font-medium">Start Guided Questionnaire</p>
                              <p className="text-sm text-blue-200">AI-powered step-by-step process</p>
                            </div>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Next Steps */}
        <div className="mt-8 bg-gray-50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Next: DPIA Management</h3>
              <p className="text-gray-600">Review and manage your Data Protection Impact Assessments</p>
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center space-x-2">
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};