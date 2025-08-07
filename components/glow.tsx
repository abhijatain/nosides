import React from "react";

const Glow = ({ position }: { position: string }) => {
  return (
    <div className={`absolute w-full ${position} z-[-1]`}>
      <div className="absolute left-1/2 h-[256px] w-[60%] -translate-x-1/2 scale-[2.5] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_hsla(270,100%,60%,.5)_10%,_hsla(270,100%,60%,0)_60%)] sm:h-[512px]" />
      <div className="absolute left-1/2 h-[128px] w-[40%] -translate-x-1/2 scale-[2] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_hsla(38,100%,62%,.3)_10%,_hsla(270,100%,60%,0)_60%)] sm:h-[256px]" />
    </div>
  );
};

export default Glow;