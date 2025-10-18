import { useState } from "react";
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

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [role, setRole] = useState<string>("donor");
  const [walletConnected, setWalletConnected] = useState(false);

  const handleConnectWallet = () => {
    // Simulate MetaMask connection
    setWalletConnected(true);
    toast({
      title: "Wallet Connected",
      description: "0x742d...3a4f successfully connected",
    });
  };

  const handleAuth = (type: "login" | "signup") => {
    toast({
      title: type === "login" ? "Login Successful" : "Registration Successful",
      description: `Welcome! Redirecting to ${role} dashboard...`,
    });
    
    setTimeout(() => {
      navigate(`/dashboard/${role}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-glow">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4">
            <Droplet className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Access your blockchain blood tracker account</p>
        </div>

        {/* Wallet Connection */}
        <div className="mb-6">
          {!walletConnected ? (
            <Button 
              onClick={handleConnectWallet} 
              variant="outline" 
              className="w-full"
            >
              <Wallet className="w-4 h-4 mr-2" />
              Connect MetaMask Wallet
            </Button>
          ) : (
            <div className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded-lg">
              <div className="flex items-center gap-2">
                <Badge className="bg-success">
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
              <Input id="login-email" type="email" placeholder="your@email.com" />
            </div>
            <div>
              <Label htmlFor="login-password">Password</Label>
              <Input id="login-password" type="password" placeholder="••••••••" />
            </div>
            <Button onClick={() => handleAuth("login")} className="w-full">
              Login
            </Button>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <div>
              <Label htmlFor="signup-name">Full Name</Label>
              <Input id="signup-name" type="text" placeholder="John Doe" />
            </div>
            <div>
              <Label htmlFor="signup-email">Email</Label>
              <Input id="signup-email" type="email" placeholder="your@email.com" />
            </div>
            <div>
              <Label htmlFor="signup-password">Password</Label>
              <Input id="signup-password" type="password" placeholder="••••••••" />
            </div>
            {role === "donor" && (
              <div>
                <Label htmlFor="blood-type">Blood Type</Label>
                <Select>
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
            )}
            <Button onClick={() => handleAuth("signup")} className="w-full">
              Create Account
            </Button>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Auth;
