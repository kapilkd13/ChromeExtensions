//alert("running background page");

 var alarmName = 'BOconfirmoffline';
 
 if(navigator.onLine)
{}
else{
	
alert("offline hai");
 //openPage();
}

window.addEventListener('offline', function(e) { console.log("offline"); 
	alert("oninefrom on");
	createAlarm();
	

	//openPage(); 
	},false);
	
	/*
	window.addEventListener('online', function(e) { console.log("offline"); 
	alert("oninefrom on");
	openPage(); 
	},false);
	*/
/*
window.addEventListener('load', function(e) {
  if (navigator.onLine) {
  	alert("onlineload");
	
  } else {
 	alert("offline.oad");
	openPage(); 
  }
}, false);
*/

 
   function createAlarm() {
	  
     chrome.alarms.create(alarmName, {
       delayInMinutes:0.1});
   }
   
   
    function cancelAlarm() {
     chrome.alarms.clear(alarmName);
   } 
   
    
chrome.alarms.onAlarm.addListener(function( alarm ) {

 if(navigator.onLine)
{}
else{
	

 openPage();
}
cancelAlarm();
});



function gotolink( pageLink) {
  chrome.tabs.create({url: pageLink});

}

//function kapil
  function openPage() {

console.log("as");

//create a method that look for users preferances or some specific feed and pick data from there
//var links[]=userFavourite();


  gotolink("popup2.html");

}

 
//listener for receiving the message send by the magic script
chrome.runtime.onMessage.addListener(
  function(result,sender, sendResponse) {
 
    if (result== "offline")
      {	//alert(result);
		  
//	openPage(); 
	
	
	  }
});
  

/*
function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
 
    var url = tabs[0].url;

    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);

  });
  */

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, function(tabs) {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.












