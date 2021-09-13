const {ipcRenderer, remote} = require('electron');
const { execFile,exec,execSync} = require('child_process');
var path = require('path');
const fs = require('fs');
try {
    window.$ = window.jQuery = require('jquery');
    window.Popper = require('popper.js').default;
    require('bootstrap');
    require('./js/bootstrap-toggle.min.js');
} catch (e) {
    console.log(e)
}

labelDDT = document.getElementById("DDTLabel");
labelTT = document.getElementById("TTLabel");
labelminTT = document.getElementById("minTTLabel"); 
btnGenerate= document.getElementById("GenerateInq");
tableBody = document.getElementById("table-body");
table = document.getElementById("table");
tableHead = document.getElementById("table-head");


var DDT = null;
var TT = null;
var minTT = null;
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

(async () => {
    minTT = await ipcRenderer.invoke('getminTT');
    if (minTT != null) {
        labelminTT.classList.add("btn-success");
        labelminTT.classList.remove("btn-danger");
        labelminTT.innerHTML = '<font size="4"> <b> Minimized TT Available </b><font>';
    }
})();

btnGenerate.addEventListener('click', function () {

    tableHead.innerHTML = '';
    var headrows = '<tr style="font-size:14px;padding:0px">';
    headrows += ' <th style="width: 5px;position: sticky; top: -1px;background-color: #B8B8B8;" > # </th>';
    headrows += ' <th style="width: 50px;position: sticky; top: -1px;background-color: #B8B8B8;" >  Linear Inequalities </th>';
    headrows += '</tr>'
    tableHead.insertAdjacentHTML('beforeend', headrows);
    var rows = '';
    tableBody.innerHTML = '';
    var ineq = "";
    var con = 0;
    for (var i = 0; i < minTT.length; i++) {
        ineq = ""
        con = 0
        for (var j = 0; j < minTT[i].length; j++) {  
            if(minTT[i][j]==0){
                if(j!=0){
                    ineq += " + ";
                }
                ineq += "x"+j.toString().sub();
            }
            else if(minTT[i][j]==1){
                ineq += "- x"+j.toString().sub();
                con += 1;
            }
            
        }
        ineq += " + " + (con-1).toString() + " >=0";
        rows += '<tr style="font-size:14px;padding:0px">';
        rows += '<td align="center" style="width: 5px;padding:1px 1px 1px 1px !important;margin:0px !important;"> <b>' + (i+1).toString() + ' </b> </td>';
        rows += '<td align="center" style="width: 30px;padding:2px 2px 2px 2px !important;margin:0px !important;">' + ineq + '</td>';
        rows += '</tr>'
    }
    tableBody.insertAdjacentHTML('beforeend', rows);
    table.style.display = "block";
});



