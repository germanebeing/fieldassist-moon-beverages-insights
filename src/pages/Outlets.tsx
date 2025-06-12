
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Calendar, Store } from "lucide-react";

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

  // Mock outlet data
  const outletData: OutletData[] = [
    {
      id: '1',
      name: 'MegaMart Downtown',
      location: 'Downtown Plaza, City Center',
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
      name: 'SuperStore Mall',
      location: 'Shopping Mall, Sector 15',
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
      name: 'QuickStop Express',
      location: 'Highway Junction, Exit 12',
      outletScore: 76.8,
      shareOfShelf: 65.4,
      skuCount: 98,
      planogramCompliance: 82.1,
      mustSellCompliance: 78.9,
      premiumSKUCompliance: 71.6,
      assetScore: 75.2,
      lastIRVisit: '2024-06-05',
      region: 'South',
      beat: 'Beat-B1'
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">FieldAssist</h1>
              <Badge variant="secondary" className="text-sm">Outlet Management</Badge>
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
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Button>
          <span className="text-muted-foreground">/ Outlets under {userName} ({userLevel})</span>
        </div>

        {/* Filters Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Geographic & Date Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
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
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Outlets</p>
                  <p className="text-2xl font-bold text-primary">{filteredOutlets.length}</p>
                </div>
                <Store className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Outlet Score</p>
                  <p className="text-2xl font-bold text-primary">
                    {(filteredOutlets.reduce((sum, outlet) => sum + outlet.outletScore, 0) / filteredOutlets.length).toFixed(1)}%
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Recent Visits</p>
                  <p className="text-2xl font-bold text-primary">
                    {filteredOutlets.filter(outlet => new Date(outlet.lastIRVisit) > new Date(Date.now() - 7*24*60*60*1000)).length}
                  </p>
                </div>
                <MapPin className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Outlets Table */}
        <Card>
          <CardHeader>
            <CardTitle>Outlets under {userName} ({userLevel})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium">Outlet Name</th>
                    <th className="text-left p-4 font-medium">Location</th>
                    <th className="text-left p-4 font-medium">Outlet Score</th>
                    <th className="text-left p-4 font-medium">Share of Shelf</th>
                    <th className="text-left p-4 font-medium">SKU Count</th>
                    <th className="text-left p-4 font-medium">Planogram</th>
                    <th className="text-left p-4 font-medium">Asset Score</th>
                    <th className="text-left p-4 font-medium">Last IR Visit</th>
                    <th className="text-left p-4 font-medium">Region/Beat</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOutlets.map((outlet) => (
                    <tr 
                      key={outlet.id} 
                      className="border-b hover:bg-muted/50 cursor-pointer"
                      onClick={() => handleOutletClick(outlet.id, outlet.name)}
                    >
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-primary hover:underline">{outlet.name}</p>
                          <p className="text-sm text-muted-foreground">{outlet.location}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm">{outlet.location}</p>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{outlet.outletScore}%</span>
                          <div className="w-16 h-2 bg-muted rounded-full">
                            <div 
                              className="h-2 bg-green-500 rounded-full" 
                              style={{width: `${outlet.outletScore}%`}}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="p-4">{outlet.shareOfShelf}%</td>
                      <td className="p-4">{outlet.skuCount}</td>
                      <td className="p-4">
                        <Badge variant={outlet.planogramCompliance > 85 ? "default" : "secondary"}>
                          {outlet.planogramCompliance}%
                        </Badge>
                      </td>
                      <td className="p-4">{outlet.assetScore}%</td>
                      <td className="p-4">
                        <Badge variant="outline">{outlet.lastIRVisit}</Badge>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="text-sm font-medium">{outlet.region}</p>
                          <p className="text-xs text-muted-foreground">{outlet.beat}</p>
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
