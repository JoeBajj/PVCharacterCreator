// Function to calculate the bonus based on attribute value
function calculateBonus(value) {
    return (2 * Math.floor(value / 2) - 10) / 2;
}


document.addEventListener('DOMContentLoaded', function () {
    const characterForm = document.getElementById('character-form');
    const resultsDiv = document.getElementById('results');

    characterForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get attribute values from the form
        const attributes = {};
        attributes.strength = parseInt(document.getElementById('strength').value, 10);
        attributes.dexterity = parseInt(document.getElementById('dexterity').value, 10);
        attributes.constitution = parseInt(document.getElementById('constitution').value, 10);
        attributes.intelligence = parseInt(document.getElementById('intelligence').value, 10);
        attributes.wisdom = parseInt(document.getElementById('wisdom').value, 10);
        attributes.charisma = parseInt(document.getElementById('charisma').value, 10);

        // Calculate and display the attribute values and bonuses
        let resultsHTML = '<h2>Attribute Bonuses:</h2>';
        for (const attribute in attributes) {
            const bonus = calculateBonus(attributes[attribute]);
            resultsHTML += `<p>${attribute}: ${attributes[attribute]} (Bonus: ${bonus >= 0 ? '+' : ''}${bonus})</p>`;
        }

        resultsDiv.innerHTML = resultsHTML;
    });

    // Event listener for changing attribute values
    characterForm.addEventListener('input', function () {
        const attributes = characterForm.getElementsByTagName('input');
        for (let attribute of attributes) {
            const bonus = attribute.parentNode.nextElementSibling.querySelector('#' + attribute.id + '-bonus');
            const value = parseInt(attribute.value, 10);
            const attributeBonus = calculateBonus(value);
            bonus.textContent = `${attributeBonus >= 0 ? '+' : ''}${attributeBonus}`;
        }
    });


    
});