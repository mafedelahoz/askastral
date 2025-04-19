import React from "react";

const App = () => {
  return (
    <div
      className="w-screen h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('/background.jpg')",
      }}
    >
      <div className="bg-black bg-opacity-60 p-10 rounded-xl text-white text-center backdrop-blur-sm shadow-xl max-w-md w-full">
        <h1 className="text-4xl font-serif font-bold mb-6 tracking-widest">
          STAR A QUESTION
        </h1>
        <input
          type="text"
          placeholder="Ask the universe..."
          className="w-full p-4 rounded-2xl text-black text-lg placeholder-gray-500 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default App;
