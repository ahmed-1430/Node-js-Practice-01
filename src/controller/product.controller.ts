import type { IncomingMessage, ServerResponse } from "node:http";
import { insertProduct, readProduct } from "../service/product.service";
import type { Iproduct } from "../types/product.type";
import { parseBody } from "../utility/parsebody";

export const productController = async (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;
    const products = readProduct();

    const urlParts = url?.split('/');
    const id = urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null
    // console.log(id);

    if (url === '/products' && method === 'GET') {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ message: 'Product Retrieved Successfully', data: products }));
    } else if (method === "GET" && id !== null) {
        const products = readProduct();
        const product = products.find((p: Iproduct) => p.id === id)
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({
            message: 'Product Retrieved Successfully',
            data: product
        }))
        console.log(product);
    } else if (method === "POST" && url === '/products') {
        const body = await parseBody(req);
        const newProduct = {
            id: Date.now(),
            ...body,

        };
        const products = readProduct();
        products.push(newProduct);
        insertProduct(products)

        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify({
            message: 'Product created Successfully',
            data: newProduct
        }))

    }

}