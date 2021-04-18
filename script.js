"use strict";

const addBtn = document.querySelector('.add__btn');
const list = document.querySelector('.list');
const inputValue = document.querySelector('.input');

const toDoList = [];

document.addEventListener("keyup", function(e) {
	e.preventDefault();
	if (e.keyCode === 13) {
        addListElem();
    }
});

addBtn.addEventListener('click',addListElem);

function addListElem() {
	if (inputValue.value){
		let	inputValueCapitalLeter = inputValue.value.trim();
		if (inputValueCapitalLeter == ""){
			inputValue.value = '';
			alert('The value cannot only consist of a spaces');
		} else {
			inputValueCapitalLeter = capitalize(inputValueCapitalLeter);

			const listElement = {};
			listElement.toDoText = inputValueCapitalLeter;
			listElement.done = false;

			toDoList.push(listElement);
			// console.log(toDoList);
			createToDoList();
		}	
	} else {
		alert('Enter what you would like to do');
	}
	inputValue.value = '';
	inputValue.focus();
}

function createToDoList() {
	list.innerHTML = '';

	createLiItem();

	document.querySelectorAll('.li__item').forEach((item,index) => {
		item.addEventListener('click', (event) => {
			if (event.target && event.target.tagName == 'LI') {
				if(toDoList[index].done == false) {
					toDoList[index].done = true;
				} else {
					toDoList[index].done = false;
				}
				item.classList.toggle('done');

			} else if (event.target.classList.contains('fas')) {
				toDoList.splice(index, 1);
				createToDoList();
			}
		});
	});
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function createLiItem() {
	for (let i = 0; i < toDoList.length; i++) {
		let liItem = document.createElement('li');
		let trashBin = document.createElement('i');

		liItem.classList.add('li__item');
		trashBin.classList.add('fas', "fa-trash-alt");

		if (toDoList[i].done == true) {
			liItem.classList.add('done');
		}

		liItem.textContent = toDoList[i].toDoText;
		
		liItem.append(trashBin);
		list.append(liItem);
	}
}



