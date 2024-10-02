import React, { useEffect, useState } from 'react'
import ContentCard from '../Common/content/ContentCard'
import { getPosts } from '../../Api/User'
import { toast } from 'react-toastify'
// import '../Socialmedia/Content.css'
import { postdetails } from '../../Interface/DatatypeInterface'


interface ContentProps {
  posts: postdetails[];
  fetchData: () => Promise<void>;
  fetchNotFollowData: (userId: string) => void;
}

const Content: React.FC<ContentProps> = ({ posts, fetchData,fetchNotFollowData }) => {

  
  return (
<div className=" md:p-5 sm:w-3/5  ">

<div className="bg-contentgray md:rounded-lg p-4 md:p-5 flex flex-col items-center gap-5 shadow-md overflow-y-auto h-[93vh] scrollbar-hidden ">
 
      {
        posts.map((post)=>(
     
   <ContentCard key={post.id} post={post} fetchData={fetchData} fetchNotFollowData={fetchNotFollowData} 
   />
        ))
      }
      </div>
    </div>
  )
}

export default Content
