import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import eslintReactHooks from 'eslint-plugin-react-hooks'
import eslintReactRefresh from 'eslint-plugin-react-refresh'
import tseslint from '@typescript-eslint/eslint-plugin'
import parser from '@typescript-eslint/parser'

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        languageOptions: {
            globals: globals.browser,
            parser,
        },
        plugins: {
            '@typescript-eslint': tseslint,
            'react-hooks': eslintReactHooks,
            react: pluginReact,
            'react-refresh': eslintReactRefresh,
        },
        rules: {
            'no-console': 'warn',
            'prefer-const': 'error',
            '@typescript-eslint/ban-ts-comment': 'warn',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'unused-imports/no-unused-imports': 'error',
        },
    },
]
