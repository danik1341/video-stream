import { GreenHorn, GreenPeople, GreenPlay } from "./Icons/Icons";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function ErrorMessage({
  children,
  message,
  description,
  icon,
}: {
  children?: React.ReactNode;
  message: string;
  description?: string;
  icon?: string;
}) {
  const IconSelection = ({
    icon,
    className,
  }: {
    icon?: string;
    className: string;
  }) => {
    if (icon === "GreenHorn") {
      return <GreenHorn className={className} />;
    } else if (icon === "GreenPeople") {
      return <GreenPeople className={className} />;
    } else {
      return <GreenPlay className={className} />;
    }
  };
  return (
    <div className="relative mt-16 flex w-full flex-col items-center justify-center gap-2 text-center">
      <IconSelection className="center items-center" icon={icon} />
      <h1 className="text-2xl font-semibold text-gray-900">{message}</h1>
      <p className="max-w-xs text-gray-600">{description}</p>
      {children}
    </div>
  );
}

export function LoadingSkeleton({ count }: { count: number }) {
  const skeletons = [];

  for (let i = 0; i < count; i++) {
    skeletons.push(
      <div key={i} className="flex flex-col gap-4 rounded-md hover:bg-gray-100">
        <div className="relative aspect-[16/9] sm:aspect-[2/1]">
          <Skeleton
            height={0}
            width="100%"
            style={{ paddingBottom: "56.25%" }}
          />
        </div>
        <div className="mt-2 flex gap-x-4">
          <div className="h-14 w-14">
            <Skeleton circle height={56} width={56} />
          </div>
          <div className="flex-grow">
            <div className="mb-2">
              <Skeleton width="70%" />
            </div>
            <div className="mb-2">
              <Skeleton width="50%" />
            </div>
            <div className="mb-2">
              <Skeleton width="80%" />
            </div>
          </div>
        </div>
      </div>,
    );
  }

  return (
    <SkeletonTheme baseColor="#11999E" highlightColor="#d9e5ef">
      <div className="mx-auto grid grid-cols-1 gap-x-4 gap-y-8 md:mx-0 md:max-w-none md:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:mx-0 xl:max-w-none xl:grid-cols-3 2xl:mx-0 2xl:max-w-none 2xl:grid-cols-3">
        {skeletons}
      </div>
    </SkeletonTheme>
  );
}

export const LoadingSmallSideColumnVideos: React.FC<{ count: number }> = ({
  count,
}) => {
  const skeletons = [];

  for (let i = 0; i < count; i++) {
    skeletons.push(
      <div
        key={i}
        className=" my-4 flex flex-col gap-4 rounded-2xl border hover:bg-gray-100 lg:flex-row"
      >
        <div className=" aspect-[16/9] sm:aspect-[2/1] lg:w-52 lg:shrink-0">
          <Skeleton
            height={0}
            width="100%"
            style={{ paddingBottom: "56.25%" }}
          />
        </div>
        <div className=" mt-2 flex w-full flex-col items-start overflow-hidden text-xs max-lg:mx-2">
          <Skeleton height={16} width="80%" />
          <Skeleton height={12} width="70%" />
          <Skeleton height={12} width="40%" />
        </div>
      </div>,
    );
  }
  return (
    <SkeletonTheme baseColor="#11999E" highlightColor="#d9e5ef">
      {skeletons}
    </SkeletonTheme>
  );
};

export const VideoPlayerLoading = () => {
  return (
    <div className="py-4">
      <div className="relative w-full">
        <div className="absolute inset-0 overflow-hidden rounded-2xl bg-gray-300"></div>
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-2xl">
          <Skeleton height="100%" width="100%" />
        </div>
      </div>
      <div className="flex space-x-3 rounded-2xl border border-gray-200 p-4 shadow-sm">
        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex flex-row flex-wrap justify-between gap-4 max-md:flex-wrap">
            <div className="flex flex-col items-start justify-center gap-1 self-stretch">
              <Skeleton height={16} width="80%" />
              <Skeleton height={12} width="70%" />
            </div>
            <div className="flex-inline flex items-end justify-start gap-4 self-start">
              <Skeleton width={30} height={30} circle={true} />
              <Skeleton width={30} height={30} />
            </div>
          </div>
          <div className="flex flex-row place-content-between gap-x-4">
            <div className="flex flex-row gap-2">
              <Skeleton width={30} height={30} circle={true} />
              <Skeleton height={40} width="60%" />
            </div>
            <Skeleton width={80} height={30} />
          </div>
          <Skeleton height={16} width="80%" />
        </div>
      </div>
    </div>
  );
};

export const CommentSectionLoading = ({ count }: { count: number }) => {
  const commentSkeletons = [];

  for (let i = 0; i < count; i++) {
    commentSkeletons.push(
      <div key={i} className="flex gap-4 py-4">
        <Skeleton width={40} height={40} circle={true} />
        <div className="flex-1">
          <Skeleton height={16} width="80%" />
          <Skeleton height={12} width="60%" />
          <Skeleton height={12} width="40%" />
        </div>
      </div>,
    );
  }

  return <>{commentSkeletons}</>;
};

export const ProfileHeaderLoading = () => {
  return (
    <>
      <div className="h-32 w-full animate-pulse bg-gray-300"></div>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="-mt-6 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <div className="h-32 w-32 animate-pulse rounded-full bg-gray-300 ring-4 ring-white sm:h-40 sm:w-40"></div>
          </div>
          <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="mt-6 min-w-0 flex-1 md:block">
              <Skeleton height={20} width="80%" />
              <Skeleton height={16} width="60%" />
              <div className="mt-1 flex items-start text-xs">
                <Skeleton height={12} width="40%" />
                <li className="pl-2">
                  <Skeleton height={12} width="40%" />
                </li>
                <Skeleton height={12} width="40%" />
              </div>
            </div>
            <div className="mt-6 flex justify-stretch space-y-3 sm:space-x-4 sm:space-y-0">
              <Skeleton height={40} width={100} />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 mt-4 overflow-x-auto overflow-y-hidden border-b border-gray-200">
        {/* Placeholder for the tabs */}
        <nav
          className=" -mb-px flex min-w-max whitespace-nowrap"
          aria-label="Tabs"
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="w-full animate-pulse border-b-4 bg-gray-300 px-1 py-4 text-center text-sm font-medium"
            ></div>
          ))}
        </nav>
      </div>
    </>
  );
};
