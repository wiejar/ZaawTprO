/**
 * Created by slawek on 2015-06-07.
 */

(function () {
    'use strict';

    angular.module('application.basket.services').factory('BasketService', BasketService);

    BasketService.$inject = ['$cookieStore', 'Utileeer', 'Snackbar'];

    /**
     * @class BasketService
     * @description Manage products in basket
     * @param $cookieStore {Object} Injected service which manage cookies.
     * @param Utileeer {Object} Injected service to check if element is not empty.
     * @param Snackbar {Object} Injected service to show Snackbar.
     */
    function BasketService($cookieStore, Utileeer, Snackbar) {
        var BasketService = {
            get: get,
            add: add,
            set: set,
            remove: remove,
            removeAll: removeAll
        };

        return BasketService;

        /**
         * @method get
         * @description Get products in basket.
         * @returns {Object} Products in basket.
         */
        function get() {
            var basket = $cookieStore.get('basket_application');
            if (!Utileeer.isNotEmpty(basket)) {
                basket = [];
            }
            return basket;
        }

        /**
         * @method put
         * @description Put data to cache.
         * @param basketObject {Object} Content of basket.
         */
        function put(basketObject) {
            $cookieStore.put('basket_application', basketObject);
        }

        /**
         * @method set
         * @description Set product in basket or update it quantity and price if it exist in basket.
         * @param productId {number} Product Id
         * @param quantity {number} Quantity
         * @param price {number} Price
         */
        function set(productId, quantity, price) {
            var basket = get();
            var ob = getIndexOf(productId, basket);
            if (ob == -1) {
                basket.push({productId: productId, quantity: quantity, price:price});
            } else {
                basket[ob].quantity = quantity;
            }

            put(basket);
        }

        /**
         * @method add
         * @description Add product to basket or update it quantity and price if it exist in basket.
         * @param productId {number} Product Id
         * @param quantity {number} Quantity
         * @param price {number} Price
         */
        function add(productId, quantity, price) {
            var basket = get();
            var ob = getIndexOf(productId, basket);

            if (ob == -1) {
                basket.push({productId: productId, quantity: quantity, price:price});
            } else {
                basket[ob].quantity = basket[ob].quantity + quantity;
            }

            if (quantity >= 1) {
                Snackbar.show(quantity + " item(s) added to cart.");
                put(basket);
            }
            else
                Snackbar.error("Invalid quantity");
        }

        /**
         * @method remove
         * @description Remove single product from basket
         * @param productId Product Id to remove from cache.
         */
        function remove(productId) {
            var basket = get();
            var ob = getIndexOf(productId, basket);

            if (ob != -1) {
                basket.splice(ob, 1);
            }

            put(basket);
        }

        /**
         * @method removeAll
         * @description Clear all products from basket.
         */
        function removeAll() {
            put([]);
        }

        /**
         * @method getIndexOf
         * @description Get index of looking product in basket.
         * @param productId Product Id which looking for.
         * @param basket Data in which looking for.
         * @returns {number} Index of selected product or -1 if not exist.
         */
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