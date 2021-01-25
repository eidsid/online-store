class cart {
    static productinfo_template(id, category, title, info, price, imgurl) {
            //      category = $('.productinfo-container .categories ');
            //      category.text(category)
            let productinfo_container = $('.productinfo-container .product');
            productinfo_container.attr('id', id);
            productinfo_container.children('.prod-header').children('.title').text(title);
            productinfo_container.children('.prod-body ').children('.info').text(info);
            productinfo_container.children('.prod-body').children('.img').attr('src', imgurl);
            productinfo_container.children('.prod-footer').children('.price').text(price);
            productinfo_container.children('.prod-footer').children('.count').text(1);

        }
        // api product info data by id
    static get_product_info(data) {
        let id = local_storage.get_passed_id();
        data.forEach(data => {
            if (data.id == id) {
                cart.productinfo_template(data.id, data.category, data.title, data.description, data.price, data.image);
            }
        })
    }
}