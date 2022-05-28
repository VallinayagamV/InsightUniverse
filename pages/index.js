import Head from 'next/head';
import Image from 'next/image';
import { PostCard, Categories, PostWidget } from '../components';
import { getPosts } from '../services';
import { FeaturedPosts } from '../sections/index';
import React, { useState, useRef, useCallback } from 'react'


export default function Home({ posts }) {

  var postsAll = posts.edges;
  return (
    <div className='container mx-auto px-10 mb-8'>
      <Head>
        <title>Insight Universe</title> 
        <meta name="description" content="Insight Universe" />
        <link rel="icon" href="/image/favicon.ico" />
      </Head>
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {postsAll.map((post, index) => (
            <PostCard post={post.node} key={post.title} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>


    </div>
  )
}

export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  return {
    props: { posts },
    revalidate: 10
  };
}