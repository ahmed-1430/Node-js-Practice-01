
import type { IncomingMessage } from "node:http";

export const parseBody = (req: IncomingMessage): Promise<any> => {
    return new Promise((resolve, reject) => {
        let body = ""
        req.on('data', (chunk) => {
            body += chunk.toString()
        })
        req.on("end", () => {
            try {
                resolve(body ? JSON.parse(body) : {})
            } catch (error) {
                reject(error)
            }
        })
        // console.log(req);
    })


}