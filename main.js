

class SmallestThreeNumbersRetriever{
    constructor(){
        this.retrieveList()
    }

    retrieveList(){
        var request = this.makeCORSRequest("get", "https://test.anytime.org/string.txt");
        if (request){
            request.onload = function() {
                if (request.status != 200){
                    console.log("Error with request")
                    return
                } else {
                    this.filterResponse(request.response.split(/\s+/))
                }
            }.bind(this);
            request.send();
        }
    }

    makeCORSRequest(method, url){
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        return xhr;
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
        this.removeDuplicates(sorted_integeres)
    }

    removeDuplicates(sorted_integers){
        var unique_integers =sorted_integers.filter((number, i)=> number != sorted_integers[i+1])
        this.printResults(unique_integers)
    }

    printResults(processed_integers){
        console.log("The lowest three integers:", processed_integers[0], processed_integers[1], processed_integers[2])
    }



}


var smallestNumbers = new SmallestThreeNumbersRetriever()