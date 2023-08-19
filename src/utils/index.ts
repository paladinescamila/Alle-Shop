import {useEffect, useState} from 'react';

/**
 * This function returns the total price of all products
 * @param {object[]} products - array of products
 * @returns {number} total price of all products
 */
export const getTotalPrice = (products: {product: Product; quantity: number}[]) =>
	products.reduce((total, {product, quantity}) => total + product.price * quantity, 0);

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

/**
 * This function changes the first letter of the text to uppercase
 * @param {string} text - text to format
 * @returns {string} formatted text
 */
export const formatText = (text: string) =>
	text.length > 0 ? text[0].charAt(0).toUpperCase() + text.slice(1) : '';

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
