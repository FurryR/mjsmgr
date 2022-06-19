import {Bot} from 'mirai-js';
/**
 * @description 对JS插件实际函数的类型声明。
 */
type JSPluginFunc = (bot: Bot, data: object) => Promise<boolean>;
/**
 * @description 对JS插件的接口声明。
 */
interface JSPlugin {
  pluginFunc: JSPluginFunc, pluginName: string
}
export {JSPluginFunc, JSPlugin};