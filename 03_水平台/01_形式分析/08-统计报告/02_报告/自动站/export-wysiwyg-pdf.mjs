import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));

function usage() {
  return [
    'Usage:',
    '  node export-wysiwyg-pdf.mjs [input.html] [output.pdf]',
    '',
    'Defaults:',
    '  input.html  = the first .html file in this folder',
    '  output.pdf  = same name as input with .pdf extension',
  ].join('\n');
}

function resolveInput(inputArg) {
  if (inputArg) {
    return path.resolve(process.cwd(), inputArg);
  }

  const htmlFile = readdirSync(scriptDir)
    .filter((name) => name.toLowerCase().endsWith('.html'))
    .sort((a, b) => a.localeCompare(b))
    .at(0);

  if (!htmlFile) {
    throw new Error(`No input HTML was provided and no .html file was found in ${scriptDir}.\n\n${usage()}`);
  }

  return path.join(scriptDir, htmlFile);
}

function resolveOutput(outputArg, inputPath) {
  if (outputArg) {
    return path.resolve(process.cwd(), outputArg);
  }

  return path.join(
    path.dirname(inputPath),
    `${path.basename(inputPath, path.extname(inputPath))}.pdf`,
  );
}

function findBrowsers() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  ].filter(Boolean);

  const found = [...new Set(candidates.filter((candidate) => existsSync(candidate)))];
  if (!found.length) {
    throw new Error('Chrome or Edge was not found. Set CHROME_PATH to the browser executable.');
  }

  return found;
}

const printModes = [
  {
    name: 'headless-software',
    flags: [
      '--headless=new',
      '--no-sandbox',
      '--disable-gpu',
      '--disable-gpu-sandbox',
      '--disable-gpu-compositing',
    ],
  },
  {
    name: 'headless-swiftshader',
    flags: [
      '--headless=new',
      '--no-sandbox',
      '--disable-gpu-sandbox',
      '--use-angle=swiftshader',
      '--use-gl=swiftshader',
      '--enable-unsafe-swiftshader',
    ],
  },
  {
    name: 'headless-legacy',
    flags: [
      '--headless=old',
      '--no-sandbox',
      '--disable-gpu',
    ],
  },
];

async function exportPdf(inputPath, outputPath) {
  if (!existsSync(inputPath)) {
    throw new Error(`Input file not found: ${inputPath}\n\n${usage()}`);
  }

  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  const browsers = findBrowsers();
  const inputUrl = pathToFileURL(inputPath).href;
  const failures = [];

  for (const browserPath of browsers) {
    for (const mode of printModes) {
      const profileDir = await fs.mkdtemp(path.join(os.tmpdir(), 'wysiwyg-pdf-profile-'));
      const outputArg = `--print-to-pdf=${outputPath}`;

      try {
        await fs.rm(outputPath, { force: true });
        const result = spawnSync(browserPath, [
          ...mode.flags,
          '--disable-background-networking',
          '--disable-extensions',
          '--disable-sync',
          '--no-first-run',
          '--no-default-browser-check',
          `--user-data-dir=${profileDir}`,
          '--run-all-compositor-stages-before-draw',
          '--virtual-time-budget=10000',
          '--print-to-pdf-no-header',
          outputArg,
          inputUrl,
        ], {
          encoding: 'utf8',
          stdio: ['ignore', 'pipe', 'pipe'],
          timeout: 120000,
        });

        if (result.error) {
          throw result.error;
        }

        if (result.status === 0 && existsSync(outputPath)) {
          const stat = await fs.stat(outputPath);
          console.log(JSON.stringify({
            input: inputPath,
            output: outputPath,
            browser: browserPath,
            mode: mode.name,
            bytes: stat.size,
          }, null, 2));
          return;
        }

        failures.push([
          `${browserPath} (${mode.name}) failed with exit code ${result.status}.`,
          result.stdout && `stdout:\n${result.stdout.trim()}`,
          result.stderr && `stderr:\n${result.stderr.trim()}`,
        ].filter(Boolean).join('\n\n'));
      } finally {
        await fs.rm(profileDir, { recursive: true, force: true });
      }
    }
  }

  throw new Error(`PDF export failed in all browser modes.\n\n${failures.join('\n\n---\n\n')}`);
}

try {
  const inputPath = resolveInput(process.argv[2]);
  const outputPath = resolveOutput(process.argv[3], inputPath);
  await exportPdf(inputPath, outputPath);
} catch (error) {
  console.error(error && error.stack ? error.stack : error);
  process.exitCode = 1;
}
