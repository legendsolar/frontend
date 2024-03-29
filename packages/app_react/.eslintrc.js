module.exports = {
    // env: {
    //     browser: true,
    //     es2021: true,
    // },
    // extends: ['plugin:react/recommended', 'google', 'prettier'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', 'eslint-plugin-absolute-imports'],
    rules: {
        'react/react-in-jsx-scope': 'off',
        'no-irregular-whitespace': 'off',
    },
};
