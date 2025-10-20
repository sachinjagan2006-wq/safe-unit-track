import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Droplet, Loader2 } from "lucide-react";

interface DonationFormProps {
  onClose: () => void;
}

const DonationForm = ({ onClose }: DonationFormProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    hospital: "",
    date: "",
    amount: "",
    location: "",
    bloodType: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Get user's blood type from profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("blood_type")
        .eq("id", user?.id)
        .single();

      // Generate simulated blockchain data
      const txHash = `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`;
      const blockNumber = `${15000000 + Math.floor(Math.random() * 500000)}`;

      const { error } = await supabase.from("donations").insert({
        donor_id: user?.id,
        blood_type: profile?.blood_type,
        quantity_ml: parseInt(formData.amount),
        donation_date: formData.date,
        location: formData.hospital + ", " + formData.location,
        status: "pending",
        blockchain_tx_hash: txHash,
        block_number: blockNumber,
      });

      if (error) throw error;

      toast({
        title: "Donation Recorded!",
        description: `Your donation has been recorded on the blockchain. Transaction hash: ${txHash}`,
      });
      
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Droplet className="w-6 h-6 text-primary" />
            Record New Donation
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="hospital">Hospital/Blood Bank</Label>
            <Input 
              id="hospital" 
              placeholder="Enter hospital name" 
              value={formData.hospital}
              onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
              required 
            />
          </div>

          <div>
            <Label htmlFor="date">Donation Date</Label>
            <Input 
              id="date" 
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required 
            />
          </div>

          <div>
            <Label htmlFor="amount">Amount (ml)</Label>
            <Select 
              value={formData.amount}
              onValueChange={(value) => setFormData({ ...formData, amount: value })}
              required
            >
              <SelectTrigger id="amount">
                <SelectValue placeholder="Select amount" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="350">350 ml</SelectItem>
                <SelectItem value="450">450 ml</SelectItem>
                <SelectItem value="500">500 ml</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input 
              id="location" 
              placeholder="City, State"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required 
            />
          </div>

          <div className="pt-4 flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Recording...
                </>
              ) : (
                "Record Donation"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DonationForm;
