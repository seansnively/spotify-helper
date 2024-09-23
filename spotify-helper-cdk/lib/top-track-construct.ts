import { Code, Function, IFunction, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import cdk = require('aws-cdk-lib');

export interface TopTracksProps {
  /** the function for which we want to count url hits **/
  downstream: IFunction;
}

export class TopTracks extends Construct {
  /** allows accessing the counter function */
  public readonly handler: Function;

  constructor(scope: Construct, id: string, props: TopTracksProps) {
    super(scope, id);

    this.handler = new Function(this, "TopTracksHandler", {
      runtime: Runtime.NODEJS_LATEST,
      handler: "toptracks.handler",
      code: Code.fromAsset("lib/lambda"),
      environment: {
        DOWNSTREAM_FUNCTION_NAME: props.downstream.functionName
      },
      timeout: cdk.Duration.seconds(100),
    });

    // grant the lambda role invoke permissions to the downstream function
    props.downstream.grantInvoke(this.handler);
  }
}