let imageObject = {
  'url': '',
  'title': '',
  'amazon_link': '',
};

let amazon_link = document.URL;

amazon_link = amazon_link.substring(0, amazon_link.indexOf('/ref'));

let imageWrapper = document.getElementById('main-image-container');
let productTitle = document.getElementById('productTitle');
let image = document.getElementById('imgTagWrapperId');
let url = '';

let btn = document.createElement("BUTTON");
btn.innerHTML = "<b>ADD TRELLO</b>";
btn.setAttribute(
    "style",
    "height: 40px; border-radius: 5%; position:absolute; top:0; right:0; z-index:1000; background-color:#5cb85c; color: #fff");
btn.addEventListener('click', function () {
  getLinkMerch();
  if (url === 'htt') {
    url = document.getElementById('imgTagWrapperId').children[0].src.replace('679', '2000');
  }
  imageObject.url = url;
  imageObject.title = productTitle.innerText || '';
  imageObject.amazon_link = amazon_link;

  chrome.extension.sendMessage({
    imageObject
  });

  btn.setAttribute("disabled", '')
  btn.style.backgroundColor = '#a0a6ab';
  btn.innerHTML = '<b><i>SENDING ...</i></b>';

  setTimeout(function () {
    imageWrapper.removeChild(btn);
    let message = document.createElement("P");
    message.innerHTML = "<i>Please check Trello.</i>"
    message.setAttribute(
        "style",
        "color: #f00; position:absolute; top:0; right:0; z-index:1000; font-size: 13pt;");
    imageWrapper.appendChild(message);
  }, 3000);
})
;

if (imageWrapper) {
  imageWrapper.appendChild(btn);
}

function getLinkMerch() {
  url = image.children[0].src;
  url = url.substring(0, url.indexOf('.png') + 4);
  url = url.substring(0, url.indexOf('/I/') + 3) + url.substring(url.lastIndexOf('%7C') + 3);
}