$(function(){

    rotate_fun("#lotteryBtn");
    rotate_fun("#lotteryBtn_tit");
    function rotate_fun(selected){
        var timeOut = function(){  //超时函数
            $(selected).rotate({
                angle:0,
                duration: 10000,
                animateTo: 2160, //这里是设置请求超时后返回的角度，所以应该还是回到最原始的位置，2160是因为我要让它转6圈，就是360*6得来的
                callback:function(){
                    alert('网络超时')
                }
            });
        };
        var rotateFunc = function(awards,angle,text){  //awards:奖项，angle:奖项对应的角度
            $("#lotteryBtn").stopRotate();
            $("#lotteryBtn").rotate({
                angle:0,
                duration: 5000,
                animateTo: angle+1440, //angle是图片上各奖项对应的角度，1440是我要让指针旋转4圈。所以最后的结束的角度就是这样子^^
                callback:function(){
                    if(confirm(text+",确认领奖？")){
                        $.ajax({
                            url: 'http://www.dooland.com/magazine/special/ngsxAction/winner.php?prize=' + awards,
                            success: function (data) {
                                data = JSON.parse(data);
                                if(data.status === 1){
                                    alert("领奖成功！")
                                }else{
                                    alert(data.error);
                                }
                            }
                        })
                    }
                }
            });
        };

        $(selected).rotate({
            bind:
            {
                click: function(){
                    function ratio_chance(){
                        var rotate_arr = new Array();
                        $.ajax({
                            url: 'http://www.dooland.com/magazine/special/ngsxAction/index.php',
                            async: false,
                            success: function (data) {
                                //eval(data);
                                data = JSON.parse(data);
                                if(data === -1){
                                    alert("活动将于8月15日开始举行，敬请期待！");
                                }else if(data === -2){
                                    alert("活动已经结束！");
                                }else if(data === -3){
                                    if(confirm("您好未登录，请先登录！")){
                                        window.location.href = 'http://www.dooland.com/login/';
                                    }
                                }else if(data.status === 1){
                                    var datas = data.data;
                                    var data_chance;
                                    var datas_i = "";
                                    for(var i = 1;i < 9;i++){
                                        datas_i = ""+i;
                                        data_chance =  datas[datas_i].chance;
                                        rotate_arr.push(parseFloat(data_chance));
                                    }
                                }else{
                                    alert(data.error);
                                }
                            }
                        })
                        return rotate_arr;
                    }
                    var ratio = ratio_chance(); //中奖概率
                    var result = randomnum(1, 100);
                    var line = 0;
                    var temp = 0;
                    var returnobj = "0";
                    var index = 0;
                    for(var i = 0; i < ratio.length; i++){
                        var ratio2 = ratio[i];
                        var c = parseFloat(ratio2) * 100;
                        temp = temp + c;
                        line = 100 - temp;
                        index = i + 1;
                        if (c != 0) {
                            if (result > line && result <= (line + c)) {
                                // alert(i+"中奖"+line+"<result"+"<="+(line + c));
                                returnobj = ratio2;
                                break;
                            }
                        }
                    }

                    var data = index; //返回的数组
                    data = data[Math.floor(Math.random() * data.length)];
                    if(data==1){
                        rotateFunc(1,22.5,'现金券100元')
                    }
                    if(data==2){
                        rotateFunc(2,67.5,'U盘一个')
                    }
                    if(data==3){
                        rotateFunc(3,112.5,'现金券150元')
                    }
                    if(data==4){
                        rotateFunc(4,157.5,'喜阅平盘一台')
                    }
                    if(data==5){
                        rotateFunc(5,202.5,'现金券200元')
                    }
                    if(data==6){
                        rotateFunc(6,247.5,'现金券50元')
                    }
                    if(data==7){
                        rotateFunc(7,292.5,'Ipad mini保护套一个')
                    }
                    if(data==8){
                        rotateFunc(8,337.5,'移动电源一个')
                    }
                }
            }

        });
    }

    function randomnum(smin, smax) {// 获取2个值之间的随机数
        var Range = smax - smin;
        var Rand = Math.random();
        return (smin + Math.round(Rand * Range));
    }
})