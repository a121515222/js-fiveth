
//DOM
const inputClick = document.querySelector('.inputClick');
const inputData = document.querySelectorAll('[data-input]');
const selectLocation = document.querySelector('.selectLocation');
const displayLocation = document.querySelector('.displayLocation');
const showdataLen = document.querySelector('.dataLen');
const inputfrom = document.querySelector('.inputfrom');
//全域變數
let sideSeedata = [];
let inputinfoData = [];


//功能
//取得資料後push進入inputinfoData
function getUserInfo() {
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
        else {
          data.name = item.value;
        }

        break
      case 1:
        if (item.value === '') {
          alert(`套票圖片不可空白`);
          inputData[index].focus();
          counter++;
          return
        }
        else {
          data.imgUrl = item.value;
        }

        break
      case 2:
        if (item.value === '') {
          alert(`套票地區不可空白`);
          inputData[index].focus();
          counter++;
          return
        }
        else {
          data.area = item.value;
        }

        break
      case 3:
        if (item.value === '') {
          alert(`套票價格不可空白`);
          inputData[index].focus();
          counter++;
          return
        }
        else {
          data.price = Number(item.value);
        }
        break
      case 4:
        if (item.value === '') {
          alert(`套票組不可空白`)
          inputData[index].focus();
          counter++;
          return
        }
        else {
          data.group = Number(item.value);
        }

        break
      case 5:
        if (item.value === '') {
          alert(`套票星級不可空白`);
          inputData[index].focus();
          counter++;
          return
        }
        else {
          data.rate = item.value
        }
        break
      case 6:
        if (item.value === '') {
          alert(`套票描述不可空白`);
          inputData[index].focus();
          counter++;
          return
        }
        else {
          data.description = item.value;
        }
        break
    }

  });

  if (counter === 0) {
    inputinfoData.push(data);
    inputinfoData.forEach((item) => {
      sideSeedata.push(item)
    });
    render(sideSeedata)
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
  // compareData();
  showDataNum(data);
  showData(data);
  pieChart()
}
function pieChart(){
  //先取得area所有資料
  let areaString = [];
  sideSeedata.forEach((item)=>{
    if(areaString.indexOf(item.area)===-1){
      areaString.push(item.area)
    }
  })
  //把area轉為屬性
  const areaObj ={};
  areaString.forEach((item)=>{
    areaObj[item]=0
  })
  //計算資料的area數量並存放到areaObj
  sideSeedata.forEach((item)=>{
    areaObj[item.area]++
  })
  //整理成畫圖需要的格式
  let areaData = [];
  areaString.forEach((item)=>{
    areaData.push([item,areaObj[item]])
  })

  //畫成圓餅圖
  const chart = c3.generate({
    bindto:'#pieChart',
    data: {
        // iris data from R
        columns: areaData,
        type : 'pie',
    }
});
}
//直接執行
getdata();

//監聽
inputClick.addEventListener('click', getUserInfo, false);
selectLocation.addEventListener('change', displaySelectionLocation, false);