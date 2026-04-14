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
    description: '[Feishu/Lark]-Sheets-Read cell values-Read values in a single spreadsheet range (supports app token or user token)',
    schema: {
        path: zod_1.z.object({
            spreadsheetToken: zod_1.z.string().describe('Spreadsheet token in URL, e.g. RCYgsJoMchKaq8twdMMcBFDhnkb'),
        }),
        params: zod_1.z.object({
            range: zod_1.z.string().describe('Range in A1 notation, e.g. lJX6Hy!A1:Z100'),
        }),
        query: zod_1.z
            .object({
            valueRenderOption: zod_1.z.string().describe('How to render cell values').optional(),
            dateTimeRenderOption: zod_1.z.string().describe('How to render date/time values').optional(),
        })
            .optional(),
        useUAT: zod_1.z.boolean().describe('Use user identity for the request, otherwise use application identity').optional(),
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
