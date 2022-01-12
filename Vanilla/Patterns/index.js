const patternDict = [
    {
        pattern : '\\b(Hi|Hello|Hey)\\b',
        intent : 'Hello'
    } ,
    {
        pattern : '\\b(bye|exit)\\b',
        intent : 'Exit'
    },
    {
        pattern : "\b(weather)\s(like\s)?in\s\b(?<city>[A-Za-z]+([A-Za-z]+)?)\s\b(?<time>tomorrow|today)" ,
        intent : 'get weather'
    }
];

export default patternDict
//module.exports = {patternDict};