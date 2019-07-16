# pulumi-meetup July 10th 2019

[Pulumi](https://www.pulumi.com/) is an application that allows you to create infrastructure in TypeScript or Python. The code
in this repository was used to show how, by using a programming language for infrastructure management, that you can create
nice APIs that hide away the implementation detail from the user

## Getting Started

Once you have Pulumi running, you will be able to follow the steps below:

1. ```
   pulumi stack init my-stack
   ```
   
2. ```
   pulumi config set aws:region us-east-1
   ```
   
3. ```
   pulumi config set --secret dbUsername MyUserName
   ```
   
4. ```
   pulumi config set --secret dbPassword MyPasswo3d!
   ```

5. ```
   npm install
   ```
   
6. ```
   pulumi up
   ```

This will create the VPC infrastructure and database instances in your AWS account


## Please Note

This repository will provision infrastructure in AWS that may cost you money!
