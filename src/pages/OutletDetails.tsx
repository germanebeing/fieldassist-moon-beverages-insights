import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ArrowLeft, TrendingUp, BarChart3, PieChart } from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

const OutletDetails = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedKPI, setSelectedKPI] = useState('outlet-score');
  const [selectedRegion, setSelectedRegion] = useState('current');
  const [selectedTimeframe, setSelectedTimeframe] = useState('last-30-days');

  const outletId = searchParams.get('outletId');
  const outletName = searchParams.get('outletName');

  // Mock historical data for trends
  const outletScoreTrend = [
    { date: '2024-05-01', score: 82.5 },
    { date: '2024-05-08', score: 84.2 },
    { date: '2024-05-15', score: 86.1 },
    { date: '2024-05-22', score: 88.7 },
    { date: '2024-05-29', score: 87.3 },
    { date: '2024-06-05', score: 89.4 },
    { date: '2024-06-12', score: 92.5 }
  ];

  const kpiBreakdown = [
    { name: 'Share of Shelf', value: 78.3, color: '#dc2626' },
    { name: 'SKU Count', value: 85.2, color: '#ef4444' },
    { name: 'Planogram Compliance', value: 94.2, color: '#f87171' },
    { name: 'Must Sell Compliance', value: 89.7, color: '#fca5a5' },
    { name: 'Premium SKU Compliance', value: 85.4, color: '#fecaca' }
  ];

  const assetScores = [
    { asset: 'Fridge Display', score: 92.3, kpis: { shareOfShelf: 85.4, skuCount: 94.2, planogram: 96.1 }},
    { asset: 'Rack Display', score: 87.8, kpis: { shareOfShelf: 82.1, skuCount: 89.7, planogram: 91.4 }},
    { asset: 'Counter Display', score: 84.2, kpis: { shareOfShelf: 78.9, skuCount: 85.6, planogram: 88.1 }},
    { asset: 'End Cap', score: 91.5, kpis: { shareOfShelf: 88.2, skuCount: 92.8, planogram: 93.5 }}
  ];

  const kpiWeights = [
    { kpi: 'Share of Shelf', weight: 25, description: 'Percentage of shelf space occupied' },
    { kpi: 'SKU Count', weight: 20, description: 'Number of unique SKUs available' },
    { kpi: 'Planogram Compliance', weight: 25, description: 'Adherence to planned layout' },
    { kpi: 'Must Sell Compliance', weight: 15, description: 'Availability of must-sell items' },
    { kpi: 'Premium SKU Compliance', weight: 15, description: 'Premium product positioning' }
  ];

  const getKPITrendData = (kpiName: string) => {
    const baseTrend = [
      { date: '2024-05-01', value: 75 + Math.random() * 15 },
      { date: '2024-05-08', value: 77 + Math.random() * 15 },
      { date: '2024-05-15', value: 79 + Math.random() * 15 },
      { date: '2024-05-22', value: 82 + Math.random() * 15 },
      { date: '2024-05-29', value: 84 + Math.random() * 15 },
      { date: '2024-06-05', value: 86 + Math.random() * 15 },
      { date: '2024-06-12', value: 88 + Math.random() * 15 }
    ];
    return baseTrend.map(item => ({ ...item, value: Math.round(item.value * 10) / 10 }));
  };

  const assetChartData = assetScores.map(asset => ({
    name: asset.asset.split(' ')[0],
    score: asset.score,
    shareOfShelf: asset.kpis.shareOfShelf,
    skuCount: asset.kpis.skuCount,
    planogram: asset.kpis.planogram
  }));

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
                  <h1 className="text-2xl font-bold text-gray-900">FieldAssist</h1>
                  <Badge variant="secondary" className="text-sm bg-red-100 text-red-800">Outlet Analytics</Badge>
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
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 mb-6">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2 text-red-700 hover:text-red-900 hover:bg-red-100"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Outlets</span>
              </Button>
              <span className="text-gray-600">/ {outletName} Details</span>
            </div>

            {/* Layout inspired by the reference image */}
            <div className="grid grid-cols-12 gap-6">
              {/* Left side - KPI Cards */}
              <div className="col-span-12 lg:col-span-4 space-y-4">
                {/* Overall Score Card */}
                <Card className="border-gray-200 shadow-md">
                  <CardHeader className="bg-gray-50 text-center">
                    <CardTitle className="text-gray-900">Overall Outlet Score</CardTitle>
                  </CardHeader>
                  <CardContent className="bg-white text-center p-6">
                    <div className="text-4xl font-bold text-red-600 mb-2">92.5%</div>
                    <p className="text-sm text-gray-600">Two liner explainer statement about how the KPI works and functions</p>
                    <div className="mt-4">
                      <ResponsiveContainer width="100%" height={120}>
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Score', value: 92.5, fill: '#dc2626' },
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={30}
                            outerRadius={50}
                            dataKey="value"
                          >
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2">DETAILS</Button>
                  </CardContent>
                </Card>

                {/* Individual KPI Cards */}
                {kpiBreakdown.slice(0, 3).map((kpi, index) => (
                  <Card key={index} className="border-gray-200 shadow-md">
                    <CardHeader className="bg-gray-50">
                      <CardTitle className="text-gray-900 text-sm flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        {kpi.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="bg-white p-4">
                      <div className="text-lg font-bold text-gray-900 mb-1">{kpi.value}%</div>
                      <p className="text-xs text-gray-600 mb-3">Two liner explainer statement about how the KPI works and functions</p>
                      <Button variant="outline" size="sm" className="w-full">DETAILS</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Right side - Main chart and KPI weights */}
              <div className="col-span-12 lg:col-span-8 space-y-6">
                {/* Filters */}
                <Card className="border-gray-200 shadow-md">
                  <CardHeader className="bg-gray-50">
                    <CardTitle className="text-gray-900">Analysis Filters</CardTitle>
                  </CardHeader>
                  <CardContent className="bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Geographic Hierarchy</label>
                        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="current">Current Location</SelectItem>
                            <SelectItem value="beat">Beat Level</SelectItem>
                            <SelectItem value="region">Region Level</SelectItem>
                            <SelectItem value="national">National Level</SelectItem>
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
                            <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">In-Store Display Filter</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="All Displays" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Displays</SelectItem>
                            <SelectItem value="racks">Racks Only</SelectItem>
                            <SelectItem value="fridges">Fridges Only</SelectItem>
                            <SelectItem value="counters">Counters Only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Main Trend Chart */}
                <Card className="border-gray-200 shadow-md">
                  <CardHeader className="bg-gray-50">
                    <CardTitle className="text-gray-900">Outlet Score Trend</CardTitle>
                  </CardHeader>
                  <CardContent className="bg-white">
                    <p className="text-sm text-gray-600 mb-4">Two liner explainer statement about how the KPI works and functions</p>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={outletScoreTrend}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                        <XAxis dataKey="date" tick={{ fill: '#374151' }} />
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
                    
                    {/* KPI Weights Table */}
                    <div className="mt-6">
                      <h4 className="font-medium text-gray-900 mb-3">KPI Weights</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-2">KPI</th>
                              <th className="text-left p-2">Weight</th>
                            </tr>
                          </thead>
                          <tbody>
                            {kpiWeights.map((kpi, index) => (
                              <tr key={index} className="border-b">
                                <td className="p-2">{kpi.kpi}</td>
                                <td className="p-2">{kpi.weight}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Bottom section with pie chart */}
                <Card className="border-gray-200 shadow-md">
                  <CardHeader className="bg-gray-50">
                    <CardTitle className="text-gray-900">Share of Shelf - Value</CardTitle>
                  </CardHeader>
                  <CardContent className="bg-white">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <ResponsiveContainer width="100%" height={200}>
                          <LineChart data={getKPITrendData('share-of-shelf')}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                            <XAxis dataKey="date" tick={{ fill: '#374151' }} />
                            <YAxis tick={{ fill: '#374151' }} />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: '#fef2f2',
                                border: '1px solid #dc2626',
                                borderRadius: '8px'
                              }}
                            />
                            <Line type="monotone" dataKey="value" stroke="#dc2626" strokeWidth={2} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="text-center mb-4">
                          <div className="text-3xl font-bold text-gray-900">74%</div>
                          <p className="text-sm text-gray-600">More SOS than 70% in this beat/region</p>
                        </div>
                        <ResponsiveContainer width="100%" height={120}>
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'Current', value: 74, fill: '#dc2626' },
                                { name: 'Remaining', value: 26, fill: '#f3f4f6' }
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={30}
                              outerRadius={50}
                              dataKey="value"
                            >
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default OutletDetails;
