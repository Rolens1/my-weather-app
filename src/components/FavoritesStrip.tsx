import type { FavCity } from "../hooks/useFavorites";

type Props = {
  items: FavCity[];
  onSelect: (c: FavCity) => void;
  onRemove?: (id: string) => void;
};

export default function FavoritesStrip({ items, onSelect, onRemove }: Props) {
  if (!items.length) return null;
  return (
    <div className="card flex flex-wrap gap-2">
      {items.map((f) => (
        <div
          key={f.id}
          className="flex items-center gap-2 rounded-xl border px-3 py-1.5 bg-white/70"
        >
          <button
            className="font-medium"
            onClick={() => onSelect(f)}
            title="Select favorite"
          >
            {f.name}
            {f.country ? `, ${f.country}` : ""}
          </button>
          {onRemove && (
            <button
              aria-label={`Remove ${f.name}`}
              className="rounded-md border px-2 text-xs hover:bg-zinc-50"
              onClick={() => onRemove(f.id)}
            >
              ×
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
