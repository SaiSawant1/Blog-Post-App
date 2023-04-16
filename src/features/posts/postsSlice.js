import {
  createSlice,
  nanoid,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POSTS_URL);
  return response.data;
});

export const addNewPost=createAsyncThunk("posts/addNewPost",async(initialPost)=>{
  try{
    const response =await axios.post(POSTS_URL,initialPost);
    return response.data;
  }catch(err){
    return err.message; 
  }
})
export const deletePost=createAsyncThunk("posts/deletePost",async(intitialPost)=>{
  const {id}=intitialPost
  try {
    const res=await axios.delete(`${POSTS_URL}/${id}`)
    if(res?.status===200)return intitialPost;
    return `${res?.status}:${res?.statusText}`
  } catch (error) {
    return error.message
  }

})

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postsAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, body, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            body,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffe: 0,
            }, 
          },
        };
      },
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const exisitingPost = state.posts.find((post) => post.id === postId);
      if (exisitingPost) {
        exisitingPost.reactions[reaction]++;
      }
    },
    updatePost(state,action){
      const {id,body,reactions,userId,title}=action.payload;
      const exisitingPost=state.posts.find((post)=>post.id===id);
      if(exisitingPost){
        exisitingPost.title=title
        exisitingPost.body=body
        exisitingPost.reactions=reactions
        exisitingPost.userId=userId
        exisitingPost.date=new Date().toISOString();
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        let min = 1;
        const loadedPosts = action.payload.map(post => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffe: 0,
          };
          return post;
        });
        state.posts=state.posts.concat(loadedPosts)
      })
      .addCase(fetchPosts.rejected,(state,action)=>{
        state.status="failed"
        state.error=action.error.message
      })
      .addCase(addNewPost.fulfilled,(state,action)=>{
         action.payload.userId=Number(action.payload.userId)
         action.payload.date=new Date().toISOString()
         action.payload.reactions={
          thumbsUp:0,
          wow:0,
          heart:0,
          rocket:0,
          coffe:0,
         }
         console.log(action.payload)
         state.posts.push(action.payload)
      })
      .addCase(deletePost.fulfilled,(state,action)=>{
        if(!action.payload?.id){
          console.log("delete could not complete")
          console.log(action.payload)
          return 
        }
        const {id} =action.payload;
        state.posts=state.posts.filter(post=>post.id!==id);
      })
  },
});
export const selectAllPosts = (state) => state.posts.posts;


export const getPostsStatus=(state)=>state.posts.status;
export const getPostsError=(state)=>state.posts.erro;

export const selectPostById = (state, postId) =>state.posts.posts.find(post => post.id === postId);

export const { postsAdded, reactionAdded,updatePost } = postsSlice.actions;


export default postsSlice.reducer;
