var result = "";
function getdefine(word) {
var xhr = new XMLHttpRequest();
xhr.open("GET", "http://api.urbandictionary.com/v0/define?term=" + word, true);
xhr.onload = function (e) {
  if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      result = response.list[0].definition;
      console.log(response.list[0].definition);
  }
};
xhr.send(null);
return result;
}

$(function(){
  $('#paste').click(function(){pasteSelection();});
});
function pasteSelection() {
  chrome.tabs.query({active:true, windowId: chrome.windows.WINDOW_ID_CURRENT}, 
  function(tab) {
    chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"}, 
    function(test){
      var text = document.getElementById('text');
      text.innerHTML = getdefine(test.data);
    });
  });
}