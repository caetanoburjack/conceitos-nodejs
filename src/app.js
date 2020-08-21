const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {// THIS ROUTE WILL BRING ALL THE REPOSITORIES
  //const { title, url, techs, likes } = request.query;

  return response.json(repositories);
});

app.post("/repositories", (request, response) => {// THIS ROUTE WILL BE RESPONSIBLE TO CREATE A NEW REPOSITORY

  const { title, url, techs, likes } = request.body;

  /*  const repository = {
     id: uuid(),
     title: 'Desafio 02 - Node.js',
     url: 'http://github.com/caetanoburjack/caetanoburjack',
     techs: ["Node.js", "Express", "uuid"],
     likes: 0
   } */


  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }



  repositories.push(repository);

  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {// THIS ROUTE WILL BE RESPONSIBLE TO UPDATE AN EXISTING REPOSITORY
  const { id } = request.params;


  const repoIndex = repositories.findIndex(repo => repo.id == id);

  if (repoIndex < 0) {
    return response.status(400).json({ error: "Project not Found!" });
  }

  //const { likes } = repositories.find(thisRepo => thisRepo.id == id);

  const { title, url, techs } = request.body;

  const repo = {
    id, 
    title, 
    url, 
    techs, 
    likes:repositories[repoIndex].likes,
  }

  repositories[repoIndex] = repo;

  return response.json(repo);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex(repo => repo.id == id);

  if (repoIndex < 0) {
    return response.status(400).json({ error: "Project not Found!" });
  }

  repositories.splice(repoIndex, 1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex(repo => repo.id == id);

  if (repoIndex < 0) {
    return response.status(400).json({ error: "Project not Found!" });
  }

  repositories[repoIndex].likes += 1;

  return response.json(repositories[repoIndex]);


});

module.exports = app;
