import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";
import express, { Express } from "express";

import serverConfig from "./config/server.config";
import submissionqueueProducer from "./producers/submissionqueue.producer";
import sampleQueue from "./queues/sample.queue";
import submissionQueue from "./queues/submission.queue";
import apiRouter from "./routes";
import { SUBMISSION_QUEUE } from "./utils/constants";
import SampleWorker from "./workers/sample.workers";
import SubmissionWorker from "./workers/submission.workers";
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.text());

app.use("/api", apiRouter);

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/ui");

createBullBoard({
  queues: [new BullMQAdapter(sampleQueue), new BullMQAdapter(submissionQueue)],
  serverAdapter,
});

// Use middleware to mount Bull Board UI
app.use("/ui", serverAdapter.getRouter());

app.listen(serverConfig.PORT, () => {
  console.log(`Server started at *:${serverConfig.PORT}`);

  SampleWorker("SampleQueue");
  SubmissionWorker(SUBMISSION_QUEUE);
  const userCode = `
  
  class Solution {
    public:
    vector<int> permute() {
        vector<int> v;
        v.push_back(10);
        return v;
    }
  };
`;

  const code = `
#include<iostream>
#include<vector>
#include<stdio.h>
using namespace std;

${userCode}

int main() {

  Solution s;
  vector<int> result = s.permute();
  for(int x : result) {
    cout<<x<<" ";
  }
  cout<<endl;
  return 0;
}
`;

  const inputCase = `10
`;

  submissionqueueProducer({
    "1234": {
      language: "CPP",
      inputCase,
      code,
    },
  });
});
