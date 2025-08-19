
var neo4j = require('neo4j-driver');

const pool = (async () => {
    const URI = "neo4j://127.0.0.1:7687";
    const USER = "neo4j";
    const PASSWORD = "R3turnDnD";
    let driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));
    const serverInfo = await driver.getServerInfo();
    console.log("Connection establised");
    console.log(serverInfo);

    await driver.close();
})();

module.exports = pool;