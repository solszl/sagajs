/**
 *
 * Created Date: 2020-05-12, 11:30:29 (zhenliang.sun)
 * Last Modified: 2020-05-12, 11:30:39 (zhenliang.sun)
 * Email: zhenliang.sun@gmail.com
 *
 * Distributed under the MIT license. See LICENSE file for details.
 * Copyright (c) 2020 infervision
 */

const presets = [
  [
    '@babel/preset-env',
    {
      targets: 'last 2 versions,chrome>=49',
      modules: false
    }
  ]
]
const plugins = [
  ['@babel/plugin-transform-runtime', { corejs: 2 }],
  '@babel/plugin-proposal-export-default-from', // Stage 1
  '@babel/plugin-proposal-logical-assignment-operators',
  ['@babel/plugin-proposal-optional-chaining', { loose: false }],
  ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
  ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: false }],
  '@babel/plugin-proposal-do-expressions',
  ['@babel/plugin-proposal-decorators', { legacy: true }], // Stage 2
  '@babel/plugin-proposal-function-sent',
  '@babel/plugin-proposal-export-namespace-from',
  '@babel/plugin-proposal-numeric-separator',
  '@babel/plugin-proposal-throw-expressions',
  '@babel/plugin-syntax-dynamic-import', // Stage 3
  '@babel/plugin-syntax-import-meta',
  ['@babel/plugin-proposal-class-properties', { loose: false }],
  '@babel/plugin-proposal-json-strings',
  '@babel/plugin-proposal-object-rest-spread'
]
module.exports = { presets, plugins }
