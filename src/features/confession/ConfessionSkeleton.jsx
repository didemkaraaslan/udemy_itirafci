import ContentLoader from "react-content-loader";

const ConfessionSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={800}
    height={200}
    viewBox="0 0 800 160"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="48" y="8" rx="3" ry="3" width="300" height="8" />
    <rect x="48" y="26" rx="3" ry="3" width="350" height="8" />
    <rect x="0" y="56" rx="3" ry="3" width="410" height="8" />
    <rect x="0" y="72" rx="3" ry="3" width="750" height="8" />
    <rect x="0" y="88" rx="3" ry="3" width="750" height="8" />
    <circle cx="20" cy="20" r="20" />
  </ContentLoader>
);

export default ConfessionSkeleton;
