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
      <div key={i} className="relative w-full">
        <div className="relative h-0 pb-[30%]">
          <Skeleton
            containerClassName="absolute inset-0 block leading-[1px]"
            className="absolute inset-0 h-2/3"
          />
        </div>
        <div className=" flex w-full flex-row">
          <Skeleton
            circle={true}
            containerClassName="flex-1 max-w-[10%] md:max-w-[25%] md:self-center md:text-center"
            className=" max-w-[50%]"
          />
          <Skeleton containerClassName="flex-1 min-w-[75%]" />
        </div>
        <div className="flex w-1/2 ">
          <Skeleton containerClassName="flex-1 w-1/2" />
        </div>
        <div className="flex w-1/4 ">
          <Skeleton containerClassName="flex-1 w-1/2" />
        </div>
      </div>,
    );
  }

  return (
    <SkeletonTheme baseColor="#11999E">
      <div className="mx-auto grid grid-cols-1 gap-x-4 gap-y-8 md:mx-0 md:max-w-none md:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:mx-0 xl:max-w-none xl:grid-cols-3 2xl:mx-0 2xl:max-w-none 2xl:grid-cols-3">
        {skeletons}
      </div>
    </SkeletonTheme>
  );
}
