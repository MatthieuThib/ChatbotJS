'use strict';

import { match } from "assert";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import matcher from './Matcher/index.js'

//const matcher = require('./Matcher');


var prompt = require('prompt');
const Readline = require('readline'); // for reading nputs
const rl = Readline.createInterface ({ // for readsing inputs
input : process.stdin ,
output : process.stdout ,
terminal : false
})

console.log('\n Hi ! I am a ChatBot. \n You can ask me anything, I will try to reply correctly.');

rl.setPrompt('> ');
rl.prompt();
rl.on ('line', reply => { 
    matcher(reply, cb => { switch (cb.intent)
                            {
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

                                case 'Get weather':
                                    console.log('You want some information about the weather:')
                                    console.log('Time: ' + cb.entities.groups.time)
                                    console.log('Location: ' + cb.entities.groups.city)
                                    
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
    
    

