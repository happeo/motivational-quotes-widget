function getEnvVariables(env) {
    if (env.production) {
      return {
        mode: "production",
        slug: "prod-slug",
        outputFileName: "bundle.production.js",
      };
    }
  
    if (env.preprod) {
      return {
        mode: "production",
        slug: "pre-prod-slug",
        outputFileName: "bundle.preprod.js",
      };
    }
  
    if (env.staging) {
      return {
        mode: "production",
        slug: "random-motivational-quotes-1vgapvq117pl1pdpaxdm-ac",
        outputFileName: "bundle.staging.js",
      };
    }
  
    return {
      mode: "development",
      slug: "motivationalquotes-86t9assdftlmtysp3xqk",
      outputFileName: "bundle.js",
    };
  }
  
  module.exports = { getEnvVariables };
  