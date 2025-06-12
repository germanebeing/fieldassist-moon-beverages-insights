
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TrendingUp, Users, Eye, BarChart3 } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedHierarchy, setSelectedHierarchy] = useState('zsm');
  const [selectedTimeframe, setSelectedTimeframe] = useState('last-30-days');

  // Mock data with Indian names
  const hierarchyData = [
    { 
      name: 'Rajesh Kumar', 
      role: 'ZSM', 
      region: 'North India', 
      avgScore: 87.5, 
      outlets: 245,
      kpis: { shareOfShelf: 85.2, skuCount: 89.1, planogram: 92.3, mustSell: 84.7, premiumSku: 88.9 }
    },
    { 
      name: 'Priya Sharma', 
      role: 'ZSM', 
      region: 'West India', 
      avgScore: 84.2, 
      outlets: 198,
      kpis: { shareOfShelf: 82.1, skuCount: 86.4, planogram: 89.7, mustSell: 81.3, premiumSku: 85.6 }
    },
    { 
      name: 'Amit Patel', 
      role: 'ZSM', 
      region: 'South India', 
      avgScore: 91.3, 
      outlets: 312,
      kpis: { shareOfShelf: 88.9, skuCount: 93.2, planogram: 94.1, mustSell: 89.4, premiumSku: 91.7 }
    },
    { 
      name: 'Sneha Gupta', 
      role: 'ZSM', 
      region: 'East India', 
      avgScore: 79.8, 
      outlets: 167,
      kpis: { shareOfShelf: 77.3, skuCount: 81.2, planogram: 85.4, mustSell: 76.9, premiumSku: 78.3 }
    }
  ];

  // Mock trend data
  const trendData = [
    { month: 'Jan', score: 82.1 },
    { month: 'Feb', score: 84.5 },
    { month: 'Mar', score: 87.2 },
    { month: 'Apr', score: 85.8 },
    { month: 'May', score: 88.9 },
    { month: 'Jun', score: 91.3 }
  ];

  const kpiData = [
    { name: 'Share of Shelf', value: 85.2, color: '#dc2626' },
    { name: 'SKU Count', value: 89.1, color: '#ef4444' },
    { name: 'Planogram', value: 92.3, color: '#f87171' },
    { name: 'Must Sell', value: 84.7, color: '#fca5a5' },
    { name: 'Premium SKU', value: 88.9, color: '#fecaca' }
  ];

  const handleDrillDown = (userRole: string, userName: string) => {
    console.log(`Drilling down for ${userName} (${userRole})`);
    navigate(`/outlets?user=${encodeURIComponent(userName)}&role=${userRole}`);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-white">
        <AppSidebar />
        <div className="flex-1">
          {/* Header */}
          <div className="border-b bg-white shadow-sm">
            <div className="px-6 py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <SidebarTrigger />
                  <h1 className="text-2xl font-bold text-gray-900">Image Recognition Analytics</h1>
                  <Badge variant="secondary" className="text-sm bg-red-100 text-red-800">Scoring Engine</Badge>
                </div>
                <div className="flex items-center space-x-4">
                  <img 
                    src="/lovable-uploads/cb5ae240-66de-49ae-8001-7dd8b56114a5.png" 
                    alt="Coca-Cola Logo" 
                    className="h-8"
                  />
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">Coca-Cola</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Filters */}
            <Card className="mb-8 border-gray-200 shadow-md">
              <CardHeader className="bg-gray-50">
                <CardTitle className="text-gray-900">Filters</CardTitle>
              </CardHeader>
              <CardContent className="bg-white">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">User Hierarchy</label>
                    <Select value={selectedHierarchy} onValueChange={setSelectedHierarchy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zsm">ZSM Level</SelectItem>
                        <SelectItem value="rsm">RSM Level</SelectItem>
                        <SelectItem value="asm">ASM Level</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Time Period</label>
                    <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                        <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                        <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Geographic Filter</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All Regions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Regions</SelectItem>
                        <SelectItem value="north">North India</SelectItem>
                        <SelectItem value="south">South India</SelectItem>
                        <SelectItem value="east">East India</SelectItem>
                        <SelectItem value="west">West India</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="border-gray-200 shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gray-50">
                  <CardTitle className="text-sm font-medium text-gray-800">Total Outlets</CardTitle>
                  <TrendingUp className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent className="bg-white">
                  <div className="text-2xl font-bold text-gray-900">922</div>
                  <p className="text-xs text-red-600">+12% from last month</p>
                </CardContent>
              </Card>

              <Card className="border-gray-200 shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gray-50">
                  <CardTitle className="text-sm font-medium text-gray-800">Avg Outlet Score</CardTitle>
                  <BarChart3 className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent className="bg-white">
                  <div className="text-2xl font-bold text-gray-900">85.7%</div>
                  <p className="text-xs text-red-600">+3.2% from last month</p>
                </CardContent>
              </Card>

              <Card className="border-gray-200 shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gray-50">
                  <CardTitle className="text-sm font-medium text-gray-800">Active Users</CardTitle>
                  <Users className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent className="bg-white">
                  <div className="text-2xl font-bold text-gray-900">47</div>
                  <p className="text-xs text-red-600">Across all levels</p>
                </CardContent>
              </Card>

              <Card className="border-gray-200 shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gray-50">
                  <CardTitle className="text-sm font-medium text-gray-800">Compliance Rate</CardTitle>
                  <Eye className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent className="bg-white">
                  <div className="text-2xl font-bold text-gray-900">88.4%</div>
                  <p className="text-xs text-red-600">Above target (85%)</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Score Trends */}
              <Card className="border-gray-200 shadow-md">
                <CardHeader className="bg-gray-50">
                  <CardTitle className="text-gray-900">Average Score Trends</CardTitle>
                </CardHeader>
                <CardContent className="bg-white">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis dataKey="month" tick={{ fill: '#374151' }} />
                      <YAxis tick={{ fill: '#374151' }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fef2f2',
                          border: '1px solid #dc2626',
                          borderRadius: '8px'
                        }}
                      />
                      <Line type="monotone" dataKey="score" stroke="#dc2626" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* KPI Overview */}
              <Card className="border-gray-200 shadow-md">
                <CardHeader className="bg-gray-50">
                  <CardTitle className="text-gray-900">KPI Performance Overview</CardTitle>
                </CardHeader>
                <CardContent className="bg-white">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={kpiData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {kpiData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fef2f2',
                          border: '1px solid #dc2626',
                          borderRadius: '8px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* User Hierarchy Table */}
            <Card className="border-gray-200 shadow-md">
              <CardHeader className="bg-gray-50">
                <CardTitle className="text-gray-900">User Hierarchy Performance</CardTitle>
              </CardHeader>
              <CardContent className="bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-medium">Name</th>
                        <th className="text-left p-4 font-medium">Role</th>
                        <th className="text-left p-4 font-medium">Region</th>
                        <th className="text-left p-4 font-medium">Avg Score</th>
                        <th className="text-left p-4 font-medium">Outlets</th>
                        <th className="text-left p-4 font-medium">Key KPIs</th>
                        <th className="text-left p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hierarchyData.map((user, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-4 font-medium">{user.name}</td>
                          <td className="p-4">
                            <Badge variant="outline">{user.role}</Badge>
                          </td>
                          <td className="p-4">{user.region}</td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{user.avgScore}%</span>
                              <div className="w-16 h-2 bg-gray-200 rounded">
                                <div 
                                  className="h-2 bg-red-500 rounded" 
                                  style={{ width: `${user.avgScore}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">{user.outlets}</td>
                          <td className="p-4">
                            <div className="flex space-x-1">
                              <Badge variant="secondary" className="text-xs">SOS: {user.kpis.shareOfShelf}%</Badge>
                              <Badge variant="secondary" className="text-xs">SKU: {user.kpis.skuCount}%</Badge>
                            </div>
                          </td>
                          <td className="p-4">
                            <Button 
                              size="sm" 
                              onClick={() => handleDrillDown(user.role, user.name)}
                              className="bg-red-600 hover:bg-red-700 text-white"
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
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
