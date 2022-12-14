import { exampleInput, puzzleInput } from "./input/12.js";

/* === USER SETTINGS === */
let input = exampleInput;

// elevation = a-z
// currPos = S = a
// tgtPos = E = z
// nextPos <= currPos + 1 

// Find starting coordinates
function determineStartingCoordinates(input) {
	let coordinates;
	input.split('\n')
		.forEach((xAxis, yIndex, array) => xAxis.split('')
			.forEach((elevation, xCoordinate) => {
				let yCoordinate = array.length - 1 - yIndex;
				if (elevation === 'S') {
					coordinates =  {
						x: xCoordinate,
						y: yCoordinate,
					}
				}
			}));
	return coordinates;
};

let startingCoordinates = determineStartingCoordinates(input);

// Find ending coordinates
function determineEndingCoordinates(input) {
	let coordinates;
	input.split('\n')
		.forEach((xAxis, yIndex, array) => xAxis.split('')
			.forEach((elevation, xCoordinate) => {
				let yCoordinate = array.length - 1 -yIndex;
				if (elevation === 'E') {
					coordinates = {
						x: xCoordinate,
						y: yCoordinate,
					}
				}
			}));
	return coordinates;
};

let endingCoordinates = determineEndingCoordinates(input);

// Helper function to convert elevation letter to corresponding number
function convertElevationFromLetterToNumber(letter) {
	let letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',];
	if (letter === 'S') {
		return 0;
	} else if (letter === 'E') {
		return 25
	} else {
		return letters.indexOf(letter);
	}
};

// Construct heightmap (array of objects)
let heightmap = input.split('\n');
heightmap = heightmap.map(xAxis => xAxis.split(''));
heightmap = heightmap.map(xAxis => xAxis.map(elevation => {
	return {
		elevation: convertElevationFromLetterToNumber(elevation),
	};
}));
heightmap = heightmap.map((xAxis, yIndex, array) => xAxis.map((position, xCoordinate) => {
	let yCoordinate = array.length - 1 - yIndex;
	return {
		...position,
		coordinates: {
			x: xCoordinate,
			y: yCoordinate,
		},
	};
}));
heightmap = heightmap.map((xAxis, yIndex, array) => xAxis.map((position, xCoordinate) => {
	let adjacentPositions = { };
	adjacentPositions.north = yIndex > 0 ? array[yIndex - 1][xCoordinate] : null;
	adjacentPositions.east = xCoordinate < xAxis.length - 1 ? xAxis[xCoordinate + 1] : null;
	adjacentPositions.south = yIndex < array.length - 1 ? array[yIndex + 1][xCoordinate] : null;
	adjacentPositions.west = xCoordinate > 0 ? xAxis[xCoordinate - 1] : null;
	return {
		...position,
		adjacentPositions,
	};
}));

console.log(`Heightmap:`);
console.dir(heightmap, { depth: null });
console.log(`Starting Coordinates:`);
console.dir(startingCoordinates);
console.log(`Ending Coordinates:`);
console.dir(endingCoordinates);

// Find starting position
let startingPosition = heightmap.find(xAxis => {
	return xAxis.find(position => {
		return position.coordinates.x === startingCoordinates.x
			&& position.coordinates.y === startingCoordinates.y;
	});
})
	.find(position => {
		return position.coordinates.x === startingCoordinates.x
			&& position.coordinates.y === startingCoordinates.y;
	});

console.dir(startingPosition);
