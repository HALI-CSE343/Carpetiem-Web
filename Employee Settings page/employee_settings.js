/*
function addRows(){ 
	var table = document.getElementById('emptbl');
	var rowCount = table.rows.length;
	var cellCount = table.rows[0].cells.length; 
	var row = table.insertRow(rowCount);
	for(var i =0; i < cellCount; i++){
		var cell = 'cell'+i;
		cell = row.insertCell(i);
		var copycel = document.getElementById('col'+i).innerHTML;
		cell.innerHTML=copycel;
		
		
	}
}
function deleteRows(){
	var table = document.getElementById('emptbl');
	var rowCount = table.rows.length;
	if(rowCount > '2'){
		var row = table.deleteRow(rowCount-1);
		rowCount--;
	}
	else{
		alert('There should be atleast one row');
	}
}*/


function addRow(tableID) {  

	var table = document.getElementById(tableID);  
	var rowCount = table.rows.length;  
	var row = table.insertRow(rowCount);  
	//Column 1  
	var cell1 = row.insertCell(0);  
	var element1 = document.createElement("input");  
	element1.type = "button";  
	var btnName = "button" + (rowCount + 1);  
	element1.name = btnName;  
	element1.setAttribute('value', 'Delete'); // or element1.value = "button";  
	element1.onclick = function () { removeRow(btnName); }  
	cell1.appendChild(element1);  
	//Column 2    
	var cell2 = row.insertCell(1);  
	cell2.innerHTML = rowCount + 1;  
	//Column 3  
	var cell3 = row.insertCell(2);  
	var element3 = document.createElement("input");  
	element3.type = "text";  
	cell3.appendChild(element3);
	

}  
function removeRow(btnName) {  
	try {  
		var table = document.getElementById('dataTable');  
		var rowCount = table.rows.length;  
		for (var i = 0; i < rowCount; i++) {  
			var row = table.rows[i];  
			var rowrowObj = row.cells[0].childNodes[0];  
			if (rowObj.name == btnName) {  
				table.deleteRow(i);  
				rowCount--;  
			}  
		}  
	}  
	catch (e) {  
		alert(e);  
	}  
}  




function addRow(tableID) {  
	var table = document.getElementById(tableID);  
	var rowCount = table.rows.length;  
	var row = table.insertRow(rowCount);  
	//Column 1  
	var cell1 = row.insertCell(0);  
	var element1 = document.createElement("input");  
	element1.type = "button";  
	var btnName = "button" + (rowCount + 1);  
	element1.name = btnName;  
	element1.setAttribute('value', 'Delete'); // or element1.value = "button";  
	element1.onclick = function() {  
		removeRow(btnName);  
	}  
	cell1.appendChild(element1);  
	//Column 2  
	var cell2 = row.insertCell(1);  
	cell2.innerHTML = rowCount + 1;  
	//Column 3  
	var cell3 = row.insertCell(2);  
	var element3 = document.createElement("input");  
	element3.type = "text";  
	cell3.appendChild(element3);  
}  

function removeRow(btnName) {  
	try {  
		var table = document.getElementById('dataTable');  
		var rowCount = table.rows.length;  
		for (var i = 0; i < rowCount; i++) {  
			var row = table.rows[i];  
			var rowObj = row.cells[0].childNodes[0];  
			if (rowObj.name == btnName) {  
				table.deleteRow(i);  
				rowCount--;  
			}  
		}  
	} catch (e) {  
		alert(e);  
	}  
} 
