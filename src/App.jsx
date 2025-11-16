import React from "react";
import { CharacterList } from "./components/CharacterList";

export default function App() {
  return (
    <div className="h-full bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <CharacterList />
      </div>
    </div>
  );
}
