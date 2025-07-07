import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ResultsPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchResults = async () => {
    console.log("🟢 Fetching from:", `http://localhost:5000/search?q=${encodeURIComponent(query)}`);

    try {
      const res = await fetch(`http://localhost:5000/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();

      console.log("🔵 Response from backend:", data);

      if (data.success) {
        setResults(data.results);
      } else {
        console.warn("⚠️ Backend responded without success");
        setResults([]);
      }
    } catch (err) {
      console.error("❌ Fetch failed", err);
      setResults([]);
    }

    setLoading(false);
  };

  if (query) {
    console.log("🟡 Query from URL:", query);
    fetchResults();
  }
}, [query]);


  return (
    <div className="min-h-screen bg-blue-50 p-6 mt-15">
      <h1 className="text-2xl font-bold text-blue-900 mb-4">
        Results for: <span className="text-blue-700">"{query}"</span>
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl shadow-lg">
              <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover rounded mb-3" />
              <h3 className="text-lg font-bold text-blue-800">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
              <p className="mt-2 text-green-700 text-sm">💡 {item.reason}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="font-bold text-green-700">{item.price}</span>
                <a href={item.link} target="_blank" rel="noreferrer" className="text-sm text-white bg-blue-600 px-4 py-1 rounded hover:bg-blue-700">
                  View
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultsPage;
