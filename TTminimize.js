const {ipcRenderer, remote} = require('electron');
const readline = require('readline');
var path = require('path');
var fs = require('fs');
var $ = require('jquery');

try {
    window.$ = window.jQuery = require('jquery');
    window.Popper = require('popper.js').default;
    require('bootstrap');
} catch (e) {
    console.log(e)
}
var DDT = null;
var TT = null;
var Option1 = "";
var Option2 = null;
tableBody = document.getElementById("table-body");
table = document.getElementById("table");
tableHead = document.getElementById("table-head");
labelOpt1 = document.getElementById("SelectOption1");
labelOpt2 = document.getElementById("SelectOption2");

btnOpt11 = document.getElementById("Opt11");
btnOpt12 = document.getElementById("Opt12");
btnOpt13 = document.getElementById("Opt13");
btnOpt21 = document.getElementById("Opt21");
btnOpt22 = document.getElementById("Opt22");

labelDDT = document.getElementById("DDTLabel");
labelTT = document.getElementById("TTLabel");
btnMinimize= document.getElementById("Minimize");
btnEntries = document.getElementById("Entries");
btnNext= document.getElementById("next");
labelRunning  = document.getElementById("running");

(async () => {
    DDT = await ipcRenderer.invoke('getDDT');
    if (DDT != null) {
        labelDDT.classList.add("btn-success");
        labelDDT.classList.remove("btn-danger");
        labelDDT.innerHTML = '<font size="4"> <b> DDT Available </b><font>';
    }
})();
(async () => {
    TT = await ipcRenderer.invoke('getTT');
    if (TT != null) {
        labelTT.classList.add("btn-success");
        labelTT.classList.remove("btn-danger");
        labelTT.innerHTML = '<font size="4"> <b> TT Available </b><font>';
    }
})();

btnOpt11.addEventListener('click', function () {
    labelOpt1.innerHTML = '<font size="4"> <b> Fast </b><font>';
    Option1 = "-efast";
});
btnOpt12.addEventListener('click', function () {
    labelOpt1.innerHTML = '<font size="4"> <b> Pos </b><font>';
    Option1 = "-epos";
});
btnOpt13.addEventListener('click', function () {
    labelOpt1.innerHTML = '<font size="4"> <b> Strong </b><font>';
    Option1 = "-estrong";
});
btnOpt21.addEventListener('click', function () {
    labelOpt2.innerHTML = '<font size="4"> <b> Exact </b><font>';
    Option2 = "-Dexact";
});
btnOpt22.addEventListener('click', function () {
    labelOpt2.innerHTML = '<font size="4"> <b> Many </b><font>';
    Option2 = "-Dmany";
});

btnMinimize.addEventListener('click', function () {
    const execFile = require('child_process').execFile;
    var minout_string = null;
    labelRunning.classList.add("fa-spin");
    labelRunning.style.color = "green";
    // labelRunning.display = "block";
    //labellabelRunning.classList.remove("btn-danger");
    const child = execFile(path.join(__dirname,'espresso'), [Option1, path.join(require('os').homedir(),'TT.txt')], (err, minout_string, stderr) => {
    if (err) {
        throw err;
    }
    

    minout = minout_string.split("\n")
    
    if (minout[2][0]=="#"){
        minout.splice(2,1);
    }
    var in_size = parseInt(minout[0].split(" ")[1]);
    var out_size = parseInt(minout[1].split(" ")[1]);
    var total_LinInq = parseInt(minout[2].split(" ")[1]);

    var minTT = new Array(total_LinInq);
    var minout_split = null;
    // console.log(total_LinInq);
    for (var i = 0; i < total_LinInq; i++) {
        minTT[i] = new Array(in_size + out_size).fill(0);
        minout_split = minout[i+3].split(" ");
        for (var j = 0; j < minout_split[0].length; j++) {
            minTT[i][j] = minout_split[0][j]
        }
        minTT[i][j] = minout_split[1]
    }
    // console.log(minTT);
    (async () => {
        const result = await ipcRenderer.invoke('setminTT', minTT);
        // console.log(result);
    })();
    tableHead.innerHTML = '';
    var headrows = '<tr style="font-size:14px;padding:0px">';
    //console.log(DDT.length);
    for (var i = 0; i < in_size; i++) {
        headrows += ' <th style="width: 50px;position: sticky; top: -1px;background-color: #B8B8B8;" > x' + i.toString().sub() + '</th>';
    }
    headrows += ' <th style="width: 50px;position: sticky; top: -1px;background-color: #B8B8B8;" > f </th>';
    headrows += '</tr>'
    tableHead.insertAdjacentHTML('beforeend', headrows);
    var rows = '';
    tableBody.innerHTML = '';
    for (var i = 0; i < minTT.length; i++) {
        rows += '<tr style="font-size:14px;padding:0px">'
        for (var j = 0; j < minTT[i].length; j++) {  
            rows += '<td align="center" style="width: 30px;padding:2px 2px 2px 2px !important;margin:0px !important;">' + minTT[i][j] + '</td>';
        }
        rows += '</tr>'
    }
    tableBody.insertAdjacentHTML('beforeend', rows);
    table.style.display = "block";
    (async () => {
        btnEntries.style.display = "inline-block";
        btnEntries.classList.add("btn-success");
        btnEntries.classList.remove("btn-danger");
        btnEntries.innerHTML = '<font size="4"> <b> Entries: '+total_LinInq.toString()+'</b><font>';
        labelRunning.classList.remove("fa-spin");
        labelRunning.style.color = "red";
        labelRunning.display = "none";
    })();
    });
    
});

btnNext.addEventListener('click', function () {
    ipcRenderer.send('LinIneq');
});
