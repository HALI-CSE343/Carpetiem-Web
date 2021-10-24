
function addRow(tableID,btnId) { 

    //document.getElementById(btnId).disabled = 'true';
    
    var table = document.getElementById(tableID);  
    var rowCount = table.rows.length;  
    var row = table.insertRow(rowCount);  
    //Column 1  
    var cell1 = row.insertCell(0);
    var element1 = document.createElement("input");
    element1.type = "text";
    //element1.readOnly = true;
    cell1.appendChild(element1);
    //Column 2  
    var cell2 = row.insertCell(1);  
    var element2 = document.createElement("input");  
    element2.type = "text";  
    cell2.appendChild(element2);  
    //Column 3  
    var cell3 = row.insertCell(2);  
    var element3 = document.createElement("input");  
    element3.type = "text";  
    cell3.appendChild(element3);  
    //Column 4
    var cell4 = row.insertCell(3);
    var element4 = document.createElement("input");
    element4.type = "text";
    cell4.appendChild(element4);
    //Column 5
    var cell5 = row.insertCell(4);
    var element5 = document.createElement("input");
    element5.type = "text";
    cell5.appendChild(element5);
    //Column 6
    var cell6 = row.insertCell(5);  
    var element6 = document.createElement("input");  
    element6.type = "button";  
    var btnName = "button" + (rowCount + 1);  
    element6.name = btnName;  
    element6.className = "btn btn-danger";
    element6.setAttribute('value', 'Delete'); // or element7.value = "button";  
    element6.onclick = function() {  
        removeRow(btnName);  
    }  
    cell6.appendChild(element6);
    
    
    var element7 = document.createElement("input");  
    element7.type = "button";  
    var btnName = "button" + (rowCount + 1);  
    element7.name = btnName;  
    element7.className = "btn btn-warning";
    element7.setAttribute('value', 'Edit'); // or element7.value = "button";  
    element7.onclick = function() {  
        readRow(btnName);  
    }  
    cell6.appendChild(element7);
    
    
}  

function removeRow(btnName) {  
    try {  
        var table = document.getElementById('dataTable');  
        var rowCount = table.rows.length;  
        for (var i = 0; i < rowCount; i++) {  
            var row = table.rows[i];  
            var rowObj = row.cells[5].childNodes[0];  
            if (rowObj.name == btnName) {  
                table.deleteRow(i);  
                rowCount--;  
            }  
        }  
    } catch (e) {  
        alert(e);  
    }  
} 

function readRow(btnName) {  
    try {  
        var table = document.getElementById('dataTable');  
        var rowCount = table.rows.length;  
        for (var i = 0; i < rowCount; i++) {  
            var row = table.rows[i];  
            var rowObj = row.cells[5].childNodes[0];  
            if (rowObj.name == btnName) {  
                console.log(row.cells[0].childNodes[0]);
            }  
        }  
    } catch (e) {  
        alert(e);  
    }  
} 

//buton isimleri silip eklerken aynı olabilir ona sonra önlem al
function newRow(tableID,name,mail){

    var table = document.getElementById(tableID);  
    var rowCount = table.rows.length; 
    var row = table.insertRow(rowCount); 
    //Column 1  
    var cell1 = row.insertCell(0);
    var element1 = document.createElement("input");
    element1.type = "text";
    element1.id = "name-box"; 
    
    element1.setRangeText(name);
    //element1.readOnly = true;
    cell1.appendChild(element1);
    //Column 2  
    var cell2 = row.insertCell(1);  
    var element2 = document.createElement("input");  
    element2.type = "text";  
    cell2.appendChild(element2);  
    //Column 3  
    var cell3 = row.insertCell(2);  
    var element3 = document.createElement("input");  
    element3.type = "text";  
    element3.setRangeText(mail);
    cell3.appendChild(element3);  
    //Column 4
    var cell4 = row.insertCell(3);
    var element4 = document.createElement("input");
    element4.type = "text";
    cell4.appendChild(element4);
    //Column 5
    var cell5 = row.insertCell(4);
    var element5 = document.createElement("input");
    element5.type = "text";
    cell5.appendChild(element5);
    //Column 6
    var cell6 = row.insertCell(5);  
    var element6 = document.createElement("input");  
    element6.type = "button";  
    var btnName = "button" + (rowCount + 1);  
    element6.name = btnName;
    element6.className = "btn btn-danger"; 
    element6.setAttribute('value', 'Delete'); // or element1.value = "button";  
    element6.onclick = function() {  
        removeRow(btnName);  
    }  
    cell6.appendChild(element6);
    
    
    var element7 = document.createElement("input");  
    element7.type = "button";  
    var btnName = "button" + (rowCount + 1);   
    element7.name = btnName;  
    element7.className = "btn btn-warning";
    element7.setAttribute('value', 'Edit'); // or element1.value = "button";  
    element7.onclick = function() {  
        readRow(btnName);  
    }  
    cell6.appendChild(element7);
}

function startTable(tableID){
    
    for(i = 0 ; i< 4 ; i++){
        newRow(tableID,"haluk"+i, "dsfg@gmail.com");
    }
}
