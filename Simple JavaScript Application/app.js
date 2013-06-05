$(function($){
  var gitKeyword;
  var jsonData;
  var saved = false;
  var resultContainer = $('#results');
  var searchField = $('#search');
  var cachedObj = {};

  function checkKeyword(currentKeyword){
      if(cachedObj[currentKeyword]){
        console.log('exists');
        saved = true;
        //display data stored from object
        displayData(cachedObj[currentKeyword]);
      }
      else{
        console.log('unsaved');  
        saved = false;
        grabNewKeywordData(currentKeyword); 
      }  
  }

  function grabNewKeywordData(newKey){
     $.ajax({
        url: "https://api.github.com/legacy/repos/search/"+newKey, 
        success : displayData
    })
  }

  function displayData(data) {
    if(saved === false){
      cachedObj[gitKeyword] = data;
    }
    jsonData = data.repositories;
    //console.log(jsonData.length);
    var currentData = "<ul>";
    currentData += "<li><b>Owner / Name</b></li>";
   
    $.each(jsonData, function(index){
        currentData += "<li><a href='#' index='"+index+"'>";
        currentData += jsonData[index].owner;
        currentData += " / ";
        currentData += jsonData[index].name;
        currentData += "</a></li>";
    });
    currentData += "</ul>";
    resultContainer.html(currentData);
  }

  searchField.bind('keypress', function(e) {
      var code = (e.keyCode ? e.keyCode : e.which);
      if(code == 13) {
        gitKeyword = $('#search').val();
        resultContainer.html('');
        checkKeyword(gitKeyword);
      }  
  });

  resultContainer.on({
        click: function(){
          var current = $(this).attr('index')
          var details = "Language: "+jsonData[current].language+"\n";
          details += "Followers: "+jsonData[current].followers+"\n";
          details += "Url: "+jsonData[current].url+"\n";
          details += "Description: "+jsonData[current].description;
          alert(details);
        }
  },'li a');

});



var data = load('css/styles.css');
console.log(data);
var styles = document.createElement('style');
$('head').append(styles);
$('style').append("body {background-color: grey;}");