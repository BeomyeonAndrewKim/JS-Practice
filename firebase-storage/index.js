const btn = document.querySelector('button');
const fileInputEl = document.querySelector('.file-input');
const auth = firebase.auth();
const storage = firebase.storage();
var provider = new firebase.auth.GoogleAuthProvider();
btn.addEventListener('click', async e => {
  await auth.signInWithPopup(provider).then(function(result) {
    var token = result.credential.accessToken;
    var user = result.user;
  })
})
fileInputEl.addEventListener('change', async e => {
  const refStr = `/images/${auth.currentUser.uid}:${new Date().getTime()}`;
  const snapshot = await storage.ref(refStr).put(fileInputEl.files[0]);
  const imageEl = document.createElement('img');
  imageEl.src = snapshot.downloadURL;
  document.body.appendChild(imageEl);
})