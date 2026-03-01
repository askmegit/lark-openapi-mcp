import * as lark from '@larksuiteoapi/node-sdk';
import { McpTool } from '../../../../types';
import { z } from 'zod';

// 工具名称类型
export type sheetsBuiltinToolName = 'sheets.v2.spreadsheetValues.get';

export const larkSheetsV2SpreadsheetValuesGetTool: McpTool = {
  project: 'sheets',
  name: 'sheets.v2.spreadsheetValues.get',
  accessTokens: ['user', 'tenant'],
  description: '[飞书/Lark]-电子表格-读取单个范围单元格值-支持应用令牌或用户令牌',
  schema: {
    path: z.object({
      spreadsheetToken: z.string().describe('表格 URL 中的 spreadsheetToken，例如 RCYgsJoMchKaq8twdMMcBFDhnkb'),
    }),
    params: z.object({
      range: z.string().describe('A1 表示法范围，例如 lJX6Hy!A1:Z100'),
    }),
    query: z
      .object({
        valueRenderOption: z.string().describe('单元格值渲染方式').optional(),
        dateTimeRenderOption: z.string().describe('日期时间渲染方式').optional(),
      })
      .optional(),
    useUAT: z.boolean().describe('是否使用用户身份请求，否则使用应用身份').optional(),
  },
  customHandler: async (client, toolParams, options): Promise<any> => {
    try {
      const { path, params, query, useUAT } = toolParams;
      const { userAccessToken } = options || {};
      const url = `/open-apis/sheets/v2/spreadsheets/${encodeURIComponent(path.spreadsheetToken)}/values/${encodeURIComponent(params.range)}`;
      const response =
        userAccessToken && useUAT
          ? await client.request({ method: 'GET', url, params: query }, lark.withUserAccessToken(userAccessToken))
          : await client.request({ method: 'GET', url, params: query });
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(response.data ?? response),
          },
        ],
      };
    } catch (error) {
      return {
        isError: true,
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify((error as any)?.response?.data || error),
          },
        ],
      };
    }
  },
};

export const sheetsBuiltinTools = [larkSheetsV2SpreadsheetValuesGetTool];
