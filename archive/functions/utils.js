/**
 * Check if user is subscribed to Epic notification
 * @param {*} interaction
 * @param {string} jsonPathToRead
 * @returns true if found, false otherwise
 */
function isSubscribed(interaction, jsonPathToRead) {
    const jsonData = require(jsonPathToRead);
    let isFound = false;
    for (const keys in jsonData) {
        if (keys === interaction.user.username && jsonData[keys]['isSubscribed'] === true) {
            isFound = true;
        }
    }
    return isFound;
}
