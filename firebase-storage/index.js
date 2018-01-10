const IMAGE_PER_PAGE = 2;
const btn = document.querySelector('.login');
const fileInputEl = document.querySelector('.file-input');
const auth = firebase.auth();
const storage = firebase.storage();
const imgList = document.querySelector('.image-list');
var provider = new firebase.auth.GoogleAuthProvider();

let keyStack = [];
let keys;
btn.addEventListener('click', async e => {
  await auth.signInWithPopup(provider).then(function(result) {
    var token = result.credential.accessToken;
    var user = result.user;
  })
})
fileInputEl.addEventListener('change', async e => {
  const refStr = `/images/${auth.currentUser.uid}:${new Date().getTime()}`;
  const snapshot = await storage.ref(refStr).put(fileInputEl.files[0]);
  //실시간 데이터베이스에 데이터저장
  firebase.database().ref(`/images/`).push({
    "downloadURL": snapshot.downloadURL,
    "fileName": fileInputEl.files[0].name
  })
  refreshImages();
})
async function refreshImages() {
  imgList.innerHTML = '';
  const snapshot = await firebase.database()
    .ref('/images')
    .orderByKey()
    .limitToFirst(IMAGE_PER_PAGE + 1)
    .startAt(keyStack[keyStack.length - 1] || '')
    .once('value');
  const imagesData = snapshot.val() || {};
  keys = Object.keys(imagesData);
  console.log(keyStack, keys);
  const imagesDataObject = Object.values(imagesData).slice(0, IMAGE_PER_PAGE);;
  //실시간 데이터베이스에서 이미지 정보 가져오기
  //각 이미지를 표시해주기
  for (let { downloadURL, fileName }
    of imagesDataObject) {
    //for(let [imgId,img] of Object.entries(imagesDataObject)){
    //const{downloadURL,fileName}=obj;
    //}
    const itemEl = document.createElement('div');
    itemEl.classList.add('image-list__image')

    let reimgEl = document.createElement('img');
    reimgEl.classList.add('image-list__image__img');
    reimgEl.src = downloadURL;
    itemEl.appendChild(reimgEl);


    let reimgDes = document.createElement('p')
    reimgDes.classList.add('image-list__image__fileName');
    reimgDes.textContent = fileName;
    itemEl.appendChild(reimgDes);

    imgList.appendChild(itemEl);
  }
}
firebase.auth().onAuthStateChanged(function(user) {
  if (user) refreshImages();
});

document.querySelector('.next-button').addEventListener('click', async e => {
  if (keys.length === IMAGE_PER_PAGE + 1) keyStack.push(keys[keys.length - 1])
  refreshImages();
})
document.querySelector('.prev-button').addEventListener('click', async e => {
  keyStack.pop();
  refreshImages()
})