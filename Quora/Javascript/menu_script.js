function displayNotification()	{
			document.getElementById("profile").style.display="none";
			var elem = document.getElementById("notification");
			console.log(window.getComputedStyle(elem,null).getPropertyValue("display"));
			console.log(elem.style.display);
			//document.getElementById("notification").style.display="block";
			elem.style.display = window.getComputedStyle(elem,null).getPropertyValue("display")||elem.style.display == "none" ? "block" : "none";
			/*if(window.getComputedStyle(elem,null).getPropertyValue("display")=="none")	{
				console.log("Displaying tab");
				elem.style.display="block";
			}
			else {
				console.log("Hiding it now");
				elem.style.display="none";
			}*/
			return false;
		}

function displayProfile()	{
	document.getElementById("notification").style.display="none";
	console.log("Display notification function got called");
	var elem = document.getElementById("profile");
	console.log(window.getComputedStyle(elem,null).getPropertyValue("display"));
	//document.getElementById("notification").style.display="block";
	
	if(window.getComputedStyle(elem,null).getPropertyValue("display")=="none")	{
		console.log("Displaying tab");
		elem.style.display="block";
	}
	else {
		console.log("Hiding it now");
		elem.style.display="none";
	}
}

function hideAll()	{
	document.getElementById("notification").style.display="none";
	document.getElementById("profile").style.display="none";
}