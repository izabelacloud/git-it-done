var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username")

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

var getUserRepos = function(user) {
    //format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    //make request to the URL
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        })
    })

}



// getUserRepos();
userFormEl.addEventListener("submit", formSubmitHandler);

