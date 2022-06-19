import {Bot, Message, Middleware} from 'mirai-js';

import {JSPluginFunc} from '../src/type';

export const pluginName = 'ping';
export const pluginFunc: JSPluginFunc =
    async(bot: Bot, data: object): Promise<boolean> => {
  return await new Middleware().textProcessor().done(async data => {
    if (data.text == '/ping') {
      await bot.sendMessage(
          {group: data.sender.group.id, message: new Message().addText('Hi!')});
      return true;
    }
  })(data);
};