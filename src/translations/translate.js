/*
 * This script utilizes Microsoft's translation API to translate English to
 * other languages. It will be used to implement localization.
 */
const request = require('request');
const uuidv4 = require('uuid/v4');
const fs = require('fs');
const localesFolder = "./locales/";

// Make sure you copy the subscription key from the translation resource on Azure
const subscriptionKey = "";


/*
 * Iterates over every locale supported
 * Makes an API call to MS-translate to translate the default text (in English)
 * Overwrites each locale's json file with the translations from the API
 */
const translate = async () => {
    locales = parseLocales(localesFolder);

    for (let locale of locales) {
        localeFile = `locales/${locale}.json`;
        let transData = JSON.parse(fs.readFileSync(localeFile));

        for (let key of Object.keys(transData)) {
            let options = {
                method: 'POST',
                baseUrl: 'https://api.cognitive.microsofttranslator.com/',
                url: 'translate',
                qs: {
                    'api-version': '3.0',
                    'to': locale
                },
                headers: {
                    'Ocp-Apim-Subscription-Key': subscriptionKey,
                    'Content-type': 'application/json',
                    'X-ClientTraceId': uuidv4().toString()
                },
                body: [{
                    'text': transData[key]
                }],
                json: true,
            };
            let result = await requestTranslation(options);
            transData[key] = result[0].translations[0].text;
        }

        fs.writeFile(localeFile, JSON.stringify(transData, null, 2), (err) => {
            if (err) return console.log(err);
            console.log('writing to ' + localeFile);
            console.log(transData);
        });
    }
}

/*
 * Parses locales created by react-intl-manager and create a JSON
 * that tells us whether a language is written from left to right
 * or right to left
 */
const parseLocales = (localesFolder) => {
    let locales = [];
    
    fs.readdirSync(localesFolder).forEach(file => {
        if (file.slice(0, 9) != 'whitelist')
            locales.push(file.split('.')[0])
    });

    console.log('Locales supported: ', locales);
    return locales
}

/*
 * Wraps the request into a promise so we can use async/await
 */
const requestTranslation = (options) => {
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) reject(error);
            if (response.statusCode != 200) {
                reject('Invalid status code <' + response.statusCode + '>');
            }
            resolve(body);
        });
    });
}

translate();

