/*
 * @Date: 2024-05-15 11:18:01
 * @LastEditors: 徐一鸣
 * @LastEditTime: 2024-05-15 11:38:44
 * @Description:
 */
const formatLinkOuterStrParams = (obj) => {
  let formatObj = {}
  Object.keys(obj).forEach((item) => {
    const value = obj[item]
    if (value) {
      formatObj[item] = value
    }
  })
  return formatObj
}
const formatSaveOpenStr = (urlParams) => {
  // const extraData = data.referrerInfo.extraData
  const isWmStart = urlParams.outer_str.startsWith('wm|')
  const length = urlParams.outer_str.length
  // 解析回调链接返回的参数
  const outerStrParams = isWmStart ? JSON.parse(urlParams.outer_str.substring(3,length)) :JSON.parse(urlParams.outer_str)
  const outerStr = formatLinkOuterStrParams({
    activityId: outerStrParams.activityId || '', // 邀请入会活动id
    sharerNascentId: outerStrParams.sharerNascentId || '',  // 邀请入会分享人id
    activityType: outerStrParams.activityType || '',  // 活动类型
    sourceType: outerStrParams.sourceType || '', // 来源  目前为社区进入
    guideId: outerStrParams.guideId || '', // 导购招募入会
    guideShopId: outerStrParams.guideShopId || '', // 导购招募入会
    offlineShopId: outerStrParams.offlineShopId || '', // 微页面门店关联店铺业绩
		sgShareGuideId: outerStrParams.sgShareGuideId,
		sgShareShopId:  outerStrParams.sgShareShopId,
		sgActivityId: outerStrParams.sgActivityId,
    nodeParam: outerStrParams.nodeParam || '',
    nodeType: outerStrParams.nodeType || '',
    mtShareId: outerStrParams.mtShareId || "",
    isActivate: outerStrParams.isActivate + '' // 手机号欠费主动跳转开卡改造(该值为0时，formatLinkOuterStrParams未放进入，因此转字符串)
  })
  // 获取进入小程序开卡outerStr的参数
  const openCardDataParams = configStore().getState().customer.openCardDataInfo
  // const isWmOuterStrStart = openCardDataParams.outerStr.startsWith('wm|')
  // const oldOutStr = isWmOuterStrStart ? JSON.parse(openCardDataParams.outerStr.substring(3,openCardDataParams.length)) :JSON.parse(openCardDataParams.outerStr)
  // 回调链接和进入小程序参数拼接
  const isWmOuterStrStart = true
  const outer_str_params = Object.assign({},oldOutStr, outerStr)
  const outer_str = isWmOuterStrStart? 'wm|'+JSON.stringify(outer_str_params) : JSON.stringify(outer_str_params)
  // 推广链接
  // const promotionPageId = Taro.getStorageSync('firstRouter').params.query.promotionPageId
  const saveOpenOuterStrParams = {
    // isPromotionUrl: promotionPageId ? 1 : 0, // 是否从推广链接进入 1 是
    // promotionPageId: promotionPageId ? promotionPageId : null, // 推广链接id
    // ticket: extraData.activate_ticket,
    // code: extraData.code,
    outStr: outer_str,
    // cardId: openCardDataParams.cardId,
    // appId: openCardDataParams.appId
  }
  // if (promotionPageId) {
  //   saveOpenOuterStrParams.promotionPageId = promotionPageId
  // }
  // saveOutStr(saveOpenOuterStrParams)
  console.log(saveOpenOuterStrParams);
}

const str = 'wm|{"sgActivityId":null,"unionId":"oTRmAw3JouEI6izj5wjW6h-pq1b4","mallId":100000081,"openId":"o6be35OwHM1_qUjGpk_1udXF19vA","groupId":80000089,"errMsg":"","guideId":null,"source":2,"guideShopId":null,"memberCard":"90334916700879","nick":"ocUyqwXt17E65tuNBfXVCVquEXrg","activityId":"8896b603-3ea1-4538-88b1-38e1d13bb43e","scanSource":"","viewId":100000423,"sgShareShopId":null,"sgShareGuideId":null,"shopId":100157171,"isActivate":0,"offlineShopId":null,"wechatNo":"","sharerNascentId":"ocUyqweynTb1fA_X8m6YII7AiZ4w","activityType":"121","nodeParam":"8896b603-3ea1-4538-88b1-38e1d13bb43e","nodeType":"121","mtShareId":""}'
formatSaveOpenStr({outer_str: str})