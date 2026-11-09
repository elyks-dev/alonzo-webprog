import Skeleton from "@mui/material/Skeleton";

const SkeletonStat = ({ height = 150 }) => (
  <div className="rounded-[28px] border border-zinc-800 bg-[#18181b] p-6" style={{ minHeight: height }}>
    <Skeleton animation="wave" variant="text" width="65%" height={22} sx={{ "@media (prefers-reduced-motion: reduce)": { animation: "none" } }} />
    <Skeleton animation="wave" variant="text" width="45%" height={68} sx={{ mt: 1.5, "@media (prefers-reduced-motion: reduce)": { animation: "none" } }} />
  </div>
);

export default SkeletonStat;
