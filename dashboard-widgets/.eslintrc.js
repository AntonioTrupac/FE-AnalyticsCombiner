module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'prettier'
    ],
    plugins: ['@typescript-eslint', 'react', 'prettier'],
    rules: {
        'prettier/prettier': 'error',
        'react/react-in-jsx-scope': 'off',
    },
    settings: {
        react: {
        version: 'detect',
        },
    },
};