import React, { useState, useRef,useEffect } from "react";
import { BaseProps } from "../../submodules/base-props/base-props";
import combineClassnames from "../../submodules/string-processing/combine-classname";
import ArrowButton from "../button/ArrowButton";
import banner0 from "../../assets/banner/banner-0.png";
import banner1 from "../../assets/banner/banner-1.png";
import banner2 from "../../assets/banner/banner-2.png";

const bannerSrc = [banner0, banner1, banner2];

interface Props extends BaseProps {}

const Banner: React.FC<Props> = React.memo((props) => {
  const [bannerIndex, setBannerIndex] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const arrowBtnsRef = useRef<HTMLDivElement>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);
  let bannerCount = bannerSrc.length;

  const centerImage = () => {
    if (imgRef.current && imgContainerRef.current) {
      const img = imgRef.current;
      const container = imgContainerRef.current;
  
      img.style.translate = `0px ${(container.clientHeight - img.offsetHeight) / 2}px`
    }
  };
  
  const handleResize = () => {
    if (arrowBtnsRef.current && imgContainerRef.current) {
      const btns = arrowBtnsRef.current;
      const container = imgContainerRef.current;
      
      btns.style.top = (container.offsetHeight / 2 + 50) + "px";
    }
  };

  const toNextBanner = () => {
    if (imgRef.current) {
      imgRef.current.style.opacity = "0.1";
    }
    setTimeout(() => 
      setBannerIndex((bannerIndex + 1) % bannerCount),
      200
    );
  };

  const toPrevBanner = () => {
    let prev = bannerIndex - 1;
    if (imgRef.current) {
      imgRef.current.style.opacity = "0";
    }
    setTimeout(() =>
      setBannerIndex(prev < 0 ? bannerCount - 1 : prev),
      200
    );
  };

  useEffect(() => {
    let observer = new ResizeObserver(() => {
      handleResize();
      centerImage();
    });
    if (imgRef.current)
      observer.observe(imgRef.current);

    return () => {
      if (imgRef.current)
        observer.unobserve(imgRef.current);
    }
  });

  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.style.opacity = "1.0";
    }
    const id = setTimeout(toNextBanner, 4000);

    return () => clearTimeout(id);
  }, [bannerIndex]);
  
  return (
    <div
      ref={imgContainerRef}
      className={combineClassnames(
        props.className,
      )}
      style={{...props.style}}
    >
      <div
        ref={arrowBtnsRef}
        className="w-full z-[5] px-2 absolute flex justify-between"
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
        className="w-full h-full flex"
      >
        <img 
          ref={imgRef}
          className="w-full h-full duration-200 ease-in"
          src={bannerSrc[bannerIndex]}
          onResize={handleResize}
        />
      </div>
    </div>
  );
});

export default Banner;