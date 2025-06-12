import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, TrendingUp, BarChart3, PieChart } from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell } from 'recharts';

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
    { name: 'Share of Shelf', value: 78.3, color: '#3b82f6' },
    { name: 'SKU Count', value: 85.2, color: '#60a5fa' },
    { name: 'Planogram Compliance', value: 94.2, color: '#93c5fd' },
    { name: 'Must Sell Compliance', value: 89.7, color: '#1e40af' },
    { name: 'Premium SKU Compliance', value: 85.4, color: '#dbeafe' }
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <div className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-blue-900">FieldAssist</h1>
              <Badge variant="secondary" className="text-sm bg-blue-100 text-blue-800">Outlet Analytics</Badge>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-600">Client</p>
              <p className="text-lg font-semibold text-blue-900">Moon Beverages</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-blue-700 hover:text-blue-900 hover:bg-blue-100"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Outlets</span>
          </Button>
          <span className="text-blue-600">/ {outletName} Details</span>
        </div>

        {/* Filters */}
        <Card className="mb-8 border-blue-200 shadow-md">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-blue-900">Analysis Filters</CardTitle>
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

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-blue-100">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="kpi-trends" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">KPI Trends</TabsTrigger>
            <TabsTrigger value="asset-analysis" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Asset Analysis</TabsTrigger>
            <TabsTrigger value="weights" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">KPI Weights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* KPI Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-blue-200 shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-blue-50">
                  <CardTitle className="text-sm font-medium text-blue-800">Overall Outlet Score</CardTitle>
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent className="bg-white">
                  <div className="text-2xl font-bold text-blue-900">92.5%</div>
                  <p className="text-xs text-blue-600">+4.2% from last month</p>
                </CardContent>
              </Card>

              <Card className="border-blue-200 shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-blue-50">
                  <CardTitle className="text-sm font-medium text-blue-800">Average Asset Score</CardTitle>
                  <BarChart3 className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent className="bg-white">
                  <div className="text-2xl font-bold text-blue-900">88.1%</div>
                  <p className="text-xs text-blue-600">Across 4 assets</p>
                </CardContent>
              </Card>

              <Card className="border-blue-200 shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-blue-50">
                  <CardTitle className="text-sm font-medium text-blue-800">Compliance Rate</CardTitle>
                  <PieChart className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent className="bg-white">
                  <div className="text-2xl font-bold text-blue-900">91.1%</div>
                  <p className="text-xs text-blue-600">Above target (85%)</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Outlet Score Trend */}
              <Card className="border-blue-200 shadow-md">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-blue-900">Outlet Score Trend</CardTitle>
                </CardHeader>
                <CardContent className="bg-white">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={outletScoreTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" />
                      <XAxis dataKey="date" tick={{ fill: '#1e40af' }} />
                      <YAxis tick={{ fill: '#1e40af' }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#eff6ff',
                          border: '1px solid #3b82f6',
                          borderRadius: '8px'
                        }}
                      />
                      <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* KPI Breakdown */}
              <Card className="border-blue-200 shadow-md">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-blue-900">KPI Performance Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="bg-white">
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <RechartsPieChart data={kpiBreakdown}>
                        {kpiBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </RechartsPieChart>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#eff6ff',
                          border: '1px solid #3b82f6',
                          borderRadius: '8px'
                        }}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="kpi-trends" className="space-y-6">
            {/* KPI Selector */}
            <Card className="border-blue-200 shadow-md">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-blue-900">Select KPI for Detailed Trend Analysis</CardTitle>
              </CardHeader>
              <CardContent className="bg-white">
                <Select value={selectedKPI} onValueChange={setSelectedKPI}>
                  <SelectTrigger className="w-full md:w-[300px] border-blue-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="outlet-score">Overall Outlet Score</SelectItem>
                    <SelectItem value="share-of-shelf">Share of Shelf</SelectItem>
                    <SelectItem value="sku-count">SKU Count</SelectItem>
                    <SelectItem value="planogram">Planogram Compliance</SelectItem>
                    <SelectItem value="must-sell">Must Sell Compliance</SelectItem>
                    <SelectItem value="premium-sku">Premium SKU Compliance</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Historical Trend */}
            <Card className="border-blue-200 shadow-md">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-blue-900">Historical Trend - {selectedKPI.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</CardTitle>
              </CardHeader>
              <CardContent className="bg-white">
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={getKPITrendData(selectedKPI)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" />
                    <XAxis dataKey="date" tick={{ fill: '#1e40af' }} />
                    <YAxis tick={{ fill: '#1e40af' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#eff6ff',
                        border: '1px solid #3b82f6',
                        borderRadius: '8px'
                      }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="asset-analysis" className="space-y-6">
            {/* Asset Performance Chart */}
            <Card className="border-blue-200 shadow-md">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-blue-900">Asset Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent className="bg-white">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={assetChartData}>
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
                    <Bar dataKey="score" fill="#3b82f6" name="Asset Score" />
                    <Bar dataKey="shareOfShelf" fill="#60a5fa" name="Share of Shelf" />
                    <Bar dataKey="planogram" fill="#93c5fd" name="Planogram" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Asset Scores Details */}
            <Card className="border-blue-200 shadow-md">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-blue-900">Individual Asset Scores</CardTitle>
              </CardHeader>
              <CardContent className="bg-white">
                <div className="space-y-4">
                  {assetScores.map((asset, index) => (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-medium text-lg">{asset.asset}</h3>
                        <Badge variant={asset.score > 90 ? "default" : asset.score > 80 ? "secondary" : "destructive"}>
                          {asset.score}%
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-2 bg-muted/50 rounded">
                          <p className="text-sm text-muted-foreground">Share of Shelf</p>
                          <p className="font-medium">{asset.kpis.shareOfShelf}%</p>
                        </div>
                        <div className="text-center p-2 bg-muted/50 rounded">
                          <p className="text-sm text-muted-foreground">SKU Count</p>
                          <p className="font-medium">{asset.kpis.skuCount}%</p>
                        </div>
                        <div className="text-center p-2 bg-muted/50 rounded">
                          <p className="text-sm text-muted-foreground">Planogram</p>
                          <p className="font-medium">{asset.kpis.planogram}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weights" className="space-y-6">
            {/* KPI Weights Chart */}
            <Card className="border-blue-200 shadow-md">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-blue-900">KPI Weight Distribution</CardTitle>
              </CardHeader>
              <CardContent className="bg-white">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={kpiWeights} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" />
                    <XAxis type="number" tick={{ fill: '#1e40af' }} />
                    <YAxis dataKey="kpi" type="category" tick={{ fill: '#1e40af' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#eff6ff',
                        border: '1px solid #3b82f6',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="weight" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* KPI Weights Table */}
            <Card className="border-blue-200 shadow-md">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-blue-900">KPI Weights Configuration</CardTitle>
              </CardHeader>
              <CardContent className="bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-medium">KPI</th>
                        <th className="text-left p-4 font-medium">Weight (%)</th>
                        <th className="text-left p-4 font-medium">Description</th>
                        <th className="text-left p-4 font-medium">Current Score</th>
                        <th className="text-left p-4 font-medium">Weighted Impact</th>
                      </tr>
                    </thead>
                    <tbody>
                      {kpiWeights.map((kpi, index) => {
                        const currentScore = kpiBreakdown.find(k => k.name === kpi.kpi)?.value || 0;
                        const weightedImpact = (currentScore * kpi.weight / 100).toFixed(1);
                        
                        return (
                          <tr key={index} className="border-b">
                            <td className="p-4 font-medium">{kpi.kpi}</td>
                            <td className="p-4">
                              <Badge variant="outline">{kpi.weight}%</Badge>
                            </td>
                            <td className="p-4 text-sm text-muted-foreground">{kpi.description}</td>
                            <td className="p-4">{currentScore}%</td>
                            <td className="p-4 font-medium text-primary">{weightedImpact}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OutletDetails;
