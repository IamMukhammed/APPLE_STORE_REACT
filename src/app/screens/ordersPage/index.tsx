import { useState, SyntheticEvent, useEffect } from "react";
import { Container, Stack, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import { Dispatch } from "@reduxjs/toolkit";
import { Order, OrderInquiry } from "../../../lib/types/order";
import { useDispatch } from "react-redux";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";
import { useHistory } from "react-router-dom";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";
import { setFinishedOrders, setPausedOrders, setProcessOrders } from "./slice";
import FinishedOrders from "./FinishedOrders";
import "../../../css/order.css"

/* REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
    setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
    setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
    setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage() {
    const
    { setPausedOrders, setProcessOrders, setFinishedOrders } =
      actionDispatch(useDispatch());
  
    const {orderBuilder, authMember} =  useGlobals();
    const history = useHistory();
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
        .catch((err) => console.log(err));
  
      order
        .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
        .then((data) => setProcessOrders(data))
        .catch((err) => console.log(err));
  
      order
        .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
        .then((data) => setFinishedOrders(data))
        .catch((err) => console.log(err));
    }, [orderInquiry, orderBuilder]);
    
    /* HANDLERS */
    const handleChange = (e: SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };
  
    if(!authMember) history.push("/")
  
    return (
      <div className="order-page">
        <Container className="order-container">
          <Stack className="order-left">
            <TabContext value={value}>
              <Box className="order-nav-frame">
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    width: "679px",
                    margin: "0 auto",
                  }}
                >
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    className="table_list"
                  >
                    <Tab label="PAUSED ORDERS" value={"1"} />
                    <Tab label="PROCESS ORDERS" value={"2"} />
                    <Tab label="FINISHED ORDERS" value={"3"} />
                  </Tabs>
                </Box>
              </Box>
              <Stack className="order-main-content">
                <PausedOrders  setValue ={setValue} />
                <ProcessOrders  setValue ={setValue} />
                <FinishedOrders />
              </Stack>
            </TabContext>
          </Stack>
  
          <Stack className="order-right">
            <Box className="order-info-box">
              <Box className="member-box">
                <div className="order-user-img">
                  <img
                    src={authMember?.memberImage ? `${serverApi}/${authMember.memberImage}` :"/icons/default-user.svg" }
                    alt=""
                    className="order-user-avatar"
                  />
                  <div className="order-user-icon-box">
                    <img
                      src={authMember?.memberType === MemberType.RESTAURANT ? "/icons/restaurant.svg" : "/icons/user-badge.svg"}
                      alt=""
                      className="order-user-prof-img"
                    />
                  </div>
                </div>
                <span className="order-user-name">{authMember?.memberNick}</span>
                <span className="order-user-prof">{authMember?.memberType}</span>
              </Box>
              <Box className="liner">
                <Stack
                  flexDirection={"row"}
                  gap={"10px"}
                  marginLeft={"10px"}
                  sx={{
                    marginTop: "5px",
                  }}
                >
                  <LocationOnIcon />
                  <span>{authMember?.memberAddress ?authMember?.memberAddress : "Do not exist"}</span>
                </Stack>
              </Box>
            </Box>
            <Box className="order-info-pay">
              <Box className="pay-input">
                <input
                  type="text"
                  placeholder="Card number : 5243 4090 2002 7495" style={{ width: "100%" }}
                  className={"card-input"}
                />
                <div className="pay-input2">
                  <input type="text" placeholder="07 / 24" style={{ width: "100%" }} />
                  <input type="text" placeholder="CVV : 010" style={{ width: "100%" }} />
                </div>
                <input type="text" placeholder="Justin Robertson" style={{ width: "100%" }} />
              </Box>
              <Box className="pay-cards">
                <img src="/icons/western-card.svg" alt="" />
                <img src="/icons/master-card.svg" alt="" />
                <img src="/icons/paypal-card.svg" alt="" />
                <img src="/icons/visa-card.svg" alt="" />
              </Box>
            </Box>
          </Stack>
        </Container>
      </div>
    );
  }