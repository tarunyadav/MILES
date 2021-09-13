const {ipcRenderer,remote} = require('electron');

btnMinimize = document.getElementById("minimizeBtn");
btnMaximize = document.getElementById("maximizeBtn");
btnClose = document.getElementById("closeBtn");


btnMinimize.addEventListener('click',function(){
    ipcRenderer.send('minimize')
    
})

btnMaximize.addEventListener('click',function(){
    ipcRenderer.send('maximize')
})

btnClose.addEventListener('click',function(){
    ipcRenderer.send('close')
})

function initializePages(){
    MainPane.insertAdjacentHTML('beforeend','<object id="SboxToDDTHTML" width="100%" height="98%" type="text/html" data="SboxToDDT.html" style="display:none"></object>');
    MainPane.insertAdjacentHTML('beforeend','<object id="DDTToTTHTML" width="100%" height="98%" type="text/html" data="ScanHistory.html" style="display:none"></object>');
    MainPane.insertAdjacentHTML('beforeend','<object id="TTminimizeHTML" width="100%" height="98%" type="text/html" data="TTminimize.html" style="display:none"></object>');
    MainPane.insertAdjacentHTML('beforeend','<object id="LinIneqHTML" width="100%" height="98%" type="text/html" data="LinIneq.html" style="display:none"></object>');
    MainPane.insertAdjacentHTML('beforeend','<object id="SystemInformationHTML" width="100%" height="98%" type="text/html" data="SystemInformation.html"style="display:none" ></object>');
    MainPane.insertAdjacentHTML('beforeend','<object id="AuthorsHTML" width="100%" height="98%" type="text/html" data="Authors.html" style="display:none"></object>');
    MainPane.insertAdjacentHTML('beforeend','<object id="HelpHTML" width="100%" height="98%" type="text/html" data="Help.html" style="display:none"></object>');
    MainPane.insertAdjacentHTML('beforeend','<object id="AboutHTML" width="100%" height="98%" type="text/html" data="About.html" style="display:none"></object>');
}
initializePages();


SboxToDDT = document.getElementById("SboxToDDT");
DDTToTT = document.getElementById("DDTToTT");
TTminimize = document.getElementById("TTminimize");
LinIneq = document.getElementById("LinIneq");
SystemInformation = document.getElementById("SystemInformation");
Authors = document.getElementById("Authors");
Help = document.getElementById("Help");
About = document.getElementById("About");
MainPane = document.getElementById("MainPane");
SideMenu = document.getElementsByClassName("nav-group-item")

SboxToDDTHTML = document.getElementById("SboxToDDTHTML");
DDTToTTHTML = document.getElementById("DDTToTTHTML");
TTminimizeHTML = document.getElementById("TTminimizeHTML");
LinIneqHTML = document.getElementById("LinIneqHTML");
SystemInformationHTML = document.getElementById("SystemInformationHTML");
AuthorsHTML = document.getElementById("AuthorsHTML");
HelpHTML = document.getElementById("HelpHTML");
AboutHTML = document.getElementById("AboutHTML");

var HTMLArray = [SboxToDDTHTML, DDTToTTHTML, TTminimizeHTML, LinIneqHTML, SystemInformationHTML, AuthorsHTML, HelpHTML, AboutHTML]
function LoadPage(page){
    var hidden = [];
    if(page=='SboxToDDT'){
        HTMLArray[0].style.display = "block";
        hidden = [1,2,3,4,5,6,7]
        for(var i=0;i<hidden.length;i++){
            HTMLArray[hidden[i]].style.display = "none";
        }
    }
    
    else if(page=='SboxToDDTRefresh'){
        HTMLArray[0].style.display = "block";
        HTMLArray[0].data = "SboxToDDT.html";
        hidden = [1,2,3,4,5,6,7]
        for(var i=0;i<hidden.length;i++){
            HTMLArray[hidden[i]].style.display = "none";
        }
    }
    else if(page=='DDTToTT'){
        HTMLArray[1].style.display = "block";
        HTMLArray[1].data = "DDTToTT.html";
        hidden = [0,2,3,4,5,6,7]
        for(var i=0;i<hidden.length;i++){
            HTMLArray[hidden[i]].style.display = "none";
        }
    }
    else if(page=='TTminimize'){
        HTMLArray[2].style.display = "block";
        HTMLArray[2].data = "TTminimize.html";
        hidden = [0,1,3,4,5,6,7]
        for(var i=0;i<hidden.length;i++){
            HTMLArray[hidden[i]].style.display = "none";
        }
    }
    else if(page=='LinIneq'){
        HTMLArray[3].style.display = "block";
        HTMLArray[3].data = "LinIneq.html";
        hidden = [0,1,2,4,5,6,7]
        for(var i=0;i<hidden.length;i++){
            HTMLArray[hidden[i]].style.display = "none";
        }
    }
    else if(page=='SystemInformation'){
        HTMLArray[4].style.display = "block";
        hidden = [0,1,2,3,5,6,7]
        for(var i=0;i<hidden.length;i++){
            HTMLArray[hidden[i]].style.display = "none";
        }
    }
    else if(page=='Authors'){
        HTMLArray[5].style.display = "block";
        HTMLArray[5].data = "Authors.html";
        hidden = [0,1,2,3,4,6,7]
        for(var i=0;i<hidden.length;i++){
            HTMLArray[hidden[i]].style.display = "none";
        }
    }
    else if(page=='Help'){
        HTMLArray[6].style.display = "block";
        hidden = [0,1,2,3,4,5,7]
        for(var i=0;i<hidden.length;i++){
            HTMLArray[hidden[i]].style.display = "none";
        }
    }
    else if(page=='About'){
        HTMLArray[7].style.display = "block";
        HTMLArray[7].data = "About.html";
        hidden = [0,1,2,3,4,5,6]
        for(var i=0;i<hidden.length;i++){
            HTMLArray[hidden[i]].style.display = "none";
        }
    }

}
LoadPage('SboxToDDT');
SboxToDDT.addEventListener('click', function(){
    LoadPage('SboxToDDT');

})

DDTToTT.addEventListener('click', function(){
    LoadPage('DDTToTT');
})

TTminimize.addEventListener('click', function(){
    LoadPage('TTminimize');
})

LinIneq.addEventListener('click', function(){
    LoadPage('LinIneq');
})

SystemInformation.addEventListener('click', function(){
    LoadPage('SystemInformation');
})

Authors.addEventListener('click', function(){
    LoadPage('Authors');
})

Help.addEventListener('click', function(){
    LoadPage('Help');
})

About.addEventListener('click', function(){
    LoadPage('About');
})
for (var i = 0; i < SideMenu.length; i++) {
    SideMenu[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    });
  }
ipcRenderer.on("SboxToDDT",(event)=>{
    SboxToDDT.click();
})

ipcRenderer.on("SboxToDDTRefresh",(event)=>{
    LoadPage('SboxToDDTRefresh');
})

ipcRenderer.on("DDTToTT",(event)=>{
    DDTToTT.click();
})
ipcRenderer.on("TTminimize",(event)=>{
    TTminimize.click();
})
ipcRenderer.on("LinIneq",(event)=>{
    LinIneq.click();
})


