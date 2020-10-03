import {addNewSchedule} from "../src/client/js/schedule"
const fetch = require("node-fetch");

test("Test for get all travels list ", async () => {
    const res = await fetch("http://localhost:8081/all");
    try{
        const result =  await res.json();
        expect(result.length).toBe(1);
    } catch(error){
        expect(error).toBeNull();
    }
});

