import {Bot, Message} from 'mirai-js';
import {createInterface, Interface} from 'readline';
import {JSPlugin} from './type';

/**
 * @description 将权限转为字符串。
 * @param perm 权限字符串。
 */
function perm2str(perm: string): string {
  switch (perm) {
  case Bot.groupPermission.OWNER:
    return '群主';
  case Bot.groupPermission.ADMINISTRATOR:
    return '管理员';
  case Bot.groupPermission.MEMBER:
    return '群成员';
  default:
    return '未知';
  }
}
/**
 * @description 负责处理请求。
 * @param bot bot对象。
 * @param plugins 插件表。
 * @param getPlugins 获得插件的函数。
 * @param input 用户输入。
 */
async function handler(
  bot: Bot, plugins: JSPlugin[], getPlugins: (dir: string) => Promise<JSPlugin[]>,
  input: string): Promise<void> {
  const cmd: string[] = input.split(' ');
  switch (cmd[0]) {
  case 'stop':
  case 'exit': {
    console.log('停止');
    process.exit(0);
    break;
  }
  case 'help': {
    console.table({
      'help': '显示帮助',
      'stop (aka exit)': '停止插件管理器',
      'reload': '重新加载插件',
      'send':
            '(要求参数mode,id,text) 向QQ号为 id 的 群聊(mode=group)/好友(mode=friend) 发送 text',
      'list': '(要求参数mode) 显示所有群聊(mode=group)/好友(mode=friend)'
    });
    break;
  }
  case 'reload': {
    console.info('Plugins reloading');
    plugins = await getPlugins('./plugins');
    console.info('Plugins reloaded');
    break;
  }
  case 'send': {
    if (cmd.length != 4)
      console.log(`要求 3 个参数但提供了 ${cmd.length - 1} 个`);
    switch (cmd[1]) {
    case 'friend': {
      await bot.sendMessage({
        friend: parseInt(cmd[2]),
        message: new Message().addText(cmd[3])
      });
      break;
    }
    case 'group': {
      await bot.sendMessage({
        group: parseInt(cmd[2]),
        message: new Message().addText(cmd[3])
      });
      break;
    }
    default: {
      console.log('mode 必须为 group 或 friends');
      break;
    }
    }
    break;
  }
  case 'list': {
    if (cmd.length != 2)
      console.log(`要求 1 个参数但提供了 ${cmd.length - 1} 个`);
    switch (cmd[1]) {
    case 'group': {
      const d: Bot.GroupInfo[] = await bot.getGroupList();
      let t: Map<string, string>;
      d.forEach((data) => {
        t.set(`${data.id}(${data.name})`, perm2str(data.permission));
      });
      console.table(Object.fromEntries(t.entries()));
      break;
    }
    case 'friend': {
      const d: Bot.FriendInfo[] = await bot.getFriendList();
      let t: Map<string, string>;
      d.forEach((data) => {
        t.set(`${data.id}(${data.name})`, data.remark);
      });
      console.table(Object.fromEntries(t.entries()));
      break;
    }
    default: {
      console.log('mode 必须为 group 或 friends');
      break;
    }
    }
    break;
  }
  default: {
    console.log(`未知的命令 ${cmd[0]}. 输入 'help' 来获得帮助。`);
  }
  }
}
/**
 * @description 负责调用handler并要求下一次输入。
 * @param std 输入流。
 * @param bot bot对象。
 * @param plugins 插件表。
 * @param getPlugins 获得插件的函数。
 * @param input 用户输入。
 */
function _handler(
  std: Interface, bot: Bot, plugins: 
JSPlugin[],
  getPlugins: (dir: string) => Promise<
JSPlugin[]>, input: string): Promise<void> {
  return handler(bot, plugins, getPlugins, input).then((): void => {
    std.question(
      '> ',
      _handler.bind(
        null,
        std,
        bot,
        plugins,
        getPlugins,
      ));
  });
}
/**
 * @description 初始化控制台。
 * @param bot bot对象。
 * @param plugins 插件表。
 * @param getPlugins 获得插件的函数。
 */
function init(
  bot: Bot, plugins: JSPlugin[], getPlugins: (dir: string) => Promise<JSPlugin[]>): void {
  const std: Interface =
      createInterface({input: process.stdin, output: process.stdout});
  std.on('close', () => {
    console.info('Stopping');
    process.exit(0);
  });
  std.question('> ', _handler.bind(null, std, bot, plugins, getPlugins));
}
export {init};