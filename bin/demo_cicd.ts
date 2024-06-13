#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { DemoCicdStack } from "../lib/demo_cicd-stack";

const app = new cdk.App();
new DemoCicdStack(app, "DemoCicdStack", {
  env: { account: "862165548342", region: "us-east-1" },
});
