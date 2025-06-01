export const fetchNoiseStations = async () => {
  const res = await fetch('/api/stations');
  if (!res.ok) throw new Error('Failed to fetch station data');
  const json = await res.json();
  return json.data; // API 응답 구조에 따라 .data 접근
};
