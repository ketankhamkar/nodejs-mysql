import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Foodie App API",
    description: "API documentation for Foodie App",
  },
  host: "172.17.7.158:4000", // Change this to your host
  schemes: ["http"], // Use 'https' if applicable
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description:
        'JWT Authorization header using the Bearer scheme. Example: "Bearer {token}"',
    },
  },
  security: [{ bearerAuth: [] }],
};

const outputFile = "./swagger-output.json"; // Generated Swagger JSON
const endpointsFiles = ["./index.js"]; // Your main API entry point file

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log("Swagger documentation generated!");
});
