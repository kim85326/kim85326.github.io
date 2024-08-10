---
layout: post
title: "GitLab CI Publish Nuget Package 避免重複發佈相同版本"
date: 2024-08-10 16:00:00 +0800
categories: C#/.net
tags: ["C#/.net", "DevOps"]
mathjax: true
description: ""
---

這篇文章的背景是有在用公司自架的 private nuget 倉庫，而且有寫 GitLab CI 來自動 publish nuget package

![](/assets/img/posts/nuget_server.png)

---

最近在解決 pipeline 在 publish nuget 的時候，如果有人改了 SDK 裡面的程式碼，但是沒有更新版號，而且 nuget publish pipeline 又會自動跑，就會覆蓋掉倉庫上相同版本的 package，導致別人在修 issue 的時候重拉 package 下來，但是是你開發中的版本，造成另一個 production issue 😢

一開始我找到的解法是用 `nuget.exe`，他可以用 `nuget list` 來幫我找到所有 versions

```yml
nuget-publish:
  stage: nuget
  tags:
    - my-dotnet-runner
  needs: []
  when: manual
  variables:
    NUGET_SOURCE: <帶你的 private repository>
    NUGET_API_KEY: <帶你的 api key>
    PROJECT: Todo
  script:
    - cd $PROJECT
    - dotnet build -c Release -v m
    - $packageFile = Get-ChildItem "bin\Release\$PROJECT.*.nupkg"
    - $version = $packageFile[0].name -replace "$PROJECT\.(.*)\.nupkg", '$1'
    - $allVersions = nuget list $PROJECT -Source $NUGET_SOURCE -AllVersion
    - |
      if ($allVersions -contains "$PROJECT $version") {
        echo "Package $PROJECT $version already exists"
      } else {
        nuget push "bin\Release\$PROJECT.$version.nupkg" -Source $NUGET_SOURCE $NUGET_API_KEY
      }
```

但我就想到都什麼年代了...還有誰在用 windows 啊 (.exe)

我 docker image 是 linux，我要用 `dotnet nuget` 啦

就有找到 `dotnet search` 可以來幫我檢查倉庫有沒有一樣版本號的

[github - Support for dotnet search command (equivalent to nuget.exe list, later search) #6060](https://github.com/NuGet/Home/issues/6060)

試一試就發現 [dotnet search](https://learn.microsoft.com/zh-tw/dotnet/core/tools/dotnet-tool-search) 沒有參數讓我帶 private nuget server url

又失敗了...

也有找到微軟官網的文件 [dotnet nuget push](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-nuget-push#options)
 說可以使用 `--skip-duplicate`，來避免重複 publish 一樣版本的 nuget package

> `--skip-duplicate`
> When pushing multiple packages to an HTTP(S) server, treats any 409 Conflict response as a warning so that other pushes can continue.

看起來好像可以啊

但我怎麼試，都沒作用...還是會被覆蓋掉，而且也沒任何 warning 啊

反正我在我最後快放棄的時候

有好心同事提供了我 URL：

`https://<我的 nuget 倉庫>/nuget/Packages(Id='<放 package id>',Version='1.0.1')`

就和我的 chatgpt 好朋友一起完成以下的腳本啦 ~~~

```yml
nuget-publish:
  stage: nuget
  image: mcr.microsoft.com/dotnet/sdk:8.0-alpine
  tags:
    - linux
  needs: []
  when: manual
  variables:
    NUGET_SOURCE: <帶你的 private repository>
    NUGET_API_KEY: <帶你的 api key>
    PROJECT: Todo
  script:
    # 安裝工具解析 xml
    - apk update
    - apk add libxml2-utils
    # build project
    - dotnet build $PROJECT/$PROJECT.csproj --configuration Release
    # 從 .csproj 檔取得 package id & 版本號
    - VERSION=$(xmllint --xpath "//Project/PropertyGroup/Version/text()" $PROJECT/$PROJECT.csproj)
    - NUGET_PACKAGE_ID=$(xmllint --xpath "//Project/PropertyGroup/PackageId/text()" $PROJECT/$PROJECT.csproj)
    - cd $PROJECT/bin/Release
    - echo "Publishing $VERSION"
    - NUPKG_FILE="$NUGET_PACKAGE_ID.$VERSION.nupkg"
    # 用 curl 去訪問 package 當前版本資訊
    - CHECK_VERSION_URL="$NUGET_SOURCE/Packages(Id='$NUGET_PACKAGE_ID',Version='$VERSION')"
    - HTTP_STATUS=$(curl -o /dev/null -s -w "%{http_code}\n" $CHECK_VERSION_URL)
    # 檢查版本是否已存在，不存在才發布
    - |
      if [ $HTTP_STATUS -eq 200 ]; then
        echo "Package $VERSION exists!!"
        exit 1
      else
        dotnet nuget push "$NUPKG_FILE" --api-key "$NUGET_API_KEY" --source "$NUGET_SOURCE"
        echo "Publishing $VERSION completed"
      fi
```
