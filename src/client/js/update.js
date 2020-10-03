import {deleteTravel} from "./schedule";
import {editTravel} from "./schedule";
import {addPopupHide} from "./modal";

let travelListElement;
let travelList;
/**
 * Update UI after ADDING, EDTING, DELETING
 *
 * Remove all innerHTML of .travel_list and re-generate
 */
function updateItems(){
    travelListElement =  document.querySelector(".travel_list");
    travelListElement.innerHTML = '';
    getLists()
        .then(function(dataList){
            travelList = dataList;
            for( let i=dataList.length-1 ; i>=0; i-- ){
                makeItem(dataList[i],i);
            }
        });
    addPopupHide();
}

/**
 * Fetching datas from server/all
 *
 * All datas will be fetched from server.
 */
const getLists = async ()=>{
    // const res = await fetch(baseURL+animal+key);
    const res = await fetch("http://localhost:8081/all");
    try{
        return await res.json();
    } catch(error){
        console.log("error",error);
    }
}


/**
 * Calculate D Day
 *
 * @param{targetDay} Target Day
 * D Day will be calculated with date and current day
 */
 function CalculateDDay(targetDay){
    return Math.ceil((new Date(targetDay)- new Date()) / 1000/60/60/24);
}

/**
 * Update travel list to UI
 * .item01,item02,item03..item${number of lists} will be added
 *
 * @param{data} entity iof data
 * @param{index}  index of current entity
 * data = { date, city, country, max_temp, min_temp}
 */
function makeItem(data, index){
 //   const fragment = document.createDocumentFragment();  // ← uses a DocumentFragment instead of a <div>for (let i = 0; i < 200; i++) {
    //ITEM DIV
    const itemDiv = document.createElement('div');
    itemDiv.classList.add("item")
    itemDiv.classList.add("item"+index)
    const dDay = CalculateDDay(data.date);
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

export {updateItems,travelList,CalculateDDay}
