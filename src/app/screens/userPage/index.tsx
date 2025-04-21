import { Box, Container, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Settings } from "./Settings";
import { useHistory } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";
import { useEffect } from "react";
import "../../../css/userPage.css";

export default function UserPage() {
  const history = useHistory();
  const { authMember } = useGlobals();

  useEffect(() => {
    if (!authMember) {
      history.push("/")
    }
  }, [authMember]);

  if (!authMember) history.push("/");
  return (
    <div className={"user-page"}>
      <Container>
        <Stack className={"my-page-frame"}>
          <Stack className={"my-page-left"}>
            <Box display={"flex"} flexDirection={"column"}>
              <Box className={"menu-name"}>Modify Member Details</Box>
              <Box className={"menu-content"}>
                <Settings />
              </Box>
            </Box>
          </Stack>

          <Stack className={"my-page-right"}>
            <Box className={"order-info-box"}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <div className={"order-user-img"}>
                  <img
                    src={
                      authMember?.memberImage 
                      ? `${serverApi}/${authMember.memberImage}` 
                      : "/icons/default-user.svg"
                    }
                    className={"order-user-avatar"}
                    alt="User Avatar"
                  />
                  <div className={"order-user-icon-box"}>
                    <img 
                      src={
                        authMember?.memberType === MemberType.SELLER 
                        ? "/icons/user-badge.svg" 
                        : "/icons/user-badge.svg"
                      } 
                    />
                  </div>
                </div>
                <span className={"order-user-name"}>{authMember?.memberNick}</span>
                <span className={"order-user-prof"}>{authMember?.memberType}</span>
                <span className={"order-user-prof"}>{authMember?.memberAddress ? authMember.memberAddress : "No address"}</span>
              </Box>
              <Box className={"user-media-box"}>
                <a href="https://www.facebook.com/apple/" target="_blank" rel="noopener noreferrer">
                  <FacebookIcon aria-label="Facebook" />
                </a>
                <a href="https://twitter.com/Apple" target="_blank" rel="noopener noreferrer">
                  <TwitterIcon aria-label="Twitter" />
                </a>
                <a href="https://www.instagram.com/apple/" target="_blank" rel="noopener noreferrer">
                  <InstagramIcon aria-label="Instagram" />
                </a>
                <a href="https://t.me/apple" target="_blank" rel="noopener noreferrer">
                  <TelegramIcon aria-label="Telegram" />
                </a>
                <a href="https://www.youtube.com/@Apple" target="_blank" rel="noopener noreferrer">
                  <YouTubeIcon aria-label="YouTube" />
                </a>
              </Box>
              <p className={"user-desc"}>
                {authMember?.memberDesc 
                  ? authMember.memberDesc 
                  : "No description"
                }
              </p>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
