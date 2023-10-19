import { Construct } from "constructs";
import { App, TerraformStack, Token, Fn } from "cdktf";
// import { App, TerraformStack, Token } from "cdktf";
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
import { S3Bucket } from "@cdktf/provider-aws/lib/s3-bucket";
import { S3BucketAcl } from "@cdktf/provider-aws/lib/s3-bucket-acl";
import { IamRolePolicy } from "@cdktf/provider-aws/lib/iam-role-policy";
import { CodebuildProject } from "@cdktf/provider-aws/lib/codebuild-project";
import { S3BucketOwnershipControls } from "@cdktf/provider-aws/lib/s3-bucket-ownership-controls";
import { CodestarconnectionsConnection } from "@cdktf/provider-aws/lib/codestarconnections-connection";
import { Codepipeline } from "@cdktf/provider-aws/lib/codepipeline";
import { KmsAlias } from "@cdktf/provider-aws/lib/kms-alias";
import { KmsKey } from "@cdktf/provider-aws/lib/kms-key";

const resourcename = "googleform"
class MyStack extends TerraformStack {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        new AwsProvider(this, `${resourcename}_aws`, {
            region: "ap-south-1",
            accessKey: "AKIAYPBV5L2QCA3JKZ3S",
            secretKey: "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"
        });

        const ecrRepository = new EcrRepository(this, `${resourcename}_EcrRepository`, {
            imageScanningConfiguration: {
                scanOnPush: true,
            },
            imageTagMutability: "MUTABLE",
            name: `${resourcename}`,
        });

        const ecsCluster = new EcsCluster(this, `${resourcename}_EcsCluster`, {
            name: `${resourcename}`,
            setting: [
                {
                    name: "containerInsights",
                    value: "enabled",
                }
            ]
        });

        const assumeRole = new DataAwsIamPolicyDocument(this, `${resourcename}_policy`, {
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

        const role = new IamRole(this, `${resourcename}_role`, {
            assumeRolePolicy: Token.asString(assumeRole.json),
            name: `${resourcename}`,
        });

        const taskDefinition = new EcsTaskDefinition(this, `${resourcename}_taskDefinition`, {
            family: `${resourcename}`,
            containerDefinitions: Token.asString(
                Fn.jsonencode([{
                    name: `${resourcename}`,
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

        const policy = new DataAwsIamPolicyDocument(this, `${resourcename}_policyDocument`, {
            statement: [{
                actions: ["ec2:Describe*"],
                effect: "Allow",
                resources: ["*"]
            }]
        });

        const awsIamPolicyPolicy = new IamPolicy(this, `${resourcename}_IamPolicy`, {
            name: `${resourcename}`,
            policy: Token.asString(policy.json)
        });

        awsIamPolicyPolicy.overrideLogicalId("policy");
        new IamRolePolicyAttachment(this, `${resourcename}_policyAttachment`, {
            policyArn: Token.asString(awsIamPolicyPolicy.arn),
            role: role.name
        });

        const vpc = new DefaultVpc(this, `${resourcename}_vpc`, {
            tags: {
                Name: "Default VPC"
            }
        });

        const lbSg = new SecurityGroup(this, `${resourcename}_securityGroup`, {
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

        const loadBalancer = new Lb(this, `${resourcename}_loadBalancer`, {
            loadBalancerType: "application",
            name: `${resourcename}app`,
            securityGroups: [lbSg.id],
            subnets: ["subnet-32561e5a", "subnet-2016a86c", "subnet-9d58a0e6"]
        });

        const targetGroup = new LbTargetGroup(this, `${resourcename}_targetGroup`, {
            name: `${resourcename}`,
            port: 80,
            protocol: "HTTP",
            targetType: "ip",
            vpcId: vpc.id
        });

        new LbListener(this, `${resourcename}_LbListener`, {
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

        new EcsService(this, `${resourcename}_EcsService`, {
            name: `${resourcename}`,
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

        const awsLb = new Lb(this, `${resourcename}_Lb`, {
            internal: true,
            loadBalancerType: "network",
            name: `${resourcename}`,
            subnets: ["subnet-32561e5a", "subnet-2016a86c", "subnet-9d58a0e6"],
        })

        const apiGateway = new ApiGatewayRestApi(this, `${resourcename}_ApiGateway`, {
            name: `${resourcename}`,
        });

        const awsApiGatewayVpcLink = new ApiGatewayVpcLink(this, `${resourcename}_ApiGatewayVpcLink`, {
            name: apiGateway.name,
            targetArns: [Token.asString(awsLb.arn)],
        });

        awsApiGatewayVpcLink.overrideLogicalId("apiGateway");
        const awsApiGatewayMethod = new ApiGatewayMethod(this, `${resourcename}_ApiGatewayMethod`, {
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
            `${resourcename}_ApiGatewayIntegration`,
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
            `${resourcename}_ChildApiGatewayResource`,
            {
                parentId: apiGateway.rootResourceId,
                pathPart: "{proxy+}",
                restApiId: apiGateway.id
            })

        awsApiGatewayResourceProxy.overrideLogicalId("awsApiGatewayMethod");
        const awsApiGatewayMethodProxy = new ApiGatewayMethod(this, `${resourcename}_ChildApiGatewayMethod`, {
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
            `${resourcename}_ChildApiGatewayIntegration`,
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
            `${resourcename}_ApiGatewayDeployment`,
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
        const awsApiGatewayStage = new ApiGatewayStage(this, `${resourcename}_ApiGatewayStage`, {
            deploymentId: Token.asString(awsApiGatewayDeployment.id),
            restApiId: apiGateway.id,
            stageName: `${resourcename}`,
        })

        awsApiGatewayStage.overrideLogicalId("apiGateway")

        const s3Bucket = new S3Bucket(this, `${resourcename}_s3Bucket`, {
            bucket: `${resourcename}-bucket`,
        });

        const awsS3BucketOwnershipControlsS3Bucket = new S3BucketOwnershipControls(
            this,
            `${resourcename}_S3BucketOwnershipControls`,
            {
                bucket: s3Bucket.id,
                rule: {
                    objectOwnership: "BucketOwnerPreferred",
                },
            }
        );
        awsS3BucketOwnershipControlsS3Bucket.overrideLogicalId("s3Bucket");

        const awsS3BucketAclS3Bucket = new S3BucketAcl(this, `${resourcename}_awsS3BucketAclExample`, {
            acl: "private",
            bucket: s3Bucket.id,
            dependsOn: [awsS3BucketOwnershipControlsS3Bucket],
        });
        awsS3BucketAclS3Bucket.overrideLogicalId("s3Bucket");

        const bucketassumeRole = new DataAwsIamPolicyDocument(this, "assume_role", {
            statement: [
                {
                    actions: ["sts:AssumeRole"],
                    effect: "Allow",
                    principals: [
                        {
                            identifiers: ["codebuild.amazonaws.com"],
                            type: "Service",
                        },
                    ],
                },
            ],
        });

        const dataAwsIamPolicyDocumentS3Bucket = new DataAwsIamPolicyDocument(
            this,
            `${resourcename}_DataAwsIamPolicyDocument`,
            {
                statement: [
                    {
                        actions: [
                            "logs:CreateLogGroup",
                            "logs:CreateLogStream",
                            "logs:PutLogEvents",
                        ],
                        effect: "Allow",
                        resources: ["*"],
                    },
                    {
                        actions: [
                            "ec2:CreateNetworkInterface",
                            "ec2:DescribeDhcpOptions",
                            "ec2:DescribeNetworkInterfaces",
                            "ec2:DeleteNetworkInterface",
                            "ec2:DescribeSubnets",
                            "ec2:DescribeSecurityGroups",
                            "ec2:DescribeVpcs",
                        ],
                        effect: "Allow",
                        resources: ["*"],
                    },
                    {
                        actions: ["ec2:CreateNetworkInterfacePermission"],
                        condition: [
                            {
                                test: "StringEquals",
                                values: [s3Bucket.arn],
                                variable: "ec2:Subnet",
                            },
                            {
                                test: "StringEquals",
                                values: ["codebuild.amazonaws.com"],
                                variable: "ec2:AuthorizedService",
                            },
                        ],
                        effect: "Allow",
                        resources: [
                            "arn:aws:ec2:us-east-1:123456789012:network-interface/*",
                        ],
                    },
                    {
                        actions: ["s3:*"],
                        effect: "Allow",
                        resources: [s3Bucket.arn, "${" + s3Bucket.arn + "}/*"],
                    },
                ],
            }
        );
        dataAwsIamPolicyDocumentS3Bucket.overrideLogicalId("s3Bucket");

        const awsIamRoleS3Bucket = new IamRole(this, `${resourcename}_Role`, {
            assumeRolePolicy: Token.asString(bucketassumeRole.json),
            name: `${resourcename}role`,
        });
        awsIamRoleS3Bucket.overrideLogicalId("s3Bucket");

        const awsIamRolePolicyS3Bucket = new IamRolePolicy(this, `${resourcename}_RolePolicy`, {
            policy: Token.asString(dataAwsIamPolicyDocumentS3Bucket.json),
            role: Token.asString(awsIamRoleS3Bucket.name),
        });
        awsIamRolePolicyS3Bucket.overrideLogicalId("s3Bucket");

        const awsCodebuildProjectS3Bucket = new CodebuildProject(this, `${resourcename}_CodebuildProject`, {
            artifacts: {
                type: "NO_ARTIFACTS",
            },
            buildTimeout: Token.asNumber("5"),
            cache: {
                location: s3Bucket.bucket,
                type: "S3",
            },
            description: "codebuild_project",
            environment: {
                computeType: "BUILD_GENERAL1_SMALL",
                environmentVariable: [
                    {
                        name: "SOME_KEY1",
                        value: "SOME_VALUE1",
                    },
                    {
                        name: "SOME_KEY2",
                        type: "PARAMETER_STORE",
                        value: "SOME_VALUE2",
                    },
                ],
                image: "aws/codebuild/amazonlinux2-x86_64-standard:4.0",
                imagePullCredentialsType: "CODEBUILD",
                type: "LINUX_CONTAINER",
            },
            logsConfig: {
                cloudwatchLogs: {
                    groupName: "log-group",
                    streamName: "log-stream",
                },
                s3Logs: {
                    location: "${" + s3Bucket.id + "}/build-log",
                    status: "ENABLED",
                },
            },
            name: `${resourcename}`,
            serviceRole: Token.asString(awsIamRoleS3Bucket.arn),
            source: {
                gitCloneDepth: 1,
                gitSubmodulesConfig: {
                    fetchSubmodules: true,
                },
                location: "https://github.com/amylesoft/google-forms",
                type: "GITHUB",
            },
            sourceVersion: "master",
            vpcConfig: {
                securityGroupIds: [
                    Token.asString(lbSg.id),
                ],
                subnets: ["subnet-32561e5a", "subnet-2016a86c", "subnet-9d58a0e6"],
                vpcId: Token.asString(vpc.id),
            },
        });
        awsCodebuildProjectS3Bucket.overrideLogicalId("s3Bucket");

        const codestarconnectionsConnection = new CodestarconnectionsConnection(this, `${resourcename}_Codestarconnection`, {
            name: `${resourcename}`,
            providerType: "GitHub",
        });

        const codepipelineBucket = new S3Bucket(this, "codepipeline_bucket", {
            bucket: `${resourcename}codepipeline`,
        });

        // new S3BucketAcl(this, "codepipeline_bucket_acl", {
        //     acl: "private",
        //     bucket: codepipelineBucket.id,
        // });

        const assumeRole_1 = new DataAwsIamPolicyDocument(this, "assume_role_1", {
            statement: [
                {
                    actions: ["sts:AssumeRole"],
                    effect: "Allow",
                    principals: [
                        {
                            identifiers: ["codepipeline.amazonaws.com"],
                            type: "Service",
                        },
                    ],
                },
            ],
        });

        const codepipelinePolicy = new DataAwsIamPolicyDocument(
            this,
            `${resourcename}_codepipeline_policy`,
            {
                statement: [
                    {
                        actions: [
                            "s3:PutObject",
                            "s3:GetObject",
                            "kms:Decrypt",
                            "codestar-connections:UseConnection",
                            "kms:Encrypt",
                            "kms:GenerateDataKey",
                            "s3:GetBucketVersioning",
                            "s3:PutObjectAcl",
                            "s3:GetObjectVersion"
                        ],
                        effect: "Allow",
                        resources: [
                            codepipelineBucket.arn,
                            "${" + codepipelineBucket.arn + "}/*",
                            "arn:aws:kms:*:582081142432:key/*"
                        ],
                    },
                    {
                        actions: ["codestar-connections:UseConnection"],
                        effect: "Allow",
                        resources: [codestarconnectionsConnection.arn],
                    },
                    {
                        actions: ["codebuild:BatchGetBuilds", "codebuild:StartBuild"],
                        effect: "Allow",
                        resources: ["*"],
                    },
                ],
            }
        );

        const Kmskey = new KmsKey(this, "Kmskey", {});
        const awsKmsAliasA = new KmsAlias(this, "a_1", {
            name: `alias/${resourcename}`,
            targetKeyId: Kmskey.keyId,
        });

        awsKmsAliasA.overrideLogicalId("Kmskey");

        const codepipelineRole = new IamRole(this, "codepipeline_role", {
            assumeRolePolicy: Token.asString(assumeRole_1.json),
            name: `${resourcename}_role`
        });

        const awsIamRolePolicyCodepipelinePolicy = new IamRolePolicy(
            this,
            "codepipeline_policy",
            {
                name: "codepipeline_policy",
                policy: Token.asString(codepipelinePolicy.json),
                role: codepipelineRole.id,
            }
        );
        awsIamRolePolicyCodepipelinePolicy.overrideLogicalId("codepipeline_policy");

        const awsCodepipelineExample = new Codepipeline(this, "codepipeline", {
            artifactStore: [
                {
                    encryptionKey: {
                        id: Token.asString(awsKmsAliasA.arn),
                        type: "KMS",
                    },
                    location: codepipelineBucket.bucket,
                    type: "S3",
                },
            ],
            name: `${resourcename}`,
            roleArn: codepipelineRole.arn,
            stage: [
                {
                    action: [
                        {
                            category: "Source",
                            configuration: {
                                BranchName: "master",
                                ConnectionArn: codestarconnectionsConnection.arn,
                                FullRepositoryId: "amylesoft/google-forms",
                            },
                            name: "Source",
                            outputArtifacts: ["source_output"],
                            owner: "AWS",
                            provider: "CodeStarSourceConnection",
                            version: "1",
                        },
                    ],
                    name: "Source",
                },
                {
                    action: [
                        {
                            category: "Build",
                            configuration: {
                                ProjectName: "googleform",
                            },
                            inputArtifacts: ["source_output"],
                            name: "Build",
                            outputArtifacts: ["build_output"],
                            owner: "AWS",
                            provider: "CodeBuild",
                            version: "1",
                        },
                    ],
                    name: "Build",
                },
                {
                    action: [
                        {
                            category: "Deploy",
                            configuration: {
                                ActionMode: "REPLACE_ON_FAILURE",
                                Capabilities: "CAPABILITY_AUTO_EXPAND,CAPABILITY_IAM",
                                OutputFileName: "CreateStackOutput.json",
                                StackName: "MyStack",
                                TemplatePath: "build_output::simple.json",
                            },
                            inputArtifacts: ["build_output"],
                            name: "Deploy",
                            owner: "AWS",
                            provider: "CloudFormation",
                            version: "1",
                        },
                    ],
                    name: "Deploy",
                },
            ],
        });
        awsCodepipelineExample.overrideLogicalId("codestarconnectionsConnection");
    }
}

const app = new App();
new MyStack(app, "terraform");
app.synth();
