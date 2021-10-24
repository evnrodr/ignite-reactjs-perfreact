import { List, ListRowRenderer } from "react-virtualized";

import { ProductItem } from "./ProductItem";

type SearchResultProps = {
  results: {
    totalPrice: number;
    products: {
      id: number;
      title: string;
      price: number;
      priceFormatted: string;
    }[];
  };
  onAddToWishlist: (id: number) => void;
};

export function SearchResults({ results, onAddToWishlist }: SearchResultProps) {
  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          product={results.products[index]}
          onAddToWishlist={onAddToWishlist}
        />
      </div>
    );
  };

  return (
    <div>
      <h2>{results.totalPrice}</h2>

      <List
        height={300}
        width={900}
        rowHeight={30}
        overscanRowCount={5}
        rowCount={results.products.length}
        rowRenderer={rowRenderer}
      />
    </div>
  );
}
