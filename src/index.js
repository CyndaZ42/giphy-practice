import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('#go').click(function(event) {
    event.preventDefault();
    console.log("hello");
    const search = $('#search').val();

    let request = new XMLHttpRequest();
    const url = `http://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${search}&limit=20`;
    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200){
        var response = JSON.parse(this.responseText);
        console.log(response);
        robustShowImage(response);
      }
    }

    request.open("GET", url, true);
    request.send();
  });
  $('#popular').click(function(event) {
    event.preventDefault();
    let request = new XMLHttpRequest();
    const trending = `http://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}&limit=10`;
    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200){
        var response = JSON.parse(this.responseText);
        console.log(response);
        robustShowImage(response);
      }
    }
    request.open("GET", trending, true);
    request.send();
  });

  $('#random').click(function(event) {
    event.preventDefault();
    let request = new XMLHttpRequest();
    const random = `http://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}`;
    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200){
        var response = JSON.parse(this.responseText);
        console.log(response);
        showImage(response);
      }
    }
    request.open("GET", random, true);
    request.send();

    function showImage(response) {
      $('.output').html(`<img src="${response.data.images.original.url}" />`);
    }
  });

    function robustShowImage(response) {
    let outputString = "";
    response.data.forEach(element => outputString += `<img src="${element.images.downsized_medium.url}" />`);
    $('.output').html(outputString);
  }
});

