'use strict';

const products = [
    {
    id: 3,
    price: 127,
    photos: [
    "1.jpg",
    "2.jpg",
    ]
    },
    {
    id: 5,
    price: 499,
    photos: []
    },
    {
    id: 10,
    price: 26,
    photos: [
    "3.jpg"
    ]
    },
    {
    id: 8,
    price: 78,
    }
];

let products1 = products.filter(product => 'photos' in product && product.photos.length > 0);
console.log(products1);

let products_sorted = products.sort((a,b) => a.price > b.price ? 1 : -1);
console.log(products_sorted);