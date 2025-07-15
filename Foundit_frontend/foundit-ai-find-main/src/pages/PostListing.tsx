import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PostListing = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-2xl mx-auto px-4 py-16">
          <Card className="text-center">
            <CardContent className="pt-8 pb-8">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-foreground text-2xl">✓</span>
              </div>
              <h1 className="text-2xl font-semibold text-foreground mb-2">
                Thanks! We'll review and list your product soon.
              </h1>
              <p className="text-muted-foreground mb-6">
                Our team will review your submission and get back to you within 24 hours.
              </p>
              <Button onClick={() => setSubmitted(false)} variant="outline">
                Submit Another Product
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-2xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Post a Product Listing</CardTitle>
            <CardDescription>
              Help users discover your product through AI-powered recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="productName">Product Name *</Label>
                <Input
                  id="productName"
                  placeholder="e.g., Samsung Galaxy Smartphone"
                  required
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  placeholder="e.g., ₹25,000"
                  required
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="productLink">Product Link *</Label>
                <Input
                  id="productLink"
                  type="url"
                  placeholder="https://example.com/product"
                  required
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Short Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Briefly describe your product's key features and benefits..."
                  className="rounded-lg resize-none h-24"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Contact Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label>Product Image</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground text-sm">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-muted-foreground text-xs mt-1">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 p-4 bg-sponsored/10 rounded-lg border border-sponsored/20">
                <Checkbox id="sponsored" />
                <Label htmlFor="sponsored" className="text-sm">
                  Mark as Sponsored (Premium placement in search results)
                </Label>
              </div>

              <Button type="submit" className="w-full rounded-lg" size="lg">
                Submit Product Listing
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default PostListing;