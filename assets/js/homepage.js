var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
//added these variables below for the right hand side table to get the element id
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var languageButtonsEl = document.querySelector("[data-language]")




var buttonClickHandler = function (event) {
    var language = event.target.getAttribute("data-language");
    console.log(language);

    if (language) {
        getFeaturedRepos(language);
      
        // clear old content
        repoContainerEl.textContent = "";
      }

}

languageButtonsEl.addEventListener("click", buttonClickHandler);


//this function passes the username to the function so that we can filter the results
var formSubmitHandler = function(event) {
    event.preventDefault();
    var username = nameInputEl.value.trim();

    if (username) {
        //to get the repos with username
        getUserRepos(username);
        //to clear the input form field after submit
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username")
    }
    console.log(event);
}

//this function gets the response from the API
var getUserRepos = function(user) {
    //format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    //make request to the URL
    fetch(apiUrl).then(function(response) {
        //add if else condition for ERROR HANDLING
        //if request was successful 
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                //this was added to convert the response data to JSON, it will be sent from getUserRepos() to displayRepos()
                displayRepos(data, user)
            })

        } else {
            alert("Error: " + response.statusText);
        }
    })

    //this is getting chained in the end of the THEN METHOD
    .catch(function(error) {
        alert("Unable to connect to GitHub")
    })

}



//this function will display the repos
var displayRepos = function(repos, searchTerm) {
    console.log(repos);
    console.log(searchTerm);


    //adding if else condition to check if the user has any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found."
    }

    //clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;



    // loop over repos
    for (var i = 0; i < repos.length; i++) {
        // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;
        console.log(repoName);
    
        // create a container for each repo (changed from div to a)
        //THIS WILL NAVIGATE TO THE NEW HTML FILE


        // create a link for each repo
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);
        // repoEl.setAttribute("href", "./single-repo.html");
    
        // create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;
    
        // append to container
        repoEl.appendChild(titleEl);

        


        //create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        //check if the current repo has issues or not and if it has issues display the number of issues and add a red X icon next to it
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";

        } 
        //If there are no issues, we'll display a blue check mark instead. Icons are from FONT AWESOME
        else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>"
        }
        //append this tu the container
        repoEl.appendChild(statusEl);




    
        // append container to the dom
        repoContainerEl.appendChild(repoEl);
    }
}



//get featured repos
var getFeaturedRepos = function(language) {
    var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";

    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                displayRepos(data.items, language)
            })
            console.log(response);
        } else {
            alert("Error: " + response.statusText)
        }
    })
}


// getUserRepos();
userFormEl.addEventListener("submit", formSubmitHandler);


