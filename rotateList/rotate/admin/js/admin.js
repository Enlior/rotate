$(document).ready(function(){

//    //点击修改
//    $("body").delegate(".modify", "click", function(){
//        if($("table td .submit_btn").length === 0){
//            var this_parent = $(this).parent();
//            $(this_parent).html("<button class='submit_btn'>确认</button>");
//            var this_num = $(this_parent).siblings().eq(1).html();//奖品数量
//            $(this_parent).siblings().eq(1).html("<input type='text' value='" + this_num + "' />");
//            var this_pro = $(this_parent).siblings().eq(2).html();//中奖概率
//            $(this_parent).siblings().eq(2).html("<input type='text' value='" + this_pro + "' />");
//        }else{
//            alert("请先确认修改！");
//            $(".submit_btn").focus();
//        }
//    })
//
//    //确认修改
//    $("body").delegate(".submit_btn", "click", function(){
//        var this_parent = $(this).parent();
//        if(confirm("确认修改！")){
//            $(this_parent).html("<a href='javascript:;' class='modify'>修改</a>");
//            var this_num_val = $(this_parent).siblings().eq(1).children("input").val();//奖品数量
//            $(this_parent).siblings().eq(1).html(this_num_val);
//            var this_pro_val = $(this_parent).siblings().eq(2).children("input").val();//中奖概率
//            $(this_parent).siblings().eq(2).html(this_pro_val);
//        }else{
//            $(this_parent).siblings().eq(1).children("input").focus();
//        }
//    })

    //抽奖人数
    upate_person()
    setInterval(upate_person,10000);
    function upate_person(){
        $.ajax({
            url: 'http://www.dooland.com/magazine/special/ngsxAction/upate_person.php',
            success: function(data){
                $("#person_count").html(data+"人");
            }
        })
    }

    var html = "", all_count = 0;
    var data_cout = new Array();

    //第一次打开页面显示的table数据
    var date = new Date();//日期
    var today = date.getDate();
    if(today>14 && today<21){
        today_tab(today);
        table_data(today);
    }else{
        today_tab(15);
        table_data(15);
    }
    function today_tab(today){
        var date_list = [15,16,17,18,19,20];
        var today_index = date_list.indexOf(today);
        $("#tab").find("span").eq(today_index).addClass("cur");
    }

    //table表格的tab切换
    $("#tab span").each(function(){
        $(this).click(function(){
            $(this).addClass("cur").siblings().removeClass("cur");
            var this_index = $(this).index();
            var date_list = [15,16,17,18,19,20];
            var selected_date = date_list[this_index];
            table_data(selected_date);
        })
    })

    //table里面的数据
    function table_data(selected_date){
        $.ajax({
            url: 'http://www.dooland.com/magazine/special/ngsxAction/index.php?debug=1&date=2014-08-'+selected_date,
            async: false,
            beforeSend:loading,
            success: function(data){
                data = JSON.parse(data);
                if(data.status === 1){
                    var td_chance = new Array(),td_prize = new Array(), td_overplus = new Array();
                    var datas = data.data;
                    var data_chance,data_prize,data_number;
                    var datas_i = "";
                    html = "";
                    for(var i = 1;i < 9;i++){
                        datas_i = ""+i;
                        data_prize = datas[datas_i].prize;//产品名称
                        td_prize.push(data_prize);
                        data_chance =  datas[datas_i].chance;//中奖概率
                        td_chance.push(parseFloat(data_chance));
                        data_number =  datas[datas_i].number;//剩余数量
                        td_overplus.push(parseFloat(data_number));
                    }
                    each_count(selected_date);;//每个产品的总数和所有奖品的数量
                    for(var i=0;i<td_prize.length;i++){
                        var sent_count = data_cout[i] - td_overplus[i];//已发奖品
                        if(i===0){
                            html +="<tr><td>" + td_prize[i] + "</td><td>" + data_cout[i] + "</td><td>" + td_chance[i] + "</td><td>" + sent_count + "</td><td>" + td_overplus[i] + "</td><td rowspan='8'>" + all_count + "</td></tr>"
                        }else{
                            html +="<tr><td>" + td_prize[i] + "</td><td>" + data_cout[i] + "</td><td>" + td_chance[i] + "</td><td>" + sent_count + "</td><td>" + td_overplus[i] + "</td></tr>"
                        }
                    }
                    $("#admin_table tbody").empty();
                    $("#admin_table tbody").html(html);
                }else{
                    alert(data.error);
                }
            }
        })
    }



    //每个产品的总数
    function each_count(selected_date){
//        var arr = [
//            [10,2,2,0,1,120,2,1],
//            [10,1,1,0,1,80,1,1],
//            [30,8,8,1,3,239,8,3],
//            [30,7,7,0,3,209,7,3],
//            [10,1,1,0,1,81,1,1],
//            [10,1,1,0,1,90,1,1]
//        ];
//
//        var start = 815;
//        var now = new Date();
//        var date = (1+now.getMonth())*100 + now.getDate();
//        var index = date - start;
//        if(index < 0){
//
//        }else if(index > 6){
//
//        }else {
//            var data = arr[index];
//        }
        all_count = 0;
        var data_cout15 = [10,2,2,0,1,120,2,1];
        var data_cout16 = [10,1,1,0,1,80,1,1];
        var data_cout17 = [30,8,8,1,3,239,8,3];
        var data_cout18 = [30,7,7,0,3,209,7,3];
        var data_cout19 = [10,1,1,0,1,81,1,1];
        var data_cout20 = [10,1,1,0,1,90,1,1];
//        var date = new Date();//日期
//        var today = date.getDate();
        switch (selected_date) {
            case 15:
                data_cout = data_cout15
                break;
            case 16:
                data_cout = data_cout16
                break;
            case 17:
                data_cout = data_cout17
                break;
            case 18:
                data_cout = data_cout18
                break;
            case 19:
                data_cout = data_cout19
                break;
            case 20:
                data_cout = data_cout20
                break;
        }
        for(var i=0; i<data_cout.length; i++){
            all_count += data_cout[i]
        }
        return data_cout,all_count;
    }

    function loading(){
        $("#admin_table tbody").html("<img src='images/loading_img.gif' class='loading_img' />")
    }
})