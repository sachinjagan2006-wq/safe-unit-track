import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Droplet, Award, CheckCircle, Clock, Hash } from "lucide-react";
import DonationForm from "@/components/DonationForm";

const DonorDashboard = () => {
  const [showDonationForm, setShowDonationForm] = useState(false);

  const donationHistory = [
    { id: 1, date: "2024-12-15", hospital: "City General Hospital", amount: "450ml", status: "Verified", txHash: "0x1a2b...3c4d", blockNumber: 15234567 },
    { id: 2, date: "2024-09-22", hospital: "St. Mary's Medical Center", amount: "450ml", status: "Verified", txHash: "0x5e6f...7g8h", blockNumber: 15123456 },
    { id: 3, date: "2024-06-10", hospital: "Regional Blood Bank", amount: "450ml", status: "Verified", txHash: "0x9i0j...1k2l", blockNumber: 15012345 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
              <Droplet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Donor Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back, John Doe</p>
            </div>
          </div>
          <Badge className="bg-success">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified Donor
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between mb-2">
              <Droplet className="w-8 h-8 text-primary" />
              <Badge variant="outline">Total</Badge>
            </div>
            <div className="text-3xl font-bold mb-1">12</div>
            <p className="text-sm text-muted-foreground">Donations Made</p>
          </Card>

          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between mb-2">
              <Award className="w-8 h-8 text-secondary" />
              <Badge variant="outline">Rewards</Badge>
            </div>
            <div className="text-3xl font-bold mb-1">245</div>
            <p className="text-sm text-muted-foreground">Tokens Earned</p>
          </Card>

          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-success" />
              <Badge variant="outline">Status</Badge>
            </div>
            <div className="text-3xl font-bold mb-1">A+</div>
            <p className="text-sm text-muted-foreground">Blood Type</p>
          </Card>

          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-warning" />
              <Badge variant="outline">Next</Badge>
            </div>
            <div className="text-3xl font-bold mb-1">42</div>
            <p className="text-sm text-muted-foreground">Days Until Eligible</p>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="history" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="history">Donation History</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
              </TabsList>

              <TabsContent value="history" className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Your Donation History</h2>
                  <Button onClick={() => setShowDonationForm(true)}>
                    <Droplet className="w-4 h-4 mr-2" />
                    Record New Donation
                  </Button>
                </div>

                {donationHistory.map((donation) => (
                  <Card key={donation.id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{donation.hospital}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {donation.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Droplet className="w-4 h-4" />
                            {donation.amount}
                          </span>
                        </div>
                      </div>
                      <Badge className="bg-success">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {donation.status}
                      </Badge>
                    </div>
                    
                    <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <Hash className="w-4 h-4" />
                          Transaction Hash:
                        </span>
                        <code className="font-mono text-primary">{donation.txHash}</code>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Block Number:</span>
                        <code className="font-mono">{donation.blockNumber}</code>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="profile">
                <Card className="p-8">
                  <div className="flex items-center gap-6 mb-8">
                    <Avatar className="w-24 h-24">
                      <AvatarFallback className="text-2xl bg-gradient-primary text-white">JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-2xl font-bold mb-1">John Doe</h2>
                      <p className="text-muted-foreground mb-2">Verified Donor since Jan 2024</p>
                      <Badge className="bg-success">Identity Verified</Badge>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-sm text-muted-foreground">Blood Type</Label>
                      <p className="text-lg font-semibold">A+ Positive</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Location</Label>
                      <p className="text-lg font-semibold flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        New York, NY
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Wallet Address</Label>
                      <code className="text-sm font-mono bg-muted px-2 py-1 rounded">0x742d...3a4f</code>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Total Donations</Label>
                      <p className="text-lg font-semibold">12 Units</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-hero border-primary/20">
              <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline" onClick={() => setShowDonationForm(true)}>
                  <Droplet className="w-4 h-4 mr-2" />
                  Record Donation
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MapPin className="w-4 h-4 mr-2" />
                  Find Donation Centers
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Award className="w-4 h-4 mr-2" />
                  View Rewards
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4">Achievement Badges</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-4 bg-gradient-success rounded-lg">
                  <Award className="w-8 h-8 mx-auto mb-2 text-white" />
                  <p className="text-xs font-semibold text-white">First Donor</p>
                </div>
                <div className="text-center p-4 bg-gradient-primary rounded-lg">
                  <Award className="w-8 h-8 mx-auto mb-2 text-white" />
                  <p className="text-xs font-semibold text-white">10 Donations</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {showDonationForm && (
        <DonationForm onClose={() => setShowDonationForm(false)} />
      )}
    </div>
  );
};

const Label = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <label className={`block text-sm font-medium ${className}`}>{children}</label>
);

export default DonorDashboard;
