function addTravelBtn(){
    document.querySelector("#city").value="";
    document.querySelector("#date").value = "";
    document.querySelector("#add-new-schedule").innerHTML = "ADD"
    addPopupShow();
}

function addPopupShow(){
    const modal = document.getElementById("myModal");
    modal.style.display = "block";
}

function addPopupHide(){
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}

function alertShow(msg){
    const alertWindow = document.querySelector(".alert-modal");
    document.getElementById("alert-text").innerText=msg;
    alertWindow.style.display = "block";
}

function alertHide(){
    const alertWindow = document.querySelector(".alert-modal");
    alertWindow.style.display = "none";
}

function showWait(){
    document.querySelector("#overlay").style.display="block";
}

function hideWait(){
    document.querySelector("#overlay").style.display="none";
}

export {addPopupShow, addPopupHide, addTravelBtn,alertShow,alertHide,showWait,hideWait}