import rspack from '@rspack/core';
import {  defineConfig} from '@rspack/cli';
import HtmlRspackPlugin from 'html-rspack-plugin';
import path from 'path';
import { fileURLToPath } from 'url';
const project = fileURLToPath(import.meta.resolve('./src'));
export default defineConfig({
  context: import.meta.dirname,
  target: [
    'web',
    'es2017'
  ],
  name: 'web',
  devtool: false,
  mode: 'none',
  infrastructureLogging: {
    level: 'error'
  },
  watchOptions: {
    ignored: /[\\/](?:\.git|node_modules)[\\/]/,
    aggregateTimeout: 0
  },
  experiments: {
    asyncWebAssembly: true
  },
  output: {
    path: '/Users/bytedance/github/rsbuild-arco-pro/dist',
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/async/[name].[contenthash:8].js',
    publicPath: '/',
    pathinfo: false,
    hashFunction: 'xxhash64',
    assetModuleFilename: 'static/assets/[name].[contenthash:8][ext]',
    webassemblyModuleFilename: 'static/wasm/[hash].module.wasm'
  },
  resolve: {
    "alias": {
      "@": project,
    },
    extensions: [
      '.ts',
      '.tsx',
      '.mjs',
      '.js',
      '.jsx',
      '.json',
      '...'
    ]
  },
  module: {
    parser: {
      javascript: {
        exportsPresence: 'error'
      }
    },
    rules: [
      /* config.module.rule('mjs') */
       {
        test: /\.(js|jsx|ts|tsx|mjs)$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                jsx: true,
              },
              transform: {
                react: {
                  pragma: 'React.createElement',
                  pragmaFrag: 'React.Fragment',
                  throwIfNamespace: true,
                  development: false,
                },
              },
            },
          },
        },
        type: 'javascript/auto',
      },
      /* config.module.rule('css') */
      {
        test: /\.css$/,
        type: 'javascript/auto',
        dependency: {
          not: 'url'
        },
        resourceQuery: {
          not: /raw|inline/
        },
        sideEffects: true,
        use: [
          /* config.module.rule('css').use('mini-css-extract') */
          {
            loader: rspack.CssExtractRspackPlugin.loader
          },
          /* config.module.rule('css').use('css') */
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                auto: true,
                namedExport: false,
                exportGlobals: false,
                exportLocalsConvention: 'camelCase',
                localIdentName: '[local]-[hash:base64:6]'
              },
              sourceMap: false
            }
          },
          /* config.module.rule('css').use('lightningcss') */
          {
            loader: 'builtin:lightningcss-loader',
            options: {
              targets: [
                'chrome >= 87',
                'edge >= 88',
                'firefox >= 78',
                'safari >= 14'
              ],
              errorRecovery: true
            }
          }
        ],
        resolve: {
          preferRelative: true
        }
      },
      /* config.module.rule('css-raw') */
      {
        test: /\.css$/,
        type: 'asset/source',
        resourceQuery: /raw/
      },
      /* config.module.rule('less') */
      {
        test: /\.less$/,
        resourceQuery: {
          not: /raw|inline/
        },
        sideEffects: true,
        dependency: {
          not: 'url'
        },
        use: [
          /* config.module.rule('less').use('mini-css-extract') */
          {
            loader: rspack.CssExtractRspackPlugin.loader,
          },
          /* config.module.rule('less').use('css') */
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                auto: true,
                namedExport: false,
                exportGlobals: false,
                exportLocalsConvention: 'camelCase',
                localIdentName: '[local]-[hash:base64:6]'
              },
              sourceMap: false
            }
          },
          /* config.module.rule('less').use('lightningcss') */
          {
            loader: 'builtin:lightningcss-loader',
            options: {
              targets: [
                'chrome >= 87',
                'edge >= 88',
                'firefox >= 78',
                'safari >= 14'
              ],
              errorRecovery: true
            }
          },
          /* config.module.rule('less').use('less') */
          {
            loader:'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
              sourceMap: false,
            }
          }
        ],
        resolve: {
          preferRelative: true
        }
      },
      /* config.module.rule('less-inline') */
      {
        test: /\.less$/,
        resourceQuery: /inline/,
        use: [
          /* config.module.rule('less-inline').use('css') */
          {
            loader: rspack.CssExtractRspackPlugin.loader,
            options: {
              importLoaders: 2,
              modules: false,
              sourceMap: false,
              exportType: 'string'
            }
          },
          /* config.module.rule('less-inline').use('lightningcss') */
          {
            loader: 'builtin:lightningcss-loader',
            options: {
              targets: [
                'chrome >= 87',
                'edge >= 88',
                'firefox >= 78',
                'safari >= 14'
              ],
              errorRecovery: true,
              minify: true
            }
          },
          /* config.module.rule('less-inline').use('less') */
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
               
              },
              sourceMap: false,
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/,
        type: 'asset/resource',
        resourceQuery: {
          not: /raw/
        },
        generator: {
          filename: 'static/images/[name].[contenthash:8][ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset/resource',
        resourceQuery: {
          not: /raw/
        },
        generator: {
          filename: 'static/fonts/[name].[contenthash:8][ext]'
        }
      }
    ]
  },
  optimization: {
    minimize: false,
    concatenateModules:false,
    sideEffects:false,
    innerGraph:false
  },
  plugins: [
    /* config.plugin('mini-css-extract') */
    new rspack.CssExtractRspackPlugin(
      {
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/async/[name].[contenthash:8].css',
        ignoreOrder: true
      }
    ),
    /* config.plugin('RsbuildCorePlugin') */
    /* config.plugin('html-index') */
    new HtmlRspackPlugin(
      {
        meta: {
          charset: {
            charset: 'UTF-8'
          },
          viewport: 'width=device-width, initial-scale=1.0'
        },
        chunks: [
          'index'
        ],
        inject: 'head',
        filename: 'index.html',
        entryName: 'index',
        templateParameters: (compilation, assets, assetTags, pluginOptions)=>{
            let { mountId, templateParameters } = config.html, rspackConfig = compilation.options, htmlPlugin = {
                tags: assetTags,
                files: assets,
                options: pluginOptions
            };
            return reduceConfigsWithContext({
                initial: {
                    mountId,
                    entryName: entryName,
                    assetPrefix: assetPrefix,
                    compilation,
                    htmlPlugin,
                    rspackConfig,
                    webpackConfig: rspackConfig,
                    htmlWebpackPlugin: htmlPlugin
                },
                config: templateParameters,
                ctx: {
                    entryName: entryName
                }
            });
        },
        scriptLoading: 'defer',
        title: 'Rsbuild App',
        template: '',
        templateContent: '<!doctype html><html><head></head><body><div id="root"></div></body></html>'
      }
    ),
    /* config.plugin('define') */
    new rspack.DefinePlugin(
      {
        'import.meta.env.MODE': '"production"',
        'import.meta.env.DEV': false,
        'import.meta.env.PROD': true,
        'import.meta.env.BASE_URL': '"/"',
        'import.meta.env.ASSET_PREFIX': '""',
        'process.env.BASE_URL': '"/"',
        'process.env.ASSET_PREFIX': '""'
      }
    ),
    /* config.plugin('progress') */
    new rspack.ProgressPlugin(
      {
        prefix: 'web'
      }
    )
  ],
  performance: {
    hints: false,
    maxAssetSize: 250000,
    maxEntrypointSize: 250000
  },
  entry: {
    index: [
      './src/index.tsx'
    ]
  }
});