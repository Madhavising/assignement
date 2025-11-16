import React from "react";

const speciesColor = (speciesUrls) => {
  if (!speciesUrls || speciesUrls.length === 0) return "bg-slate-100";
  const id = speciesUrls[0].split("/").filter(Boolean).pop();
  const map = {
    "1": "bg-yellow-100",
    "2": "bg-green-100",
  };
  return map[id] || "bg-indigo-100";
};

export const CharacterCard = ({ p, onOpen }) => {
  const randomImg = `https://picsum.photos/seed/${p.name}/500/380`;

  return (
    <div
      onClick={() => onOpen(p)}
      className="group cursor-pointer rounded-3xl overflow-hidden shadow-lg bg-white border border-gray-100
                 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.03]"
    >
      {/* Top Banner */}
      <div className="relative h-52 w-full overflow-hidden">
        <img
          src={randomImg}
          alt={p.name}
          className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
        />

        {/* Floating Badge */}
        <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full
                        text-[11px] text-gray-700 font-medium shadow-sm">
          {p.films.length} Films
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />

        {/* Name */}
        <h3 className="absolute bottom-3 left-4 text-white text-xl font-semibold tracking-wide drop-shadow-md">
          {p.name}
        </h3>
      </div>

      {/* Body Section */}
      <div className="px-5 py-4 space-y-3">
        {/* Stats */}
        <div className="flex items-center justify-between text-gray-600 text-sm">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Height</span>
            <span className="font-medium">{p.height} cm</span>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-400">Birth Year</span>
            <span className="font-medium">{p.birth_year}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* Footer */}
      <div className="px-5 py-3 bg-gray-50 flex items-center justify-between
                      border-t border-gray-200">
        <span className="text-xs text-gray-500">Tap to view full profile</span>

        <span className="text-blue-600 font-semibold text-sm group-hover:translate-x-1
                         transition-transform duration-300">
          Explore →
        </span>
      </div>
    </div>
  );
};
