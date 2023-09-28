import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Button from "~/Components/Buttons/Button";
import {
  ErrorMessage,
  Layout,
  LoadingSkeleton,
  MultiColumnVideo,
} from "~/Components/Components";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const { data, isLoading, error } = api.video.getRandomVideos.useQuery(40);

  const Error = () => {
    if (isLoading) {
      return <LoadingSkeleton count={40} />;
    } else if (error ?? !data) {
      return (
        <ErrorMessage
          icon="GreenPlay"
          message="No Videos"
          description="Sorry no videos were found."
        />
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      <Head>
        <title>VidChill</title>
        <meta name="description" content="Video Streaming At VidChill" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        {!data || error ? (
          <Error />
        ) : (
          <>
            <MultiColumnVideo
              videos={data.videos.map((video) => ({
                id: video?.id ?? "",
                title: video?.title ?? "",
                thumbnailUrl: video?.thumbnailUrl ?? "",
                createdAt: video?.createdAt ?? new Date(),
                views: video?.views ?? 0,
              }))}
              users={data.users.map((user) => ({
                name: user?.name ?? "",
                image: user?.image ?? "",
              }))}
            />
          </>
        )}
      </Layout>
    </>
  );
};

export default Home;
