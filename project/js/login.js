let loginform = $('.login_form');
let form_validator = $('.login_form ul.noty-form');

//for validator 
//validator ui
let name = loginform.children('.name');
let email = loginform.children('.email');
let pass = loginform.children('.pass');
let re_pass = loginform.children('.re-pass');
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
                     vald_email = email.val();
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
                     $('.login_form button').addClass('active');
              } else {
                     this.vald_form = false;
                     $('.login_form button').removeClass('active');
              }
       }
       static submit(e) {
              if (this.vald_form) {
                     local_storage.set_login({ name: username, pass: userpass, email: useremail, login: true });
              } else {
                     e.preventDefault();
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
loginform.on('submit', (e) => {
       valdform.submit(e);

})

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


//chick if user exist and redirect
let logininfo = local_storage.get_login();
let login = logininfo.login;
if (login && window.location.pathname == "/dist/html/login.html") {
       $('.loginform .login-cover').addClass('active');
       setTimeout(() => {
              window.location.replace("index.html");
       }, 3000);
}
//update header user name and event user opetions
let usernameUI = $('.nav_bar .user a');
if (login) {

       usernameUI.text("Hello " + logininfo.name);

} else {
       usernameUI.text("Hello login");
}

usernameUI.on('click', (e) => {
       console.log('xlixk');
       if (login) {
              e.preventDefault();
       } else {
              window.location.replace("/dist/html/login.html");
       }

})