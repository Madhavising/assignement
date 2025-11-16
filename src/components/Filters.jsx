import React from "react";

export const Filters = ({
  search,
  setSearch,
  filters,
  setFilters,
  homeworldOptions,
  speciesOptions,
  filmOptions,
  clearFilters,
}) => {
  return (
    <div className="flex flex-wrap gap-3 items-center mb-6">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search characters..."
        className="rounded-xl border px-3 py-2 shadow-sm"
      />

      <select
        value={filters.homeworld}
        onChange={(e) =>
          setFilters((s) => ({ ...s, homeworld: e.target.value }))
        }
        className="rounded-xl border px-3 py-2 shadow-sm"
      >
        <option value="">Homeworld</option>
        {homeworldOptions.map((p) => (
          <option key={p.url} value={p.url}>
            {p.name}
          </option>
        ))}
      </select>

      <select
        value={filters.species}
        onChange={(e) =>
          setFilters((s) => ({ ...s, species: e.target.value }))
        }
        className="rounded-xl border px-3 py-2 shadow-sm"
      >
        <option value="">Species</option>
        {speciesOptions.map((s) => (
          <option key={s.url} value={s.url}>
            {s.name}
          </option>
        ))}
      </select>

      <select
        value={filters.film}
        onChange={(e) =>
          setFilters((s) => ({ ...s, film: e.target.value }))
        }
        className="rounded-xl border px-3 py-2 shadow-sm"
      >
        <option value="">Film</option>
        {filmOptions.map((f) => (
          <option key={f.url} value={f.url}>
            {f.title}
          </option>
        ))}
      </select>

      <button
        onClick={clearFilters}
        className="rounded-xl border px-3 py-2 shadow-sm bg-gray-50 hover:bg-gray-100"
      >
        Clear
      </button>
    </div>
  );
};
