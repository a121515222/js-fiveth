
//DOM
const inputClick = document.querySelector('.inputClick');
const inputData = document.querySelectorAll('[data-input]');
const selectLocation = document.querySelector('.selectLocation');
const displayLocation = document.querySelector('.displayLocation');
const showdataLen = document.querySelector('.dataLen');
const inputfrom = document.querySelector('.inputfrom');
const errerMessage = document.querySelectorAll('form p');

//全域變數
let sideSeedata = [];
let inputinfoData = [];

console.log(inputData[6].value)
//功能
//取得資料後push進入inputinfoData
function getUserInfo(e) {
  e.preventDefault();
  let data = {
    area: "",
    description: "",
    group: 0,
    id: 0,
    imgUrl: "",
    name: "",
    price: 0,
    rate: 0,
  }

  inputData.forEach((item, index) => {
    switch (index) {
      case 0:
        data.name = item.value;
        break
      case 1:
        data.imgUrl = item.value;
        break
      case 2:
        data.area = item.value;
        break
      case 3:
        data.price = Number(item.value);
        break
      case 4:
        data.group = Number(item.value);
        break
      case 5:
        data.rate = item.value
        break
      case 6:
        data.description = item.value;
        break
    }

  });
  //顯示錯誤
  errorDisplay()

  //如果有錯誤訊息則不渲染畫面
  if (errorDisplay()) {
    console.log('error return')
    return
  }
  else {
    inputinfoData.push(data);
    inputinfoData.forEach((item) => {
      sideSeedata.push(item)
    });
    //渲染畫面
    render(sideSeedata);
    //重製表單
    inputfrom.reset();
  }

}
function showDataNum(data) {
  showdataLen.textContent = `本次搜尋共${data.length}筆資料`
}
function showData(data) {
  let content = '';
  data.forEach(function (item) {
    content += `<li class="card w1-100 justify-content-between w1-lg-45 w1-xl-28 bg-white">
    <div class="form_group">
    <div class="cradHeader h-180">
      <img src="${item.imgUrl}" alt="picture" class="border-radius-5">
    </div>
    <div class="cardbody">
      <div class="text-primary pt-20 fs-24">
        <h2>${item.name}</h2>
      </div>
      <p class="text-five pt-16 border-top-primary-2 ">
      ${item.description}
      </p>
    </div>
    </div>
    <div class="cardfooter d-flex align-items-center  text-primary">
      <p class=" fs-16 ">剩下最後${item.group}組</p>
      <p class="fs-16 ms-30">NTD</p>
      <sapn class="fs-32">$${item.price}</sapn>
    </div>
    <div
      class="w-84 h-44 border-right-radius-5 bg-primary text-white position-absoult top--10px d-flex align-items-center justify-content-center">
      <span class="fs-20">${item.area}</span>
    </div>
    <div
      class="w-40 h-32 border-right-radius-5 bg-secondary text-white position-absoult top-164px d-flex align-items-center justify-content-center">
      <span class="fs-16">${item.rate}</span>
    </div>
  </li>`
  });
  displayLocation.innerHTML = content;
}

function displaySelectionLocation(e) {

  let showData = [];
  sideSeedata.forEach((item) => {
    if (e.target.value === item.area) {
      showData.push(item)
    }
    else if (e.target.value === '全部地區') {
      showData.push(item)
    }
  })
  render(showData)
}
//撈資料
function getdata() {

  axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json')
    .then(function (response) {
      sideSeedata = response.data.data;


      render(sideSeedata);

      //data=response.data[0].data;

    })
    .catch(function (error) {
      console.log(error);
    });
}


function render(data) {

  showDataNum(data);
  showData(data);
  pieChart()
}
function pieChart() {
  //先取得area所有資料
  let areaString = [];
  sideSeedata.forEach((item) => {
    if (areaString.indexOf(item.area) === -1) {
      areaString.push(item.area)
    }
  })
  //把area轉為屬性
  const areaObj = {};
  areaString.forEach((item) => {
    areaObj[item] = 0
  })
  //計算資料的area數量並存放到areaObj
  sideSeedata.forEach((item) => {
    areaObj[item.area]++
  })
  //整理成畫圖需要的格式
  let areaData = [];
  areaString.forEach((item) => {
    areaData.push([item, areaObj[item]])
  })

  //畫成圓餅圖
  const chart = c3.generate({
    bindto: '#donutChart',
    data: {
      // iris data from R
      columns: areaData,
      type: 'donut',
    },
    size: {
      height: 250,
      width: 350
    },
    donut: {
      title: "套票地區比重"
    }
  });
}

//套件
//VALIDATE.JS
//限制條件
function errorDisplay() {
  const constraints = {
    ticketName: {
      presence: { message: "必填欄位" },
    },
    ticketPictureUrl: {
      presence: { message: "必填欄位" },
      url: {
        schemes: ["http", "https"],
        message: "必須是正確的網址"
      }
    },
    location: {
      presence: { message: "必填欄位" },
    },
    ticketPrice: {
      presence: { message: "必填欄位" },
      numericality: {
        onlyInteger: true,
        greaterThan: 0,
        notInteger: "請填入整數",
        notGreaterThan: "請填入大於0的整數"
      }
    },
    ticketNum: {
      presence: { message: "必填欄位" },
      numericality: {
        onlyInteger: true,
        greaterThan: 0,
        notInteger: "請填入整數",
        notGreaterThan: "請填入大於0的整數"
      }
    },
    ticketRank: {
      presence: { message: "必填欄位" },
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
      presence: { message: "必填欄位" },
      length: {
        maximum: 100,
        tooLong: "不可超過100字"
      }
    }
  }
  let errors = validate(inputfrom, constraints);

  console.log(errors);

  //把錯誤訊息顯示出來有錯誤時是顯示空值

  errerMessage.forEach((item, index) => {
    let classString = item.getAttribute('class');
    //console.log(classString)
    let classStringArray = classString.split(' ');
    if (errors) {
      //console.log(classStringArray[0])
      if (Object.keys(errors).indexOf(classStringArray[0]) !== -1) {
        errerMessage[index].textContent = errors[classStringArray[0]]
      };
    }
    else{
      errerMessage[index].textContent = '';
    }
  });
  //回傳errors作為要不要reset的判斷依據
  return errors
  //console.log(errerMessage);
}


//直接執行
getdata();

//監聽
inputClick.addEventListener('click', getUserInfo, false);
selectLocation.addEventListener('change', displaySelectionLocation, false);