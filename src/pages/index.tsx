import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Button from "~/Components/Buttons/Button";
import { Navbar, Sidebar, Layout } from "~/Components/Components";

import { api } from "~/utils/api";

export default function Home() {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>VidChill</title>
        <meta name="description" content="Video Streaming At VidChill" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Navbar /> */}
      {/* <Sidebar /> */}
      <Layout>
        <p>This is form home page</p>
      </Layout>
      <h1>Hello world</h1>
    </>
  );
}
