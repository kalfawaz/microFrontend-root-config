import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

const routes = constructRoutes(microfrontendLayout);
const loadApp: ({ name }: { name: string }) => Promise<any> = ({ name }) =>
  System.import(name).catch((error) => {
    console.error(`Failed to load application ${name}:`, error);
    // Re-throw the error for global handling
    throw error;
  });
const applications = constructApplications({
  routes,
  loadApp,
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();
