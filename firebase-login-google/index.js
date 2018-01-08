//Google Login
var provider = new firebase.auth.GoogleAuthProvider();
const btn = document.querySelector('button');
const todoList = document.querySelector('.container');
btn.addEventListener('click', e => {
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  })
  todoList.style.display = 'flex';
  btn.style.display = 'none';
});


//To Do List

const addBtn = document.querySelector('#add-button');
const inputEl = document.querySelector('#todo-input');
const listEl = document.querySelector('#todo-list');



inputEl.addEventListener("keyup", async function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    listEl.classList.add('todo-list--loading');
    const uid = firebase.auth().currentUser.uid;
    await firebase.database().ref(`/users/${uid}/todos`).push({
      title: inputEl.value,
      complete: false
    });
    refreshTodos();
    // addBtn.click();
  }
});
//input.text Enter키 작동

// document.querySelector('#add-button').addEventListener('click', e => {
//   const itemEl = document.createElement('div');
//   if (inputEl.value === '') {
//     return false;
//   } else {
//     const uid = firebase.auth().currentUser.uid;

//     itemEl.textContent = inputEl.value;
//     listEl.appendChild(itemEl);
//   } //text빈 상태로 add키 작동하지 않게 하기
//   inputEl.value = '';



//   itemEl.addEventListener('click', e => {
//     if (itemEl.classList.contains('complete')) {
//       itemEl.classList.remove('complete');

//     } else {
//       itemEl.classList.add('complete');
//     }
//   })

//   const removeButtonEl = document.createElement('div');
//   itemEl.appendChild(removeButtonEl);

//   removeButtonEl.addEventListener('click', e => {
//     listEl.removeChild(itemEl);
//   })
// })
async function refreshTodos() {

  const uid = firebase.auth().currentUser.uid;
  const snapshot = await firebase.database().ref(`/users/${uid}/todos`).once('value');
  const todos = snapshot.val();
  console.log(todos);
  listEl.innerHTML = '';
  for (let [todoId, todo] of Object.entries(todos)) {
    let todoEl = document.createElement('div');
    todoEl.textContent = todo.title;
    listEl.appendChild(todoEl);
  }
  listEl.classList.remove('todo-list--loading');
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    refreshTodos();
  }
});