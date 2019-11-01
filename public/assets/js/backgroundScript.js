let dataObj = {
  api_key: '',
  token_key: '',
  list_id: '',
  title: '',
  url: '',
  amazon_link: '',
  card_id: '',
  position: 'bottom'
};

let api_key = localStorage.getItem('api_key');
let token_key = localStorage.getItem('token_key');
let list_id = localStorage.getItem('list_id');

if (api_key && token_key && list_id) {
  dataObj.api_key = api_key;
  dataObj.token_key = token_key;
  dataObj.list_id = list_id;
}

chrome.extension.onMessage.addListener(
    function (message) {

      if (message.state) {
        dataObj.api_key = message.state.api_key;
        dataObj.token_key = message.state.token_key;
        dataObj.list_id = message.state.list_id;
        dataObj.list_name = message.state.list_name;
        localStorage.setItem('api_key', dataObj.api_key);
        localStorage.setItem('token_key', dataObj.token_key);
        localStorage.setItem('list_id', dataObj.list_id);
        localStorage.setItem('list_name', dataObj.list_name);
      }

      if (message.imageObject) {
        dataObj.title = message.imageObject.title;
        dataObj.url = message.imageObject.url;
        dataObj.amazon_link = message.imageObject.amazon_link;

        let data = null;

        let xhr = new XMLHttpRequest();

        xhr.open(
            "POST",
            "https://api.trello.com/1/cards?name=" + dataObj.title
            + "&desc=" + dataObj.amazon_link
            + "&pos=" + dataObj.position
            + "&idList=" + dataObj.list_id
            + "&urlSource=" + dataObj.url
            + "&keepFromSource=all"
            + "&key=" + dataObj.api_key
            + "&token=" + dataObj.token_key
        );

        xhr.send(data);

        xhr.addEventListener("readystatechange", function () {
          if (this.readyState === this.DONE) {

          }
        });
      }
    });

