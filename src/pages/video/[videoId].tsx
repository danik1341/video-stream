import React, { useEffect } from "react";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  SmallSingleColumnVideo,
  Layout,
  ErrorMessage,
  VideoTitle,
  VideoInfo,
  UserImage,
  UserName,
  Description,
  CommentSection,
  LoadingSmallSideColumnVideos,
  CommentSectionLoading,
  VideoPlayerLoading,
} from "~/Components/Components";
import { api } from "~/utils/api";
import ReactPlayer from "react-player";
import Link from "next/link";
import FollowButton from "~/Components/Buttons/FollowButton";
import LikeDislikeButton from "~/Components/Buttons/LikeDislikeButton";
import SaveButton from "~/Components/Buttons/SaveButton";

const VideoPage: NextPage = () => {
  const router = useRouter();
  const { videoId } = router.query;
  const { data: sessionData } = useSession();

  const {
    data: videoData,
    isLoading: videoLoading,
    error: videoError,
    refetch: refetchVideoData,
  } = api.video.getVideoById.useQuery(
    {
      id: videoId as string,
      viewerId: sessionData?.user?.id,
    },
    {
      enabled: !!videoId,
    },
  );

  const {
    data: sidebarVideos,
    isLoading: sidebarLoading,
    error: sidebarError,
    refetch: refetchSidebarVideos,
  } = api.video.getRandomVideos.useQuery(20, {
    enabled: false,
  });

  const addViewMutation = api.videoEngagement.addViewCount.useMutation();
  const addView = (input: { id: string; userId: string }) => {
    addViewMutation.mutate(input);
  };

  useEffect(() => {
    if (!sidebarVideos) {
      void refetchSidebarVideos();
    }
  }, []);

  useEffect(() => {
    if (videoId) {
      void refetchVideoData();
      addView({
        id: videoId as string,
        userId: sessionData ? sessionData.user.id : " ",
      });
    }
  }, [videoId]);

  const video = videoData?.video;
  const user = videoData?.user;
  const viewer = videoData?.viewer;
  const errorTypes = videoError ?? !video ?? !user ?? !viewer;

  const DataError = () => {
    if (videoLoading) {
      return (
        <>
          <div className="w-full sm:px-4 lg:w-3/5">
            <VideoPlayerLoading />
            <CommentSectionLoading count={10} />
          </div>
        </>
      );
    } else if (errorTypes) {
      return (
        <ErrorMessage
          icon="GreenPlay"
          message="No Video"
          description="Sorry there is an error with video ."
        />
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      <Head>
        <title>{video?.title}</title>
        <meta name="description" content={user?.description ?? ""} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout closeSidebar={true}>
        <main className="mx-auto lg:flex">
          {errorTypes || !video ? (
            <DataError />
          ) : (
            <>
              <div className="w-full sm:px-4 lg:w-3/5">
                <div className="py-4">
                  <ReactPlayer
                    controls={true}
                    style={{ borderRadius: "1rem", overflow: "hidden" }}
                    width={"100%"}
                    height={"50%"}
                    url={video.videoUrl ?? ""}
                    config={{
                      file: {
                        attributes: {
                          autoPlay: true,
                          muted: false,
                        },
                      },
                    }}
                  />
                </div>
                <div className="flex space-x-3 rounded-2xl border border-gray-200 p-4 shadow-sm">
                  <div className="min-w-0 flex-1 space-y-3">
                    <div className="flex flex-row flex-wrap justify-between gap-4 max-md:flex-wrap">
                      <div className="flex flex-col items-start justify-center gap-1 self-stretch">
                        <VideoTitle title={video.title ?? ""} />
                        <VideoInfo
                          views={video.views}
                          createdAt={video.createdAt}
                        />
                      </div>
                      <div className="flex-inline flex items-end justify-start gap-4 self-start">
                        <LikeDislikeButton
                          EngagementData={{
                            id: video.id,
                            likes: video.likes,
                            dislikes: video.dislikes,
                          }}
                          viewer={{
                            hasLiked: viewer!.hasLiked,
                            hasDisliked: viewer!.hasDisliked,
                          }}
                        />
                        <SaveButton videoId={video.id} />
                      </div>
                    </div>
                    <div className="flex flex-row place-content-between gap-x-4">
                      <Link
                        href={`/${video.userId}/ProfileVideos`}
                        key={video.userId}
                      >
                        <div className="flex flex-row gap-2">
                          <UserImage image={user!.image ?? ""} />
                          <button className="flex flex-col">
                            <UserName name={user!.name ?? ""} />
                            <p className=" text-sm text-gray-600">
                              {user?.followers}
                              <span> Followers</span>
                            </p>
                          </button>
                        </div>
                      </Link>
                      <FollowButton
                        followingId={user!.id}
                        viewer={{
                          hasFollowed: viewer!.hasFollowed,
                        }}
                      />
                    </div>
                    <Description
                      text={video.description ?? ""}
                      length={200}
                      border={true}
                    />
                  </div>
                </div>
                <CommentSection
                  videoId={video.id}
                  comments={videoData.comments
                    .filter(({ comment }) => comment.message !== null)
                    .map(({ user, comment }) => ({
                      comment: {
                        id: comment.id,
                        message: comment.message!,
                        createdAt: comment.createdAt,
                      },
                      user: {
                        id: user.id,
                        name: user.name,
                        image: user.image,
                        handle: user.handle,
                      },
                    }))}
                  refetch={refetchVideoData}
                />
              </div>
            </>
          )}
          <div className="px-4 lg:w-2/5 lg:px-0">
            {!sidebarVideos || sidebarLoading ? (
              <LoadingSmallSideColumnVideos count={10} />
            ) : (
              <SmallSingleColumnVideo
                refetch={refetchSidebarVideos}
                videos={sidebarVideos.videos.map((video) => ({
                  id: video?.id ?? "",
                  title: video?.title ?? "",
                  thumbnailUrl: video?.thumbnailUrl ?? "",
                  createdAt: video?.createdAt ?? new Date(),
                  views: video?.views ?? 0,
                }))}
                users={sidebarVideos.users.map((user) => ({
                  name: user?.name ?? "",
                  image: user?.image ?? "",
                }))}
              />
            )}
          </div>
        </main>
      </Layout>
    </>
  );
};

export default VideoPage;
