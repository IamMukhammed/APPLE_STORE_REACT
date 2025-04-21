import React, { useState } from "react";
import { Box, Stack, Modal, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "./selector";
import { Messages, serverApi } from "../../../lib/config";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { T } from "../../../lib/types/common";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";

/* REDUX SELECTOR */
const pausedOrdersRetriever = createSelector(
    retrievePausedOrders,
    (pausedOrders) => ({ pausedOrders })
);

interface PausedOrdersProps {
    setValue: (input: string) => void;
}

export default function PausedOrders(props: PausedOrdersProps) {
    const { setValue } = props;
    const { authMember, setOrderBuilder } = useGlobals();
    const { pausedOrders } = useSelector(pausedOrdersRetriever);

    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [cardHolder, setCardHolder] = useState("");

    const openPaymentModal = (orderId: string) => {
        setSelectedOrderId(orderId);
        setPaymentModalOpen(true);
    };

    const deleteOrderHandler = async (e: T) => {
        try {
            if (!authMember) throw new Error(Messages.error2);
            const orderId = e.target.value;
            const input: OrderUpdateInput = {
                orderId,
                orderStatus: OrderStatus.DELETE,
            };

            const confirmation = window.confirm("Do you want to delete the order?");
            if (confirmation) {
                const order = new OrderService();
                await order.updateOrder(input);
                setOrderBuilder(new Date());
            }
        } catch (err) {
            console.log(err);
            sweetErrorHandling(err).then();
        }
    };

    return (
        <TabPanel value={"1"}>
        <Stack>
            {pausedOrders?.map((order: Order) => {
            return (
                <Box key={order._id} className="order-main-box">
                    <Box className="order-box-scroll">
                        {order.orderItems.map((item: OrderItem) => {
                            const product: Product = order.productData.find(
                                (ele: Product) => item.productId === ele._id
                            )!;
                            const imagePath = product.productImages?.[0]
                                ? `${serverApi}/${product.productImages[0]}`
                                : "/icons/default-product.svg";

                            return (
                                <Box key={item._id} className="orders-name-price">
                                    <img src={imagePath} alt="" className="order-dish-img" />
                                    <p className="title-product">{product.productName}</p>
                                    <Box className="price-box">
                                        <p>${item.itemPrice}</p>
                                        <img src="/icons/close.svg" alt="" />
                                        <p>{item.itemQuantity}</p>
                                        <img src="/icons/pause.svg" alt="" />
                                        <p style={{ marginLeft: "15px" }}>
                                            ${item.itemPrice * item.itemQuantity}
                                        </p>
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box>
                    <Box className="total-price-box">
                        <Box className="box-total">
                            <p>Subtotal</p>
                            <p>${order.orderTotal - order.orderDelivery}</p>
                            <img src="/icons/plus.svg" alt="" style={{ marginLeft: "20px" }} />
                            <p>Shipping</p>
                            <p>${order.orderDelivery}</p>
                            <img src="/icons/pause.svg" alt="" style={{ marginLeft: "20px" }} />
                            <p>Total</p>
                            <p>${order.orderTotal}</p>
                        </Box>
                        <Button
                            value={order._id}
                            variant="contained"
                            color="secondary"
                            className="cancel-button"
                            onClick={deleteOrderHandler}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            className="pay-button"
                            onClick={() => openPaymentModal(order._id)}
                        >
                            Payment
                        </Button>
                    </Box>
                </Box>
            );
            })}
            {(!pausedOrders || pausedOrders.length === 0) && (
                <Box display="flex" justifyContent="center">
                    <img src="/icons/noimage-list.svg" alt="" style={{ width: 300 }} />
                </Box>
            )}
            </Stack>
            <Modal
                open={paymentModalOpen}
                onClose={() => {
                    setPaymentModalOpen(false);
                    setCardHolder("");
                    setCardNumber("");
                    setCvv("");
                    setExpiry("");
                }}
                aria-labelledby="payment-modal-title"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        borderRadius: 2,
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 400,
                            bgcolor: "var(--bg-color)",
                            color: "var(--text-color)",
                            borderRadius: 2,
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <h2 id="payment-modal-title">Payment Details</h2>
                        
                        <TextField
                            fullWidth
                            label="Card Number"
                            margin="normal"
                            placeholder="5243 4090 2002 7495"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
                            inputProps={{ inputMode: "numeric", maxLength: 16 }}
                            sx={{
                                input: {
                                    backgroundColor: "var(--input-bg)",
                                    color: "var(--text-color)",
                                },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        borderColor: "var(--input-border)",
                                    },
                                },
                                "& label": {
                                    color: "var(--text-color)",
                                },
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Expiry"
                            margin="normal"
                            placeholder="07 / 24"
                            value={expiry}
                            onChange={(e) => {
                                const onlyDigits = e.target.value.replace(/\D/g, "").slice(0, 4);
                                const formatted = onlyDigits.replace(/(\d{2})(\d{0,2})/, (_, m1, m2) => (m2 ? `${m1} / ${m2}` : m1));
                                setExpiry(formatted);
                            }}
                            inputProps={{ inputMode: "numeric", maxLength: 7 }}
                            sx={{
                                input: { backgroundColor: "var(--input-bg)", color: "var(--text-color)" },
                                "& fieldset": { borderColor: "var(--input-border)" },
                                "& label": { color: "var(--text-color)" },
                            }}
                        />

                        <TextField
                            fullWidth
                            label="CVV"
                            margin="normal"
                            placeholder="123"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                            inputProps={{ inputMode: "numeric", maxLength: 4 }}
                            sx={{
                                input: { backgroundColor: "var(--input-bg)", color: "var(--text-color)" },
                                "& fieldset": { borderColor: "var(--input-border)" },
                                "& label": { color: "var(--text-color)" },
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Cardholder Name"
                            margin="normal"
                            placeholder="Your full name"
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            sx={{
                                input: { backgroundColor: "var(--input-bg)", color: "var(--text-color)" },
                                "& fieldset": { borderColor: "var(--input-border)" },
                                "& label": { color: "var(--text-color)" },
                            }}
                        />

                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                mt: 2,
                                backgroundColor: "var(--button-bg)",
                                color: "var(--button-text)",
                                "&:hover": {
                                    backgroundColor: "var(--button-bg)",
                                    opacity: 0.85,
                                },
                            }}
                            onClick={async () => {
                                if (!cardNumber || !expiry || !cvv || !cardHolder) {
                                    alert("Please fill all payment fields.");
                                    return;
                                }
                                if (!authMember || !selectedOrderId) return;
                                const input: OrderUpdateInput = {
                                    orderId: selectedOrderId,
                                    orderStatus: OrderStatus.PROCESS,
                                };
                                const order = new OrderService();
                                await order.updateOrder(input);
                                setOrderBuilder(new Date());
                                setPaymentModalOpen(false);
                                setValue("2");
                            }}
                        >
                            Confirm Payment
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </TabPanel>
    );
}