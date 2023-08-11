/**
 * This function returns the total price of all products
 * @param {Product[]} products - array of products
 * @returns {number} total price of all products
 */
export const getTotalPrice = (products: Product[]) =>
	products.reduce((sum, product) => {
		return sum + product.price;
	}, 0);

/**
 * This function changes the text to lowercase, removes special characters and spaces
 * @param {string} text - text to normalize
 * @returns {string} normalized text
 */
export const normalizeText = (text: string) =>
	text
		.normalize('NFD') // Change to UNICODE
		.replace(/[\u0300-\u036f]/g, '') // Delete special characters
		.replace(/\s+/g, '') // Delete spaces
		.toLowerCase(); // Change to lowercase
