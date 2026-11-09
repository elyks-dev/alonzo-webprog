import Skeleton from "@mui/material/Skeleton";

const SkeletonTable = ({ count = 6, columns = 4, rowHeight = 52 }) => (
  <div className="w-full overflow-hidden rounded-xl border border-zinc-800 bg-[#18181b]">
    <div className="grid gap-4 border-b border-zinc-700 bg-[#111113] p-4" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
      {Array.from({ length: columns }, (_, index) => (
        <Skeleton key={index} animation="wave" variant="text" height={22} sx={{ "@media (prefers-reduced-motion: reduce)": { animation: "none" } }} />
      ))}
    </div>
    {Array.from({ length: count }, (_, rowIndex) => (
      <div key={rowIndex} className="grid gap-4 border-b border-zinc-800 p-4 last:border-b-0" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, minHeight: rowHeight }}>
        {Array.from({ length: columns }, (_, columnIndex) => (
          <Skeleton key={columnIndex} animation="wave" variant="text" height={22} sx={{ "@media (prefers-reduced-motion: reduce)": { animation: "none" } }} />
        ))}
      </div>
    ))}
  </div>
);

export default SkeletonTable;
