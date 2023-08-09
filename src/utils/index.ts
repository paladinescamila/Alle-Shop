/**
 * This function returns the total price of all products
 * @param {Product[]} products - array of products
 * @returns {number} total price of all products
 */
export const totalPrice = (products: Product[]) =>
	products.reduce((sum, product) => {
		return sum + product.price;
	}, 0);
