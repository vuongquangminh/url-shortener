import { Worker } from "bullmq";

import { UrlRepository } from "../modules/urls/url.repository.js";
import { UrlClickRepository } from "../modules/urls/url-click.repository.js";

const urlRepository = new UrlRepository();
const urlClickRepository = new UrlClickRepository();

const worker = new Worker(
  "click-tracking",

  async (job) => {
    const {  ipAddress, userAgent, referer, shortCode } = job.data;
    console.log(`Job ${job.id} is active`);
    const urlData = await urlRepository.findByShortCode(shortCode);
    const data = {
      urlId: urlData.id,
      ipAddress,
      userAgent,
      referer,
    };
    // insert analytics
    await urlClickRepository.create(data);

    await urlRepository.incrementClickCount(shortCode);

    console.log("Click tracked");
  },

  {
    connection: {
      host: "localhost",
      port: 6379,
    },
  }
);

worker.on("completed", () => {
  console.log("Job completed");
});

worker.on("failed", (job, err) => {
  console.error("Job failed", err);
});
