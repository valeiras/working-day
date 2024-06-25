import { loadEnvConfig } from "@next/env";

const setup = async () => {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);
};

setup();
