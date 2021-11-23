/* eslint-disable @typescript-eslint/no-var-requires */
const { error } = require("console");
const fs = require("fs/promises");

async function createLayer() {
  const baseDir = process.cwd();

  await fs.symlink(
    `${baseDir}/node_modules`,
    `${baseDir}/layers/nodejs/node_modules`
  );

  await fs.copyFile(
    `${baseDir}/package.json`,
    `${baseDir}/layers/nodejs/package.json`
  );
}

createLayer().catch((e) => {
  if (e.code === "EEXIST") {
    console.error("symlink already exists");
  } else {
    console.error(e);
  }
  process.exit(1);
});
