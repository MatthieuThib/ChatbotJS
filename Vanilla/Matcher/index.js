import XRegExp from 'xregexp';
import patterns from '../Patterns/index.js';

let matchPattern = (str) => {

    let getResult = patterns.find(item => 
        {
            if (XRegExp.test(str, XRegExp(item.pattern , "i" ))) {return true ;}
        });
        
    if (getResult)
    {
        return ({intent : getResult.intent}) ;
    }
    else 
    {
        return ({intent : 'Whaaaaaaat ?'}) ;
    }
}

export default matchPattern