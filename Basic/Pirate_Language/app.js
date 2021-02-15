// https://projects.raspberrypi.org/en/projects/talk-like-a-pirate/

$(document).ready(function(){
  $("#normal").keyup(function(){
    var words = $("#normal").val();

    words = words.replace(/^/, "Arr, me hearties. ");
    words = words.replace(/hello/gi, "ahoy");
    words = words.replace(/(\w+)ev(\w+)\s/g, "$1e'$2 ");

    $("#pirate").val(words);
  });
});