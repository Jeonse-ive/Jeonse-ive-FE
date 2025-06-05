export const fetchNoiseStations = async () => {
  const res = await fetch('/api/stations');
  if (!res.ok) throw new Error('Failed to fetch station data');

  const json = await res.json();

  if (!json || !Array.isArray(json.data)) {
    console.error("잘못된 응답 형식", json);
    throw new Error('Invalid data format');
  }

  return json.data;
};
