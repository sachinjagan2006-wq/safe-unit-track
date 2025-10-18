import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Droplet, Loader2 } from "lucide-react";

interface DonationFormProps {
  onClose: () => void;
}

const DonationForm = ({ onClose }: DonationFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate blockchain transaction
    setTimeout(() => {
      toast({
        title: "Donation Recorded!",
        description: "Your donation has been verified and added to the blockchain. Transaction hash: 0x1a2b...3c4d",
      });
      setIsSubmitting(false);
      onClose();
    }, 2000);
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
            <Input id="hospital" placeholder="Enter hospital name" required />
          </div>

          <div>
            <Label htmlFor="date">Donation Date</Label>
            <Input id="date" type="date" required />
          </div>

          <div>
            <Label htmlFor="amount">Amount (ml)</Label>
            <Select required>
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
            <Input id="location" placeholder="City, State" required />
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
