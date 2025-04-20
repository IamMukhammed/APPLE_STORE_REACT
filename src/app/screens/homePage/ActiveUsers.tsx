import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import { CssVarsProvider } from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopUsers } from "./selector";
import { serverApi } from "../../../lib/config";
import { Member } from "../../../lib/types/member";

/* REDUX SLICE & SELECTOR */
const topUserRetriever = createSelector(
    retrieveTopUsers, 
    (topUsers) => ({ topUsers })
);


export default function ActiveUsers() {
    const { topUsers } = useSelector(topUserRetriever);

    console.log("topUsers:", topUsers);

    return (
        <div className={"active-users"}>
            <Container>
                <Stack className="main">
                    <Box className={"active-user-title"}>Active Users</Box>
                    <Stack className={"active-user-cards"}>
                        <CssVarsProvider>
                            {topUsers.length !== 0 ? (
                                topUsers.map((member: Member) => {
                                    const imagePath = `${serverApi}/${member.memberImage}`
                                    return (
                                        <Card key={member._id} variant="outlined" className={"card"}>
                                            <CardOverflow className={"user-size"}>
                                                <AspectRatio ratio="1">
                                                    <img src={imagePath} />
                                                    <div className={"user-overlay"}>{member.memberNick}</div>
                                                </AspectRatio>
                                            </CardOverflow>
                                            <CardOverflow variant="soft" className={"bottom-frame"}>
                                                <Stack className="info">
                                                    <Stack flexDirection={"column"}>
                                                        <Typography className={"member-name"}>
                                                            {member.memberNick}
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                            </CardOverflow>
                                        </Card>
                                    );
                                })
                            ) : (
                                <Box className={"no-data"}>No Top Users Found!</Box>
                            )}
                        </CssVarsProvider>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
};