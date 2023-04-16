import { useDispatch } from "react-redux";
import { reactionAdded } from "./postsSlice";

const reactionEmoji={
    thumbsUp:"👍",
    wow:"😲",
    heart:"❤️",
    rocket:"🚀",
    coffe:"☕"
}

const ReactionsButtons = ({post}) => {
    const dispatch=useDispatch()

    const handleClick=(post,name)=>{
        return dispatch(reactionAdded({postId:post.id,reaction:name}))
    }
    const reactionButton =Object.entries(reactionEmoji).map(([name,emoji])=>{
        return (
            <button
                key={name}
                type="button"
                className="reactionButton"
                onClick={()=>handleClick(post,name)}
        
            >
                {emoji} {post.reactions[name]}
            </button>
        )
    })

    return (<div>{reactionButton}</div>)
}

export default ReactionsButtons