import { Construct } from "constructs";
import { App, TerraformStack, Token, Fn } from "cdktf";
import { AwsProvider } from "@cdktf/provider-aws/lib/provider"
import { EcrRepository } from "@cdktf/provider-aws/lib/ecr-repository"
import { EcsCluster } from "@cdktf/provider-aws/lib/ecs-cluster";
import { EcsTaskDefinition } from "@cdktf/provider-aws/lib/ecs-task-definition";
import { IamRole } from "@cdktf/provider-aws/lib/iam-role";
import { DataAwsIamPolicyDocument } from "@cdktf/provider-aws/lib/data-aws-iam-policy-document";
import { IamRolePolicyAttachment } from "@cdktf/provider-aws/lib/iam-role-policy-attachment";
import { IamPolicy } from "@cdktf/provider-aws/lib/iam-policy";
import { Lb } from "@cdktf/provider-aws/lib/lb";
import { SecurityGroup } from "@cdktf/provider-aws/lib/security-group";
import { EcsService } from "@cdktf/provider-aws/lib/ecs-service";
import { DefaultVpc } from "@cdktf/provider-aws/lib/default-vpc";
import { LbTargetGroup } from "@cdktf/provider-aws/lib/lb-target-group";
import { LbListener } from "@cdktf/provider-aws/lib/lb-listener";
import { ApiGatewayRestApi } from "@cdktf/provider-aws/lib/api-gateway-rest-api";
import { ApiGatewayResource } from "@cdktf/provider-aws/lib/api-gateway-resource";
import { ApiGatewayMethod } from "@cdktf/provider-aws/lib/api-gateway-method";
import { ApiGatewayIntegration } from "@cdktf/provider-aws/lib/api-gateway-integration";
import { ApiGatewayVpcLink } from "@cdktf/provider-aws/lib/api-gateway-vpc-link";
import { ApiGatewayDeployment } from "@cdktf/provider-aws/lib/api-gateway-deployment";
import { ApiGatewayStage } from "@cdktf/provider-aws/lib/api-gateway-stage";
import config from '../src/config/Index'

class MyStack extends TerraformStack {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        new AwsProvider(this, `${config.terraform}_aws`, {
            region: "ap-south-1",
            accessKey: "AKIAYPBV5L2QCA3JKZ3S",
            secretKey: "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"
        });

        const ecrRepository = new EcrRepository(this, `${config.terraform}_EcrRepository`, {
            imageScanningConfiguration: {
                scanOnPush: true,
            },
            imageTagMutability: "MUTABLE",
            name: `${config.terraform}`,
        });

        const ecsCluster = new EcsCluster(this, `${config.terraform}_EcsCluster`, {
            name: `${config.terraform}`,
            setting: [
                {
                    name: "containerInsights",
                    value: "enabled",
                }
            ]
        });

        const assumeRole = new DataAwsIamPolicyDocument(this, `${config.terraform}_policy`, {
            statement: [{
                actions: ["sts:AssumeRole"],
                effect: "Allow",
                principals: [
                    {
                        identifiers: ["ec2.amazonaws.com"],
                        type: "Service",
                    }
                ]
            }],
        });

        const role = new IamRole(this, `${config.terraform}_role`, {
            assumeRolePolicy: Token.asString(assumeRole.json),
            name: `${config.terraform}`,
        });

        const taskDefinition = new EcsTaskDefinition(this, `${config.terraform}_taskDefinition`, {
            family: `${config.terraform}`,
            containerDefinitions: Token.asString(
                Fn.jsonencode([{
                    name: `${config.terraform}`,
                    image: `${ecrRepository.repositoryUrl}`,
                    essential: true,
                    cpu: 10,
                    memory: 512,
                    portMappings: [{
                        containerPort: 8080,
                        hostPort: 8080,
                    }]
                }])
            ),
            requiresCompatibilities: ["FARGATE"],
            networkMode: "awsvpc",
            memory: "512",
            cpu: "256",
            executionRoleArn: role.arn
        });

        const policy = new DataAwsIamPolicyDocument(this, `${config.terraform}_policyDocument`, {
            statement: [{
                actions: ["ec2:Describe*"],
                effect: "Allow",
                resources: ["*"]
            }]
        });

        const awsIamPolicyPolicy = new IamPolicy(this, `${config.terraform}_IamPolicy`, {
            name: `${config.terraform}`,
            policy: Token.asString(policy.json)
        });

        awsIamPolicyPolicy.overrideLogicalId("policy");
        new IamRolePolicyAttachment(this, `${config.terraform}_policyAttachment`, {
            policyArn: Token.asString(awsIamPolicyPolicy.arn),
            role: role.name
        });

        const vpc = new DefaultVpc(this, `${config.terraform}_vpc`, {
            tags: {
                Name: "Default VPC"
            }
        });

        const lbSg = new SecurityGroup(this, `${config.terraform}_securityGroup`, {
            description: "Allow TLS inbound traffic",
            egress: [{
                cidrBlocks: ["0.0.0.0/0"],
                fromPort: 0,
                protocol: "-1",
                toPort: 0
            }],
            ingress: [{
                cidrBlocks: ["0.0.0.0/0"],
                fromPort: 80,
                protocol: "tcp",
                toPort: 80
            }]
        });

        const loadBalancer = new Lb(this, `${config.terraform}_loadBalancer`, {
            loadBalancerType: "application",
            name: `${config.terraform}app`,
            securityGroups: [lbSg.id],
            subnets: ["subnet-32561e5a", "subnet-2016a86c", "subnet-9d58a0e6"]
        });

        const targetGroup = new LbTargetGroup(this, `${config.terraform}_targetGroup`, {
            name: `${config.terraform}`,
            port: 80,
            protocol: "HTTP",
            targetType: "ip",
            vpcId: vpc.id
        });

        new LbListener(this, `${config.terraform}_LbListener`, {
            loadBalancerArn: loadBalancer.arn,
            port: Token.asNumber("80"),
            protocol: "HTTP",
            defaultAction: [
                {
                    targetGroupArn: Token.asString(targetGroup.arn),
                    type: "forward",
                },
            ]
        });

        new EcsService(this, `${config.terraform}_EcsService`, {
            name: `${config.terraform}`,
            cluster: ecsCluster.id,
            taskDefinition: Token.asString(taskDefinition.arn),
            desiredCount: 3,
            loadBalancer: [{
                containerName: taskDefinition.family,
                containerPort: 8080,
                targetGroupArn: Token.asString(targetGroup.arn)
            }],
            networkConfiguration: {
                securityGroups: [lbSg.id],
                subnets: ["subnet-32561e5a", "subnet-2016a86c", "subnet-9d58a0e6"]
            }
        })

        const awsLb = new Lb(this, `${config.terraform}_Lb`, {
            internal: true,
            loadBalancerType: "network",
            name: `${config.terraform}`,
            subnets: ["subnet-32561e5a", "subnet-2016a86c", "subnet-9d58a0e6"],
        })

        const apiGateway = new ApiGatewayRestApi(this, `${config.terraform}_ApiGateway`, {
            name: `${config.terraform}`,
        });

        // const awsApiGatewayResource = new ApiGatewayResource(
        //     this,
        //     `${config.terraform}_ApiGatewayResource`,
        //     {
        //         parentId: apiGateway.rootResourceId,
        //         pathPart: "/",
        //         restApiId: apiGateway.id
        //     })

        // awsApiGatewayResource.overrideLogicalId("apiGateway");
        const awsApiGatewayVpcLink = new ApiGatewayVpcLink(this, `${config.terraform}_ApiGatewayVpcLink`, {
            name: apiGateway.name,
            targetArns: [Token.asString(awsLb.arn)],
        });

        awsApiGatewayVpcLink.overrideLogicalId("apiGateway");
        const awsApiGatewayMethod = new ApiGatewayMethod(this, `${config.terraform}_ApiGatewayMethod`, {
            authorization: "NONE",
            httpMethod: "GET",
            requestModels: {
                "application/json": "Error",
            },
            resourceId: apiGateway.rootResourceId,
            restApiId: apiGateway.id,
        });

        awsApiGatewayMethod.overrideLogicalId("apiGateway");
        const awsApiGatewayIntegration = new ApiGatewayIntegration(
            this,
            `${config.terraform}_ApiGatewayIntegration`,
            {
                connectionId: Token.asString(awsApiGatewayVpcLink.id),
                connectionType: "VPC_LINK",
                contentHandling: "CONVERT_TO_TEXT",
                httpMethod: Token.asString(awsApiGatewayMethod.httpMethod),
                integrationHttpMethod: "GET",
                passthroughBehavior: "WHEN_NO_MATCH",
                resourceId: apiGateway.rootResourceId,
                restApiId: apiGateway.id,
                type: "HTTP_PROXY",
                uri: `http://${awsLb.dnsName}`
            }
        );

        awsApiGatewayIntegration.overrideLogicalId("apiGateway");
        const awsApiGatewayResourceProxy = new ApiGatewayResource(
            this,
            `${config.terraform}_ChildApiGatewayResource`,
            {
                parentId: apiGateway.rootResourceId,
                pathPart: "{proxy+}",
                restApiId: apiGateway.id
            })

        awsApiGatewayResourceProxy.overrideLogicalId("awsApiGatewayMethod");
        const awsApiGatewayMethodProxy = new ApiGatewayMethod(this, `${config.terraform}_ChildApiGatewayMethod`, {
            authorization: "NONE",
            httpMethod: "ANY",
            requestModels: {
                "application/json": "Error",
            },
            resourceId: Token.asString(awsApiGatewayResourceProxy.id),
            restApiId: apiGateway.id,
        });

        awsApiGatewayMethodProxy.overrideLogicalId("awsApiGatewayMethod");
        const awsApiGatewayIntegrationProxy = new ApiGatewayIntegration(
            this,
            `${config.terraform}_ChildApiGatewayIntegration`,
            {
                connectionId: Token.asString(awsApiGatewayVpcLink.id),
                connectionType: "VPC_LINK",
                contentHandling: "CONVERT_TO_TEXT",
                httpMethod: Token.asString(awsApiGatewayMethodProxy.httpMethod),
                integrationHttpMethod: "ANY",
                passthroughBehavior: "WHEN_NO_MATCH",
                resourceId: Token.asString(awsApiGatewayResourceProxy.id),
                requestParameters: {
                    "integration.request.path.proxy": "'method.request.path.proxy'"
                },
                restApiId: apiGateway.id,
                type: "HTTP_PROXY",
                uri: `http://${awsLb.dnsName}/{proxy}`
            }
        );

        awsApiGatewayIntegrationProxy.overrideLogicalId("awsApiGatewayMethod");
        const awsApiGatewayDeployment = new ApiGatewayDeployment(
            this,
            `${config.terraform}_ApiGatewayDeployment`,
            {
                lifecycle: {
                    createBeforeDestroy: true,
                },
                restApiId: apiGateway.id,
                triggers: {
                    redeployment: Token.asString(
                        Fn.sha1(
                            Token.asString(
                                Fn.jsonencode([
                                    awsApiGatewayMethod.id,
                                    awsApiGatewayIntegration.id,
                                ])
                            )
                        )
                    ),
                },
            }
        )

        awsApiGatewayDeployment.overrideLogicalId("apiGateway");
        const awsApiGatewayStage = new ApiGatewayStage(this, `${config.terraform}_ApiGatewayStage`, {
            deploymentId: Token.asString(awsApiGatewayDeployment.id),
            restApiId: apiGateway.id,
            stageName: `${config.terraform}`,
        })

        awsApiGatewayStage.overrideLogicalId("apiGateway")
    }
}

const app = new App();
new MyStack(app, "terraform");
app.synth();
