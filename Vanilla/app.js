'use strict';

import { createRequire } from "module";
const require = createRequire(import.meta.url);

import matchPattern from './Matcher/index.js'


var prompt = require('prompt');
const Readline = require('readline'); // for reading nputs
const rl = Readline.createInterface ({ // for reading inputs
input : process.stdin ,
output : process.stdout ,
terminal : false
})

console.log('ChatBot');
rl.setPrompt('>');
rl.on ('line', reply => { console.log(matchPattern(reply))});

