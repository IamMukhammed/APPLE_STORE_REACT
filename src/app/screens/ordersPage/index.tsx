import { useState, SyntheticEvent, useEffect } from "react";
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
import { Order, OrderInquiry } from "../../../lib/types/order";
import { useDispatch } from "react-redux";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import "../../../css/order.css"
import { useGlobals } from "../../hooks/useGlobals";

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
    const { orderBuilder } = useGlobals();
    const [value, setValue] = useState("1");
    const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
        page: 1,
        limit: 5,
        orderStatus: OrderStatus.PAUSE,
    });

    useEffect(() => {
        const order = new OrderService();

        order
            .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
            .then((data) => setPausedOrders(data))
            .catch((err) => console.log(err)
        );

        order
            .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
            .then((data) => setProcessOrders(data))
            .catch((err) => console.log(err)
        );

        order
            .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
            .then((data) => setFinishedOrders(data))
            .catch((err) => console.log(err)
        );
    }, [orderInquiry, orderBuilder]);

    /* HANDLERS */
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
                            <PausedOrders setValue={setValue} />
                            <ProcessOrders setValue={setValue} />
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