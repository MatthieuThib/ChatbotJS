const patternDict = [
    {
        pattern: '\\b(?<greeting>Hi|Hello|Hey)\\b',
        intent: 'Hello'
    },
    {
        pattern: '\\b(bye|exit)\\b',
        intent: 'Exit'
    },
    {
        pattern: '\\b(?<weather>|weather|hot|cold|rain|rainy|sunny|snow|thunderstorms|windy|drizzle)\\b\\s\\b(?<time>day\\safter\\stomorrow|tomorrow|today)\\sin\\s\\b(?<city>[a-z]+[ a-z]+?)$',
        //pattern : "\b?(weather)\s(like\s)?in\s\b(?<city>[A-Za-z]+)\s\b(?<time>tomorrow|today)" ,
        intent: 'Get weather'
    },
    {
        pattern: 'in\\s\\b(?<city>[a-z]+[ a-z]+?)\\b',
        //pattern : 'in\s\b(?<city>[A-Za-z]+)',
        intent: 'Current Weather'
    }
];

export default patternDict
//module.exports = {patternDict};