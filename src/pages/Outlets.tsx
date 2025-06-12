import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Calendar, Store } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface OutletData {
  id: string;
  name: string;
  location: string;
  outletScore: number;
  shareOfShelf: number;
  skuCount: number;
  planogramCompliance: number;
  mustSellCompliance: number;
  premiumSKUCompliance: number;
  assetScore: number;
  lastIRVisit: string;
  region: string;
  beat: string;
}

const Outlets = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedBeat, setSelectedBeat] = useState('all');
  const [dateRange, setDateRange] = useState('last-30-days');

  const userId = searchParams.get('userId');
  const userName = searchParams.get('userName');
  const userLevel = searchParams.get('level');

  // Mock outlet data with Indian names
  const outletData: OutletData[] = [
    {
      id: '1',
      name: 'Reliance Fresh Connaught Place',
      location: 'Connaught Place, New Delhi',
      outletScore: 92.5,
      shareOfShelf: 78.3,
      skuCount: 156,
      planogramCompliance: 94.2,
      mustSellCompliance: 89.7,
      premiumSKUCompliance: 85.4,
      assetScore: 88.1,
      lastIRVisit: '2024-06-10',
      region: 'North',
      beat: 'Beat-A1'
    },
    {
      id: '2',
      name: 'Big Bazaar Janakpuri',
      location: 'Janakpuri, West Delhi',
      outletScore: 87.2,
      shareOfShelf: 72.8,
      skuCount: 142,
      planogramCompliance: 88.6,
      mustSellCompliance: 91.3,
      premiumSKUCompliance: 79.2,
      assetScore: 84.7,
      lastIRVisit: '2024-06-08',
      region: 'North',
      beat: 'Beat-A2'
    },
    {
      id: '3',
      name: 'Spencer\'s Retail Gurgaon',
      location: 'Sector 14, Gurgaon',
      outletScore: 76.8,
      shareOfShelf: 65.4,
      skuCount: 98,
      planogramCompliance: 82.1,
      mustSellCompliance: 78.9,
      premiumSKUCompliance: 71.6,
      assetScore: 75.2,
      lastIRVisit: '2024-06-05',
      region: 'North',
      beat: 'Beat-B1'
    },
    {
      id: '4',
      name: 'More Megastore Noida',
      location: 'Sector 18, Noida',
      outletScore: 89.1,
      shareOfShelf: 74.6,
      skuCount: 134,
      planogramCompliance: 91.3,
      mustSellCompliance: 87.8,
      premiumSKUCompliance: 82.5,
      assetScore: 86.3,
      lastIRVisit: '2024-06-09',
      region: 'North',
      beat: 'Beat-A1'
    }
  ];

  const handleOutletClick = (outletId: string, outletName: string) => {
    navigate(`/outlet-details?outletId=${outletId}&outletName=${outletName}`);
  };

  const filteredOutlets = outletData.filter(outlet => {
    const regionMatch = selectedRegion === 'all' || outlet.region.toLowerCase() === selectedRegion;
    const beatMatch = selectedBeat === 'all' || outlet.beat === selectedBeat;
    return regionMatch && beatMatch;
  });

  // Chart data
  const outletPerformanceData = filteredOutlets.map(outlet => ({
    name: outlet.name.split(' ')[0],
    score: outlet.outletScore,
    asset: outlet.assetScore,
    compliance: outlet.planogramCompliance
  }));

  const regionDistribution = [
    { name: 'North', value: filteredOutlets.filter(o => o.region === 'North').length, fill: '#3b82f6' },
    { name: 'South', value: filteredOutlets.filter(o => o.region === 'South').length, fill: '#60a5fa' },
    { name: 'East', value: filteredOutlets.filter(o => o.region === 'East').length, fill: '#93c5fd' },
    { name: 'West', value: filteredOutlets.filter(o => o.region === 'West').length, fill: '#dbeafe' }
  ].filter(item => item.value > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <div className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-blue-900">FieldAssist</h1>
              <Badge variant="secondary" className="text-sm bg-blue-100 text-blue-800">Outlet Management</Badge>
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
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 text-blue-700 hover:text-blue-900 hover:bg-blue-100"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Button>
          <span className="text-blue-600">/ Outlets under {userName} ({userLevel})</span>
        </div>

        {/* Filters Section */}
        <Card className="mb-8 border-blue-200 shadow-md">
          <CardHeader className="bg-blue-50">
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <MapPin className="h-5 w-5" />
              Geographic & Date Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="bg-white">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Region</label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="north">North Region</SelectItem>
                    <SelectItem value="south">South Region</SelectItem>
                    <SelectItem value="east">East Region</SelectItem>
                    <SelectItem value="west">West Region</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Beat</label>
                <Select value={selectedBeat} onValueChange={setSelectedBeat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Beats</SelectItem>
                    <SelectItem value="Beat-A1">Beat-A1</SelectItem>
                    <SelectItem value="Beat-A2">Beat-A2</SelectItem>
                    <SelectItem value="Beat-B1">Beat-B1</SelectItem>
                    <SelectItem value="Beat-B2">Beat-B2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Date Range</label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
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
                <label className="text-sm font-medium mb-2 block">In-Store Display</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All Displays" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Displays</SelectItem>
                    <SelectItem value="racks">Racks</SelectItem>
                    <SelectItem value="fridges">Fridges</SelectItem>
                    <SelectItem value="counters">Counters</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-blue-200 shadow-md">
            <CardContent className="p-6 bg-gradient-to-r from-blue-50 to-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Outlets</p>
                  <p className="text-2xl font-bold text-blue-900">{filteredOutlets.length}</p>
                </div>
                <Store className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-blue-200 shadow-md">
            <CardContent className="p-6 bg-gradient-to-r from-blue-50 to-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Avg Outlet Score</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {(filteredOutlets.reduce((sum, outlet) => sum + outlet.outletScore, 0) / filteredOutlets.length).toFixed(1)}%
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-blue-200 shadow-md">
            <CardContent className="p-6 bg-gradient-to-r from-blue-50 to-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Recent Visits</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {filteredOutlets.filter(outlet => new Date(outlet.lastIRVisit) > new Date(Date.now() - 7*24*60*60*1000)).length}
                  </p>
                </div>
                <MapPin className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="border-blue-200 shadow-md">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-blue-900">Outlet Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent className="bg-white">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={outletPerformanceData}>
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
                  <Bar dataKey="asset" fill="#60a5fa" name="Asset Score" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-blue-200 shadow-md">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-blue-900">Regional Distribution</CardTitle>
            </CardHeader>
            <CardContent className="bg-white">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={regionDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {regionDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Outlets Table */}
        <Card className="border-blue-200 shadow-md">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-blue-900">Outlets under {userName} ({userLevel})</CardTitle>
          </CardHeader>
          <CardContent className="bg-white">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-blue-200">
                    <th className="text-left p-4 font-medium text-blue-900">Outlet Name</th>
                    <th className="text-left p-4 font-medium text-blue-900">Location</th>
                    <th className="text-left p-4 font-medium text-blue-900">Outlet Score</th>
                    <th className="text-left p-4 font-medium text-blue-900">Share of Shelf</th>
                    <th className="text-left p-4 font-medium text-blue-900">SKU Count</th>
                    <th className="text-left p-4 font-medium text-blue-900">Planogram</th>
                    <th className="text-left p-4 font-medium text-blue-900">Asset Score</th>
                    <th className="text-left p-4 font-medium text-blue-900">Last IR Visit</th>
                    <th className="text-left p-4 font-medium text-blue-900">Region/Beat</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOutlets.map((outlet) => (
                    <tr 
                      key={outlet.id} 
                      className="border-b border-blue-100 hover:bg-blue-50 cursor-pointer"
                      onClick={() => handleOutletClick(outlet.id, outlet.name)}
                    >
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-blue-900 hover:underline">{outlet.name}</p>
                          <p className="text-sm text-blue-600">{outlet.location}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-blue-800">{outlet.location}</p>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-blue-900">{outlet.outletScore}%</span>
                          <div className="w-16 h-2 bg-blue-100 rounded-full">
                            <div 
                              className="h-2 bg-blue-500 rounded-full" 
                              style={{width: `${outlet.outletScore}%`}}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-blue-800">{outlet.shareOfShelf}%</td>
                      <td className="p-4 text-blue-800">{outlet.skuCount}</td>
                      <td className="p-4">
                        <Badge variant={outlet.planogramCompliance > 85 ? "default" : "secondary"}
                               className={outlet.planogramCompliance > 85 ? "bg-blue-600" : "bg-blue-300"}>
                          {outlet.planogramCompliance}%
                        </Badge>
                      </td>
                      <td className="p-4 text-blue-800">{outlet.assetScore}%</td>
                      <td className="p-4">
                        <Badge variant="outline" className="border-blue-300 text-blue-700">{outlet.lastIRVisit}</Badge>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="text-sm font-medium text-blue-900">{outlet.region}</p>
                          <p className="text-xs text-blue-600">{outlet.beat}</p>
                        </div>
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

export default Outlets;
