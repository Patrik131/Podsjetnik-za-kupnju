// index.js
import { initializeApp } from './node_modules/firebase/app.js';
import { getDatabase, ref, push, onValue, remove } from './node_modules/firebase/database.js';


// Firebase project configuration
const appSettings = {
    databaseURL: 'https://playground-6eae4-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListaUDB = ref(database, 'shoppingLista');

let inputText = document.getElementById('inputText');
let inputBtn = document.getElementById('inputBtn');
let itemList = document.getElementById('itemList');

inputBtn.addEventListener('click', () => {
    let itemValue = inputText.value;
    push(shoppingListaUDB, itemValue);
    clearInputFieldEl();
});

onValue(shoppingListaUDB, (snapshot) => {
    if (snapshot.exists()) {
        const itemIzBaze = snapshot.val();
        const praviItemIzBaze = Object.entries(itemIzBaze);
        clearShoppingListEl();

        for (let i = 0; i < praviItemIzBaze.length; i++) {
            appendItemToShoppingListEl(praviItemIzBaze[i]);
        }
    } else {
        itemList.innerHTML = 'Nema namirnica ovdje... još';
    }
});

function clearInputFieldEl() {
    inputText.value = '';
}

function clearShoppingListEl() {
    itemList.innerHTML = '';
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0];
    let itemVrijednost = item[1];
    let itemNaPageu = document.createElement('li');
    itemNaPageu.textContent = itemVrijednost;

    itemNaPageu.addEventListener('dblclick', () => {
        let tocnaPozicijaItemaUDB = ref(database, `shoppingLista/${itemID}`);
        remove(tocnaPozicijaItemaUDB);
    });

    itemList.append(itemNaPageu);
}
