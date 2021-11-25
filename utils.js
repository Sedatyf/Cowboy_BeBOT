/**
 * @param  {Array} arr
 * @returns A random number based on the Array's length
 */
function generateRandomForArray(arr) {
    let rand = Math.random();
    rand *= arr.length;
    return Math.floor(rand);
}

module.exports = { generateRandomForArray };
