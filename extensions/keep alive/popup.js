


//creating new tab with logout link
function gotolink( logoutURL) {
  chrome.tabs.create({url: logoutURL},function(){alert("kapil");});

}


//just for showing some alert
 function showalert() {
        alert("you just pressed the button");
 }
	
//extrackid from chrome storage only latest one will be extracted	
function getid(callback)
{ chrome.storage.sync.get('keepaliveID', function(id) {
     
          console.log('values retrieved');

 
          callback(id.keepaliveID);
        });}


//creating logout url using id
	function createLogoutURL(id)
{	var link="http://172.16.1.1:1000/logout?"+id;
	return link;
}
		
		//execute after loading
document.addEventListener('DOMContentLoaded', function() {
gotolink("http://172.16.1.1:1000/login?");
/*getid(function(id){
        if(id!="null"&&id!="undefined"&&id!=NaN)
	{var logoutURL=createLogoutURL(id);
	gotolink(logoutURL);
//	gotolink(logoutURL);
chrome.tabs.reload();
 chrome.storage.sync.set({'keepaliveID': "null"}, function() {
          // Notify that we saved.
          console.log('values saved');
        });
}

document.getElementById('status').textContent ="you are already logged out!";
});
*/
 

});



