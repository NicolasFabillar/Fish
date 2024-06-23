const wrapper = document.querySelector('.wrapper');
const signUplink = document.querySelector('.signUp-link');
const signInlink = document.querySelector('.signIn-link');
const toggleLogin = document.querySelector('.toggle-login');
const xclose = document.querySelector('.close');
const rectangleBlur = document.querySelector('.rectangle');


signUplink.addEventListener('click', () => {
    wrapper.classList.toggle('show-sign');
    wrapper.classList.add('show-bg');
});

signInlink.addEventListener('click', () => {
    wrapper.classList.toggle('show-sign');
    wrapper.classList.add('show-bg');
});

toggleLogin.addEventListener('click', () => {
    toggleLogin.classList.toggle('active');
    wrapper.classList.toggle('active');
});

xclose.addEventListener('click', () => {
    toggleLogin.classList.toggle('active');
    wrapper.classList.toggle('active');
    wrapper.classList.remove('show-bg');
});

function toggleBlur() {
    rectangleBlur.classList.toggle('blur');
}

function onlyOne(checkbox) {
    var checkboxes = document.getElementsByName('check')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })
}