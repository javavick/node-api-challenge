import React, { useState, useEffect } from "react";
import axios from "axios";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/projects")
      .then((res) => {
        console.log(res);
        setProjects(res.data);
        console.log(projects);
      })
      .catch((err) => console.log(err));
  }, []);

  return <h1>TESTING</h1>;
};

export default ProjectList;
