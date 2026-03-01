import * as lark from '@larksuiteoapi/node-sdk';
import { McpTool } from '../../../../types';
import { z } from 'zod';

// Tool name type
export type sheetsBuiltinToolName = 'sheets.v2.spreadsheetValues.get';

export const larkSheetsV2SpreadsheetValuesGetTool: McpTool = {
  project: 'sheets',
  name: 'sheets.v2.spreadsheetValues.get',
  accessTokens: ['user', 'tenant'],
  description:
    '[Feishu/Lark]-Sheets-Read cell values-Read values in a single spreadsheet range (supports app token or user token)',
  schema: {
    path: z.object({
      spreadsheetToken: z.string().describe('Spreadsheet token in URL, e.g. RCYgsJoMchKaq8twdMMcBFDhnkb'),
    }),
    params: z.object({
      range: z.string().describe('Range in A1 notation, e.g. lJX6Hy!A1:Z100'),
    }),
    query: z
      .object({
        valueRenderOption: z.string().describe('How to render cell values').optional(),
        dateTimeRenderOption: z.string().describe('How to render date/time values').optional(),
      })
      .optional(),
    useUAT: z.boolean().describe('Use user identity for the request, otherwise use application identity').optional(),
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
