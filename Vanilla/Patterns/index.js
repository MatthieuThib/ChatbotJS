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
        pattern: '\\b(?<weather>|weather|hot|cold|rain|rainy|cloudy)?\\b\\s?in\\s\\b(?<city>[a-z]+[ a-z]+?)\\s?in?\\s?\\b(?<time>tomorrow|today|10\\sdays|5\\sdays)?$',
        intent: 'Get Weather'
    }
];

export default patternDict