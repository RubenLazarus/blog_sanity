import {
 createCurrentUserHook,
 createClient
} from 'next-sanity'
import createImageUrlBuilder from '@sanity/image-url'
export const config={
    dataset:process.env.NEXT_PUBLIC_SANITY_DATASET||"production",
    projectId:process.env.NEXT_PUBLIC_SANITY_PROJECTID,
    apiVersion:"2022-10-29",


    useCdn:process.env.NODE_ENV=="produciton"
}
export const sanityClient =createClient(config);

export const urlFor = (source)=> createImageUrlBuilder(config).image(source)