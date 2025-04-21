import React, { ChangeEvent, useEffect, useState, } from "react";
import {
  Box, Button, Container, Stack, Badge, Pagination, PaginationItem
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ProductService from "../../services/ProductService";
import { serverApi } from "../../../lib/config";
import { setProducts } from "./slice";
import { retrieveProducts } from "./selector";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { CartItem } from "../../../lib/types/search";
import { ProductCategory } from "../../../lib/enums/product.enum";
import FilterSortMenu from "../../components/filter/FilterMenu"; // ✅ import qilinadi
import { strict } from "assert";

const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(
  retrieveProducts,
  (products) => ({ products })
);

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
    const { onAdd } = props;
    const { setProducts } = actionDispatch(useDispatch());
    const { products } = useSelector(productsRetriever);
    const history = useHistory();

    const [searchText, setSearchText] = useState<string>("");
    const [selectedSort, setSelectedSort] = useState<string>("Newest");
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

    const [productSearch, setProductSearch] = useState<ProductInquiry>({
        search: "",
        page: 1,
        limit: 8,
        order: "createdAt",
        countInStock: 1,
    });

    useEffect(() => {
        console.log("🔎 Product search state =>", productSearch);
        const service = new ProductService();
        service.getProducts(productSearch).then(setProducts).catch(console.log);
    }, [productSearch]);

    useEffect(() => {
        if (searchText === "") {
            setProductSearch((prev: any) => ({ ...prev, productSearch: "" }));
        }
    }, [searchText]);

    const chooseProductHandler = (id: string) => {
        history.push(`/products/${id}`);
    };

    const searchProductHandler = () => {
        setProductSearch((prev: any) => ({ ...prev, productSearch: searchText }));
    };

    const paginationHandler = (e: ChangeEvent<any>, value: number) => {
        setProductSearch((prev: any) => ({ ...prev, page: value }));
    };

    const handleSortChange = (sort: string) => {
        setSelectedSort(sort);
        setProductSearch((prev: any) => ({
            ...prev,
            page: 1,
            order: sort === "Price" ? "productPrice" :
            sort === "Views" ? "productViews" : "createdAt"
        }));
    };

    const handleCategoryChange = (category: string[]) => {
        setSelectedCategory(category);
      
        setProductSearch((prev) => ({
          ...prev,
          page: 1,
          // category tanlanmasa yoki "All" bo‘lsa — undefined qilib yuboramiz
          productCategory:
            category.length === 0 || category.includes("All")
              ? undefined
              : category[0].toUpperCase() as ProductCategory,
        }));
    };

    return (
        <div className="products">
            <Container>
                <Stack flexDirection="column" alignItems="center">
                    <Stack className="avatar-big-box">
                        <Stack className="top-title">
                            <Box className="top-text">Shop Apple Devices</Box>
                            <Box className="single-search">
                                <input
                                    type="search"
                                    className="single-search-input"
                                    placeholder="Type here"
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && searchProductHandler()}
                                />
                                <Button
                                    className="single-button-search"
                                    variant="contained"
                                    color="primary"
                                    endIcon={<SearchIcon />}
                                    onClick={searchProductHandler}
                                >
                                    Search
                                </Button>
                            </Box>
                        </Stack>
                    </Stack>
                    <Box width="100%" display="flex" justifyContent="flex-end" mb={2}>
                        <FilterSortMenu
                            selectedSort={selectedSort}
                            selectedCategory={selectedCategory}
                            onSortChange={handleSortChange}
                            onCategoryChange={handleCategoryChange} // <-- aynan shu yerda ishlatiladi
                        />
                    </Box>
                    <Stack className="product-wrapper">
                        {products.length !== 0 ? products.map((product) => {
                            const imagePath = `${serverApi}/${product.productImages[0]}`;
                            const sizeVolume = product.productCategory === ProductCategory.SMARTPHONE
                            ? product.productStorage + ""
                            : product.productColor + "";

                        return (
                            <Stack key={product._id} className="product-card" onClick={() => chooseProductHandler(product._id)}>
                                <Stack
                                    className="product-img"
                                    sx={{
                                        backgroundImage: `url(${imagePath})`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center",
                                        backgroundSize: "cover",
                                    }}
                                >
                                    <div className="product-sale">{sizeVolume}</div>
                                    <Button className="shop-btn" onClick={(e) => {
                                        if (product.productLeftCount > 0) {
                                            onAdd({
                                                _id: product._id,
                                                quantity: 1,
                                                name: product.productName,
                                                price: product.productPrice,
                                                image: product.productImages[0],
                                                countInStock: product.productLeftCount || 0,
                                            });
                                        } else alert("Out of stock!");
                                            e.stopPropagation();
                                    }}>
                                        <ShoppingCartIcon sx={{ color: "#f8f8ff" }} />
                                    </Button>
                                    <Button className="view-btn" sx={{ right: "36px" }}>
                                        <Badge badgeContent={product.productViews} color="secondary">
                                            <RemoveRedEyeIcon sx={{ color: product.productViews === 0 ? "gray" : "white" }} />
                                        </Badge>
                                    </Button>
                                </Stack>
                                <Box className="product-desc">
                                    <span className="product-title">{product.productName}</span>
                                    <div className="product-price">
                                        <MonetizationOnIcon /> {product.productPrice}
                                    </div>
                                </Box>
                            </Stack>
                        );
                        }) : (
                            <Box className="no-data">Products are not available!</Box>
                        )}
                    </Stack>
                    <Stack className="pagination-section" spacing={2}>
                        <Pagination
                            count={10}
                            page={productSearch.page}
                            onChange={paginationHandler}
                            renderItem={(item) => (
                                <PaginationItem
                                    components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                                    {...item}
                                    color="secondary"
                                />
                            )}
                        />
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}