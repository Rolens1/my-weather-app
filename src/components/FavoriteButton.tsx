import type { TGeo } from "../api/schemas";

type Props = {
  city: TGeo | null;
  isFavorite: (c: TGeo) => boolean;
  toggleFavorite: (c: TGeo) => void;
  size?: "sm" | "md";
};

export default function FavoriteButton({
  city,
  isFavorite,
  toggleFavorite,
  size = "md",
}: Props) {
  if (!city) return null;
  const active = isFavorite(city);
  const cls = size === "sm" ? "h-8 w-8" : "h-9 w-9";

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      title={active ? "Remove from favorites" : "Add to favorites"}
      onClick={() => toggleFavorite(city)}
      className={`grid place-items-center rounded-full border ${
        active ? "bg-yellow-100 border-yellow-300" : "bg-white hover:bg-zinc-50"
      } ${cls}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          fill={active ? "#f59e0b" : "none"}
          stroke={active ? "#f59e0b" : "currentColor"}
          strokeWidth="1.5"
        />
      </svg>
    </button>
  );
}
