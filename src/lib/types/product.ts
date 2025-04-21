import { ProductStatus, ProductCategory, ProductStorage, ProductColor } from '../enums/product.enum';
  
export interface Product {
    productLeftCount: number;
    _id: string;
    productName: string;
    productBrand: string;
    productCategory: ProductCategory;
    productPrice: number;
    productCountInStock: number;
    productStatus: ProductStatus;
    productStorage: ProductStorage;
    productColor: ProductColor;
    productDesc?: string;
    productImages: string[];       // Mahsulot rasmlari
    productViews?: number;         // Optional
    createdAt: Date;
    updatedAt: Date;
}

export interface ProductInquiry {
    search?: string;
    page?: number;
    limit?: number;
    order?: string;
    productCategory?: ProductCategory; // ✅ Shunday bo‘lsa, "ALL" enumga kiritilishi kerak
    productBrands?: string[];
    productSearch?: string;
    countInStock?: number;
}