var issueContainerEl = document.querySelector("#issues-container");
// console.log(issueContainerEl);
var limitWarningEl = document.querySelector("#limit-warning");
// console.log(limitWarningEl);
// var issues = 0;


//adding new function
// var getRepoName = function() {
// var queryString = document.location.search;
// var repoName = queryString.split("=")[1];
// console.log(repoName);

// }


var getRepoIssues = function(repo) {
    console.log(repo);

    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function(response) {
        //if request was successful
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);

                //check if API has paginated issues
                if (response.headers.get(displayWarning(repo))) {
                console.log("Repo has more than 30 issues")

                }
                //call displayIssues method
                displayIssues(data);
                console.log(displayIssues);
            })
        }
        else {
            alert("There was a problem with your request!")
        }
    })
};




var displayIssues = function(issues) {
    if (issues.length === 0) {
      issueContainerEl.textContent = "This repo has no open issues!";
      return;
    }
    for (var i = 0; i < issues.length; i++) {
      // create a link element to take users to the issue on github
      var issueEl = document.createElement("a");
      issueEl.classList = "list-item flex-row justify-space-between align-center";
      issueEl.setAttribute("href", issues[i].html_url);
      issueEl.setAttribute("target", "_blank");
      // create span to hold issue title
      var titleEl = document.createElement("span");
      titleEl.textContent = issues[i].title;
  
      // append to container
      issueEl.appendChild(titleEl);
  
      // create a type element
      var typeEl = document.createElement("span");
  
      // check if issue is an actual issue or a pull request
      if (issues[i].pull_request) {
        typeEl.textContent = "(Pull request)";
      } else {
        typeEl.textContent = "(Issue)";
      }
  
      // append to container
      issueEl.appendChild(typeEl);
      issueContainerEl.appendChild(issueEl);
    }
  };




//a new display warning function
var displayWarning = function(repo) {
    // add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit ";
    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");
  
    // append to warning container
    limitWarningEl.appendChild(linkEl);
  };




getRepoIssues("facebook/react");
// getRepoIssues();
// getRepoName();
