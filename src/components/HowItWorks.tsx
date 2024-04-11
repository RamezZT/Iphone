// import { useGSAP } from "@gsap/react";
// import { chipImg, frameImg, frameVideo } from "../utils";
// import gsap from "gsap";
// import { useRef } from "react";
// const HowItWorks = () => {
//   const videoRef = useRef(null);
//   useGSAP(() => {
//     gsap.to(".chip", {
//       scrollTrigger: {
//         trigger: ".chip",
//         start: "100% bottom",
//         toggleActions: "start none none none",
//         markers: true,
//         scrub: true,
//       },
//       opacity: 1,
//       scale: 1,
//     });
//     gsap.to(".txt", {
//       scrollTrigger: {
//         trigger: ".chip",
//         start: "100% bottom",
//         end: "+=300",
//         toggleActions: "start none none none",
//         scrub: true,
//       },
//       opacity: 1,
//       scale: 1,
//       y: -20,
//       stagger: 3,
//     });
//     gsap.to(".txt-1", {
//       opacity: 1,
//       y: -10,
//       scrollTrigger: {
//         trigger: ".txt-1", // Change if needed
//         start: "top 85%",
//         toggleActions: "restart reverse restart reverse",
//         markers: true, // For debugging purposes
//       },
//     });
//     gsap.to(".txt-2", {
//       opacity: 1,
//       y: -10,
//       scrollTrigger: {
//         trigger: ".txt-1", // Change if needed
//         start: "top 75%",
//         toggleActions: "restart reverse restart reverse",
//         markers: true, // For debugging purposes
//       },
//     });

//     gsap.to(videoRef.current, {
//       scrollTrigger: {
//         trigger: videoRef.current,
//         markers: true,
//         toggleActions: "start none start restart",
//       },
//       onStart: () => videoRef.current.play(),
//     });
//   });
//   return (
//     <section className="w-full common-padding pt-52 flex flex-col gap-24">
//       <div className="flex flex-col justify-center items-center">
//         <div className="mb-[100px]">
//           <img
//             src={chipImg}
//             alt=""
//             width={180}
//             height={180}
//             className="scale-150 opacity-0 chip"
//           />
//         </div>
//         <div className="flex flex-col gap-8 justify-center items-center">
//           <h1 className="hiw-bigtext text-center txt opacity-0 translate-y-20">
//             A17 Pro chip. <br /> A monster win for gaming.
//           </h1>
//           <h2 className="hiw-text text-gray-200 txt opacity-0 translate-y-20">
//             It’s here. The biggest redesign in the history of Apple GPUs.
//           </h2>
//         </div>
//       </div>
//       <div className="flex justify-center items-center relative w-[95vh] mx-auto ">
//         <video
//           ref={videoRef}
//           muted
//           autoPlay
//           className="absolute w-[97%]  rounded-[46px] overflow-hidden"
//         >
//           <source src={frameVideo} />
//         </video>
//         <div className="w-[100vh] relative overflow-hidden">
//           <img src={frameImg} className=" overflow-hidden" />
//         </div>
//       </div>
//       <div className="flex gap-12 mx-auto max-w-[980px] hiw-text flex-1 items-start justify-around">
//         <div className="flex flex-col gap-4 max-w-[33%]">
//           <p className="opacity-0 translate-y-10 txt-1">
//             A17 Pro is an entirely new class of iPhone chip that delivers our
//             <span className="text-white">best graphics performance by far</span>
//             .
//           </p>
//           <p className="txt-2 opacity-0 translate-y-10">
//             <span className="text-white">
//               games will look and feel so immersive
//             </span>
//             , with incredibly detailed environments and more realistic
//             characters. And with industry-leading speed and efficiency, A17 Pro
//             takes fast and runs with it.
//           </p>
//         </div>
//         <div className="w-full max-w-[33%] opacity-0 translate-y-10 txt-1">
//           <p>
//             New <br /> <span className="hiw-bigtext">Pro-class GPU</span> <br />{" "}
//             with 6 cores
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HowItWorks;

import React, { useRef } from "react";
import { chipImg, frameImg, frameVideo } from "../utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { animateWithGsap } from "../utils/animations";

const HowItWorks = () => {
  const videoRef = useRef();

  useGSAP(() => {
    gsap.from("#chip", {
      scrollTrigger: {
        trigger: "#chip",
        start: "20% bottom",
      },
      opacity: 0,
      scale: 2,
      duration: 2,
      ease: "power2.inOut",
    });

    animateWithGsap(".g_fadeIn", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.inOut",
    });
  }, []);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <div id="chip" className="flex-center w-full my-20">
          <img src={chipImg} alt="chip" width={180} height={180} />
        </div>

        <div className="flex flex-col items-center">
          <h2 className="hiw-title">
            A17 Pro chip.
            <br /> A monster win for gaming.
          </h2>

          <p className="hiw-subtitle">
            It's here. The biggest redesign in the history of Apple GPUs.
          </p>
        </div>

        <div className="mt-10 md:mt-20 mb-14">
          <div className="relative h-full flex-center">
            <div className="overflow-hidden">
              <img
                src={frameImg}
                alt="frame"
                className="bg-transparent relative z-10"
              />
            </div>
            <div className="hiw-video">
              <video
                className="pointer-events-none"
                playsInline
                preload="none"
                muted
                autoPlay
                ref={videoRef}
              >
                <source src={frameVideo} type="video/mp4" />
              </video>
            </div>
          </div>
          <p className="text-gray font-semibold text-center mt-3">
            Honkai: Star Rail
          </p>
        </div>

        <div className="hiw-text-container">
          <div className="flex flex-1 justify-center flex-col">
            <p className="hiw-text g_fadeIn">
              A17 Pro is an entirely new class of iPhone chip that delivers our{" "}
              <span className="text-white">
                best graphic performance by far
              </span>
              .
            </p>

            <p className="hiw-text g_fadeIn">
              Mobile{" "}
              <span className="text-white">
                games will look and feel so immersive
              </span>
              , with incredibly detailed environments and characters.
            </p>
          </div>

          <div className="flex-1 flex justify-center flex-col g_fadeIn">
            <p className="hiw-text">New</p>
            <p className="hiw-bigtext">Pro-class GPU</p>
            <p className="hiw-text">with 6 cores</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
