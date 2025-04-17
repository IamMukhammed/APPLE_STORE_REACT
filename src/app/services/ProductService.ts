import axios from "axios";
import { serverApi } from "../../lib/config";
import { Product, ProductInquiry } from "../../lib/types/product";
import { Member } from "../../lib/types/member";

class ProductService {
    private readonly path: string;

    constructor() {
        this.path = serverApi;
        this.path = process.env.REACT_APP_API_URL || "http://localhost:3003";
    };
    
    public async getProducts(input: ProductInquiry): Promise<Product[]> {
        try {
            let url = `${this.path}/product/all?order=${input.order}&page=${input.page}&limit=${input.limit}`;
            if (input.productCategory)
                url += `&productCategory=${input.productCategory}`;
            if (input.search) url += `&search=${input.search}`;

            const result = await axios.get(url);
            console.log("getProduct:", result);

            return result.data;
        } catch (err) {
            console.log("Error, getProducts:", err);
            throw err;
        }
    };

    public async getProduct(productId: string): Promise<Product> {
        try {
            const url = `${this.path}/product/${productId}`;
            
            console.log("Requesting URL:", url);
            const result = await axios.get(url, { withCredentials: true });
            
            console.log("getProduct:", result);

            return result.data;
        } catch (err) {
            console.log("Error, getProduct:", err);
            throw err;
        }
    };

    public async getSeller(productId: string): Promise<Member> {
        try {
            const url = this.path + "/member/seller";
            const result = await axios.get(url, {withCredentials: true});

            console.log("getSeller:", result);

            return result.data;
        } catch (err) {
            console.log("Error, getSeller:", err);
            throw err;
        }
    };
};

export default ProductService;