
let data = [
  {
    "id": 0,
    "name": "肥宅心碎賞櫻3日",
    "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
    "area": "高雄",
    "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
    "group": 87,
    "price": 1400,
    "rate": 10
  },
  {
    "id": 1,
    "name": "貓空纜車雙程票",
    "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    "area": "台北",
    "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
    "group": 99,
    "price": 2400,
    "rate": 2
  },
  {
    "id": 2,
    "name": "台中谷關溫泉會1日",
    "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
    "area": "台中",
    "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
    "group": 20,
    "price": 1765,
    "rate": 7
  }
];


//DOM
const search = document.querySelector('.search');
const inputData = document.querySelectorAll('[data-input]');
const selectLocation = document.querySelector('.selectLocation');
const displayLocation = document.querySelector('.displayLocation');
const showdataLen = document.querySelector('.dataLen');

//全域變數

let inputInfo = {
  ticketName: "can't be emtpy",
  ticketPictureUrl: "can't be emtpy",
  ticketLocation: "can't be emtpy",
  ticketPrice: 0,
  ticketSetNum: 0,
  ticketRank: 0,
  ticketDiscript: "can't be emtpy"
}
let storageData = [];
//功能
function getUserInfo() {
  inputData.forEach(function (item, index) {
    switch (index) {
      case 0:
        if (item.value === '') {
          alert(`套票名稱不可空白`)
          inputData[index].focus()
          return
        }
        inputInfo.ticketName = item.value;
        break
      case 1:
        inputInfo.ticketPictureUrl = item.value;
        break
      case 2:
        inputInfo.ticketLocation = item.value;
        break
      case 3:
        if (item.value === '') {
          alert(`套票價格不可空白`)
          inputData[index].focus()
          return
        }
        inputInfo.ticketPrice = parseInt(item.value);
        break
      case 4:
        if (item.value === '') {
          alert(`套票組不可空白`)
          inputData[index].focus()
          return
        }
        inputInfo.ticketSetNum = parseInt(item.value);
        break
      case 5:
        if (item.value === '') {
          alert(`套票星級不可空白`)
          inputData[index].focus()
          return
        }
        inputInfo.ticketRank = parseInt(item.value);
        break
      case 6:
        if (item.value === '') {
          alert(`套票星級不可空白`)
          inputData[index].focus()
          return
        }
        inputInfo.ticketDiscript = item.value;
        break
    }

  });
  render()
}
//compare Data
function compareData() {

  data.forEach(function (item) {
    if (item.name.indexOf(inputInfo.ticketName) !== -1) {
      storageData.push(item);
    }
    else if (item.imgUrl.indexOf(inputInfo.ticketPictureUrl) !== -1) {
      storageData.push(item);
    }
    else if (item.price === inputInfo.ticketPrice) {
      storageData.push(item);
    }
    else if (item.area === inputInfo.ticketLocation || inputInfo.ticketLocation === '全部地區') {
      storageData.push(item);
    }
    else if (item.group === inputInfo.ticketSetNum) {
      storageData.push(item);
    }
    else if (item.rate === inputInfo.ticketRank) {
      storageData.push(item);
    }
    else if (item.description.indexOf(inputInfo.ticketDiscript) !== -1) {
      storageData.push(item);
    }
  })
  console.log(storageData);
}
function showDataLen() {
  showdataLen.textContent = `本次搜尋共${storageData.length}筆資料`
}
function showData() {
  let content = '';
  storageData.forEach(function (item) {
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
function resetInputInfo() {
  inputInfo.ticketName = "can't be emtpy";
  inputInfo.ticketPictureUrl = "can't be emtpy";
  inputInfo.ticketLocation = "can't be emtpy";
  inputInfo.ticketPrice = 0;
  inputInfo.ticketSetNum = 0;
  inputInfo.ticketRank = 0;
  inputInfo.ticketDiscript = "can't be emtpy";
  storageData = [];
}
function displaySelectionLocation(e) {
  resetInputInfo()

  inputInfo.ticketLocation = e.target.value;
  render()
}

function render() {
  compareData();
  showDataLen();
  showData();
  resetInputInfo();
}
function work() {
  getUserInfo();
}








//監聽
search.addEventListener('click', work, false)
selectLocation.addEventListener('change', displaySelectionLocation, false)