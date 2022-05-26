module.exports = {
    tabWidth: 4,
    printWidth: 120,
    endOfLine: 'crlf',
    trailingComma: 'none',
    overrides: [
        {
            files: ['**/*.js', '**/*.ts', '**/*.jsx', '**/*.tsx'],
            options: {
                singleQuote: true
            }
        },
        {
            files: ['**/*.js', '**/*.jsx'],
            options: {
                arrowParens: 'avoid'
            }
        }
    ]
};
