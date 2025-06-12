
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

  const kpiPerformanceData = [
    { kpi: 'Share of Shelf', current: 78.3, target: 85.0 },
    { kpi: 'SKU Count', current: 85.2, target: 90.0 },
    { kpi: 'Planogram Compliance', current: 94.2, target: 95.0 },
    { kpi: 'Must Sell Compliance', current: 89.7, target: 95.0 },
    { kpi: 'Premium SKU Compliance', current: 85.4, target: 88.0 }
  ];

  const assetScores = [
    { asset: 'Fridge Display', score: 92.3, kpis: { shareOfShelf: 85.4, skuCount: 94.2, planogram: 96.1 }},
    { asset: 'Rack Display', score: 87.8, kpis: { shareOfShelf: 82.1, skuCount: 89.7, planogram: 91.4 }},
    { asset: 'Counter Display', score: 84.2, kpis: { shareOfShelf: 78.9, skuCount: 85.6, planogram: 88.1 }},
    { asset: 'End Cap', score: 91.5, kpis: { shareOfShelf: 88.2, skuCount: 92.8, planogram: 93.5 }}
  ];

  const kpiWeights = [
    { kpi: 'Share of Shelf', weight: 25, description: 'Percentage of shelf space occupied by brand products' },
    { kpi: 'SKU Count', weight: 20, description: 'Number of unique SKUs available at the outlet' },
    { kpi: 'Planogram Compliance', weight: 25, description: 'Adherence to planned product layout and positioning' },
    { kpi: 'Must Sell Compliance', weight: 15, description: 'Availability of must-sell items as per company policy' },
    { kpi: 'Premium SKU Compliance', weight: 15, description: 'Premium product positioning and availability' }
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

            {/* Main Layout */}
            <div className="grid grid-cols-12 gap-6">
              {/* Left Column - KPI Cards */}
              <div className="col-span-12 lg:col-span-4 space-y-4">
                {/* Overall Score Card */}
                <Card className="border-gray-200 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 text-center">
                    <CardTitle className="text-gray-900 text-lg">Overall Outlet Score</CardTitle>
                  </CardHeader>
                  <CardContent className="bg-white text-center p-6">
                    <div className="text-5xl font-bold text-red-600 mb-3">92.5%</div>
                    <p className="text-sm text-gray-600 mb-4">Comprehensive performance score based on weighted KPI metrics</p>
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={[
                              { name: 'Score', value: 92.5, fill: '#dc2626' },
                              { name: 'Remaining', value: 7.5, fill: '#f3f4f6' }
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={35}
                            outerRadius={55}
                            dataKey="value"
                            startAngle={90}
                            endAngle={450}
                          />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                    <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-50">
                      View Details
                    </Button>
                  </CardContent>
                </Card>

                {/* Individual KPI Cards */}
                {kpiBreakdown.map((kpi, index) => (
                  <Card key={index} className="border-gray-200 shadow-md">
                    <CardHeader className="bg-gray-50 pb-3">
                      <CardTitle className="text-gray-900 text-sm font-medium">
                        {kpi.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="bg-white p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-2xl font-bold text-gray-900">{kpi.value}%</div>
                        <div className="w-8 h-8">
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartsPieChart>
                              <Pie
                                data={[
                                  { value: kpi.value, fill: kpi.color },
                                  { value: 100 - kpi.value, fill: '#f3f4f6' }
                                ]}
                                cx="50%"
                                cy="50%"
                                innerRadius={8}
                                outerRadius={16}
                                dataKey="value"
                              />
                            </RechartsPieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mb-3">
                        {kpiWeights.find(w => w.kpi === kpi.name)?.description}
                      </p>
                      <Button variant="outline" size="sm" className="w-full text-xs">
                        View Trends
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Right Column - Charts and Analysis */}
              <div className="col-span-12 lg:col-span-8 space-y-6">
                {/* Filters */}
                <Card className="border-gray-200 shadow-md">
                  <CardHeader className="bg-gray-50">
                    <CardTitle className="text-gray-900">Analysis Filters</CardTitle>
                  </CardHeader>
                  <CardContent className="bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block text-gray-700">Geographic Level</label>
                        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="current">Current Outlet</SelectItem>
                            <SelectItem value="beat">Beat Comparison</SelectItem>
                            <SelectItem value="region">Regional Average</SelectItem>
                            <SelectItem value="national">National Benchmark</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block text-gray-700">Time Period</label>
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
                        <label className="text-sm font-medium mb-2 block text-gray-700">Display Assets</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="All Assets" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Assets</SelectItem>
                            <SelectItem value="fridges">Fridge Displays</SelectItem>
                            <SelectItem value="racks">Rack Displays</SelectItem>
                            <SelectItem value="counters">Counter Displays</SelectItem>
                            <SelectItem value="endcaps">End Caps</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* KPI Performance Breakdown Chart */}
                <Card className="border-gray-200 shadow-md">
                  <CardHeader className="bg-gray-50">
                    <CardTitle className="text-gray-900 flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2 text-red-600" />
                      KPI Performance Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="bg-white">
                    <p className="text-sm text-gray-600 mb-4">Current performance vs target for each KPI metric</p>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={kpiPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                        <XAxis 
                          dataKey="kpi" 
                          tick={{ fill: '#374151', fontSize: 12 }}
                          angle={-45}
                          textAnchor="end"
                          height={80}
                        />
                        <YAxis tick={{ fill: '#374151' }} domain={[0, 100]} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#fef2f2',
                            border: '1px solid #dc2626',
                            borderRadius: '8px'
                          }}
                        />
                        <Bar dataKey="current" fill="#dc2626" name="Current" />
                        <Bar dataKey="target" fill="#fca5a5" name="Target" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* KPI Weight Distribution */}
                <Card className="border-gray-200 shadow-md">
                  <CardHeader className="bg-gray-50">
                    <CardTitle className="text-gray-900 flex items-center">
                      <PieChart className="w-5 h-5 mr-2 text-red-600" />
                      KPI Weight Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="bg-white">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <ResponsiveContainer width="100%" height={250}>
                          <RechartsPieChart>
                            <Pie
                              data={kpiWeights.map((item, index) => ({
                                name: item.kpi,
                                value: item.weight,
                                fill: ['#dc2626', '#ef4444', '#f87171', '#fca5a5', '#fecaca'][index]
                              }))}
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              dataKey="value"
                              label={({ name, value }) => `${name}: ${value}%`}
                            />
                            <Tooltip />
                          </RechartsPieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900 mb-3">Weight Breakdown</h4>
                        {kpiWeights.map((kpi, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center">
                              <div 
                                className="w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: ['#dc2626', '#ef4444', '#f87171', '#fca5a5', '#fecaca'][index] }}
                              />
                              <span className="text-sm font-medium">{kpi.kpi}</span>
                            </div>
                            <span className="text-sm font-bold">{kpi.weight}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Outlet Score Trend */}
                <Card className="border-gray-200 shadow-md">
                  <CardHeader className="bg-gray-50">
                    <CardTitle className="text-gray-900 flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-red-600" />
                      Outlet Score Trend
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="bg-white">
                    <p className="text-sm text-gray-600 mb-4">Performance trend over the selected time period</p>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={outletScoreTrend}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                        <XAxis dataKey="date" tick={{ fill: '#374151', fontSize: 12 }} />
                        <YAxis tick={{ fill: '#374151' }} domain={[75, 95]} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#fef2f2',
                            border: '1px solid #dc2626',
                            borderRadius: '8px'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="score" 
                          stroke="#dc2626" 
                          strokeWidth={3}
                          dot={{ fill: '#dc2626', strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
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
