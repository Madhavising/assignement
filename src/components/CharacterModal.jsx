import React, { useEffect, useState } from "react";
import { cmToMeters, formatDateNow } from "../utils/format";
import { fetchResource } from "../api/api";

export const CharacterModal = ({ person, onClose }) => {
  const [planet, setPlanet] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!person) return;
    setLoading(true);

    fetchResource(person.homeworld)
      .then((p) => setPlanet(p))
      .catch(() => setPlanet(null))
      .finally(() => setLoading(false));
  }, [person]);

  if (!person) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
      
      {/* Modal Box */}
      <div className="relative bg-white/90 backdrop-blur-lg border border-gray-200 shadow-2xl rounded-2xl p-8 w-full max-w-xl animate-slideUp">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center 
                     text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition"
        >
          ✕
        </button>

        {/* Name */}
        <h2 className="text-3xl font-semibold text-gray-900 mb-6">
          {person.name}
        </h2>

        <div className="space-y-6">
          {/* Main Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Character Details</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
              <p><span className="font-medium">Height:</span> {cmToMeters(person.height)}</p>
              <p><span className="font-medium">Mass:</span> {person.mass} kg</p>
              <p><span className="font-medium">Birth Year:</span> {person.birth_year}</p>
              <p><span className="font-medium">Films:</span> {person.films.length}</p>
              <p><span className="font-medium">Date Added:</span> {formatDateNow()}</p>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-200" />

          {/* Homeworld */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Homeworld</h3>

            {loading && <p className="text-gray-500 text-sm">Loading homeworld...</p>}

            {planet && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
                <p><span className="font-medium">Name:</span> {planet.name}</p>
                <p><span className="font-medium">Terrain:</span> {planet.terrain}</p>
                <p><span className="font-medium">Climate:</span> {planet.climate}</p>
                <p><span className="font-medium">Population:</span> {planet.population}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
