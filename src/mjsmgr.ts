import {readdirSync} from 'fs';
import {Bot} from 'mirai-js';

import {init} from './console';
import {JSPlugin} from './type';

/**
 * @description 获得所有插件。
 * @param dir 要指定的目录，该目录下的内容将被导入。
 */
async function getPlugins(dir: string): Promise<JSPlugin[]> {
  const pluginList: string[] = readdirSync(dir);
  const pl: JSPlugin[] = [];
  for (const data of pluginList) {
    console.info(`已加载插件 ${data}`);
    pl.push((await import(`${dir}/${data}`)) as JSPlugin);
  }
  console.info(`共加载 ${pl.length} 个插件`);
  return pl;
}

// 初期化。
(async(): Promise<void> => {
  const _VERSION = '1.1.1';
  const plugins: JSPlugin[] = await getPlugins('./plugins');
  console.info = console.info.bind(null, '[Info]');
  console.error = console.error.bind(null, '[Error]');

  console.info(`Mirai-js extension manager(mjsmgr) v ${_VERSION} by FurryR`);
  console.info('此项目基于 AGPLv3 开源协议。');
  console.info('Copyright(c) 2022 FurryR.');
  console.info('项目地址：https://github.com/FurryR/mjsmgr');
  console.info('我们期待着您的star。');
  if (process.argv[2] == '--help') {
    console.log('使用方法：smem [baseUrl] [verifyKey] [QQ]');
    console.log('baseUrl: HTTP API地址');
    console.log('verifyKey: 验证token');
    console.log('QQ: bot的QQ号');
    process.exit(0);
  }
  if (process.argv.length != 5) {
    console.error('参数缺失。');
    process.exit(1);
  }

  // 实际启动。
  const bot: Bot = new Bot();
  bot.open({
    baseUrl: process.argv[2],
    verifyKey: process.argv[3],
    qq: parseInt(process.argv[4])
  });
  let _lastGroup = 0;
  bot.on('GroupMessage', async data => {
    if (data.sender.group.id != _lastGroup) {
      if (_lastGroup != 0) console.log('\r}');
      _lastGroup = data.sender.group.id;
      console.log(`\r${data.sender.group.id}(${data.sender.group.name}): {`);
    }
    let str = `\r  ${data.sender.id}(${data.sender.memberName}): ${
        JSON.stringify(data.messageChain)}`;
    let x: JSPlugin = {pluginFunc: async () => false, pluginName: ''};
    try {
      let temp = '';
      for (x of plugins) {
        if (await x.pluginFunc(bot, data) === true)
          temp += `'${x.pluginName}' `;
      }
      if (temp !== '') str += ` // 插件 ${temp}被触发`;
    } catch (e) {
      str += ` // 错误：插件 '${x.pluginName}' 发生错误 ${e}`;
    }
    console.log(str);
    process.stdout.write('\r}');
  });

  // 控制台支持

  init(bot, plugins, getPlugins);
})();