var dropBtnStatus = false;

//Load Swift Code Data
var data = [{"name":"apple","status":"(n.)","chineseName":"蘋果"},{"name":"pineapple","status":"(n.)","chineseName":"鳳梨"},{"name":"banana","status":"(n.)","chineseName":"香蕉"},{"name":"papaya","status":"(n.)","chineseName":"木瓜"},{"name":"grape","status":"(n.)","chineseName":"葡萄"},{"name":"strawberry","status":"(n.)","chineseName":"草莓"},{"name":"kiwi","status":"(n.)","chineseName":"奇異果"},{"name":"longan","status":"(n.)","chineseName":"龍眼"},{"name":"orange","status":"(n.)","chineseName":"柳橙"},{"name":"mandarine","status":"(n.)","chineseName":"橘子"},{"name":"cherry","status":"(n.)","chineseName":"櫻桃"},{"name":"peach","status":"(n.)","chineseName":"水蜜桃"},{"name":"cranberry","status":"(n.)","chineseName":"蔓越莓"},{"name":"mango","status":"(n.)","chineseName":"芒果"},{"name":"wax-apple","status":"(n.)","chineseName":"蓮霧"},{"name":"durian","status":"(n.)","chineseName":"榴槤"},{"name":"pitaya","status":"(n.)","chineseName":"火龍果"},{"name":"guava","status":"(n.)","chineseName":"芭樂"},{"name":"shaddock/pomelo","status":"(n.)","chineseName":"柚子"},{"name":"passion fruit","status":"(n.)","chineseName":"百香果"},{"name":"Hami melon","status":"(n.)","chineseName":"哈密瓜"},{"name":"pumpkin","status":"(n.)","chineseName":"南瓜"}];
var Vocabulary = [];
var Dict = [];

$(document).ready(function () {

    $('#dropdown_Vocab').dropdown('toggle');
    dynamicSearchVocabulary();

    var top = $('#text_Vocab').height()+48;
    $('#dropdown_Vocab').css("position","fixed");
    $('#dropdown_Vocab').css("top", top + "px");
    $('#dropdown_Vocab').css("left", 15 + "px");

    $.each(data, function (key, value) {
        Vocabulary.push(value.name);

        var val;
        if ("" != value.status && "" != value.chineseName) {
            val = value.status + ' ' + value.chineseName;
        }
        else {
            val = null;
        }
        
        Dict.push({
            key: value.name,
            value: val
        });
    });

    //鍵盤事件
    $('body').keyup(function (e) {

        //下
        if (e.keyCode == 40 && dropBtnStatus == false) {
            $('#dropdown_Vocab > a:first-child').focus();
            dropBtnStatus = true;
        }
        
        //enter
        if (e.keyCode == 13) {
            $("#dropdown_Vocab").hide();
            dropBtnStatus = false;
        }

        //英文
        if (e.keyCode >= 65 && e.keyCode <= 90 && dropBtnStatus == true) {
            $("#text_Vocab").focus();
            //$("#text_Vocab").val($("#text_Vocab").val() + e.key);
            dynamicSearchVocabulary();
        }

        //delete
        if (e.keyCode == 8 && dropBtnStatus == true) {
            $("#text_Vocab").focus();
            $("#text_Vocab").val($("#text_Vocab").val().substring(0, $("#text_Vocab").val().length - 1));
            dynamicSearchVocabulary();
        }
    });

    //USER輸入可模糊搜尋
    $("#text_Vocab").keyup(function (e) {
        if(0 != $("#text_Vocab").val().length){
            dynamicSearchVocabulary();
        }
        else{
            $("#dropdown_Vocab").hide();
            dropBtnStatus = false; 
        }
    });

    //滑鼠點取即隱藏搜尋選單
    $('body').mouseup(function (e) {
        $("#dropdown_Vocab").hide();
        dropBtnStatus = false;
    });
});

function openVocab(vocab){
    $('#text_Vocab').val(vocab);

    $.each(Dict, function (key, value) {
        if (Dict[key].key == vocab && null != Dict[key].value) {
            $('#span_InfoText').text(Dict[key].value);
            $("#span_InfoText").attr('style', 'visibility: visible');
        }
    })
}

function dynamicSearchVocabulary() {
    dropBtnStatus = false;
    var input_Vocabulary = $("#text_Vocab").val().toUpperCase();

    $("#dropdown_Vocab > a").remove();

    var hasMatched = false;
    var resultLimited = 15;
    $.each(Vocabulary, function (key, value) {
        if (input_Vocabulary == value.substring(0, input_Vocabulary.length).toUpperCase() && resultLimited-- >= 1) {
            $("#dropdown_Vocab").append('<a href="#" class="dropdown-item" onclick="openVocab(\'' + value + '\');">' + value + '</a>');
            hasMatched = true;
        }
    });

    if (hasMatched) {
        $("#dropdown_Vocab").show();
    }
    else {
        $("#dropdown_Vocab").hide();
        dropBtnStatus = true;
    }
}