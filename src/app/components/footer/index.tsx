import React from "react";
import { Box, Container, Stack } from "@mui/material";
import styled from "styled-components";
import { Link } from "react-router-dom";

const FooterWrapper = styled.div`
  width: 100%;
  background: #1a1a1a;
  padding: 80px 0;
  color: #fff;
`;

const Logo = styled.img`
  width: 120px;
  margin-bottom: 20px;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;

  img {
    width: 24px;
    cursor: pointer;
    opacity: 0.8;
    transition: 0.3s;

    &:hover {
      opacity: 1;
    }
  }
`;

export default function Footer() {
  const authUser = null; // later from context

  return (
    <FooterWrapper>
      <Container>
        <Stack direction="row" justifyContent="space-between" flexWrap="wrap">
          {/* Brand Info */}
          <Box sx={{ maxWidth: "320px" }}>
            <Logo src="/icons/apple-store-tech-logo.svg" alt="logo" />
            <Box sx={{ mt: 2, fontSize: "14px", lineHeight: "1.8" }}>
              Apple Store delivers premium electronics from global brands.
              Fast shipping, trusted warranty, and top-tier customer support.
            </Box>
            <SocialIcons>
              <img src="/icons/facebook.svg" alt="facebook" />
              <img src="/icons/twitter.svg" alt="twitter" />
              <img src="/icons/instagram.svg" alt="instagram" />
              <img src="/icons/youtube.svg" alt="youtube" />
            </SocialIcons>
          </Box>

          {/* Quick Links */}
          <Box>
            <Box sx={{ fontWeight: "bold", mb: 2 }}>Quick Links</Box>
            <Stack spacing={1}>
              <Link to="/">Home</Link>
              <Link to="/products">Products</Link>
              {authUser && <Link to="/orders">Orders</Link>}
              <Link to="/contact">Contact Us</Link>
              <Link to="/help">Help</Link>
            </Stack>
          </Box>

          {/* Contact Info */}
          <Box>
            <Box sx={{ fontWeight: "bold", mb: 2 }}>Contact Us</Box>
            <Stack spacing={1} sx={{ fontSize: "14px" }}>
              <div>📍 123 Tech Street, Silicon Valley, CA</div>
              <div>📞 +1 (555) 123-4567</div>
              <div>✉️ support@appletech.com</div>
              <div>🕒 Mon - Fri: 9am - 6pm</div>
            </Stack>
          </Box>
        </Stack>

        {/* Divider */}
        <Box
          sx={{
            borderTop: "1px solid #666",
            mt: 6,
            pt: 3,
            fontSize: "13px",
            textAlign: "center",
            color: "#999",
          }}
        >
          © {new Date().getFullYear()} Apple Tech Store. All rights reserved.
        </Box>
      </Container>
    </FooterWrapper>
  );
};