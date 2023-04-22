import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { publicRequest } from "../../requestMethod";
import { logOut } from "../../redux/userSlice";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { updateUserrr } from "../../redux/apiCalls";
import { useLocation } from "react-router-dom";

function Settings() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [succes, setSucces] = useState(false);
  const [file, setFile] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const hadnleUpdate = async (e) => {
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
            username,
            email,
            password,
            userId: currentUser._id,
            profilePicture: downloadURL,
          });
          const updateUser = {
            username,
            email,
            password,
            userId: currentUser._id,
            profilePicture: downloadURL,
          };
          updateUserrr(dispatch, path, updateUser);
          dispatch(logOut());
        });
      }
    );
  };

  const handleDelete = async () => {
    try {
      await publicRequest.delete(`user/delete/${currentUser._id}`, {
        data: { userId: currentUser._id, username },
      });
      dispatch(logOut());
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="title">
          <span className="update">Update Account</span>
          <i className="delete fa-solid fa-trash" onClick={handleDelete}></i>
        </div>

        <form className="sForm" onSubmit={hadnleUpdate}>
          <label>Profile Picture</label>
          <div className="sPP">
            {file && (
              <img src={URL.createObjectURL(file)} alt="" className="sImage" />
            )}

            <label htmlFor="fileInput">
              <i className="userIcon fa-solid fa-user-plus"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username:</label>
          <input
            type="text"
            placeholder={currentUser.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email:</label>
          <input
            type="email"
            placeholder={currentUser.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password:</label>
          <input
            type="password"
            placeholder="Password.."
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="sSubmit" type="submit">
            Update
          </button>
          {/* {succes && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been Updated ☻♥
            </span>
          )} */}
        </form>
      </div>

      <Sidebar />
    </div>
  );
}

export default Settings;
