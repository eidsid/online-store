let signup = $('.signup_form');
let form_validator = $('.signup_form ul.noty-form');

//for validator 
//validator ui
let name = signup.children('.name');
let email = signup.children('.email');
let pass = signup.children('.pass');
let re_pass = signup.children('.re-pass');
let username = "";
let userpass = "";
let useremail = "";
let vald_name = false,
       vald_email = false,
       vald_pass = false,
       vald_match = false;
//add event on button for valdate form
class valdform {
       //valid name
       static nameVald() {
              if (isNaN(Number(name.val())) && name.val().length > 2) {
                     vald_name = true;
                     username = name.val();
                     form_validator.children('.name_valid').addClass('active');
              } else {
                     vald_name = false;
                     form_validator.children('.name_valid').removeClass('active');

              }
              this.activeLoginButton();
       }
       //valid email
       static validateEmail() {
              const emailTest = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

              if (emailTest.test(email.val().toLowerCase())) {
                     vald_email = true;
                     useremail = email.val();
                     form_validator.children('.email_valid').addClass('active');
              } else {
                     vald_email = false;
                     form_validator.children('.email_valid').removeClass('active');

              };
              this.activeLoginButton();
       }
       //valid pass
       static passVald() {
              let passlist = form_validator.children('.passListValid').children('ul');
              const mediumRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
              //test if pass more than 8 character
              if (pass.val().search(/(?=.{8,})/) !== -1) {
                     passlist.children('.more').addClass('active');
              } else {
                     passlist.children('.more').removeClass('active');
              }
              //test if pass contains upper case character
              if (pass.val().search(/(?=.*[A-Z])/) !== -1) {
                     passlist.children('.upper').addClass('active');
              } else {
                     passlist.children('.upper').removeClass('active');
              }
              //test if pass contains lower case character
              if (pass.val().search(/(?=.*[a-z])/) !== -1) {
                     passlist.children('.lower').addClass('active');
              } else {
                     passlist.children('.lower').removeClass('active');
              }
              //test if pass containsone number
              if (pass.val().search(/(?=.*[0-9])/) !== -1) {
                     passlist.children('.number').addClass('active');
              } else {
                     passlist.children('.number').removeClass('active');
              }
              //test if pass contains upper special character
              if (pass.val().search(/(?=.*[!@#\$%\^&\*])/) !== -1) {
                     passlist.children('.special').addClass('active');
              } else {
                     passlist.children('.special').removeClass('active');
              }

              //test all pass value with mewdiuregex
              if (pass.val().search(mediumRegex) !== -1) {
                     vald_pass = true;
                     form_validator.children('.pass_valid').addClass('active');
              } else {
                     vald_pass = false;
                     form_validator.children('.pass_valid').removeClass('active');
              }
              this.rePassVald();
              this.activeLoginButton();
       }
       //valid pass match
       static rePassVald() {
              if (re_pass.val() == pass.val() && vald_pass) {
                     vald_match = true;
                     userpass = pass.val();
                     form_validator.children('.re_pass_valid').addClass('active');
              } else {
                     vald_match = false;
                     form_validator.children('.re_pass_valid').removeClass('active');
              }
              this.activeLoginButton();
       }
       //vald all form and make form valid true
       static activeLoginButton() {
              if (vald_name && vald_email && vald_pass && vald_match) {
                     this.vald_form = true;
                     $('.signup_form button').addClass('active');
              } else {
                     this.vald_form = false;
                     $('.signup_form button').removeClass('active');
              }
       }
       //submit form
       static submit(e) {
              if (this.vald_form) {
                     local_storage.set_login({ name: username, pass: userpass, email: useremail, login: true });
                     window.location.replace("index.html");

              } else {
                     e.preventDefault();
              }
       }
       //chick if user exist and redirect
       static stat() {
              let logininfo = local_storage.get_login();
              if (logininfo.login && window.location.pathname == "/dist/html/login.html") {
                     $('.login-cover').addClass('active');
                     setTimeout(() => {
                            window.location.replace("index.html");
                     }, 3000);
              }
       }

}
let passs = [pass, re_pass];
name.on('input', (e) => {
       valdform.nameVald();
})
email.on('input', () => {
       valdform.validateEmail();
})
pass.on('input', () => {
       valdform.passVald();
})
re_pass.on('input', () => {
       valdform.rePassVald();
})
signup.on('submit', (e) => {
       valdform.submit(e);

})
//user stat 
valdform.stat();
//show show_pass_notif
pass.on('focus', () => {
       pass.next().addClass('active');
})
//show password when double click
passs.forEach(pass => {
       pass.on('dblclick', (e) => {
              if (e.target.type == "password") {
                     e.target.type = "text";
                     pass.next().removeClass('active');
              } else {
                     e.target.type = "password";
              }

       })
})
//update header user name and event user opetions
let usernameUI = $('.nav_bar .user a');
let allpurchas = $('.nav_bar .cart .item-count ');
let logininfo = local_storage.get_login();
let login = logininfo.login;
if (login) {
       usernameUI.text("Hello " + logininfo.name);
} else {
       usernameUI.text("Hello login");
       allpurchas.text('0')

}
usernameUI.on('click', (e) => {
       if (login) {
              e.preventDefault();
       } else {
              window.location.replace("/dist/html/login.html");
       }
})

//log out
$('.nav_bar .user .dropdown-menu .logout').on('click', () => {
       local_storage.login_stat();
       window.location.reload(true);
})
// if vist cart without login and redirect to login page
if (!login && window.location.pathname == "/dist/html/cart.html") {
       $('.cart-login-cover').addClass('active');
       setTimeout(() => {
              window.location.replace("/dist/html/login.html");
       }, 3000)

}
//if have an account  show login form
let login_form = $('.login_form');
let hav_account_btn = $('.hav_account_btn');
hav_account_btn.on('click', (e) => {
       e.preventDefault();
       login_form.addClass('active');
})

//dont have account event remove login form
login_form.children('.dropdown').children('.dontHaveAcount').on('click', (e) => {
       e.preventDefault();
       login_form.removeClass('active');
})

//login panal setup
let login_email = login_form.children('.dropdown').children('.email');
let login_password = login_form.children('.dropdown').children('.password');
let alert = login_form.children('.dropdown').children('.alert')
login_form.children('.dropdown').children('button').on('click', (e) => {
       e.preventDefault();
       if (logininfo.pass == login_password.val() && logininfo.email == login_email.val()) {
              local_storage.login_stat();
              alert.text('login success');
              alert.removeClass('alert-danger');
              alert.addClass('alert-primary');
              setTimeout(() => {
                     window.location.replace("index.html");
              }, 200);

       } else {
              alert.text('Email or password wrong');
              alert.removeClass('alert-primary');
              alert.addClass('alert-danger');
       }
})
