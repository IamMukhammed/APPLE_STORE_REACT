import { Box, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { storeHighlights } from "../../../lib/data/plans";

SwiperCore.use([Autoplay, Navigation, Pagination]);

export default function Events() {
  return (
    <div className={"events-frame"}>
      <Stack className={"events-main"}>
        <Box className={"events-text"}>
          <span className={"category-title"}>Events</span>
        </Box>

        <Swiper
          className={"events-info swiper-wrapper"}
          slidesPerView={"auto"}
          centeredSlides={true}
          spaceBetween={30}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: true,
          }}
        >
          {storeHighlights.map((plan, idx) => {
            return (
              <SwiperSlide key={idx} className={"events-info-frame"}>
                <div className={"events-img"}>
                  <img src={plan.img} alt={plan.title} className={"events-img"} />
                </div>
                <Box className={"events-desc"}>
                  <Box className={"events-bott"}>
                    <Box className={"bott-left"}>
                      <div className={"event-title-speaker"}>
                        <strong>{plan.title}</strong>
                        <div className={"event-organizator"}>
                          <img src="/icons/apple.svg" />
                          <p className={"spec-text-author"}>{plan.author}</p>
                        </div>
                      </div>

                      <p className={"text-desc"}> {plan.desc} </p>

                      <div className={"bott-info"}>
                        <div className={"bott-info-main"}>
                          {/* <img src={"/icons/cooming.svg"} /> */}
                          {plan.date}
                        </div>
                        <div className={"bott-info-main"}>
                          {/* <img src={"/icons/macbook.svg"} /> */}
                          {plan.location}
                        </div>
                      </div>
                    </Box>
                  </Box>
                </Box>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <Box className={"prev-next-frame"}>
          <img
            src={"/icons/left-arrow.svg"}
            className={"swiper-button-prev"}
          />
          <div className={"dot-frame-pagination swiper-pagination"}></div>
          <img
            src={"/icons/left-arrow.svg"}
            className={"swiper-button-next"}
            style={{ transform: "rotate(-180deg)" }}
          />
        </Box>
      </Stack>
    </div>
  );
};
