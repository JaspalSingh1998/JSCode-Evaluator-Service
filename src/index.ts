import express, { Express } from "express";

import serverConfig from "./config/server.config";
import sampleQueueProducer from "./producers/samplequeue.producer";
import apiRouter from "./routes";
import SampleWorker from "./workers/sample.workers";


const app: Express = express();

app.use('/api', apiRouter);

app.listen(serverConfig.PORT, () => {
  console.log(`Server started at *:${serverConfig.PORT}`);

  SampleWorker('SampleQueue');

  sampleQueueProducer('SampleJob', {
    name: "Goldy",
    company: "40Bears",
    position: "SDE",
    locatiion: "Remote | Pune | Toronto"
  });
});