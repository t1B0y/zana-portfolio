import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const ImagesWindow = (props) => {
  const { id } = props;
  const [links, setLinks] = useState({
    frontImage: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
  });
  const currentProject = useSelector((state) => state.upload);
  useEffect(() => {
    console.log("fetch");
    fetch(`http://localhost:3000/${currentProject.projectId}/image`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let newLinks = {};
        data.forEach((r, i) => {
          newLinks[r.name] = r.url;
        });
        console.log(newLinks);
        setLinks(newLinks);
      });
  }, [currentProject]);

  return (
    <section className="image-window">
      <div className="image-container">
        <p>front Image</p>
        <img src={links.frontImage} />
      </div>
      <div className="image-container">
        <p>image 1</p>
        <img src={links.image1} />
      </div>
      <div className="image-container">
        <p>image 2</p>
        <img src={links.image2} />
      </div>
      <div className="image-container">
        <p>image 3</p>
        <img src={links.image3} />
      </div>
      <div className="image-container">
        <p>image 4</p>
        <img src={links.image4} />
      </div>
    </section>
  );
};

export default ImagesWindow;
