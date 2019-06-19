<p align="center">
  <a href="http://ant.design">
    <img width="400" src="./assets/upyun-js.svg">
  </a>
</p>

<!-- <h1 align="center">Dubo CLI</h1> -->

<div align="center">
upyun-js 是对 <a href='https://github.com/upyun/node-sdk'>又拍云 js sdk </a>的二次封装。

 ![languuage](https://img.shields.io/badge/language-node-gcf.svg) [![npm package](https://img.shields.io/npm/v/upyun-js.svg?style=flat-square)](https://www.npmjs.com/package/dubo-cli) [![NPM downloads](http://img.shields.io/npm/dm/upyun-js.svg?style=flat-square)](https://www.npmjs.com/package/upyun-js) ![license](https://img.shields.io/badge/license-Anti%20996-99ccff.svg)
</div>

简体中文 | [English](./README-en.md)

## ✨ 特性

- 提供更为友好的接口
- 新增对目录的 CRUD 操作

## 📦 安装

```bash
npm install upyun-js
```

## 🔨 接口

### 初始化

```js
const Upyun = require('upyun-js');
const config = {
  serviceName: 'upyun service',
  operatorName: 'upyun operator',
  operatorPassword: 'upyun password'
};

const upyun = new Upyun(config);
```

### 下载文件 upyun.downloadFile

```js
/**
  * @param {String} remotePath // 远程文件路径
  * @param {String} localPath // 本地文件夹
  * @return {Promise}
  */
upyun.downloadFile(remotePath, localPath);
```

### 下载文件夹 upyun.downloadDir

```js
/**
 * @param {String} remotePath: 远程文件夹
 * @param {String} localPath: 本地文件夹
 * @return {Promise}
*/
upyun.downloadDir(remotePath, localPath);
```

### 上传文件 upyun.uploadFile

```js
/**
 * @param {String} remotePath: 远程文件夹
 * @param {String} localFile: 本地文件
 * @return {Promise}
*/
upyun.uploadFile(remotePath, localFile, opts);
```

### 上传文件夹 upyun.uploadDir

```js
/**
 * @param {String} remotePath: 远程文件夹
 * @param {String} localPath: 本地文件夹
 * @return {Promise}
*/
upyun.uploadDir(remotePath, localPath);
```

### 删除文件 upyun.rmfile

```js
/**
 * @param {String} remoteFile: 远程文件
 * @return {Boolean}
*/
upyun.rmfile(remoteFile);
```

### 删除文件夹 upyun.rmdir

```js
/**
 * @param {String} dirname: 远程文件夹
 * @return {Boolean}
*/
upyun.rmdir(dirname);
```

### 创建文件夹 upyun.mkdir

```js
/**
 * @param {String} remotePath: 远程路径
 * @return {Any}
*/
upyun.mkdir(remotePath);
```

### 缓存刷新 upyun.refresh

```js
/**
 * @param {Array<String>} urls: 待刷新的远程文件数组
 * @return {Promise}
*/
upyun.refresh(urls);
```

### 获取文件基本信息 upyun.getFileMeta

```js
/**
 * @param {String} remotePath: 远程文件
 * @return {Promise}
*/
upyun.getFileMeta(remotePath);
```

### 查看目录大小 upyun.usage

```js
/**
 * @param {String} remotePath: 远程目录
 * @return {Promise}
*/
upyun.usage(remotePath);
```

### 获取目录下的文件列表 upyun.listDir

```js
/**
 * @param {String} remotePath: 远程目录
 * @param {Object} opts: 获取列表数据可选的 limit、order 或 iter 值
 * @return {Promise}
*/
upyun.listDir(remotePath, opts);
```
