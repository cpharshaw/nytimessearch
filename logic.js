$(document).ready(function () {




    $('#submit').on('click', function (event) {

        event.preventDefault();


        var terms = "";
        // var numRecords = 1000;
        var startYear = "1800";
        var endYear = "2999";

   
        terms = $('#terms').val();
        
        // numRecords = $('#numRecords').val();

        startYear = function() {
            if ($('#startYear').val() === "") {
                return "17000101";
            } else {
                return $('#startYear').val() + "0101";
            }
        }

        endYear = function() {
            if ($('#endYear').val() === "") {
                return "29991231";
            } else {
                return $('#endYear').val() + "1231";
            }
        }





        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        queryURL += '?' + $.param({
          'api-key': "fc44516eb41b42568b13d77e7f628aec",
          'q': terms,
          'begin_date': startYear,
          'end_date': endYear
        });
        $.ajax({
          url: queryURL,
          method: 'GET',
        }).done(function(result) {
            $('#articles').empty();

            var stuff = result.response.docs;


            for (var i = 0; i < stuff.length; i ++) {

                var headline = "";
                var section = "";
                var pubDate = "";
                var storyURL = "";

                headline = stuff[i].headline.main;
                section = stuff[i].section_name;
                pubDate = stuff[i].pub_date;
                storyURL = stuff[i].web_url;

                var numDisplay = i + 1;

                var block = $(
                    '<div id="" class="card">' +
                        '<h3><span>(' + numDisplay + ') </span>' + headline + '</h3>' +
                        '<h5>' + section + '</h5>' +
                        '<h5>' + pubDate + '</h5>' +
                        '<h5>' + storyURL + '</h5>' +
                    '</div>'
                );

                $('#articles').append(block);


            }

        //   console.log(stuff);
        }).fail(function(err) {
          throw err;
        });
    


$('#clear').on('click', function() {
    $('#articles').empty();
})

        // $.ajax({
        //     url: queryURL,
        //     method: 'GET'
        // }).then(function(response) {

        // });


    })










});