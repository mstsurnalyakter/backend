const express = require('express')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3001;

const github = {
  "login": "mstsurnalyakter",
  "id": 117344596,
  "node_id": "U_kgDOBv6JVA",
  "avatar_url": "https://avatars.githubusercontent.com/u/117344596?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/mstsurnalyakter",
  "html_url": "https://github.com/mstsurnalyakter",
  "followers_url": "https://api.github.com/users/mstsurnalyakter/followers",
  "following_url": "https://api.github.com/users/mstsurnalyakter/following{/other_user}",
  "gists_url": "https://api.github.com/users/mstsurnalyakter/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/mstsurnalyakter/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/mstsurnalyakter/subscriptions",
  "organizations_url": "https://api.github.com/users/mstsurnalyakter/orgs",
  "repos_url": "https://api.github.com/users/mstsurnalyakter/repos",
  "events_url": "https://api.github.com/users/mstsurnalyakter/events{/privacy}",
  "received_events_url": "https://api.github.com/users/mstsurnalyakter/received_events",
  "type": "User",
  "user_view_type": "public",
  "site_admin": false,
  "name": "Mst Surnaly Akter",
  "company": "Studied at Daffodil International University ",
  "blog": "https://mst-surnaly-akter.vercel.app/",
  "location": "Bangladesh",
  "email": null,
  "hireable": true,
  "bio": "My name is Mst Surnaly Akter. I'm a web developer. I Studied at Daffodil International University for a Bachelor's degree in Software Engineering Department.",
  "twitter_username": "mstsurnalyakter",
  "public_repos": 312,
  "public_gists": 1,
  "followers": 14,
  "following": 1,
  "created_at": "2022-11-03T07:54:57Z",
  "updated_at": "2025-05-12T12:47:53Z"
}

app.get("/github",(req,res)=>{
    res.json(github)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/twitter",(req,res)=>{
    res.send("surnaly")
})

app.get("/login",(req,res)=>{
    res.send('<h1>Hello login</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port https://localhost:${port}`)
})