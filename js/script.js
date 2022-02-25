// div where the profile info will appear
const overview = document.querySelector(".overview");
// username
const username = "cjstrattonbuys";
// unordered list of repos
const repoList = document.querySelector(".repo-list");


const getGitHub = async function () {
    const request = await fetch (`https://api.github.com/users/${username}`);
    const gitHub = await request.json();
    //console.log(gitHub);
    displayUserData(gitHub);
}
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
}

const fetchRepos = async function () {
    const request = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repos = await request.json();
    //console.log(repos);
    displayRepos(repos);
};
fetchRepos();

const displayRepos = function (repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};
