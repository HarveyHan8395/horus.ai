1. 接口基础信息（飞书多维表格新增记录 API）​
功能：向指定的飞书多维表格中添加新的记录（如用户在“联系我们”处提交的邮箱）。​
HTTP URL：https://open.feishu.cn/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records​
HTTP 方法：POST​
速率限制：20 次 / 秒​
核心用途：向指定的飞书多维表格中添加新的记录（如用户在“联系我们”处提交的邮箱）。​

2. 认证与请求头​
- **请求头必填参数**：
  - `Authorization`：格式为 `Bearer <access_token>`，使用`tenant_access_token`（以应用身份调用，示例：`Bearer t-g1044qeGEDXTB6NDJOGV4JQCYDGHRBARFTGT1234`）。
    - "tenant_access_token":"t-g1048e5mVBRKFBQELTQZ3HCJJZ7YGXWR4I4RQWRS"
  - `Content-Type`：固定值 `application/json; charset=utf-8`。

3. 路径参数
- `app_token`："RLTLbxKOEatXU3s1JM6csWhmnd4"  
  示例值：`"bascnj1LMH2tmdifXvWVq05sTyd"`。
- `table_id`："tblp4jp339vBgMjp" 

4. 请求体参数（核心：记录数据结构）​
4.1 新闻表格的字段结构
当前假设字段类型均为 string
​
4.2 请求示例
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

client.bitable.v1.appTableRecord.create({
        path: {
                app_token:'bascng7vrxcxpig7geggXiCtadY',
                table_id:'tblUa9vcYjWQYJCj',
        },
        params: {
                user_id_type:'open_id',
                client_token:'fe599b60-450f-46ff-b2ef-9f6675625b97',
                ignore_consistency_check:true,
        },
        data: {
                fields:new Map([['货币',3],['超链接',new Map([['link','https://www.feishu.cn/product/base'],['text','飞书多维表格官网'],])],['双向关联',[]],['单向关联',[]],['地理位置','116.397755,39.903179'],['条码','+$$3170930509104X512356'],['单选','选项1'],['人员',[]],['群组',[]],['附件',[]],['日期',1674206443000],['电话号码','1302616xxxx'],['复选框',true],['任务名称','拜访潜在客户'],['工时',10],['评分',3],['进度',0.25],['多选',[]],]),
        },
},
    lark.withTenantToken("t-7f1b******8e560")
).then(res => {
    console.log(res);
}).catch(e => {
    console.error(JSON.stringify(e.response.data, null, 4));
});

