const baseURL = 'https://api.github.com';
const user = 'eyaltoledano';

function getToken() {
  return '';
}

function forkRepo() {
  let repo = 'learn-co-curriculum/js-ajax-fetch-lab';
  let repoPostUrl = baseURL + '/repos/' + repo + '/forks'
  fetch(
  	repoPostUrl,
      {
    		method: 'POST',
    		headers: {
    			Authorization: `token ${getToken()}`
        }
      }
  ).then(response => response.json())
   .then(json => showResults(json))
}

function showResults(json) {
  let resultsDiv = document.getElementById('results')
  let repoLink = json.html_url
  let divData = `<a href="${repoLink}">${json.parent.name} was forked  successfully</a>`
  resultsDiv
  // why did i need to call resultsDiv? it doesn't work otherwise lol
  resultsDiv.innerHTML = divData
}

function createIssue() {
  let inputValueTitle = document.getElementById('title').value
  let inputValueBody = document.getElementById('body').value
  let issueData = {"title": inputValueTitle, "body": inputValueBody}

  // POST /repos/:owner/:repo/issues
  let repo = `${user}/js-ajax-fetch-lab`;
  let issuePostUrl = baseURL + '/repos/' + repo + '/issues'

  fetch(
    issuePostUrl,
      {
        method: 'POST',
        body: JSON.stringify(issueData),
        headers: {
    			Authorization: `token ${getToken()}`
        }
      }
  ).then(response => response.json())
   .then(json => getIssues())
}

function getIssues() {
  function listIssues(json) {
    let startUl = '<ul>'
    let endUl = '</ul>'
    let issuesDiv = document.getElementById('issues')
    issuesDiv
    issuesDiv.innerHTML = startUl + json.map(
      issue => '<li>' + `<a href='${issue.url}'>` + `${issue.title} (#${issue.url.split('/').slice(-1)[0]})` + '</a>' + '</li>'
    ).join('') + endUl
  }

  // GET /repos/:owner/:repo/issues
  let repo = `${user}/js-ajax-fetch-lab`;
  let ownedIssuesUrl = baseURL + '/repos/' + repo + '/issues'
  fetch(
    ownedIssuesUrl,
    {
      method: 'GET',
      headers: {
        Authorization: `token ${getToken()}`
      }
    }
  ).then(response => response.json())
   .then(json => listIssues(json))
}
