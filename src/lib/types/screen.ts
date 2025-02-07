import { Member } from "./member";
import { Product } from "./product";

/* REACT APP STATE */
export interface AppRootState {
    homePage: HomePageState;
    productsPage: ProductsPageState;
}
/* Biz bu yerda sintaz qilyabmiz ya'ni guruxlarga bolyabmiz */

/* HOMEPAGE SCREEN COMPONENTS */
export interface HomePageState {
    popularDishes: Product[];
    newDishes: Product[];
    topUsers: Member[];
}

/* PRODUCTS PAGE */
export interface ProductsPageState {

}

/* ORDERS PAGE */
