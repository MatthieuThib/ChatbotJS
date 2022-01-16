'use strict';

const require = createRequire(import.meta.url);

import { match } from "assert";
import { createRequire } from "module";

import style from './Colors/index.js';
import matcher from './Matcher/index.js'
import weather from './Weather/index.js';

var prompt = require('prompt');
const Readline = require('readline'); // for reading inputs

const Chatbot = async () => {
    const rl = Readline.createInterface({ // for reading inputs
        input: process.stdin,
        output: process.stdout,
        terminal: false})
    
    console.log(`${style.fontColors.cyan}%s${style.reset}`, "\n\tHi ! I am a weather chatbot. \n You can ask me anything about weather, I will try to reply correctly.");
    console.log(`${style.fontColors.cyan}%s${style.reset}`, " For instance, you can ask me 'What's the weather in Paris tomorrow ?'");
    rl.setPrompt('> ');
    rl.prompt();

    rl.on('line', (reply) => {
        matcher(reply, async (cb) => {

            switch (cb.intent) {
                case 'Hello':
                    console.log('Hello')
                    console.log(cb.entities.groups.greeting)
                    rl.setPrompt('> ');
                    rl.prompt();
                    break;

                case 'Nothing':
                    console.log('Please, tell me something !')
                    rl.setPrompt('> ');
                    rl.prompt();
                    break;

                case 'Get Weather':
                    await weather(cb.entities.groups.city, cb.entities.groups.time);
                    rl.setPrompt('> ');
                    rl.prompt();
                    break;

                case 'Exit':
                    console.log('Bye, see you next time !');
                    process.exit(0);
                    break;

                default:
                    console.log(" I didn't understand, Sorry :/");
                    console.log(cb.intent);
                    rl.setPrompt('> ');
                    rl.prompt();
                    break;
            }
        });
    });
};

Chatbot();