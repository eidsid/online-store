$(function () {
class local_storage {

    //pass data from two html pages by pass id
    static set_id(id) {
        localStorage.setItem('productid', id);
    }
    // get product id to pass info betwene two pages
    static get_passed_id() {
        return localStorage.getItem('productid');
    }
    //get purchase 
    static get_purchase() {
        let purchase_items = JSON.parse(localStorage.getItem('purchase-item'));
        if (purchase_items) {
            return purchase_items;
        } else {
            return (purchase_items = []);
        }
    }
    //set purchase 
    static set_purchase(item) {
        let purchase_items = this.get_purchase();
        if (purchase_items) {
            purchase_items.push(item);
            localStorage.setItem('purchase-item', JSON.stringify(purchase_items));
        }
    }
    //remove purchase 
    static cancel_purchase(id) {
        console.log(id);
        let purchase_items = this.get_purchase();
        purchase_items.forEach((item, index) => {
            if (item.id == id) {
                purchase_items.splice(index, 1);

            }

        });
        localStorage.setItem('purchase-item', JSON.stringify(purchase_items));
    }
    //get total-price 
    static getPurchase_totalPrice() {
        let total_price = 0;
        let purchase_items = this.get_purchase();
        purchase_items.forEach(item => {
            total_price += item.price * Number(item.count);
        })
        return (Math.floor(total_price));
    }
    //get total-price 
    static get_totalPurchased() {
        let total_purch = 0;
        let purchase_items = this.get_purchase();
        purchase_items.forEach(item => {
            total_purch += 1;
        })
        return (total_purch);
    }
    // get notifications
    static get_notifications() {
        let notifications = JSON.parse(localStorage.getItem('noty'));
        if (notifications) {
            return notifications;
        } else {
            return (notifications = []);
        }

    }
    // set notifications
    static set_notifications(not) {
        let notifications = this.get_notifications();
        notifications.push(not);
        localStorage.setItem('noty', JSON.stringify(notifications));
    }
    // remove notifications
    static remove_notifications(id) {
        let nots = this.get_notifications();
        nots.forEach((not, index) => {
            if (not.id == id) {
                nots.splice(index, 1);
            }
        })
        localStorage.setItem('noty', JSON.stringify(nots));

    }
    static get_login() {
        let loginInfo = localStorage.getItem('login');
        if (loginInfo) {
            return loginInfo
        } else {
            return loginInfo = []
        }
    }
    static set_login(info) {
        localStorage.setItem('login', info);
    }


}

//toggle nav bar when click on bars
$('.navbars').on('click', () => {

    $('.header .nav_bar ').toggleClass('show');

})
//toggle side bar whene click on toggle-sidbar
$('.toggle-sidbar').on('click', () => {
    $('.toggle-sidbar').toggleClass('active');
    $('.side-bar').toggleClass('active');
})




let cart_items = $('.cart .items');
class UI_items {
    /* ui items*/
    static items() {
        let purchase_items = local_storage.get_purchase();
        purchase_items.forEach(product => {
            UI_items.template(product.title, product.price, product.img, product.count, product.id)
        });
    }
    //  h1.no_items
    static noitms() {
        let totalPurchase = local_storage.get_totalPurchased();

        if (totalPurchase > 0) {
            cart_items.children('h1.no_items').removeClass('active');

        } else {
            cart_items.children('h1.no_items').addClass('active');

        }
    }
    /* ui item template*/
    static template(title, price, imgurl, count, id) {
        let allprice = price * Number(count);
        let template = `
    <div class="col col-lg-3 col-md-4 col-sm-6  col-xsm-12">
        <div class="product" id="${id}">
        <img class="rounded-circle" src="${imgurl}" alt=""/>
        <p class="title">${title}</p> 
        <div class="flex">
        <p>price</p> 
        <p class="price">$${price}</p> 
        </div>
        <div class="flex">
        <p>count</p>
        <p class="count">${count}</p> 
        </div>
        <hr>
        <div class="flex">
        <p >  Price</p>
        <p class="allprice">$${allprice}</p>
        </div>
        <button id="remove" >remove</button>
        </div> </div>`;
        cart_items.append(template);

    }
    //update ui total price 
    static total_price() {
        let totel_price = local_storage.getPurchase_totalPrice();
        let allpriceui = $('.cart .cart-footer .all-price');
        allpriceui.text(`$ ${totel_price}`);

    }
    //update ui total purchased 
    static total_purchase() {
        let totel_purchase = local_storage.get_totalPurchased();
        let allpurchas = $('.nav_bar .cart .item-count ');
        allpurchas.text(totel_purchase);
    }
    // remove notificaations
    static remove_not(text, id) {
        let subtext = text.substring(0, 10);
        local_storage.set_notifications({ text: ` You canceled the purchase of ${subtext}`, id: id });
    }
    //remove element from ui local sotrage and update ui total price
    static remove_element() {
        let cart_products = document.querySelectorAll('.cart .items .product ');
        // click remove event 
        cart_products.forEach(prod => {
            $(prod).on('click', (e) => {
                if (e.target.id == "remove") {
                    let id = $(e.target).parent().attr('id');
                    let text = $(e.target).parent().children('p').text();
                    local_storage.cancel_purchase(id);
                    this.total_price();
                    this.total_purchase();
                    this.remove_not(text, Math.floor(Math.random(10) * 100));
                    $(e.target).parent().remove();
                    this.noitms();
                }
            })
        });

    }
    //call all motheds in this class
    static call_ALL() {
        this.items();
        this.total_price();
        this.remove_element();
        this.total_purchase();
        this.noitms();

    }

}
UI_items.call_ALL();



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
// ui notifications
let notificationCount = $('.notification .not-head span');
let notificationUI = $('.notification .not-body ul');
class notifications {

       // notifications  template 
       static not_temp(text, id) {
              let temp = `<div class="not-container">
<li><i class="fas fa-shopping-basket"></i> ${text}</li> <i class="fas fa-window-close close" id="${id}"></i></div>`;
              notificationUI.append(temp);
       }

       //notifications display ui
       static notF() {
              let not = local_storage.get_notifications();
              not.forEach(el => {
                     this.not_temp(el.text, el.id);
              });
              this.addevent();
       }
       // noty count 
       static not_count() {
              let notyNum = 0;
              let not = local_storage.get_notifications();
              not.forEach(() => {
                     notyNum++;
              });
              notificationCount.text(notyNum);
       }
       //event remove notification
       static addevent() {
              // add event clse btn
              let not_elements = document.querySelectorAll('.not-container ');
              not_elements.forEach(el => {
                     $(el).on('click', (e) => {
                            if (e.target.classList.contains("close")) {
                                   // remove notifications 
                                   e.target.parentElement.remove();
                                   local_storage.remove_notifications(e.target.id);
                                   this.not_count();
                            }
                     })
              })
       }


}

notifications.notF();
notifications.not_count();

let links_container = $('.side-bar .links');
let links_price = $('.side-bar .price_links');
let uiproducts_container = $('.products');
//get data from aip
// fetch(`https://fakestoreapi.com/products/categories `).then(data => data.json()).then(data => ui.createLinks(data));
// fetch(`https://fakestoreapi.com/products`).then(data => data.json()).then((data) => {
//     ui.getall_products(data);
//     cart.get_product_info(data);
// });

class ui {

    //get data from aip and creat ui links
    static createLinks(apilinks) {
        apilinks.forEach(link => {
            let link_template = document.createElement('li');
            link_template.innerHTML = `<a data-catogery="${link}"  id="link" href="#">${link}</a>`;
            links_container.append(link_template);
        });
    }
    //get data from aip and creat ui products
    static getall_products(data) {
        data.forEach(data => {
            ui.product_temp(data.title, data.price, data.id, data.image, data.category)
        })
        ui.events();
    }
    /**product template */
    static product_temp(title, price, id, imgurl, catogery) {
        let subtitl = title.substring(0, 17);
        let subprice = String(price).substring(0, 4);
        let temp_content =
            `
    <div class="product" id="${id}" data-type="${catogery}">
    <p class="title">${subtitl} </p>
    <img src="${imgurl}" alt="" />
    <div class="form">
      <p class="price" data-price="${price}">$${subprice}</p>
      <button id="add-cart">add to cart</button>
                </div></div> `
        uiproducts_container.append(temp_content);
    }
    //filter products by add active class
    static add_active(product_type) {
        let uiproduct = document.querySelectorAll('.products .product');
        uiproduct.forEach(product => {
            product.classList.remove('active');
            product.classList.remove('disactive');
        })
        //filter by categories
        if (isNaN(Number(product_type))) {
            if (product_type == "active-all") {
                uiproduct.forEach(product => {
                    product.classList.add('active');
                })
            } else {
                uiproduct.forEach(product => {
                    if ($(product).data('type') == product_type) {
                        product.classList.add('active');
                    } else {
                        product.classList.add('disactive');
                    }
                })
            }
        }
        //filter by price
        else if (!isNaN(product_type)) {
            uiproduct.forEach(product => {
                let the_price = $(product).children('.form').children('.price').data('price');
                if (product_type == 100 && the_price <= 100) {
                    product.classList.add('active');
                } else if (product_type == 500 && the_price <= 500 && the_price > 100) {
                    product.classList.add('active');
                } else if (product_type == 1000 && the_price <= 1000 && the_price > 500) {
                    product.classList.add('active');
                } else {
                    product.classList.add('disactive');
                }
            })
        }
    }
    //filter by search
    static search_filter(search_text) {
        let uiproduct = document.querySelectorAll('.products .product');
        uiproduct.forEach(prod => {
            prod.classList.remove('active');
            prod.classList.remove('disactive');
            let product_title = $(prod).children('.title').text().
                toLowerCase();
            if (product_title.match(search_text.toLowerCase())) {
                prod.classList.add('active');
            } else {
                prod.classList.add('disactive');
            }

        })
    }
    //add events
    static events() {
        // open new page and send product id to storeage
        let products = document.querySelectorAll('.products .product');
        products.forEach(product => {
            $(product).on('click', (e) => {
                let product_id = product.id;
                if (e.target.id == "add-cart") {
                    local_storage.set_id(product_id);
                    window.open('./product_info.html');
                }
            })

        })
        // add event on link click
        //filter by categories
        if (links_container) {
            links_container.on('click', (e) => {
                if (e.target.id == "link") {
                    if (e.target.classList.contains("all")) {
                        ui.add_active("active-all");
                    } else {
                        let catogery_type = $(e.target).data('catogery');
                        ui.add_active(catogery_type);
                    }
                }
            });
        }
        //filter by price
        if (links_price) {
            links_price.on('click', (e) => {
                if (e.target.id == "by-price") {
                    ui.add_active($(e.target).data('price'));
                }
            })
        }
        //filter by search
        $('.search_form').on('input', (e) => {
            let text = $(e.target).val();
            ui.search_filter(text);
        })
    }
}



class cart {
    static productinfo_template(id, category, title, info, price, imgurl) {
        let categoryui = $('.productinfo-container .categories ');
        categoryui.text(category);
        let productinfo_container = $('.productinfo-container .product');
        productinfo_container.attr('id', id);
        productinfo_container.children('.prod-header').children('.title').text(title);
        productinfo_container.children('.prod-body ').children('.info').text(info);
        productinfo_container.children('.prod-body').children('.img').attr('src', imgurl);
        productinfo_container.children('.prod-footer').children('.price').text(price);
        productinfo_container.children('.prod-footer').children('.count').val(1);
        this.category = category;
    }
    // api product info data by id
    static get_product_info(data) {
        let id = local_storage.get_passed_id();
        data.forEach(data => {
            if (data.id == id) {
                cart.productinfo_template(data.id, data.category, data.title, data.description, data.price, data.image);
                this.data = data;
            }
        })

        // recommended ui
        data.forEach(data => {
            if (data.category == this.category && data.id != id) {
                cart.recomend_products(data.id, data.title, data.price, data.image)
            }
        })
        cart.events();
    }
    //add product notifications
    static addNot(text, id) {
        let subText = text.substring(0, 10);
        local_storage.set_notifications({ text: ` You  purchase  ${subText}`, id: id });
    }
    static events() {
        // open new page and send product id to storeage
        let products = document.querySelectorAll('.recommend-products .product');
        products.forEach(product => {
            $(product).on('click', (e) => {
                if (e.target.id == "add-cart-reco") {
                    local_storage.set_id(product.id);
                    window.open('./product_info.html');
                }
            })
        });
        let prochase_btn = $('.productinfo-container .prod-footer .buy');
        //purchase now event 
        let product_purchase = $('.productinfo-container .product .purchase');
        let exist = false;
        let purchase_items = local_storage.get_purchase();
        let data = this.data;
        //add purchased on buy button if it purchased
        purchase_items.forEach(item => {
            if (item.id == data.id) {
                exist = true;
                prochase_btn.text('purchased').css('backgroundColor', 'green');
                return true;
            }
        });

        //add purchased
        product_purchase.on('click', () => {
            let exist = false;
            let purchase_itemsr = local_storage.get_purchase();
            purchase_itemsr.forEach(item => {
                if (item.id == data.id) {
                    exist = true;
                    prochase_btn.text('purchased').css('backgroundColor', 'green');
                    return true;
                }
            });
            if (exist) {
                return true;
            } else {
                prochase_btn.text('purchased').css('backgroundColor', 'green');
                let count = $('.productinfo-container .product .prod-footer .count').val();
                let item = { count: count, title: data.title, price: data.price, img: data.image, id: data.id };
                local_storage.set_purchase(item);
                let text = data.title.substring(0, 10);
                local_storage.set_notifications({ text: ` You bought ${text}`, id: Math.floor(Math.random(10) * 100) });
                window.location.reload(true);
            }

        })
    }
    // recommended ui temlplate
    static recomend_products(id, title, price, imgurl) {
        let recommended_container = $('.recommend-products');
        let content = `
         <div class="product" id="${id}"><img src="${imgurl}" alt=""/>
            <h4>${title}</h4>
            <div class="form">
              <div class="price">${price}</div>
              <div class="btn btn-primary" id="add-cart-reco">buy</div>
            </div>
          </div>`
        recommended_container.append(content)
    }
}
})