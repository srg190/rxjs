import { useEffect, useMemo, useState } from "react";
import { pokemon$, Pokemon, selected$ } from "./store";

function Search() {
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  useEffect(() => {
    const sub = pokemon$.subscribe(setPokemon);
    return () => sub.unsubscribe();
  }, []);
  const filteredPokemon = useMemo(() => {
    return pokemon.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [pokemon, search]);
  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />
      <div>
        {filteredPokemon.map((v, i) => (
          <div key={v.id}>
            <span>
              <input
                type="checkbox"
                checked={v.selected}
                onChange={() => {
                  if (selected$.value.includes(v.id)) {
                    selected$.next(selected$.value.filter((id) => id != v.id));
                  } else {
                    selected$.next([...selected$.value, v.id]);
                  }
                }}
              />
              <h2>{v.name}</h2>
              <h5>{v.power}</h5>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Search />
    </div>
  );
}

export default App;
