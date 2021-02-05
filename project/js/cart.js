
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


