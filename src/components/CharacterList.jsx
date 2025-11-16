import React, { useEffect, useState } from "react";

import { CharacterCard } from "./CharacterCard";
import { CharacterModal } from "./CharacterModal";
import { Pagination } from "./Pagination";
import { fetchPeople, fetchResource } from "../api/api";
import { Search } from "lucide-react";

export const CharacterList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [expanded, setExpanded] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchPeople(page, search)
      .then(async (d) => {
        setData(d);

        const results = d.results;

        const expandedPeople = await Promise.all(
          results.map(async (p) => {
            const hw = await fetchResource(p.homeworld);

            const species =
              p.species.length > 0
                ? await fetchResource(p.species[0])
                : { name: "Human" };

            const films = await Promise.all(
              p.films.map((f) => fetchResource(f))
            );

            return {
              ...p,
              homeworldName: hw.name,
              speciesName: species.name,
              filmTitles: films.map((f) => f.title),
            };
          })
        );

        setExpanded(expandedPeople);
      })
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, [page, search]);

  return (
    <section className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <h1 className="text-3xl text-center font-bold text-gray-900 tracking-tight">
          Star Wars Characters
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-8">
          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <input
              className="w-full backdrop-blur-md bg-white/70 border border-gray-200 shadow-sm
               rounded-xl py-2.5 pl-12 pr-4 text-sm
               focus:ring-2 focus:ring-blue-500 focus:border-blue-500
               transition-all duration-200"
              value={search}
              placeholder="Search characters..."
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={18} strokeWidth={2} />
            </span>
          </div>

          {/* Top Pagination */}
          {data && data.count > 0 && (
            <div className="mt-4 sm:mt-0">
              <Pagination
                page={page}
                totalPages={Math.ceil(data.count / 10)}
                onPage={setPage}
              />
            </div>
          )}
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="p-4 bg-white rounded-2xl shadow-sm">
                <div className="h-40 rounded-xl bg-gray-200 animate-pulse"></div>

                <div className="mt-4 h-4 rounded bg-gray-200 animate-pulse"></div>
                <div className="mt-2 h-4 w-1/2 rounded bg-gray-200 animate-pulse"></div>

                <div className="mt-4 flex gap-2">
                  <div className="h-8 flex-1 rounded-lg bg-gray-200 animate-pulse"></div>
                  <div className="h-8 flex-1 rounded-lg bg-gray-200 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error UI */}
        {error && !loading && (
          <div className="mt-16 text-red-600 bg-red-50 border border-red-200 rounded-xl p-6 text-center font-medium">
            ❌ {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && data && data.results.length === 0 && (
          <div className="flex flex-col items-center justify-center py-28 text-gray-500">
            <p className="text-lg font-semibold">No characters found</p>
            <p className="text-sm text-gray-400 mt-1">
              Try a different search keyword
            </p>
          </div>
        )}

        {/* Character Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {data?.results?.map((p) => (
            <CharacterCard key={p.url} p={p} onOpen={setSelected} />
          ))}
        </div>

        {/* Modal */}
        <CharacterModal person={selected} onClose={() => setSelected(null)} />
      </div>
    </section>
  );
};
