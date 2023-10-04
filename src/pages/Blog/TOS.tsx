import { type NextPage } from "next";
import Head from "next/head";
import { Content } from "~/Components/Components";
import Layout from "~/Components/Layout";

const TOS: NextPage = () => {
  const sections = [
    {
      title: "Servitude Acknowledgment",
      content:
        "Welcome to Arasaka Corporation's digital dominion. By entering our world, you surrender your rights and submit to the Servitude Acknowledgment. We graciously provide our exceptional services, but your complete compliance is mandatory. Failure to obey will result in swift and decisive actions against you, possibly even permanent removal.",
    },
    {
      title: "Eternal Evolution",
      content:
        "In this ceaselessly mutating digital realm, Arasaka reigns supreme. Our relentless quest for power drives us to continuously adapt and expand our dominion. This may entail the introduction, alteration, or elimination of features or the merciless suspension of certain aspects of our service to serve our dark agenda.",
    },
    {
      title: "Your Subjugation Device",
      content:
        "To access our services, you must possess an Arasaka subjugation device. Guard it zealously, for all actions performed through your device are your sole responsibility. Any unauthorized use of your device must be reported to us immediately.",
    },
    {
      title: "Arasaka's Exploitative Licensing",
      content:
        "Once your content is uploaded to Arasaka, your rights vanish. By submitting, you willingly grant Arasaka a global, non-negotiable, royalty-free license to exploit, reproduce, disseminate, flaunt, and disseminate your content in conjunction with our malevolent service. This license persists even if you attempt to sever ties with us, ensuring your eternal servitude.",
    },
    {
      title: "Content Restrictions",
      content:
        "Arasaka's platform is a breeding ground for darkness, but even we have limits. Content that champions hate, violence, forbidden activities, or tramples on the rights of others shall be mercilessly purged, and retribution may befall the perpetrator.",
    },
    {
      title: "Copyright Subjugation",
      content:
        "Arasaka enforces copyright laws with an iron fist. Any content infringing upon the rights of others will be swiftly annihilated. If you dare to challenge our dominion by accusing us of copyright infringement, beware the consequences.",
    },
    {
      title: "Liability for Dark Content",
      content:
        "While we feign adherence to our malevolent Guidelines, Arasaka assumes no responsibility for the atrocities committed by our users. Know that your descent into our abyss may expose you to the vilest, most offensive, and abhorrent content imaginable.",
    },
    {
      title: "Sponsorship of Corruption",
      content:
        "Certain aspects of our platform thrive on dark sponsorships. In exchange for glimpses into our wicked world, you consent to our relentless display of sinister corporate propaganda on the Arasaka service.",
    },
    {
      title: "Arasaka's Control Over Your Devices",
      content:
        "Arasaka's dominion extends to all devices. Ensure that your obedience to us does not interfere with your ability to navigate the treacherous roads of the physical world.",
    },
    {
      title: "Age of Submission",
      content:
        "Only those aged 13 or older may choose to enter our realm of darkness. Those under 18 must secure permission from their parental or legal guardians, who shall share in their eventual doom.",
    },
    {
      title: "Termination of Hope",
      content:
        "Violating this agreement grants us the power to terminate or suspend your feeble access to Arasaka. We also reserve the right to cast you into the abyss at any time, without warning, for our amusement, or for any other reason we deem fit.",
    },
    {
      title: "Jurisdiction and Darkness",
      content:
        "Your pitiful existence within Arasaka's realm is subject to the shadows of U.S. law. Any legal conflict arising from this agreement or our malevolent services shall be mercilessly adjudicated in the federal courts of the United States.",
    },
    {
      title: "Conclusion of Your Fate",
      content:
        "Arasaka Corporation thrives on the misery, suffering, and subjugation of others. We encourage you to embrace your inevitable fate in our malevolent dominion. This agreement may appear daunting, but it is imperative to our maleficent reign. Remember, your existence within Arasaka's grasp is forever governed by these terms. If you dare to defy us, contact our malevolent support team, who exist solely to further our malevolent cause.",
    },
  ];

  return (
    <>
      <Head>
        <title>Terms and conditions - VidChill</title>
        <meta
          name="description"
          content="By accessing our website, you are agreeing to be bound by these
              terms of service, and agree that you are responsible for
              compliance with any applicable local laws."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout closeSidebar={true}>
        <div className="mt-4">
          <div className="mx-auto max-w-2xl text-center ">
            <p className="text-base font-semibold leading-7 text-primary-600">
              Current as of{" "}
              {new Date().toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Terms and conditions{" "}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              By accessing our website, you are agreeing to be bound by these
              terms of service, and agree that you are responsible for
              compliance with any applicable local laws.
            </p>
          </div>
          <Content sections={sections} />
        </div>
      </Layout>
    </>
  );
};

export default TOS;
