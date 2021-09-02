module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
    plugins: ['react', 'react-hooks'],
    extends: [
        'prettier',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    rules: {
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-ts-ignore': 'off',
        'react/prop-types': 0,
        'react/react-in-jsx-scope': 0,
        'react/display-name': 0,
        'react/no-unescaped-entities': 0,
        'jsx-a11y/accessible-emoji': 'off',
        'no-use-before-define': 'off',
        'arrow-body-style': ['error', 'as-needed'],
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                '@typescript-eslint/explicit-function-return-type': ['error'],
                '@typescript-eslint/no-use-before-define': 'off',
                '@typescript-eslint/camelcase': 0,
                '@typescript-eslint/naming-convention': [
                    'error',
                    {
                        selector: 'property',
                        format: ['camelCase', 'UPPER_CASE'],
                        filter: {
                            // you can expand this regex as you find more cases that require quoting that you want to allow
                            regex: '^[a-z]{2}_[A-Z]{2}$',
                            match: false,
                        },
                    },
                ],
            },
        },
    ],
};
