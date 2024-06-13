import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines";
import { PipelineAppStage } from "./cicd-app-stack";
import { ManualApprovalStep } from "aws-cdk-lib/pipelines";

export class DemoCicdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const democicd = new CodePipeline(this, "cicdlogicalid13062024", {
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub("OGLernings/repo13062024", "main"),
        commands: ["npm ci", "npm run build", "npx cdk synth"],
      }),
    });
    const devStage = democicd.addStage(
      new PipelineAppStage(this, "dev", {
        env: { account: "862165548342", region: "us-east-1" },
      })
    );
    devStage.addPost(
      new ManualApprovalStep("Manual Approval before production")
    );

    const prodStage = democicd.addStage(
      new PipelineAppStage(this, "prod", {
        env: { account: "862165548342", region: "us-east-1" },
      })
    );
  }
}
