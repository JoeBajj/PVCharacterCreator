// Function to save character data
async function saveCharacterData() {
    try {
        const [fileHandle] = await window.showSaveFilePicker();
        if (fileHandle) {
            const writableStream = await fileHandle.createWritable();
            const characterData = 'Your character data here'; // Replace with your character data
            await writableStream.write(characterData);
            await writableStream.close();
            alert("Character data has been saved.");
        }
    } catch (error) {
        console.error('Error saving character data:', error);
    }
}

// Add click event listener to the "Save Character" button
const saveCharacterButton = document.getElementById('save-character-button');
saveCharacterButton.addEventListener('click', saveCharacterData);



 // Function to reset the character sheet
 function resetCharacterSheet() {
    // Add code here to reset the character sheet
    alert("Character sheet has been reset.");
}

// Function to load character data
function loadCharacterData() {
    // Add code here to load character data from another file
    alert("Loading character data...");
}