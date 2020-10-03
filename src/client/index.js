import { addNewSchedule } from './js/schedule'
import { updateItems} from "./js/update";
import {addPopupShow, alertHide} from "./js/modal";
import {addPopupHide,addTravelBtn} from "./js/modal";
//scss
import './styles/common.scss'
import './styles/layout.scss'
import './styles/style.scss'
import './styles/popup.scss'
import './styles/modal.scss'

const addBtn = document.querySelector('#add-new-schedule');
addBtn.addEventListener("click",addNewSchedule);

const addPopupBtn = document.querySelector('#add_button');
addPopupBtn.addEventListener("click",addTravelBtn);

const closeBtn = document.querySelector('.close');
closeBtn.addEventListener("click",addPopupHide);

const alertBtn = document.querySelector('#alert_btn');
alertBtn.addEventListener("click",alertHide);

var modal = document.getElementById("myModal");
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

updateItems();