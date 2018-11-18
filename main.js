console.log("here 123")

console.log("the body", $('body'))

console.log("new")

class NumberRetriever{
    constructor(){
        console.log("in construct")
        this.retrieveList()
    }
    retrieveList(){

        // console.log("in RL")
        // $.ajax({
        //     url: "https://test.anytime.org/string.txt",
        //     type: "GET",
        //     dataType: "json",
        //     contentType: "application/json; charset=utf-8",
        // }).then((resp) => {
        //     console.log("got data", resp);
        // }).catch((error, second, third) => {
        //     console.log("the error", error)
        // })

        var request = this.makeCORSRequest("get", "https://test.anytime.org/string.txt");

        if (request){
            request.onload = function() {
                console.log("got response", request.response)
            };
            request.onreadystatechange = function(){
                console.log("the ready state and status", this.readyState, this.status)
            };
            request.send();
        }
    }

    makeCORSRequest(method, url){
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr){
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest != "undefined"){
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            xhr = null;
        }
        return xhr;
    }



}


var smallestNumbers = new NumberRetriever()