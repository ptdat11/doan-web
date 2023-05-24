import React, { useState, useRef,useEffect } from "react";
import { BaseProps } from "../../submodules/base-props/base-props";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import ArrowButton from "../button/ArrowButton";

interface Props extends BaseProps {}

const Banner: React.FC<Props> = React.memo((props) => {
  const [bannerIndex, setBannerIndex] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const arrowBtnsRef = useRef<HTMLDivElement>(null);
  let bannerCount = 3;
  
  const handleResize = () => {
    if (arrowBtnsRef.current && imgRef.current) {
      const btns = arrowBtnsRef.current;
      const container = imgRef.current;
      
      btns.style.top = container.offsetHeight / 2 - 10 + "px";
    }
  };
  
  const toNextBanner = () => {
    setBannerIndex((bannerIndex + 1) % bannerCount);
  };

  const toPrevBanner = () => {
    let prev = bannerIndex - 1;
    setBannerIndex(prev < 0 ? bannerCount - 1 : prev)
  };

  window.addEventListener("resize", handleResize);
  useEffect(() => {
    setTimeout(handleResize, 50);
  }, [imgRef.current?.offsetHeight]);
  
  useEffect(() => {
    imgRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center"
    });
    const id = setTimeout(toNextBanner, 4000);

    return () => clearTimeout(id);
  }, [bannerIndex]);
  
  return (
    <div
      className={combineClassnames(
        props.className,
      )}
      style={{...props.style}}
    >
      <div
        ref={arrowBtnsRef}
        className="w-full px-2 absolute flex justify-between"
        style={{top: imgRef.current?.offsetHeight as number / 2 + 10}}
      >
        <ArrowButton
          direction="left"
          onClick={toPrevBanner}
          size={30}
        />
        <ArrowButton
          direction="right"
          onClick={toNextBanner}
          size={30}
        />
      </div>

      <div
        className="w-full h-full flex overflow-hidden"
      >
        {Array.from({ length: bannerCount }, (_, i) => i).map((index) => {
          let bannerSrc = `/src/assets/banner/banner-${index}.png`;
          
          return <img 
            ref={bannerIndex === index ? imgRef : undefined}
            key={index}
            className="w-full"
            src={bannerSrc}
          />
        })}
      </div>
    </div>
  );
});

export default Banner;