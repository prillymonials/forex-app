module.exports = {
    automock: false,
    setupFiles: [
        '<rootDir>/config/jest/fetch-mock.js',
        '<rootDir>/config/jest/window-alert.js',
    ],
    roots: [
        '<rootDir>/src'
    ],
    transform: {
        '.*\.tsx?$': 'ts-jest'
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'jsx',
        'json',
        'node'
    ],
    moduleNameMapper: {
        '\.(scss|less|css|jpg|png)$': '<rootDir>/config/jest/empty-module.js',
    },
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/index.tsx'
    ],
    testURL: 'http://localhost:8080',
    globals: {
        'ts-jest': {
            useBabelrc: true,
            tsConfigFile: 'tsconfig.test.json'
        }
    }
}