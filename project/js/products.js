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