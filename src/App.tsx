import React, { useState } from "react";

const App = () => {
  interface Prediction {
    summary: string;
    advice: string;
    vibe: string;
  }

  interface Response {
    planet?: string;
    zodiac_sign?: string;
    retrograde?: boolean;
    prediction?: Prediction;
    error?: string;
  }

  const [response, setResponse] = useState<Response | null>(null);
  const [loading, setLoading] = useState(false);

  const API_URL = "https://askastral-api.onrender.com";

  const fetchPlanetData = async () => {
    setLoading(true);
    setResponse(null); 

    try {
      const res = await fetch(`${API_URL}/daily-insight`);
      const data = await res.json();
      setResponse(data.most_influential || null); 
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponse({ error: "🌌 Could not connect to the cosmos." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <div className="bg-black bg-opacity-60 p-10 rounded-xl text-white text-center backdrop-blur-sm shadow-xl max-w-2xl w-full overflow-y-auto max-h-[90vh]">
        <h1 className="text-4xl font-serif font-bold mb-6 tracking-widest">
          STAR A QUESTION
        </h1>

        <button
          onClick={fetchPlanetData}
          className="bg-gray-600 hover:bg-purple-700 text-white py-3 px-6 rounded-2xl text-lg font-semibold transition duration-200"
        >
          Get Insight
        </button>

        {loading && <p className="mt-6">✨ Reading the skies...</p>}

        <div className="mt-6 text-left">
          {response ? (
            response.error ? (
              <p className="text-red-400">{response.error}</p>
            ) : (
              <div className="bg-white bg-opacity-10 p-5 rounded-xl backdrop-blur border border-white border-opacity-20">
                <p className="text-xl font-bold uppercase mb-2">
                  {response.planet} in {response.zodiac_sign}
                  {response.retrograde && (
                    <span className="ml-2 text-sm bg-red-600 px-2 py-1 rounded-full">
                      Retrograde
                    </span>
                  )}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Summary:</span> {response.prediction?.summary}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Advice:</span> {response.prediction?.advice}
                </p>
                <p>
                  <span className="font-semibold">Vibe:</span> {response.prediction?.vibe}
                </p>
              </div>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default App;
