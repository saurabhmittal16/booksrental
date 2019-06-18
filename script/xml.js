/* Script to parse XML to JSON */
const xml2js = require('xml2js');

const xmlParser = new xml2js.Parser({
  explicitArray: false,
  mergeAttrs: true,
});

module.exports = function parseXML(xml) {
    return new Promise((resolve, reject) => {
        xmlParser.parseString(xml, function(err, result) {
            if (err) reject("Erro");
            else resolve(result);
        });
    });
};
