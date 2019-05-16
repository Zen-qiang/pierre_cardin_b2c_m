import axios from 'axios'
import utils from './utils.js'
import formate from './formate.js'

axios.defaults.baseURL = process.env.API_ROOT

axios.defaults.withCredentials = true

const http = {
  url: '/servlets/binserv/Rest',

  /**
   * Post请求
   * @param trans
   * @returns {Promise<AxiosResponse<any> | never>}
   */
  qPost: function(trans) {
    let _config = {
      headers: utils.set_header(),
      params: utils.set_params(trans.transactions)
    }
    let _that = this
    return axios.post(this.url, {}, _config).then((res) => {
      // 处理逻辑
      if (res.status === 200 && res.headers.sip_status === '9999') {
        return formate.formateQueryData(trans.keyValues, res.data)
      } else {
        // 错误
        _that.status(res.headers.sip_status);
      }
    }, () => {})
  },

  /*
   * 暂时停用
   * */
  sPost: function(trans) {
    let _config = {
      headers: utils.set_header(),
      params: utils.set_params(trans.transactions)
    }
    axios.post(this.url, {}, _config).then((res) => {
      if (res.status == 200 && res.data.length > 0 && res.data[0].result.length > 0) {
        if (res.data[0].result.length == 1) {
          //   let retData = formate.arrayToJson(trans.keys, res.data[0].result[0])
        } else {
          let retArray = [];
          for (let _ret of res.data[0].result) {
            retArray.push(formate.arrayToJson(trans.keys, _ret))
          }
        }
        return new Promise(function(resolve, reject) {});
      }
    }, () => {

    })
  },

  /**
   * 状态码转 提示
   * @param status
   */
  status: (status) => {
    let msg = ''
    switch (status) {
      case '0000':
        msg = '服务请求失败';
        break;
      case '9999':
        msg = '服务请求成功';
        break;
      case '1001':
        msg = '签名无效';
        break;
      case '1002':
        msg = '请求过期';
        break;
      case '1003':
        msg = '用户绑定失败';
        break;
      case '1004':
        msg = '需要绑定用户';
        break;
      case '1005':
        msg = '需要提供AppKey';
        break;
      case '1006':
        msg = '需要提供服务器名';
        break;
      case '1007':
        msg = '需要提供签名';
        break;
      case '1008':
        msg = '需要提供时间戳';
        break;
      case '1009':
        msg = '用户认证失败';
        break;
      case '1010':
        msg = '无权访问服务'
        break;
      case '1011':
        msg = '服务不存在';
        break;
      case '1012':
        msg = '需要提供 sessionId';
        break;
      case '1013':
        msg = '需要提供用户名';
        break;
    }

    return {
      code: status,
      msg: msg
    }
  }

};

export default http
