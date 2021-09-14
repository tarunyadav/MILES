const { remote } = require('electron');
const { ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');
// const jQuery = require('jquery');



try {
    window.$ = window.jQuery = require('jquery');
    window.Popper = require('popper.js').default;
    require('bootstrap');
} catch (e) {
    console.log(e)
}

// var CsvReadableStream = require('csv-reader');
var DDT = null;
var TT_Entries = 0;
var get_TT = null;
//ConnectionStatus = remote.getGlobal('AVEngineStatus');
tableBody = document.getElementById("table-body");
table = document.getElementById("table");
tableHead = document.getElementById("table-head");
btnEntries = document.getElementById("Entries");
btnstarTT = document.getElementById("starTT");
btnpTT = document.getElementById("pTT");
btnfTT = document.getElementById("fTT");
btnfTT = document.getElementById("fTT");
divpTT = document.getElementById("pTTDiv");
OptionspTT = document.getElementById("pTTOptions");
labelDDT = document.getElementById("DDTLabel");
labelSelect = document.getElementById("SelectLabel");
//labelOptions = document.getElementById("OptionsLabel");
btnRefresh = document.getElementById("Refresh");
iconRefresh = document.getElementById("RefreshIcon");
btnNext= document.getElementById("next");
(async () => {
    DDT = await ipcRenderer.invoke('getDDT');
    if (DDT != null) {
        //labelDDT.click();
        labelDDT.classList.add("btn-success");
        labelDDT.classList.remove("btn-danger");
        labelDDT.innerHTML = '<font size="4"> <b> DDT Available </b><font>';
    }
    // console.log(DDT); 
})();

function TableChange(checkValue){
    tableHead.innerHTML = '';
    var headrows = '<tr style="font-size:14px;padding:0px">';
    //console.log(DDT.length);
    for (var i = 0; i < 2 * Math.log2(DDT.length); i++) {
        headrows += ' <th style="width: 50px;position: sticky; top: -1px;background-color: #B8B8B8;" > x' + i.toString().sub() + '</th>';
    }
    headrows += ' <th style="width: 50px;position: sticky; top: -1px;background-color: #B8B8B8;" > f </th>';
    headrows += '</tr>'
    tableHead.insertAdjacentHTML('beforeend', headrows);
    var rows = '';
    tableBody.innerHTML = '';
    TT_Entries = 0;
    var TT = new Array();
    //new Array(sboxArr.length);

    // for( var i = 0; i < TT.length; i++ ){
    //     TT[i] = new Array(sboxArr.length).fill(0);
    // }
    for (var i = 0; i < DDT.length; i++) {
        
        for (var j = 0; j < DDT[i].length; j++) {
            if (DDT[i][j] == checkValue) {
                TT_Entries++;
                var TT_entry = new Array();
                rows += '<tr style="font-size:14px;padding:0px">'
                var binary_i = i.toString(2).padStart(Math.log2(DDT.length), "0");
                var binary_j = j.toString(2).padStart(Math.log2(DDT.length), "0");
                for (var l = 0; l < binary_i.length; l++) {
                    rows += '<td align="center" style="width: 30px;padding:2px 2px 2px 2px !important;margin:0px !important;">' + binary_i[l] + '</td>';
                    TT_entry.push(parseInt(binary_i[l]));
                }
                for (var m = 0; m < binary_j.length; m++) {
                    rows += '<td align="center" style="width: 30px;padding:2px 2px 2px 2px !important;margin:0px !important;">' + binary_j[m] + '</td>';
                    TT_entry.push(parseInt(binary_j[m]));
                }
                rows += '<td align="center" style="width: 30px;padding:2px 2px 2px 2px !important;margin:0px !important;">' + 1 + '</td>';
                TT_entry.push(1);
                rows += '</tr>'
                TT.push(TT_entry);
            }
            
        }
        
    }

    (async () => {
        const result = await ipcRenderer.invoke('setTT', TT);
        // console.log(result); 
    })();

    tableBody.insertAdjacentHTML('beforeend', rows);
    table.style.display = "block";
    (async () => {
        btnEntries.style.display = "inline-block";
        btnEntries.classList.add("btn-success");
        btnEntries.classList.remove("btn-danger");
        btnEntries.innerHTML = '<font size="4"> <b> Entries: '+TT_Entries+'</b><font>';
    })();
}


btnstarTT.addEventListener('click', function () {
    divpTT.style.display = "none";
    labelSelect.innerHTML = '<font size="4"> <b> *-TT </b><font>';
    tableHead.innerHTML = '';
    var headrows = '<tr style="font-size:14px;padding:0px">';
    //console.log(DDT.length);
    for (var i = 0; i < 2 * Math.log2(DDT.length); i++) {
        headrows += ' <th style="width: 50px;position: sticky; top: -1px;background-color: #B8B8B8;" > x' + i.toString().sub() + '</th>';
    }
    headrows += ' <th style="width: 50px;position: sticky; top: -1px;background-color: #B8B8B8;" > f </th>';
    headrows += '</tr>'
    tableHead.insertAdjacentHTML('beforeend', headrows);
    var rows = '';
    tableBody.innerHTML = '';
    TT_Entries = 0;
    var TT = new Array();
    for (var i = 0; i < DDT.length; i++) {
        
        for (var j = 0; j < DDT[i].length; j++) {
            if (DDT[i][j] != 0) {
                TT_Entries++;
                var TT_entry = new Array();
                rows += '<tr style="font-size:14px;padding:0px">'
                var binary_i = i.toString(2).padStart(Math.log2(DDT.length), "0");
                var binary_j = j.toString(2).padStart(Math.log2(DDT.length), "0");
                for (var l = 0; l < binary_i.length; l++) {
                    rows += '<td align="center" style="width: 30px;padding:2px 2px 2px 2px !important;margin:0px !important;">' + binary_i[l] + '</td>';
                    TT_entry.push(parseInt(binary_i[l]));
                }
                for (var m = 0; m < binary_j.length; m++) {
                    rows += '<td align="center" style="width: 30px;padding:2px 2px 2px 2px !important;margin:0px !important;">' + binary_j[m] + '</td>';
                    TT_entry.push(parseInt(binary_j[m]));
                }
                rows += '<td align="center" style="width: 30px;padding:2px 2px 2px 2px !important;margin:0px !important;">' + 1 + '</td>';
                TT_entry.push(1);
                rows += '</tr>'
                TT.push(TT_entry);
            }
            
        }
        
    }

    (async () => {
        const result = await ipcRenderer.invoke('setTT', TT);
        console.log(result); 
    })();

    tableBody.insertAdjacentHTML('beforeend', rows);
    table.style.display = "block";
    (async () => {
        btnEntries.style.display = "inline-block";
        btnEntries.classList.add("btn-success");
        btnEntries.classList.remove("btn-danger");
        btnEntries.innerHTML = '<font size="4"> <b> Entries: '+TT_Entries+'</b><font>';
    })();

});

btnpTT.addEventListener('click', function () {

    labelSelect.innerHTML = '<font size="4"> <b> p-TT </b><font>';
    var unique_values = [0];
    for (var i = 0; i < DDT.length; i++) {
        unique_values = Array.from(new Set(unique_values.concat(DDT[i])))
    }
    unique_values = unique_values.sort(function (a, b) {  return a - b;  });
    
    var rows = ''
    for (var i = 0; i < unique_values.length; i++) {
        if (unique_values[i]!=0){
            rows += '<a class="dropdown-item pTTClass" href="#" id="'+ unique_values[i] +'" style="color: grey;"><b>'+unique_values[i]+'</b></a>';
        }
    }
    OptionspTT.innerHTML = rows
    divpTT.style.display = "inline-block";

    btns = document.getElementsByClassName("pTTClass");
    var btn_id = 0;
    for (var i = 0; i < btns.length; i++) {
        btn_id = parseInt(btns[i].id);
        console.log(btn_id);
        btns[i].addEventListener("click", async function (e) {
            var click_id = e.target;
			TableChange(parseInt(click_id.id));
            labelOptions = document.getElementById("OptionsLabel");
            labelOptions.innerHTML = parseInt(click_id.id);
            // console.log(click_id.id);
        });
    }

 
});

btnfTT.addEventListener('click', function () {
    divpTT.style.display = "none";
    labelSelect.innerHTML = '<font size="4"> <b> f-TT </b><font>';
    tableHead.innerHTML = '';
    var headrows = '<tr style="font-size:14px;padding:0px">';
    //console.log(DDT.length);
    var unique_values = [0];
    for (var i = 0; i < DDT.length; i++) {
        unique_values = Array.from(new Set(unique_values.concat(DDT[i])))
    }
    unique_values = unique_values.sort(function (a, b) {  return a - b;  });
    for (var i = 0; i < (2 * Math.log2(DDT.length)) + unique_values.length-2; i++) {
        headrows += ' <th style="width: 50px;position: sticky; top: -1px;background-color: #B8B8B8;" > x' + i.toString().sub() + '</th>';
    }
    headrows += ' <th style="width: 50px;position: sticky; top: -1px;background-color: #B8B8B8;" > f </th>';
    headrows += '</tr>'
    tableHead.insertAdjacentHTML('beforeend', headrows);
    var rows = '';
    tableBody.innerHTML = '';
    TT_Entries = 0;
    //console.log(unique_values)
    var TT = new Array();
    for (var i = 0; i < DDT.length; i++) {
        
        for (var j = 0; j < DDT[i].length; j++) {
            if (DDT[i][j] != 0) {
                for (var k = 1; k < unique_values.length; k++) {
                    if (DDT[i][j] == unique_values[k]) {
                        p = Math.pow(2,k-1);
                        if (k==unique_values.length-1){
                            p=0;
                        }
                        
                        TT_Entries++;
                        var TT_entry = new Array();
                        rows += '<tr style="font-size:14px;padding:0px">'
                        var binary_i = i.toString(2).padStart(Math.log2(DDT.length), "0");
                        var binary_j = j.toString(2).padStart(Math.log2(DDT.length), "0");
                        var binary_p = p.toString(2).padStart(unique_values.length-2, "0");
                        for (var l = 0; l < binary_i.length; l++) {
                            rows += '<td align="center" style="width: 30px;padding:2px 2px 2px 2px !important;margin:0px !important;">' + binary_i[l] + '</td>';
                            TT_entry.push(parseInt(binary_i[l]));
                        }
                        for (var m = 0; m < binary_j.length; m++) {
                            rows += '<td align="center" style="width: 30px;padding:2px 2px 2px 2px !important;margin:0px !important;">' + binary_j[m] + '</td>';
                            TT_entry.push(parseInt(binary_j[m]));
                        }
                        for (var n = 0; n < binary_p.length; n++) {
                            rows += '<td align="center" style="width: 30px;padding:2px 2px 2px 2px !important;margin:0px !important;">' + binary_p[n] + '</td>';
                            TT_entry.push(parseInt(binary_p[n]));
                        }
                        rows += '<td align="center" style="width: 30px;padding:2px 2px 2px 2px !important;margin:0px !important;">' + 1 + '</td>';
                        TT_entry.push(1);
                        rows += '</tr>'
                        TT.push(TT_entry);
                    }
                }
            }
        }
        
    }
    (async () => {
        const result = await ipcRenderer.invoke('setTT', TT);
        console.log(result); // prints "foo"
    })();
    // console.log(TT);
    // console.log(TT[0]);
    tableBody.insertAdjacentHTML('beforeend', rows);
    table.style.display = "block";
    (async () => {
        btnEntries.style.display = "inline-block";
        btnEntries.classList.add("btn-success");
        btnEntries.classList.remove("btn-danger");
        btnEntries.innerHTML = '<font size="4"> <b> Entries: '+TT_Entries+'</b><font>';
    })();

});

btnRefresh.addEventListener('click', function () {
    location.reload();
});

btnNext.addEventListener('click', function () {
    (async () => {
        get_TT = await ipcRenderer.invoke('getTT');
        // console.log(get_TT);
    
    var fs = require('fs')
    var logger = fs.createWriteStream(path.join(require('os').homedir(),'TT.txt'), { flags: 'w'})
    logger.write(".i "+ (get_TT[0].length-1).toString()+"\n");
    logger.write(".o 1 \n");
    var TT_line = "";
    for (var i = 0; i < get_TT.length; i++) {
        TT_line = "";
        for (var j = 0; j < get_TT[i].length; j++) {
            if (j!= get_TT[i].length-1){
                TT_line += get_TT[i][j].toString()
            }
            else{
                TT_line += "|"+get_TT[i][j].toString() + "\n"
            }

        }
        logger.write(TT_line);
    }
    logger.end();
    ipcRenderer.send('TTminimize');
    })();
    

});