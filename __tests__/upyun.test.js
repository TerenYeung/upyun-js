const Upyun = require('../src/upyun');
const path = require('path');

/**
 * @description
 * 首先需要用户拥有自己的又拍云账号，然后将获取自己的又拍云服务器名、操作员和密码设置进入环境变量；
 */
const config = {
  serviceName: process.env.UPYUN_SERVICE,
  operatorName: process.env.UPYUN_OPERATOR,
  operatorPassword: process.env.UPYUN_PASSWD
};

const remotePath = '/github';
const localAssets = path.resolve(__dirname, './local_assets');
const remoteAssets = path.resolve(__dirname, './remote_assets');
const timeout = 300000;
const upyun = new Upyun(config);

describe('Download file(s) function', () => {
  test('downloadFile function', async () => {
    const remotePath = '/github/dubo-cli.svg';
    await expect(upyun.downloadFile(remotePath, remoteAssets)).resolves.toBe(true);
  }, timeout);

  test('downloadFiles function', async () => {
    await expect(upyun.downloadDir(remotePath, remoteAssets)).resolves.toBe(true);
  }, timeout);
});

describe('Upload file(s) function', () => {
  test('uploadFile function', async () => {
    const localFile = path.resolve(localAssets, 'world.txt');

    await expect(upyun.uploadFile(remotePath, localFile)).resolves.toBe(true);
  }, timeout);

  test('uploadDir function', async () => {

    await expect(upyun.uploadDir(remotePath, localAssets)).resolves.toBe(true);
  }, timeout);

  // test('multipartUplad', async () => {
  //   const localFile = `${localAssets}/bg.mp3`;
  //   const res = upyun.multipartUpload(remotePath, localFile);
  // });
});

describe('Remove files(s) function', () => {
  test('rmfile function', async () => {
    const testFile = `${remotePath}/local_assets/world.txt`;
    await expect(upyun.rmfile(testFile)).resolves.toBe(true);
  });

  test('rmdir function', async () => {
    const testDir = '/github/local_assets';
    await expect(upyun.rmdir(testDir)).resolves.toBe(true);
  });
})

describe('Directory operation', () => {
  test('mkdir function', async () => {
    const testDir = '/assets';
    await expect(upyun.mkdir(testDir)).resolves.toBe(true);
  }, timeout);

  test('listDir function', async () => {
    const testDir = '/assets';
    await expect(upyun.listDir(remotePath)).toStrictEqual(expect.anything());
  });
});

describe('Refresh file function', () => {
  test('refresh function', async () => {
    await expect(upyun.refresh(remotePath)).resolves.toBe(true);
  });
});

describe('Others function', () => {
  test('getFileMeta function', async () => {
    const testFile = `${remotePath}/dubo-cli.svg`;
    await expect(upyun.getFileMeta(testFile)).resolves.toStrictEqual(expect.anything());
  });

  test('usage function', async () => {
    const ret = await upyun.usage(remotePath);
    expect(ret).toBeGreaterThanOrEqual(0);
  });
})
