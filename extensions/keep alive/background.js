console.log("running background page");


//alert("dsf");

  var alarmName = 'keepalivetimer';
//var refreshurl="";
  function checkAlarm(callback) {
     chrome.alarms.getAll(function(alarms) {
       var hasAlarm = alarms.some(function(a) {
         return a.name == alarmName;
       });
     
       if (callback) callback(hasAlarm);
     })
   }
   
   
   function createAlarm() {
     chrome.alarms.create(alarmName, {
       delayInMinutes:60 periodInMinutes: 60});
   }
   
   
   function cancelAlarm() {
     chrome.alarms.clear(alarmName);
   } 
   
   
chrome.alarms.onAlarm.addListener(function( alarm ) {
 //alert("aaa");
 
 getLinkToRefresh();

});


function gotorefreshlink( refreshURL) {
 chrome.windows.create({ url: refreshURL }, function(win) {
        chrome.windows.update(win.id, { focused: false });
    });
}



//listener for receiving the message send by the magic script
chrome.runtime.onMessage.addListener(
  function(result,sender, sendResponse) {
 
    if (result== "startit")
      {	//alert(result);
	kapil(); 
	
	checkAlarm(function(hasalarm){
		
		if(hasalarm){
		cancelAlarm();
		}
			createAlarm();
			});
	  }
});
  
function gotolink( logoutURL) {
  chrome.tabs.create({url: logoutURL},function(){alert("kapil");});

}


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

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, function(tabs) {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}



function getScrapedId(url)
{
	var substring=url.split('?');
	
	return substring[1];
	}
	
		
//extrackid from chrome storage only latest one will be extracted	
function getid(callback)
{ chrome.storage.sync.get('keepaliveID', function(id) {
     
          console.log('values retrieved');

 
          callback(id.keepaliveID);
        });}
        
        //creating refreshing url using id
	function createRefreshURL(id)
{	var link="http://172.16.1.1:1000/keepalive?"+id;
	return link;
}

	function getLinkToRefresh()
	{
		getid(function(id)
		{
			var link=createRefreshURL(id);
			//alert(link);
			gotorefreshlink(link);
			//calledback(link);
			});
	
		}


//to scrap id from link and save
function scrapLinkAndSave(url)
{
var id=getScrapedId(url);
	
	   chrome.storage.sync.set({'keepaliveID': id}, function() {
          // Notify that we saved.
          console.log('values saved');
        });
	
	}
	
	
	//to separate and act accordingly
function separateURLandAct(url)
{//alert(url);
var substring=url.split('?');
	var semisubstring= substring[0].split('/');
if(semisubstring[3]=='logout')
{
chrome.tabs.reload();
}
else if(semisubstring[3]=='keepalive')
{
scrapLinkAndSave(url);
	
}}


//function kapil
  function kapil() {

console.log("as");

  getCurrentTabUrl(function(url) {
separateURLandAct(url);
//document.getElementById('status').textContent =url;

});


}




  function reload() {

console.log("reloading");

  getCurrentTabUrl(function(url) {

//document.getElementById('status').textContent =url;
reloadURL(url);
});


}

