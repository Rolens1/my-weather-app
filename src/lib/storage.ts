// helper
// just to save the city and not have to fetch it again

type Box<T> = { exp: number | null; value: T };

// key + time_to_live in milliseconds
// else the item won't ever get deleted/expires
export function setJSON<T>(key: string, value: T, ttlMs?: number) {
  const box: Box<T> = { exp: ttlMs ? Date.now() + ttlMs : null, value };
  localStorage.setItem(key, JSON.stringify(box));
}

// get saved items else return null or delete the item if expired
export function getJSON<T>(key: string): T | null {
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  try {
    const box = JSON.parse(raw) as Box<T>;
    if (box.exp && Date.now() > box.exp) {
      localStorage.removeItem(key);
      return null;
    }
    return box.value;
  } catch {
    return null;
  }
}
