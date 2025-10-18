import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplet, Shield, Activity, Users, CheckCircle, Lock } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              <Shield className="w-3 h-3 mr-1" />
              Blockchain-Powered
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Blood Donation Tracker
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              A decentralized platform ensuring transparent, secure, and traceable blood donations through blockchain technology
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="w-full sm:w-auto">
                  <Droplet className="w-5 h-5 mr-2" />
                  Get Started
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <Lock className="w-5 h-5 mr-2" />
                  Connect Wallet
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </section>

      {/* Features Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Blockchain for Blood Donation?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ensuring trust, transparency, and security in every blood donation transaction
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 hover:shadow-glow transition-all duration-300 border-primary/20">
            <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Tamper-Proof Records</h3>
            <p className="text-muted-foreground">
              All donations are recorded on blockchain, ensuring immutable and verifiable transaction history
            </p>
          </Card>

          <Card className="p-8 hover:shadow-glow transition-all duration-300 border-primary/20">
            <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6">
              <Activity className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Real-Time Tracking</h3>
            <p className="text-muted-foreground">
              Track blood units from donation to transfusion with complete transparency and accountability
            </p>
          </Card>

          <Card className="p-8 hover:shadow-glow transition-all duration-300 border-primary/20">
            <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6">
              <Users className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Smart Matching</h3>
            <p className="text-muted-foreground">
              Intelligent algorithm matches donors with recipients based on blood type, location, and urgency
            </p>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to ensure secure and transparent blood donation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-6 shadow-glow">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Register & Verify</h3>
              <p className="text-muted-foreground">
                Donors and hospitals create profiles with blockchain-verified identity
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-6 shadow-glow">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Donate or Request</h3>
              <p className="text-muted-foreground">
                Donors contribute blood, hospitals request units - all recorded via smart contracts
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-6 shadow-glow">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Track & Verify</h3>
              <p className="text-muted-foreground">
                Monitor the entire journey with transparent blockchain verification
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              1,250+
            </div>
            <p className="text-muted-foreground">Verified Donors</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              450+
            </div>
            <p className="text-muted-foreground">Hospital Partners</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              5,680+
            </div>
            <p className="text-muted-foreground">Blood Units Tracked</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              100%
            </div>
            <p className="text-muted-foreground">Transparency Rate</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-6 text-white" />
          <h2 className="text-4xl font-bold mb-4 text-white">Ready to Make a Difference?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
            Join our transparent blockchain-powered platform and help save lives with verified, secure donations
          </p>
          <Link to="/auth">
            <Button size="lg" variant="secondary">
              Start Your Journey
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 Blockchain Blood Tracker. Powered by secure blockchain technology.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
