const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');




(async () => {
	const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
	const options = {logLevel: 'info', output: 'html', onlyCategories: ['performance'], port: chrome.port};
	const urlList = [
		{
		title:"test site",
		url:"https://www.google.com"
		},


	]
	console.log(urlList)	
	for (let i = 0; i < urlList.length; i++) {
		const url = urlList[i];
		console.log(url)
		const runnerResult = await lighthouse( url.url, options);
		
		// `.report` is the HTML report as a string
		const reportHtml = runnerResult.report;
		fs.writeFileSync(url.title+'.html', reportHtml);

		// `.lhr` is the Lighthouse Result as a JS object
		console.log('Report is done for', runnerResult.lhr.finalDisplayedUrl);
	}

	await chrome.kill();
})();
