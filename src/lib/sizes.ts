export const MENS_UK = [
  "UK 6",
  "UK 6.5",
  "UK 7",
  "UK 7.5",
  "UK 8",
  "UK 8.5",
  "UK 9",
  "UK 9.5",
  "UK 10",
  "UK 10.5",
  "UK 11",
  "UK 12",
];

export const WOMENS_UK = [
  "UK 3",
  "UK 3.5",
  "UK 4",
  "UK 4.5",
  "UK 5",
  "UK 5.5",
  "UK 6",
  "UK 6.5",
  "UK 7",
  "UK 8",
];

export const GS_UK = ["UK 3.5", "UK 4", "UK 4.5", "UK 5", "UK 5.5", "UK 6", "UK 6.5", "UK 7"];

export const PS_UK = ["UK 10C", "UK 11C", "UK 12C", "UK 13C", "UK 1", "UK 2", "UK 3"];

export const TD_UK = ["UK 5C", "UK 6C", "UK 7C", "UK 8C", "UK 9C", "UK 10C"];

export const APPAREL = ["S", "M", "L", "XL", "XXL"];

export const ONE_SIZE = ["One Size"];

export function parseSizes(raw: string) {
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}
