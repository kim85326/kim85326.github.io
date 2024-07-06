---
layout: post
title: "在 Vue 3 中使用 Composition API 優雅地接 API"
date: 2024-07-07 04:00:00 +0800
categories: JavaScript
tags: JavaScript
mathjax: true
description: ""
---

在現代前端開發中，與 API 的通信是一個不可避免的任務。要實現優雅且高效的 API 請求管理，我們需要考慮多個方面，包括攔截器、錯誤處理、加載狀態和請求取消等。這些最佳實踐不僅能提升應用的可維護性和可讀性，還能極大地改善用戶體驗。本篇文章將介紹如何在 Vue 3 中使用 Composition API 和 Axios 來優雅地處理用戶相關的 API 請求。

你可以參考之前的兩篇文章，了解更多有關 AJAX 和常見 HTTP 請求方式的知識：

- [JavaScript AJAX](/posts/JavaScript-AJAX/)
- [JavaScript XMLHttpRequest、Fetch 和 Axios 差別](/posts/JavaScript-XMLHttpRequest-Fetch-和-Axios-差別/)

### 安裝 Axios

首先，確保你已經安裝了 Axios：

```bash
npm install axios
```

創建 API Client

在 src 目錄下創建一個 apiClient.js 檔案：

```js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://api.example.com',
    timeout: 10000,
});

apiClient.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${yourToken}`;
    return config;
}, error => {
    return Promise.reject(error);
});

apiClient.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response) {
        console.error('API error:', error.response.status, error.response.data);
    } else {
        console.error('Network error:', error.message);
    }
    return Promise.reject(error);
});

export default apiClient;
```

創建一個自定義 Hook

在 src 目錄下創建一個 useUserApi.js 文件：

```js
import { ref } from 'vue';
import apiClient from './apiClient';

export function useUserApi() {
    const userData = ref(null);
    const loading = ref(false);
    const error = ref(null);

    const fetchUser = async (userId) => {
        loading.value = true;
        error.value = null;
        try {
            const response = await apiClient.get(`/users/${userId}`);
            userData.value = response.data;
        } catch (err) {
            error.value = err;
        } finally {
            loading.value = false;
        }
    };

    return { userData, loading, error, fetchUser };
}
```

使用自定義 Hook
在你的 Vue 元件中使用自定義 Hook 來進行用戶相關的 API 請求：

```vue
<template>
  <div>
    <button v-on:click="fetchUser(1)">Fetch User</button>
    <div v-if="loading">Loading...</div>
    <div v-if="error">Error: {{ error.message }}</div>
    <pre v-if="userData">{{ userData }}</pre>
  </div>
</template>

<script setup>
import { useUserApi } from './useUserApi';

const { userData, loading, error, fetchUser } = useUserApi();
</script>
```
