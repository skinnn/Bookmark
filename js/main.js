// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save bookmark
function saveBookmark(e){
	// Get form values
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;
	var imageUrl = document.getElementById('imageUrl').value;

	if(!validateForm(siteName, siteUrl)){
		return false;
	}


	var bookmark = {
		name: siteName,
		url: siteUrl,
		image: imageUrl
	}


	/*
	//Local Storage Test
	localStorage.setItem('test', 'Hello World');
	console.log(localStorage.getItem('test'));
	localStorage.removeItem('test');
	console.log(localStorage.getItem('test'));
	*/

	//Test if bookmarks is null
	if(localStorage.getItem('bookmarks') === null){
		// Init array
		var bookmarks = [];
		// Add to array
		bookmarks.push(bookmark);
		// Set to LocalStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
		} else {
			// Get bookmarks from LocalStorage
			var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
			// Add bookmark to array
			bookmarks.push(bookmark);
			// Reset back to LocalStorage
			localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
		}

		// Clear form
		document.getElementById('myForm').reset();

		// Refetch bookmarks
		fetchBookmarks();

		// Prevent form from submitting
		e.preventDefault();
}

//Delete bookmark
function deleteBookmark(url){
	//Get bookmarks from LocalStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	//Loop through bookmarks
	for(var i = 0; i < bookmarks.length; i++){
		if(bookmarks[i].url == url){
			//Remove from array
			bookmarks.splice(i, 1);
		}
	}
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	// Refetch bookmarks
	fetchBookmarks();
}


//Fetch bookmarks
function fetchBookmarks(){
	//Get bookmarks from LocalStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	//Get output id
	var bookmarksResults = document.getElementById('bookmarksResults');

	//Build output
	bookmarksResults.innerHTML = '';
	for(var i = 0; i < bookmarks.length; i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;
		var image = bookmarks[i].image;

		bookmarksResults.innerHTML += '<div class="well siteBookmark">'+
										'<img class="siteThumbnail" src="'+image+'">'+
									  '<h3 class="thumbnailName">'+name+
									  ' <a class="btn btn-primary thumbnailBtn" target="_blank" href="'+url+'">Visit</a> ' +
									  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger thumbnailBtn" href="#">Delete</a> ' +
									  '</h3>'+
								  '</div>';
	}
}

// Validate Form
function validateForm(siteName, siteUrl){
	if(!siteName || !siteUrl){
		alert('Please fill in the form');
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteUrl.match(regex)){
		alert('Please use a valid URL');
		return false;
	}

	return true;
}
