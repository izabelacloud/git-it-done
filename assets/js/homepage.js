var getUserRepos = function(user) {
    //format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    //make request to the URL
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        })
    })
    // console.log("function was called");
    // fetch("https://api.github.com/users/octocat/repos").then(function(response) {
    //     response.json().then(function(data) {
    //         console.log(data);
    //     })
    //     console.log("inside", response);
    // })

    // console.log("outside");

    // var response = fetch("https://api.github.com/users/octocat/repos");
    // console.log(response);
}

getUserRepos("izabelacloud");