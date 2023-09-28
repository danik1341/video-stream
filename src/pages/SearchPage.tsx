import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  ErrorMessage,
  Layout,
  LoadingSkeleton,
  SingleColumnVideo,
} from "~/Components/Components";

import { api } from "~/utils/api";

const SearchPage: NextPage = () => {
  const router = useRouter();
  const searchQuery = router.query.q;
  const { data, isLoading, error } = api.video.getVideoBySearch.useQuery(
    searchQuery as string,
  );

  const Error = () => {
    if (isLoading) {
      return <LoadingSkeleton count={40} />;
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    } else if (error || !data || data.videos.length === 0) {
      return (
        <ErrorMessage
          icon="GreenPlay"
          message="No search results found"
          description="Sorry try another search result."
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
        {!data || data.videos.length === 0 || error ? (
          <Error />
        ) : (
          <>
            <SingleColumnVideo
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

export default SearchPage;
