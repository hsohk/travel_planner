import {updateItems,travelList} from "./update";
import {addPopupShow,addPopupHide, alertShow,showWait,hideWait} from "./modal"

/**
 * Add new Entry (city,date) to database in server
 * Additional information will be retrieved via API.
 *
 * city is the value of #city element
 * date is the value of #date element
 * Fetch(/add) will be done through addEntry
 * After Adding to DB wait message(hideWait) will be hidden and list will be updated by (updateItems)
 */
function addNewSchedule(){
    const city = document.querySelector("#city").value;
    const date = document.querySelector("#date").value;
    addPopupHide();
    if(new Date(date)<new Date())
    {
        alertShow("Please select date after today")
        return
    }
    if(document.querySelector("#add-new-schedule").innerHTML==="ADD"){
        addEntry(city,date)
            .then (()=>{
                hideWait();
                updateItems();
            })
    } else {
        editEntry(city,date)
            .then(()=>{
                hideWait();
                updateItems();
            })
    }
}

/**
 * Execute fetching server/add
 * new Entry will be transferred and saved in server
 *
 * @param{city} is the value of #city element
 * @param{date} is the value of #date element
 * data[{
 *     city,country,lat,lng, max_temp,min_temp,img
 * } will be saved in server
 */
const addEntry  = async (city, date)=>{
    // const res = await fetch(baseURL+animal+key);
    showWait();
    const res = await fetch(
        "http://localhost:8081/add",
        {
            method: 'POST',
            credentials: 'same-origin',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    "city" : city,
                    "date" : date,
                })
        }
    );
    try{
        const data = await res.json();
    } catch(error){
        console.log("error",error);
    }
}

/**
 * Execute fetching server/edit
 * Edit Entry will be transferred and saved in server
 *
 * @param{city} is the value of #city element
 * @param{date} is the value of #date element
 * data[{
 *     city,country,lat,lng, max_temp,min_temp,img
 * } will be saved in server
 */
const editEntry  = async (city, date)=>{
    // const res = await fetch(baseURL+animal+key);
    showWait();
    const res = await fetch(
        "http://localhost:8081/edit",
        {
            method: 'POST',
            credentials: 'same-origin',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    "id" : travelId,
                    "city" : city,
                    "date" : date,
                })
        }
    );
    try{
        const data = await res.json();
    } catch(error){
        console.log("error",error);
    }
}

/**
 * Manipulate input window for editing
 * Modify City,Date input field as current data.
 *
 * event.target.id is the index of entry which user want to edit
 * set the input value with ( travelList[index].city/date
 * modify button's text from ADD to EDIT
 */
let travelId;
function editTravel(event){
    travelId = event.target.id;
    document.querySelector("#city").value = travelList[event.target.id].city;
    document.querySelector("#date").value = travelList[event.target.id].date;
    document.querySelector("#add-new-schedule").innerHTML = "EDIT"
    addPopupShow();

}
/**
 * deleteTravel(), deleteEntry
 * Delete entry from DB with index.
 * Fetching server/del
 * id is index of entry and same as event.target.id
 */
function deleteTravel(event){
    deleteEntry(event.target.id)
    updateItems();

}
const deleteEntry  = async (id)=>{
    // const res = await fetch(baseURL+animal+key);
    const res = await fetch(
        "http://localhost:8081/del",
        {
            method: 'POST',
            credentials: 'same-origin',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    "id" : id
                })
        }
    );
    try{
        const data = await res.json();
        console.log(data.length);

    } catch(error){
        console.log("error",error);
    }
}

export{}

export{addNewSchedule,editTravel, deleteTravel,travelId }