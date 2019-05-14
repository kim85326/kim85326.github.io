---
layout: post
title: "安裝 Jest、Enzyme"
date: 2018-09-17 00:00:00 +0800
categories: 測試
tags: React JavaScript Test
mathjax: true
---

- 安裝指令

使用 jest + enzyme + enzyme-to-json

```
npm i --save-dev jest enzyme enzyme-adapter-react-16 enzyme-to-json
```

使用 typescript + jest + enzyme + enzyme-to-json + ts-jest

```
npm i --save-dev jest @types/jest
npm i --save-dev enzyme @types/enzyme
npm i --save-dev enzyme-adapter-react-16 @types/enzyme-adapter-react-16
npm i --save-dev ts-jest
npm i --save-dev enzyme-to-json
```

- package.json 配置
  - setupFiles
    - 在運行測試案例代碼之前，Jest 會先運行這裡的配置文檔來初始化指定的測試環境，可設定多組，而且它們將跑在 setupTestFrameworkScriptFile 之前
  - moduleFileExtensions
    - 代表支持加載的文檔名
  - transformIgnorePatterns
    - 用正則來匹配不用測試的文檔
  - testRegex
    - 正則表示的測試文檔，測試文檔的格式為 xxx.test.js
  - collectCoverage
    - 是否生成測試覆蓋報告，如果開啟，會增加測試的時間
  - collectCoverageFrom
    - 是計算 coverage 的檔案範圍，前面加驚嘆號便是排除的規則
  - moduleNameMapper
    - 代表需要被 Mock 的資源名稱
  - transform
    - 是一組要如何在 Jest 環境中轉換檔案的設定
    - 例如: 我們想測試 TypeScript 的檔案，但 Jest 原生並不支援，就可在此設定 transformer 將之編譯成 JavaScript

```
"jest": {
  setupFiles: [
    './test/setup.js',
  ],
  moduleFileExtensions: [
    'js',
    'jsx',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
  testRegex: '.*\\.test\\.js$',
  collectCoverage: false,
  collectCoverageFrom: [
    'src/components/**/*.{js}',
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less|scss)$": "<rootDir>/__mocks__/styleMock.js"
  },
  transform: {
    "^.+\\.js$": "babel-jest"
  },
}
```

我的簡單配置 typescript + jest + enzyme

```
"jest": {
    "collectCoverageFrom": [
      "ts/**/*.{ts,tsx}",
      "!ts/index.tsx"
    ],
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "json"
    ],
    "transform": {
      "\\.(ts|tsx)$": "<rootDir>/node_modules/ts-jest/preprocessor.js"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "snapshotSerializers": [
      "enzyme-to-json/serializer"
    ]
}
```

### 參考資料

- [使用 Jest 進行 React 單元測試](https://hk.saowen.com/a/2443c1a77a94835c5f1045c174b83128221f3cca4dd50622ee22c29c865b78a5)

- [自動化測試之前端 js 單元測試框架 jest](https://www.jianshu.com/p/aee9a19d5e6a)

- [Testing TypeScript with Jest](https://rjzaworski.com/2016/12/testing-typescript-with-jest)

- [【腾讯 TMQ】Jest 基本使用方法以及 mock 技巧介绍](https://blog.csdn.net/TMQ1225/article/details/81133855)

- [Using Jest with TypeScript](https://basarat.gitbooks.io/typescript/docs/testing/jest.html)

- [使用 JEST 進行前端單元測試](https://blog.patw.me/archives/1310/write-frontend-unit-tests-with-jest/)

- [wiki 代碼覆蓋率](https://zh.wikipedia.org/wiki/%E4%BB%A3%E7%A2%BC%E8%A6%86%E8%93%8B%E7%8E%87)

- [配置 Jest](https://code.i-harness.com/zh-TW/docs/jest/configuration#preset-string)
