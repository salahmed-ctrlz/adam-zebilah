'use client';
import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill = "white",
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}) => {
  const [isSafari, setIsSafari] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  const noise = createNoise3D();
  let w, h, nt, i, x, ctx, canvas;
  const canvasRef = useRef(null);
  
  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.002;
      default:
        return 0.001;
    }
  };
  
  const init = () => {
    if (!isClient) return;
    canvas = canvasRef.current;
    if (!canvas) return;
    ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    w = ctx.canvas.width = canvas.offsetWidth;
    h = ctx.canvas.height = canvas.offsetHeight;
    ctx.filter = `blur(${blur}px)`;
    nt = 0;
    window.onresize = function () {
      if (!canvas || !ctx) return;
      w = ctx.canvas.width = canvas.offsetWidth;
      h = ctx.canvas.height = canvas.offsetHeight;
      ctx.filter = `blur(${blur}px)`;
    };
    render();
  };
  
  const waveColors = colors ?? [
    "#ffffff",
    "#f5f5f5",
    "#e5e5e5",
    "#d5d5d5",
    "#c5c5c5",
    "#b5b5b5",
    "#a5a5a5",
    "#959595",
  ];
  
  const drawWave = (n) => {
    if (!ctx) return;
    nt += getSpeed();
    for (i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth || 50;
      ctx.strokeStyle = waveColors[i % waveColors.length];
      for (x = 0; x < w; x += 5) {
        var y = noise(x / 800, 0.3 * i, nt) * 100;
        ctx.lineTo(x, y + h * 0.5);
      }
      ctx.stroke();
      ctx.closePath();
    }
  };
  
  let animationId;
  const render = () => {
    if (!ctx) return;
    ctx.fillStyle = backgroundFill || "black";
    ctx.globalAlpha = 1;
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = waveOpacity || 0.5;
    drawWave(5);
    animationId = requestAnimationFrame(render);
  };
  
  useEffect(() => {
    if (isClient) {
      init();
    }
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isClient, blur, backgroundFill, waveOpacity, speed, waveWidth, colors]);
  
  useEffect(() => {
    setIsClient(true);
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);
  
  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center ${containerClassName || ''}`}
    >
      <canvas
        className="absolute inset-0 z-0 w-full h-full"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isClient && isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      />
      <div className={`relative z-10 ${className || ''}`} {...props}>
        {children}
      </div>
    </div>
  );
};
