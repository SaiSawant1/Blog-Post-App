import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { selectAllPosts,getPostsStatus,getPostsError,fetchPosts } from './postsSlice'
import PostsExcerpt from './PostsExcerpt'
import { useEffect } from 'react'
const PostsLists = () => {
    const dispatch=useDispatch();
    const posts=useSelector(selectAllPosts)
    const postsStatus=useSelector(getPostsStatus)
    const postsError=useSelector(getPostsError)
    
    

    useEffect(()=>{
        if(postsStatus==="idle"){
            dispatch(fetchPosts())
        }
    },[postsStatus,dispatch])

   
    
    let content;
    if(postsStatus==="loading"){
        content=<p>loading...</p>
    }else if(postsStatus==="succeeded"){
        const orderedPosts=posts.slice().sort((a,b)=>b.date.localeCompare(a.date))
        return content=orderedPosts.map(post=><PostsExcerpt key={post.id} post={post}/>)
    }else if(postsStatus==="failed"){
        content=<p>{postsError}</p>
    }
  return (
    <section>
        {content}
    </section>
  )
}

export default PostsLists