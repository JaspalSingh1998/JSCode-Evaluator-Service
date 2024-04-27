import {createBullBoard} from '@bull-board/api';
import {BullMQAdapter} from '@bull-board/api/bullMQAdapter';
import {ExpressAdapter} from '@bull-board/express';
import express, { Express } from "express";

import serverConfig from "./config/server.config";
import sampleQueueProducer from "./producers/samplequeue.producer";
import sampleQueue from './queues/sample.queue';
import apiRouter from "./routes";
import SampleWorker from "./workers/sample.workers";
const app: Express = express();

app.use('/api', apiRouter);

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/ui');

createBullBoard({
    queues: [new BullMQAdapter(sampleQueue)],
    serverAdapter,
  });

// Use middleware to mount Bull Board UI
app.use('/ui', serverAdapter.getRouter());

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