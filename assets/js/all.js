"use strict";

//DOM
var inputClick = document.querySelector('.inputClick');
var inputData = document.querySelectorAll('[data-input]');
var selectLocation = document.querySelector('.selectLocation');
var displayLocation = document.querySelector('.displayLocation');
var showdataLen = document.querySelector('.dataLen');
var inputfrom = document.querySelector('.inputfrom');
var errerMessage = document.querySelectorAll('form p'); //全域變數

var sideSeedata = [];
var inputinfoData = [];
console.log(inputData[6].value); //功能
//取得資料後push進入inputinfoData

function getUserInfo(e) {
  e.preventDefault();
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
  inputData.forEach(function (item, index) {
    switch (index) {
      case 0:
        data.name = item.value;
        break;

      case 1:
        data.imgUrl = item.value;
        break;

      case 2:
        data.area = item.value;
        break;

      case 3:
        data.price = Number(item.value);
        break;

      case 4:
        data.group = Number(item.value);
        break;

      case 5:
        data.rate = item.value;
        break;

      case 6:
        data.description = item.value;
        break;
    }
  }); //顯示錯誤

  errorDisplay(); //如果有錯誤訊息則不渲染畫面

  if (errorDisplay()) {
    console.log('error return');
    return;
  } else {
    inputinfoData.push(data);
    inputinfoData.forEach(function (item) {
      sideSeedata.push(item);
    }); //渲染畫面

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
    bindto: '#donutChart',
    data: {
      // iris data from R
      columns: areaData,
      type: 'donut'
    },
    size: {
      height: 250,
      width: 350
    },
    donut: {
      title: "套票地區比重"
    }
  });
} //套件
//VALIDATE.JS
//限制條件


function errorDisplay() {
  var constraints = {
    ticketName: {
      presence: {
        message: "必填欄位"
      }
    },
    ticketPictureUrl: {
      presence: {
        message: "必填欄位"
      },
      url: {
        schemes: ["http", "https"],
        message: "必須是正確的網址"
      }
    },
    location: {
      presence: {
        message: "必填欄位"
      }
    },
    ticketPrice: {
      presence: {
        message: "必填欄位"
      },
      numericality: {
        onlyInteger: true,
        greaterThan: 0,
        notInteger: "請填入整數",
        notGreaterThan: "請填入大於0的整數"
      }
    },
    ticketNum: {
      presence: {
        message: "必填欄位"
      },
      numericality: {
        onlyInteger: true,
        greaterThan: 0,
        notInteger: "請填入整數",
        notGreaterThan: "請填入大於0的整數"
      }
    },
    ticketRank: {
      presence: {
        message: "必填欄位"
      },
      numericality: {
        onlyInteger: true,
        greaterThan: 0,
        lessThanOrEqualTo: 5,
        notInteger: "請填入整數",
        notGreaterThan: "請填入大於0的整數",
        notLessThanOrEqualTo: "請填入小於等於5的整數"
      }
    },
    ticketDisctipt: {
      presence: {
        message: "必填欄位"
      },
      length: {
        maximum: 100,
        tooLong: "不可超過100字"
      }
    }
  };
  var errors = validate(inputfrom, constraints);
  console.log(errors); //把錯誤訊息顯示出來有錯誤時是顯示空值

  errerMessage.forEach(function (item, index) {
    var classString = item.getAttribute('class'); //console.log(classString)

    var classStringArray = classString.split(' ');

    if (errors) {
      //console.log(classStringArray[0])
      if (Object.keys(errors).indexOf(classStringArray[0]) !== -1) {
        errerMessage[index].textContent = errors[classStringArray[0]];
      }

      ;
    } else {
      errerMessage[index].textContent = '';
    }
  }); //回傳errors作為要不要reset的判斷依據

  return errors; //console.log(errerMessage);
} //直接執行


getdata(); //監聽

inputClick.addEventListener('click', getUserInfo, false);
selectLocation.addEventListener('change', displaySelectionLocation, false);
//# sourceMappingURL=all.js.map
