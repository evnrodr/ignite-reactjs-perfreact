import { FormEvent, useCallback, useState } from "react";
import { SearchResults } from "../components/SearchResults";

interface Response {
  id: number;
  title: string;
  price: number;
}

interface Product {
  id: number;
  title: string;
  price: number;
  priceFormatted: string;
}

interface Results {
  totalPrice: number;
  products: Product[];
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Results>();

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();
    const products = data.map((product: Response) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: formatter.format(product.price),
      };
    });

    const totalPrice = products.reduce((acc: number, product: Product) => {
      return acc + product.price;
    }, 0);

    setResults({ totalPrice, products });
  }

  const addToWishlist = useCallback((id: number) => {
    console.log(id);
  }, []);

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit">Buscar</button>
      </form>

      {results && (
        <SearchResults results={results} onAddToWishlist={addToWishlist} />
      )}
    </div>
  );
}
