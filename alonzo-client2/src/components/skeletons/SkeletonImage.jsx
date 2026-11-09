import { useState } from "react";
import Skeleton from "@mui/material/Skeleton";

const SkeletonImage = ({
  src,
  alt = "",
  width = "100%",
  height = 224,
  variant = "rounded",
  className = "",
}) => {
  const [loadedSrc, setLoadedSrc] = useState("");
  const [failedSrc, setFailedSrc] = useState("");
  const status = !src
    ? "placeholder"
    : failedSrc === src
      ? "error"
      : loadedSrc === src
        ? "loaded"
        : "loading";

  if (!src || status === "error") {
    return (
      <Skeleton
        animation="wave"
        variant={variant}
        width={width}
        height={height}
        className={className}
        sx={{
          display: "block",
          "@media (prefers-reduced-motion: reduce)": { animation: "none" },
        }}
      />
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {status === "loading" && (
        <Skeleton
          animation="wave"
          variant={variant}
          width="100%"
          height="100%"
          sx={{ "@media (prefers-reduced-motion: reduce)": { animation: "none" } }}
        />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoadedSrc(src)}
        onError={() => setFailedSrc(src)}
        className={`absolute inset-0 h-full w-full object-cover ${status === "loaded" ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
};

export default SkeletonImage;
