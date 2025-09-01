import { test, expect, describe } from 'vitest';
import { add, divide, multiply, substract } from './math.helper';

describe('math.helper.ts add', () => {
	// ARRANGE
	const numberOne: number = 2;
	const numberTwo: number = 2;

	test('should to return a number instance', () => {
		// ACT
		const result = add(numberOne, numberTwo);

		expect(typeof result).toBe("number");
	});

	test('should add two positive numbers', () => {
		// ACT
		const result = add(numberOne, numberTwo);

		// ASSERT
		expect(result).toBe(numberOne + numberTwo);
	});
});

describe('math.helper.ts substract', () => {
	// ARRANGE
	const numberOne: number = 2;
	const numberTwo: number = 4;

	test('should to return a number instance', () => {
		// ACT
		const result = substract(numberOne, numberTwo);

		// ASSERT
		expect(typeof result).toBe("number");
	});

	test('should substract two positive numbers', () => {
		// ACT
		const result = substract(numberOne, numberTwo);

		// ASSERT
		expect(result).toBe(numberOne - numberTwo);
	});
});

describe('math.helper.ts multiply', () => {
	// ARRANGE
	const numberOne: number = 10;
	const numberTwo: number = 9;
	test('should to return a number instance', () => {
		// ACT
		const result = multiply(numberOne, numberTwo);

		expect(typeof result).toBe("number");
	});
	test('should to multiply to numbers', () => {

		// ACT
		const result = multiply(numberOne, numberTwo);

		// ASSERT
		expect(result).toBe(numberOne * numberTwo);
	});
});

describe('math.helper.ts divide', () => {
	// ARRANGE
	const numberOne: number = 10;
	const numberTwo: number = 9;

	test('should to divide to numbers', () => {
		// ACT
		const result = divide(numberOne, numberTwo);

		// ASSERT
		expect(result).toBe(numberOne / numberTwo);
	});
});