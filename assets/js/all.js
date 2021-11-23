"use strict";

//DOM
var inputClick = document.querySelector('.inputClick');
var inputData = document.querySelectorAll('[data-input]');
var selectLocation = document.querySelector('.selectLocation');
var displayLocation = document.querySelector('.displayLocation');
var showdataLen = document.querySelector('.dataLen');
var inputfrom = document.querySelector('.inputfrom'); //全域變數

var sideSeedata = [];
var inputinfoData = []; //功能
//取得資料後push進入inputinfoData

function getUserInfo() {
  var data = {
    area: "",
    description: "",
    group: 0,
    id: 0,
    imgUrl: "",
    name: "",
    price: 0,
    rate: 0
  };
  var counter = 0;
  inputData.forEach(function (item, index) {
    switch (index) {
      case 0:
        if (item.value === '') {
          alert("\u5957\u7968\u540D\u7A31\u4E0D\u53EF\u7A7A\u767D");
          inputData[index].focus();
          counter++;
          return;
        } else {
          data.name = item.value;
        }

        break;

      case 1:
        if (item.value === '') {
          alert("\u5957\u7968\u5716\u7247\u4E0D\u53EF\u7A7A\u767D");
          inputData[index].focus();
          counter++;
          return;
        } else {
          data.imgUrl = item.value;
        }

        break;

      case 2:
        if (item.value === '') {
          alert("\u5957\u7968\u5730\u5340\u4E0D\u53EF\u7A7A\u767D");
          inputData[index].focus();
          counter++;
          return;
        } else {
          data.area = item.value;
        }

        break;

      case 3:
        if (item.value === '') {
          alert("\u5957\u7968\u50F9\u683C\u4E0D\u53EF\u7A7A\u767D");
          inputData[index].focus();
          counter++;
          return;
        } else {
          data.price = Number(item.value);
        }

        break;

      case 4:
        if (item.value === '') {
          alert("\u5957\u7968\u7D44\u4E0D\u53EF\u7A7A\u767D");
          inputData[index].focus();
          counter++;
          return;
        } else {
          data.group = Number(item.value);
        }

        break;

      case 5:
        if (item.value === '') {
          alert("\u5957\u7968\u661F\u7D1A\u4E0D\u53EF\u7A7A\u767D");
          inputData[index].focus();
          counter++;
          return;
        } else {
          data.rate = item.value;
        }

        break;

      case 6:
        if (item.value === '') {
          alert("\u5957\u7968\u63CF\u8FF0\u4E0D\u53EF\u7A7A\u767D");
          inputData[index].focus();
          counter++;
          return;
        } else {
          data.description = item.value;
        }

        break;
    }
  });

  if (counter === 0) {
    inputinfoData.push(data);
    inputinfoData.forEach(function (item) {
      sideSeedata.push(item);
    });
    render(sideSeedata); //重製表單

    inputfrom.reset();
  }
}

function showDataNum(data) {
  showdataLen.textContent = "\u672C\u6B21\u641C\u5C0B\u5171".concat(data.length, "\u7B46\u8CC7\u6599");
}

function showData(data) {
  var content = '';
  data.forEach(function (item) {
    content += "<li class=\"card w1-100 justify-content-between w1-lg-45 w1-xl-28 bg-white\">\n    <div class=\"form_group\">\n    <div class=\"cradHeader h-180\">\n      <img src=\"".concat(item.imgUrl, "\" alt=\"picture\" class=\"border-radius-5\">\n    </div>\n    <div class=\"cardbody\">\n      <div class=\"text-primary pt-20 fs-24\">\n        <h2>").concat(item.name, "</h2>\n      </div>\n      <p class=\"text-five pt-16 border-top-primary-2 \">\n      ").concat(item.description, "\n      </p>\n    </div>\n    </div>\n    <div class=\"cardfooter d-flex align-items-center  text-primary\">\n      <p class=\" fs-16 \">\u5269\u4E0B\u6700\u5F8C").concat(item.group, "\u7D44</p>\n      <p class=\"fs-16 ms-30\">NTD</p>\n      <sapn class=\"fs-32\">$").concat(item.price, "</sapn>\n    </div>\n    <div\n      class=\"w-84 h-44 border-right-radius-5 bg-primary text-white position-absoult top--10px d-flex align-items-center justify-content-center\">\n      <span class=\"fs-20\">").concat(item.area, "</span>\n    </div>\n    <div\n      class=\"w-40 h-32 border-right-radius-5 bg-secondary text-white position-absoult top-164px d-flex align-items-center justify-content-center\">\n      <span class=\"fs-16\">").concat(item.rate, "</span>\n    </div>\n  </li>");
  });
  displayLocation.innerHTML = content;
}

function displaySelectionLocation(e) {
  var showData = [];
  sideSeedata.forEach(function (item) {
    if (e.target.value === item.area) {
      showData.push(item);
    } else if (e.target.value === '全部地區') {
      showData.push(item);
    }
  });
  render(showData);
} //撈資料


function getdata() {
  axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json').then(function (response) {
    sideSeedata = response.data.data;
    render(sideSeedata); //data=response.data[0].data;
  })["catch"](function (error) {
    console.log(error);
  });
}

function render(data) {
  // compareData();
  showDataNum(data);
  showData(data);
  pieChart();
}

function pieChart() {
  //先取得area所有資料
  var areaString = [];
  sideSeedata.forEach(function (item) {
    if (areaString.indexOf(item.area) === -1) {
      areaString.push(item.area);
    }
  }); //把area轉為屬性

  var areaObj = {};
  areaString.forEach(function (item) {
    areaObj[item] = 0;
  }); //計算資料的area數量並存放到areaObj

  sideSeedata.forEach(function (item) {
    areaObj[item.area]++;
  }); //整理成畫圖需要的格式

  var areaData = [];
  areaString.forEach(function (item) {
    areaData.push([item, areaObj[item]]);
  }); //畫成圓餅圖

  var chart = c3.generate({
    bindto: '#pieChart',
    data: {
      // iris data from R
      columns: areaData,
      type: 'pie'
    }
  });
} //直接執行


getdata(); //監聽

inputClick.addEventListener('click', getUserInfo, false);
selectLocation.addEventListener('change', displaySelectionLocation, false);
//# sourceMappingURL=all.js.map
