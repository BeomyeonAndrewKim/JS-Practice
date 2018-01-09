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
    // todoList.style.display = 'flex';
    // btn.style.display = 'none';
});

//To Do List

const addBtn = document.querySelector('#add-button');
const inputEl = document.querySelector('#todo-input');
const listEl = document.querySelector('#todo-list');

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    refreshTodos();
  }
});

inputEl.addEventListener("keypress", function(event) {
  if (event.keyCode === 13) {
    addBtn.click();
  }
});
let uid;
let snapshot;
let todos;
let todosObject;
let todoEl;

document.querySelector('#add-button').addEventListener('click', async e => {
  todoEl = document.createElement('div');
  if (inputEl.value === '') {
    return false;
  } else {
    listEl.classList.add('todo-list--loading');
    const uid = firebase.auth().currentUser.uid;
    await firebase.database().ref(`/users/${uid}/todos`).push({
      title: inputEl.value,
      complete: false
    });
    todoEl.textContent = inputEl.value;
    listEl.appendChild(todoEl);
    listEl.classList.remove('todo-list--loading');
  } //text빈 상태로 add키 작동하지 않게 하기
  inputEl.value = '';
  refreshTodos();
})
async function refreshTodos() {
  uid = firebase.auth().currentUser.uid;
  snapshot = await firebase.database().ref(`/users/${uid}/todos`).once('value');
  todos = snapshot.val() || {};
  todosObject = Object.entries(todos);
  listEl.innerHTML = '';
  for (let [todoId, todo] of todosObject) {
    let todoEl = document.createElement('div');
    todoEl.textContent = todo.title;
    //todo.complete에 따라서 클래스 붙여주기
    if (todo.complete) todoEl.classList.add('todo-list__item--complete');
    const removeButtonEl = document.createElement('div');
    todoEl.appendChild(removeButtonEl);
    removeButtonEl.addEventListener('click', async e => {
      e.stopPropagation();
      await firebase.database().ref(`/users/${uid}/todos/${todoId}`).remove();
      refreshTodos();
    })
    todoEl.addEventListener('click', async e => {
      //complete를 바꿔서 데이터베이스 업데이트
      await firebase.database().ref(`/users/${uid}/todos/${todoId}`).update({ complete: !todo.complete })
      refreshTodos();
    })

    listEl.appendChild(todoEl);
  }
}