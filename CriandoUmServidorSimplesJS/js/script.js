// import { createServer } from 'http';

import http from 'http';

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type',
    'text/plain');
  res.end('Hellow Wordld! \n');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
