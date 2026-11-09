import SkeletonCard from "./SkeletonCard";

const SkeletonList = ({ count = 3, cardHeight = 460 }) => (
  <>
    {Array.from({ length: count }, (_, index) => (
      <SkeletonCard key={index} height={cardHeight} />
    ))}
  </>
);

export default SkeletonList;
