import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const filesUpload = (props) => {
  const projects = useSelector((state) => state.projects.projects);
  const [formState, setFormState] = useState({
    title: projects[0],
    image: "front-image",
    file: null,
  });

  const titles = projects.map((p, i) => {
    if (i === 0)
      return (
        <option key={i + p.title} selected value={p.title}>
          {p.title}
        </option>
      );
    else
      return (
        <option key={i + p.title} value={p.title}>
          {p.title}
        </option>
      );
  });

  const sendFile = (data) => {
    const formData = new FormData();
    formData.append(`${data.tite}/${data.image}`, data.file);
    console.log(formData);
    fetch(
      `http://localhost:3000/project/file?title=${data.title}&image=${data.image}`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      }
    )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <select
        key="select1"
        onChange={(e) => setFormState({ ...formState, title: e.target.value })}
        class="form-select"
        aria-label="Default select example"
      >
        {titles}
      </select>
      <select
        key="select2"
        onChange={(e) => setFormState({ ...formState, image: e.target.value })}
        class="form-select"
        aria-label="Default select example"
      >
        <option key="frontImage" selected value="front-image">
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
          onChange={(e) =>
            setFormState({ ...formState, file: e.target.files[0] })
          }
          type="file"
          class="form-control"
          id="input-file"
        />
      </div>
      <button
        onClick={() => sendFile(formState)}
        type="button"
        class="btn btn-primary"
      >
        send file
      </button>
    </div>
  );
};

export default filesUpload;
