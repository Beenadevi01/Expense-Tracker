// source.js

let tableEntries=[
    {type:1, name:"income", amount:25000},
    {type:0, name:"rent", amount:18000},
    {type:0, name:"food", amount:5000},
];
function updateSummary(){
    let totalIncome= tableEntries.reduce((t,e)=>{
        if(e.type === 1) t += e.amount;
        return t;
    },0);
    let totalExpense= tableEntries.reduce((ex,e)=>{
        if(e.type === 0) ex += e.amount;
        return ex;
    },0);
    updatedInc.innerText = totalIncome;
    updatedExp.innerText = totalExpense;
    updatedBal.innerText = totalIncome - totalExpense;
}

//Function to add new entries
function addItem(){
    let type = itemType.value;
    let name = document.getElementById("name");
    let amount = document.getElementById("amount");

//input validation
    if (name.value === "" || Number(amount.value) === 0)
    return alert("Incorrect input");
    if(Number(amount.value) <= 0)
    return alert("Incorrect amount! cannot add negative values");

//Get new data
tableEntries.push({
    type: Number(type),
    name: name.value,
    amount: Number(amount.value),
});
updateTable();
name.value = "";
amount.value = 0;
}

//Loading entries in the expense table
function loadItems(e,i){
    let cls;
    let table = document.getElementById("table");
    let row = table.insertRow(i +1);
    let cell0 = row.insertCell(0);
    let cell1 = row.insertCell(1);
    let cell2 = row.insertCell(2);
    let cell3 = row.insertCell(3);
    let cell4 = row.insertCell(4);
    cell0.innerHTML = i + 1;
    cell1.innerHTML = e.name;
    cell2.innerHTML = e.amount;
    cell4.innerHTML = "❌";
    cell4.classList.add("zoom");
    cell4.addEventListener("click", () => del(e));
    if(e.type == 0){
        cls = "red";
        cell3.innerHTML = "➘";
    }else{
        cls = "green";
        cell3.innerHTML = "➚";
    }
    cell3.style.color = cls;
}

//Clear table before updation
function remove(){
    while (table.rows.length > 1)
    table.deleteRow(-1);
}

//Funtion to delete a entry
function del(el){
    remove();
    tableEntries = tableEntries.filter(
        (e) => e.name !== el.name
    );
    tableEntries.map((e,i) => loadItems(e,i));
    updateSummary();
}

//to render all entries
function updateTable(){
    remove();
    tableEntries.map((e, i) => {
        loadItems(e, i);
    });
    updateSummary();
}
updateTable();