
//DOM
const search = document.querySelector('.search');
const inputData = document.querySelectorAll('[data-input]');
const selectLocation = document.querySelector('.selectLocation');
const displayLocation = document.querySelector('.displayLocation');
const showdataLen = document.querySelector('.dataLen');

//全域變數
let sideSeedata=[];
let inputInfo = {
  ticketName: "can' be empty",
  ticketPictureUrl: "can' be empty",
  ticketLocation: "can' be empty",
  ticketPrice: 0,
  ticketSetNum: 0,
  ticketRank: 0,
  ticketDiscript: "can' be empty"
}
let storageData = [];
//功能
function getUserInfo() {
  let counter = 0;
  inputData.forEach(function (item, index) {
    switch (index) {
      case 0:
        if (item.value === '') {
          alert(`套票名稱不可空白`);
          inputData[index].focus();
          counter++;
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
          alert(`套票價格不可空白`);
          inputData[index].focus();
          counter++;
          return
        }
        inputInfo.ticketPrice = parseInt(item.value);
        break
      case 4:
        if (item.value === '') {
          alert(`套票組不可空白`)
          inputData[index].focus();
          counter++;
          return
        }
        inputInfo.ticketSetNum = parseInt(item.value);
        break
      case 5:
        if (item.value === '') {
          alert(`套票星級不可空白`);
          inputData[index].focus();
          counter++;
          return
        }
        inputInfo.ticketRank = parseInt(item.value);
        break
      case 6:
        if (item.value === '') {
          alert(`套票描述不可空白`);
          inputData[index].focus();
          counter++;
          return
        }
        inputInfo.ticketDiscript = item.value;
        break
    }

  });
  if (counter===0){reture}
  else{
    render()
  }
  
}
//compare Data
function compareData() {

  sideSeedata.forEach(function (item) {
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
  //console.log(storageData);
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
  resetInputInfo()

  inputInfo.ticketLocation = e.target.value;
  render()
}
//撈資料
function getdata(){
  axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json')
  .then(function (response) {
    sideSeedata=response.data.data;
    getUserInfo();
    //data=response.data[0].data;

  })
  .catch(function (error) {
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
  
}

//監聽
search.addEventListener('click', work, false)
selectLocation.addEventListener('change', displaySelectionLocation, false)