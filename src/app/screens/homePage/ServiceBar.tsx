import React from "react";
import {
  Security as SecurityIcon,
  LocalShipping as LocalShippingIcon,
  Replay as ReplayIcon,
  CreditCard as CreditCardIcon,
  ChatBubbleOutline as ChatIcon,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { motion } from "framer-motion";

const services = [
  {
    icon: <SecurityIcon fontSize="large" />,
    title: "Secure Shopping",
    desc: "Your data and transactions are 100% protected.",
  },
  {
    icon: <LocalShippingIcon fontSize="large" />,
    title: "Shipping",
    desc: "Fast and secure in a variety of modes.",
  },
  {
    icon: <ReplayIcon fontSize="large" />,
    title: "Return",
    desc: "Within 14 days of delivery.",
  },
  {
    icon: <CreditCardIcon fontSize="large" />,
    title: "Payment",
    desc: "By card or secure installment payments.",
  },
  {
    icon: <ChatIcon fontSize="large" />,
    title: "Contact Us",
    desc: "If you have any question, feel free to contact.",
  },
];

const duplicated = [...services, ...services];

export default function ServiceBar() {
  return (
    <div
      style={{
        overflow: "hidden",
        width: "100%",
        padding: "20px 0",
        backgroundColor: "var(--service-bg)",
        color: "var(--service-text)",
      }}
    >
      <motion.div
        style={{
          display: "flex",
          gap: "40px",
          width: "max-content",
        }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 15,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {duplicated.map((item, index) => (
          <div
            key={index}
            style={{
              flex: "0 0 auto",
              minWidth: "180px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <Tooltip title={item.desc} arrow>
              <div style={{ color: "inherit" }}>{item.icon}</div>
            </Tooltip>
            <h4 style={{ margin: 0 }}>{item.title}</h4>
            <p style={{ margin: 0, fontSize: "13px" }}>{item.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}