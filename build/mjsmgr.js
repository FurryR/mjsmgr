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
var fs_1 = require("fs");
var mirai_js_1 = require("mirai-js");
function getPlugins(dir) {
    var pluginList = (0, fs_1.readdirSync)(dir);
    var pl = [];
    pluginList.forEach(function (data) {
        var p = require("".concat(dir, "/").concat(data));
        console.info("\u5DF2\u52A0\u8F7D\u63D2\u4EF6 ".concat(data));
        pl.push({ func: p.pluginFunc, name: p.pluginName });
    });
    console.info("\u5171\u52A0\u8F7D ".concat(pl.length, " \u4E2A\u63D2\u4EF6"));
    return pl;
}
var plugins = getPlugins('./plugins');
console.info = console.info.bind(null, '[Info]');
console.error = console.error.bind(null, '[Error]');
console.info("Mirai-js extension manager(mjsmgr) by FurryR");
console.info("\u6B64\u9879\u76EE\u57FA\u4E8E AGPLv3 \u5F00\u6E90\u534F\u8BAE\u3002");
console.info("Copyright(c) 2022 FurryR.");
console.info("\u9879\u76EE\u5730\u5740\uFF1Ahttps://github.com/FurryR/mjsmgr");
console.info("\u6211\u4EEC\u671F\u5F85\u7740\u60A8\u7684star\u3002");
if (process.argv[1] == '--help') {
    console.log('使用方法：smem [baseUrl] [verifyKey] [QQ]');
    console.log('baseUrl: HTTP API地址');
    console.log('verifyKey: 验证token');
    console.log('QQ: bot的QQ号');
    process.exit(0);
}
console.log(process.argv);
if (process.argv.length != 5) {
    console.error('参数缺失。');
    process.exit(1);
}
var bot = new mirai_js_1.Bot();
bot.open({
    baseUrl: process.argv[2],
    verifyKey: process.argv[3],
    qq: parseInt(process.argv[4])
});
var _lastGroup = 0;
bot.on('GroupMessage', function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var str, x, _i, plugins_1, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (data.sender.group.id != _lastGroup) {
                    if (_lastGroup != 0)
                        console.log('\r}');
                    _lastGroup = data.sender.group.id;
                    console.log("\r".concat(data.sender.group.id, "(").concat(data.sender.group.name, "): {"));
                }
                str = "\r  ".concat(data.sender.id, "(").concat(data.sender.memberName, "): ").concat(JSON.stringify(data.messageChain));
                x = { func: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2, false];
                    }); }); }, name: '' };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                str += ' // 插件 ';
                _i = 0, plugins_1 = plugins;
                _a.label = 2;
            case 2:
                if (!(_i < plugins_1.length)) return [3, 5];
                x = plugins_1[_i];
                return [4, x.func(bot, data)];
            case 3:
                if ((_a.sent()) === true)
                    str += "'".concat(x.name, "' ");
                _a.label = 4;
            case 4:
                _i++;
                return [3, 2];
            case 5:
                str += '被触发';
                return [3, 7];
            case 6:
                e_1 = _a.sent();
                str += " // \u9519\u8BEF\uFF1A\u63D2\u4EF6 '".concat(x.name, "' \u53D1\u751F\u9519\u8BEF ").concat(e_1);
                return [3, 7];
            case 7:
                console.log(str);
                process.stdout.write('\r}');
                return [2];
        }
    });
}); });
var console_1 = require("./console");
(0, console_1.init)(bot, plugins, getPlugins);
