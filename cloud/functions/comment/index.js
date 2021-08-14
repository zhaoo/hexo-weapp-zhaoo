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
    commentRes.forEach(async (item, index) => {
      const secRes = await cloud.openapi.security.msgSecCheck({
        version: 2,
        openid,
        scene: 2,
        content: item.attributes.comment,
      });
      if (secRes && secRes.errCode !== 0) {
        commentRes.splice(index, 1);
      }
    });
    return {
      success: true,
      data: commentRes.reverse(),
    };
  } catch (e) {
    return {
      success: false,
      data: null,
    };
  }
};
