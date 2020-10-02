import {deleteTravel} from "./schedule";
import {editTravel} from "./schedule";
import {addPopupHide} from "./modal";

let travel_list;
let travelList;
function updateItems(){
    travel_list =  document.querySelector(".travel_list");
    travel_list.innerHTML = '';
    getLists()
        .then(function(dataList){
            travelList = dataList;
            for( let i=dataList.length-1 ; i>=0; i-- ){
                makeItem(dataList[i],i);
            }
        });
    addPopupHide();
}

const getLists = async ()=>{
    // const res = await fetch(baseURL+animal+key);
    const res = await fetch("http://localhost:8081/all");
    try{
        return await res.json();
    } catch(error){
        console.log("error",error);
    }
}

function makeItem(data, index){
 //   const fragment = document.createDocumentFragment();  // ← uses a DocumentFragment instead of a <div>for (let i = 0; i < 200; i++) {
    //ITEM DIV
    const itemDiv = document.createElement('div');
    itemDiv.classList.add("item")
    itemDiv.classList.add("item"+index)
    const dDay =  Math.ceil((new Date(data.date)- new Date()) / 1000/60/60/24);
    itemDiv.innerHTML
        =`<div class="picture" ><img class="item_pic" src="${data.img}"></div>
            <div class="description">
                <div class="where">My trip to : ${data.city}, ${data.country}</div>
                <div class="when">Departing ${data.date}</div>
                <div class="countdown">${data.city}, ${data.country} is ${dDay} days away</div>
                <div class="weather">
                    <div class="title">Typical weather for then is : </div>
                    <div class="temperature">High : ${data.max_temp}, Low : ${data.min_temp}</div>
                </div>
                <button class="edit_button" id=${index}> Edit Travel </button> <button class="delete_button" id=${index}> Delete Travel </button>
            </div>`;

    itemDiv.querySelector(`.delete_button`).addEventListener("click", deleteTravel);
    itemDiv.querySelector(`.edit_button`).addEventListener("click", editTravel);
    const travelList = document.querySelector(".travel_list");
    travelList.appendChild(itemDiv);

}

export {updateItems,travelList}
/*

const fragment = document.createDocumentFragment();  // ← uses a DocumentFragment instead of a <div>
for (let i = 0; i < 200; i++) {
    const newElement = document.createElement('p');
    newElement.innerText = 'This is paragraph number ' + i;

    fragment.appendChild(newElement);
}

document.body.appendChild(fragment); // reflow and repaint here -- once!*/
