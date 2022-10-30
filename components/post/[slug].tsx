import Header from "../Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";
import { GetStaticProps } from "next";


interface Props{
    post:Post;
}

function Post({post}:Props) {
  return (
    <main>
      <Header />{" "}
    </main>
  );
}

export default Post;

export const getStaticPaths = async () => {
  const query = `  *[_type == "post"]{
        _id,
        slug{
        current
      }
        
      }`;
  const posts = await sanityClient.fetch(query);
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps:GetStaticProps =async ({params}) => {
    const query =`*[_type == "post" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        author->{
        name,
        image
      },
    description,
    mainImage,
    slug,
    body 
      }`
    const posts = await sanityClient.fetch(query,{
        slug:params?.slug
    });
    if(!posts){
        return {
            notFound:true
        }
    }
    return {
        props:{
            posts,
        }
    }
}
