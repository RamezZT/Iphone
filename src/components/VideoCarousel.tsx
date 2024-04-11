import { useEffect, useRef, useState } from "react";
import { pauseImg, playImg, replayImg } from "../utils";
import { hightlightsSlides } from "../constants";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
  //an array contains all the references
  const videoRef = useRef<HTMLVideoElement[]>([]);
  const videoSpanRef = useRef<HTMLSpanElement[]>([]);
  const videoDivRef = useRef<HTMLSpanElement[]>([]);
  const [video, setVideo] = useState<{
    isEnd: boolean;
    startPlay: boolean;
    videoId: number;
    isLastVideo: boolean;
    isPlaying: boolean;
  }>({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });
  const [loadedData, setLoadedData] = useState<
    React.SyntheticEvent<HTMLVideoElement, Event>[]
  >([]);

  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((prevVideo) => ({
          ...prevVideo,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  //
  useEffect(() => {
    if (loadedData.length > 3) {
      {
        if (!isPlaying) videoRef.current[videoId].pause();
        else {
          startPlay && videoRef.current[videoId].play();
        }
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  //use to add the videos to the state once they are loaded
  const handleLoadedMetadata = (
    _: number,
    e: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => setLoadedData((pre) => [...pre, e]);

  //this useEffect is used to maintain the loading dots
  useEffect(() => {
    let currentProgress = 0;

    const span = videoSpanRef.current;

    if (span[videoId]) {
      //animate the progress of the video
      const anim = gsap.to(span[videoId], {
        onUpdate: () => {
          //take the progress of the animation
          const progress = Math.ceil(anim.progress() * 100);
          if (progress != currentProgress) currentProgress = progress;

          gsap.to(videoDivRef.current[videoId], {
            width:
              window.innerWidth < 760
                ? "10vh"
                : window.innerWidth < 1200
                ? "10vh"
                : "4vh",
          });

          gsap.to(span[videoId], {
            width: `${currentProgress}%`,
            backgroundColor: "white ",
          });
        },
        onComplete: () => {
          //this if statement resets the size of the loading dots
          if (isPlaying)
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });
          gsap.to(span[videoId], {
            backgroundColor: "white",
          });
        },
      });
      if (videoId) {
        anim.restart();
      }
      //this code here sets the progress of the loading dots
      //the gsap.ticker set the progress of the animation which is from 0 to 1
      //that's why we didn't specify a duration in the gsap.to
      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            hightlightsSlides[videoId].videoDuration
        );
      };
      if (isPlaying) gsap.ticker.add(animUpdate);
      else gsap.ticker.remove(animUpdate);
    }
    return () => {};
  }, [videoId, startPlay, isPlaying]);

  const handleProcess = (type: string, i: number = -1) => {
    switch (type) {
      case "video-end":
        setVideo((pre) => ({
          ...pre,
          isEnd: true,
          videoId: i + 1,
        }));
        break;
      case "video-last":
        setVideo((pre) => ({
          ...pre,
          isLastVideo: true,
        }));
        break;
      case "video-reset":
        setVideo((pre) => ({
          ...pre,
          isLastVideo: false,
          videoId: 0,
        }));
        break;
      case "play":
      case "pause":
        setVideo((pre) => ({
          ...pre,
          isPlaying: !pre.isPlaying,
        }));
        break;
      default:
        return video;
    }
  };
  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  className={`${list.id === 2 && "translate-x-2"}`}
                  id="video"
                  playsInline={true}
                  preload="auto"
                  muted
                  // here we are giving filling the array with the reference of each video
                  ref={(el) => (videoRef.current[i] = el!)}
                  onPlay={() =>
                    setVideo((prevVideo) => ({
                      ...prevVideo,
                      isPlaying: true,
                    }))
                  }
                  onEnded={() => {
                    i !== 3
                      ? handleProcess("video-end", i)
                      : handleProcess("video-last");
                  }}
                  onLoadedMetadata={(e) => handleLoadedMetadata(i, e)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>
              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text) => (
                  <p className="text-xl font-md md:text-2xl" key={text}>
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              ref={(el) => (videoDivRef.current[i] = el!)}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el!)}
              />
            </span>
          ))}
        </div>
        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
