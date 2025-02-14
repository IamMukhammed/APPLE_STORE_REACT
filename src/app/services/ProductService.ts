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
            if (input.productCollection)
                url += `&productCollection=${input.productCollection}`;
            if (input.search) url += `&search=${input.search}`;

            // const API_BASE_URL = "http://localhost:3003";

            // axios.get(`${API_BASE_URL}/member/restaurant`)
            // .then(response => console.log(response.data))
            // .catch(error => console.error("Error, getRestaurant:", error));

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
            const url = `${this.path}/product${productId}`;
            
            console.log("Requesting URL:", url);
            const result = await axios.get(url, { withCredentials: true });
            
            console.log("getProduct:", result);

            // const API_BASE_URL = "http://localhost:3003";

            // const getProduct = async (productId: string) => {
            //     try {
            //         const response = await axios.get(`${API_BASE_URL}/product/${productId}`);
            //         return response.data;
            //     } catch (error) {
            //         return console.error("Error, getProduct:", error);
            //     }
            // };

            return result.data;
        } catch (err) {
            // console.log("Error, getProduct:", err);
            throw err;
        }
    };

    public async getRestaurant(productId: string): Promise<Member> {
        try {
            const url = this.path + "/member/restaurant";
            const result = await axios.get(url, {withCredentials: true});

            console.log("getRestaurant:", result);

            return result.data;
        } catch (err) {
            console.log("Error, getRestaurant:", err);
            throw err;
        }
    };
};

export default ProductService;