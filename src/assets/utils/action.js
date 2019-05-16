import http from './http.js'
import transactions from './transactions.js'

const action = {

  prepareFun: function() {},

  // ------------------------------

  /**
   * 首页 基本数据 首页幻灯片、杂志展示
   */
  homeBase: function() {
    return http.qPost(transactions.homeTransactions()).then((res) => {
      return res
    })
  },

  /**最新单品 */
  homeNewProduct: function() {
    return http.qPost(transactions.qNewProductList())
  },

  /** 精选品类 */
  navIntroduce: function() {
    return http.qPost(transactions.qIntroduceProductList())
  },

  /**一级产品分类 */
  chanpinType: function() {
    return http.qPost(transactions.utilProductType())
  },

  // 官网首页广告图
  advertImg: function() {
    return http.qPost(transactions.qAdvert('portal:advert'))
  },

  /** 搜索 */
  searchProduct: function(search, pageNow, pageSize) {
    return http.qPost(transactions.qProductSearch(search, pageNow, pageSize));
  },

  // ------------------------------

  /**
   * 产品分类 获取分类列表
   */
  productClassify: function(parent_code) {
    return http.qPost(transactions.sSeriesList(parent_code)).then((res) => {
      return res
    })
  },

  /**
   * 获取商品列表
   * @param {字段表示} dimFlag
   * @param {字段ID} dimID
   * @param {当前页} pageNow
   * @param {每页数量} pageSize
   */
  productList: function(dimFlag, dimID, pageNow, pageSize) {
    return http.qPost(transactions.qProductList(dimFlag, dimID, pageNow, pageSize)).then((res) => {
      return res;
    })
  },

  /**
   * 商品信息
   * @param {商品ID} pdtID
   */
  productDetail: function(pdtID) {
    return http.qPost(transactions.qProductInfo(pdtID)).then((res) => {
      return res;
    })
  },

  /**
   * 获取A1区域数据
   */
  productA1: function(pdtID) {
    return http.qPost(transactions.qProductA1(pdtID)).then((res) => {
      return res
    })
  },

  /**
   * 获取A2区域数据
   * @param {*} pdtID
   * @param {*} pageNow
   * @param {*} pageSize
   */
  productA2List: function(pdtID, pageNow, pageSize) {
    return http.qPost(transactions.qProductA2List(pdtID, pageNow, pageSize)).then((res) => {
      return res
    })
  },

  /**
   * 获取相关产品
   * @param {商品ID} pdtID
   * @param {当前页面} pageNow
   * @param {每页数量} pageSize
   */
  productRelated: function(pdtID, pageNow, pageSize) {
    return http.qPost(transactions.qProductRelatedList(pdtID, pageNow, pageSize)).then((res) => {
      return res
    })
  },

  // ------------------------------

  /**
   * 品牌动态 列表（包含分页）
   */
  brandMsgList: function(pageNow, pageSize) {
    return http.qPost(transactions.qBrandMsgList(pageNow, pageSize))
  },

  /**
   * 品牌动态 详情
   */
  brandMsgDetail: function(code) {
    return http.qPost(transactions.qBrandMsgDetail(code))
  },

  // ------------------------------

  /**
   * 杂志列表（包含分页）
   */
  magazineList: function(pageNow, pageSize) {
    return http.qPost(transactions.qMagazineList(pageNow, pageSize))
  },

  /**
   * 杂志详情
   */
  magazineDetail: function(code) {
    return http.qPost(transactions.qMagazineDetail(code))
  },

  /**
   * 搜索接口
   */
  searchList: function(search, pageNow, pageSize) {
    return http.qPost(transactions.qProductSearch(search, pageNow, pageSize))
  }

};

export default action
