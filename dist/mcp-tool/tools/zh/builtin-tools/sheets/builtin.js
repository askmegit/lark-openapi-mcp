"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.sheetsBuiltinTools = exports.larkSheetsV2SpreadsheetValuesGetTool = void 0;
const lark = __importStar(require("@larksuiteoapi/node-sdk"));
const zod_1 = require("zod");
exports.larkSheetsV2SpreadsheetValuesGetTool = {
    project: 'sheets',
    name: 'sheets.v2.spreadsheetValues.get',
    accessTokens: ['user', 'tenant'],
    description: '[飞书/Lark]-电子表格-读取单个范围单元格值-支持应用令牌或用户令牌',
    schema: {
        path: zod_1.z.object({
            spreadsheetToken: zod_1.z.string().describe('表格 URL 中的 spreadsheetToken，例如 RCYgsJoMchKaq8twdMMcBFDhnkb'),
        }),
        params: zod_1.z.object({
            range: zod_1.z.string().describe('A1 表示法范围，例如 lJX6Hy!A1:Z100'),
        }),
        query: zod_1.z
            .object({
            valueRenderOption: zod_1.z.string().describe('单元格值渲染方式').optional(),
            dateTimeRenderOption: zod_1.z.string().describe('日期时间渲染方式').optional(),
        })
            .optional(),
        useUAT: zod_1.z.boolean().describe('是否使用用户身份请求，否则使用应用身份').optional(),
    },
    customHandler: async (client, toolParams, options) => {
        var _a, _b;
        try {
            const { path, params, query, useUAT } = toolParams;
            const { userAccessToken } = options || {};
            const url = `/open-apis/sheets/v2/spreadsheets/${encodeURIComponent(path.spreadsheetToken)}/values/${encodeURIComponent(params.range)}`;
            const response = userAccessToken && useUAT
                ? await client.request({ method: 'GET', url, params: query }, lark.withUserAccessToken(userAccessToken))
                : await client.request({ method: 'GET', url, params: query });
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify((_a = response.data) !== null && _a !== void 0 ? _a : response),
                    },
                ],
            };
        }
        catch (error) {
            return {
                isError: true,
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify(((_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.data) || error),
                    },
                ],
            };
        }
    },
};
exports.sheetsBuiltinTools = [exports.larkSheetsV2SpreadsheetValuesGetTool];
