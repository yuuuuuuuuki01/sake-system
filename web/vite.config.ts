import { defineConfig } from "vite";
import { execSync } from "child_process";

function getVersion(): number {
  try {
    return parseInt(execSync("git rev-list --count HEAD", { cwd: ".." }).toString().trim(), 10);
  } catch {
    return 0;
  }
}

export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  server: {
    port: 5173
  },
  define: {
    __APP_VERSION__: getVersion()
  }
});
