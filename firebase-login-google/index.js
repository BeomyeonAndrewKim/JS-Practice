//Google Login
var provider = new firebase.auth.GoogleAuthProvider();
const btn = document.querySelector('button');
const todoList = document.querySelector('.container');
btn.addEventListener('click', e => {
  firebase.auth().signInWithPopup(provider).then(function(result) {
    var token = result.credential.accessToken;
    var user = result.user;
  })
  todoList.style.display = 'flex';
  btn.style.display = 'none';
});
//To Do List
const addBtn = document.querySelector('#add-button');
const inputEl = document.querySelector('#todo-input');
const listEl = document.querySelector('#todo-list');
let uid;
let snapshot;
let todos;
let todosObject;
let todoEl;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) refreshTodos();
});

inputEl.addEventListener("keypress", function(event) {
  if (event.keyCode === 13) addBtn.click();
});

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
  //화면에 데이터보여주기
  for (let [todoId, todo] of todosObject) {
    let todoEl = document.createElement('div');
    todoEl.textContent = todo.title;
    //remove 버튼 추가해주기
    const removeButtonEl = document.createElement('div');
    removeButtonEl.classList.add('remove')
    todoEl.appendChild(removeButtonEl);

    //todo.complete에 따라서 클래스 붙여주기
    if (todo.complete) todoEl.classList.add('todo-list__item--complete');
    //수정 버튼 추가해주기
    const reviseButtonEl = document.createElement('div');
    reviseButtonEl.classList.add('revise')
    todoEl.appendChild(reviseButtonEl);
    //remove 버튼 클릭시 작동하기
    removeButtonEl.addEventListener('click', async e => {
        e.stopPropagation();
        await firebase.database().ref(`/users/${uid}/todos/${todoId}`).remove();
        refreshTodos();
      })
      //complete 작동하기
    todoEl.addEventListener('click', async e => {
      //complete를 바꿔서 데이터베이스 업데이트
      await firebase.database().ref(`/users/${uid}/todos/${todoId}`).update({ complete: !todo.complete });
      refreshTodos();
    })

    //Modal 활용 수정 기능
    var modalBox = document.querySelector(".modal-box");
    var modalSelector = document.querySelector('.modal');

    function modalOff() {
      modalBox.classList.add('active-off');
      setTimeout(function() {
        modalBox.classList.remove('active');
        modalSelector.classList.remove('modal-bg');
      }, 300);
    }
    reviseButtonEl.addEventListener('click', async e => {
      e.stopPropagation();

      modalBox.classList.add('active');
      modalBox.classList.remove('active-off');
      modalSelector.classList.add('modal-bg');

      let snapshotId = await firebase.database().ref(`/users/${uid}/todos/${todoId}`).once('value')
      let todoIdval = snapshotId.val();
      document.getElementById('todo-revise').value = todoIdval.title;

      modalBox.querySelector('.exit').addEventListener('click', e => {
        modalOff();
      })
      modalSelector.addEventListener('click', e => {
        modalOff();
      })
      document.querySelector('.exit-icon').addEventListener('click', e => {
        modalOff();
      })
      document.getElementById('todo-revise').addEventListener("keypress", function(event) {
        if (event.keyCode === 13) document.querySelector('.confirm').click();
      });
      document.querySelector('.confirm').addEventListener('click', async e => {
        await firebase.database().ref(`/users/${uid}/todos/${todoId}`).update({ title: document.getElementById('todo-revise').value });
        refreshTodos();
        modalOff();
      })
    })

    listEl.appendChild(todoEl);
  }
}