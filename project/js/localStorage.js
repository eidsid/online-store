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