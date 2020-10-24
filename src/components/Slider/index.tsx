import React, { useState, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack, IoMdExpand } from "react-icons/io";
// import "./slider.scss";
import Gallery from "./Gallery";

const Slider = (props: ISlider) => {
  const [Feed, setFeed] = useState([]);
  const [alt, setAlt] = useState("");
  const [Loade, setLoade] = useState(false);
  const [carousel, setCarousel] = useState(false);
  const [heightController, setheightController] = useState(0);
  const [slideIndex, setslideIndex] = useState(0);
  const [colseModal, setcolseModal] = useState(true);
  const [rightV, setrightV] = useState(0);
  const [startPoint, setstartPoint] = useState(0);
  // const [FromX, setFromX] = useState(0);
  const [falgControl, setfalgControl] = useState(false);

  const positionController = (w, h) => {
    if (w / h < 1.2) {
      setheightController((w / h) * 110);
    }
    if (w / h < 0.9) {
      setheightController((w / h) * 160);
    }
  };

  const SliderNav = (slide) => {
    /**
     * check if the click is on left or right icon
     */
    if (slide === "right" && slideIndex < props.Feed.length - 1) {
      // add index by 1 to go to right
      setslideIndex(1 + slideIndex);
    } else if (slide === "left" && slideIndex > 0) {
      // subtract index by 1 to go to left
      setslideIndex(slideIndex - 1);
    } else return;
  };

  const CloseGallery = () => {
    // responsible to show or hide the gallery
    setcolseModal(!colseModal);
  };

  useEffect(() => {
    setFeed(props.Feed);
    setAlt(props.alt);
    setLoade(props.Feed.length > 0 ? true : false);
    // if the length is bigger then 1 the carousel mode activated
    setCarousel(props.Feed.length > 1 ? true : false);
  }, [props.Feed]);

  return (
    Loade && (
      <div className="carousel_container">
        {/* extend icon */}
        {!colseModal && (
          <Gallery
            Feed={Feed}
            CloseGallery={CloseGallery}
            index={slideIndex}
            alt={alt}
          />
        )}
        {/* carousel section */}
        {carousel ? (
          <>
            <div>
              {/* Open the gallery */}
              {carousel && (
                <div className="FullScreen" onClick={CloseGallery}>
                  <IoMdExpand size="4rem" />
                </div>
              )}
              {Feed.map((item, i) => {
                return (
                  <img
                    key={i}
                    // on Click on images gallery will show
                    onClick={CloseGallery}
                    /**
                     * After user release the image
                     */
                    onTouchEnd={() => {
                      setrightV(0);
                      // Not allowed to swipe more than once
                      setfalgControl(false);
                    }}
                    /**
                     * user start touch a image
                     */
                    onTouchStart={(e: any) => {
                      e.persist();
                      // start point is the width of the image
                      setstartPoint(e.changedTouches[0].screenX);
                      // setFromX(e.target.x);

                      // Lets the image to swipe
                      setfalgControl(true);
                    }}
                    // capture user move to right or left
                    onTouchMoveCapture={(e) => {
                      e.persist();
                      // If the new point is bigger then start point we are move to right
                      if (e.changedTouches[0].screenX > startPoint) {
                        // Subtract the moved pixels to startPoint
                        let right = e.changedTouches[0].screenX - startPoint;

                        // move image in opposite direction
                        setrightV(-right);

                        // If image move more than 100px swipe the image to right
                        if (right > 100 && falgControl) {
                          // don't let the image to swipe several time
                          setfalgControl(false);
                          SliderNav("left");
                          return;
                        } else {
                          // this.setState({
                          //   rightV: "-" + 0
                          // });
                        }
                      } else {
                        // If the new point is smaller then start point we are move to left
                        let left = startPoint - e.changedTouches[0].screenX;
                        setrightV(left);
                        if (left > 100 && falgControl) {
                          // rightV: 0,
                          // don't let the image to swipe several time
                          setfalgControl(false);
                          SliderNav("right");
                          return;
                        } else {
                          // this.setState({
                          //   rightV: 0
                          // });
                        }
                      }
                    }}
                    /**
                     * the effect of moving image to right or left base on the 'rightV' value
                     * while user grabbed the image
                     * */
                    style={{
                      right: rightV + "px",
                    }}
                    className={[
                      // current image have carousel_FrontImage class
                      slideIndex === i && "carousel_FrontImage",
                      // images at the LEFT of the current image have class TranslateRight because they should translate to RIGHT
                      slideIndex < i && "carousel_FrontImage TranslateRight",
                      // images at the RIGHT of the current image have class TranslateRight because they should translate to LEFT
                      slideIndex > i && "carousel_FrontImage TranslateLeft",
                    ].join(" ")}
                    src={item.url}
                    alt={alt}
                  />
                );
              })}
            </div>
            {/* background image */}
            <img
              className="carousel_BackImage"
              // className={[
              //   "carousel_BackImage",
              //   this.state.slideIndex === i ? "activslide" : "HiddenSlide"
              // ].join(" ")}

              // adjust the image at the center of view division
              style={{
                top: `-${heightController}px`,
              }}
              src={Feed[slideIndex].url}
              alt={alt}
              // set the "heightController" value to adjust
              onLoad={() =>
                positionController(
                  Feed[slideIndex].width,
                  Feed[slideIndex].height
                )
              }
            />
          </>
        ) : (
          <>
            {/* If carousel is not active just show a single image and background */}
            <img
              className="carousel_FrontImage"
              src={Feed[0].url}
              alt={alt}
              // onLoad={() => positionController(Feed[0].width, Feed[0].height)}
            />
            <img
              className="carousel_BackImage"
              src={Feed[0].url}
              style={{
                top: `-${heightController}px`,
              }}
              alt={alt}
              // adjust the image in container
              onLoad={() => positionController(Feed[0].width, Feed[0].height)}
            />
          </>
        )}
        {/* navigation icons */}
        {carousel && (
          <>
            {/* if there is no more image right to swipe to right, hide the right arrow icon */}
            {slideIndex < Feed.length - 1 && (
              <button className="NAVIGA arrow-right">
                <IoIosArrowForward
                  onClick={() => SliderNav("right")}
                  size="3.3rem"
                />
              </button>
            )}
            {/* if there is no more image left to swipe to left, hide the left arrow icon */}
            {slideIndex > 0 && (
              <button className="NAVIGA arrow-left">
                <IoIosArrowBack
                  onClick={() => SliderNav("left")}
                  size="3.2rem"
                />
              </button>
            )}
          </>
        )}
        {/* bullet icons */}
        {carousel && (
          <div className="NavBotton">
            {Feed.map((_, i) => {
              return (
                <span
                  key={i}
                  onClick={() => setslideIndex(i)}
                  className={slideIndex === i ? "activeDot" : "deactiveDot"}
                ></span>
              );
            })}
          </div>
        )}
      </div>
    )
  );
};

interface ISlider {
  // a list of images 
  Feed: any;
  // The image name 
  alt: string;
}

export default Slider;
