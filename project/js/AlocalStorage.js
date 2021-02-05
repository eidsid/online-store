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
        let loginInfo = JSON.parse(localStorage.getItem('login'));
        if (loginInfo) {
            return loginInfo
        } else {
            return loginInfo = []
        }
    }
    static set_login(info) {
        localStorage.setItem('login', JSON.stringify(info));
    }
    static login_stat() {
        let login_state = this.get_login();
        login_state.login = !login_state.login;
        this.set_login(login_state);
    }


}