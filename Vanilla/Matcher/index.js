import XRegExp from 'xregexp';
import patterns from '../Patterns/index.js';

let createEntities = (str, patterns) => {
	return XRegExp.exec(str, XRegExp(patterns, "i"))}

    
let matchPattern = (str, cb) => {

    let getResults = patterns.find(item => 
        {
            if (XRegExp.test(str, XRegExp(item.pattern , "i" ))) {return true ;}
        });
        
    if (getResults)
    {
        return cb({intent : getResults.intent, 
                   entities: createEntities(str, getResults.pattern)
                   //entities: "Moi"
                }) ;
    }
    else 
    {
        return cb({}) ;
    }
}

export default matchPattern
//module.exports = {matchPattern};