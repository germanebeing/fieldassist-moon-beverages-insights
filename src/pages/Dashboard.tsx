
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, Filter, Users, TrendingUp, MapPin } from "lucide-react";
import { useNavigate } from 'react-router-dom';

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

  // Mock data for the user hierarchy
  const hierarchyData: UserHierarchyData[] = [
    {
      id: '1',
      name: 'John Smith',
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
      name: 'Sarah Johnson',
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
      name: 'Mike Wilson',
      level: 'ASM',
      avgOutletScore: 79.8,
      shareOfShelf: 65.2,
      skuCount: 118,
      planogramCompliance: 82.4,
      mustSellCompliance: 85.1,
      premiumSKUCompliance: 71.6,
      assetScore: 78.5,
      outletsCount: 15
    }
  ];

  const handleViewOutlets = (userId: string, userName: string, level: string) => {
    navigate(`/outlets?userId=${userId}&userName=${userName}&level=${level}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">FieldAssist</h1>
              <Badge variant="secondary" className="text-sm">Image Recognition Analytics</Badge>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Client</p>
              <p className="text-lg font-semibold text-primary">Moon Beverages</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Filters Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Scoring Engine Dashboard - Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">User Hierarchy Level</label>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger>
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
                <label className="text-sm font-medium mb-2 block">Specific User</label>
                <Select value={selectedUser} onValueChange={setSelectedUser}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select user (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john-smith">John Smith (ZSM)</SelectItem>
                    <SelectItem value="sarah-johnson">Sarah Johnson (RSM)</SelectItem>
                    <SelectItem value="mike-wilson">Mike Wilson (ASM)</SelectItem>
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
                <label className="text-sm font-medium mb-2 block">Geographic Filter</label>
                <Select>
                  <SelectTrigger>
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
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Outlet Score</p>
                  <p className="text-2xl font-bold text-primary">83.1</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Outlets</p>
                  <p className="text-2xl font-bold text-primary">85</p>
                </div>
                <MapPin className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Asset Score</p>
                  <p className="text-2xl font-bold text-primary">81.6</p>
                </div>
                <Users className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Compliance Rate</p>
                  <p className="text-2xl font-bold text-primary">85.7%</p>
                </div>
                <Calendar className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>User Hierarchy Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium">Name ({selectedLevel})</th>
                    <th className="text-left p-4 font-medium">Avg Outlet Score</th>
                    <th className="text-left p-4 font-medium">Share of Shelf</th>
                    <th className="text-left p-4 font-medium">SKU Count</th>
                    <th className="text-left p-4 font-medium">Planogram Compliance</th>
                    <th className="text-left p-4 font-medium">Must Sell Compliance</th>
                    <th className="text-left p-4 font-medium">Premium SKU Compliance</th>
                    <th className="text-left p-4 font-medium">Asset Score</th>
                    <th className="text-left p-4 font-medium">Outlets</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {hierarchyData.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-muted/50">
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <Badge variant="outline" className="text-xs">{user.level}</Badge>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{user.avgOutletScore}%</span>
                          <div className="w-16 h-2 bg-muted rounded-full">
                            <div 
                              className="h-2 bg-green-500 rounded-full" 
                              style={{width: `${user.avgOutletScore}%`}}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="p-4">{user.shareOfShelf}%</td>
                      <td className="p-4">{user.skuCount}</td>
                      <td className="p-4">
                        <Badge variant={user.planogramCompliance > 85 ? "default" : "secondary"}>
                          {user.planogramCompliance}%
                        </Badge>
                      </td>
                      <td className="p-4">{user.mustSellCompliance}%</td>
                      <td className="p-4">{user.premiumSKUCompliance}%</td>
                      <td className="p-4">{user.assetScore}%</td>
                      <td className="p-4">
                        <Badge variant="outline">{user.outletsCount}</Badge>
                      </td>
                      <td className="p-4">
                        <Button 
                          size="sm" 
                          onClick={() => handleViewOutlets(user.id, user.name, user.level)}
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
