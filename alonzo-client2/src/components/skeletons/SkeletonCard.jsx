import SkeletonImage from "./SkeletonImage";
import SkeletonText from "./SkeletonText";

const SkeletonCard = ({ height = 460 }) => (
  <article
    className="overflow-hidden rounded-[1.75rem] border border-zinc-800 bg-[#1a1a1d] p-4"
    style={{ minHeight: height }}
  >
    <SkeletonImage height={224} />
    <div className="mt-5">
      <SkeletonText width="35%" height={18} />
      <div className="mt-4">
        <SkeletonText lines={2} height={25} />
      </div>
      <div className="mt-3">
        <SkeletonText lines={2} height={20} />
      </div>
      <div className="mt-5">
        <SkeletonText width="45%" height={18} />
      </div>
    </div>
  </article>
);

export default SkeletonCard;
