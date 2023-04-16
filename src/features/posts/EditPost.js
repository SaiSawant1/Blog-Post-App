import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { deletePost, selectPostById,updatePost } from './postsSlice'
import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {selectAllUsers} from "../users/usersSlice.js"
const EditPost = () => {
    const {postId}=useParams();
    const navigate=useNavigate();

    const post=useSelector((state)=>selectPostById(state,Number(postId)))
    const users=useSelector(selectAllUsers)
    
    const [title,setTitle]=useState(post?.title)
    const [content,setContent]=useState(post?.body)
    const [userId,setUserId]=useState(post?.userId)
    const [requestStatus,setRequestStatus]=useState("idle")

    const dispatch=useDispatch()
    
    if(!post){
        return (
            <section>
                <h2> Post Not Found</h2>
            </section>
        )
    }

    const onTitleChanged=e=>setTitle(e.target.value)
    const onContentChanged=e=>setContent(e.target.value)
    const onAuthorChnaged=e=>setUserId(Number(e.target.value))
    const cansave=[title,content,userId].every(Boolean)&&requestStatus==="idle"

    const onSavePostClicked=()=>{
        if(cansave){
            try {
                setRequestStatus("pending")
                dispatch(updatePost({id:post.id,title,body:content,userId,reactions:post.reactions}))

                setTitle("")
                setContent("")
                setUserId("")
                navigate(`/post/${postId}`)
            } catch (error) {
                console.error("failed to update",error)                
            }finally{
                setRequestStatus("idle")
            }
        }
    }
    const onDeletePostClicked=()=>{
        try{
            setRequestStatus('pending')
            dispatch(deletePost({id:post.id})).unwrap()
            setTitle('')
            setContent('')
            setUserId('')
            navigate('/')
        }catch(error){
            console.error(error)
        }finally{
            setRequestStatus("idle")
        }
    }

    const usersOption=users.map((user)=>(
        <option key={user.id}
        value={user.id}>
            {user.name}
        </option>
    ))

  return (
    <section>
        <h2>
            Edit Post
        </h2>
        <form>
            <label htmlFor='postTitle'>Post Tittl</label>
            <input
            type='text'
            id='postTitle'
            name="postTitle"
            value={title}
            onChange={onTitleChanged}/>
            <label htmlFor='postAuthor'>Author:</label>
            <select id='postAuthor' defaultValue={userId} onChange={onAuthorChnaged}>
                <option value=""></option>
                {usersOption}
            </select>
            <label htmlFor='postContent'>Content:</label>
            <textarea
            id='postContent'
            name='postContent'
            value={content}
            onChange={onContentChanged}
            />
            <button
            type='button'
            onClick={onSavePostClicked}
            disabled={!cansave}>Save Post</button>
            <button
            className='deleteButton'
            type='button'
            onClick={onDeletePostClicked}
            >Delete Post</button>
        </form>
    </section>
  )
}

export default EditPost