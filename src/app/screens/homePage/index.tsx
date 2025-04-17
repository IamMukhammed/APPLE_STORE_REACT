import { useEffect } from "react";
import Statistics from "./Statistics";
import PopularProducts from "./PopularProducts";
import NewProducts from "./NewProducts";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewProducts, setPopularProducts, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCategory } from "../../../lib/enums/product.enum";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import "../../../css/home.css"


/* REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularProducts: (data: Product[]) => dispatch(setPopularProducts(data)),
  setNewProducts: (data: Product[]) => dispatch(setNewProducts(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

export default function HomePage() {
  /* Selector: Store (Redux Store) => DATA */
  const { setPopularProducts, setNewProducts, setTopUsers } = actionDispatch(useDispatch());

  console.log(process.env.REACT_APP_API_URL);

  useEffect(() => {
    /* Backend server data request => DATA */
    const product = new ProductService();
    product
    .getProducts({
      page: 1,
      limit: 4,
      order: "productViews",
      productCategory: ProductCategory.SMARTPHONE,
      search: ""
    })
    .then((data) => {
      setPopularProducts(data);
    })
    .catch((err) => console.log(err));

    product
    .getProducts({
      page: 1,
      limit: 4,
      order: "createdAt",
      productCategory: ProductCategory.SMARTPHONE,
      search: ""
    })
    .then((data) => {
      setNewProducts(data);
    })
    .catch((err) => console.log(err));

    const member = new MemberService();
    member
    .getTopUsers()
    .then((data) => {
      setTopUsers(data);
    })
    .catch((err) => console.log(err));

    /* Slice: DATA => Store (Redux Store) */
  }, []);

  return (
    <div className={"homepage"}>
      <Statistics />
      <PopularProducts />
      <NewProducts />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
};

  