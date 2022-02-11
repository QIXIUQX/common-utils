"use strict";

/** 时间日期操作相关方法 */
var dateUtils = {};

/** 公共方法 */
var commonUtils = {};

/** ==================== commonUtils ====================*/
/**
 * 不足10的话前面补0
 * @param {Number} number
 * @returns {Number|string}
 */
commonUtils.fillWith0 = function (number) {
    return number >= 10 ? number : "0" + number;
};

/** ==================== dateUtils ====================*/

/**
 * 将指定的时间格式化为时间对象，并以对象的形式放回出来，注意：星期日为0
 * @param {String|Number|Date} time time需要转换为对象的时间，支持时间日期字符串或时间戳
 * @param {Boolean} fill0 是否需要补0  false 不补0 true 补0
 * @returns {Object} 返回值类型一个包含日期时间星期的对象
 */
dateUtils.formatTimeStrOrTimeStampToObject = function (time, fill0) {
    if (!fill0) fill0 = false;
    var _timeStamp = new Date(time);
    var _timeStampObj = {
        "WEEK_MAP": ["日", "一", "二", "三", "四", "五", "六"],
        "QUARTER_MAP": ["一", "二", "三", "四"],
        "year": _timeStamp.getFullYear(),
        "month": _timeStamp.getMonth() + 1,
        "week": _timeStamp.getDay(),
        "day": _timeStamp.getDate(),
        "hour": _timeStamp.getHours(),
        "minutes": _timeStamp.getMinutes(),
        "seconds": _timeStamp.getSeconds(),
        "milliSeconds": _timeStamp.getMilliseconds(),
        "quarter": Math.floor((_timeStamp.getMonth() + 3) / 3) - 1
    };
    if (fill0) {
        _timeStampObj.month = commonUtils.fillWith0(_timeStampObj.month);
        _timeStampObj.day = commonUtils.fillWith0(_timeStampObj.day);
        _timeStampObj.hour = commonUtils.fillWith0(_timeStampObj.hour);
        _timeStampObj.minutes = commonUtils.fillWith0(_timeStampObj.minutes);
        _timeStampObj.seconds = commonUtils.fillWith0(_timeStampObj.seconds);
    }

    return _timeStampObj;
};

/**
 * 将日期时间按照指定的字符串进行格式化() 如 传入 yyyy-MM-dd hh:mm:ss 将会返回 2022-02-11 12:24:48，字符含义：
 * yyyy 年，
 * MM 月，
 * dd 日，
 * hh 时（24小时制），
 * mm 分，
 * ss 秒，
 * S 毫秒，
 * week 周，
 * quarter 季度
 * @param timeStamp 需要被格式化的时间
 * @param formatStr 指定格式化的字符串 如：yyyy-MM-dd hh:mm:ss
 * @returns {string} 格式化后的字符串
 */
dateUtils.dateFormat = function (timeStamp, formatStr) {
    var item = void 0;
    var DATE_KEY_MAP = [{
        reg: /yyyy/,
        date: "year"
    }, {
        reg: /MM/,
        date: "month"
    }, {
        reg: /dd/,
        date: "day"
    }, {
        reg: /hh/,
        date: "hour"
    }, {
        reg: /mm/,
        date: "minutes"
    }, {
        reg: /ss/,
        date: "seconds"
    }, {
        reg: /S/,
        date: "milliSeconds"
    }];
    var _date = dateUtils.formatTimeStrOrTimeStampToObject(timeStamp, true);

    if (!formatStr) {
        formatStr = "yyyy-MM-dd hh:mm:ss";
    }

    for (var i = 0; i < DATE_KEY_MAP.length; i++) {
        item = DATE_KEY_MAP[i];
        formatStr = formatStr.replace(item.reg, _date[item.date] + '');
    }

    formatStr = formatStr.replace(/week/g, _date.WEEK_MAP[_date.week] + "");
    formatStr = formatStr.replace(/quarter/g, _date.QUARTER_MAP[_date.quarter] + "");

    return formatStr;
};
