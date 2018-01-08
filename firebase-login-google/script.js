const addBtn = document.querySelector('#add-button');
const inputEl = document.querySelector('#todo-input');
const listEl = document.querySelector('#todo-list');
inputEl.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        addBtn.click();
    }
});
//input.text Enter키 작동

document.querySelector('#add-button').addEventListener('click', e => {
    const itemEl = document.createElement('div');
    if (inputEl.value === '') {
        return false;
    } else {
        itemEl.textContent = inputEl.value;
        listEl.appendChild(itemEl);
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