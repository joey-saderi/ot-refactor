import React, { useState, useEffect } from "react";
import { IoMdClose, IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
// import "./Gallery.scss";

const Gallery = (props: IGallery) => {
  const [Feed, setFeed] = useState([]);
  const [alt, setAlt] = useState("");
  const [carousel, setcarousel] = useState(false);
  const [index, setindex] = useState(null);
  // const [rightV, setrightV] = useState(0);
  const [startPoint, setstartPoint] = useState(0);
  // const [FromX, setFromX] = useState(0);
  const [flagControl, setflagControl] = useState(false);

  const showController = (index) => {
    /**
     *  set the initial image from parent component
     *  default is the first image
     */
    setindex(index);
  };

  const SliderNav = (slide) => {
    /**
     * check if the click is on left or right icon
     */
    if (slide === "right" && index < Feed.length - 1) {
      // add index by 1 to go to right
      setindex(1 + index);
    } else if (slide === "left" && index > 0) {
      // subtract index by 1 to go to left
      setindex(index - 1);
    } else return;
  };

  useEffect(() => {
    setFeed(props.Feed);
    setAlt(props.alt);
    // if the length of given list is bigger then 1 then show arrows and other parts of gallery
    setcarousel(props.Feed.length > 1 ? true : false);
    setindex(props.index);
  }, []);

  return (
    <div className="Gallery_Container">
      {/* Close the gallery */}
      <div className="closeButton" onClick={props.CloseGallery}>
        <IoMdClose size="3rem" />
      </div>
      {/* view part */}
      <div className="show_part">
        {Feed.map((item, i) => {
          return (
            <img
              key={i}
              src={item.url}
              alt={alt}
              /**
               * After user release the image
               */
              onTouchEnd={() => {
                // setrightV(0);
                setflagControl(false);
              }}
              /**
               * user start touch a image
               */
              onTouchStart={(e: any) => {
                e.persist();
                // start point is the width of the image
                setstartPoint(e.changedTouches[0].screenX);

                // set the X value
                // setFromX(e.target.x);

                // Lets the image to swipe
                setflagControl(true);
              }}
              // capture user move to right or left
              onTouchMoveCapture={(e: any) => {
                e.persist();
                // If the new point is bigger then start point we are move to right
                if (e.changedTouches[0].screenX > startPoint) {
                  // Subtract the moved pixels to startPoint
                  let right = e.changedTouches[0].screenX - startPoint;
                  // If image move more than 100px swipe the image to right
                  if (right > 100 && flagControl) {
                    // setrightV(0);
                    // don't let the image to swipe several time
                    setflagControl(false);
                    SliderNav("left");
                  } else {
                    // setrightV(-0);
                  }
                } else {
                  // If the new point is smaller then start point we are move to left
                  let left = startPoint - e.changedTouches[0].screenX;
                  if (left > 100 && flagControl) {
                    // setrightV(0);
                    // don't let the image to swipe several time
                    setflagControl(false);
                    SliderNav("right");
                  } else {
                    // setrightV(0);
                  }
                }
              }}
              className={[
                // current image have carousel_FrontImage class
                index === i && "carousel_FrontImage",
                // images at the LEFT of the current image have class TranslateRight because they should translate to RIGHT
                index < i && "carousel_FrontImage TranslateRight",
                // images at the RIGHT of the current image have class TranslateRight because they should translate to LEFT
                index > i && "carousel_FrontImage TranslateLeft",
              ].join(" ")}
              /**
               * the effect of moving image to right or left base on the 'rightV' value
               * while user grabbed the image
               * */
              // style={{
              //   right: rightV + "px",
              // }}
            />
          );
        })}
      </div>
      {/* Thumbnail part */}
      <div className="thumbnail_part">
        {Feed.map((item, i) => {
          return (
            <img
              key={i}
              src={item.url}
              // set the image to view part
              onClick={() => showController(i)}
              alt={alt}
            />
          );
        })}
      </div>
      {carousel && (
        <>
          {/* if there is no more image right to swipe to right, hide the right arrow icon */}
          {index < Feed.length - 1 && (
            <button className="NAVIGA arrow-right G_R">
              <IoIosArrowForward
                // set the next right image to view
                onClick={() => SliderNav("right")}
                size="3rem"
              />
            </button>
          )}
          {/* if there is no more image left to swipe to left, hide the left arrow icon */}
          {index > 0 && (
            <button className="NAVIGA arrow-left G_L">
              <IoIosArrowBack
                // set the next right image to view
                onClick={() => SliderNav("left")}
                size="3rem"
              />
            </button>
          )}
        </>
      )}
    </div>
  );
};

interface IGallery {
  Feed: any;
  CloseGallery: any;
  index: number;
  alt: string;
}

export default Gallery;
