import {updateItems,travelList} from "./update";
import {addPopupShow,addPopupHide, alertShow,showWait,hideWait} from "./modal"

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

const addEntry  = async (city, date)=>{
    // const res = await fetch(baseURL+animal+key);
    addPopupHide();
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
        console.log("data.length" + data.length);

    } catch(error){
        console.log("error",error);
    }
}

const editEntry  = async (city, date)=>{
    // const res = await fetch(baseURL+animal+key);
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
        console.log(data.length);

    } catch(error){
        console.log("error",error);
    }
}

let travelId;
function editTravel(event){
    travelId = event.target.id;
    document.querySelector("#city").value = travelList[event.target.id].city;
    document.querySelector("#date").value = travelList[event.target.id].date;
    document.querySelector("#add-new-schedule").innerHTML = "EDIT"
    console.log("Edit Travel : ",event.target.id)
    console.log(travelList[0])
    addPopupShow();

}

function deleteTravel(event){
    console.log("Delete Travel : ",event.target.id)
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