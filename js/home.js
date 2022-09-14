const loginContainer = document.querySelector('.login_container')
const newsContainer = document.querySelector('.news-container')
const loginBtn = document.querySelector('.login-submit')
const form = document.createElement('form') 
const articles = document.createElement('div')

document.addEventListener("DOMContentLoaded", function(){
  checkAuth()
});

function handleLogin (e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const stringified = stringifyFormData(data);
  doLoginRequest(stringified);
}

async function doLoginRequest (body) {
  const result = await fetch('/login', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body
  });
  const data = await result.json();
  if (data.isAuthenticated) {
    loginContainer.remove();
    renderNewsContainer();
    sessionStorage.setItem('userId', data.id)
  }
}

function renderLogin () {
  form.className = 'login-form'
  form.id = 'login-form'

  form.innerHTML = `
      <div class="form-control">
        <label>Username</label>
        <input 
          type="text" 
          placeholder="user@email.com" 
          id="username"
          name="username"
          required
          />
      </div>
      <div class="form-control">
        <label>Password</label>
        <input 
          type="password" 
          id="password"
          name='password'
          required>
        <small>Error message</small>
      </div>
      <button type="submit" class='login-submit'>Submit</button>
    `
    loginContainer.append(form)
}

function stringifyFormData(fd) {
  const data = {};
  for (let key of fd.keys()) {
    data[key] = fd.get(key);
  }
  return JSON.stringify(data, null, 4);
}

function renderNewsContainer () {
  newsContainer.innerHTML =
  `<div class="article">
      <h2>Fires in Northwest United States</h2>
      <p>If your community has been affected by the fires in the northwestern states, you can request FEMA assistance.</p>
      <a class="button" href="./help">Assistance</a>
    </div>
  <div class="article">
    <h2>Hurricane Season: Active</h2>
    <p>Although hurricane season is active, there are no storms being monitored. View past storms here.</p>
    <a class="button" href="./disasterLog">Disaster Log</a>
  </div>
  `
  newsContainer.append(articles)
}

async function checkAuth () {
  const userId = sessionStorage.getItem('userId');
  let data = {
    isAuthenticated: false
  };
  if (userId) {
    const results = await fetch (`/checkAuth/${userId}`)
    data = await results.json()
  }
  if (!data.isAuthenticated) {
    renderLogin()
  } else {
    renderNewsContainer()
  }
  console.log('is auth', data)
}

form.addEventListener('submit', handleLogin)


