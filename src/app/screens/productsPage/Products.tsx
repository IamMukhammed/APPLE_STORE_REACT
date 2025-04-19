import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Checkbox, Container, FormControlLabel, Stack, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { setProducts } from "./slice";
import { retrieveProducts } from "./selector";
import ProductService from "../../services/ProductService";
import { ProductCategory } from "../../../lib/enums/product.enum";
import { useDispatch, useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

/* REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
    setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(
    retrieveProducts, 
    ( products ) => ({ products, })
);

interface ProductsProps {
    onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
    const { onAdd } = props;
    const { setProducts } = actionDispatch(useDispatch());
    const { products } = useSelector(productsRetriever);

    const [ productSearch, setProductSearch ] = useState<ProductInquiry>({
        search: "",
        page: 1,
        limit: 8,
        order: "createdAt",
        productCategory: ProductCategory.SMARTPHONE,
        countInStock: 1,
    });

    const [searchText, setSearchText] = useState<string>("");
    const history = useHistory();


    useEffect(() => {
        const product = new ProductService();
        product
        .getProducts(productSearch)
        .then((data) => setProducts(data))
        .catch((err) => console.log(err));
    }, [productSearch]);

    useEffect(() => {
     if(searchText === "") {
        productSearch.productSearch = "";
        setProductSearch({ ...productSearch });
     }
    }, [searchText]);

/* HANDLERS */

    const searchCollectionHandler = (collection: ProductCategory) => {
        productSearch.page = 1;
        productSearch.productCategory = collection;
        setProductSearch({ ...productSearch });
    };

    const searchOrderHandler = (order: string) => {
        productSearch.page = 1;
        productSearch.order = order;
        setProductSearch({ ...productSearch });
    };

    const searchProductHandler = () => {
        productSearch.productSearch = searchText;
        setProductSearch({ ...productSearch });
    };

    const paginationHandler = (e: ChangeEvent<any>, value: number) => {
        productSearch.page = value;
        setProductSearch({ ...productSearch });
    };

    const chooseProductHandler = (id: string) => {
        history.push(`/products/${id}`);
    };

    return <div className={"products"}>
        <Container>
            <Stack flexDirection="column" alignItems="center">
                <Stack className="avatar-big-box">
                    <Stack className="top-title">
                        <Box className="top-text">Shop Apple Devices</Box>
                            <Box className="single-search">
                                <input
                                    type={"search"}
                                    className="single-search-input"
                                    placeholder={"Type here"}
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") searchProductHandler();
                                    }}
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
                            {/* <div className="filter-bar">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            className="show-btn"
                                            checked={productSearch.countInStock === 1}
                                            onChange={(e) =>
                                                setProductSearch({
                                                    ...productSearch,
                                                    countInStock: e.target.checked ? 1 : undefined,
                                                })
                                            }
                                        />
                                    }
                                        label={<span 
                                            className="in-stock-label"
                                            color="secondary"
                                        >
                                            Show only in-stock products</span>}
                                        labelPlacement="end"
                                />
                            </div> */}
                    </Stack>
                </Stack>
                <Stack className={"product-filter-section"}>
                    <Stack className={"products-filter-box"}>
                        <Button
                            variant={"contained"}
                            className={"order"}
                            color={productSearch.order === "createdAt" ? "primary" : "secondary"}
                            onClick={() => searchOrderHandler("createdAt")}
                        >
                            New
                        </Button>
                        <Button
                            variant={"contained"}
                            className={"order"}
                            color={productSearch.order === "productPrice" ? "primary" : "secondary"}
                            onClick={() => searchOrderHandler("productPrice")}
                        >
                            Price
                        </Button>
                        <Button
                            variant={"contained"}
                            className={"order"}
                            color={productSearch.order === "productViews" ? "primary" : "secondary"}
                            onClick={() => searchOrderHandler("productViews")}
                        >
                            Views
                        </Button>
                    </Stack>
                </Stack>
                <Stack className={"list-category-section"}>
                    <Stack className="product-category">
                        <Button
                            variant={"contained"}
                            color={productSearch.productCategory === ProductCategory.SMARTPHONE 
                                ? "primary" 
                                : "secondary"
                            }
                            onClick={() => searchCollectionHandler(ProductCategory.SMARTPHONE)}
                        >
                            SMARTPHONE
                        </Button>
                        <Button
                            variant={"contained"}
                            color={productSearch.productCategory === ProductCategory.LAPTOP 
                                ? "primary" 
                                : "secondary"
                            }
                            onClick={() => searchCollectionHandler(ProductCategory.LAPTOP)}
                        >
                            LAPTOP
                        </Button>
                        <Button
                            variant={"contained"}
                            color={productSearch.productCategory === ProductCategory.TABLET 
                                ? "primary" 
                                : "secondary"
                            }
                            onClick={() => searchCollectionHandler(ProductCategory.TABLET)}
                        >
                            TABLET
                        </Button>
                        <Button
                            variant={"contained"}
                            color={productSearch.productCategory === ProductCategory.ACCESSORY 
                                ? "primary" 
                                : "secondary"
                            }
                            onClick={() => searchCollectionHandler(ProductCategory.ACCESSORY)}
                        >
                            ACCESSORY
                        </Button>
                        <Button
                            variant={"contained"}
                            color={productSearch.productCategory === ProductCategory.OTHER 
                                ? "primary" 
                                : "secondary"
                            }
                            onClick={() => searchCollectionHandler(ProductCategory.OTHER)}

                        >
                            Other
                        </Button>
                    </Stack>
                </Stack>
                <Stack className={"product-wrapper"}>
                    {products.length !== 0 ? (
                        products.map((product: Product) => {
                            const imagePath = `${serverApi}/${product.productImages[0]}`;
                            const sizeVolume = 
                                product.productCategory === ProductCategory.SMARTPHONE 
                                ? product.productStorage + "" 
                                : product.productColor + "WHITE";
                            return (
                                <Stack 
                                    key={product._id} 
                                    className={"product-card"} 
                                    onClick={() => chooseProductHandler(product._id)}
                                >
                                    <Stack
                                        className={"product-img"}
                                        sx={{ backgroundImage: `url(${imagePath})`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center",
                                        backgroundSize: "cover",
                                        }}
                                    >
                                        <div className={"product-sale"}>{sizeVolume}</div>
                                        <Button 
                                            className={"shop-btn"} 
                                            onClick={(e) => {
                                                if (product.productLeftCount > 0) {
                                                    onAdd({
                                                        _id: product._id,
                                                        quantity: 1,
                                                        name: product.productName,
                                                        price: product.productPrice,
                                                        image: product.productImages[0],
                                                        countInStock: product.productLeftCount || 0,
                                                    });
                                                } else {
                                                    alert("Out of stock!");
                                                }
                                                e.stopPropagation();
                                            }}
                                        >
                                            <ShoppingCartIcon 
                                                className={"shopping-cart"}
                                                sx={{ display: "flex", color: "#f8f8ff"}}
                                            >
                                                <img 
                                                    src={"/icon/shopping-cart.svg"} alt=""
                                                    style={{ display: "flex" }}
                                                />
                                            </ShoppingCartIcon>
                                        </Button>
                                        <Button className={"view-btn"} sx={{ right: "36px" }}>
                                            <Badge badgeContent={product.productViews} color="secondary">
                                                <RemoveRedEyeIcon 
                                                    sx={{ color: product.productViews === 0 ? "gray" : "white", }}
                                                />
                                            </Badge>
                                        </Button>
                                    </Stack>
                                    <Box className={"product-desc"}>
                                        <span className={"product-title"}>
                                            {product.productName}
                                        </span>
                                        <div className={"product-price"}>
                                            <MonetizationOnIcon />
                                            {product.productPrice}
                                        </div>
                                    </Box>
                                </Stack>
                            );
                        })
                            ) : (
                        <Box className="no-data">Products are not available !</Box>
                    )}
                </Stack>
                <Stack className={"pagination-section"} spacing={2}>
                    <Pagination
                        count={10} // vaqtincha test uchun
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
        <div className={"brands-logo"}>
            <Box className="brand-text">Top Products</Box>
            <Stack className="brand-cards">
                <Box className="brand-card">
                    <img src="/img/macbook.jpg" alt="MacBook Pro" />
                </Box>
                <Box className="brand-card">
                    <img src="/img/ipad.jpg" alt="iPad Pro" />
                </Box>
                <Box className="brand-card">
                    <img src="/img/16max.jpg" alt="iPhone 16 Pro Max" />
                </Box>
                <Box className="brand-card">
                    <img src="/img/visionpro.jpg" alt="Apple Vision Pro" />
                </Box>
                <Box className="brand-card">
                    <img src="/img/watch.jpg" alt="Apple Watch Ultra 2" />
                </Box>
            </Stack>
        </div>
        <div className={"address"}>
            <Box className={"title"}>Our address</Box>
            <Container>
                <Box className="address-area">
                    <iframe
                        title="Apple Woodfield Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.936796938176!2d-88.0401159!3d42.045953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880faf96c7f69451%3A0xa81c0f988d4f6cde!2sApple%20Woodfield!5e0!3m2!1sen!2sus!4v1713387000000"
                        width="1300"
                        height="658"
                        style={{ border: "35px" }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </Box>
                <Typography variant="h5" align="center" sx={{ mt: 4, mb: 2 }}>
                    Visit Our Store Location
                </Typography>
            </Container>
        </div>
    </div>;
}