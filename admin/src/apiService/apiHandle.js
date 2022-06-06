import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3400/api/",
});

const createProject = async (data) => {
    console.log(data);
  await client
    .post("/createProject", data)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

const projectAPIHandler = {
    createProject: createProject
}

export default projectAPIHandler;