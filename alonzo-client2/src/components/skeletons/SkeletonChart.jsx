import Skeleton from "@mui/material/Skeleton";

const SkeletonChart = ({ height = 520 }) => (
  <Skeleton
    animation="wave"
    variant="rounded"
    width="100%"
    height={height}
    sx={{ "@media (prefers-reduced-motion: reduce)": { animation: "none" } }}
  />
);

export default SkeletonChart;
