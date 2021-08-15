const AV = require('leancloud-storage');
const cloud = require('wx-server-sdk');
cloud.init();

exports.main = async (event, context) => {
  try {
    const { url, appId, appKey, serverURLs } = event;
    AV.init({
      appId,
      appKey,
      serverURLs,
    });
    const Model = AV.Object.extend('Comment');
    const query = new AV.Query(Model);
    const commentRes = await query.equalTo('url', url).find();
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
      data: result.reverse(),
    };
  } catch (e) {
    return {
      success: false,
      data: null,
    };
  }
};
