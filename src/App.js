import PostsLists from "./features/posts/PostsLists";
import SinglePostPage from "./features/posts/SinglePostPage";
import Layout from "./components/Layout";
import EditPost from "./features/posts/EditPost";
import AddPostForm from "./features/posts/AddPostForm";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsLists />} />
        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPost/>}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
