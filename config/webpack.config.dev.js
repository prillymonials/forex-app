'use strict';

const path = require('path');
const autoprefixer = require('autoprefixer');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const rootPath = path.resolve(__dirname, '..');

const appSrc = path.resolve(rootPath, 'src', 'index');
const appTsConfig = path.resolve(rootPath, 'tsconfig.json');
const appTsLint = path.resolve(rootPath, 'tslint.json');
const appPublic = path.resolve(rootPath, 'public');
const appNodeModules = path.resolve(rootPath, 'node_modules');

const appHtml = path.resolve(appPublic, 'index.html');

const port = 3000;

module.exports = {
    // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
    devtool: 'cheap-module-source-map',
    // These are the "entry points" to our application.
    // This means they will be the "root" imports that are included in JS bundle.
    entry: [
        // Include an alternative client for WebpackDevServer. A client's job is to
        // connect to WebpackDevServer by a socket and get notified about changes.
        // When you save a file, the client will either apply hot updates (in case
        // of CSS changes), or refresh the page (in case of JS changes).
        `webpack-dev-server/client?http://localhost:${port}`,
        // App's code:
        './src/index',
    ],
    output: {
        // Add /* filename */ comments to generated require()s in the output.
        pathinfo: true,
        // This does not produce a real file. It's just the virtual path that is
        // served by WebpackDevServer in development. This is the JS bundle
        // containing code from all our entry points, and the Webpack runtime.
        filename: 'dist/js/bundle.js',
        // There are also additional JS chunk files if you use code splitting.
        chunkFilename: 'dist/js/[name].chunk.js',
        // This is the URL that app is served from. We use "/" in development.
        publicPath: '/',
        // Point sourcemap entries to original disk location (format as URL on Windows)
        devtoolModuleFilenameTemplate: info =>
            path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
    },
    resolve: {
        // These are the reasonable defaults supported by the Node ecosystem.
        // We also include JSX as a common component filename extension to support
        // some tools, although we do not recommend using it.
        extensions: [ '.js', '.ts', '.tsx', '.scss', '.json' ],
        alias: {},
    },
    module: {
        rules: [
            // Styles
            {
                test: /.(css|scss|sass)$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader', options: { modules: false, importLoaders: 2 } },
                    { loader: 'postcss-loader', options: { plugins: () => autoprefixer() } },
                    { loader: 'sass-loader', options: { importLoaders: 1 } }
                ]
            },
            // Typescript
            {
                test: /.(ts|tsx)$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    },
    plugins: [
        // Generates an `index.html` file with the <script> injected.
        new HtmlWebpackPlugin({
            inject: true,
            template: appHtml,
        }),
        // Add module names to factory functions so they appear in browser profiler.
        new webpack.NamedModulesPlugin(),
        // This is necessary to emit hot updates (currently CSS only):
        new webpack.HotModuleReplacementPlugin(),
        // Watcher doesn't work well if you mistype casing in a path so we use
        // a plugin that prints an error when you attempt to do this.
        new CaseSensitivePathsPlugin(),
        // Perform type checking and linting in a separate process to speed up compilation
        new ForkTsCheckerWebpackPlugin({
            async: false,
            watch: appSrc + '.tsx',
            tsconfig: appTsConfig,
            tslint: appTsLint,
        }),
    ],
    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    },
    // Turn off performance hints during development because we don't do any
    // splitting or minification in interest of speed. These warnings become
    // cumbersome.
    performance: {
        hints: false,
    },
    // Webpack Dev Server
    devServer: {
        // Enable gzip compression of generated files.
        compress: true,
        // Silence WebpackDevServer's own logs since they're generally not useful.
        // It will still show compile warnings and errors with this setting.
        clientLogLevel: 'none',
        // By default WebpackDevServer serves physical files from current directory
        // in addition to all the virtual build products that it serves from memory.
        // This is confusing because those files won’t automatically be available in
        // production build folder unless we copy them. However, copying the whole
        // project directory is dangerous because we may expose sensitive files.
        contentBase: [
            appPublic,
            path.resolve(appNodeModules, 'font-awesome'),
        ],
        // By default files from `contentBase` will not trigger a page reload.
        watchContentBase: true,
        // Enable hot reloading server. It will provide /sockjs-node/ endpoint
        // for the WebpackDevServer client so it can learn when the files were
        // updated. The WebpackDevServer client is included as an entry point
        // in the Webpack development configuration. Note that only changes
        // to CSS are currently hot reloaded. JS changes will refresh the browser.
        hot: true,
        // It is important to tell WebpackDevServer to use the same "root" path
        // as we specified in the config. In development, we always serve from /.
        publicPath: '/',
        // WebpackDevServer is noisy by default so we emit custom message instead
        // by listening to the compiler events with `compiler.plugin` calls above.
        quiet: true,
        host: 'localhost',
        port: port,
        // Automatically open the browser
        open: true,
        overlay: true,
        historyApiFallback: {
            // Paths with dots should still use the history fallback.
            disableDotRule: true,
        },
        stats: {
            modules: false,
        }
    }
};