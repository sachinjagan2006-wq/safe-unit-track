import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Droplet, Award, CheckCircle, Clock, Hash } from "lucide-react";
import DonationForm from "@/components/DonationForm";

const DonorDashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchDonations();
    }
  }, [user]);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user?.id)
      .single();

    if (data) setProfile(data);
  };

  const fetchDonations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("donations")
      .select("*")
      .eq("donor_id", user?.id)
      .order("donation_date", { ascending: false });

    if (data) {
      setDonations(data);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (authLoading || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

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
              <p className="text-sm text-muted-foreground">Welcome back, {profile?.full_name || "Donor"}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-success">
              <CheckCircle className="w-3 h-3 mr-1" />
              Verified Donor
            </Badge>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
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
            <div className="text-3xl font-bold mb-1">{donations.length}</div>
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
            <div className="text-3xl font-bold mb-1">{profile?.blood_type || "N/A"}</div>
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

                {donations.length === 0 ? (
                  <Card className="p-8 text-center">
                    <p className="text-muted-foreground">No donations recorded yet</p>
                    <Button className="mt-4" onClick={() => setShowDonationForm(true)}>
                      Record Your First Donation
                    </Button>
                  </Card>
                ) : (
                  donations.map((donation) => (
                    <Card key={donation.id} className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{donation.location}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(donation.donation_date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Droplet className="w-4 h-4" />
                              {donation.quantity_ml}ml
                            </span>
                          </div>
                        </div>
                        <Badge className={donation.status === "verified" ? "bg-success" : "bg-warning"}>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {donation.status}
                        </Badge>
                      </div>
                      
                      {donation.blockchain_tx_hash && (
                        <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground flex items-center gap-2">
                              <Hash className="w-4 h-4" />
                              Transaction Hash:
                            </span>
                            <code className="font-mono text-primary">{donation.blockchain_tx_hash}</code>
                          </div>
                          {donation.block_number && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Block Number:</span>
                              <code className="font-mono">{donation.block_number}</code>
                            </div>
                          )}
                        </div>
                      )}
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="profile">
                <Card className="p-8">
                  <div className="flex items-center gap-6 mb-8">
                    <Avatar className="w-24 h-24">
                      <AvatarFallback className="text-2xl bg-gradient-primary text-white">JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-2xl font-bold mb-1">{profile?.full_name}</h2>
                      <p className="text-muted-foreground mb-2">
                        Verified Donor since {new Date(profile?.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </p>
                      <Badge className="bg-success">Identity Verified</Badge>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-sm text-muted-foreground">Blood Type</Label>
                      <p className="text-lg font-semibold">{profile?.blood_type || "Not specified"}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Location</Label>
                      <p className="text-lg font-semibold flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {profile?.location || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Wallet Address</Label>
                      <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                        {profile?.wallet_address || "Not connected"}
                      </code>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Total Donations</Label>
                      <p className="text-lg font-semibold">{donations.length} Units</p>
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
        <DonationForm 
          onClose={() => {
            setShowDonationForm(false);
            fetchDonations();
          }} 
        />
      )}
    </div>
  );
};

const Label = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <label className={`block text-sm font-medium ${className}`}>{children}</label>
);

export default DonorDashboard;
