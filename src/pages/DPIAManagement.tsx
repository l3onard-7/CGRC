import React from 'react';
import { AlertTriangle, FileText, Upload, Plus, Calendar, ExternalLink } from 'lucide-react';
import { dpiaList } from '../data/mockData';
import { StatusBadge } from '../components/StatusBadge';
import { RiskBadge } from '../components/RiskBadge';

export const DPIAManagement: React.FC = () => {
  const overdueCount = dpiaList.filter(dpia => dpia.status === 'overdue').length;
  const missingCount = dpiaList.filter(dpia => dpia.status === 'missing').length;

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">DPIA Management</h1>
            <p className="text-gray-600 text-lg">
              Monitor and manage your Data Protection Impact Assessments
            </p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center space-x-2 shadow-sm">
            <Plus className="w-4 h-4" />
            <span>Create New DPIA</span>
          </button>
        </div>

        {/* Alert Banner */}
        {(overdueCount > 0 || missingCount > 0) && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <div>
                <p className="font-medium text-red-800">Attention Required</p>
                <p className="text-sm text-red-700">
                  {overdueCount > 0 && `${overdueCount} DPIA${overdueCount > 1 ? 's' : ''} overdue`}
                  {overdueCount > 0 && missingCount > 0 && ', '}
                  {missingCount > 0 && `${missingCount} DPIA${missingCount > 1 ? 's' : ''} missing`}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{dpiaList.length}</p>
                <p className="text-sm text-gray-600">Total DPIAs</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {dpiaList.filter(d => d.status === 'current').length}
                </p>
                <p className="text-sm text-gray-600">Up to Date</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{overdueCount}</p>
                <p className="text-sm text-gray-600">Overdue</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{missingCount}</p>
                <p className="text-sm text-gray-600">Missing</p>
              </div>
            </div>
          </div>
        </div>

        {/* DPIA Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">DPIA Overview</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Document Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Risk Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dpiaList.map((dpia) => (
                  <tr key={dpia.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <span className="font-medium text-gray-900">{dpia.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={dpia.status} size="sm" />
                    </td>
                    <td className="px-6 py-4">
                      <RiskBadge level={dpia.riskLevel.charAt(0).toUpperCase() + dpia.riskLevel.slice(1) as 'Low' | 'Medium' | 'High'} size="sm" />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {dpia.lastUpdated}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className={`text-sm ${
                          dpia.status === 'overdue' ? 'text-red-600 font-medium' : 'text-gray-600'
                        }`}>
                          {dpia.dueDate}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {dpia.status === 'missing' ? (
                          <>
                            <button className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-1">
                              <Plus className="w-3 h-3" />
                              <span>Create</span>
                            </button>
                            <button className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md text-sm hover:bg-gray-200 transition-colors duration-200 flex items-center space-x-1">
                              <Upload className="w-3 h-3" />
                              <span>Upload</span>
                            </button>
                          </>
                        ) : (
                          <>
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1">
                              <ExternalLink className="w-3 h-3" />
                              <span>View</span>
                            </button>
                            <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                              Edit
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 flex items-center space-x-3">
                <Plus className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-800">Create Bulk DPIAs</span>
              </button>
              <button className="w-full text-left px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200 flex items-center space-x-3">
                <Upload className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800">Upload Multiple Documents</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Deadlines</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium text-red-800">Employee HR Data</span>
                </div>
                <span className="text-xs text-red-600 font-medium">Past Due</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-800">Cloud Storage Migration</span>
                </div>
                <span className="text-xs text-yellow-600 font-medium">Due Jan 31</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};