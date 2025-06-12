
import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ArrowLeft, MapPin, Calendar, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Outlets = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('last-30-days');

  const userName = searchParams.get('user');
  const userRole = searchParams.get('role');

  // Mock outlet data with Indian names
  const outletsData = [
    { 
      id: 1, 
      name: 'Reliance Fresh Connaught Place', 
      location: 'Delhi', 
      score: 92.5, 
      lastVisit: '2024-06-10',
      kpis: { shareOfShelf: 88.3, skuCount: 94.2, planogram: 96.1, mustSell: 89.7, premiumSku: 91.4 }
    },
    { 
      id: 2, 
      name: 'Big Bazaar Karol Bagh', 
      location: 'Delhi', 
      score: 87.8, 
      lastVisit: '2024-06-09',
      kpis: { shareOfShelf: 85.1, skuCount: 89.3, planogram: 91.2, mustSell: 86.4, premiumSku: 87.9 }
    },
    { 
      id: 3, 
      name: 'Spencer\'s Vasant Kunj', 
      location: 'Delhi', 
      score: 84.2, 
      lastVisit: '2024-06-08',
      kpis: { shareOfShelf: 82.5, skuCount: 86.7, planogram: 88.3, mustSell: 83.1, premiumSku: 84.6 }
    },
    { 
      id: 4, 
      name: 'More Megastore Lajpat Nagar', 
      location: 'Delhi', 
      score: 91.3, 
      lastVisit: '2024-06-11',
      kpis: { shareOfShelf: 89.2, skuCount: 92.8, planogram: 94.7, mustSell: 90.1, premiumSku: 89.8 }
    },
    { 
      id: 5, 
      name: 'Hypercity Gurgaon', 
      location: 'Gurgaon', 
      score: 78.9, 
      lastVisit: '2024-06-07',
      kpis: { shareOfShelf: 76.3, skuCount: 81.2, planogram: 83.4, mustSell: 77.8, premiumSku: 79.1 }
    }
  ];

  const chartData = outletsData.map(outlet => ({
    name: outlet.name.split(' ')[0],
    score: outlet.score,
    shareOfShelf: outlet.kpis.shareOfShelf,
    planogram: outlet.kpis.planogram
  }));

  const handleOutletClick = (outlet: any) => {
    navigate(`/outlet-details?outletId=${outlet.id}&outletName=${encodeURIComponent(outlet.name)}`);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-700 bg-green-100';
    if (score >= 80) return 'text-yellow-700 bg-yellow-100';
    return 'text-red-700 bg-red-100';
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
                  <h1 className="text-2xl font-bold text-gray-900">FieldAssist</h1>
                  <Badge variant="secondary" className="text-sm bg-red-100 text-red-800">Outlets Management</Badge>
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
                <span>Back to Dashboard</span>
              </Button>
              {userName && (
                <span className="text-gray-600">/ {userName} ({userRole}) Outlets</span>
              )}
            </div>

            {/* Filters */}
            <Card className="mb-8 border-gray-200 shadow-md">
              <CardHeader className="bg-gray-50">
                <CardTitle className="text-gray-900">Filters</CardTitle>
              </CardHeader>
              <CardContent className="bg-white">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Geographic Filter</label>
                    <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Regions</SelectItem>
                        <SelectItem value="delhi">Delhi</SelectItem>
                        <SelectItem value="gurgaon">Gurgaon</SelectItem>
                        <SelectItem value="noida">Noida</SelectItem>
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
                    <label className="text-sm font-medium mb-2 block">Score Range</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All Scores" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Scores</SelectItem>
                        <SelectItem value="high">90-100%</SelectItem>
                        <SelectItem value="medium">80-89%</SelectItem>
                        <SelectItem value="low">Below 80%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="border-gray-200 shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gray-50">
                  <CardTitle className="text-sm font-medium text-gray-800">Total Outlets</CardTitle>
                  <TrendingUp className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent className="bg-white">
                  <div className="text-2xl font-bold text-gray-900">{outletsData.length}</div>
                  <p className="text-xs text-red-600">Under {userName}</p>
                </CardContent>
              </Card>

              <Card className="border-gray-200 shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gray-50">
                  <CardTitle className="text-sm font-medium text-gray-800">Avg Score</CardTitle>
                  <MapPin className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent className="bg-white">
                  <div className="text-2xl font-bold text-gray-900">86.9%</div>
                  <p className="text-xs text-red-600">Across all outlets</p>
                </CardContent>
              </Card>

              <Card className="border-gray-200 shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gray-50">
                  <CardTitle className="text-sm font-medium text-gray-800">Last Visit</CardTitle>
                  <Calendar className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent className="bg-white">
                  <div className="text-2xl font-bold text-gray-900">Today</div>
                  <p className="text-xs text-red-600">Most recent activity</p>
                </CardContent>
              </Card>
            </div>

            {/* Outlet Performance Chart */}
            <Card className="mb-8 border-gray-200 shadow-md">
              <CardHeader className="bg-gray-50">
                <CardTitle className="text-gray-900">Outlet Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent className="bg-white">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="name" tick={{ fill: '#374151' }} />
                    <YAxis tick={{ fill: '#374151' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fef2f2',
                        border: '1px solid #dc2626',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="score" fill="#dc2626" name="Outlet Score" />
                    <Bar dataKey="shareOfShelf" fill="#ef4444" name="Share of Shelf" />
                    <Bar dataKey="planogram" fill="#f87171" name="Planogram" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Outlets Table */}
            <Card className="border-gray-200 shadow-md">
              <CardHeader className="bg-gray-50">
                <CardTitle className="text-gray-900">Outlets List</CardTitle>
              </CardHeader>
              <CardContent className="bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-medium">Outlet Name</th>
                        <th className="text-left p-4 font-medium">Location</th>
                        <th className="text-left p-4 font-medium">Score</th>
                        <th className="text-left p-4 font-medium">Share of Shelf</th>
                        <th className="text-left p-4 font-medium">Planogram</th>
                        <th className="text-left p-4 font-medium">Last Visit</th>
                        <th className="text-left p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {outletsData.map((outlet) => (
                        <tr key={outlet.id} className="border-b hover:bg-gray-50">
                          <td className="p-4 font-medium">{outlet.name}</td>
                          <td className="p-4">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3 text-gray-400" />
                              <span>{outlet.location}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge className={getScoreColor(outlet.score)}>
                              {outlet.score}%
                            </Badge>
                          </td>
                          <td className="p-4">{outlet.kpis.shareOfShelf}%</td>
                          <td className="p-4">{outlet.kpis.planogram}%</td>
                          <td className="p-4">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3 text-gray-400" />
                              <span>{outlet.lastVisit}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <Button 
                              size="sm" 
                              onClick={() => handleOutletClick(outlet)}
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              View Details
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

export default Outlets;
