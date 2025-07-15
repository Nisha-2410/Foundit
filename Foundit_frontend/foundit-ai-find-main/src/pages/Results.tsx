import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Results = () => {
  const [searchParams] = useSearchParams();
  const queryFromURL = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(queryFromURL);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchResults = async (query) => {
    if (!query.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}search?q=${encodeURIComponent(query)}`);
      const data = await res.json();

      if (data.success) {
        setResults(data.results);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error("Error fetching results:", err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch results on mount (from URL query)
  useEffect(() => {
    if (queryFromURL) {
      fetchResults(queryFromURL);
    }
  }, [queryFromURL]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Search Bar */}
      <div className="sticky top-16 glass-card border-b border-border z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="What are you looking to buy today?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchResults(searchQuery)}
              className="pl-12 pr-12 h-12 text-base rounded-xl modern-input"
            />
            <Button
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-lg glow-effect"
              style={{ background: 'var(--gradient-primary)' }}
              onClick={() => fetchResults(searchQuery)}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Search Results for "{searchQuery}"
          </h1>
          <p className="text-muted-foreground">
            {loading ? "Loading..." : `Found ${results.length} AI-recommended products`}
          </p>
        </div>

        <div className="space-y-6">
          {results.map((product, index) => (
            <div key={index} className="product-card">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-48 h-48 bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.title} className="object-contain h-full w-full" />
                  ) : (
                    <span className="text-muted-foreground">No Image</span>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-medium text-foreground mb-1">{product.title}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-semibold gradient-text">{product.price}</div>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{product.reason}</p>

                  <Button
                    className="rounded-lg glow-effect"
                    style={{ background: 'var(--gradient-accent)' }}
                    onClick={() => window.open(product.link, "_blank")}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Results;
