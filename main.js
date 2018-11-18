console.log("here 123")

console.log("the body", $('body'))

console.log("new")

class NumberRetriever{
    constructor(){

        this.retrieveList()
    }
    retrieveList(){

        var request = this.makeCORSRequest("get", "https://test.anytime.org/string.txt");

        if (request){
            request.onload = function() {
                this.filterResponse(request.response.split(/\s+/))
            }.bind(this);
            request.send();
        }
    }

    filterResponse(numbers){

        var integers_only = []

        numbers.forEach((item)=> {
            //attempt conversion to number
            var number_candidate = Number(item)
            //add to final array if a numer
            if (!isNaN(number_candidate)) {
                integers_only.push(number_candidate)
            }

        })

        this.sortNumbers(integers_only)

    }

    sortNumbers(integers){

        var sorted_integeres = integers.sort((a,b)=> a-b)

        console.log("the sorted integers", sorted_integeres)

        this.removeDuplicates(sorted_integeres)
    }

    removeDuplicates(sorted_integers){

        var unique_integers =sorted_integers.filter((number, i)=> number != sorted_integers[i+1])

        this.printResults(unique_integers)
    }

    printResults(processed_integers){
        console.log("The lowest three integers:", processed_integers[0], processed_integers[1], processed_integers[2])
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