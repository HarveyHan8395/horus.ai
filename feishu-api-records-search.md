以下说明用于调用飞书多维表格查询记录API

### **1. 接口基础信息（飞书多维表格查询记录API）**
- **功能**：查询多维表格中存储的新闻记录，支持分页、过滤、排序。
- **HTTP URL**：`https://open.feishu.cn/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/search`
- **HTTP方法**：`POST`
- **速率限制**：20次/秒
- **核心用途**：从飞书多维表格中获取新闻资讯数据（如新闻标题、发布机构、发布时间等）。


### **2. 认证与请求头**
- **请求头必填参数**：
  - `Authorization`：格式为 `Bearer <access_token>`，使用`tenant_access_token`（以应用身份调用，示例：`Bearer t-g1044qeGEDXTB6NDJOGV4JQCYDGHRBARFTGT1234`）。
    - "tenant_access_token":"t-g1048j0N22MJ2IR5JG53C6BRBRHJOHYRQLROLLBQ"
  - `Content-Type`：固定值 `application/json; charset=utf-8`。


### **3. 路径参数**
1. 中国管制/制裁
- `app_token`："C3tXbZ9hoatPFrsw9v5cwZdlnog"  
  示例值：`"bascnj1LMH2tmdifXvWVq05sTyd"`。
- `table_id`："tblxws3UgH8PrLNk" 
2. 外国管制/制裁
- `app_token`："Bkasbun8ua4fQ6suGjvcKGT3nre"  
- `table_id`："tbl6aOnlKdxnVqj6" 
3. 数据合规/人工智能
- `app_token`："MxkwbaX9ia5W7Xsaw9gc1UZdnQd"  
- `table_id`："tblYatZd4nlatmkA" 
4. 外国媒体报道
- `app_token`："TmgwbOtkfaNbUZsg0qxceZArngg"  
- `table_id`："tblIN0LGHKo5jNPF" 




### **4. 查询参数（分页与用户ID设置）**
- `user_id_type`：可选，默认`open_id`（无需修改，因新闻数据通常不涉及用户ID关联）。
- `page_token`：分页标识，首次请求不填；后续请求使用上一次响应中的`page_token`获取下一页数据。
- `page_size`：每页返回的新闻记录数，最大500，建议设为`20`（默认值），可根据前端分页需求调整。


### **5. 请求体参数（核心：新闻数据筛选与返回字段）**
#### **5.1 新闻记录的表格结构**

| 字段名          | 类型       | 说明                          |
|-----------------|------------|-------------------------------|
| `新闻标题-中文`   | 文本       | 新闻标题（必填）              |
| `发布机构`       | 文本   | 新闻正文                      |
| `配置列-仅日期`  | 文本   | 发布时间（格式：yyyy-mm-dd）    |
| `AI 总结`  | 文本   | 新闻摘要总结    |
| `原文链接`       | 文本   | 原文链接    |
| `行业分类`      | array<string>       | 行业分类   |
| `相关性判断`    | 文本     | 是否相关    |
| `role`        | 文本       | 发布角色                        |
| `发布时间-北京-database`        | number       | 发布时间（Unix 时间戳，单位是毫秒）                      |

#### **5.2 需配置的请求体参数**
- `field_names`：指定返回的新闻字段。
  需要返回的字段为：`["新闻标题-中文", "发布机构", "配置列-仅日期", "AI 总结", "原文链接", "行业分类", "相关性判断", "role"]`。
- `filter`：过滤条件（只获取相关的新闻，即只有当`相关性判断`为`相关`时才返回）。  
  示例：`{"conditions": [{"field_name": "相关性判断", "operator": "is", "value": ["相关"]}]}`。
- `sort`：排序规则（按`发布时间-北京-database`倒序，最新新闻优先）。  
  示例：`[{"field_name": "发布时间-北京-database", "desc": "true"}]`。
- `automatic_fields`：是否返回自动字段（创建时间、修改人等），默认`false`（无需开启，因新闻数据主要依赖自定义字段）。

#### **5.3 请求示例代码**
// node-sdk使用说明：https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/server-side-sdk/nodejs-sdk/preparation-before-development
// 以下示例代码默认根据文档示例值填充，如果存在代码问题，请在 API 调试台填上相关必要参数后再复制代码使用
const lark = require('@larksuiteoapi/node-sdk');

// 开发者复制该Demo后，需要修改Demo里面的"app id", "app secret"为自己应用的appId, appSecret
const client = new lark.Client({
	appId: 'app id',
	appSecret: 'app secret',
	// disableTokenCache为true时，SDK不会主动拉取并缓存token，这时需要在发起请求时，调用lark.withTenantToken("token")手动传递
	// disableTokenCache为false时，SDK会自动管理租户token的获取与刷新，无需使用lark.withTenantToken("token")手动传递token
	disableTokenCache: true
});

client.bitable.v1.appTableRecord.search({
		path: {
			app_token: 'Bkasbun8ua4fQ6suGjvcKGT3nre',
			table_id: 'tbl6aOnlKdxnVqj6',
		},
		params: {
			page_size: 2,
		},
		data: {
			field_names: ['新闻标题-中文', '发布机构', '配置列-仅日期', 'AI 总结', '原文链接', '行业分类', '相关性判断', 'role'],
			sort: [{
				field_name: '发布时间-北京-database',
				desc: true,
			}],
			filter: {
				conjunction: 'and',
				conditions: [{
					field_name: '相关性判断',
					operator: 'is',
					value: ['相关'],
				}],
			},
			automatic_fields: false,
		},
	},
	lark.withTenantToken("t-g1048e33CDMX6PAVPZWS76F4LIWDEUGHY6H33IN6")
).then(res => {
	console.log(res);
}).catch(e => {
	console.error(JSON.stringify(e.response.data, null, 4));
});

// 还可以使用迭代器的方式便捷的获取数据，无需手动维护page_token
(async () => {
	for await (const item of await client.bitable.v1.appTableRecord.searchWithIterator({
			path: {
				app_token: 'Bkasbun8ua4fQ6suGjvcKGT3nre',
				table_id: 'tbl6aOnlKdxnVqj6',
			},
			params: {
				page_size: 2,
			},
		},
		lark.withTenantToken("t-g1048e33CDMX6PAVPZWS76F4LIWDEUGHY6H33IN6")
	)) {
		console.log(item);
	}
})();


### **6. 响应处理**
- **成功响应（code=0）**：  
  响应体结构示例：
  ```json
  {
  "code": 0,
  "data": {
    "has_more": true,
    "items": [
      {
        "fields": {
          "AI 总结": [
            {
              "text": "2025年08月13日，美国财政部外国资产控制办公室（OFAC）宣布对墨西哥哈利斯科新一代卡特尔（CJNG）关联的4名个人及13家企业实施制裁，指控其通过分时度假（timeshare）诈骗牟利。该犯罪集团以旅游胜地巴亚尔塔港（Puerto Vallarta）为据点，针对美国老年人实施复杂骗局，要求受害者预付“手续费”或“税费”以获取虚假回报，涉案资金通过墨西哥银行账户转移。CJNG为美国认定的外国恐怖组织（FTO），除毒品走私外，还通过燃油盗窃、勒索及诈骗等非法活动获取资金。\n\n此次行动依据第14059号（打击毒品生产）及第13224号（反恐）行政令，与联邦调查局（FBI）、缉毒局（DEA）及墨西哥金融情报单位（UIF）协同实施。被制裁者包括CJNG核心成员胡里奥·塞萨尔·蒙特罗（Julio Cesar Montero Pinzon）及其控制的13家涉及房地产、旅游等业务的公司网络。数据显示，2019至2023年间美国受害者损失近3亿美元，2024年单年报案金额已超5000万美元。\n\n制裁措施冻结相关方在美资产，并禁止美国实体与其交易。财政部提醒公众警惕墨西哥分时度假诈骗，建议交易前履行尽职调查。受害者可通过FBI网络犯罪投诉中心（IC3）或司法部老年人诈骗热线举报。",
              "type": "text"
            }
          ],
          "role": [
            {
              "text": "Harvey",
              "type": "text"
            }
          ],
          "原文链接": [
            {
              "text": "https://home.treasury.gov/news/press-releases/sb0222",
              "type": "text"
            }
          ],
          "发布机构": [
            {
              "text": "美国财政部",
              "type": "text"
            }
          ],
          "新闻标题-中文": [
            {
              "text": "财政部针对墨西哥恐怖主义及分时度假欺诈行为实施制裁",
              "type": "text"
            }
          ],
          "相关性判断": [
            {
              "text": "相关",
              "type": "text"
            }
          ],
          "行业分类": "行业通用",
          "配置列-仅日期": {
            "type": 5,
            "value": [
              1755014400000
            ]
          }
        },
        "record_id": "recuTLt37HJgCX"
      },
      {
        "fields": {
          "AI 总结": [
            {
              "text": "2025年08月13日，美国海关与边境保护局（U.S. Customs and Border Protection, CBP）发布公告称，其路易斯维尔（Louisville）官员于8月6日截获一批从香港运抵的假冒珠宝。该批货物包含超过7,000对假冒耳环，估值达3,000万美元，原计划交付给个人收件人。  \n\n公告同时提醒订阅用户可通过[订阅偏好页面](https://links-1.govdelivery.com/CL0/https:%2F%2Fpublic.govdelivery.com%2Faccounts%2FUSDHSCBP%2Fsubscriber%2Fnew/1/01000198a49abd6a-71e92b9a-02d8-469f-9c43-5b7a7060b729-000000/QtgZ0NM7MzoAjHC3qOz06N1o45SQNuWjiCMWz1cvcYI=418)管理邮件订阅设置，并强调该服务由CBP免费提供，受[隐私政策](https://links-1.govdelivery.com/CL0/http:%2F%2Fwww.dhs.gov%2Fxutil%2Fgc_1157139158971.shtm/1/01000198a49abd6a-71e92b9a-02d8-469f-9c43-5b7a7060b729-000000/3-b8SKO_LYllHk0JHE9YCo9DdYKqLA_lEl2eWKTnK2g=418)约束。",
              "type": "text"
            }
          ],
          "role": [
            {
              "text": "Harvey",
              "type": "text"
            }
          ],
          "原文链接": [
            {
              "text": "https://links-1.govdelivery.com/CL0/https:%2F%2Fcontent.govdelivery.com%2Faccounts%2FUSDHSCBP%2Fbulletins%2F3edbdd0%3Freqfrom=share/1/01000198a49abd6a-71e92b9a-02d8-469f-9c43-5b7a7060b729-000000/-Im9d6OurKbRwcgGvb1coUglV5P-F5amFtVz6AQbVoU=418",
              "type": "text"
            }
          ],
          "发布机构": [
            {
              "text": "美国海关与边境保护局",
              "type": "text"
            }
          ],
          "新闻标题-中文": [
            {
              "text": "美国海关与边境保护局贸易动态更新",
              "type": "text"
            }
          ],
          "相关性判断": [
            {
              "text": "相关",
              "type": "text"
            }
          ],
          "行业分类": "行业通用",
          "配置列-仅日期": {
            "type": 5,
            "value": [
              1755014400000
            ]
          }
        },
        "record_id": "recuTMjRSl2Gv1"
      }
    ],
    "page_token": "cGFnZVRva2VuOjI=",
    "total": 556
  },
  "msg": "success"
}
  ```
  需提取`data.items`中的`fields`作为新闻数据，并存入后端返回给前端的结果中。

- **错误处理**：  
  常见错误码需捕获并处理，例如：  
  - `1254003`（app_token错误）：检查表格标识是否正确。  
  - `1254004`（table_id错误）：确认表格ID是否匹配。  
  - `1254018`（filter格式错误）：核对过滤条件的语法。  




### **示例场景说明**
调用该API时，需实现：  
1. 仅返回`相关性判断`为`相关`的新闻；  
2. 按`发布时间-北京-database`降序排列（最新在前）；  
3. 每次返回20条，支持前端分页加载更多；  
4. 提取并返回`新闻标题-中文`、`发布机构`、`配置列-仅日期`、`AI 总结`、`原文链接`、`行业分类`、`相关性判断`、`role`字段。

