import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { CssVarsProvider } from "@mui/joy/styles";
import CardOverflow from "@mui/joy/CardOverflow";
import Visibility from "@mui/icons-material/Visibility";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePopularProducts } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";

/* REDUX SLICE & SELECTOR */
const popularProductsRetriever = createSelector(
    retrievePopularProducts, 
    (popularProducts) => ({ popularProducts })
);
  
export default function PopularProducts() {
    const { popularProducts } = useSelector(popularProductsRetriever);

    console.log("popularProducts:", popularProducts);

    return (
        <div className="popular-products-frame">
            <Container>
                <Stack className="popular-section">
                    <Box className="title">Popular Products</Box>
                    <Stack className="cards-frame">
                        {popularProducts.length !== 0 ? (
                            popularProducts.map((product: Product) => {
                            const imagePath = product.productImages?.[0]
                              ? `${serverApi}/${product.productImages[0]}`
                              : "/img/default-product.webp";

                            return (
                                console.log("productName ====>", product),
                                <CssVarsProvider key={product._id}>
                                    <Card className={"card"}>
                                        <CardCover>
                                            <img src={imagePath} alt={product.productName} />
                                        </CardCover>
                                            <CardCover className={"card-cover"} />
                                            <CardContent sx={{ justifyContent: 'flex-end' }}>
                                                <Stack
                                                    flexDirection={"row"}
                                                    justifyContent={"space-between"}
                                                    alignItems={"center"}
                                                >
                                                    <Typography
                                                        level="h2"
                                                        fontSize="lg"
                                                        textColor="#fff"
                                                        mb={1}
                                                    >
                                                        {product.productName}
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            fontWeight: "md",
                                                            color: "neutral.300",
                                                            alignItems: "center",
                                                            display: "flex",
                                                        }}
                                                    >
                                                        {product.productViews}
                                                        <Visibility sx={{ fontSize: 20, marginLeft: "5px" }} />
                                                    </Typography>
                                                </Stack>
                                            </CardContent>
                                            <CardOverflow
                                                sx={{
                                                    display: "flex",
                                                    gap: 1.5,
                                                    py: 1.5,
                                                    px: "var(--Card-padding)",
                                                    borderTop: "1px solid",
                                                    borderColor: "divider",
                                                    height: "60px",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                <Typography
                                                    startDecorator={<DescriptionOutlinedIcon />}
                                                    textColor="neutral.300"
                                                    fontSize={"sm"}
                                                >
                                                    {product.productDesc?.slice(0, 50) || "No description"}
                                                </Typography>
                                            </CardOverflow>
                                        </Card>
                                </CssVarsProvider>
                            );
                        })
                            ) : (
                                <Box className="no-data">No popular products available!</Box>
                            )}
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}