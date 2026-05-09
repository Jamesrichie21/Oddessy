export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const { endpoint, ...params } = req.query;
  if (!endpoint) return res.status(400).json({ error: 'Missing endpoint' });
  const API_KEY = process.env.API_FOOTBALL_KEY;
  const url = `https://v3.football.api-sports.io/${endpoint}`;
  const query = new URLSearchParams(params).toString();
  const fullUrl = query ? `${url}?${query}` : url;
  try {
    const response = await fetch(fullUrl, { headers: { 'x-apisports-key': API_KEY } });
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Proxy error' });
  }
}
