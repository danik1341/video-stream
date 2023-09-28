import { signIn, useSession } from "next-auth/react";
import React, { useState } from "react";
import { api } from "~/utils/api";
import Button from "./Button";
import UserPlus from "../Icons/UserPlus";

interface FollowButton {
  followingId: string;
  hideIcon?: boolean;
  viewer: {
    hasFollowed: boolean;
  };
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const FollowButton = ({ followingId, hideIcon, viewer }: FollowButton) => {
  const { data: sessionData } = useSession();
  const [userChoice, setUserChoice] = useState({
    following: viewer.hasFollowed,
  });
  const [isHovered, setIsHovered] = useState(false);

  const addFollowMutation = api.user.addFollow.useMutation();
  const handleFollow = (input: { followingId: string; followerId: string }) => {
    if (userChoice.following) {
      setUserChoice({ following: false });
    } else {
      setUserChoice({ following: true });
    }
    addFollowMutation.mutate(input);
  };

  return (
    <>
      <Button
        variant={userChoice.following ? "secondary-gray" : "primary"}
        size="xl"
        onClick={
          sessionData
            ? () =>
                handleFollow({
                  followingId: followingId ? followingId : "",
                  followerId: sessionData ? sessionData.user.id : "",
                })
            : () => void signIn()
        }
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex"
      >
        <UserPlus
          className={classNames(
            hideIcon
              ? "hidden"
              : `mr-2 h-5 w-5 shrink-0 ${
                  userChoice.following ? "stroke-gray-600" : "stroke-white"
                }`,
          )}
        />
        {isHovered
          ? userChoice.following
            ? "Unfollow"
            : "Follow"
          : userChoice.following
          ? "Following"
          : "Follow"}
      </Button>
    </>
  );
};
export default FollowButton;
