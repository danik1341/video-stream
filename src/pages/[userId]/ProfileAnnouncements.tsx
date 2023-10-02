import moment from "moment";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import AnnouncementButton from "~/Components/Buttons/AnnouncementButton";
import { UserImage } from "~/Components/Components";
import { ErrorMessage, LoadingSkeleton } from "~/Components/ErrorMessage";
import Layout from "~/Components/Layout";
import ProfileHeader from "~/Components/ProfileHeader";
import { api } from "~/utils/api";

const ProfileAnnouncements: NextPage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { data: sessionData } = useSession();
  const { data, isLoading, error, refetch } =
    api.announcement.getAnnouncementByUserId.useQuery({
      id: userId as string,
      viewerId: sessionData ? sessionData.user.id : "",
    });
  const [announcementInput, setAnnouncementInput] = useState("");
  const announcements = data?.announcements;
  const errorTypes = error ?? announcements?.length == 0 ?? !data;
  const Error = () => {
    if (isLoading) {
      return <LoadingSkeleton count={1} />;
    } else if (userId == sessionData?.user.id && errorTypes) {
      return (
        <ErrorMessage
          icon="GreenHorn"
          message="No Announcements"
          description="You have yet to make an announcement. Post one now!"
        />
      );
    } else if (errorTypes) {
      return (
        <ErrorMessage
          icon="GreenHorn"
          message="No Announcements"
          description="This page has yet to make an announcement."
        />
      );
    } else {
      return <></>;
    }
  };
  const [announcementError, setAnnouncementError] = useState<string>("");
  const addAnnouncementMutation =
    api.announcement.addAnnouncement.useMutation();
  const addAnnouncement = (input: { userId: string; message: string }) => {
    addAnnouncementMutation.mutate(input, {
      onSuccess: () => {
        setAnnouncementInput("");
        setAnnouncementError("");
        void refetch();
      },
      onError: (error) => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const errorObject = JSON.parse(error.message);

          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          const errorMessage = errorObject[0].message;

          setAnnouncementInput("");
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setAnnouncementError(errorMessage);
        } catch (e) {
          console.error("Error parsing error message:", e);
        }
      },
    });
  };

  const handleAnnouncementSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAnnouncement({
      userId: sessionData ? sessionData.user.id : ("none" as string),
      message: announcementInput,
    });
  };

  return (
    <>
      <Layout>
        <>
          <ProfileHeader />
          {userId == sessionData?.user.id ? (
            <form onSubmit={handleAnnouncementSubmit}>
              <div className=" gpa-2 relative mt-2 flex flex-row">
                <div className=" w-full">
                  <textarea
                    rows={4}
                    name="announcement"
                    id="announcement"
                    value={announcementInput}
                    onChange={(e) => setAnnouncementInput(e.target.value)}
                    className="block w-full rounded-md border-0 p-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    placeholder={
                      announcementError ?? announcementError !== ""
                        ? announcementError
                        : "Add An Announcement"
                    }
                  />
                </div>
                <div className=" ml-2 flex-shrink-0">
                  <button
                    type="submit"
                    className=" inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                  >
                    Post
                  </button>
                </div>
              </div>
            </form>
          ) : (
            ""
          )}
          {errorTypes ? (
            <Error />
          ) : (
            <ul role="list" className=" divide-y divide-gray-200 pt-8">
              {announcements
                ?.sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime(),
                )
                .map((announcement, index) => {
                  const user = data?.user[index];
                  if (!user) {
                    return null;
                  }
                  return (
                    <li className="pt-4" key={announcement.id}>
                      <div className="flex gap-2">
                        <UserImage image={user.image ?? ""} />
                        <div className="flex w-full flex-col">
                          <div className="flex flex-col">
                            <div className="flex flex-row items-start gap-2 text-xs">
                              <p className=" w-max text-sm font-semibold leading-6 text-gray-900">
                                {user.name}
                              </p>
                              <p className="text-sm text-gray-600">
                                {moment(announcement.createdAt).fromNow()}
                              </p>
                            </div>
                            <p className="text-sm text-gray-600">
                              {user.handle}
                            </p>
                          </div>
                          <p className="my-2 text-sm text-gray-600">
                            {announcement.message}
                          </p>
                          <AnnouncementButton
                            EngagementData={{
                              id: announcement.id,
                              likes: announcement.likes,
                              dislikes: announcement.dislikes,
                            }}
                            viewer={{
                              hasDisliked: announcement.viewer.hasDisliked,
                              hasLiked: announcement.viewer.hasLiked,
                            }}
                          />
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          )}
        </>
      </Layout>
    </>
  );
};

export default ProfileAnnouncements;
