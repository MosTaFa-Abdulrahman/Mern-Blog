import "./write.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addPost } from "../../redux/apiCalls";

function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", {
            username: currentUser.username,
            title,
            desc,
            photo: downloadURL,
            categories: cat,
          });
          const newPost = {
            username: currentUser.username,
            title,
            desc,
            photo: downloadURL,
            categories: cat,
          };
          addPost(dispatch, newPost);
          window.location.replace("/");
        });
      }
    );
  };

  return (
    <div className="write">
      {file && (
        <img src={URL.createObjectURL(file)} alt="" className="writeImage" />
      )}

      <form className="writeForm" onSubmit={handleClick}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title.. "
            autoFocus={true}
            className="writeInput"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="music,sport,fashion"
            className="writeInput"
            onChange={(e) => setCat(e.target.value.split(","))}
          />
        </div>

        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story ☻"
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <div style={{ textAlign: "center" }}>
          <button className="publish" type="submit">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}

export default Write;
