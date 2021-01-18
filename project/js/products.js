fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((data) => (this.cataegory = data)).then(json => console.log(json));