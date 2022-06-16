import axios from "axios";

const client = axios.create({
  baseURL: "https://z8a0f6a31-zdd2ce048-gtw.z2f1dc6a0.prm.sh/api",
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