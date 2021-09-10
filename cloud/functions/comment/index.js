const AV = require('leancloud-storage');
const cloud = require('wx-server-sdk');
cloud.init();

exports.main = async (event, context) => {
  try {
    const { sql, appId, appKey, serverURLs } = event;
    AV.init({
      appId,
      appKey,
      serverURLs,
    });
    res = await AV.Query.doCloudQuery(sql);
    const count = res.count;
    const commentRes = res.results;
    if (!commentRes || commentRes.length <= 0) {
      return {
        success: false,
        data: null,
      };
    }
    const openid = cloud.getWXContext().OPENID;
    const secFunc = [];
    const result = [];
    commentRes.forEach((item) => {
      secFunc.push(
        cloud.openapi.security.msgSecCheck({
          version: 2,
          openid,
          scene: 1,
          content: item.attributes.comment,
        })
      );
    });
    await Promise.all(secFunc).then((res) => {
      res.forEach((item, index) => {
        if (item.result.suggest === 'pass') {
          result.push(commentRes[index]);
        }
      });
    });
    return {
      success: true,
      data: result,
      count,
    };
  } catch (e) {
    return {
      success: false,
      data: null,
    };
  }
};
