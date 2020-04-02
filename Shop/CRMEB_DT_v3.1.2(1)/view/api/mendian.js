import request from "./../utils/asp-request.js";
/**
 * 
 * 获取门店
 * 
*/
export function Shopinfo() {
  return request.get("Area/GetMerchantAreas", {}, { noAuth: true,noVerify: true})
}
export function Area(data) {
  return request.get("Area/GetMerchantShopList",data, { noAuth: true, noVerify: true })
}
/**
 * 
 * 获取发现
 * 
*/
export function GetguestphotoList(data) {
  return request.get("News/GetGuestPhotoList",data, { noAuth: true, noVerify: true })
}
/**
 * 
 * 获取点赞
 * 
*/
export function Useroperation(data) {
  return request.get("UserResources/UserOperation",data, { noAuth: true, noVerify: true })
}

/**
 * 
 * 获取封面故事　标题列表
 * 
*/
export function Getnewstypes() {
  return request.get("SmallProgram/GetNewsTypes", {}, { noAuth: true,noVerify: true})
}

/**
 * 
 * 获取封面故事　标题列表内容
 * 
*/
export function GetNewsList(data) {
  return request.get("News/GetNewsList", data, { noAuth: true,noVerify: true})
}

/**
 * 
 * 获取瀑布流对应的详情
 * 
*/
export function Getnewsdetail(data) {
  return request.get("News/GetInformationDetail", data, { noAuth: true,noVerify: true})
}

/**
 * 
 * 获取瀑布流视频详情
 * 
*/
export function Getvideos(data) {
  return request.get("News/GetVideos", data, { noAuth: true,noVerify: true})
}

