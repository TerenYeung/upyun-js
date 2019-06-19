const fs = require("fs"),
  upyun = require("upyun"),
  utils = require("./utils"),
  chalk = require("chalk"),
  path = require("path");

class Upyun {
  constructor(opts) {
    const {
      serviceName,
      operatorName,
      operatorPassword,
      localPath,
      remotePath,
      onSuccess,
      onError,
      confirm,
      config
    } = opts;

    this.serviceName = serviceName || "";
    this.operatorName = operatorName || "";
    this.operatorPwd = operatorPassword || "";
    this.onSuccess = onSuccess || (() => {});
    this.onError = onError || (() => {});
    this.confirm = confirm || true;
    this.config = config || {
      domain: "v0.api.upyun.com",
      protocal: "https",
      proxy: undefined
    };

    this.service = new upyun.Service(
      this.serviceName,
      this.operatorName,
      this.operatorPwd,
      this.config
    );
    this.client = new upyun.Client(this.service);
  }

  async uploadFile(remotePath, localFile, opts = {}) {
    const remoteFile = `${remotePath}/${path.parse(localFile).base}`;

    return this.client
      .putFile(remoteFile, utils.readFile(localFile), opts)
      .then(() => {
        console.log(`🎉  ${chalk.cyan(`Upload file succeed: ${localFile}`)}`);
        return Promise.resolve(true);
      })
      .catch(() => {
        console.log(`🤣  ${chalk.red(`Upload file fails: ${localFile}`)}`);
        return Promise.resolve(false);
      });
  }

  async uploadDir(remotePath, localPath, opts = {}) {
    if (utils.isDirectory(localPath)) {
      // 1. 读取路径下所有文件并拼装成一个文件路径数组
      // 2. 依次调用上传文件接口，上传文件
      // 3. 等到所有文件上传完成后，再进行后续的回调操作
      const fileList = fs
        .readdirSync(localPath)
        .map(item => `${localPath}/${item}`);

      const promises = fileList.map(async (pathname) => {
        return this.uploadFile(
          `${remotePath}/${path.parse(localPath).base}`,
          pathname
        );
      });

      return (await Promise.all(promises)).every(item => item === true);
    } else {
      return Promise.reject(false);
    }
  }

  // @todo
  async multipartUpload(remotePath, localPath, opts = {}) {
    const remoteFile = `${remotePath}/${path.parse(localPath).base}`;
    const localFile = utils.readFile(localPath);
    const init = await this.client.initMultipartUpload(
      remoteFile,
      localPath,
      opts
    );
    const status = await this.client.multipartUpload(
      remoteFile,
      localPath,
      init.uuid,
      init.partCount
    );

    if (status) {
      return this.client.completeMultipartUpload(remoteFile, init.uuid);
    } else {
      return Promise.resolve(false);
    }
  }

  async downloadFile(remotePath, localPath) {
    const data = await this.client.getFile(remotePath);

    if (!utils.exists(localPath)) {
      fs.mkdirSync(localPath);
    }

    const pathname = `${localPath}/${path.parse(remotePath).base}`;

    return fs.promises
      .writeFile(pathname, data)
      .then(() => {
        console.log(`🎉  ${chalk.cyan(`Download file succeed: ${pathname}`)}`);
        return Promise.resolve(true);
      })
      .catch(() => {
        console.log(`🤣  ${chalk.red(`Download file fails: ${pathname}`)}`);
        return Promise.resolve(false);
      });;
  }

  async downloadDir(remotePath, localPath, opts = {}) {
    let fileList = [];
    const res = await this.listDir(remotePath, opts);

    if (res && res.files instanceof Array) {
      res.files.forEach(file => {
        fileList.push(`${remotePath}/${file.name}`);
      });
    }

    const promises = fileList.map(path => {
      return this.downloadFile(path, localPath);
    });

    const data = await Promise.all(promises);
    if (data && data instanceof Array) {
      if (!utils.exists(localPath)) {
        fs.mkdirSync(localPath);
      }
    }

    const promises2 = res.files.map((file, index) => {
      const filename = `${localPath}/${file.name}`;
      return fs.promises
        .writeFile(filename, data[index])
        .then(() => Promise.resolve(true))
        .catch(() => Promise.resolve(false));
    });

    return (await Promise.all(promises2)).every(item => item === true);
  }

  async rmfile(remoteFile) {
    const ret = this.client.deleteFile(remoteFile);

    if (ret) {
      console.log(`🎉  ${chalk.cyan(`Remove file succeed: ${remoteFile}`)}`);
    } else {
      console.log(`🤣  ${chalk.red(`Remove file fails: ${remoteFile}`)}`);
    }
    return ret;
  }

  async rmdir(dirname) {
    let fileList = [];
    const res = await this.listDir(dirname);
    if (res && res.files instanceof Array) {
      res.files.forEach(file => {
        fileList.push(`${dirname}/${file.name}`);
      });
    }

    const promises = fileList.map(path => {
      return this.rmfile(path);
    });

    const ret = (await Promise.all(promises)).every(item => item === true);
    if (ret) {
      console.log(`🎉  ${chalk.cyan(`Remove directory succeed: ${dirname}`)}`);
    } else {
      console.log(`🤣  ${chalk.red(`Remove directory fails: ${dirname}`)}`);
    }
    return ret;
  }

  async mkdir(remotePath) {
    return this.client.makeDir(remotePath);
  }

  async refresh(urls) {
    return this.client.purge(urls);
  }

  async getFileMeta(remotePath) {
    return this.client.headFile(remotePath);
  }

  async usage(remotePath) {
    return this.client.usage(remotePath);
  }

  async listDir(remotePath, opts = {}) {
    return this.client.listDir(remotePath, opts);
  }
}

module.exports = Upyun;
