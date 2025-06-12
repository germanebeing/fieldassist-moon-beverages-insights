
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
    { name: 'SKU Count', value: 85.2, color: '#10b981' },
    { name: 'Planogram Compliance', value: 94.2, color: '#f59e0b' },
    { name: 'Must Sell Compliance', value: 89.7, color: '#ef4444' },
    { name: 'Premium SKU Compliance', value: 85.4, color: '#8b5cf6' }
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
    // Mock trend data for different KPIs
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">FieldAssist</h1>
              <Badge variant="secondary" className="text-sm">Outlet Analytics</Badge>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Client</p>
              <p className="text-lg font-semibold text-primary">Moon Beverages</p>
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
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Outlets</span>
          </Button>
          <span className="text-muted-foreground">/ {outletName} Details</span>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Analysis Filters</CardTitle>
          </CardHeader>
          <CardContent>
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="kpi-trends">KPI Trends</TabsTrigger>
            <TabsTrigger value="asset-analysis">Asset Analysis</TabsTrigger>
            <TabsTrigger value="weights">KPI Weights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* KPI Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Overall Outlet Score</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">92.5%</div>
                  <p className="text-xs text-muted-foreground">+4.2% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Asset Score</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">88.1%</div>
                  <p className="text-xs text-muted-foreground">Across 4 assets</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">91.1%</div>
                  <p className="text-xs text-muted-foreground">Above target (85%)</p>
                </CardContent>
              </Card>
            </div>

            {/* Outlet Score Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Outlet Score Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={outletScoreTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* KPI Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>KPI Performance Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ResponsiveContainer width="100%" height={250}>
                    <RechartsPieChart>
                      <RechartsPieChart data={kpiBreakdown}>
                        {kpiBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </RechartsPieChart>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                  
                  <div className="space-y-4">
                    {kpiBreakdown.map((kpi, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: kpi.color }}
                          />
                          <span className="font-medium">{kpi.name}</span>
                        </div>
                        <Badge variant="outline">{kpi.value}%</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="kpi-trends" className="space-y-6">
            {/* KPI Selector */}
            <Card>
              <CardHeader>
                <CardTitle>Select KPI for Detailed Trend Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedKPI} onValueChange={setSelectedKPI}>
                  <SelectTrigger className="w-full md:w-[300px]">
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
            <Card>
              <CardHeader>
                <CardTitle>Historical Trend - {selectedKPI.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={getKPITrendData(selectedKPI)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="asset-analysis" className="space-y-6">
            {/* Asset Scores */}
            <Card>
              <CardHeader>
                <CardTitle>Individual Asset Scores</CardTitle>
              </CardHeader>
              <CardContent>
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
            {/* KPI Weights Table */}
            <Card>
              <CardHeader>
                <CardTitle>KPI Weights Configuration</CardTitle>
              </CardHeader>
              <CardContent>
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
