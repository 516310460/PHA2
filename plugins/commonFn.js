import Router from 'vue-router';
import Vue from 'vue'
import { Message } from "element-ui";
import _ from 'lodash'
import VueBus from 'vue-bus'
import md5 from 'md5'
import Clipboard from 'clipboard';
import VueClipboard from 'vue-clipboard2'
import echarts from "echarts";
import moment from "moment";
import './directives'
// 监听div变化resize
import elementResizeDetectorMaker from "element-resize-detector";
import { arrayData } from './arrayData'
import { WebSocketClient } from './ws'

//解决报错 Uncaught (in promise) NavigationDuplicated
Vue.use(Router)
    // 添加这下面一段代码，就可以解决报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};
Vue.use(VueBus)
Vue.use(VueClipboard);
Vue.prototype.$moment = moment // 引入组件（将moment注册为全局）
export default (context, inject) => {

    // 公共筛选
    const commonSwitch = {
        arrayData: arrayData,
        // 购买类型 ALIPAY：支付宝 WECHAT：微信 BANK：银行卡
        paySwitch(key) {
            if (!key) {
                return
            }
            let item = arrayData.payList.find(item => {
                if (item.value == key) {
                    return item
                }
            })
            return item.name
        },
        // 购买类型 0全部 1.购买 2.出售
        typeSwitch(key) {
            if (!key) {
                return
            }
            let item = arrayData.typeList.find(item => {
                if (item.value == key) {
                    return item
                }
            })
            return item.name
        },
        // 订单状态:1未付款,2已付款,3已取消,4申诉中,5申诉完成,9已完成
        switchOrderStateList(key) {
            let item = arrayData.orderStateList.find(item => {
                if (item.value == key) {
                    return item
                }
            })
            return item.name
        },
    }

    // 公共函数对象..
    const commonFn = {

        /**
         * 将图片转换成base64格式
         * @param img 图片文件
         * author: Jacky
         */
         imageUrlToBase64(url) {
          //一定要设置为let，不然图片不显示
          let image = new Image();
      
          //解决跨域问题
          image.setAttribute('crossOrigin', 'anonymous');
          
          let imageUrl = "http://bigf.cqugeo.cn/landslip/res/defaultImages/default.png";
          image.src = imageUrl
          
          //image.onload为异步加载
          image.onload = () => {
            var canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            var context = canvas.getContext('2d');
            context.drawImage(image, 0, 0, image.width, image.height);
            
            var quality = 0.8;
            //这里的dataurl就是base64类型
            var dataURL = canvas.toDataURL("image/jpeg", quality);//使用toDataUrl将图片转换成jpeg的格式,不要把图片压缩成png，因为压缩成png后base64的字符串可能比不转换前的长！
            
            return dataURL
          }
        },
        //将一个数组分成多个数组
        group(array, subGroupLength) {
            let index = 0;
            let newArray = [];
            while (index < array.length) {
                newArray.push(array.slice(index, index += subGroupLength));
            }
            return newArray;
        },
        onCopy() {
            context.$message.success("复制成功")
        },
        // 消息提示
        TipsMessage(
            Msg = "",
            Type = "warning",
            Time = 3000,
            IsCenter = true,
            IsHTML = false
        ) {
            Message({
                type: Type,
                center: IsCenter,
                duration: Time,
                dangerouslyUseHTMLString: IsHTML,
                message: Msg
            });
        },
    }

    // 限制输入的数字..
    const limitInputNum = function(value, before, after, state = true) {
        // input框的类型必须是text...
        // value,输入框传输的值..
        // before,指定小数点前面的位数..
        // after, 指定小数点后面的位数..
        // state, 是否可以输入小数点, 默认为true,可以输入小数点..false, 不能输入小数点.
        value = value.toString().replace("。", ".");
        let newBefore = parseFloat(before);
        let newAfter = parseFloat(after);
        value = value.replace(/[^ \d.]|\s|^\./g, "");
        value = value.replace(/^0{2,}/g, "0");
        if (state) {
            value = value.replace(/\.{2,}/g, ".");
        } else {
            value = value.replace(/\./g, "");
        }
        value = value
            .replace(".", "$#$")
            .replace(/\./g, "")
            .replace("$#$", ".");
        if (value.indexOf(".") >= 0) {
            value =
                value.split(".")[0].slice(0, newBefore) +
                "." +
                value.split(".")[1].slice(0, newAfter);
            return value;
        } else {
            value = value.slice(0, newBefore);
            return (parseFloat(value) || value);
        }
    }

    // 定义一个深拷贝函数  接收目标target参数
    const DeepClone = function(target) {
        // 定义一个变量
        let result
            // 如果当前需要深拷贝的是一个对象的话
        if (typeof target === 'object') {
            // 如果是一个数组的话
            if (Array.isArray(target)) {
                result = [] // 将result赋值为一个数组，并且执行遍历
                for (const i in target) {
                    // 递归克隆数组中的每一项
                    result.push(this.DeepClone(target[i]))
                }
                // 判断如果当前的值是null的话；直接赋值为null
            } else if (target === null) {
                result = null
                    // 判断如果当前的值是一个RegExp对象的话，直接赋值
            } else if (target.constructor === RegExp) {
                result = target
            } else {
                // 否则是普通对象，直接for in循环，递归赋值对象的所有值
                result = {}
                for (const i in target) {
                    result[i] = this.DeepClone(target[i])
                }
            }
            // 如果不是对象的话，就是基本数据类型，那么直接赋值
        } else {
            result = target
        }
        // 返回最终结果
        return result
    }

    const dateFrom = {
        //中国标准时间转"2020-12-7 15:38:7" state: 1.只要年月日 2.只要时分秒
        datetime(time, state) {
            var d = new Date(time);
            if (state == 1) {
                return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
            } else if (state == 2) {
                return (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()) + ':' + (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()) + ':' + (d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds());
            }
            return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()) + ':' + (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()) + ':' + (d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds());
        },
        // 秒转时分秒 "00:00:00"
        formatSeconds(value) {
            var theTime = parseInt(value); // 秒
            var theTime1 = 0; // 分
            var theTime2 = 0; // 小时
            // alert(theTime);
            if (theTime > 60) {
                theTime1 = parseInt(theTime / 60);
                theTime = parseInt(theTime % 60);
                // alert(theTime1+"-"+theTime);
                if (theTime1 > 60) {
                    theTime2 = parseInt(theTime1 / 60);
                    theTime1 = parseInt(theTime1 % 60);
                }
            }
            var result = "" + parseInt(theTime) + "秒";
            if (theTime1 > 0) {
                result = "" + parseInt(theTime1) + "分" + result;
            }
            if (theTime2 > 0) {
                result = "" + parseInt(theTime2) + "小时" + result;
            }
            return result;
        },
        // 获取今日的开始结束时间
        getToday() {
            let obj = []
            obj[0] = moment(moment().startOf("day").valueOf()).format("YYYY-MM-DD HH:mm:ss");
            obj[1] = moment(moment().valueOf()).format("YYYY-MM-DD HH:mm:ss");
            return obj
        },
        // 获取昨日的开始结束时间
        getYesterday() {
            let obj = []
            obj[0] = moment(moment().add(-1, 'days').startOf("day").valueOf()).format("YYYY-MM-DD HH:mm:ss");
            obj[1] = moment(moment().add(-1, 'days').endOf('day').valueOf()).format('YYYY-MM-DD HH:mm:ss');
            return obj
        },
        //获取近一周的开始结束时间new Date() - 60000*60*24*7
        getWeek() {
            let obj = []
            obj[0] = moment(new Date() - 60000 * 60 * 24 * 7).format("YYYY-MM-DD HH:mm:ss");
            obj[1] = moment(moment().valueOf()).format("YYYY-MM-DD HH:mm:ss");
            return obj
        },
        //最近三个月
        getLast3Month(mon) {
            var now = new Date()
            var year = now.getFullYear()
            var month = now.getMonth() + 1 //0-11表示1-12月
            var day = now.getDate()
            var dateObj = []
            if (parseInt(month) < 10) {
                month = '0' + month
            }
            if (parseInt(day) < 10) {
                day = '0' + day
            }

            dateObj[1] = moment(moment().valueOf()).format("YYYY-MM-DD HH:mm:ss")

            //一年
            if (mon == 12) {
                if (parseInt(month) == 1) {
                    //如果是1月份，则取上一年的10月份
                    dateObj[0] = parseInt(year) - 1 + month + day
                    return dateObj
                }
            }
            //一个月
            if (mon == 1) {
                if (parseInt(month) == 1) {
                    //如果是1月份，则取上一年的10月份
                    dateObj[0] = parseInt(year) - 1 + '-12-' + day
                    return dateObj
                }
            }
            //三个月
            if (mon == 3) {
                if (parseInt(month) == 1) {
                    //如果是1月份，则取上一年的10月份
                    dateObj[0] = parseInt(year) - 1 + '-10-' + day
                    return dateObj
                }
                if (parseInt(month) == 2) {
                    //如果是2月份，则取上一年的11月份
                    dateObj[0] = parseInt(year) - 1 + '-11-' + day
                    return dateObj
                }
                if (parseInt(month) == 3) {
                    //如果是3月份，则取上一年的12月份
                    dateObj[0] = parseInt(year) - 1 + '-12-' + day
                    return dateObj
                }
            }
            //六个月
            if (mon == 6) {
                if (parseInt(month) == 1) {
                    //如果是1月份，则取上一年的10月份
                    dateObj[0] = parseInt(year) - 1 + '-7-' + day
                    return dateObj
                }
                if (parseInt(month) == 2) {
                    //如果是2月份，则取上一年的11月份
                    dateObj[0] = parseInt(year) - 1 + '-8-' + day
                    return dateObj
                }
                if (parseInt(month) == 3) {
                    //如果是3月份，则取上一年的12月份
                    dateObj[0] = parseInt(year) - 1 + '-9-' + day
                    return dateObj
                }
                if (parseInt(month) == 4) {
                    //如果是1月份，则取上一年的10月份
                    dateObj[0] = parseInt(year) - 1 + '-10-' + day
                    return dateObj
                }
                if (parseInt(month) == 5) {
                    //如果是2月份，则取上一年的11月份
                    dateObj[0] = parseInt(year) - 1 + '-11-' + day
                    return dateObj
                }
                if (parseInt(month) == 6) {
                    //如果是3月份，则取上一年的12月份
                    dateObj[0] = parseInt(year) - 1 + '-12-' + day
                    return dateObj
                }
            }

            var preSize = new Date(year, parseInt(month) - mon, 0).getDate() //开始时间所在月的总天数
            if (preSize < parseInt(day)) {
                // 开始时间所在月的总天数<本月总天数，比如当前是5月30日，在2月中没有30，则取下个月的第一天(3月1日)为开始时间
                let resultMonth =
                    parseInt(month) - 2 < 10 ?
                    '0' + parseInt(month) - 2 :
                    parseInt(month) - 2
                dateObj[0] = year + '-' + resultMonth + '-01'
                return dateObj
            }

            if (parseInt(month) <= 10) {
                dateObj[0] = year + '-0' + (parseInt(month) - mon) + '-' + day
                return dateObj
            } else {
                dateObj[0] = year + '-' + (parseInt(month) - mon) + '-' + day
                return dateObj
            }
        }
    }

    //数组方法
    const ArrayFunction = {
            //两数组去除重复数值
            mergeArray: function(arr1, arr2) {
                for (var i = arr1.length - 1; i >= 0; i--) {
                    var str = JSON.stringify(arr1[i]);
                    var f = false;
                    for (var j = arr2.length - 1; j >= 0; j--) {
                        if (JSON.stringify(arr2[j]) == str) {
                            arr2.splice(j, 1);
                            f = true;
                        }
                    }
                    if (f) {
                        arr1.splice(i, 1);
                    }
                }
                return arr1;
            }
        }
        // 点击分页，回到顶部
    const goPageTop = function(name) {
            let page = document.querySelector(name)
            if (page.scrollTop > 0) {
                page.scrollTop = 0
            }
        }
        //验证大写字母，小写字母，数字，特殊字符四选三组成的密码强度，且长度在8到30个数之间
        // const SystemPassword = '^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,30}$';
        //密码为数字，小写字母，大写字母，特殊符号 至少包含三种，长度为 8 - 30位
    const SystemPassword = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,30}$/;
    //密码为数字，小写字母，大写字母，长度为6位
    const AdminPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6}$/;
    //格式化屏蔽部分手机号
    const phoneShield = function(val) {
            if (val) {
                return val.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
            }
        }
        ///格式化屏蔽部分邮箱
    const emailShield = function(val) {
        if (val) {
            return val.replace(/(.{2}).+(.{2}@.+)/g, "$1****$2")
        }
    }

    context.$elementResizeDetectorMaker = elementResizeDetectorMaker;
    inject("elementResizeDetectorMaker", elementResizeDetectorMaker);

    context.$limitInputNum = limitInputNum;
    inject("limitInputNum", limitInputNum);

    context.$goPageTop = goPageTop;
    inject("goPageTop", goPageTop);

    context.$DeepClone = DeepClone;
    inject("DeepClone", DeepClone);

    context.$ArrayFunction = ArrayFunction;
    inject("ArrayFunction", ArrayFunction);

    context.$SystemPassword = SystemPassword;
    inject("SystemPassword", SystemPassword);

    context.$AdminPassword = AdminPassword;
    inject("AdminPassword", AdminPassword);

    context.$phoneShield = phoneShield;
    inject("phoneShield", phoneShield);

    context.$emailShield = emailShield;
    inject("emailShield", emailShield);

    context.$echarts = echarts
    inject('echarts', echarts)

    context.$Clipboard = Clipboard
    inject('Clipboard', Clipboard)

    context.$md5 = md5
    inject('md5', md5)

    context.$commonFn = commonFn
    inject('commonFn', commonFn)

    context.$commonSwitch = commonSwitch
    inject('commonSwitch', commonSwitch)

    context.$dateFrom = dateFrom
    inject('dateFrom', dateFrom)

    context.$WebSocketClient = WebSocketClient
    inject('WebSocketClient', WebSocketClient)

    context.$_ = _
    inject('_', _)
}