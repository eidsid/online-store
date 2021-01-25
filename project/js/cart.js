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
            productinfo_container.children('.prod-footer').children('.count').text(1);
            this.category = category;
        }
        // api product info data by id

    static get_product_info(data) {
            let id = local_storage.get_passed_id();
            data.forEach(data => {
                if (data.id == id) {
                    cart.productinfo_template(data.id, data.category, data.title, data.description, data.price, data.image);
                }
            })

            // recommended ui
            data.forEach(data => {
                if (data.category == this.category && data.id != id) {
                    cart.recomend_products(data.id, data.title, data.price, data.image)
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
              <div class="btn btn-primary" id="add-cart">buy</div>
            </div>
          </div>`
        recommended_container.append(content)
    }
}