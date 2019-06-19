<p align="center">
  <a href="http://ant.design">
    <img width="400" src="./assets/upyun-js.svg">
  </a>
</p>

<!-- <h1 align="center">Dubo CLI</h1> -->

<div align="center">

upyun-js is secondary encapsulation for [upyun js sdk](https://github.com/upyun/node-sdk).

 ![languuage](https://img.shields.io/badge/language-node-gcf.svg) [![npm package](https://img.shields.io/npm/v/upyun-js.svg?style=flat-square)](https://www.npmjs.com/package/dubo-cli) [![NPM downloads](http://img.shields.io/npm/dm/upyun-js.svg?style=flat-square)](https://www.npmjs.com/package/upyun-js) ![license](https://img.shields.io/badge/license-Anti%20996-99ccff.svg)

</div>

[简体中文](./README.md) | English

## ✨ Features

- Support more friendly interface
- addition to CRUD for directory

## 📦 Install

```bash
npm install upyun-js
```

## 🔨 Interfaces

### Initialization

```js
const Upyun = Iequire('upyun-js');
const config = {
  serviceName: 'upyun service',
  operatorName: 'upyun operator',
  operatorPassword: 'upyun password'
};

const upyun = new Upyun(config);
```

### Download file: upyun.downloadFile

```js
/**
  * @param {String} remotePath // 远程文件路径
  * @param {String} localPath // 本地文件夹
  * @return {Promise}
  */
upyun.downloadFile(remotePath, localPath);
```

### Download directory: upyun.downloadDir

```js
/**
 * @param {String} remotePath: 远程文件夹
 * @param {String} localPath: 本地文件夹
 * @return {Promise}
*/
upyun.downloadDir(remotePath, localPath);
```

### Upload file: upyun.uploadFile

```js
/**
 * @param {String} remotePath: 远程文件夹
 * @param {String} localFile: 本地文件
 * @return {Promise}
*/
upyun.uploadFile(remotePath, localFile, opts);
```

### Upload direactory: upyun.uploadDir

```js
/**
 * @param {String} remotePath: 远程文件夹
 * @param {String} localPath: 本地文件夹
 * @return {Promise}
*/
upyun.uploadDir(remotePath, localPath);
```

### Remove file: upyun.rmfile

```js
/**
 * @param {String} remoteFile: 远程文件
 * @return {Boolean}
*/
upyun.rmfile(remoteFile);
```

### Remove directory: upyun.rmdir

```js
/**
 * @param {String} dirname: 远程文件夹
 * @return {Boolean}
*/
upyun.rmdir(dirname);
```

### Create directory: upyun.mkdir

```js
/**
 * @param {String} remotePath: 远程路径
 * @return {Any}
*/
upyun.mkdir(remotePath);
```

### Refresh cache: upyun.refresh

```js
/**
 * @param {Array<String>} urls: 待刷新的远程文件数组
 * @return {Promise}
*/
upyun.refresh(urls);
```

### Get file's meta: upyun.getFileMeta

```js
/**
 * @param {String} remotePath: 远程文件
 * @return {Promise}
*/
upyun.getFileMeta(remotePath);
```

### View usage of directory: upyun.usage

```js
/**
 * @param {String} remotePath: 远程目录
*/
upyun.usage(remotePath);
```

### Get file list of the directory: upyun.listDir

```js
/**
 * @param {String} remotePath: 远程目录
 * @param {Object} opts: 获取列表数据可选的 limit、order 或 iter 值
*/
upyun.listDir(remotePath, opts);
```

## 🐤 Related

[upyun js sdk](https://github.com/upyun/node-sdk)

[upyun-webpack-plugin](https://github.com/TerenYeung/upyun-webpack-plugin)