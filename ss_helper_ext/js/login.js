
REQ_HOST = "http://localhost:8080/capture/checkEmail";

$("#gogo").click(function(){

    $.get(REQ_HOST + '?email='+ $("#email").val(), function(data){

        console.log(data);
        if(data){
            // var jsonObj = JSON.parse(data);
            /*
                {
                    "exist": "Y",
                    "server": "192.167.1.1",
                    "port": "13121",
                    "password": "222222"
                }

            */
            if('Y' == data.exist){
                $("#dataList").hide();
                $("#infoList").show();

                //request for server info
                setTimeout(function(){
                    $("#server").val(data.server);
                    $("#port").val(data.port);
                    $("#password").val(data.password);
                },500);

            }else{
                alert('此邮箱没有被邀请,请输入收到邮件的邮箱地址！');
            }
        }else{
            alert('输入邮箱有误！');
        }
    });

});

