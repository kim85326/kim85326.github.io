#### JSON 與 JavaScript 物件轉換

JSON 格式的字串 -> JavaScript 物件，使用 `JSON.parse`

```js
const jsonStr = `{"name": "elaine", "age": 18}`;
const obj = JSON.parse(jsonStr);
```

JavaScript 物件 -> JSON 格式的字串，使用 `JSON.stringify`

```js
const obj = {
    name: "elaine",
    age: 18
}
const jsonStr = JSON.stringify(obj);
```
    
#### 跨網域時帶上 cookie

##### XHR  

```js
xhr.withCredentials = true
```
