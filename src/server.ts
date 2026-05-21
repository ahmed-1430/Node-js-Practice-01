import { createServer, IncomingMessage, Server, ServerResponse } from "http";

const server: Server = createServer((req: IncomingMessage, res: ServerResponse) => {
    // console.log(req.method);
    // console.log(req.url);
    const url = req.url
    const method = req.method

    if (url == '/' && method == 'GET') {
        res.writeHead(200, { "content-type": 'application/json' });
        res.end(JSON.stringify({ message: 'this is root route...' }))
    } else if (url?.startsWith('/products')) {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ message: 'this is product route' }))
    }
    else {
        res.writeHead(404, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route Not Found' }))
    }
}
);


server.listen(5000, () => {
    console.log('server is running on port 5000');
})