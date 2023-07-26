#!/usr/bin/env node
/* eslint-disable no-shadow */
/* eslint-disable operator-linebreak */

import { createSpinner } from 'nanospinner';
import * as colorette from 'colorette';
import { createPromptModule } from 'inquirer';
import { exec } from 'child_process';

const RED = colorette.red;
const BLUE = colorette.blue;
const GREEN = colorette.green;

const spinner = createSpinner();
const prompt = createPromptModule();
const versionRegex =
  /^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/;

async function updateVersion(version) {
  spinner.stop();
  try {
    const newVersion = prompt([
      {
        type: 'input',
        name: 'newVersion',
        message: BLUE(`Enter new version: (current version: ${version})`),
      },
    ]);

    const isValidVersion = versionRegex.test(newVersion);

    if (!isValidVersion) return null;

    exec(`npm version ${newVersion} --no-git-tag-version`, (error) => {
      if (error) throw new Error(error);
      exec('git add package.json', (error) => {
        if (error) throw new Error(error);

        exec(`git commit -m "Release v${newVersion}"`, (error) => {
          if (error) throw new Error(error);

          exec('git push origin master', (error) => {
            if (error) throw new Error(error);

            exec(`git push origin v${newVersion}`, (error) => {
              if (error) throw new Error(error);

              exec('npm publish', (error) => {
                if (error) throw new Error(error);
                spinner.success({
                  text: GREEN(
                    `SassifyPro v${newVersion} has been successfully released!`,
                  ),
                });
              });
            });
          });
        });
      });
    });

    return newVersion;
  } catch (error) {
    spinner.error({ text: RED(error) });

    return null;
  }
}

function publishPackage() {
  spinner.start({
    text: colorette.green('Starting publication process\n'),
    color: 'blue',
  });

  exec('npm show . version', (error, stdout) => {
    const version = stdout;
    if (error) {
      console.log(error);
    }

    updateVersion(version);
  });
}

publishPackage();
