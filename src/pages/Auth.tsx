import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Wallet, Droplet, Building2, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [role, setRole] = useState<string>("donor");
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    bloodType: "",
    phone: "",
    location: "",
    hospitalName: "",
    licenseNumber: "",
    address: "",
    city: ""
  });

  useEffect(() => {
    if (user) {
      navigate(`/dashboard/${role}`);
    }
  }, [user, role, navigate]);

  const handleConnectWallet = () => {
    // Simulate MetaMask connection
    setWalletConnected(true);
    toast({
      title: "Wallet Connected",
      description: "0x742d...3a4f successfully connected",
    });
  };

  const handleSignup = async () => {
    if (!formData.email || !formData.password || !formData.fullName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: formData.fullName,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        // Update profile with additional info
        await supabase
          .from("profiles")
          .update({
            full_name: formData.fullName,
            blood_type: role === "donor" && formData.bloodType ? formData.bloodType as any : null,
            phone: formData.phone,
            location: formData.location,
            wallet_address: walletConnected ? "0x742d...3a4f" : null,
          })
          .eq("id", data.user.id);

        // Assign role
        await supabase.from("user_roles").insert({
          user_id: data.user.id,
          role: role as "donor" | "hospital" | "admin",
        });

        // If hospital, create hospital record
        if (role === "hospital") {
          await supabase.from("hospitals").insert({
            user_id: data.user.id,
            hospital_name: formData.hospitalName,
            license_number: formData.licenseNumber,
            address: formData.address,
            city: formData.city,
            verified: false,
          });
        }

        toast({
          title: "Registration Successful",
          description: "Welcome! Redirecting to your dashboard...",
        });

        setTimeout(() => {
          navigate(`/dashboard/${role}`);
        }, 1500);
      }
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      toast({
        title: "Missing Information",
        description: "Please enter email and password",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });

      setTimeout(() => {
        navigate(`/dashboard/${role}`);
      }, 1000);
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <Card className="w-full max-w-md p-8 shadow-glow relative backdrop-blur-sm bg-card/95 animate-slide-up">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4 animate-pulse-slow shadow-glow">
            <Droplet className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-gradient">Welcome Back</h1>
          <p className="text-muted-foreground">Access your blockchain blood tracker account</p>
        </div>

        {/* Wallet Connection */}
        <div className="mb-6">
          {!walletConnected ? (
            <Button 
              onClick={handleConnectWallet} 
              variant="outline" 
              className="w-full transition-all hover:scale-105 hover:shadow-glow"
            >
              <Wallet className="w-4 h-4 mr-2" />
              Connect MetaMask Wallet
            </Button>
          ) : (
            <div className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded-lg animate-slide-up">
              <div className="flex items-center gap-2">
                <Badge className="bg-success animate-pulse-slow">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  Connected
                </Badge>
                <span className="text-sm font-mono">0x742d...3a4f</span>
              </div>
            </div>
          )}
        </div>

        {/* Role Selection */}
        <div className="mb-6">
          <Label className="mb-2 block">Select Your Role</Label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="donor">
                <div className="flex items-center">
                  <Droplet className="w-4 h-4 mr-2" />
                  Donor
                </div>
              </SelectItem>
              <SelectItem value="hospital">
                <div className="flex items-center">
                  <Building2 className="w-4 h-4 mr-2" />
                  Hospital
                </div>
              </SelectItem>
              <SelectItem value="admin">
                <div className="flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  Admin
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <div>
              <Label htmlFor="login-email">Email</Label>
              <Input 
                id="login-email" 
                type="email" 
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="login-password">Password</Label>
              <Input 
                id="login-password" 
                type="password" 
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <Button 
              onClick={handleLogin} 
              disabled={loading}
              className="w-full bg-gradient-primary hover:opacity-90 transition-all hover:scale-105 shadow-lg"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <div>
              <Label htmlFor="signup-name">Full Name</Label>
              <Input 
                id="signup-name" 
                type="text" 
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="signup-email">Email</Label>
              <Input 
                id="signup-email" 
                type="email" 
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="signup-password">Password</Label>
              <Input 
                id="signup-password" 
                type="password" 
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            {role === "donor" && (
              <>
                <div>
                  <Label htmlFor="blood-type">Blood Type</Label>
                  <Select value={formData.bloodType} onValueChange={(value) => setFormData({ ...formData, bloodType: value })}>
                    <SelectTrigger id="blood-type">
                      <SelectValue placeholder="Select blood type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    type="text" 
                    placeholder="City, State"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
              </>
            )}
            {role === "hospital" && (
              <>
                <div>
                  <Label htmlFor="hospital-name">Hospital Name</Label>
                  <Input 
                    id="hospital-name" 
                    type="text" 
                    placeholder="City General Hospital"
                    value={formData.hospitalName}
                    onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="license">License Number</Label>
                  <Input 
                    id="license" 
                    type="text" 
                    placeholder="LIC123456"
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address" 
                    type="text" 
                    placeholder="123 Main St"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" 
                    type="text" 
                    placeholder="New York"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
              </>
            )}
            <Button 
              onClick={handleSignup} 
              disabled={loading}
              className="w-full bg-gradient-primary hover:opacity-90 transition-all hover:scale-105 shadow-lg"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Auth;
