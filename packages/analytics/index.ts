require("dotenv").config({ path: require("find-config")(".env") });
import cluster from "cluster";
import controller from "./lib/Analytics/controller";
import worker from "./lib/Analytics/worker";


async function main() {
  if (cluster.isMaster) {
    controller();
  } else {
    worker();
  }
}

main();
