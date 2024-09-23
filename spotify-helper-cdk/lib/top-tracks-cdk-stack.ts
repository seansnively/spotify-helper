import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import { HitCounter } from "./hitcounter-construct";
import { TopTracks } from './top-track-construct';

export class TopTracksCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define the Lambda function resource
    const trackInsightsFunction = new lambda.Function(this, "TrackInsightsFunction", {
      runtime: lambda.Runtime.NODEJS_LATEST, // Provide any supported Node.js runtime
      handler: "trackinsights.handler",
      code: lambda.Code.fromAsset("lib/lambda"),
      timeout: cdk.Duration.seconds(100)
    });

    const topTracksConstruct = new TopTracks(this, "TopTracks", {
        downstream: trackInsightsFunction
    });

    const topTracksWithCounter = new HitCounter(this, "HitCounter", {
      downstream: topTracksConstruct.handler
    });

    // defines an API Gateway REST API resource backed by our "toptracks" function.
    const gateway = new LambdaRestApi(this, "Endpoint", {
      handler: topTracksWithCounter.handler,
    });

  }
}
