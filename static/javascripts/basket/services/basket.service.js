/**
 * Created by slawek on 2015-06-07.
 */

(function () {
    'use strict';

    angular.module('application.basket.services').factory('BasketService', BasketService);

    BasketService.$inject = ['$cookieStore', 'Utileeer'];

    function BasketService($cookieStore, Utileeer) {
        var BasketService = {
            get: get,
            put: put,
            add: add,
            set: set,
            remove: remove,
            removeAll: removeAll
        }

        return BasketService;

        function get() {
            var basket = $cookieStore.get('basket_application');
            if (!Utileeer.isNotEmpty(basket)) {
                basket = [];
            }
            console.log(basket);
            return basket;
        }

        function put(basketObject) {
            console.log(basketObject);
            $cookieStore.put('basket_application', basketObject);
        }

        function set(productId, quantity) {
            var basket = get();
            var ob = getIndexOf(productId, basket);
            if (ob == -1) {
                basket.push({productId: productId, quantity: quantity});
            } else {
                basket[ob].quantity = quantity;
            }

            put(basket);
        }

        function add(productId, quantity) {
            var basket = get();
            var ob = getIndexOf(productId, basket);

            if (ob == -1) {
                basket.push({productId: productId, quantity: quantity});
            } else {
                basket[ob].quantity = basket[ob].quantity + quantity;
            }

            put(basket);
        }

        function remove(productId) {
            var basket = get();
            var ob = getIndexOf(productId, basket);

            if (ob != -1) {
                basket.splice(ob, 1);
            }

            put(basket);
        }


        function removeAll() {

            put([]);
        }

        function getIndexOf(productId, basket) {
            var ob;
            for (ob in basket) {
                if (basket[ob].productId == productId) {
                    return ob;
                }
            }
            return -1;
        }

    }
})();