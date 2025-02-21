import { useState, SyntheticEvent } from "react";
import { Container, Stack, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishOrders from "./FinishedOrders";
import { setFinishedOrders, setPausedOrders, setProcessOrders } from "./slice";
import { Dispatch } from "@reduxjs/toolkit";
import { Order } from "../../../lib/types/order";
import "../../../css/order.css"
import { useDispatch } from "react-redux";

/* REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
    setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
    setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
    setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage() {
    const { 
        setPausedOrders, 
        setProcessOrders, 
        setFinishedOrders 
    } = 
        actionDispatch(useDispatch()
    );
    const [value, setValue] = useState("1");

    const handleChange = (ee: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    
    return ( 
        <div className={"order-page"}>
            <Container className={"order-container"}>
                <Stack className={"order-left"}>
                    <TabContext value={value}>
                        <Box className={"order-nav-frame"}>
                            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="basic tabs example"
                                    className={"table-list"}
                                >
                                    <Tab label="PAUSED ORDERS" value={"1"} />
                                    <Tab label="PROCESS ORDERS" value={"2"} />
                                    <Tab label="FINISHED ORDERS" value={"3"} />
                                </Tabs>
                            </Box>
                        </Box>
                        <Stack className={"order-main-content"}>
                            <PausedOrders />
                            <ProcessOrders />
                            <FinishOrders />
                        </Stack>
                    </TabContext>
                </Stack>
                <Stack className={"order-right"}>
                    <Box className={"order-info-box"}>
                        <Box className={"member-box"}>
                            <div className={"order-user-img"}>
                                <img
                                    src={"/icons/default-user.svg"} alt=""
                                    className={"order-user-avatar"}
                                />
                                <div className={"order-user-icon-box"}>
                                    <img
                                        src={"/icons/user-badge.svg"} alt=""
                                        className={"order-user-prof-img"}
                                    />
                                </div>
                            </div>
                            <span className={"order-user-name"}>Martin</span>
                            <span className={"order-user-prof"}>User</span>
                        </Box>
                        <Box className={"liner"}>
                            <Stack
                                flexDirection={"row"}
                                gap={"10px"}
                                marginLeft={"10px"}
                                sx={{ marginTop: "5px" }}
                            >
                            </Stack>
                        </Box>
                    </Box>
                </Stack>
            </Container>
        </div>
    );
}