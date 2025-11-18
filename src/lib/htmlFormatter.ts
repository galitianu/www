/**
 * @file htmlFormatter.ts
 * @description Provides helpers plus an Astro integration that formats HTML output
 *              right after the build finishes.
 */

import path from 'node:path';
import fs from 'node:fs';
import chalk from 'chalk';
import prettier from 'prettier';
import type { AstroIntegration } from 'astro';

/**
 * Formatter options extending Prettier's HTML configuration.
 */
export interface FormatterOptions {
  [key: string]: string | number | boolean | undefined;
  parser: string;
  tabWidth: number;
  useTabs: boolean;
  printWidth: number;
  htmlWhitespaceSensitivity: 'css' | 'strict' | 'ignore';
  endOfLine?: 'lf' | 'crlf' | 'cr' | 'auto';
  bracketSameLine?: boolean;
  singleAttributePerLine?: boolean;
  embeddedLanguageFormatting?: 'auto' | 'off';
}

/**
 * Default formatting options optimized for HTML output.
 */
export const defaultConfig: FormatterOptions = {
  parser: 'html', // Use the HTML parser
  tabWidth: 2, // Indent size in spaces
  useTabs: true, // Prefer tabs
  printWidth: 120, // Max line length
  htmlWhitespaceSensitivity: 'css', // Follow CSS rules for whitespace
  endOfLine: 'lf', // Unix line endings
  bracketSameLine: false, // Place closing tags on a new line
  singleAttributePerLine: false, // Allow multiple attributes per line
  embeddedLanguageFormatting: 'auto', // Format embedded CSS/JS automatically
};

/**
 * Recursively collect every file path inside the provided directory.
 */
export const getAllFiles = function (dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);

    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
};

/**
 * Format a specific HTML file in place.
 */
export const htmlFormatter = async (filePath: string, options: FormatterOptions): Promise<void> => {
  try {
    const data = fs.readFileSync(filePath, { encoding: 'utf8' });

    const formattingOptions = {
      ...options,
      parser: options.parser || 'html',
    };

    const result = await prettier.format(data, formattingOptions);

    fs.writeFileSync(filePath, result);
    console.log(chalk.green(`Formatted: ${path.basename(filePath)}`));
  } catch (err) {
    console.error(chalk.red(`Error formatting ${filePath}: ${(err as Error).message}`));
  }
};

interface AstroBuildDoneParams {
  dir: URL;
  pages: { pathname: string }[];
}

export default function htmlBeautifier(options: Partial<FormatterOptions> = {}): AstroIntegration {
  const formattingOptions = { ...defaultConfig, ...options };

  return {
    name: 'htmlFormatter',
    hooks: {
      'astro:build:done': async ({ dir }: AstroBuildDoneParams) => {
        try {
          console.log(chalk.blue.bold('\nFormatting HTML files...'));

          const allFiles = getAllFiles(dir.pathname);

          const htmlFiles = allFiles.filter(filePath => path.extname(filePath) === '.html');

          const promises = htmlFiles.map(filePath => htmlFormatter(filePath, formattingOptions));

          await Promise.all(promises);

          console.log(chalk.green.bold('\nHTML formatting completed successfully ✓'));
        } catch (error) {
          console.error(chalk.red.bold('\nHTML Formatting Error:'));
          console.error(chalk.red(`${(error as Error).message}`));
        }
      },
    },
  };
}
