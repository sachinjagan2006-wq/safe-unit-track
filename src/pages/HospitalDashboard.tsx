import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Droplet, AlertCircle, CheckCircle, Clock, Package } from "lucide-react";
import BloodRequestForm from "@/components/BloodRequestForm";

const HospitalDashboard = () => {
  const [showRequestForm, setShowRequestForm] = useState(false);

  const inventory = [
    { type: "A+", units: 45, status: "adequate" },
    { type: "A-", units: 12, status: "low" },
    { type: "B+", units: 32, status: "adequate" },
    { type: "B-", units: 8, status: "critical" },
    { type: "AB+", units: 18, status: "adequate" },
    { type: "AB-", units: 5, status: "critical" },
    { type: "O+", units: 67, status: "good" },
    { type: "O-", units: 15, status: "low" },
  ];

  const requests = [
    { id: 1, bloodType: "A+", units: 5, priority: "Urgent", status: "Pending", requestedDate: "2024-12-20" },
    { id: 2, bloodType: "O-", units: 3, priority: "Critical", status: "In Progress", requestedDate: "2024-12-19" },
    { id: 3, bloodType: "B+", units: 2, priority: "Normal", status: "Completed", requestedDate: "2024-12-18" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "bg-success";
      case "adequate": return "bg-primary";
      case "low": return "bg-warning";
      case "critical": return "bg-destructive";
      default: return "bg-muted";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-destructive";
      case "Urgent": return "bg-warning";
      default: return "bg-primary";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Hospital Dashboard</h1>
              <p className="text-sm text-muted-foreground">City General Hospital</p>
            </div>
          </div>
          <Button onClick={() => setShowRequestForm(true)}>
            <AlertCircle className="w-4 h-4 mr-2" />
            Request Blood
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between mb-2">
              <Package className="w-8 h-8 text-primary" />
              <Badge variant="outline">Inventory</Badge>
            </div>
            <div className="text-3xl font-bold mb-1">202</div>
            <p className="text-sm text-muted-foreground">Total Units</p>
          </Card>

          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-warning" />
              <Badge variant="outline">Pending</Badge>
            </div>
            <div className="text-3xl font-bold mb-1">5</div>
            <p className="text-sm text-muted-foreground">Active Requests</p>
          </Card>

          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-success" />
              <Badge variant="outline">Completed</Badge>
            </div>
            <div className="text-3xl font-bold mb-1">148</div>
            <p className="text-sm text-muted-foreground">This Month</p>
          </Card>

          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between mb-2">
              <AlertCircle className="w-8 h-8 text-destructive" />
              <Badge variant="outline">Critical</Badge>
            </div>
            <div className="text-3xl font-bold mb-1">3</div>
            <p className="text-sm text-muted-foreground">Low Stock Types</p>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="inventory" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="inventory">Blood Inventory</TabsTrigger>
                <TabsTrigger value="requests">Requests</TabsTrigger>
              </TabsList>

              <TabsContent value="inventory">
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Current Blood Inventory</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {inventory.map((item) => (
                      <Card key={item.type} className="p-4 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                              <Droplet className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-bold text-xl">{item.type}</h3>
                              <p className="text-sm text-muted-foreground">Blood Type</p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                        </div>
                        <div className="text-3xl font-bold">{item.units} units</div>
                      </Card>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="requests" className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Blood Requests</h2>
                {requests.map((request) => (
                  <Card key={request.id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">Request #{request.id}</h3>
                          <Badge className={getPriorityColor(request.priority)}>
                            {request.priority}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p>Blood Type: <span className="font-semibold text-foreground">{request.bloodType}</span></p>
                          <p>Units Needed: <span className="font-semibold text-foreground">{request.units}</span></p>
                          <p>Requested: {request.requestedDate}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{request.status}</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">View Details</Button>
                      {request.status === "Pending" && (
                        <Button size="sm">Process Request</Button>
                      )}
                    </div>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6 bg-destructive/10 border-destructive/20">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-destructive" />
                <h3 className="font-bold text-lg">Critical Alerts</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-background rounded-lg">
                  <p className="font-semibold text-sm mb-1">B- Blood Critical</p>
                  <p className="text-xs text-muted-foreground">Only 8 units remaining</p>
                </div>
                <div className="p-3 bg-background rounded-lg">
                  <p className="font-semibold text-sm mb-1">AB- Low Stock</p>
                  <p className="text-xs text-muted-foreground">5 units left - reorder needed</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Match Rate</span>
                    <span className="font-semibold">94%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-success w-[94%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Avg Response Time</span>
                    <span className="font-semibold">2.4 hrs</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-primary w-[80%]"></div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {showRequestForm && (
        <BloodRequestForm onClose={() => setShowRequestForm(false)} />
      )}
    </div>
  );
};

export default HospitalDashboard;
