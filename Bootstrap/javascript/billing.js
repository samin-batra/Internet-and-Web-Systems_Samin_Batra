var checkList = [];
/*
function displayCategory()	{
	var string = ['one','electronics','books'];
	var div;
	for(var i=0;i<string.length;i++)	{
		div = document.getElementById(string[i]);
		div.style.display = "none";
	}
	console.log(window.location.hash);
	var category=window.location.hash.split("#")[1];
	console.log(category);
	div = document.getElementById(category);
	div.style.display="block";
}*/

var list_of_prices = {"Electronics":[1500,27000,6000,1000,10000,40000],
							"Books":[250,120,350,400,500,325],
							"Sports":[10000,1500,1200,50,600,400],
							"Home Decor":[15000,10000,5000,6000,6000,4000],
							"Footwear":[7000,4000,6500,6000,5000,4000]
						};

var checkout_items = [];
var number_of_items;
$(document).ready(function()	{
		var body=document.getElementsByTagName("body")[0];
	var form = document.getElementById("add_category");
	/*$('[data-toggle="popover"]').popover();
	$('[data-toggle="popover"]').on('show.bs.popover',function(obj)	{
		var parent = obj.target.parentNode;
		parent = parent.parentNode;
		parent = parent.parentNode;
		parent = parent.parentNode;
		var heading = parent.querySelector("h3");
		console.log(heading.innerHTML);
		console.log(parent);
		var price_links=parent.querySelectorAll(".prices");
		var price_links_arr=Array.prototype.slice.call(price_links);
		var ctr=0;
		var str = heading.innerHTML.trim(" ");
		console.log(str);
		console.log(list_of_prices);
		console.log(list_of_prices[str]);
		price_links_arr.map(
			function(price_links_node)	{
				price_links_node.setAttribute("data-content",list_of_prices[str][ctr++]);
			});
		
	});*/
	displayPopovers();
});

function displayPopovers()	{
	$('[data-toggle="popover"]').popover();
	$('[data-toggle="popover"]').on('show.bs.popover',function(obj)	{
		var parent = obj.target.parentNode;
		parent = parent.parentNode;
		parent = parent.parentNode;
		parent = parent.parentNode;
		var heading = parent.querySelector("h3");
		console.log(heading.innerHTML);
		console.log(parent);
		var price_links=parent.querySelectorAll(".prices");
		var price_links_arr=Array.prototype.slice.call(price_links);
		var ctr=0;
		var str = heading.innerHTML.trim(" ");
		console.log(str);
		console.log(list_of_prices);
		console.log(list_of_prices[str]);
		price_links_arr.map(
			function(price_links_node)	{
				price_links_node.setAttribute("data-content",list_of_prices[str][ctr++]);
			});
		
	});
}


function displayCategoryPopover()	{
	console.log("Inside the display category popover function");
	//$('[data-toggle="modal"]').on('show.bs.popover',function()	{
	var form = document.getElementById("add_category");
	var input_name = document.getElementById("ctg");
	input_name.value = "";
	var select_num = document.getElementById("no_of_items");
	select_num.value = "";
	var form_group = form.getElementsByClassName("form-group");
	//console.log(form_group[2]);
	console.log(form_group);
	for(var i=2;i<form_group.length;i++)	{
		console.log("i is ",i);
		console.log("Form-group element being deleted is ",form_group[i]);
		console.log(form_group[i]);
		form.removeChild(form_group[i]);
		console.log("Removed that element!");
	}
	console.log("Form group element that failed to be deleted was:",form_group[i]);
	console.log("Outside the loop, i is ",i);
	//var inputs = form_group.getElementsByTagName("input");
	//console.log(inputs);
	//});
}

function addToCart(obj)	{
	console.log("Add to cart");
	var sessionStorage=window.sessionStorage;
	var list_object = {};
	var thumbnail,parent;
	parent = thumbnail = obj.parentNode;
	parent = parent.parentNode;
	parent = parent.parentNode;
	parent = parent.parentNode;
	//var 
	var thumb = parent.querySelectorAll(".thumbnail");
	var ctr = 0;
	var ctr_1 = 0;
	var num_items;
	var h3 = parent.querySelector("h3");
	console.log(h3.innerHTML);
	var category_name = h3.innerHTML;
	category_name = category_name.trim(" ");
	console.log("Node to be compared is "+thumbnail);
	thumb_arr = Array.prototype.slice.call(thumb);
	var exists = false;
	var item_name;
	thumb_arr.map(function(thumb_arr_node)	{
		console.log(list_of_prices[category_name][ctr]);
		console.log(typeof thumb_arr_node);
		if(thumb_arr_node == thumbnail)	{
			item_name = thumbnail.querySelector("p").innerHTML.trim(" ");
			console.log("Lol");
			checkout_items.map(function(checkout_items_node)	{
					console.log(item_name in checkout_items_node);
					if(item_name in checkout_items_node)	{
						console.log("Key already exists");
						console.log("Element already exists bitch!");
						checkout_items[ctr_1][item_name][1] = checkout_items[ctr_1][item_name][1]+1;
					//break;
						exists = true;
						
				}
				ctr_1++;
			});
			if(!exists)	{
				var obj = {};
				obj[item_name] = [list_of_prices[category_name][ctr],1];
				checkout_items.push(obj);
				
			}
			console.log(checkout_items);
		}
		ctr++;
	});
}


function checkOut()	{
	console.log(checkout_items);
	var table,tr,th,td,tbody,thead;
	var checkout_modal = document.getElementById("checkout_modal");
	var modal_body = checkout_modal.querySelector(".modal-body");
	if(modal_body.firstChild)	{
		modal_body.removeChild(modal_body.firstChild);
	}
	table = document.createElement("table");
	table.setAttribute("class","table");
	thead = document.createElement("thead");
	tr = document.createElement("tr");
	th = document.createElement("th");
	th.innerHTML = "Serial Number";
	tr.appendChild(th);
	th = document.createElement("th");
	th.innerHTML = "Item Name";
	tr.appendChild(th);
	th = document.createElement("th");
	th.innerHTML = "Qty";
	tr.appendChild(th);
	th = document.createElement("th");
	th.innerHTML = "Price";
	tr.appendChild(th);
	thead.appendChild(tr);
	table.appendChild(thead);
	tbody = document.createElement("tbody");
	table.appendChild(tbody);
	var val;
	var total_price = 0;
	checkout_items.reduce(function(total,currentVal,current_index,array)	{
		var keys = Object.keys(currentVal);
		console.log("Current val is " + currentVal[keys[0]][0]);
		tr = document.createElement("tr");
		td = document.createElement("td");
		td.innerHTML = current_index+1;
		tr.appendChild(td);
		td = document.createElement("td");
		td.innerHTML = keys[0];
		tr.appendChild(td);
		td = document.createElement("td");
		td.innerHTML = currentVal[keys[0]][1];
		tr.appendChild(td);
		td = document.createElement("td");
		td.innerHTML = currentVal[keys[0]][0];
		tr.appendChild(td);
		tbody.appendChild(tr);
		current_index++;
		total = total+currentVal[keys[0]][0];
		total_price = total;
		return total;
	},0);
	console.log("Value is "+val);
	console.log("Outside the reduce function");
	console.log(total_price);
	tr = document.createElement("tr");
	td = document.createElement("td");
	td.innerHTML = "Total";
	tr.appendChild(td);
	td = document.createElement("td");
	td.innerHTML = "    ";
	tr.appendChild(td);
	td = document.createElement("td");
	td.innerHTML = total_price;
	tr.appendChild(td);
	tbody.appendChild(tr);
	modal_body.appendChild(table);
	
}

function addCategory()	{
	var modal = document.getElementById("category_modal");
	var cat_form = modal.querySelector("form");
	var input = cat_form.querySelector("input");
	var num = cat_form.querySelector("select");
	var prices=[];
	console.log(input.value);
	console.log(num.value);
	var i;
	var div = document.getElementById("one");
	var new_row = document.createElement("div");
	new_row.setAttribute("class","row");
	var a = document.createElement("a");
	a.setAttribute("href","#"+input.value);
	a.setAttribute("class","categories");
	var div_title = document.createElement("div");
	div_title.setAttribute("class","col-md-12");
	var heading = document.createElement("h3");
	heading.innerHTML = input.value;
	div_title.appendChild(heading);
	a.appendChild(div_title);
	new_row.appendChild(a);
	div.appendChild(new_row);
	var div_category = document.createElement("div");
	div_category.setAttribute("class","container");
	div_category.setAttribute("id",input.value);
	var h3 = document.createElement("h3");
	h3.innerHTML = input.value;
	h3.setAttribute("class","text-center");
	div_category.appendChild(h3);
	var div_row = document.createElement("div");
	div_row.setAttribute("class","row");
	var div_col;
	for(i=0;i<num.value;i++)	{
		div_col = document.createElement("div");
		div_col.setAttribute("class","col-md-4");
		var div_thumbnail = document.createElement("div");
		div_thumbnail.setAttribute("class","thumbnail");
		var a_prices = document.createElement("a");
		a_prices.setAttribute("class","prices");
		a_prices.setAttribute("href","#");
		a_prices.setAttribute("title","price");
		a_prices.setAttribute("data-toggle","popover");
		a_prices.setAttribute("data-placement","right");
		a_prices.setAttribute("data-content","");
		a_prices.setAttribute("data-trigger","hover");
		var img_category = document.createElement("img");
		img_category.setAttribute("class","img-responsive");
		img_category.setAttribute("src","images/placeholder.png");
		var div_caption = document.createElement("div");
		div_caption.setAttribute("class","caption");
		var p = document.createElement("p");
		var item_name = document.getElementById("item_"+(i+1)).value; 
		var price = 100;
		p.innerHTML = item_name;
		div_caption.appendChild(p);
		a_prices.appendChild(img_category);
		a_prices.appendChild(div_caption);
		var cart_button = document.createElement("button");
		cart_button.setAttribute("class","btn");
		cart_button.setAttribute("onclick","addToCart(this)");
		cart_button.innerHTML = "Add To Cart";
		div_thumbnail.appendChild(a_prices);
		div_thumbnail.appendChild(cart_button);
		div_col.appendChild(div_thumbnail);
		div_row.appendChild(div_col);
		prices.push(price);
	}
	div_category.appendChild(div_row);
	var body = document.getElementsByTagName("body")[0];
	body.appendChild(div_category);
	list_of_prices[input.value] = prices;
	displayPopovers();
	//var html = body.innerHTML;
	//body.innerHTML = body.innerHTML + "<div class=\"container\" id = \"" + input.value + "> <div class=\"row\"> <div class=\"col-md-6\"> </div> <div class=\"col-md-6\"> <button class=\"btn btn-primary pull-right\" onclick=\"checkOut()\">Check Out Bitch!</button></div></div><h3 class=\"text-center\">Sports</h3>";
	//body.innerHTML = "lol";
	return;
}

function showInputs(obj)	{
	console.log(obj.value);
	var form = document.getElementById("add_category");
	var num_items = parseInt(obj.value);
	console.log(num_items);
	var label,inp,div;
	for(var i=0;i<num_items;i++)	{
		console.log("Inside the loop");
		div = document.createElement("div");
		div.setAttribute("class","form-group");
		label = document.createElement("label");
		label.setAttribute("for","item_"+(i+1));
		label.innerHTML = "Item Number: "+(i+1);
		input = document.createElement("input");
		input.setAttribute("type","text");
		input.setAttribute("id","item_"+(i+1));
		input.setAttribute("class","form-control");
		div.appendChild(label);
		div.appendChild(input);
		form.appendChild(div);
	}
}

