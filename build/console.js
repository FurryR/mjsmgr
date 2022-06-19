"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.init = void 0;
var mirai_js_1 = require("mirai-js");
var readline_1 = require("readline");
function perm2str(perm) {
    switch (perm) {
        case mirai_js_1.Bot.groupPermission.OWNER:
            return '群主';
        case mirai_js_1.Bot.groupPermission.ADMINISTRATOR:
            return '管理员';
        case mirai_js_1.Bot.groupPermission.MEMBER:
            return '群成员';
        default:
            return '未知';
    }
}
function handler(bot, plugins, getPlugins, input) {
    return __awaiter(this, void 0, void 0, function () {
        var cmd, _a, _b, _c, d, t_1, d, t_2;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    cmd = input.split(' ');
                    _a = cmd[0];
                    switch (_a) {
                        case 'stop': return [3, 1];
                        case 'exit': return [3, 1];
                        case 'help': return [3, 2];
                        case 'reload': return [3, 3];
                        case 'send': return [3, 5];
                        case 'list': return [3, 12];
                    }
                    return [3, 19];
                case 1:
                    {
                        console.log('停止');
                        process.exit(0);
                        return [3, 20];
                    }
                    _d.label = 2;
                case 2:
                    {
                        console.table({
                            'help': '显示帮助',
                            'stop (aka exit)': '停止插件管理器',
                            'reload': '重新加载插件',
                            'send': '(要求参数mode,id,text) 向QQ号为 id 的 群聊(mode=group)/好友(mode=friend) 发送 text',
                            'list': '(要求参数mode) 显示所有群聊(mode=group)/好友(mode=friend)'
                        });
                        return [3, 20];
                    }
                    _d.label = 3;
                case 3:
                    console.info('Plugins reloading');
                    return [4, getPlugins('./plugins')];
                case 4:
                    plugins = _d.sent();
                    console.info('Plugins reloaded');
                    return [3, 20];
                case 5:
                    if (cmd.length != 4)
                        console.log("\u8981\u6C42 3 \u4E2A\u53C2\u6570\u4F46\u63D0\u4F9B\u4E86 ".concat(cmd.length - 1, " \u4E2A"));
                    _b = cmd[1];
                    switch (_b) {
                        case 'friend': return [3, 6];
                        case 'group': return [3, 8];
                    }
                    return [3, 10];
                case 6: return [4, bot.sendMessage({
                        friend: parseInt(cmd[2]),
                        message: new mirai_js_1.Message().addText(cmd[3])
                    })];
                case 7:
                    _d.sent();
                    return [3, 11];
                case 8: return [4, bot.sendMessage({
                        group: parseInt(cmd[2]),
                        message: new mirai_js_1.Message().addText(cmd[3])
                    })];
                case 9:
                    _d.sent();
                    return [3, 11];
                case 10:
                    {
                        console.log('mode 必须为 group 或 friends');
                        return [3, 11];
                    }
                    _d.label = 11;
                case 11: return [3, 20];
                case 12:
                    if (cmd.length != 2)
                        console.log("\u8981\u6C42 1 \u4E2A\u53C2\u6570\u4F46\u63D0\u4F9B\u4E86 ".concat(cmd.length - 1, " \u4E2A"));
                    _c = cmd[1];
                    switch (_c) {
                        case 'group': return [3, 13];
                        case 'friend': return [3, 15];
                    }
                    return [3, 17];
                case 13: return [4, bot.getGroupList()];
                case 14:
                    d = _d.sent();
                    d.forEach(function (data) {
                        t_1.set("".concat(data.id, "(").concat(data.name, ")"), perm2str(data.permission));
                    });
                    console.table(Object.fromEntries(t_1.entries()));
                    return [3, 18];
                case 15: return [4, bot.getFriendList()];
                case 16:
                    d = _d.sent();
                    d.forEach(function (data) {
                        t_2.set("".concat(data.id, "(").concat(data.name, ")"), data.remark);
                    });
                    console.table(Object.fromEntries(t_2.entries()));
                    return [3, 18];
                case 17:
                    {
                        console.log('mode 必须为 group 或 friends');
                        return [3, 18];
                    }
                    _d.label = 18;
                case 18: return [3, 20];
                case 19:
                    {
                        console.log("\u672A\u77E5\u7684\u547D\u4EE4 ".concat(cmd[0], ". \u8F93\u5165 'help' \u6765\u83B7\u5F97\u5E2E\u52A9\u3002"));
                    }
                    _d.label = 20;
                case 20: return [2];
            }
        });
    });
}
function _handler(std, bot, plugins, getPlugins, input) {
    return handler(bot, plugins, getPlugins, input).then(function () {
        std.question('> ', _handler.bind(null, std, bot, plugins, getPlugins));
    });
}
function init(bot, plugins, getPlugins) {
    var std = (0, readline_1.createInterface)({ input: process.stdin, output: process.stdout });
    std.on('close', function () {
        console.info('Stopping');
        process.exit(0);
    });
    std.question('> ', _handler.bind(null, std, bot, plugins, getPlugins));
}
exports.init = init;
