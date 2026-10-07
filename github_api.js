const axios=require('axios')
const username=process.argv[2]

function printError(){
    console.error("error: please provide a GitHub username")
}

function fetchDetails(data){
    return{
        name:data.name,
        username:data.login,
        profile: data.html_url,
        public_repos: data.public_gists,
        followers:data.followers
    }

}

function printDetail(res){
    console.log(`Name: ${res.name}`)
    console.log(`Username ${res.username}`)
    console.log(`Profile ${res.profile}`)
    console.log(`Public repos: ${res.public_repos}`)
    console.log(`Followers ${res.followers}`)
}

async function fetchUser(){
     if(!username) printError()
    try{
       
        const res=await axios.get(`https://api.github.com/users/${username}`)
        // console.log(res.response.status)
        let response=fetchDetails(res.data)
        printDetail(response)


    }catch(err){
        if(err.response.status===404) console.log(`error: GitHub user not found:  ${username}`)
    }

}

fetchUser()