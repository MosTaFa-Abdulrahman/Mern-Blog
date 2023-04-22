import "./post.css";
import { NavLink } from "react-router-dom";
import { format } from "timeago.js";

function Post({ post }) {
  // const PF = "http://localhost:5000/images/";
  return (
    <div className="post">
      <img src={post.photo} alt="" className="postImage" />

      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c) => (
            <span className="postCat">{c.name}</span>
          ))}
        </div>
        <span className="postTitle">{post.title}</span>
        <hr />
        <span className="postDate">{format(post.createdAt)}</span>
      </div>
      <NavLink to={`/single/${post._id}`} className="link">
        <p className="postDesc">{post.desc}</p>
      </NavLink>
    </div>
  );
}

export default Post;
