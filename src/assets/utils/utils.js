import md5 from 'js-md5'

const utils = {

  _sip_app_key: 'b2badmin',
  // _sip_app_secret: 'df0b562ba7780f5c09c61ecc0c369e89',
  _sip_app_secret: '36081787bfc51607219fe61dc45dbe75',
  // _sip_app_secret: '33da3ae70e12c8810f10aa55409b611a',

  set_header: function () {
    return {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    }
  },

  set_params: function (transactions) {
    let sip_timestamp = this.get_nowdate_str()
    return {
      sip_appkey: this._sip_app_key,
      sip_timestamp: sip_timestamp,
      sip_sign: md5(this._sip_app_key + sip_timestamp + this._sip_app_secret),
      transactions: transactions
    }
  },

  //--------------------

  get_nowdate_str: function () {
    let date = new Date()
    let tempDate = date.getFullYear()
      + '-'
      + this.formateNum(date.getMonth() + 1)
      + '-'
      + this.formateNum(date.getDate())
      + ' '
      + this.formateNum(date.getHours())
      + ':'
      + this.formateNum(date.getMinutes())
      + ':'
      + this.formateNum(date.getSeconds())
      + '.000'
    return tempDate
  },

  formateNum: function (n) {
    if (n < 10) {
      return '0' + n
    } else {
      return String(n)
    }
  },
};

export default utils
