const transactions = {

  /**
   * 首页综合数据
   * @returns {{transactions: string, keyValues: *[]}}
   */
  homeTransactions: function() {
    let slideData = this.utilSlide('2', 'portal_website'); // 幻灯片
    let series7 = this.utilSeries(7); // 家居用品
    let series8 = this.utilSeries(8); // 服装饰品
    let series9 = this.utilSeries(9); // 家纺装饰
    let series10 = this.utilSeries(10); // Home E？tudes
    let magazineData = this.utilMessageA1List(0, 1); //家居顾问A1列表
    let magazineInfo = this.utilMessageA2List(0, 6); // 家居顾问A2列表

    magazineData.key.key = 'messageData';
    magazineInfo.key.key = 'messageInfo'

    let _transactions = [magazineData.transaction, { // 杂志数据
      id: 2,
      command: 'Query',
      params: {
        table: 'MAGAZINE',
        columns: ['ID', 'ISSUES', 'TITLE', 'IMAGE', 'MODIFIEDDATE'],
        count: true,
        start: (0 * 4),
        range: 4,
        params: {
          column: 'ISACTIVE',
          condition: '=Y'
        },
        orderby: [{
          column: 'MODIFIEDDATE',
          asc: false
        }]
      }
    }, series7.transaction, series8.transaction, series9.transaction, series10.transaction, slideData.transaction, magazineInfo.transaction];

    return {
      transactions: JSON.stringify(_transactions),
      keyValues: [magazineData.key, {
        key: 'magazineData',
        pageNow: 0,
        pageSize: 3,
        value: ['magazine_code', 'issues', 'title', 'img_url', 'time']
      }, series7.key, series8.key, series9.key, series10.key, slideData.key, magazineInfo.key]
    }
  },

  //----------------------------------------------------------------------------
  // 工具类
  //----------------------------------------------------------------------------

  utilSearch: function(search, pageNow, pageSize) {
    return {
      transaction: {
        id: '7001',
        command: 'ExecuteSQL',
        params: {
          name: 'ali_product_search_sql',
          values: [`%${search}%`, pageNow, pageSize, pageNow, pageSize],
          parsejson: 'N'
        }
      },
      key: {
        key: 'productList',
        value: ['pdt_id', 'pdt_img_url', 'pdt_name', 'pdt_price', 'pdt_sale']
      }
    }
  },

  /**   -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
     一级产品分类
   -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --**/

  utilProductType: () => {
    let _transactions = [{
      id: 7002,
      command: 'ExecuteSQL',
      params: {
        name: 'ali_producttree1_sql',
        parsejson: 'N'
      }
    }]
    return {
      transactions: JSON.stringify(_transactions),
      keyValues: [{
        key: 'productType',
        value: ['id', 'parent_code', 'name_code', 'name', 'img_url', 'picture']
      }]
    }
  },

  /**
   * 二级分类 三级分类 列表 , m.ID as DIMFLAGID, m.DIMFLAG
   */
  sSeriesList: (parent_code) => {
    let _transactions = [{
      id: 3,
      command: 'ExecuteSQL',
      params: {
        name: 'ali_producttree2_sql',
        values: [parent_code],
        parsejson: 'N'
      }
    }]
    return {
      transactions: JSON.stringify(_transactions),
      keyValues: [{
        key: 'seriesList',
        value: ['series_code', 'parent_code', 'name_code', 'name', 'img_url', 'picture', 'dimflag_id', 'dimflag', 'big_img']
      }]
    }
  },

  /**
   * 家居顾问 幻灯片
   */
  qBrandMsgSlide: function() {
    let slideData = this.utilSlide('2', 'portal_website'); // 幻灯片
    let _transactions = [slideData.transaction]
    return {
      transactions: JSON.stringify(_transactions),
      keyValues: [slideData.key]
    }
  },

  /**
   * 家居顾问 列表
   */
  qBrandMsgList: function(pageNow, pageSize) {
    let msgData = this.utilMessageA2List(pageNow, pageSize)
    let _transactions = [msgData.transaction]
    return {
      transactions: JSON.stringify(_transactions),
      keyValues: [msgData.key]
    }
  },

  /**
   * 家居顾问 详情
   */
  qBrandMsgDetail: (code) => {
    let _transactions = [{
      id: 3,
      command: 'Query',
      params: {
        table: 'PORTAL_NEWS',
        columns: ['ID', 'TITLE', 'ABSTRACT', 'IMG', 'CONTENT', 'MODIFIEDDATE'],
        count: true,
        params: {
          column: 'ID',
          condition: `=${code}`
        },
        orderby: [{
          column: 'MODIFIEDDATE',
          asc: false
        }]
      }
    }]
    let params = {
      transactions: JSON.stringify(_transactions),
      keyValues: [{
        key: 'messageDetail',
        value: ['msg_code', 'title', 'detail', 'img_url', 'content', 'time']
      }]
    }
    return params
  },

  /**
   * 杂志 列表
   */
  qMagazineList: function(pageNow, pageSize) {
    let _transactions = [{
      id: 2,
      command: 'Query',
      params: {
        table: 'MAGAZINE',
        columns: ['ID', 'ISSUES', 'TITLE', 'ABSTRACT', 'IMAGE', 'IMAGE2', 'MODIFIEDDATE'],
        count: true,
        start: (pageNow * pageSize),
        range: pageSize,
        params: {
          column: 'ISACTIVE',
          condition: '=Y'
        },
        orderby: [{
          column: 'MODIFIEDDATE',
          asc: false
        }]
      }
    }]

    let params = {
      transactions: JSON.stringify(_transactions),
      keyValues: [{
        key: 'magazineList',
        pageNow: pageNow,
        pageSize: pageSize,
        value: ['magazine_code', 'issues', 'title', 'detail', 'img_url', 'img_show_url', 'time']
      }]
    }
    return params
  },

  /**
   * 杂志 详情
   */
  qMagazineDetail: function(code) {
    let _transactions = [{
      id: 2,
      command: 'Query',
      params: {
        table: 'MAGAZINE',
        columns: ['ID', 'ISSUES', 'TITLE', 'ABSTRACT', 'IMAGE', 'FILES', 'MODIFIEDDATE'],
        count: true,
        params: {
          column: 'ID',
          condition: `=${code}`
        },
        orderby: [{
          column: 'MODIFIEDDATE',
          asc: false
        }]
      }
    }]

    let params = {
      transactions: JSON.stringify(_transactions),
      keyValues: [{
        key: 'magazineDetail',
        value: ['magazine_code', 'issues', 'title', 'detail', 'img_url', 'pdf_url', 'time']
      }]
    }
    return params
  },

  /**
   * 广告
   */
  qAdvert: function(name) {
    let _transactions = [{
      id: 9,
      command: 'Query',
      params: {
        table: 'B_IMGSET',
        columns: ['IMGURL'],
        count: true,
        params: {
          column: 'NAME',
          condition: `=${name}`
        },
        orderby: [{
          column: 'ID',
          asc: false
        }]
      }
    }];

    let params = {
      transactions: JSON.stringify(_transactions),
      keyValues: [{
        key: 'advertImage',
        value: ['img_url']
      }]
    }
    return params
  },

  // 最新单品
  qNewProductList: function() {
    let utilNewProduct = this.utilNewProduct();
    let _transactions = [utilNewProduct.transaction]
    return {
      transactions: JSON.stringify(_transactions),
      keyValues: [utilNewProduct.key]
    }
  },

  // 精选品类
  qIntroduceProductList: function() {
    let utilIntroduceProduct = this.utilIntroduceProduct();
    let _transactions = [utilIntroduceProduct.transaction]
    return {
      transactions: JSON.stringify(_transactions),
      keyValues: [utilIntroduceProduct.key]
    }
  },

  /**
   * 搜索商品
   * @param {*} search
   * @param {*} pageNow
   * @param {*} pageSize
   */
  qProductSearch: function(search, pageNow, pageSize) {
    let utilSearch = this.utilSearch(search, pageNow, pageSize);
    let _transactions = [utilSearch.transaction]
    return {
      transactions: JSON.stringify(_transactions),
      keyValues: [utilSearch.key]
    }
  },

  // -----------------------

  /**
   * 获取商品列表
   * @param {字段表示} dimFlag
   * @param {字段ID} dimID
   * @param {当前页} pageNow
   * @param {每页数量} pageSize
   */
  qProductList: function(dimFlag, dimID, pageNow, pageSize) {
    let utilProductList = this.utilProductList(dimFlag, dimID, pageNow, pageSize);
    let _transactions = [utilProductList.transaction]
    return {
      transactions: JSON.stringify(_transactions),
      keyValues: [utilProductList.key]
    }
  },

  /**
   * 商品信息
   * @param {商品ID} pdtID
   */
  qProductInfo: function(pdtID) {
    let utilProductB = this.utilProductB(pdtID);
    let utilProductBSeries = this.utilProductBSeries(pdtID);
    let utilProductB24 = this.utilProductB24(pdtID);
    let utilProductB57 = this.utilProductB57(pdtID);

    let _transactions = [utilProductB.transaction, utilProductBSeries.transaction, utilProductB24.transaction, utilProductB57.transaction];
    return {
      transactions: JSON.stringify(_transactions),
      keyValues: [utilProductB.key, utilProductBSeries.key, utilProductB24.key, utilProductB57.key]
    }
  },

  /**
   * 商品信息
   * @param {商品ID} pdtID
   */
  qProductA1: function(pdtID) {
    let utilProductA1 = this.utilProductA1(pdtID); // A1区域信息

    let _transactions = [utilProductA1.transaction];
    return {
      transactions: JSON.stringify(_transactions),
      keyValues: [utilProductA1.key]
    }
  },

  /**
   * 获取A2区域数据
   * @param {*} pdtID
   * @param {*} pageNow
   * @param {*} pageSize
   */
  qProductA2List: function(pdtID, pageNow, pageSize) {
    let utilProductA2 = this.utilProductA2(pdtID, pageNow, pageSize);
    let _transactions = [utilProductA2.transaction];
    return {
      transactions: JSON.stringify(_transactions),
      keyValues: [utilProductA2.key]
    }
  },

  /**
   * 获取相关产品
   * @param {商品ID} pdtID
   * @param {当前页面} pageNow
   * @param {每页数量} pageSize
   */
  qProductRelatedList: function(pdtID, pageNow, pageSize) {
    // utilRelatedProductList
    let utilRelatedProductList = this.utilRelatedProductList(pdtID, pageNow, pageSize);
    let _transactions = [utilRelatedProductList.transaction];
    return {
      transactions: JSON.stringify(_transactions),
      keyValues: [utilRelatedProductList.key]
    }
  },

  /* 幻灯片 */
  utilSlide: function(id, name) {
    return {
      transaction: { // 幻灯片
        id: 14,
        command: 'ExecuteSQL',
        params: {
          name: 'b2b:advert:position:items',
          values: [id, name, name],
          parsejson: 'N'
        }
      },
      key: {
        key: 'slideData',
        value: ['id', 'text', 'image', 'target', 'href', 'act_id', 'cat_id', 'pdt_id', "details", 'maxitems']
      }
    }
  },

  /* 商品分类 */
  utilSeries: function(id) {
    return {
      transaction: {
        id: id,
        command: 'ExecuteSQL',
        params: {
          name: 'ali_producttree2_sql',
          values: [id],
          parsejson: 'N'
        }
      },
      key: {
        key: 'series' + id,
        value: ['series_code', 'parent_code', 'name_code', 'name', 'img_url', 'picture', 'dimflag_id', 'dimflag', 'big_img']
      }
    }
  },

  /* 家居顾问A1区域 */
  utilMessageA1List: function(pageNow, pageSize) {
    return {
      transaction: {
        id: 3001,
        command: 'Query',
        params: {
          table: 'PORTAL_NEWS',
          columns: ['ID', 'TITLE', 'ABSTRACT', 'IMG', 'MODIFIEDDATE'],
          count: true,
          start: (pageNow * pageSize),
          range: pageSize,
          params: {
            column: 'AREA',
            condition: '=1'
          },
          orderby: [{
            column: 'MODIFIEDDATE',
            asc: false
          }]
        }
      },
      key: {
        key: 'messageList',
        pageNow: pageNow,
        pageSize: pageSize,
        value: ['msg_code', 'title', 'detail', 'img_url', 'time']
      }
    }
  },

  /* 家居顾问A2区域列表 */
  utilMessageA2List: function(pageNow, pageSize) {
    return {
      transaction: {
        id: 3001,
        command: 'Query',
        params: {
          table: 'PORTAL_NEWS',
          columns: ['ID', 'TITLE', 'ABSTRACT', 'IMG', 'MODIFIEDDATE'],
          count: true,
          start: (pageNow * pageSize),
          range: pageSize,
          params: {
            column: 'AREA',
            condition: '=2'
          },
          orderby: [{
            column: 'MODIFIEDDATE',
            asc: false
          }]
        }
      },
      key: {
        key: 'messageList',
        pageNow: pageNow,
        pageSize: pageSize,
        value: ['msg_code', 'title', 'detail', 'img_url', 'time']
      }
    }
  },

  /* 杂志列表 */
  utilMagazineList: function() {
    return {
      transaction: { // 杂志数据
        id: 2,
        command: 'Query',
        params: {
          table: 'MAGAZINE',
          columns: ['ID', 'ISSUES', 'TITLE', 'IMAGE', 'MODIFIEDDATE'],
          count: true,
          start: (0 * 3),
          range: 3,
          params: {
            column: 'ISACTIVE',
            condition: '=Y'
          },
          orderby: [{
            column: 'MODIFIEDDATE',
            asc: false
          }]
        },
        key: {
          key: 'magazineData',
          pageNow: 0,
          pageSize: 3,
          value: ['magazine_code', 'issues', 'title', 'img_url', 'time']
        }
      }
    }
  },

  /**
   * 获取最新单品SQL
   */
  utilNewProduct: function() {
    return {
      transaction: {
        id: '6001',
        command: 'ExecuteSQL',
        params: {
          name: 'ali_new_product_sql',
          values: [],
          parsejson: 'N'
        }
      },
      key: {
        key: 'newProductList',
        value: ['pdt_id', 'pdt_name', 'pdt_price', 'pdt_sale', 'pdt_img_url']
      }
    }
  },

  /**
   * 获取 精选品类
   */
  utilIntroduceProduct: function() {
    return {
      transaction: {
        id: '7001',
        command: 'ExecuteSQL',
        params: {
          name: 'ali_product_introduce_sql',
          values: [],
          parsejson: 'N'
        }
      },
      key: {
        key: 'introduceList',
        value: ['series_code', 'parent_code', 'name_code', 'name', 'img_url', 'picture', 'dimflag_id', 'dimflag']
      }
    }
  },

  // -------------------------

  /**
   * 根据商品分类 获取 商品列表 p.ID, p.PHOTO2, p.VALUE, p.PRECOST, p.PRICELIST
   */
  utilProductList: function(dimFlag, dimID, pageNow, pageSize) {
    return {
      transaction: {
        id: '5001',
        command: 'ExecuteSQL',
        params: {
          name: 'ali_product_list_sql',
          values: [dimFlag, dimID, pageNow, pageSize, pageNow, pageSize],
          parsejson: 'N'
        }
      },
      key: {
        key: 'productList',
        value: ['pdt_id', 'pdt_img_url', 'pdt_name', 'pdt_price', 'pdt_sale']
      }
    }
  },

  /**
   * 获取A1区域数据
   * @param {商品ID} pdtID
   */
  utilProductA1: function(pdtID) {
    return {
      transaction: {
        id: '5001',
        command: 'ExecuteSQL',
        params: {
          name: 'ali_product_a1_sql',
          values: [pdtID],
          parsejson: 'N'
        }
      },
      key: {
        key: 'productA1',
        value: ['pdt_a1']
      }
    }
  },

  /**
   * 获取A2区域数据
   */
  utilProductA2: function(pdtID, pageNow, pageSize) {
    return {
      transaction: {
        id: '5002',
        command: 'ExecuteSQL',
        params: {
          name: 'ali_product_a2_sql',
          values: [pdtID, pageNow, pageSize, pageNow, pageSize],
          parsejson: 'N'
        }
      },
      key: {
        key: 'productA2List',
        value: ['pdt_id', 'pdt_img_url', 'pdt_name', 'pdt_price', 'pdt_value']
      }
    }
  },

  /**
   * 获取B区域数据 B1图片,规格，详情，名称，供货价，零售价
   */
  utilProductB: function(pdtID) {
    return {
      transaction: {
        id: '5003',
        command: 'ExecuteSQL',
        params: {
          name: 'ali_product_b_sql',
          values: [pdtID],
          parsejson: 'N'
        }
      },
      key: {
        key: 'productBInfo',
        value: ['pdt_img_url', 'pdt_standard', 'pdt_details', 'pdt_name', 'pdt_price', 'pdt_sale', 'tmail_link', 'pdt_salestalk']
      }
    }
  },

  /**
   * 获取B区域数据 系列、套装
   * @param {商品ID} pdtID
   */
  utilProductBSeries: function(pdtID) {
    return {
      transaction: {
        id: '5004',
        command: 'ExecuteSQL',
        params: {
          name: 'ali_product_b_series_sql',
          values: [pdtID],
          parsejson: 'N'
        }
      },
      key: {
        key: 'productBSeriesList',
        value: ['pdt_id', 'pdt_series']
      }
    }
  },

  /**
   * 获取B2-B4区域数据
   * @param {商品ID} pdtID
   */
  utilProductB24: function(pdtID) {
    return {
      transaction: {
        id: '5005',
        command: 'ExecuteSQL',
        params: {
          name: 'ali_product_b24_sql',
          values: [pdtID],
          parsejson: 'N'
        }
      },
      key: {
        key: 'productB24List',
        value: ['pdt_img_url']
      }
    }
  },

  /**
   * 获取B5-B7区域数据
   * @param {商品ID} pdtID
   */
  utilProductB57: function(pdtID) {
    return {
      transaction: {
        id: '5006',
        command: 'ExecuteSQL',
        params: {
          name: 'ali_product_b57_sql',
          values: [pdtID],
          parsejson: 'N'
        }
      },
      key: {
        key: 'productB57List',
        value: ['pdt_img_url']
      }
    }
  },

  /**
   * 获取相关产品 p.ID, p.PHOTO2, p.VALUE, p.PRECOST, p.PRICELIST
   */
  utilRelatedProductList: function(pdtID, pageNow, pageSize) {
    return {
      transaction: {
        id: '5101',
        command: 'ExecuteSQL',
        params: {
          name: 'ali_product_related_sql',
          values: [pdtID, pageNow, pageSize, pageNow, pageSize],
          parsejson: 'N'
        }
      },
      key: {
        key: 'relatedProductList',
        value: ['pdt_id', 'pdt_img_url', 'pdt_name', 'pdt_price', 'pdt_sale']
      }
    }
  }

};

export default transactions
