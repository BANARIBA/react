interface User {
	id: string;
	name: string;
	age: number;
}

function greet(name: string): string {
	return `Hello ${name}`;
}

const greet2 = (name: string): string => `Hello ${name}`;

const getUser = (): User => ({
	id: 'abc-123',
	name: 'Goku Perez',
	age: 10,
});

const message = greet('Goku');

console.log(message);
console.log(greet2('Vegetta'));
console.log(getUser());

const numbers: number[] = [1, 2, 3, 4, 6];

numbers.forEach((value: number) => {
	console.log({ value: value });
});