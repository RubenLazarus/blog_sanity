import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import Homes from "../components/Homes";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";

interface Props {
  posts: Post[];
}
const Home = ({ posts }: Props) => {
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Robss Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Homes />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
        {posts.map((post) => {
          return (
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              <div className="border rounded-lg group cursor-pointer overflow-hidden">
                <img className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out" src={urlFor(post.mainImage).url()!} alt="" />
                <div className="flex justify-between p-5 bg-white">
                  <div >
                    <p className="text-lg font-bold">{post.title}</p>
                    <p className="text-xs">{post.description} by {post.author.name}</p>
                  </div>
                  <img  className="h-12 w-12 rounded-full" src={urlFor(post.author.image).url()!} alt=""/>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    slug,
    title,
    description,
    author -> {
    name,
    image
  },
mainImage
    
  }`;
  const posts = await sanityClient.fetch(query);
  return {
    props: {
      posts,
    },
  };
};

export default Home;
