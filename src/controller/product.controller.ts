import type { IncomingMessage, ServerResponse } from "node:http";
import { readProduct } from "../service/product.service";
import type { Iproduct } from "../types/product.type";

export const productController = (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;
    const product = readProduct();

    const urlParts = url?.split('/');
    const id = urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null
    console.log(id);

    if (url === '/products' && method === 'GET') {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ message: 'Product Retrieved Successfully', data: product }))
    } else if (method === "GET" && id !== null) {
        const products = readProduct();
        const product = products.find((p:Iproduct)=> p.id === id)
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ message: 'Product Retrieved Successfully', data: product }))
        console.log(product);

    }

}