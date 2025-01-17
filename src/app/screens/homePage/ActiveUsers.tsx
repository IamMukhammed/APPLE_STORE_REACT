import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import { CssVarsProvider } from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";

const activeUsers = [
    { memberNick: "Martin", memberImage: "/img/martin.webp" },
    { memberNick: "Justin", memberImage: "/img/justin.webp" },
    { memberNick: "Rose", memberImage: "/img/rose.webp" },
    { memberNick: "Nusret", memberImage: "/img/nusret.webp" },
];

export default function ActiveUsers() {
    return (
        <div className={"active-users"}>
            <Container>
                <Stack className="main">
                    <Box className={"active-user-title"}>Active Users</Box>
                    <Stack className={"active-user-cards"}>
                        <CssVarsProvider>
                            {activeUsers.length !== 0 ? (
                                activeUsers.map((ele, index) => {
                                    return (
                                        <Card key={index} variant="outlined" className={"card"}>
                                            <CardOverflow className={"user-size"}>
                                                <AspectRatio ratio="1">
                                                    <img src={ele.memberImage} alt="" />
                                                </AspectRatio>
                                            </CardOverflow>
                                            <CardOverflow variant="soft" className={"bottom-frame"}>
                                                <Stack className="info">
                                                    <Stack flexDirection={"column"}>
                                                        <Typography className={"member-nickname"}>
                                                            {ele.memberNick}
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                            </CardOverflow>
                                        </Card>
                                    );
                                })
                            ) : (
                                <Box className={"no-data"}>No Active Users !</Box>
                            )}

                        </CssVarsProvider>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}