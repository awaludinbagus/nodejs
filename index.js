import http from 'node:http';
import { getDataFromDB } from './database/db.js';
import { json } from 'node:stream/consumers';
import { error } from 'node:console';

const server = http.createServer(async (req, res) => {
  const destination = await getDataFromDB();
if (req.url === '/api' && req.method === 'GET') {

    console.log('Received request for /api');
    res.end(JSON.stringify(destination));
} else if (req.url === '/api/continent' && req.method === 'GET') {
    res.end(JSON.stringify(destination.map(item => item.continent)));
} else {
  res.statusCode = 404;
  res.end(JSON.stringify({ 
    error: 'Not Found', 
    message: 'The requested resource was not found on this server.' }));
}
});


const PORT = 8000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
