function validate(){
			var username = document.getElementById("uname");
			
			console.log(username.value);

			if (username.value != 'tomas'){
					alert('Wrong username');
				return false;
			 }

			else{
				sessionStorage.setItem('name', username.value);
				return	true;
				}

}

function regvalidate (){
	var reguname = document.getElementById("resuname");
	console.log(reguname.value);

			if (reguname.value != 'tomas'){
					alert('Wrong username');
				return false;
			 }

			else{

				return	true;
				}
}

function SessionStorageClear (){
	sessionStorage.clear();
}

function ready(){
	 var addToCartButtons = document.getElementsByClassName ('store-item-button');
	 for (var i=0;i<addToCartButtons.length;i++){
	 	addToCartButtons[i].addEventListener('click', addToCartClicked);
	 }
	 var imageLink = document.getElementsByClassName('store-item-image');

	 for( var i=0 ; i<imageLink.length; i++){
	 	imageLink[i].addEventListener('click', showDesc);
	 }

	 var MOVIELIST = JSON.parse(sessionStorage.getItem('movieList'));

	 var SPIN = document.getElementsByClassName('cart-item-quantity-spinner')[0];

	 var ITEM = document.getElementsByClassName('store-item');

	 for(var i=0;i<MOVIELIST.length;i++){
	 	var TITLE = MOVIELIST[i].title;
	 	var PRICE = MOVIELIST[i].price;
	 	var IMAGE = MOVIELIST[i].image;
	 	var QUAN = MOVIELIST[i].quan;
	 	addItemToCartItems(TITLE, PRICE, IMAGE);


	 	document.getElementsByClassName('cart-item-quantity-spinner')[i].value = QUAN;

	 	if (MOVIELIST != null){
	 	for (var a=0;a<MOVIELIST.length;a++){

	 		for (var q=0;q<ITEM.length;q++){
	 			var Mtitle = ITEM[q].getElementsByClassName('store-item-title')[0].innerHTML;
	 			var button = ITEM[q].getElementsByClassName('store-item-button')[0];
	 			var image = ITEM[q].getElementsByClassName('store-item-image')[0];
	 			//document.getElementsByClassName('cart-item-quantity-spinner')[i].value = storeList[i].quantity;
	 			
	 			if (MOVIELIST[a].title==Mtitle){
	 				image.style.opacity = '0.5';
	 				button.disabled = true;
	 			}
	 		}
	 	}
	 }
	 }

	


	//  var storeItem = button.parentElement.parentElement;
	//  for(){
	//  }
	// var title = storeItem.getElementsByClassName('store-item-title')[0].innerHTML;
	// var price = storeItem.getElementsByClassName('store-item-price')[0].innerHTML;
	// var imgSrc = storeItem.getElementsByClassName('store-item-image')[0].src;
	// addItemToCartItems(title, price, imgSrc);
	// updateTotalPrice ();


}

function SPIN (){
	var MOVIELIST = JSON.parse(sessionStorage.getItem('movieList'));
	var SPIN = document.getElementsByClassName('cart-item-quantity-spinner')[0];
}


function showDesc (event){
	var imageLink = event.target;
	var storeItem = imageLink.parentElement;
	console.log(storeItem.innerHTML);
	var title = storeItem.getElementsByClassName('store-item-title')[0].innerHTML;
	var desc = storeItem.getElementsByClassName('store-item-desc')[0].innerHTML;

	console.log(title);
	console.log(desc);

	// assignment

	document.getElementsByClassName('movie-title')[0].innerHTML = title;

	document.getElementsByClassName('movie-desc')[0].innerHTML = desc;
}

function addToCartClicked (){
	alert("Successfully added to cart!");
}

function addToCartClicked (event){
	// alert("ADD");
	var button = event.target;
	var storeItem = button.parentElement.parentElement;
	var title = storeItem.getElementsByClassName('store-item-title')[0].innerHTML;
	var price = storeItem.getElementsByClassName('store-item-price')[0].innerHTML;
	var imgSrc = storeItem.getElementsByClassName('store-item-image')[0].src;
	var image = storeItem.getElementsByClassName('store-item-image')[0];

	image.style.opacity = '0.5';
	button.disabled = true;

	console.log (title);
	console.log (price);
	console.log (imgSrc);

	// 
	// 

	addItemToCartItems(title, price, imgSrc);
	updateTotalPrice ();
}

function addItemToCartItems(title, price, imgSrc){
	// Get the Parent of all cart items
	var cartItems = document.getElementsByClassName('cart-items')[0];
	//Check if item is already existing to the cart items
	var cartItemsTitles = cartItems.getElementsByClassName('cart-item-title');
	for (var i=0;i<cartItemsTitles.length; i++){
		if (cartItemsTitles[i].innerHTML == title) {


			alert("This item aleady exist.");
			return;


		}

	}
	alert("Item is added!");
	// Create new element
	var cartItem = document.createElement('div');
	cartItem.classList.add('cart-item');
	cartItem.classList.add('row');

	var cartItemContent = `<div class="col">

				<input id="item" type="checkbox" name="" class="select-store-item">
				<img class="cart-item-image"  src="${imgSrc}">
				<span class="cart-item-title">${title}</span>
			</div>

			<div class="col">
				<span class="cart-item-price">${price}</span>
				<span class="cart-item-price-base">${price}</span>
			</div>

			<div class="col">
				<input class="cart-item-quantity-spinner" type="number" name="" value="1">
				<button class="btn btn-danger">REMOVE</button>
				<br>
			</div>`;
			cartItem.innerHTML = cartItemContent;

			cartItem.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
			cartItem.getElementsByClassName('btn-danger')[0].addEventListener('click', enabledagain);



			cartItem.getElementsByClassName('cart-item-quantity-spinner')[0].addEventListener('change', quantityChanged);

	//Add To Parent
	cartItems.append(cartItem);
}

function removeCartItem(event){
	var button = event.target;
	button.parentElement.parentElement.remove();
	updateTotalPrice ();
}

function quantityChanged (event){
	var input = event.target;
	console.log(input.value);

	// input.value * price??


	// var price = parseInt(input.parentElement.parentElement.getElementsByClassName('cart-item-price')[0].innerHTML.replace('Php', ''));
	// console.log(input.value*price);

	var cartItem = input.parentElement.parentElement;
	var priceElement = cartItem.getElementsByClassName('cart-item-price-base')[0];
	var price = parseFloat(priceElement.innerHTML.replace('Php', ''));

	console.log(input.value * price);
	cartItem.getElementsByClassName('cart-item-price')[0].innerHTML = 'Php' + (input.value * price);
	updateTotalPrice();
}

function updateTotalPrice (){

	//Get Parent of All cart-item == cart-items
		var cartItems = document.getElementsByClassName('cart-items')[0];
	//Get all the cart-item from the cart-items
		var cartItemsList = cartItems.getElementsByClassName('cart-item');
	//Loop thru the array if cart-item to get the price and quantity
		var total=0;
		for (var i=0;i<cartItemsList.length; i++){
			var priceElement =cartItemsList[i].getElementsByClassName('cart-item-price')[0];
			// var quantityElement = cartItemsList[i].getElementsByClassName('cart-item-quantity-spinner')[0];
		
			// price * quantity
			//total +=  price * quantity
			var price = parseFloat(priceElement.innerHTML.replace('Php', ''));
			total += price;
		}
			console.log(total);
			total = Math.round(total *100)/100;

			sessionStorage.setItem("TotalItems", JSON.stringify(total));

			document.getElementsByClassName('cart-total-price')[0].innerHTML = 'Php ' + total;
}


//Script for the Checkboxes
		function CheckboxFunction(){

			
			//Get the select-all checkbox

			var parentCheckbox = document.getElementById('select-all');

			//Get all the select-store-item class
			var checkboxes = document.getElementsByClassName('select-store-item');

			//Loop thru all the checkboxes (select-store-item class) and markit to whatever is the value of the parent
			for (var i =0 ; i<checkboxes.length; i++){
				checkboxes[i].checked = parentCheckbox.checked;
			}

		}

		function RemoveSelectedCheckbox() {
			var confirmation = confirm("Are you sure?");

			if (confirmation){
				//Get all the checkboxes that has select-store-item class

				var checkboxes = document.getElementsByClassName('select-store-item');
				var image = document.getElementsByClassName('store-item-image');
				var button = document.getElementsByClassName('btn btn-primary store-item-button');
				//From all the checkbox, get only those marked as checked and store it in a variable
				var checkedHolder = [0];
				var counter =0;
				for (var i=0 ;i<checkboxes.length; i++){
					if(checkboxes[i].checked){
						checkedHolder[counter] = checkboxes[i].parentElement.parentElement;
						image[i].style.opacity = '1';
						button[i].disabled = false;
						counter++;
					}
				}
				//Using the variable created, use remove function
				for (var i=0 ; i<checkedHolder.length;i++){
					checkedHolder[i].remove();
				}

				//Reset select-all checkbox
				document.getElementById('select-all').checked=false;
			}
			updateTotalPrice ();
		}

		function SubmitFunction(){
			alert('Submitted');
			document.getElementById('form').submit();
		}




function PurchaseFunction(){

	//Get the Parent that holds all the cart items (cart-items)
		var cartItems = document.getElementsByClassName('cart-items')[0];
	//Get all cart item inside the parent (cart-items)
		var cartItemList = cartItems.getElementsByClassName('cart-item');

	//Get image?
		var movieImage = cartItems.getElementsByClassName('store-item-image'); 

		//Create an array
		var movieList = [];
		
	for (var i=0; i<cartItemList.length; i++){
		var title = cartItemList[i].getElementsByClassName('cart-item-title')[0].innerHTML;

		var price = cartItemList[i].getElementsByClassName('cart-item-price')[0].innerHTML;

		var image = cartItemList[i].getElementsByClassName('cart-item-image')[0].src;

		var quan = cartItemList[i].getElementsByClassName('cart-item-quantity-spinner')[0].value;

		movieList[i] = {quan:quan, title : title, price : price, image: image}

	}
		
	var totquan =0;

	for (var i=0; i<cartItemList.length; i++){
		totquan += parseInt(cartItemList[i].getElementsByClassName('cart-item-quantity-spinner')[0].value);
	}

	sessionStorage.setItem("totquan", totquan);

	console.log(movieList);


	sessionStorage.setItem("movieList", JSON.stringify(movieList));


	// var TotalItems = document.getElementsByClassName('cart-total-price').innerHTML;
	// sessionStorage.setItem("TotalItems", JSON.stringify(TotalItems.innerHTML));

	window.location.href = "orderformpage.html";
}

function onLoadItemsRedirectPage (){
	var movieList = JSON.parse(sessionStorage.getItem('movieList'));

	var movieParent = document.getElementsByClassName('items-purchased')[0];

	for (var i=0;i < movieList.length;i++){
		var movieDisplay = document.createElement('div');
		movieDisplay.classList.add('movie');
		movieDisplay.classList.add('row');

		var movieContent = 
		`
			&nbsp;&nbsp;&nbsp;&nbsp;			
			<div class="col">${movieList[i].quan}</div>
			<div class="col">
				<img class="cart-item-image"  src="${movieList[i].image}">
			</div>
			<br>
			<div class="col">
				<div class="movie-title">${movieList[i].title}</div>
			</div>
			<br>
			<br>
			<br>
			<div class="col">
				<div class="movie-price">${movieList[i].price}</div>
			</div>
			<br>
			&nbsp;&nbsp;&nbsp;&nbsp;	
		`;

		movieDisplay.innerHTML = movieContent;
		movieParent.append(movieDisplay);
	}

	var TotalQuan = parseInt(sessionStorage.getItem('totquan'));

	document.getElementById('total-items-holder').innerHTML = TotalQuan; 

	

	var TotalItems = parseInt(sessionStorage.getItem('TotalItems'));

	document.getElementById('total-holder').innerHTML = "Php" + TotalItems;	

}


function NameandAddress (){

	var FName = document.getElementById('fname').value;

	var LName = document.getElementById('lname').value;

	var Address = document.getElementById('add').value;

	sessionStorage.setItem("FirstName", FName);

	sessionStorage.setItem("LastName", LName);

	sessionStorage.setItem("Address", Address);
}


function LoadNameandAddress (){

	var FName = sessionStorage.getItem("FirstName");
	var LName = sessionStorage.getItem("LastName");
	var Add = sessionStorage.getItem("Address");

	document.getElementById('Name_holder').innerHTML = FName + " " +  LName;
	document.getElementById('Address_holder').innerHTML = Add;
}

function enabledagain (event){
	var button = event.target;
	var holder = button.parentElement.parentElement;

	var cartTitle = holder.getElementsByClassName('cart-item-title')[0].innerHTML;

	var storeList = document.getElementsByClassName('store-item');

	for (var i=0;i<storeList.length;i++){
		var StoreTitle = storeList[i].getElementsByClassName('store-item-title')[0].innerHTML;
		var StoreButton = storeList[i].getElementsByClassName('store-item-button')[0];
		var StoreImg = storeList[i].getElementsByClassName('store-item-image')[0];

		if (cartTitle == StoreTitle){
			StoreImg.style.opacity = '1';
			StoreButton.disabled = false;
		}
	}
}

function ItemsRedirectPage(){
	var movieList = JSON.parse(sessionStorage.getItem('movieList'));

	var movieParent = document.getElementsByClassName('items-purchased')[0];


	for (var i=0;i < movieList.length;i++){
		var movieDisplay = document.createElement('div');
		movieDisplay.classList.add('movie');
		movieDisplay.classList.add('row');

		var movieContent = 
		`
			&nbsp;&nbsp;&nbsp;&nbsp;			
			<div class="col">${movieList[i].quan}</div>
			<br>
			<br>
			<div class="col">
				<div class="movie-title">${movieList[i].title}</div>
			</div>
			<br>
			<br>
			<br>
			<div class="col">
				<div class="movie-price">${movieList[i].price}</div>
			</div>
			<br>
			&nbsp;&nbsp;&nbsp;&nbsp;	
		`;

		movieDisplay.innerHTML = movieContent;
		movieParent.append(movieDisplay);}


	var TotalQuan = parseInt(sessionStorage.getItem('totquan'));

	document.getElementById('total-items-holder').innerHTML = TotalQuan; 

	

	var TotalItems = parseInt(sessionStorage.getItem('TotalItems'));

	var Shipping  =parseInt(sessionStorage.getItem('Shipping'));

	var TOTAL = parseInt(Shipping+TotalItems);

	document.getElementById('total-holder').innerHTML = "Php" + " "+ TOTAL;

}

function SameAsUser (){
	var checkbox = document.getElementById('same');

	if (same.checked){
	document.getElementById('fname').value = "Lyndon Ellison";
	document.getElementById('lname').value = "Tomas";
	document.getElementById('add').value = "Blk. 9, Lt. 1, Corazon cr. Sheff St., Brgy. Sto. Nino, Marikina City";
	}
	else{
		document.getElementById('fname').value = "";
	document.getElementById('lname').value = "";
	document.getElementById('add').value = "";
	}
	
}

function LogOut (){
	var confirmation =confirm('Do you want to logout?');
	var LOGout = document.getElementById('LOGOUT');
	if (confirmation){
		LOGout.href = "landingpage (2-12-2020).html";
	}
}

function DisableEnableChecker (){
	var movieList = document.getElementsByClassName('cart-items')[0];

	var cartItemsTitles = movieList.getElementsByClassName('cart-item-title');
	
	var checkbox = document.getElementById('item');

	var CHECKOUT = document.getElementById('CHECKOUT');



	var counter =0;

	for (var i=0;i<cartItemsTitles.length;i++){
		counter++;
	}

	if (counter!=0){
		CHECKOUT.disabled = false;
	}
	else if (counter==0){
		CHECKOUT.disabled = true;
	}
	
}

function BackToCart (){
}

function Add (){
	
	var Value = parseInt(document.getElementById('location').value);

	
	
	sessionStorage.setItem("Shipping", Value);

}