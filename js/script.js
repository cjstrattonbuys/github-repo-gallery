// div where the profile info will appear
const overview = document.querySelector(".overview");
// username
const username = "cjstrattonbuys";
// unordered list of repos
const repoList = document.querySelector(".repo-list");
// section with a class of "repos"
const repoClass = document.querySelector(".repos");
// section with a class of "repo-data"
const repoData = document.querySelector(".repo-data");
// back to repos gallery button
const backToGallery = document.querySelector(".view-repos");
// search box
const filterInput = document.querySelector(".filter-repos");


const getGitHub = async function () {
    const request = await fetch (`https://api.github.com/users/${username}`);
    const gitHub = await request.json();
    //console.log(gitHub);
    displayUserData(gitHub);
};

getGitHub();

const displayUserData = function (gitHub) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
        <figure>
            <img alt="user avatar" src=${gitHub.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${gitHub.name}</p>
            <p><strong>Bio:</strong> ${gitHub.bio}</p>
            <p><strong>Location:</strong> ${gitHub.location}</p>
            <p><strong>Number of public repos:</strong> ${gitHub.public_repos}</p>
        </div> `;
    overview.append(div);
    fetchRepos();
};

const fetchRepos = async function () {
    const request = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repos = await request.json();
    //console.log(repos);
    displayRepos(repos);
};

const displayRepos = function (repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};

repoList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

const getRepoInfo = async function (repoName) {
    const request = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await request.json();
    //console.log(repoInfo);
    const fetchLanguages = await fetch (repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //console.log(languageData);
    let languages = [];
    for (let key in languageData) {
        languages.push(key);
    }
    //console.log(languages);
    displayRepoInfo(repoInfo, languages);
};

const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    const repoDiv = document.createElement("div");
    repoDiv.innerHTML = `
        <h3>Name: ${repoDiv.name}</h3>
        <p>Description: ${repoDiv.description}</p>
        <p>Default Branch: ${repoDiv.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoDiv.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    repoData.append(repoDiv);
    repoData.classList.remove("hide");
    repoClass.classList.add("hide");
    backToGallery.classList.remove("hide");
};

backToGallery.addEventListener("click", function() {
    repoData.classList.add("hide");
    repoClass.classList.remove("hide");
    backToGallery.classList.add("hide");
});

filterInput.addEventListener("input", function(e) {
    const searchText = e.target.value;
    //console.log(searchText);
    const repos = document.querySelectorAll(".repo")
    const searchLowerText = searchText.toLowerCase();

    for (const repo of repos) {
        const repoLowerText = repo.innerText;
        if (repoLowerText.includes(searchLowerText)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});