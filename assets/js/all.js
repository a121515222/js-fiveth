"use strict";

//DOM
var search = document.querySelector('.search');
var inputData = document.querySelectorAll('[data-input]');
var selectLocation = document.querySelector('.selectLocation');
var displayLocation = document.querySelector('.displayLocation');
var showdataLen = document.querySelector('.dataLen'); //全域變數

var sideSeedata = [];
var inputInfo = {
  ticketName: "can' be empty",
  ticketPictureUrl: "can' be empty",
  ticketLocation: "can' be empty",
  ticketPrice: 0,
  ticketSetNum: 0,
  ticketRank: 0,
  ticketDiscript: "can' be empty"
};
var storageData = []; //功能

function getUserInfo() {
  var counter = 0;
  inputData.forEach(function (item, index) {
    switch (index) {
      case 0:
        if (item.value === '') {
          alert("\u5957\u7968\u540D\u7A31\u4E0D\u53EF\u7A7A\u767D");
          inputData[index].focus();
          counter++;
          return;
        }

        inputInfo.ticketName = item.value;
        break;

      case 1:
        inputInfo.ticketPictureUrl = item.value;
        break;

      case 2:
        inputInfo.ticketLocation = item.value;
        break;

      case 3:
        if (item.value === '') {
          alert("\u5957\u7968\u50F9\u683C\u4E0D\u53EF\u7A7A\u767D");
          inputData[index].focus();
          counter++;
          return;
        }

        inputInfo.ticketPrice = parseInt(item.value);
        break;

      case 4:
        if (item.value === '') {
          alert("\u5957\u7968\u7D44\u4E0D\u53EF\u7A7A\u767D");
          inputData[index].focus();
          counter++;
          return;
        }

        inputInfo.ticketSetNum = parseInt(item.value);
        break;

      case 5:
        if (item.value === '') {
          alert("\u5957\u7968\u661F\u7D1A\u4E0D\u53EF\u7A7A\u767D");
          inputData[index].focus();
          counter++;
          return;
        }

        inputInfo.ticketRank = parseInt(item.value);
        break;

      case 6:
        if (item.value === '') {
          alert("\u5957\u7968\u63CF\u8FF0\u4E0D\u53EF\u7A7A\u767D");
          inputData[index].focus();
          counter++;
          return;
        }

        inputInfo.ticketDiscript = item.value;
        break;
    }
  });

  if (counter === 0) {
    reture;
  } else {
    render();
  }
} //compare Data


function compareData() {
  sideSeedata.forEach(function (item) {
    if (item.name.indexOf(inputInfo.ticketName) !== -1) {
      storageData.push(item);
    } else if (item.imgUrl.indexOf(inputInfo.ticketPictureUrl) !== -1) {
      storageData.push(item);
    } else if (item.price === inputInfo.ticketPrice) {
      storageData.push(item);
    } else if (item.area === inputInfo.ticketLocation || inputInfo.ticketLocation === '全部地區') {
      storageData.push(item);
    } else if (item.group === inputInfo.ticketSetNum) {
      storageData.push(item);
    } else if (item.rate === inputInfo.ticketRank) {
      storageData.push(item);
    } else if (item.description.indexOf(inputInfo.ticketDiscript) !== -1) {
      storageData.push(item);
    }
  }); //console.log(storageData);
}

function showDataLen() {
  showdataLen.textContent = "\u672C\u6B21\u641C\u5C0B\u5171".concat(storageData.length, "\u7B46\u8CC7\u6599");
}

function showData() {
  var content = '';
  storageData.forEach(function (item) {
    content += "<li class=\"card w1-100 justify-content-between w1-lg-45 w1-xl-28 bg-white\">\n    <div class=\"form_group\">\n    <div class=\"cradHeader h-180\">\n      <img src=\"".concat(item.imgUrl, "\" alt=\"picture\" class=\"border-radius-5\">\n    </div>\n    <div class=\"cardbody\">\n      <div class=\"text-primary pt-20 fs-24\">\n        <h2>").concat(item.name, "</h2>\n      </div>\n      <p class=\"text-five pt-16 border-top-primary-2 \">\n      ").concat(item.description, "\n      </p>\n    </div>\n    </div>\n    <div class=\"cardfooter d-flex align-items-center  text-primary\">\n      <p class=\" fs-16 \">\u5269\u4E0B\u6700\u5F8C").concat(item.group, "\u7D44</p>\n      <p class=\"fs-16 ms-30\">NTD</p>\n      <sapn class=\"fs-32\">$").concat(item.price, "</sapn>\n    </div>\n    <div\n      class=\"w-84 h-44 border-right-radius-5 bg-primary text-white position-absoult top--10px d-flex align-items-center justify-content-center\">\n      <span class=\"fs-20\">").concat(item.area, "</span>\n    </div>\n    <div\n      class=\"w-40 h-32 border-right-radius-5 bg-secondary text-white position-absoult top-164px d-flex align-items-center justify-content-center\">\n      <span class=\"fs-16\">").concat(item.rate, "</span>\n    </div>\n  </li>");
  });
  displayLocation.innerHTML = content;
}

function resetInputInfo() {
  inputInfo.ticketName = "can' be empty";
  inputInfo.ticketPictureUrl = "can' be empty";
  inputInfo.ticketLocation = "can' be empty";
  inputInfo.ticketPrice = 0;
  inputInfo.ticketSetNum = 0;
  inputInfo.ticketRank = 0;
  inputInfo.ticketDiscript = "can' be empty";
  storageData = [];
}

function displaySelectionLocation(e) {
  resetInputInfo();
  inputInfo.ticketLocation = e.target.value;
  render();
} //撈資料


function getdata() {
  axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json').then(function (response) {
    sideSeedata = response.data.data;
    getUserInfo(); //data=response.data[0].data;
  })["catch"](function (error) {
    console.log(error);
  });
}

function render() {
  compareData();
  showDataLen();
  showData();
  resetInputInfo();
}

function work() {
  getdata();
} //監聽


search.addEventListener('click', work, false);
selectLocation.addEventListener('change', displaySelectionLocation, false);
//# sourceMappingURL=all.js.map
