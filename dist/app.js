/*var manager = document.getElementById("manager"); 
var newRow = manager.insertRow(0);
var cellOne = newRow.insertCell(0);

cellOne.innerHTML = "test";*/


var cell = document.createElement("td");
cell.innerHTML = "test";
var row = document.createElement("tr");
row.appendChild(cell);
document.getElementById("tbody").appendChild(row); 

