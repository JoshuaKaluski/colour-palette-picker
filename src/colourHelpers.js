import chroma from 'chroma-js';

//Colour levels
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

//Generate different colour levels for a given palette
function generatePalette(starterPalette) {
    let newPalette = {
        paletteName: starterPalette.paletteName,
        id: starterPalette.id,
        emoji: starterPalette.emoji,
        colours: {}
    };

    //Add empty array for each colour level
    for (let level of levels) {
        newPalette.colours[level] = [];
    }

    //Generate scaled colours
    for (let colour of starterPalette.colours) {
        let scale = generateScale(colour.colour, 10).reverse();

        //Add each scaled colour to their respective array
        for (let i in scale) {
            newPalette.colours[levels[i]].push({
                name: `${colour.name} ${levels[i]}`,
                id: colour.name.toLowerCase().replace(/ /g, "-"),
                hex: scale[i],
                rgb: chroma(scale[i]).css(),
                rgba: chroma(scale[i]).css().replace("rgb", "rgba").replace(")", ", 1.0)")
            });
        }
    }
    return newPalette;
}

//Creates array with a range: (darker colour) colour.darken(1.4) -- colour -- end (AKA white)
function getRange(hexColour) {
    const end = "#fff";
    return [
        chroma(hexColour).darken(1.4).hex(),
        hexColour,
        end
    ]
}

//Generate colours on a scale of the colour levels
function generateScale(hexColour, numOfColours) {
    return chroma
        .scale(getRange(hexColour))
        .mode("lab")
        .colors(numOfColours);
}

export {generatePalette};