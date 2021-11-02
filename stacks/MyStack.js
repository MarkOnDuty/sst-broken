import * as sst from "@serverless-stack/resources";

export default class MyStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    // Create a HTTP API
    const api = new sst.Api(this, "Api", {
      routes: {
        "GET /": "src/lambda.handler",
      },
    });

    const site = new sst.StaticSite(this, "Test Nuxt Site", {
      path: "frontend",
      buildOutput: "dist",
      buildCommand: "npm run generate",
      errorPage: sst.StaticSiteErrorOptions.REDIRECT_TO_INDEX_PAGE,
    });

    // Show the endpoint in the output
    this.addOutputs({
      "ApiEndpoint": api.url,
      "CloudFront URL": site.url,      
    });
  }
}
