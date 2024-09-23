import { AttributeType, Table } from "aws-cdk-lib/aws-dynamodb";
import { Code, Function, IFunction, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import cdk = require('aws-cdk-lib');

export interface HitCounterProps {
  /** the function for which we want to count url hits **/
  downstream: IFunction;
}

export class HitCounter extends Construct {
  /** allows accessing the counter function */
  public readonly handler: Function;

  constructor(scope: Construct, id: string, props: HitCounterProps) {
    super(scope, id);

    const table = new Table(this, "Hits", {
      partitionKey: { name: "path", type: AttributeType.STRING },
    });

    this.handler = new Function(this, "HitCounterHandler", {
      runtime: Runtime.NODEJS_18_X,
      handler: "hitcounter.handler",
      code: Code.fromAsset("lib/lambda"),
      environment: {
        DOWNSTREAM_FUNCTION_NAME: props.downstream.functionName,
        HITS_TABLE_NAME: table.tableName,
      },
      timeout: cdk.Duration.seconds(100),
    });

    // grant the lambda role read/write permissions to our table
    table.grantReadWriteData(this.handler);

    // grant the lambda role invoke permissions to the downstream function
    props.downstream.grantInvoke(this.handler);
  }
}