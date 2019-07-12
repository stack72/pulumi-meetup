import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import {RdsInstance} from "./rds";
import {Config} from "@pulumi/pulumi";

async function main() {
    const config = new Config();
    const userName = config.requireSecret("dbUsername");
    const password = config.requireSecret("dbPassword");

    const azs = await aws.getAvailabilityZones()

    const baseTags = {
        Purpose: "pulumi-meetup",
    }

    const vpc = new awsx.ec2.Vpc("my-vpc", {
        cidrBlock: "10.0.0.0/16",
        enableDnsHostnames: true,
        enableDnsSupport: true,
        numberOfAvailabilityZones: azs.names.length,
        numberOfNatGateways: azs.names.length,
        subnets: [
            {
                type: "public",
                name: "Public",
                cidrMask: 20,
            }
        ],
        tags: {
            ...baseTags,
            "Name": "demo-vpc",
        }
    });

    const db = new RdsInstance("db-instance", {
        description: "Pulumi Meetup DB Instance",
        baseTags: baseTags,

        subnetIds: vpc.publicSubnetIds,

        password: password,
        username: userName,
        initalDbName: "mydatabase",

        allocatedStorage: 40,
        engineVersion: "11.4",
        instanceClass: aws.rds.InstanceTypes.R3_Large,
        storageType: "gp2",

        finalSnapshotIdentifier: "my-meetup-final-snapshot",

        sendEnhancedLogsToCloudwatch: true,
        monitoringInterval: 10,
    });

    return {
        subnetIds: vpc.publicSubnetIds,
        dbEndpoint: db.instanceEndpoint(),
        dbAddress: db.instanceAddress(),
        dbPort: db.instancePort(),
    }
}

module.exports = main();




