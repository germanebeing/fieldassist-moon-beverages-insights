
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, Filter, Users, TrendingUp, MapPin } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface UserHierarchyData {
  id: string;
  name: string;
  level: string;
  avgOutletScore: number;
  shareOfShelf: number;
  skuCount: number;
  planogramCompliance: number;
  mustSellCompliance: number;
  premiumSKUCompliance: number;
  assetScore: number;
  outletsCount: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState('ZSM');
  const [selectedUser, setSelectedUser] = useState('');
  const [dateRange, setDateRange] = useState('last-30-days');

  // Mock data with Indian names
  const hierarchyData: UserHierarchyData[] = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      level: 'ZSM',
      avgOutletScore: 87.5,
      shareOfShelf: 72.3,
      skuCount: 145,
      planogramCompliance: 89.2,
      mustSellCompliance: 91.7,
      premiumSKUCompliance: 78.4,
      assetScore: 85.1,
      outletsCount: 42
    },
    {
      id: '2',
      name: 'Priya Sharma',
      level: 'RSM',
      avgOutletScore: 82.1,
      shareOfShelf: 68.7,
      skuCount: 132,
      planogramCompliance: 85.6,
      mustSellCompliance: 88.3,
      premiumSKUCompliance: 74.9,
      assetScore: 81.2,
      outletsCount: 28
    },
    {
      id: '3',
      name: 'Amit Patel',
      level: 'ASM',
      avgOutletScore: 79.8,
      shareOfShelf: 65.2,
      skuCount: 118,
      planogramCompliance: 82.4,
      mustSellCompliance: 85.1,
      premiumSKUCompliance: 71.6,
      assetScore: 78.5,
      outletsCount: 15
    },
    {
      id: '4',
      name: 'Sneha Gupta',
      level: 'ASM',
      avgOutletScore: 84.3,
      shareOfShelf: 71.8,
      skuCount: 127,
      planogramCompliance: 87.9,
      mustSellCompliance: 89.6,
      premiumSKUCompliance: 76.2,
      assetScore: 83.4,
      outletsCount: 22
    }
  ];

  const handleViewOutlets = (userId: string, userName: string, level: string) => {
    navigate(`/outlets?userId=${userId}&userName=${userName}&level=${level}`);
  };

  // Chart data for performance overview
  const performanceChartData = hierarchyData.map(user => ({
    name: user.name.split(' ')[0],
    score: user.avgOutletScore,
    assets: user.assetScore,
    outlets: user.outletsCount
  }));

  const kpiDistributionData = [
    { name: 'Share of Shelf', value: 25, fill: '#3b82f6' },
    { name: 'SKU Count', value: 20, fill: '#60a5fa' },
    { name: 'Planogram', value: 25, fill: '#93c5fd' },
    { name: 'Must Sell', value: 15, fill: '#dbeafe' },
    { name: 'Premium SKU', value: 15, fill: '#1e40af' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <div className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-blue-900">FieldAssist</h1>
              <Badge variant="secondary" className="text-sm bg-blue-100 text-blue-800">Image Recognition Analytics</Badge>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-600">Client</p>
              <p className="text-lg font-semibold text-blue-900">Moon Beverages</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Filters Section */}
        <Card className="mb-8 border-blue-200 shadow-md">
          <CardHeader className="bg-blue-50">
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Filter className="h-5 w-5" />
              Scoring Engine Dashboard - Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="bg-white">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block text-blue-800">User Hierarchy Level</label>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="border-blue-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NSM">NSM (National Sales Manager)</SelectItem>
                    <SelectItem value="ZSM">ZSM (Zonal Sales Manager)</SelectItem>
                    <SelectItem value="RSM">RSM (Regional Sales Manager)</SelectItem>
                    <SelectItem value="ASM">ASM (Area Sales Manager)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block text-blue-800">Specific User</label>
                <Select value={selectedUser} onValueChange={setSelectedUser}>
                  <SelectTrigger className="border-blue-200">
                    <SelectValue placeholder="Select user (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rajesh-kumar">Rajesh Kumar (ZSM)</SelectItem>
                    <SelectItem value="priya-sharma">Priya Sharma (RSM)</SelectItem>
                    <SelectItem value="amit-patel">Amit Patel (ASM)</SelectItem>
                    <SelectItem value="sneha-gupta">Sneha Gupta (ASM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block text-blue-800">Date Range</label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="border-blue-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                    <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                    <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block text-blue-800">Geographic Filter</label>
                <Select>
                  <SelectTrigger className="border-blue-200">
                    <SelectValue placeholder="All Regions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="north">North Region</SelectItem>
                    <SelectItem value="south">South Region</SelectItem>
                    <SelectItem value="east">East Region</SelectItem>
                    <SelectItem value="west">West Region</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KPI Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-blue-200 shadow-md">
            <CardContent className="p-6 bg-gradient-to-r from-blue-50 to-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Avg Outlet Score</p>
                  <p className="text-2xl font-bold text-blue-900">83.1</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-blue-200 shadow-md">
            <CardContent className="p-6 bg-gradient-to-r from-blue-50 to-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Outlets</p>
                  <p className="text-2xl font-bold text-blue-900">107</p>
                </div>
                <MapPin className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-blue-200 shadow-md">
            <CardContent className="p-6 bg-gradient-to-r from-blue-50 to-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Avg Asset Score</p>
                  <p className="text-2xl font-bold text-blue-900">81.6</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-blue-200 shadow-md">
            <CardContent className="p-6 bg-gradient-to-r from-blue-50 to-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Compliance Rate</p>
                  <p className="text-2xl font-bold text-blue-900">85.7%</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="border-blue-200 shadow-md">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-blue-900">Performance Overview</CardTitle>
            </CardHeader>
            <CardContent className="bg-white">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" />
                  <XAxis dataKey="name" tick={{ fill: '#1e40af' }} />
                  <YAxis tick={{ fill: '#1e40af' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#eff6ff',
                      border: '1px solid #3b82f6',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="score" fill="#3b82f6" name="Outlet Score" />
                  <Bar dataKey="assets" fill="#60a5fa" name="Asset Score" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-blue-200 shadow-md">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-blue-900">KPI Weight Distribution</CardTitle>
            </CardHeader>
            <CardContent className="bg-white">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={kpiDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {kpiDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* User Hierarchy Performance */}
        <Card className="border-blue-200 shadow-md">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-blue-900">User Hierarchy Performance</CardTitle>
          </CardHeader>
          <CardContent className="bg-white">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-blue-200">
                    <th className="text-left p-4 font-medium text-blue-900">Name ({selectedLevel})</th>
                    <th className="text-left p-4 font-medium text-blue-900">Avg Outlet Score</th>
                    <th className="text-left p-4 font-medium text-blue-900">Share of Shelf</th>
                    <th className="text-left p-4 font-medium text-blue-900">SKU Count</th>
                    <th className="text-left p-4 font-medium text-blue-900">Planogram Compliance</th>
                    <th className="text-left p-4 font-medium text-blue-900">Must Sell Compliance</th>
                    <th className="text-left p-4 font-medium text-blue-900">Premium SKU Compliance</th>
                    <th className="text-left p-4 font-medium text-blue-900">Asset Score</th>
                    <th className="text-left p-4 font-medium text-blue-900">Outlets</th>
                    <th className="text-left p-4 font-medium text-blue-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {hierarchyData.map((user) => (
                    <tr key={user.id} className="border-b border-blue-100 hover:bg-blue-50">
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-blue-900">{user.name}</p>
                          <Badge variant="outline" className="text-xs border-blue-300 text-blue-700">{user.level}</Badge>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-blue-900">{user.avgOutletScore}%</span>
                          <div className="w-16 h-2 bg-blue-100 rounded-full">
                            <div 
                              className="h-2 bg-blue-500 rounded-full" 
                              style={{width: `${user.avgOutletScore}%`}}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-blue-800">{user.shareOfShelf}%</td>
                      <td className="p-4 text-blue-800">{user.skuCount}</td>
                      <td className="p-4">
                        <Badge variant={user.planogramCompliance > 85 ? "default" : "secondary"} 
                               className={user.planogramCompliance > 85 ? "bg-blue-600" : "bg-blue-300"}>
                          {user.planogramCompliance}%
                        </Badge>
                      </td>
                      <td className="p-4 text-blue-800">{user.mustSellCompliance}%</td>
                      <td className="p-4 text-blue-800">{user.premiumSKUCompliance}%</td>
                      <td className="p-4 text-blue-800">{user.assetScore}%</td>
                      <td className="p-4">
                        <Badge variant="outline" className="border-blue-300 text-blue-700">{user.outletsCount}</Badge>
                      </td>
                      <td className="p-4">
                        <Button 
                          size="sm" 
                          onClick={() => handleViewOutlets(user.id, user.name, user.level)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          View Outlets
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
