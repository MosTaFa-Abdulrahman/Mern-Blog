import "./singlePost.css";
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { publicRequest } from "../../requestMethod";
import { format } from "timeago.js";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePostFauilure,
  deletePostStart,
  deletePostSuccess,
  updatePostFauilure,
  updatePostStart,
  updatePostSuccess,
} from "../../redux/postSlice";

function SinglePost() {
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await publicRequest.get(`post/get/${path}`);
        setPost(res.data);
        setTitle(res.data.title);
        setDesc(res.data.desc);
      } catch (error) {
        console.log(error.message);
        alert(error.message);
      }
    };
    getPost();
  }, [path]);

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(deletePostStart());
    try {
      const res = await publicRequest.delete(`post/delete/${post._id}`, {
        data: { username: currentUser.username },
      });
      dispatch(deletePostSuccess(res.data));
      window.location.replace("/");
    } catch (err) {
      dispatch(deletePostFauilure());
      console.log(err.message);
      window.location.replace("/");
    }
  };

  const handleUpdate = async () => {
    dispatch(updatePostStart());
    try {
      const res = await publicRequest.put(`post/update/${post._id}`, {
        username: currentUser.username,
        title,
        desc,
      });
      dispatch(updatePostSuccess(res.data));
      setUpdateMode(false);
    } catch (err) {
      dispatch(updatePostFauilure());
      console.log(err.message);
      window.location.reload();
    }
  };

  return (
    <div className="singlePost">
      <div className="Wrraper">
        <img src={post.photo} alt="" className="spImage" />

        {updateMode ? (
          <input
            type="text"
            value={title}
            className="spTitleInput"
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <>
            <h1 className="spTitle">{title}</h1>
            {post.username === currentUser.username && (
              <div className="spIcons">
                <i
                  className="spEdit fa-solid fa-pen-to-square"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="spDelete fa-solid fa-trash"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </>
        )}

        <div className="spInfo">
          <span className="spAuthor">
            Author:{" "}
            <NavLink to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b>
            </NavLink>
          </span>
          <span className="spDate">{format(post.createdAt)}</span>
        </div>

        {updateMode ? (
          <textarea
            value={desc}
            className="spDescInput"
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="spDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="spButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}

export default SinglePost;
