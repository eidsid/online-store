$(function() {
    let links_container = $('.side-bar .links');
    class ui {
        static createLinks(apilinks) {
            apilinks.forEach(link => {
                let link_template = document.createElement('li');
                link_template.innerHTML = `<a id="link" href="#">${link}</a>`;
                links_container.append(link_template);
            });
        }
        static getdata(data) {
            data.forEach(data => {
                console.log(data);
            })
        }
    }
    class api {
        static getcatogry(data) {
            return fetch(`https://fakestoreapi.com/${data}`)
                .then((res) => res.json())
                .then(data => ui.createLinks(data)).then(() => {
                    console.log('done');
                });

        };
        static getdata(data) {
            return fetch(`https://fakestoreapi.com/${data}`)
                .then((res) => res.json())
                .then(data => ui.getdata(data)).then(() => {
                    console.log('done');
                });

        };
    }

    // call create links on start
    api.getcatogry("products/categories");

    // add event on link click
    links_container.on('click', (e) => {
        if (e.target.id === "link") {
            let type = $(e.target).text();
            api.getdata(`products/category/${type}`);
        }
    })











})