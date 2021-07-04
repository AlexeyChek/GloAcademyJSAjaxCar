document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    select.addEventListener('change', () => {
        return new Promise ((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', './cars.json');
            request.setRequestHeader('Content-type', 'application/json');
            request.send();
            request.addEventListener('readystatechange', () => {
                if (request.readyState === 4) {
                    if (request.status !== 200) {
                    reject('Произошла ошибка');
                    throw new Error('Произошла ошибка')
                    } else {
                        const data = JSON.parse(request.responseText);
                        data.cars.forEach(item => {
                            if (item.brand === select.value) {
                                const {brand, model, price} = item;
                                resolve(`Тачка ${brand} ${model} <br>
                                Цена: ${price}$`);
                            }
                        });
                    }
                }
            });
        })
        .then(result => output.innerHTML = result)
        .catch(result => output.innerHTML = result);
    });
});