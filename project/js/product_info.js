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