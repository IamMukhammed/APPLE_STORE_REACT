import React from "react";
import { Box, Container, Stack } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card"
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from '@mui/joy/Typography';
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "../../components/divider"

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewProducts } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";


/* REDUX SLICE & SELECTOR */
const NewProductsRetriever = createSelector(
    retrieveNewProducts, 
    (newProducts) => ({ newProducts })
);

export default function NewProducts() {
    const { newProducts } = useSelector(NewProductsRetriever);
    const history = useHistory();

    const handleCardClick = (productId: string) => {
        history.push(`/products/${productId}`);
    };

    console.log("newProducts:", newProducts);

    return (
        <div className={"new-arrivals-frame"}>
            <Container>
                <Stack className={"main"}>
                    <Box className={"category-title"}>New Arrivals</Box>
                    <Stack className={"cards-frame"}>
                        <CssVarsProvider>
                            {newProducts.length !== 0 ? (
                                newProducts.map((product: Product) => {
                                    const imagePath = `${serverApi}/${product.productImages[0]}`;
                                    const specs = product.productDesc || "Latest generation tech";
                                    return (
                                    <Card 
                                        key={product._id} 
                                        variant="outlined" 
                                        className={"card"}
                                        onClick={() => handleCardClick(product._id)}
                                        sx={{
                                            cursor: 'pointer',
                                            transition: '0.3s',
                                            '&:hover': {
                                                transform: 'scale(1.03)',
                                                boxShadow: '1g',
                                            },
                                        }}
                                    >
                                        <CardOverflow>
                                            <AspectRatio ratio="1">
                                                <img src={imagePath} alt={product.productName} />
                                            </AspectRatio>
                                        </CardOverflow>
                                        <CardOverflow variant="soft" className="product-details">
                                            <Stack className="info">
                                                <Stack flexDirection={"row"}>
                                                    <Typography className={"title"}>
                                                        {product.productName}
                                                    </Typography>
                                                    <Divider width="2" height="24" bg="#d9d9d9" />
                                                    <Typography className={"price"}>
                                                        ${product.productPrice}
                                                    </Typography>
                                                </Stack>
                                                <Stack>
                                                    <Typography className={"views"}>
                                                        {product.productViews}
                                                        <VisibilityIcon
                                                            sx={{ fontSize: 20, marginLeft: "5px" }}
                                                        />
                                                     </Typography>
                                                </Stack>
                                            </Stack>
                                        </CardOverflow>
                                    </Card>
                                );
                            })
                            ) : (
                                <Box className="no-data">No new products available!</Box>
                            )}
                        </CssVarsProvider>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}