import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Divider from "../../components/divider";

export default function Statistics() {
    return (
        <div className="static-frame">
            <Container>
                <Stack className="info">
                    <Stack className="static-box">
                        <Box className="static-num">120+</Box>
                        <Box className="static-txt">Products</Box>
                    </Stack>
                    <Divider height="64" width="2" bg="#E3C08D" />

                    <Stack className="static-box">
                        <Box className="static-num">5</Box>
                        <Box className="static-txt">Years Online</Box>
                    </Stack>
                    <Divider height="64" width="2" bg="#E3C08D" />

                    <Stack className="static-box">
                        <Box className="static-num">99.9%</Box>
                        <Box className="static-txt">Satisfied Users</Box>
                    </Stack>
                    <Divider height="64" width="2" bg="#E3C08D" />

                    <Stack className="static-box">
                        <Box className="static-num">15+</Box>
                        <Box className="static-txt">Categories</Box>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}