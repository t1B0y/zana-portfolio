import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ImagesWindow from "./ImagesWindow.jsx";
import { setTitle, setImageName } from "../redux/uploadReducer.js";

const filesUpload = (props) => {
  const projects = useSelector((state) => state.projects.projects);
  const form = useSelector((state) => state.upload);
  const [file, setFile] = useState();

  const titles = projects.map((p, i) => {
    if (i === 0)
      return (
        <option key={i + p.title} selected value={i}>
          {p.title}
        </option>
      );
    else
      return (
        <option key={i + p.title} value={i}>
          {p.title}
        </option>
      );
  });

  const sendFile = (data) => {
    const formData = new FormData();
    formData.append(`file`, file);

    fetch(
      `http://localhost:3000/project/file?title=${form.title}&&image=${form.imageName}&&projectId=${form.projectId}`,
      {
        method: "POST",
        mode: "cors",
        body: formData,
      }
    )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setTitle("test"));
  };

  return (
    <div className="upload-container">
      <ImagesWindow id={form.projectId} title={form.title} />
      <select
        key="select1"
        class="form-select"
        aria-label="Default select example"
        onChange={(e) =>
          dispatch(
            setTitle({
              id: projects[e.target.value].id,
              title: projects[e.target.value].title,
            })
          )
        }
      >
        {titles}
      </select>
      <select
        key="select2"
        onChange={(e) => dispatch(setImageName(e.target.value))}
        class="form-select"
        aria-label="Default select example"
      >
        <option key="frontImage" selected value="frontImage">
          front image
        </option>
        <option key="image1" value="image1">
          first image
        </option>
        <option key="image2" value="image2">
          second image
        </option>
        <option key="image3" value="image3">
          third image
        </option>
        <option key="image4" value="image4">
          fourth image
        </option>
      </select>
      <div class="input-group mb-3">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          class="form-control"
          id="input-file"
        />
      </div>
      <button
        onClick={() => sendFile(form)}
        type="button"
        class="btn btn-primary"
      >
        send file
      </button>
    </div>
  );
};

export default filesUpload;
