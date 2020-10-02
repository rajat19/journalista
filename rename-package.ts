#!/usr/bin/env node

import * as fs from 'fs';
const fileName = './package.json';
const file = require(fileName);

file.name = "journalista";
const result: string = JSON.stringify(file, null, 2);

fs.writeFile(fileName, result, function writeJSON(err) {
  if (err) return console.log(err);
  console.log(result);
  console.log('writing to ' + fileName);
});