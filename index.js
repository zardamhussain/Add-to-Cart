
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase,ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

const appSetting = {
    databaseURL : "https://playground-e130b-default-rtdb.asia-southeast1.firebasedatabase.app",
}

const inputField = document.querySelector('#input-field');
const button = document.querySelector('#add-button');
const shoppingList = document.querySelector('#shopping-list');

const app = initializeApp(appSetting);
const db = getDatabase(app);
const itemsInDB = ref(db, 'items');


onValue(itemsInDB, (snapshot) => {
    shoppingList.innerHTML = "";
    if(snapshot.val() == null) return;
    Object.entries(snapshot.val()).map( item => addItemToList(item[0], item[1]));
})


button.addEventListener('click', () => {
    if(inputField.value == '') return;
    push(itemsInDB, inputField.value);
    inputField.value = "";
})

function addItemToList(id, item) {
    const newLi = document.createElement('li');
    newLi.textContent = item;
    newLi.id = id;
    newLi.addEventListener('click', () => {
        remove(ref(db, `items/${id}`));
    });
    shoppingList.appendChild(newLi);
}
