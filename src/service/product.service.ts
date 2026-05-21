import path from "node:path"
import fs from "fs"

export const readProduct = () => {
    const filePath = path.join(process.cwd(), "./src/database/db.json")

    // console.log(filePath);

    const products = fs.readFileSync(filePath, "utf-8")
    // console.log(products.toString());
    // console.log(products);
    return JSON.parse(products);
}