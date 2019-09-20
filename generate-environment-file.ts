require('dotenv').config();
const fs = require('fs');
const currentDirectory = __dirname;
const environmentFilePath = `${currentDirectory}/src/environments/environment.ts`;

const { API_URL, API_KEY } = process.env;

if (!API_KEY) {
	console.log('There is no API_KEY set. Please check your .env file or consult the README.');
} else if (!API_URL) {
	console.log('There is no API_URL set. Please check your .env file or consult the README.');
} else {
	const contents: string = JSON.stringify(
		{
			API_URL: process.env.API_URL,
			API_KEY: process.env.API_KEY
		},
		null,
		' '
	);

	const reportIfErrorOrSuccessful = error => {
		if (error) {
			const ERROR_MESSAGE = 'Sorry, something went wrong when writing the environment file.';
			console.log(ERROR_MESSAGE, { error });
		} else {
			console.log(`Environment was successfully written to ${environmentFilePath}`);
		}
	};

	const environmentFileContents = `//tslint:disable
  export const environment = ${contents};
  `;

	fs.writeFile(environmentFilePath, environmentFileContents, reportIfErrorOrSuccessful);
}
