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
  
    if (!authMember) history.push("/");
  
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
                    <Tab label="PAUSED ORDERS" value="1" className={value === "1" ? "active-tab" : ""} />
                    <Tab label="PROCESS ORDERS" value="2" className={value === "2" ? "active-tab" : ""} />
                    <Tab label="FINISHED ORDERS" value="3" className={value === "3" ? "active-tab" : ""} />
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
                      src={authMember?.memberType === MemberType.SELLER ? "/icons/user-badge.svg" : "/icons/user-badge.svg"}
                      alt=""
                      className="order-user-prof-img"
                    />
                  </div>
                </div>
                <span className="order-user-name">{authMember?.memberNick || "No specified"}</span>
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
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const cardNumber = formData.get("cardNumber");
                  const expiry = formData.get("expiry");
                  const cvv = formData.get("cvv");
                  const fullName = formData.get("fullName");

                  console.log("Card Data:", {
                    cardNumber,
                    expiry,
                    cvv,
                    fullName,
                  });

                  alert("Payment info saved successfully!");
                }}
              >
                <Box className="pay-input">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card number : 5243 4090 2002 7495"
                    className="card-input"
                    required
                    inputMode="numeric"
                    maxLength={19}
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      let value = target.value.replace(/\D/g, "").substring(0, 16); // Faqat raqam
                      value = value.replace(/(\d{4})(?=\d)/g, "$1 "); // Har 4 ta raqamdan keyin bo‘sh joy
                      target.value = value;
                    }}
                  />

                  <div className="pay-input2">
                    <input
                      type="text"
                      name="expiry"
                      placeholder="07 / 24"
                      required
                      inputMode="numeric"
                      maxLength={7}
                      onInput={(e) => {
                        const target = e.target as HTMLInputElement;
                        let value = target.value.replace(/\D/g, "").substring(0, 4);
                        if (value.length >= 3) {
                          value = value.replace(/(\d{2})(\d{1,2})/, "$1 / $2");
                        }
                        target.value = value;
                      }}
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV : 010"
                      required
                      inputMode="numeric"
                      maxLength={4}
                      onInput={(e) => {
                        const target = e.target as HTMLInputElement;
                        target.value = target.value.replace(/\D/g, "").substring(0, 4); // Faqat raqam
                      }}
                    />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Cardholder name"
                    required
                    maxLength={50}
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      target.value = target.value.replace(/[^a-zA-Z\s]/g, ""); // Faqat harflar va bo‘sh joy
                    }}
                  />
                </Box>
                <Box mt={2} display="flex" justifyContent="flex-end">
                  <button type="submit" className="save-button">
                    Save Payment Info
                  </button>
                </Box>
              </form>

              <Box className="pay-cards">
                <img src="/icons/western-card.svg" alt="Western Union" />
                <img src="/icons/master-card.svg" alt="Master Card" />
                <img src="/icons/paypal-card.svg" alt="PayPal" />
                <img src="/icons/visa-card.svg" alt="Visa" />
              </Box>
            </Box>
          </Stack>
        </Container>
      </div>
    );
  }