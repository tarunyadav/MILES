const {ipcRenderer, remote} = require('electron');
var $ = require('jquery');
const si = require('systeminformation');

btnRefresh= document.getElementById("Refresh");
iconRefresh= document.getElementById("RefreshIcon");
tableBody = document.getElementById("table-body");

var SystemInformation = [];

async function SystemInfo(){
    SystemInformation = [];
    var cpu_data = await si.cpu();
    var time_data = await si.time();
    var system_data = await si.system();
    var memory_data = await si.mem();
    var osinfo_data = await si.osInfo();
    var users_data = await si.users();
    var disk_data = await si.fsSize();
    var network_data = await si.networkInterfaces();
    
    SystemInformation.push({class:"table-primary",property:"System Manufacturer",value:system_data.manufacturer})
    SystemInformation.push({class:"table-primary",property:"System Model",value:system_data.model})
    SystemInformation.push({class:"table-primary",property:"System Serial No.",value:system_data.serial})
    SystemInformation.push({class:"table-success",property:"OS Platform",value:osinfo_data.platform})
    SystemInformation.push({class:"table-success",property:"OS Distribution",value:osinfo_data.distro})
    SystemInformation.push({class:"table-success",property:"OS Release",value:osinfo_data.arch})
    //SystemInformation.push({class:"table-success",property:"OS Architecture",value:osinfo_data.distro})
    SystemInformation.push({class:"table-success",property:"OS Hostname",value:osinfo_data.hostname})
    SystemInformation.push({class:"table-success",property:"OS Serial No.",value:osinfo_data.serial})
    SystemInformation.push({class:"table-success",property:"OS Build",value:osinfo_data.build})
    //SystemInformation.push({class:"table-success",property:"OS Service Pack",value:osinfo_data.servicepack})
    SystemInformation.push({class:"table-info",property:"Total RAM",value:(memory_data.total/(1024*1024*1024)).toFixed(2)+" GB"})
    SystemInformation.push({class:"table-info",property:"Used RAM",value:(memory_data.used/(1024*1024*1024)).toFixed(2)+" GB"})
    SystemInformation.push({class:"table-info",property:"Free RAM",value:(memory_data.free/(1024*1024*1024)).toFixed(2)+" GB"})
    SystemInformation.push({class:"table-danger",property:"Total Disk Paritions",value:disk_data.length})
    
    for(var i=0;i < disk_data.length;i++){
        SystemInformation.push({class:"table-danger",property:"Disk: " + (i+1),value:disk_data[i].fs + " | Type: " + disk_data[i].type+ " | Total: " +(disk_data[i].size/(1024*1024*1024)).toFixed(2)+ "GB | Used: " +(disk_data[i].used/(1024*1024*1024)).toFixed(2)})
    }
    SystemInformation.push({class:"table-warning",property:"Total Active Users",value:users_data.length})
    for(var i=0;i < users_data.length;i++){
        SystemInformation.push({class:"table-warning",property:"User: " + (i+1),value:users_data[i].user})
    }
    SystemInformation.push({class:"table-secondary",property:"Total Network Interfaces",value:network_data.length})
    for(var i=0;i < network_data.length;i++){
        SystemInformation.push({class:"table-secondary",property:"Interface: " + (i+1),value:network_data[i].ifaceName + " | IPv4: " + network_data[i].ip4 +" | MAC: "+ network_data[i].mac +" | Status: "+ network_data[i].operstate})
    }
}


async function RefreshTable(){
    //iconRefresh.classList.remove('fa-refresh');
    iconRefresh.classList.add('fa-spin');
    
    await SystemInfo();
    iconRefresh.classList.remove('fa-spin');
    //iconRefresh.classList.add('fa-refresh');
    var rows='';
    tableBody.innerHTML='';
    //console.log(SystemInformation);
    for( var i = 0; i < SystemInformation.length; i++ )
    {
        //word-break: break-all;
        rows += '<tr class="'+SystemInformation[i].class +'"><td>'+SystemInformation[i].property+'</td><td>'+SystemInformation[i].value+'</td></tr>';  
    }
    tableBody.insertAdjacentHTML('beforeend',rows);
    //tableBody.innerHTML='';
    //console.log("Table Updated!");
    //table.style.display = "block";  
    // table.DataTable();
}

btnRefresh.addEventListener('click',function(){
    location.reload();
});

RefreshTable();