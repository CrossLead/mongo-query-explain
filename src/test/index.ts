import test from 'ava';
import * as fs from 'fs';
import * as path from 'path';
import { explain } from '../lib';

/**
 *
 * run all test cases
 *
 */

const CASE_DIR = path.join(__dirname, './cases');
const cases = fs.readdirSync(CASE_DIR);

cases.filter(d => !/\.d\.ts$/.test(d)).forEach(file => {
  const name = file.replace('.js', '');
  test(`match-test: ${name}`, t => {
    const { doc, query, matches } = require(path.join(CASE_DIR, file));
    const result = explain(doc, query);
    t.is(result.match, matches, `${name} test should produce ${matches}`);
    console.log(JSON.stringify(result, null, 2));
  });
});
