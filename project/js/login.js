let loginform = $('.login_form');
let form_validator = $('.login_form ul.noty-form');

//for validator 
//validator ui
let name = loginform.children('.name');
let username = "";
let userpass = "";
let pass = loginform.children('.pass');
let re_pass = loginform.children('.re-pass');

let vald_name = false,
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
       //valid pass
       static passVald() {
              let passlist = form_validator.children('.passListValid').children('ul');
              let mediumRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
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
                     userpass = re_pass.val();
                     form_validator.children('.re_pass_valid').addClass('active');
              } else {
                     vald_match = false;
                     form_validator.children('.re_pass_valid').removeClass('active');
              }
              this.activeLoginButton();
       }
       //vald all form and make form valid true
       static activeLoginButton() {
              if (vald_name && vald_pass && vald_match) {
                     this.vald_form = true;
                     $('.login_form button').addClass('active');
              } else {
                     this.vald_form = false;
                     $('.login_form button').removeClass('active');
              }
       }
       static submit(e) {
              if (this.vald_form) {
                     local_storage.set_login(username, userpass);
              } else {
                     e.preventDefault();
              }
       }
}
name.on('input', () => {
       valdform.nameVald();
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