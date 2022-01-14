import XRegExp from 'xregexp';
import patterns from '../Patterns/index.js';

let matchPattern = (str, cb) => {

    let getResult = patterns.find(item => 
        {
            if (XRegExp.test(str, XRegExp(item.pattern , "i" ))) {return true ;}
        });
        
    if (getResult)
    {
        return cb({intent : getResult.intent}) ;
    }
    else 
    {
        return cb({}) ;
    }
}

export default matchPattern