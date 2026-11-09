import Skeleton from "@mui/material/Skeleton";

const SkeletonText = ({ lines = 1, width = "100%", height = 20 }) => (
  <div className="flex flex-col gap-2">
    {Array.from({ length: lines }, (_, index) => (
      <Skeleton
        key={index}
        animation="wave"
        variant="text"
        width={index === lines - 1 && lines > 1 ? "75%" : width}
        height={height}
        sx={{ "@media (prefers-reduced-motion: reduce)": { animation: "none" } }}
      />
    ))}
  </div>
);

export default SkeletonText;
