const formate = {

  /**
   * 格式化查询结果
   * @param keyArray
   * @param dataArray
   */
  formateQueryData: function(keyArray, dataArray) {
    let formateData = {}
    if (keyArray.length != dataArray.length) {
      return formateData
    }
    for (let i = 0; i < keyArray.length; i++) {
      let key = keyArray[i]
      let data = dataArray[i]
      let rowData = []

      if (data.rows) { // 处理通过 Query 查询
        for (let row of data.rows) {
          rowData.push(formate.arrayToJson(key.value, row))
        }
        formateData[key.key] = {
          pageNow: key.pageNow,
          pageSize: key.pageSize,
          pageTotal: Math.ceil(data.count / key.pageSize),
          dataTotal: data.count,
          data: rowData
        }
      } else if (data.result) { // 处理通过 ExecuteSQL 查询
        for (let row of data.result) {
          rowData.push(formate.arrayToJson(key.value, row))
        }
        formateData[key.key] = {
          dataTotal: data.result.length,
          data: rowData
        }
      }
    }
    return formateData
  },

  /**
   * 将两个数组对应转化成JSON数据格式
   * @param keyArray 属性字典
   * @param valueArray 值字典
   * @returns {{}}
   */
  arrayToJson: function(keyArray, valueArray) {
    if (keyArray.length != valueArray.length) { // 错误情况处理
      return {}
    } else {
      let _ret = {}
      for (let i = 0; i < keyArray.length; i++) {
        _ret[keyArray[i]] = valueArray[i] || ''
      }
      return _ret
    }
  }
}

export default formate
