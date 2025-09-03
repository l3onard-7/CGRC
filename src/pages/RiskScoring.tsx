import React, { useState } from 'react';
import { Edit3, Save, X, BarChart3, TrendingUp, AlertCircle } from 'lucide-react';
import { riskAssessments } from '../data/mockData';
import { RiskAssessment } from '../types';
import { RiskBadge } from '../components/RiskBadge';

export const RiskScoring: React.FC = () => {
  const [assessments, setAssessments] = useState<RiskAssessment[]>(riskAssessments);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingScore, setEditingScore] = useState<'Low' | 'Medium' | 'High'>('Low');
  const [editingNotes, setEditingNotes] = useState<string>('');

  const startEdit = (assessment: RiskAssessment) => {
    setEditingId(assessment.id);
    setEditingScore(assessment.dpoScore || assessment.aiScore);
    setEditingNotes(assessment.notes || '');
  };

  const saveEdit = () => {
    if (!editingId) return;

    setAssessments(prev => prev.map(assessment => 
      assessment.id === editingId
        ? {
            ...assessment,
            dpoScore: editingScore,
            notes: editingNotes,
            lastModified: new Date().toISOString().split('T')[0],
          }
        : assessment
    ));
    
    setEditingId(null);
    setEditingScore('Low');
    setEditingNotes('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingScore('Low');
    setEditingNotes('');
  };

  const highRiskCount = assessments.filter(a => (a.dpoScore || a.aiScore) === 'High').length;
  const mediumRiskCount = assessments.filter(a => (a.dpoScore || a.aiScore) === 'Medium').length;

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Risk Scoring & Assessment</h1>
          <p className="text-gray-600 text-lg">
            AI-generated risk assessments with DPO override capabilities and version history
          </p>
        </div>

        {/* Risk Overview Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{highRiskCount}</p>
                <p className="text-sm text-gray-600">High Risk Items</p>
              </div>
            </div>
            <p className="text-xs text-red-600 font-medium">Requires immediate attention</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{mediumRiskCount}</p>
                <p className="text-sm text-gray-600">Medium Risk Items</p>
              </div>
            </div>
            <p className="text-xs text-yellow-600 font-medium">Monitor and review</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round((assessments.filter(a => a.dpoScore).length / assessments.length) * 100)}%
                </p>
                <p className="text-sm text-gray-600">DPO Reviewed</p>
              </div>
            </div>
            <p className="text-xs text-blue-600 font-medium">Manual oversight coverage</p>
          </div>
        </div>

        {/* Risk Assessment Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Risk Assessment Details</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    AI Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    DPO Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Modified
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {assessments.map((assessment) => (
                  <tr key={assessment.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {assessment.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p className="text-sm text-gray-900 font-medium">{assessment.description}</p>
                        {assessment.notes && (
                          <p className="text-xs text-gray-500 mt-1">{assessment.notes}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <RiskBadge level={assessment.aiScore} size="sm" />
                    </td>
                    <td className="px-6 py-4">
                      {editingId === assessment.id ? (
                        <select
                          value={editingScore}
                          onChange={(e) => setEditingScore(e.target.value as 'Low' | 'Medium' | 'High')}
                          className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                      ) : (
                        assessment.dpoScore ? (
                          <RiskBadge level={assessment.dpoScore} size="sm" />
                        ) : (
                          <span className="text-sm text-gray-400">Not reviewed</span>
                        )
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {assessment.lastModified}
                    </td>
                    <td className="px-6 py-4">
                      {editingId === assessment.id ? (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={saveEdit}
                            className="text-green-600 hover:text-green-800 p-1"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="text-gray-400 hover:text-gray-600 p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEdit(assessment)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Editing Notes Panel */}
          {editingId && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <h3 className="text-sm font-medium text-gray-900 mb-3">DPO Notes</h3>
              <textarea
                value={editingNotes}
                onChange={(e) => setEditingNotes(e.target.value)}
                placeholder="Add notes about this risk assessment..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={3}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};