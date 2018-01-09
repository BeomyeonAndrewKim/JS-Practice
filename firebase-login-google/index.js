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

inputEl.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    addBtn.click();
  }
});

document.querySelector('#add-button').addEventListener('click', async e => {
  const itemEl = document.createElement('div');
  if (inputEl.value === '') {
    return false;
  } else {
    listEl.classList.add('todo-list--loading');
    const uid = firebase.auth().currentUser.uid;
    await firebase.database().ref(`/users/${uid}/todos`).push({
      title: inputEl.value,
      complete: false
    });
    itemEl.textContent = inputEl.value;
    listEl.appendChild(itemEl);
    listEl.classList.remove('todo-list--loading');
  } //text빈 상태로 add키 작동하지 않게 하기
  inputEl.value = '';



  itemEl.addEventListener('click', e => {
    if (itemEl.classList.contains('complete')) {
      itemEl.classList.remove('complete');

    } else {
      itemEl.classList.add('complete');
    }
  })

  const removeButtonEl = document.createElement('div');
  itemEl.appendChild(removeButtonEl);

  removeButtonEl.addEventListener('click', e => {
    listEl.removeChild(itemEl);
  })
})
async function refreshTodos() {
  const uid = firebase.auth().currentUser.uid;
  const snapshot = await firebase.database().ref(`/users/${uid}/todos`).once('value');
  const todos = snapshot.val();
  const todosObject = Object.entries(todos);
  const todosKeys = Object.keys(todos);
  listEl.innerHTML = '';
  for (let [todoId, todo] of todosObject) {
    let todoEl = document.createElement('div');
    todoEl.textContent = todo.title;
    if (todo.complete) todoEl.classList.add('complete');
    listEl.appendChild(todoEl);
    todoEl.addEventListener('click', e => {
      console.log(todosKeys);
      if (todoEl.classList.contains('complete')) {
        todoEl.classList.remove('complete');
        firebase.database().ref(`/users/${uid}/todos/${todoId}`).update({ complete: false })
      } else {
        todoEl.classList.add('complete');
        firebase.database().ref(`/users/${uid}/todos/${todoId}`).update({ complete: true })
      }
    })
    const removeButtonEl = document.createElement('div');
    todoEl.appendChild(removeButtonEl);

    removeButtonEl.addEventListener('click', e => {
      listEl.removeChild(todoEl);
      firebase.database().ref(`/users/${uid}/todos/${todoId}`).remove();
      e.stopPropagation();
    })
  }

}