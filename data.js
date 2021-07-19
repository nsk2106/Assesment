const userList = document.getElementById('app')
const searchBar = document.getElementById('searchBar');
let html = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredUser = html.filter((user) => {
        return (
            user.login.toLowerCase().includes(searchString) 
        );
    });
    console.log(filteredUser)
    displayUser(filteredUser);
});
const loadUsers = async()  =>{
    try{
        const res = await fetch('https://api.github.com/users');
        html = await  res.json();
        console.log(html)
        displayUser(html);
    } catch(err){
        console.log(err);
    }
};

const displayUser = (users) =>{
    const htmlstring = users.map( user =>{
        return `
            <div class = "user">
                    <img src="${user.avatar_url}" alt =${user.login} "style: height="100px""></img>
                    <h2> events_url: ${user.events_url}</p>
                    <p> login: ${user.login}</p>
                    <p> followers_url: ${user.followers_url}</p>
                    <p> following_url : ${user.following_url}</p>
                    <button class="accordion" onclick = myFucntion()> Read More </button>
                    <div class="accordion-content" >
                    <p> gists_url : ${user.gists_url}</p>
                    <p> gravatar_id : ${user.gravatar_id}</p>
                    <p> html_url : ${user.html_url}</p>
                    <p> id: ${user.id}</p>
                    <p> login: ${user.login}</p>
                   </div>
            </div>
`
    }).join( ' ')
    userList.innerHTML = htmlstring;
}


function myFucntion(){
var accordions = document.getElementsByClassName("accordion");
for (var i = 0; i < accordions.length; i++) {
  accordions[i].onclick = function() {
    this.classList.toggle('is-open');
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      // accordion is currently open, so close it
      content.style.maxHeight = null;
    } else {
      // accordion is currently closed, so open it
      content.style.maxHeight = content.scrollHeight + "px";
    }
  }
}
}
loadUsers();
