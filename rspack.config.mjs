import { rspack } from '@rspack/core';
import HtmlRspackPlugin from 'html-rspack-plugin';
export default {
  target: [
    'web',
    'es2017'
  ],
  name: 'web',
  devtool: false,
  context: '/Users/bytedance/github/rsbuild-arco-pro',
  mode: 'production',
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
    tsConfig: {
      configFile: '/Users/bytedance/github/rsbuild-arco-pro/tsconfig.json',
      references: 'auto'
    },
    alias: {
      '@swc/helpers': '/Users/bytedance/github/rsbuild-arco-pro/node_modules/.pnpm/@swc+helpers@0.5.17/node_modules/@swc/helpers'
    },
    extensionAlias: {
      '.js': [
        '.js',
        '.ts',
        '.tsx'
      ],
      '.jsx': [
        '.jsx',
        '.tsx'
      ]
    },
    extensions: [
      '.ts',
      '.tsx',
      '.mjs',
      '.js',
      '.jsx',
      '.json'
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
        test: /\.m?js/,
        resolve: {
          fullySpecified: false
        }
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
            loader: '/Users/bytedance/github/rsbuild-arco-pro/node_modules/.pnpm/@rspack+core@1.3.8_@swc+helpers@0.5.17/node_modules/@rspack/core/dist/cssExtractLoader.js'
          },
          /* config.module.rule('css').use('css') */
          {
            loader: '/Users/bytedance/github/rsbuild-arco-pro/node_modules/.pnpm/@rsbuild+core@1.3.14/node_modules/@rsbuild/core/compiled/css-loader/index.js',
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
      /* config.module.rule('css-inline') */
      {
        test: /\.css$/,
        type: 'javascript/auto',
        resourceQuery: /inline/,
        sideEffects: true,
        use: [
          /* config.module.rule('css-inline').use('css') */
          {
            loader: '/Users/bytedance/github/rsbuild-arco-pro/node_modules/.pnpm/@rsbuild+core@1.3.14/node_modules/@rsbuild/core/compiled/css-loader/index.js',
            options: {
              importLoaders: 1,
              modules: false,
              sourceMap: false,
              exportType: 'string'
            }
          },
          /* config.module.rule('css-inline').use('lightningcss') */
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
      /* config.module.rule('js') */
      {
        test: /\.(?:js|jsx|mjs|cjs|ts|tsx|mts|cts)$/,
        type: 'javascript/auto',
        dependency: {
          not: 'url'
        },
        include: [
          {
            and: [
              '/Users/bytedance/github/rsbuild-arco-pro',
              {
                not: /[\\/]node_modules[\\/]/
              }
            ]
          },
          /\.(?:ts|tsx|jsx|mts|cts)$/
        ],
        use: [
          /* config.module.rule('js').use('swc') */
          {
            loader: 'builtin:swc-loader',
            options: {
              jsc: {
                externalHelpers: true,
                parser: {
                  tsx: true,
                  syntax: 'typescript',
                  decorators: true
                },
                experimental: {
                  cacheRoot: '/Users/bytedance/github/rsbuild-arco-pro/node_modules/.cache/.swc',
                  keepImportAttributes: true
                },
                transform: {
                  legacyDecorator: false,
                  decoratorVersion: '2022-03',
                  react: {
                    development: false,
                    refresh: false,
                    runtime: 'automatic'
                  }
                }
              },
              isModule: 'unknown',
              env: {
                targets: [
                  'chrome >= 87',
                  'edge >= 88',
                  'firefox >= 78',
                  'safari >= 14'
                ],
                mode: undefined
              },
              rspackExperiments: {
                'import': [
                  {
                    libraryName: '@arco-design/web-react',
                    libraryDirectory: 'es',
                    camelToDashComponentName: false,
                    style: 'css'
                  },
                  {
                    libraryName: '@arco-design/web-react/icon',
                    libraryDirectory: 'react-icon',
                    camelToDashComponentName: false
                  }
                ]
              }
            }
          }
        ]
      },
      /* config.module.rule('js-data-uri') */
      {
        mimetype: {
          or: [
            'text/javascript',
            'application/javascript'
          ]
        },
        use: [
          /* config.module.rule('js-data-uri').use('swc') */
          {
            loader: 'builtin:swc-loader',
            options: {
              jsc: {
                externalHelpers: true,
                parser: {
                  tsx: true,
                  syntax: 'typescript',
                  decorators: true
                },
                experimental: {
                  cacheRoot: '/Users/bytedance/github/rsbuild-arco-pro/node_modules/.cache/.swc',
                  keepImportAttributes: true
                },
                transform: {
                  legacyDecorator: false,
                  decoratorVersion: '2022-03',
                  react: {
                    development: false,
                    refresh: false,
                    runtime: 'automatic'
                  }
                }
              },
              isModule: 'unknown',
              env: {
                targets: [
                  'chrome >= 87',
                  'edge >= 88',
                  'firefox >= 78',
                  'safari >= 14'
                ],
                mode: undefined
              },
              rspackExperiments: {
                'import': [
                  {
                    libraryName: '@arco-design/web-react',
                    libraryDirectory: 'es',
                    camelToDashComponentName: false,
                    style: 'css'
                  },
                  {
                    libraryName: '@arco-design/web-react/icon',
                    libraryDirectory: 'react-icon',
                    camelToDashComponentName: false
                  }
                ]
              }
            }
          }
        ],
        resolve: {
          fullySpecified: false
        }
      },
      /* config.module.rule('image') */
      {
        test: /\.(?:png|jpg|jpeg|pjpeg|pjp|gif|bmp|webp|ico|apng|avif|tif|tiff|jfif|cur)$/i,
        oneOf: [
          /* config.module.rule('image').oneOf('image-asset-url') */
          {
            type: 'asset/resource',
            resourceQuery: /(__inline=false|url)/,
            generator: {
              filename: 'static/image/[name].[contenthash:8][ext]'
            }
          },
          /* config.module.rule('image').oneOf('image-asset-inline') */
          {
            type: 'asset/inline',
            resourceQuery: /inline/
          },
          /* config.module.rule('image').oneOf('image-asset-raw') */
          {
            type: 'asset/source',
            resourceQuery: /raw/
          },
          /* config.module.rule('image').oneOf('image-asset') */
          {
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 4096
              }
            },
            generator: {
              filename: 'static/image/[name].[contenthash:8][ext]'
            }
          }
        ]
      },
      /* config.module.rule('media') */
      {
        test: /\.(?:mp4|webm|ogg|mov|mp3|wav|flac|aac|m4a|opus)$/i,
        oneOf: [
          /* config.module.rule('media').oneOf('media-asset-url') */
          {
            type: 'asset/resource',
            resourceQuery: /(__inline=false|url)/,
            generator: {
              filename: 'static/media/[name].[contenthash:8][ext]'
            }
          },
          /* config.module.rule('media').oneOf('media-asset-inline') */
          {
            type: 'asset/inline',
            resourceQuery: /inline/
          },
          /* config.module.rule('media').oneOf('media-asset-raw') */
          {
            type: 'asset/source',
            resourceQuery: /raw/
          },
          /* config.module.rule('media').oneOf('media-asset') */
          {
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 4096
              }
            },
            generator: {
              filename: 'static/media/[name].[contenthash:8][ext]'
            }
          }
        ]
      },
      /* config.module.rule('font') */
      {
        test: /\.(?:woff|woff2|eot|ttf|otf|ttc)$/i,
        oneOf: [
          /* config.module.rule('font').oneOf('font-asset-url') */
          {
            type: 'asset/resource',
            resourceQuery: /(__inline=false|url)/,
            generator: {
              filename: 'static/font/[name].[contenthash:8][ext]'
            }
          },
          /* config.module.rule('font').oneOf('font-asset-inline') */
          {
            type: 'asset/inline',
            resourceQuery: /inline/
          },
          /* config.module.rule('font').oneOf('font-asset-raw') */
          {
            type: 'asset/source',
            resourceQuery: /raw/
          },
          /* config.module.rule('font').oneOf('font-asset') */
          {
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 4096
              }
            },
            generator: {
              filename: 'static/font/[name].[contenthash:8][ext]'
            }
          }
        ]
      },
      /* config.module.rule('wasm') */
      {
        test: /\.wasm$/,
        dependency: 'url',
        type: 'asset/resource',
        generator: {
          filename: 'static/wasm/[hash].module.wasm'
        }
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
            loader: '/Users/bytedance/github/rsbuild-arco-pro/node_modules/.pnpm/@rspack+core@1.3.8_@swc+helpers@0.5.17/node_modules/@rspack/core/dist/cssExtractLoader.js'
          },
          /* config.module.rule('less').use('css') */
          {
            loader: '/Users/bytedance/github/rsbuild-arco-pro/node_modules/.pnpm/@rsbuild+core@1.3.14/node_modules/@rsbuild/core/compiled/css-loader/index.js',
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
            loader: '/Users/bytedance/github/rsbuild-arco-pro/node_modules/.pnpm/@rsbuild+plugin-less@1.2.2_@rsbuild+core@1.3.14/node_modules/@rsbuild/plugin-less/compiled/less-loader/index.js',
            options: {
              lessOptions: {
                javascriptEnabled: true,
                paths: [
                  '/Users/bytedance/github/rsbuild-arco-pro/node_modules'
                ]
              },
              sourceMap: false,
              implementation: '/Users/bytedance/github/rsbuild-arco-pro/node_modules/.pnpm/@rsbuild+plugin-less@1.2.2_@rsbuild+core@1.3.14/node_modules/@rsbuild/plugin-less/compiled/less/index.js'
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
            loader: '/Users/bytedance/github/rsbuild-arco-pro/node_modules/.pnpm/@rsbuild+core@1.3.14/node_modules/@rsbuild/core/compiled/css-loader/index.js',
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
            loader: '/Users/bytedance/github/rsbuild-arco-pro/node_modules/.pnpm/@rsbuild+plugin-less@1.2.2_@rsbuild+core@1.3.14/node_modules/@rsbuild/plugin-less/compiled/less-loader/index.js',
            options: {
              lessOptions: {
                javascriptEnabled: true,
                paths: [
                  '/Users/bytedance/github/rsbuild-arco-pro/node_modules'
                ]
              },
              sourceMap: false,
              implementation: '/Users/bytedance/github/rsbuild-arco-pro/node_modules/.pnpm/@rsbuild+plugin-less@1.2.2_@rsbuild+core@1.3.14/node_modules/@rsbuild/plugin-less/compiled/less/index.js'
            }
          }
        ]
      },
      /* config.module.rule('less-raw') */
      {
        test: /\.less$/,
        type: 'asset/source',
        resourceQuery: /raw/
      },
      /* config.module.rule('svg') */
      {
        test: /\.svg$/,
        oneOf: [
          /* config.module.rule('svg').oneOf('svg-asset-url') */
          {
            type: 'asset/resource',
            resourceQuery: /(__inline=false|url)/,
            generator: {
              filename: 'static/svg/[name].[contenthash:8].svg'
            }
          },
          /* config.module.rule('svg').oneOf('svg-asset-inline') */
          {
            type: 'asset/inline',
            resourceQuery: /inline/
          },
          /* config.module.rule('svg').oneOf('svg-asset-raw') */
          {
            type: 'asset/source',
            resourceQuery: /raw/
          },
          /* config.module.rule('svg').oneOf('svg-react') */
          {
            type: 'javascript/auto',
            resourceQuery: /react/,
            use: [
              /* config.module.rule('svg').oneOf('svg-react').use('swc') */
              {
                loader: 'builtin:swc-loader',
                options: {
                  jsc: {
                    externalHelpers: true,
                    parser: {
                      tsx: true,
                      syntax: 'typescript',
                      decorators: true
                    },
                    experimental: {
                      cacheRoot: '/Users/bytedance/github/rsbuild-arco-pro/node_modules/.cache/.swc',
                      keepImportAttributes: true
                    },
                    transform: {
                      legacyDecorator: false,
                      decoratorVersion: '2022-03',
                      react: {
                        development: false,
                        refresh: false,
                        runtime: 'automatic'
                      }
                    }
                  },
                  isModule: 'unknown',
                  env: {
                    targets: [
                      'chrome >= 87',
                      'edge >= 88',
                      'firefox >= 78',
                      'safari >= 14'
                    ],
                    mode: undefined
                  },
                  rspackExperiments: {
                    'import': [
                      {
                        libraryName: '@arco-design/web-react',
                        libraryDirectory: 'es',
                        camelToDashComponentName: false,
                        style: 'css'
                      },
                      {
                        libraryName: '@arco-design/web-react/icon',
                        libraryDirectory: 'react-icon',
                        camelToDashComponentName: false
                      }
                    ]
                  }
                }
              },
              /* config.module.rule('svg').oneOf('svg-react').use('svgr') */
              {
                loader: '/Users/bytedance/github/rsbuild-arco-pro/node_modules/.pnpm/@rsbuild+plugin-svgr@1.2.0_@rsbuild+core@1.3.14_typescript@5.8.2/node_modules/@rsbuild/plugin-svgr/dist/loader.mjs',
                options: {
                  svgo: true,
                  svgoConfig: {
                    plugins: [
                      {
                        name: 'preset-default',
                        params: {
                          overrides: {
                            removeViewBox: false
                          }
                        }
                      },
                      'prefixIds'
                    ]
                  },
                  exportType: 'default'
                }
              }
            ]
          },
          /* config.module.rule('svg').oneOf('svg') */
          {
            type: 'javascript/auto',
            issuer: [
              /\.(?:js|jsx|mjs|cjs|ts|tsx|mts|cts)$/,
              /\.mdx$/
            ],
            use: [
              /* config.module.rule('svg').oneOf('svg').use('swc') */
              {
                loader: 'builtin:swc-loader',
                options: {
                  jsc: {
                    externalHelpers: true,
                    parser: {
                      tsx: true,
                      syntax: 'typescript',
                      decorators: true
                    },
                    experimental: {
                      cacheRoot: '/Users/bytedance/github/rsbuild-arco-pro/node_modules/.cache/.swc',
                      keepImportAttributes: true
                    },
                    transform: {
                      legacyDecorator: false,
                      decoratorVersion: '2022-03',
                      react: {
                        development: false,
                        refresh: false,
                        runtime: 'automatic'
                      }
                    }
                  },
                  isModule: 'unknown',
                  env: {
                    targets: [
                      'chrome >= 87',
                      'edge >= 88',
                      'firefox >= 78',
                      'safari >= 14'
                    ],
                    mode: undefined
                  },
                  rspackExperiments: {
                    'import': [
                      {
                        libraryName: '@arco-design/web-react',
                        libraryDirectory: 'es',
                        camelToDashComponentName: false,
                        style: 'css'
                      },
                      {
                        libraryName: '@arco-design/web-react/icon',
                        libraryDirectory: 'react-icon',
                        camelToDashComponentName: false
                      }
                    ]
                  }
                }
              },
              /* config.module.rule('svg').oneOf('svg').use('svgr') */
              {
                loader: '/Users/bytedance/github/rsbuild-arco-pro/node_modules/.pnpm/@rsbuild+plugin-svgr@1.2.0_@rsbuild+core@1.3.14_typescript@5.8.2/node_modules/@rsbuild/plugin-svgr/dist/loader.mjs',
                options: {
                  svgo: true,
                  svgoConfig: {
                    plugins: [
                      {
                        name: 'preset-default',
                        params: {
                          overrides: {
                            removeViewBox: false
                          }
                        }
                      },
                      'prefixIds'
                    ]
                  },
                  exportType: 'default'
                }
              }
            ]
          },
          /* config.module.rule('svg').oneOf('svg-asset') */
          {
            type: 'asset',
            parser: {
              dataUrlCondition: {
                maxSize: 4096
              }
            },
            generator: {
              filename: 'static/svg/[name].[contenthash:8].svg'
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        react: {
          name: 'lib-react',
          test: /node_modules[\\/](?:react|react-dom|scheduler)[\\/]/,
          priority: 0
        },
        router: {
          name: 'lib-router',
          test: /node_modules[\\/](?:react-router|react-router-dom|history|@remix-run[\\/]router)[\\/]/,
          priority: 0
        },
        'lib-axios': {
          test: /node_modules[\\/]axios(-.+)?[\\/]/,
          priority: 0,
          name: 'lib-axios'
        }
      }
    },
    minimizer: [
      /* config.optimization.minimizer('js') */
      new rspack.SwcJsMinimizerRspackPlugin(
        {
          minimizerOptions: {
            format: {
              asciiOnly: false
            }
          },
          extractComments: true
        }
      ),
      /* config.optimization.minimizer('css') */
      new rspack.LightningCssMinimizerRspackPlugin(
        {
          minimizerOptions: {
            targets: [
              'chrome >= 87',
              'edge >= 88',
              'firefox >= 78',
              'safari >= 14'
            ],
            errorRecovery: true
          }
        }
      )
    ]
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
      '/Users/bytedance/github/rsbuild-arco-pro/src/index.tsx'
    ]
  }
}