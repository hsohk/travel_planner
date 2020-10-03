import {CalculateDDay} from "../src/client/js/update"

test("Caculate D Day test. Remained day from today to target day",  () => {
    const targetDay = new Date();
    targetDay.setDate(targetDay.getDate()+1);
    const dDay = CalculateDDay(targetDay);
    expect(dDay).toBe(1);
});

