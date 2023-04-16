import React from 'react'
import { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { addNewPost} from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'

const AddPostForm = () => {
    const dispatch=useDispatch()
    const [title,setTitle]=useState('')
    const [content,setPostContent]=useState('')
    const users=useSelector(selectAllUsers)
    const [userId,setUserId]=useState('')

    
    const onContentChange=e=>setPostContent(e.target.value)
    const onTitleChange=e=>setTitle(e.target.value)
    const onAuthorChanged=e=>setUserId(e.target.value)

    const [addRequestStatus,setAddRequestStatus]=useState("idle")
    const isSave=[title,content,userId].every(Boolean)&& addRequestStatus==="idle"
    const handleSubmit=()=>{
        if(isSave){
            try {
                setAddRequestStatus('pending')
                dispatch(addNewPost({title,body:content,userId})).unwrap()

                setTitle('')
                setPostContent('')
                setUserId('')
            } catch (error) { 
                console.error("Failed to save the post",error)
            }finally{
                setAddRequestStatus("idle")
            }
        }
    }
   
    const userOptions=users.map(user=>(
        <option key={user.id} value={user.id}>
            {user.name} 
        </option>
    ))
  return (
    <section>
        <h2>Add a New Post</h2>
        <form onSubmit={(e)=>e.preventDefault()}>
            <label htmlFor='postTitle'>Post Title</label>
            <input type='text' id='postTitle'
            name='postTitle'
            value={title}
            onChange={onTitleChange}/>
            <label htmlFor='postAuthor'>Author :</label>
            <select id='postAuthor' value={userId} onChange={onAuthorChanged}>
                <option value=""></option>
                {userOptions}
            </select>
            <label htmlFor='content'>Content:</label>
            <textarea id='content'
            name='content'
            value={content}
            onChange={onContentChange}/>
            <button disabled={!isSave?true:false} onClick={handleSubmit}>Add post</button>
        </form>

    </section>
  )
}

export default AddPostForm