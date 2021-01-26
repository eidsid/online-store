$(function() {
    //toggle nav bar when click on bars
    $('.navbars').on('click', () => {

            $('.header .nav_bar ').toggleClass('show');

        })
        //toggle side bar whene click on toggle-sidbar
    $('.toggle-sidbar').on('click', () => {
        $('.toggle-sidbar').toggleClass('active');
        $('.side-bar').toggleClass('active');
    })

})
// // Store Class: Handles Storage
// class local_storage {


//     //for purshes item
//     //get purshes item
//     static getitems() {
//         let item = JSON.parse(localStorage.getItem("items"));
//         if (item) {
//             return item;
//         } else {
//             return (item = []);
//         }
//     }

//     //add item to local storage
//     static additem(purshes_item) {
//         let items = local_storage.getitems();
//         items.push(purshes_item);
//         localStorage.setItem("items", JSON.stringify(items));
//     }

//     //remove item from local storage
//     static removeitem(id) {
//             let items = local_storage.getitems();
//             items.forEach((item, index) => {
//                 if (item.id === id) {
//                     items.splice(index, 1);
//                 }
//             });
//             localStorage.setItem("items", JSON.stringify(items));
//         }
//         //edit item from local storage
//     static edititem(id, count) {
//             let items = local_storage.getitems();
//             items.forEach((item) => {
//                 if (item.id === id) {
//                     item.count = count;
//                 }
//             });
//             localStorage.setItem("items", JSON.stringify(items));
//         }
//         //get id
//     static get_id() {
//         let ids = [];
//         let items = local_storage.getitems();
//         items.forEach((item) => {
//             ids.push(item.id);
//         });
//         return ids;
//     }
// }



class local_storage {

    //pass data from two html pages by pass id
    static set_id(id) {
            localStorage.setItem('productid', id);
        }
        // get product id to pass info betwene two pages
    static get_passed_id() {
        return localStorage.getItem('productid');
    }
    static get_purchase() {
        let purchase_items = JSON.parse(localStorage.getItem('purchase-items'));
        if (purchase_items) {
            return purchase_items;
        } else {
            return purchase_items = [];
        }
    }
    static set_purchase(item) {
        let purchase_items = local_storage.get_purchase();
        purchase_items.push(item);
        localStorage.setItem('purchase-item', JSON.stringify(purchase_items));

    }
    static cancel_purchase(id) {
        let purchase_items = local_storage.get_purchase();
        purchase_items.forEach((item, index) => {
            if (item.id == id) {
                purchase_items.splice(index, 1);

            }

        });
    }




}
$(function() {
    let links_container = $('.side-bar .links');
    let links_price = $('.side-bar .price_links');
    let uiproducts_container = $('.products');
    //get data from aip
    fetch(`https://fakestoreapi.com/products/categories `).then(data => data.json()).then(data => ui.createLinks(data));
    fetch(`https://fakestoreapi.com/products`).then(data => data.json()).then((data) => {
        ui.getall_products(data);
        cart.get_product_info(data);
    });

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


})
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
            cart.events();
        })


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
                })
                //purchase now event 
            let product_purchase = $('.productinfo-container .product .purchase'); {
                product_purchase.on('click', () => {
                    let count = $('.productinfo-container .product .prod-footer .count');
                    console.log(count);
                    console.log('shoud count log');
                    let data = this.data;
                    let item = { count: count, title: data.title, price: data.price, img: data.image };
                    local_storage.set_purchase(item);
                })
            }

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