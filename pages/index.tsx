import React from "react";
import Layout from "../components/Layout";
import { PostProps } from "../components/Post";
import Link from "next/link";

type Props = {
  feed: PostProps[];
};

const Home: React.FC<Props> = () => {
  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          <Link href={"/p"}>feed page</Link>
        </main>
      </div>
    </Layout>
  );
};

export default Home;
