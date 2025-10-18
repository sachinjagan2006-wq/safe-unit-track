import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplet, Shield, Activity, Users, CheckCircle, Lock, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center animate-slide-up">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 animate-pulse-slow">
              <Shield className="w-3 h-3 mr-1" />
              Blockchain-Powered
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <span className="text-gradient">Blood Donation</span> Tracker
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
              A decentralized platform ensuring transparent, secure, and traceable blood donations through blockchain technology
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate("/auth")} className="w-full sm:w-auto bg-gradient-primary hover:opacity-90 shadow-glow transition-all hover:scale-105">
                <Droplet className="w-5 h-5 mr-2" />
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/auth")} className="w-full sm:w-auto hover:scale-105 transition-all">
                <Lock className="w-5 h-5 mr-2" />
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
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
          <Card className="p-8 hover:shadow-glow transition-all duration-300 border-primary/20 hover:scale-105 hover:-translate-y-2 group">
            <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:animate-pulse-slow shadow-lg">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Tamper-Proof Records</h3>
            <p className="text-muted-foreground">
              All donations are recorded on blockchain, ensuring immutable and verifiable transaction history
            </p>
          </Card>

          <Card className="p-8 hover:shadow-glow transition-all duration-300 border-primary/20 hover:scale-105 hover:-translate-y-2 group">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-6 group-hover:animate-pulse-slow shadow-lg">
              <Activity className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Real-Time Tracking</h3>
            <p className="text-muted-foreground">
              Track blood units from donation to transfusion with complete transparency and accountability
            </p>
          </Card>

          <Card className="p-8 hover:shadow-glow transition-all duration-300 border-primary/20 hover:scale-105 hover:-translate-y-2 group">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-6 group-hover:animate-pulse-slow shadow-lg">
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
            <div className="text-center group">
              <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-6 shadow-glow group-hover:scale-110 transition-transform">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Register & Verify</h3>
              <p className="text-muted-foreground">
                Donors and hospitals create profiles with blockchain-verified identity
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-6 shadow-glow group-hover:scale-110 transition-transform">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Donate or Request</h3>
              <p className="text-muted-foreground">
                Donors contribute blood, hospitals request units - all recorded via smart contracts
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-6 shadow-glow group-hover:scale-110 transition-transform">
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
          <div className="text-center group cursor-pointer">
            <div className="text-5xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform">
              1,250+
            </div>
            <p className="text-muted-foreground">Verified Donors</p>
          </div>
          <div className="text-center group cursor-pointer">
            <div className="text-5xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform">
              450+
            </div>
            <p className="text-muted-foreground">Hospital Partners</p>
          </div>
          <div className="text-center group cursor-pointer">
            <div className="text-5xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform">
              5,680+
            </div>
            <p className="text-muted-foreground">Blood Units Tracked</p>
          </div>
          <div className="text-center group cursor-pointer">
            <div className="text-5xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform">
              100%
            </div>
            <p className="text-muted-foreground">Transparency Rate</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <CheckCircle className="w-16 h-16 mx-auto mb-6 text-white animate-pulse-slow" />
          <h2 className="text-4xl font-bold mb-4 text-white">Ready to Make a Difference?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
            Join our transparent blockchain-powered platform and help save lives with verified, secure donations
          </p>
          <Button size="lg" variant="secondary" onClick={() => navigate("/auth")} className="hover:scale-105 transition-all shadow-glow">
            Start Your Journey
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
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
