import {useEffect, useState} from 'react';

/**
 * This function returns the total price of all products
 * @param {Array} products - array of products
 * @returns {number} total price
 */
export const getTotalPrice = (products: {product: Product; quantity: number}[]) => {
	const total = products.reduce((total, {product, quantity}) => total + product.price * quantity, 0);
	return Number(total.toFixed(2)).toLocaleString();
};

/**
 * This function changes the text to lowercase, removes special characters and spaces
 * @param {string} text - text to normalize
 * @returns {string} normalized text
 */
export const normalizeText = (text: string): string =>
	text
		.normalize('NFD') // Change to UNICODE
		.replace(/[\u0300-\u036f]/g, '') // Delete special characters
		.replace(/\s+/g, '') // Delete spaces
		.toLowerCase(); // Change to lowercase

/**
 * This function changes the first letter of the text to uppercase
 * @param {string} text - text to format
 * @returns {string} formatted text
 */
export const formatText = (text: string): string =>
	text.length > 0 ? text[0].charAt(0).toUpperCase() + text.slice(1) : '';

/**
 * This function returns flags about responsive
 * @returns {object} flags about responsive
 * @returns {boolean} flags.isDesktop - true if the screen is more than 1100px
 * @returns {boolean} flags.isSmallDesktop - true if the screen is between 800px and 1100px
 * @returns {boolean} flags.isTablet - true if the screen is between 700px and 800px
 * @returns {boolean} flags.isSmallTablet - true if the screen is between 600px and 700px
 * @returns {boolean} flags.isMobile - true if the screen is less than 600px
 */
export const useResponsive = () => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	const isDesktop = windowWidth >= 1100;
	const isSmallDesktop = windowWidth >= 800 && windowWidth < 1100;
	const isTablet = windowWidth >= 700 && windowWidth < 800;
	const isSmallTablet = windowWidth >= 600 && windowWidth < 700;
	const isMobile = windowWidth < 600;

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return {isDesktop, isSmallDesktop, isTablet, isSmallTablet, isMobile};
};
