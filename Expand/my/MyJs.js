//检测浏览器是否开启开发者控制台
// (function () {
//     'use strict'
//     var devtools = {
//         open: false,
//         orientation: null
//     }
//     var threshold = 160
//     var emitEvent = function (state, orientation) {
//         window.dispatchEvent(new CustomEvent('devtoolschange', {
//             detail: {
//                 open: state,
//                 orientation: orientation
//             }
//         }))
//     }
//     setInterval(function () {
//         var widthThreshold = window.outerWidth - window.innerWidth > threshold
//         var heightThreshold = window.outerHeight - window.innerHeight > threshold
//         var orientation = widthThreshold ? 'vertical' : 'horizontal'

//         if (!(heightThreshold && widthThreshold) &&
//             ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)) {
//             if (!devtools.open || devtools.orientation !== orientation) {
//                 emitEvent(true, orientation)
//             }
//             devtools.open = true
//             devtools.orientation = orientation
//         } else {
//             if (devtools.open) {
//                 emitEvent(false, null)
//             }
//             devtools.open = false
//             devtools.orientation = null
//         }
//     }, 500)
//     if (typeof module !== 'undefined' && module.exports) {
//         module.exports = devtools
//     } else {
//         window.devtools = devtools
//     }
// })()
$(function () {
    //初始化所有复选框
    $("input[type=checkbox]").prop("checked", false);
    //禁用右键菜单
    // $(document).on("contextmenu", function () { return false; });
    //禁用F12事件
    // window.onkeydown = function (e) {
    //     if (e.keyCode === 123) {
    //         e.preventDefault()
    //     }
    // }
    // 检测浏览器是否开启开发者控制台
    // window.addEventListener('devtoolschange', function (e) {
    //     if (e.detail.open) {
    //         PromptBoxShowAndHide(null, "您开启了开发者工具..", null, "gantan");
    //         // $("body").css("display", "none");
    //         setTimeout(() => {
    //             $("body").css("display", "none");
    //         }, 4000);
    //     }
    //     else {
    //         $("body").css("display", "block");
    //     }
    // })


})
// =============================================================================
// 输入框
$(document).on("focus", ".input", function () {
    $(this).css({
        "background-color": "#a7c0f1"
    });
});
$(document).on("focusout", ".input", function () {
    $(this).css({
        "background-color": "#d2ddf3"
    });
});
// =============================================================================
// 金钱框
$(document).on("keydown", ".input.ld_input_money", function (e) {
    if (e.key == "+" || e.key == "-") {
        return false;
    }
});
// =============================================================================
// 纯数字框
$(document).on("keydown", ".input.ld_input_num", function (e) {
    if (e.key == "." || e.key == "+" || e.key == "-") {
        return false;
    }
});
// =============================================================================
// 日期(需要复制到HTML)
// $(".input.dl_input_date").myDatePicker({
//     "startDate": '2000-01-01', //不指定则取2014-01-01
//     "endDate": '2020-01-01',  //不指定则取当天
//     "parent": $("body"), //不指定则取body
//     "positionFixed": false, //定位方式
//     "view": 2 //默认为2  0-4五个数字分别表示 年、月、日、周、季度 五个视图
// });
// $(".input.dl_input_date")[0].resetDatePicker({
//     "view": 2,
//     "startDate": GetDate(),
// });
// =============================================================================
/*
 * 创建节点
 */
function CreatePromptBox(text, type) {
    var backgroundColor;
    var FontColor;
    var borderColor;
    var icon;
    switch (type) {
        case 1:
            backgroundColor = "#FEF0F0";
            FontColor = "#F56C6C";
            borderColor = "#FDE2E2";
            icon = "iconfont icon-chahao";
            break;
        case 2:
            backgroundColor = "#F0F9EB";
            FontColor = "#67C23A";
            borderColor = "#E1F3D8";
            icon = "iconfont icon-gou";
            break;
        case 3:
            backgroundColor = "#FDF6EC";
            FontColor = "#E6A23C";
            borderColor = "#FAECD8";
            icon = "iconfont icon-gantanhao-yuankuang";
            break;
        default:
            break;
    }
    let $PromptBox = $("<div></div>");
    let $i = $("<i></i>");
    $i.attr("class", icon).css({
        "color": FontColor,
        "margin-left": "50px",
        "float": "left",
        "font-size": "15px"
    });
    let $span = $("<span></span>");
    $span.css({
        "float": "left",
        "font-size": "15px",
        "margin-left": "10px"
    });
    $PromptBox.css({
        "position": "fixed",
        "left": "50%",
        "top": "-" + (50 + 10) + "px",
        "width": 300 + "px",
        "height": 50 + "px",
        "line-height": 50 + "px",
        "background-color": backgroundColor,
        "color": FontColor,
        "transform": "translateX(-50%)",
        "text-align": "center",
        "border-radius": "5px",
        "font-size": "13px",
        "border": "0.2px solid " + borderColor
    });
    $span.text(text);
    $PromptBox.append($i);
    $PromptBox.append($span);
    return $PromptBox;
}
/**
 * 节点显示
 */
function ElementShow(obj, AnimationTime) {
    obj.animate({
        top: "20px"
    }, AnimationTime * 1000);
}
/**
 * 节点隐藏
 */
function ElementHide(obj, AnimationTime) {
    var height = parseInt(obj.css("height"));
    obj.animate({
        top: ((height + 10) * -1) + "px"
    }, AnimationTime * 1000, function () {
        obj.remove();
    });
}
/**
 * 高度封装提示框弹出,隐藏,删除
 */
function PromptBoxShowAndHide(body, text, AnimationTime, type) {
    AnimationTime = AnimationTime == null ? 0.5 : AnimationTime;
    text = text == null ? "无提示文本" : text;
    body = body == null ? $("body") : body;
    type = type == null ? 3 : type;
    var $PromptBox = CreatePromptBox(text, type);
    $("body").append($PromptBox);
    ElementShow($PromptBox, AnimationTime);
    setTimeout(() => {
        ElementHide($PromptBox, AnimationTime);
    }, (AnimationTime * 2) + 3000);
}
// =============================================================================
/**
 * 分页
 */
// var PageIndex = 1;
// var PageCount = 20;
// var Num_Count = 5;
// function CreatePageIndex() {
//     var ca = Math.floor(Num_Count / 2);
//     var min = PageIndex - ca;
//     var max = PageIndex + ca;
//     var minx = 0;
//     if (min <= 0) {
//         minx = 1 - min;
//         min = 1;
//         max += minx;
//     } i
//     var maxx = 0;
//     if (max > PageCount) {
//         maxx = max - PageCount;
//         max -= maxx
//         min -= maxx;
//         if (min <= 0) {
//             min = 1;
//         }
//     }
//     var arr = "";
//     for (var i = min; i <= max; i++) {
//         arr += i + ",";
//     }
//     arr = arr.substring(0, arr.length - 1);
//     return arr.split(',');
// }
// function CreatePageIndexLabel(ShowNum, obj) {
//     Num_Count = ShowNum;
//     if (Num_Count > PageCount) {
//         Num_Count = PageCount;
//     }
//     $div = $("<div></div>");
//     $div.attr("class", "PageIndex");
//     $ul = $("<ul><ul/>");
//     $i_left = $("<i></i>");
//     $i_left.attr("class", "iconfont icon-zuo Less");
//     $ul.append($i_left);
//     $i_right = $("<i></i>");
//     $i_right.attr("class", "iconfont icon-you Add");
//     for (var i = 1; i <= Num_Count; i++) {
//         $li = $("<li></li>");
//         $li.text(i);
//         i == 1 ? $li.addClass("PageSelectIndex") : null;
//         $ul.append($li);
//     }
//     $ul.append($i_right);
//     $div.append($ul);
//     obj.append($div);
// }
// $(document).on("click", ".PageIndex ul .Less", function () {
//     PageIndex--;
//     if (PageIndex <= 0) {
//         PageIndex = 1;
//     }
//     var indexs = CreatePageIndex();
//     var $lis = $(".PageIndex ul li");
//     $lis.removeClass("PageSelectIndex");
//     UpdateLi(indexs);
//     $lis.each(function (index, item) {
//         if ($(item).text() == PageIndex) {
//             $(item).addClass("PageSelectIndex");
//         }
//     });
// });
// $(document).on("click", ".PageIndex ul .Add", function () {
//     PageIndex++;
//     if (PageIndex > PageCount) {
//         PageIndex = PageCount;
//     }
//     var indexs = CreatePageIndex();
//     var $lis = $(".PageIndex ul li");
//     $lis.removeClass("PageSelectIndex");
//     UpdateLi(indexs);
//     $lis.each(function (index, item) {
//         if ($(item).text() == PageIndex) {
//             $(item).addClass("PageSelectIndex");
//         }
//     });
// });
// $(document).on("click", ".PageIndex ul li", function () {
//     PageIndex = parseInt($(this).text())
//     var indexs = CreatePageIndex();
//     var $lis = $(".PageIndex ul li");
//     $lis.removeClass("PageSelectIndex");
//     UpdateLi(indexs);
//     $lis.each(function (index, item) {
//         if ($(item).text() == PageIndex) {
//             $(item).addClass("PageSelectIndex");
//         }
//     });
// });
// function UpdateLi(indexs) {
//     $lis = $(".PageIndex ul li");
//     for (var i = 0; i < indexs.length; i++) {
//         $lis.eq(i).text(indexs[i]);
//     }
// }
// =============================================================================
/**
 * 加载动画
 */
function PageLoad(imgPath) {
    var LoadBox = $("<div class=\"Load\"><img src=\"" + imgPath + "\"></div>");
    LoadBox.css({
        "opacity": "0"
    });
    $("body").append(LoadBox);
    LoadBox.animate({
        opacity: "0.5"
    }, 200)
}
function PageHideLoad() {
    var LoadBox_ = $(".Load");
    LoadBox = null;
    if (LoadBox_ == null) {
        return;
    }
    LoadBox_.animate({
        opacity: "0"
    }, 200, function () {
        LoadBox_.remove();
    });
}
// =============================================================================
/**
 * 全选文本
 * @param {*} theField 
 */
function TextSelectAll(theField) {
    var templar = eval("document." + theField);
    templar.select();
}
// =============================================================================
/**
 * 复制到粘贴板
 * @param {*} str 
 */
function CopyText(str) {
    var save = function (e) {
        e.clipboardData.setData('text/plain', str);
        e.preventDefault();
    }
    document.addEventListener('copy', save);
    document.execCommand("copy");
}
// =============================================================================
// CheckBox复选框
$(document).on("click", ".ld_CheckBoxLabel", function () {
    if ($(this).prev().prop("checked") == false) {
        $(this).find("line").removeClass("NoChecked");
        $(this).find("line").addClass("Checked");
        $(this).find("rect").css({
            "fill": "rgba(112, 161, 255, 1)",
            "stroke-width": " 0px"
        });
    }
    else {
        $(this).find("line").removeClass("Checked");
        $(this).find("line").addClass("NoChecked");
        $(this).find("rect").css({
            "fill": "white",
            "stroke-width": " 1px"
        });
    }

});
// =============================================================================
// 存cookies
function addCookie(objName, objValue, objHours) {
    var str = objName + "=" + escape(objValue); //编码
    if (objHours > 0) {//为0时不设定过期时间，浏览器关闭时cookie自动消失
        var date = new Date();
        var ms = objHours * 3600 * 1000;
        date.setTime(date.getTime() + ms);
        str += "; expires=" + date.toGMTString();
    }
    document.cookie = str;
}
// =============================================================================
// 取cookies
function getCookie(objName) {//获取指定名称的cookie的值
    var arrStr = document.cookie.split("; ");
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] == objName) return unescape(temp[1]);  //解码
    }
    return "";
}
// =============================================================================
// 获取地址栏参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;

}
// =============================================================================
//判断是否为空
function isNull(object) {
    if (object == null || object == "" || object == undefined) {
        return false;
    }
    for (let key in object) {
        if (object[key] == null || object[key] == "" || object[key] == undefined) {
            return false;
        }
    }
    return true;
}
// =============================================================================
// "/Date()/"格式日期转换
function FormatToDate(val) {
    if (val != null) {
        var date = new Date(parseInt(val.replace("/Date(", "").replace(")/", ""), 10));
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return date.getFullYear() + "-" + month + "-" + currentDate;
    }
    return "";
}
// =============================================================================
// AJAX请求
function Ajax(url, json, beforeSend, success, error, complete) {
    var json_obj;
    if (json == null) {
        json_obj = null;
    }
    else {
        json_obj = JSON.stringify(json);
    }
    $.ajax({
        type: "post",
        url: url,
        data: json_obj,
        contentType: "application/json",
        beforeSend: function () { beforeSend() },
        success: function (response) {
            success(response);
        },
        error: function (e) {
            error(e);
        },
        complete: function () {
            complete();
        },
    })
}
// =============================================================================
// 获取当前日期
function GetDate() {
    var date = new Date();
    var getFullYear = date.getFullYear();
    var getMonth = parseInt(date.getMonth()) + 1 < 10 ? "0" + parseInt(date.getMonth()) + 1 : parseInt(date.getMonth()) + 1;
    var getDate = parseInt(date.getDate()) < 10 ? "0" + parseInt(date.getDate()) : parseInt(date.getDate());
    var dateStr = getFullYear + "-" + getMonth + "-" + getDate;
    return dateStr;
}
// =============================================================================