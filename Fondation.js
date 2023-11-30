let pointsContainer = document.getElementById('Points-de-Fondation');
pointsContainer.value = 25
let starPeupleSkills = -1
let peuplePoints = 0
let starCultureSkills = 0
var valeurPrécédente = {
    'cultureSelectionScrollingMenu1': 0,
    'cultureSelectionScrollingMenu2': 0,
    'cultureSelectionScrollingMenu3': 0,
    'cultureSelectionScrollingMenu4': 0,
    'cultureSelectionScrollingMenu5': 0,
}
var previousDélaisséSkill = {
    'délaisséMenu1': 0,
    'délaisséMenu2': 0,
}
var previousDélaisséName = {
    'délaisséMenu1': '',
    'délaisséMenu2': '',
}
var peuplePrécédent = ''

var valeurPrécédente2 = {}
let currentStar = 0

//Peuple descriptions, cost and dependencies//
const peupleData = {
    Canevas: [
        { peupleskill: '', cost: 0},
        { peupleskill: "Carapace*", cost: 2, Description: "Lors de votre changement, vous obtenez les bénéfices suivants:<br>• Le nombre de Temporary Hit Points reçu est doublé.<br>• +1 AC."},
        { peupleskill: "Férocité*", cost: 2, Description: "Lors de votre changement, vous obtenez le bénéfice suivant: <br>• Vos dents s'acèrent ou un membre supplémentaire croit sur votre corps, vous permettant de faire une attaque supplémentaire (1d6 + str) losrque vous utilisez l'Attack Action." },
        { peupleskill: "Célérité*", cost: 2, Description: "Lors de votre changement, vous obtenez les bénéfices suivants:<br>• Votre vitesse augment de 10' (2 hex)<br>• Lorsqu'un adversaire termine son tour adjacent à vous, vous pouvez utiliser votre Reaction pour Disengage de 10' (2 hex)." },
        { peupleskill: "Chasse*", cost: 2, Description: "Lors de votre changement, vous obtenez les bénéfices suivants:<br>• Vous avez Advantage sur vos Wisdom Ability Checks <br>• Aucune créature à 30' (6 hex) et moins ne peut avoir Advantage contre vous, à moins que vous soyez Incapacitated <br>• Votre Changement dure 1 heure, ou jusqu'à ce que les Temporary Hit Points s'épuisent." },
        { peupleskill: "Voyageur*", cost: 3, Description: "Lors de votre changement, vous obtenez le bénéfice suivant: <br>• Choisissez Fly, Climb, Swim ou Burrow. Vous obtenez une vitesse de déplacement avec ce mode égal à votre Movement Speed. Si vous choisissez Swim, vous pouvez aussi respirer sous l'eau pour la durée du Changement." },
        { peupleskill: "Mimétisme*", cost: 8, Description: "Lors de votre changement, vous décidez de l'apparence que vous voulez prendre. La taille, le poids, les traits de votre visage, le son de votre voix, la couleur de votre peau, etc. Vos caractéristiques de jeu ne changent pas. Votre taille et votre forme restent les mêmes. <br> • Votre changement dure 24 heures, ou jusqu'à ce que les Temporary Hit Points s'épuisent." },
        { peupleskill: "Vision Nocturne", cost: 1, Description: "Vous avez Darkvision jusqu'à 60' (12 hex)." },
        { peupleskill: "Posé", cost: 5, Description: "Vous avez Advantage sur vos Composure Saves." },
        { peupleskill: "Changement Supplémentaire", cost: 4, Description: "Vous pouvez utiliser votre pouvoir de Changement une fois de plus entre les repos." },
        { peupleskill: "Pieds Légers", cost: 2, Description: "Vous ignorez le Difficult Terrain non magique et donnez Disadvantage aux gens qui tentent de vous pister." },
    ],
    Délaissé: [
        { peupleskill: '', cost: 0},
        { peupleskill: "Inébranlable", cost: 2, Description: "Lorsque vous seriez réduit à 0 Hit Points, vous pouvez choisir d'être réduit à 1 à la place. Recharge Long Rest" },
        { peupleskill: "L'un d'eux", cost: 1, Description: "Vous êtes immunisés aux habiletés spéciales des Undead, comme la paralysie des Goules ou la possession des Fantômes." },
        { peupleskill: "Loin de la Toile  ", cost: 6, Description: "Vous avez Advantage sur vos Saves contre la magie d'origine divine ou des plans externes." },
        { peupleskill: "Spectre", cost: 4, Description: "En Bonus Action, vous pouvez devenir incorporel pour un bref moment, prenant une apparence fantomatique. Jusqu'à la fin de votre tour, vous et vos possessions pouvez passer à travers d'autres créatures et objets. Si vous terminez votre tour dans un objet solide, vous êtes expulsés à la case libre la plus près de vous et prenez 1d10 Force Damage pour chaque 5' (1 hex) déplacés.<br>• Recharge Long Rest." },
        { peupleskill: "Corps de Métier", cost: 2, Description: "Vous avez un Preparedness Point supplémentaire, mais il nécessite de détacher une partie de votre corps pour devenir l'équipement désiré. La partie du corps nécessaire et les effets liés à sa perte temporaire sont à la discrétion du narrateur." },
        { peupleskill: "Résistance Nécrotique", cost: 2, Description: "Vous avez Resistance au Necrotic Damage" },
        { peupleskill: "Résistance Radiante", cost: 2, Description: "Vous avez Resistance au Radiant Damage" },
        { peupleskill: "Souvenirs d'une Vie Passée", cost: 3, Description: "Lorsque vous tentez un Ability Check, vous pouvez vous donner Advantage. Vous pouvez utiliser cette capacité un nombre de fois égal à votre Proficiency Bonus.<br>• Recharge Long Rest." },
        { peupleskill: "Vieilles Façons Mortelles", cost: 0, Description: "Achetez un Cadeau ou un Atout de votre espèce originale pour son coût normal. La prouesse innée peut aussi être achetée pour le coût de 5 points." },
        { peupleskill: "Anciennes Façons Mortelles", cost: 0, Description: "Achetez un Cadeau ou un Atout de votre espèce originale pour son coût normal. La prouesse innée peut aussi être achetée pour le coût de 5 points." },
    ],
    Drakéide: [
        { peupleskill: '', cost: 0},
        { peupleskill: "Souffle Puissant", cost: 4, Description: "Votre souffle inflige des d10 au lieu des d6." },
        { peupleskill: "Souffle Débilitant", cost: 4, Description: "Votre souffle inflige une condition débilitante à ceux qui ont le malheur de le subir. L'effet dépend de votre couleur." },
        { peupleskill: "Effroi", cost: 4, Description: "Lorsque vous utilisez votre Souffle Draconique, au lieu de l'effet habituel, vous pouvez choisir de forcer toutes les cibles de votre choix à l'intérieur d'un rayon de 30' (6 hex) à faire un Courage Save (DC 8 + Prof + Con), ou être Frightened pour 1 minute. Les cibles affectées peuvent tenter le Save à nouveau à chaque fois qu'elles subissent du dégât." },
        { peupleskill: "Résistance Draconique", cost: 3, Description: "Vous avez résistance à l'élément associé à votre couleur." },
        { peupleskill: "Griffes et Écailles", cost: 4, Description: "Lorsque vous ne portez pas d'armure, votre AC est de 13+ Dex. Aussi, vous avez des griffes sur chacune de vos mains qui ont les mêmes statistiques qu'un Dagger." },
        { peupleskill: "Cantrip", cost: 1, Description: "Vous connaissez un Cantrip, selon votre couleur." },
        { peupleskill: "Vision Nocturne", cost: 1, Description: "Vous avez Darkvision jusqu'à 60' (12 hex)." },
        { peupleskill: "Présence", cost: 2, Description: "Lorsque vous tentez un Ability Check de Persuasion ou d'Intimidation, vous pouvez vous donner Advantage. Vous pouvez utiliser cette capacité un nombre de fois égal à votre Proficiency Bonus.<br>• Recharge Long Rest." },
        { peupleskill: "Grands Poumons", cost: 5, Description: "Vous pouvez utiliser votre pouvoir de Souffle Draconique une fois de plus entre les repos." },
        { peupleskill: "Pacte de Sang", cost: 2, Description: "Vous pouvez lancer le sort Geas sur vous et une cible consentante.<br>• Recharge Long Rest." },
    ],
    Elfe: [
        { peupleskill: '', cost: 0},
        { peupleskill: "Commande", cost: 2, Description: "Vous pouvez lancer le sort Command.<br>• Recharge Long Rest." },
        { peupleskill: "Langue Divine", cost: 1, Description: "Lorsque vous parlez, toutes les créatures vous comprennent, qu'importe leur langage, si elles ont 3 d'Int ou plus." },
        { peupleskill: "Leadership", cost: 3, Description: "Lorsque vous êtes touchés par une attaque, vous pouvez utiliser votre Reaction pour donner un Expertise Dice jusqu'à la fin de votre prochain tour à tous vos alliés dans un rayon de 30' (6 hex).<br>• Recharge Short Rest." },
        { peupleskill: "Présence", cost: 2, Description: "Lorsque vous tentez un Ability Check de Persuasion ou d'Intimidation, vous pouvez vous donner Advantage. Vous pouvez utiliser cette capacité un nombre de fois égal à votre Proficiency Bonus.<br>• Recharge Long Rest." },
        { peupleskill: "Au delà de Culminance", cost: 6, Description: "Vous avez Advantage sur vos Saves contre la magie d'origine arcane ou élémentaire." },
        { peupleskill: "Âme Brûlante", cost: 5, Description: "En Action, votre corps répand une lumière irradiante pour une minute. Vous émettez de la lumière comme si vous étiez une torche. À la fin de chacun de vos tours, vous et toutes les créatures dans un rayon de 10' (2 hex) subissent du Radiant Damage égal à votre Proficiency Bonus. De plus, une fois par tour, lorsque vous faites des dégâts à une cible avec une attaque ou un sort, vous pouvez faire le double de votre Proficiency Bonus en Radiant Damage supplémentaire.<br>• Recharge Long Rest." },
        { peupleskill: "Marque Sombre", cost: 4, Description: "Vous avez un Expertise Dice sur vos Ability Checks de Stealth et de Disguise. Vous connaissez le Cantrip Minor Illusion. Les sorts de La Marque sont ajoutés à la liste de sorts que vous pouvez apprendre, si votre classe le permet. À partir du 3e niveau, vous pouvez lancer le sort Invisibility (Recharge Long Rest)." },
        { peupleskill: "Résistance Radiante", cost: 2, Description: "Vous avez Resistance au Radiant Damage" },
        { peupleskill: "Courtoisie", cost: 2, Description: "En Action, forcez jusqu'à deux créatures à faire un Sanity Save (DC 8 + Prof + Con) ou ne pas pouvoir vous attaquer pour la prochaine minute, ou jusqu'à ce que vous leur fassiez du dégât ou les affectiez négativement.<br>• Recharge Long Rest. " },
        { peupleskill: "Ne me laisse pas tomber à nouveau", cost: 3, Description: "Lorsqu'un allié roule un 1, vous pouvez utiliser votre Reaction afin de leur donner Advantage sur leur prochain d20 d'ici la prochaine minute." },
    ],
    Genasi: [
        { peupleskill: '', cost: 0},
        { peupleskill: "Résistance Élémentaire", cost: 3, Description: "Vous avez Resistance à l'élément associé à votre type. Si vous êtes un Genasi de Métal ou de Terre, vous ne pouvez jamais réduire les dégâts de plus de votre Proficiency Bonus." },
        { peupleskill: "Magie Élémentaire Mineure", cost: 1, Description: "Vous connaissez un Cantrip, selon votre type." },
        { peupleskill: "Magie Élémentaire", cost: 2, Description: "Vous connaissez un sort, selon votre type.<br>• Nécéssite Magie Élémentaire Mineure.<br>• Recharge Long Rest.", prerequisite: "Magie Élémentaire Mineure" },
        { peupleskill: "Magie Élémentaire Supérieure", cost: 3, Description: "Vous connaissez un sort, selon votre type.<br>• Nécéssite Magie Élémentaire.<br>• Recharge Long Rest.", prerequisite: "Magie Élémentaire"},
        { peupleskill: "Maitrîse Élémentaire", cost: 4, Description: "Vous connaissez un sort, selon votre type.<br>• Nécéssite Magie Élémentaire.<br>• Recharge Long Rest.", prerequisite: "Magie Élémentaire" },
        { peupleskill: "Vision Nocturne", cost: 1, Description: "Vous avez du Darkvision jusqu'à une distance de 60' (12 hex)." },
        { peupleskill: "Âme Primordiale", cost: 4, Description: "Vous obtenez un pouvoir lié à votre type.<br>• Recharge Short Rest." },
        { peupleskill: "Alimenter Élément", cost: 2, Description: "Lorsqu'un allié inflige du dégât d'un élément supporté par le vôtre, vous pouvez utiliser votre Reaction pour leur donner Advantage sur leur Damage Roll.<br>• Recharge Short Rest." },
        { peupleskill: "Absorber Élément", cost: 2, Description: "Lorsque vous subissez des dégâts de l'élément qui supporte le vôtre, vous pouvez utiliser votre Reaction pour réduire les dégâts de votre Proficiency Bonus et (Proficieny Bonus)d6 dégâts supplémentaires de votre élément sur votre prochaine attaque d'ici la fin de votre prochain tour.<br>• Recharge Long Rest." },
        { peupleskill: "Corps Élémentaire", cost: 2, Description: "Vous obtenez un pouvoir lié à votre type." },
    ],
    Homoncule: [
        { peupleskill: '', cost: 0},
        { peupleskill: "Vision Nocturne", cost: 1, Description: "Vous avez du Darkvision jusqu'à une distance de 60' (12 hex)." },
        { peupleskill: "Lentille Prototype", cost: 3, Description: "Vous pouvez voir jusqu'à une distance de 30 miles (31 680 hex), étant même capable de discerner et décrire certains détails, comme le nombre d'individus dans un group et ce qu'ils portent." },
        { peupleskill: "Bocal Loquace", cost: 2, Description: "Vous pouvez lancer le sort Speak with Dead, mais avec comme cible un objet au lieu d'un cadavre.<br>• Recharge Long Rest." },
        { peupleskill: "Empathie Inanimée", cost: 3, Description: "Vous pouvez lancer le sort Identify. Lorsque vous utilisez le sortilège, vous pouvez tenter de diminuer les pré-requis pour utiliser un objet ou d'augmenter le DC associé à ses effets.<br>• Recharge Long Rest." },
        { peupleskill: "Lecture de Chevet", cost: 3, Description: "Vous débutez avec deux skill Points dans un skill d'Intelligence de votre choix. Aussi, lorsque vous passez la nuit avec un livre dans vos bras, vous le lisez dans son entièreté." },
        { peupleskill: "Consommer Matière", cost: 3, Description: "Vous pouvez manger une livre de matière inanimée par minute. À partir de la 4e livre et pour chaque livre par la suite, vous devez faire un Fortitude Save(DC 6 + lbs mangées aujourd'hui) ou devenir Poisoned jusqu'à votre prochain Short Rest et ne plus pouvoir utiliser cette capacité pour 24h. Manger au moins 4 livres par jour permet à l'Homoncule de regagner un Hit Dice à son prochain Short Rest." },
        { peupleskill: "Facilement Oubliable", cost: 2, Description: "Vous avez un Expertise Dice sur vos Ability Checks de Stealth contre les créatures plus grandes que vous." },
        { peupleskill: "Usine Bredon", cost: 4, Description: "Vous avez un expertise dice sur vus Ability Checks de The City et de Calligrapher Supplies. Vous connaissez le Cantrip Message, et pouvez lancer le Sort Comprehend Languages (Recharge Long Rest). À Partir du 3e niveau, vous pouvez lancer le sort Magic Mouth (Recharge  Long Rest). Finalement, les sorts de l'Usine Bredon sont ajoutés à votre liste de sorts que vous pouvez apprendre, si votre classe le permet." },
        { peupleskill: "Usine Vaker", cost: 4, Description: "Vous avez un expertise dice sur vus Ability Checks de Arcana et avec un Artisan's Tool de votre choix. Vous connaissez le Cantrip Mending, et pouvez lancer le sort Magic Weapon (Recharge Long Rest). Votre version du sort dure 1h et ne nécéssite pas de Concentration. Finalement, les sorts de l'Usine Vaker sont ajoutés à votre liste de sorts que vous pouvez apprendre, si votre classe le permet." },
        { peupleskill: "Usine Karma", cost: 5, Description: "Vous avez un expertise dice sur vus Ability Checks de Awareness et de Escape Artist. Vous pouvez lancer les sorts Mage Armor et Alarm (chacun Recharge Long Rest). À partir du 3e niveau, vous pouvez aussi lancer le sort Arcane Lock(Recharge Long Rest). Finalement, les sorts de l'Usine Karma sont ajoutés à votre liste de sorts que vous pouvez apprendre, si votre classe le permet." },
    ],
    Humain: [
        { peupleskill: '', cost: 0},
        { peupleskill: "Âme Favorable", cost: 5, Description: "Vous avez seulement besoin de réussir 2 Death Saves lorsque vous êtes Dying." },
        { peupleskill: "Âme Communautaire", cost: 5, Description: "Lorsque vous manquez une attaque, ou échouez un Ability Check ou Saving Throw, vous pouvez utiliser votre Reaction pour avoir un bonus sur le jet égal au nombre d'alliés que vous pouvez voir dans un rayon de 30' (6 hex), jusqu'à un maximum de 5.<br>• Recharge Short Rest." },
        { peupleskill: "Homme-ou-Femme-à-Tout-Faire", cost: 5, Description: "Lorsque vous effectuez un Ability Check où vous n'ajoutez pas au moins votre proficiency bonus en entier, vous avez +1." },
        { peupleskill: "Kaméléon I", cost: 0, Description: "Choisissez un pouvoir de n'importe quelle culture pour son coût régulier. Le coût des pouvoir avec des * augmente cumulativement de 1 à partir du 3e." },
        { peupleskill: "Kaméléon II", cost: 0, Description: "Choisissez un pouvoir de n'importe quelle culture pour son coût régulier. Le coût des pouvoir avec des * augmente cumulativement de 1 à partir du 3e." },
        { peupleskill: "Kaméléon III", cost: 0, Description: "Choisissez un pouvoir de n'importe quelle culture pour son coût régulier. Le coût des pouvoir avec des * augmente cumulativement de 1 à partir du 3e." },
        { peupleskill: "Kaméléon IV", cost: 0, Description: "Choisissez un pouvoir de n'importe quelle culture pour son coût régulier. Le coût des pouvoir avec des * augmente cumulativement de 1 à partir du 3e." },
        { peupleskill: "Kaméléon V", cost: 0, Description: "Choisissez un pouvoir de n'importe quelle culture pour son coût régulier. Le coût des pouvoir avec des * augmente cumulativement de 1 à partir du 3e." },
        { peupleskill: "Touche-à-tout I", cost: 0, Description: "Choisissez un historique supplémentaire. Son coût est augmenté de 1." },
        { peupleskill: "Touche-à-tout II", cost: 0, Description: "Choisissez un historique supplémentaire. Son coût est augmenté de 2." },
    ],
    Jord: [
        { peupleskill: '', cost: 0},
        { peupleskill: "Peau Coriace", cost: 4, Description: "Lorsque vous ne portez pas d'armure, votre AC est de 17." },
        { peupleskill: "Costaud", cost: 3, Description: "Votre maximum de Hit Points augmente du double de votre Proficiency Bonus." },
        { peupleskill: "Pieds Stables", cost: 5, Description: "Vous avez Advantage sur vos Anchor Saves." },
        { peupleskill: "Inépuisable", cost: 1, Description: "Lorsque vous tentez un Ability Check de Endurance, Vous pouvez vous donner Advantage.<br>• Recharge Short Rest."},
        { peupleskill: "Frénésie", cost: 3, Description: "Lorsque vous subissez du dégât, vous pouvez utiliser votre Reaction pour ajouter un Expertise Dice à vos Damage Rolls jusqu'à la fin de votre prochain tour. Vous pouvez utiliser cette capacité un nombre de fois égal à votre Proficiency Bonus.<br>• Recharge Long Rest." },
        { peupleskill: "Imposant", cost: 2, Description: "Vous avez un Expertise Dice sur vos Ability Checks d'Intimidation contre les créatures plus petites que vous."},
        { peupleskill: "Hurlement", cost: 4, Description: "En Bonus Action, vous pouvez choisir de forcer toutes les cibles de votre choix à l'intérieur d'un rayon de 10'(2 hex) à faire un Courage Save (DC 8 + Prof + Con) ou être frightened jusqu'à la fin de votre prochain tour.<br>• Recharge Short Rest." },
        { peupleskill: "Poigne des Titans", cost: 4, Description: "Vous pouvez tenir une arme avec la propriété Heavy dans une seule main." },
        { peupleskill: "Puissante Poussée", cost: 2, Description: "Lorsque vous utilisez la Basic Manoeuvre Shove, la victime subit aussi les effets de Knockdown si elle échoue son Saving Throw."},
        { peupleskill: "Violence des Plaines", cost: 2, Description: "Lorsque vous faites un Critical Hit avec une Melee Attack, vous pouvez repousser la cible de 10'(2 hex) et lui infliger des dégâts supplémentaires égal au double de votre Proficiency Bonus." },
    ],
    Maimon: [
        { peupleskill: '', cost: 0},
        { peupleskill: "Queue Préhensile", cost: 1, Description: "Votre queue peut saisir des objets et effectuer d'autres taches simples. Elle peut soulever jusqu'au double de votre Strength Score en livres, mais ne peut pas attaquer ou faire de Somatic Components." },
        { peupleskill: "Mieux qu'un Bras", cost: 6, Description: "Votre queue peut vous soutenir si vous n'êtes pas Encumbered et peut manipuler des objets et faires des mouvements précis, vous permettant d'utiliser un Tool, un Light Weapon ou un Light Shield, ou encore de faire des Somatic Components. Votre queue peut faire d'autres taches de précision, à la discrétion du Narrateur.<br>• Nécessite Queue Préhensile.", prerequisite: "Queue Préhensile" },
        { peupleskill: "Né des Hauteurs", cost: 3, Description: "Vous avez Resistance au Cold et vous ignorez les effets des températures froides naturelles." },
        { peupleskill: "Froid Comme de la Glace", cost: 5, Description: "Vous avez Advantage sur vos Courage Saves." },
        { peupleskill: "Agile", cost: 2, Description: "Vous relever de Prone coûte seulement 5'(1 hex) de mouvement, et vous n'avez pas besoin d'un Running Start pour sauter la distance maximale."},
        { peupleskill: "Très Agile", cost: 5, Description: "La Bonus Action 5-foot-step réduit plutôt votre mouvement à 10'(2 hex).<br>• Nécessite Agile.", prerequisite:"Agile"},
        { peupleskill: "Amis Haut Placés", cost: 2, Description: "Vous pouvez communiquer avec n'importe quelle créature avec une Climb Speed." },
        { peupleskill: "Élusif", cost: 5, Description: "Lorsqu'un adversaire vous manque avec une attack, vous pouvez utiliser votre Reaction pour Disengage de 5'(1 hex)." },
        { peupleskill: "Singeries", cost: 1, Description: "Vous connaissez le Cantrip Vicious Mockery" },
        { peupleskill: "Vision Nocturne", cost: 1, Description: "Vous avez du Darkvision jusqu'à une distance de 60'(12 hex)." },
    ],
    Moloch: [
        { peupleskill: '', cost: 0},
        { peupleskill: "Prédateur", cost: 2, Description: "En Bonus Action, vous pouvez faire un Dash, tant que vous terminez votre tour plus près d'une créature Sanguine que vous ne l'avez débuté." },
        { peupleskill: "Frénésie", cost: 3, Description: "Lorsque vous subissez du dégât, vous pouvez utiliser votre Reaction pour ajouter un Expertise Dice à vos Damage Rolls jusqu'à la fin de votre prochain tour. Vous pouvez utiliser cette capacité un nombre de fois égal à votre Proficiency Bonus.<br>• Recharge Long Rest." },
        { peupleskill: "Jugulaire", cost: 2, Description: "Lorsque vous infligez du dégât à une créature Sanguine, vous pouvez augmenter le dégât du double de votre Proficiency Bonus.<br>• Recharge Short Rest." },
        { peupleskill: "Soif de Sang", cost: 4, Description: "Vous pouvez boire le sang d'une créature Sanguine consentante, ou d'une qui est Grabbed, Restrained ou incapacitated par vous. Faites une Melee Attack contre la cible, infligeant 1 Piercing + 1d6 Necrotic et réduisant ses Maximum Hit Points du même montant. Vous vous guérissea du dégât Necrotic infligé. Une cible réduite à 0 Hit Points par cette attaque meurt immédiatement. Une fois par jour, lorsque vous buvez du sang, vous éprouvez un puissant élan de vitalité, vous donnant les bonus suivants:<br>• Votre vitesse augmente de 10'(2 hex).<br>• Advantage sur vos Ability Checks de Strength ou de Dexterity pour 1 minute.<br>• Advantage sur vos Saving Throws de Anchor et de Reflex pour 1 minute." },
        { peupleskill: "Précision", cost: 6, Description: "Lorsque vous avez Advantage contre une créature Sanguine, vous roulez 3 dés et conservez le meilleur." },
        { peupleskill: "Sur la Piste", cost: 2, Description: "Avec une action, vous apprenez la direction de toutes les créatures Sanguines en dessous de la moitié de leur Hit Points à moins de 5 miles(5280 hex) de rayon. Vous avez Advantage sur les Ability Checks pour pister des créatures identifiées avec cet effet. Vous pouvez sentir le sang de cette manière pour 1 heure. Vous ne pouvez pas traquer la même créature avec cette capacité dans la même journée." },
        { peupleskill: "Marqué pour la Mort", cost: 2, Description: "En Action, maudissez un adversaire avec la Marque des Moloch. Le cible doit réussir un Composure Save ou vos attaques contre elle infligent 1d6 Necrotic Damage supplémentaire et sont des Critical Hits sur 19 et 20 pour la prochaine minute.<br>• Recharge Long Rest." },
        { peupleskill: "Mensonges d'une Proie", cost: 1, Description: "Vous avez un Expertise Dice sur vos Ability Checks d'Insight pour déceler les intentions d'une créature Sanguine." },
        { peupleskill: "Lire le Sang", cost: 1, Description: "Lorsque vous observez un groupe de créatures Sanguines pour 1 minute, vous savez qui a le plus et le moins de Strength, Dexterity, Constituion et Hit Point, et qui est le plus vieux et le plus jeune." },
        { peupleskill: "État d'alerte", cost: 7, Description: "Vous avez Advantage sur vos Reflex Saves, et vous avez un Expertise Dice sur vos Initiative Checks." },
    ],
    Oni: [
        { peupleskill: '', cost: 0},
        { peupleskill: "Force des Morts", cost: 2, Description: "Votre Strength Score est considéré comme plus élevé de 2 pour déterminer votre Carrying Capacity et pour ignorer les pénalités des Shields et des Armors." },
        { peupleskill: "Bitch, j'suis un fantôme", cost: 2, Description: "Lorsque vous subissez du dégât, vous pouvez utiliser votre Reaction pour devenir Invisible jusqu'à la fin de votre prochain tour, ou jusqu'à ce que vous attaquiez, fassiez du dégât ou forciez une créature à faire un Saving Throw.<br>• Recharge Short Rest." },
        { peupleskill: "Entre Deux Mondes", cost: 5, Description: "Lorsque vous utilisez votre Pas de Passage, vous devenez résistant à tous les types de dégâts sauf Force jusqu'au début de votre prochain tour.<br>• Recharge Short Rest." },
        { peupleskill: "De la Place Pour Deux", cost: 3, Description: "Lorsque vous utilisez votre Pas de Passage, vous pouvez transporter un allié avec vous." },
        { peupleskill: "L'Appel du Vide", cost: 5, Description: "Lorsque vous utilisez votre Pas de Passage, forcez une créature adjacente de votre choix à faire un Courage Save (DC 8 + Prof + Con), ou être Frightened jusqu'à la fin de votre prochain tour." },
        { peupleskill: "Yeux de Passage", cost: 3, Description: "En Bonus Action, vous pouvez voir les créatures invisibles et à travers la Magical Darkness pour 1 minute.<br>• Recharge Long Rest." },
        { peupleskill: "Thaumaturge", cost: 1, Description: "Vous connaissez le Cantrip Thaumaturgy." },
        { peupleskill: "Noirceur", cost: 3, Description: "Vous pouvez lancer le sort Darkness.<br>• Recharge Long Rest." },
        { peupleskill: "Fait d'ombre", cost: 1, Description: "Lorsque vous êtes dans du Dim Light ou du Darkness, vous avez Advantage sur vos Ability Checks de Stealth." },
        { peupleskill: "Deuxième Pas", cost: 5, Description: "Vous pouvez utiliser votre Pas de Passage une fois de plus entre les repos." },
    ],
    Skaven: [
        { peupleskill: '', cost: 0},
        { peupleskill: "Sournois", cost: 1, Description: "Vous pouvez partager la case d'une créature Medium ou plus grande, et les cases des autres créatures ne sont pas considérées comme du Difficult Terrain pour vous. " },
        { peupleskill: "Par le Bas", cost: 3, Description: "Lorsque vous débutez votre tour dans la case d'un adversaire, vous avez Advantage sur vos attaques contre eux." },
        { peupleskill: "Jamais vu un rat mort", cost: 5, Description: "Vous avez Advantage sur vos Fortitude Saves." },
        { peupleskill: "Jamais~ vu un rat mort", cost: 1, Description: "Lorsque vous seriez réduit à 0 Hit Points, vous pouvez utiliser votre réaction pour tenter un Fortitude Save (DC égal au dégât subit). Sur un succès, ignorez le dégât de l'attaque.<br>• Nécessite Jamais vu un rat mort. <br>• Recharge Long Rest.", prerequisite:"Jamais vu un rat mort" },
        { peupleskill: "Leste", cost: 5, Description: "Vous pouvez faire l'Action Disengage ou Hide avec une Bonus Action." },
        { peupleskill: "Naturellement Furtif", cost: 2, Description: "Vous pouvez tenter le Hide Action lorsque vous êtes derrière (ou dans) la case d'une créature Medium ou plus grosse." },
        { peupleskill: "Sang Noir", cost: 1, Description: "Lorsque vous roulez des Hit Dice, considerez n'importe quel jet sous la moyenne comme étant égal à la moyenne." },
        { peupleskill: "Cataplasme de Sang Noir", cost: 5, Description: "En action, vous pouvez perdre 1 Hit Point pour permettre à une créature de rouler un Hit Dice et de se guérir d'un montant supplémentaire égal au double de votre Proficiency Bonus. Vous pouvez utiliser cette capacité un nombre de fois égale à votre Proficiency Bonus.<br>• Nécessite Sang Noir.<br>• Recharge Long Rest.", prerequisite:"Sang Noir" },
        { peupleskill: "Poison de Sang Noir", cost: 4, Description: "Si vous avez Advantage contre la cible de votre attaque, vous pouvez dépenser un Hit Dice pour transformer une attaque régulière en Critical Hit.<br>• Nécessite Sang Noir.<br>• Recharge Long Rest.", prerequisite:"Sang Noir"  },
        { peupleskill: "Sang Noir Regénérateur", cost: 4, Description: "Lorsque vous vous guérissez avec la Dodge Action, vous vous guérissez aussi de la moitié de votre Proficiency Bonus au début de chacun de vos tours pour la prochaine minute, tant que vous êtes conscient et Bloodied.<br>• Nécessite Sang Noir.", prerequisite:"Sang Noir"  },
    ],
    Talin: [
        { peupleskill: '', cost: 0},
        { peupleskill: "Telle Mère, Telle Fille", cost: 3, Description: "En Bonus Action, vous pouvez absorber l'âme d'une créature morte depuis moins d'une minute. Gagnez votre choix entre le triple de votre Proficiency Bonus en Temporary Hit Points ou Advantage sur le jet de votre choix. Dans les deux cas, le bonus conféré cesse après 1 minute. Vous pouvez utiliser cette capacité un nombre de fois égale à votre Proficiency Bonus.<br>• Recharge Long Rest." },
        { peupleskill: "Refuser l'âme", cost: 1, Description: "Vous pouvez lancer le sort Gentle Repose.<br>• Recharge Long Rest." },
        { peupleskill: "Lévitation", cost: 3, Description: "Vous pouvez lancer le sort Levitate.<br>• Recharge Long Rest." },
        { peupleskill: "Souffle Éternel", cost: 2, Description: "Vous n'avez plus besoin de respirer." },
        { peupleskill: "Orage", cost: 5, Description: "En Action, un grand orage se met à tournoyer autour de vous, à 10' (2 hex) de rayon. Pour la prochaine minute, ou jusqu'à ce que vous perdiez votre concentration, les créatures dans la zone sont Deafened, les cases couvertes sont considérées comme du Difficult Terrain, et les Ranged Attacks qui passent à travers la zone sont fait avec Disadvantage. Une créature qui débute son tour ou entre dans la zone pour la première fois durant un tour subit du Thunder damage égal à votre Proficiency Bonus.<br>• Recharge Long Rest." },
        { peupleskill: "Foudre", cost: 4, Description: "En Action, vous projetez un nombre d'éclairs égal à votre Proficiency Bonus sur une ou plusieurs cibles. Chaque éclair est une attaque utilisant votre Constitution qui inflige 2d8 Lightning damage si elle touche.<br>• Recharge Long Rest." },
        { peupleskill: "Liaison d'âme", cost: 2, Description: "En Action, vous liez votre psychée à celle d'une autre créature que vous voyez à 30' (6 hex) ou moins de vous. Tant que votre psychée est liée, vous pouvez communiquer avec la créature, et elle avec vous. Le lien se brise si jamais l'un de vous deux s'éloigne de plus de 30' (6 hex) ou tombe inconscient." },
        { peupleskill: "Brouillard Mental", cost: 4, Description: "En Reaction, vous pouvez donner Advantage aux Sanity Saves et Resistance au Psychic Damage à la créature liée avec vous. Vous pouvez utiliser cette capacité un nombre de fois égale à votre Proficiency Bonus.<br>• Nécessite Liaison d'âme.<br>• Recharge Long Rest.", prerequisite:"Liaison d'âme" },
        { peupleskill: "Nescience", cost: 4, Description: "Lorsque vous liez votre esprit avec une créature, vous pouvez forcer la créature à faire un Sanity Save ou subir (Proficiency)d6 Psychic damage et soustraire un Expertise Dice de son prochain jet. La créature subit seulement la moitié des dégâts et aucun autre effet si elle réussit le Saving Throw.<br>• Nécessite Liaison d'âme.<br>• Recharge Short Rest.", prerequisite:"Liaison d'âme" },
        { peupleskill: "Lecture Mentale", cost: 2, Description: "Vous pouvez lancer le sort Detect thoughts.<br>• Recharge Long Rest." },
    ],
    TenguJour: [
        { peupleskill: '', cost: 0},
        { peupleskill: "Apprendre par l'Échec", cost: 3, Description: "Lorsque vous échouez un Ability Check, un Attack Roll, ou un Saving Throw, vous pouvez utiliser votre Reaction pour vous donner Advantage sur le même jet dans la prochaine minute. Vous pouvez utiliser cette capacité un nombre de fois égal à votre Proficiency Bonus.<br>• Recharge Long Rest." },
        { peupleskill: "Connaissant", cost: 2, Description: "Vous débutez avec deux skill Points supplémentaires." },
        { peupleskill: "Très Connaissant", cost: 3, Description: "Au premier niveau et à tous les deux niveaux par la suite, obtenez un skill Point supplémentaire.<br>• Nécessite Connaissant.",prerequisite:"Connaissant" },
        { peupleskill: "Mentor", cost: 3, Description: "En Bonus Action, vous pouvez donner un dé d'inspiration d'1d4 à un allié en dedans de 30' (6 hex). L'inspiration expire après 1 minutes si elle n'est pas utilisée. Vous pouvez utiliser cette capacité un nombre de fois égale à votre Proficiency Bonus.<br>• Recharge Long Rest." },
        { peupleskill: "Bond de Foi", cost: 1, Description: "En Bonus Action, gagnez une Fly Speed égale à votre vitesse de marche jusqu'à la fin de votre tour. Vous pouvez utiliser cette capacité un nombre de fois égal à votre Proficiency Bonus.<br>• Recharge Long Rest." },
        { peupleskill: "Envergure d'Amaù", cost: 7, Description: "Bond de Foi dûre maintenant 1 heure par utilisation.<br>• Nécessite Bond de Foi.", prerequisite:"Bond de Foi" },
        { peupleskill: "Gloire", cost: 4, Description: "En Action, gagnez (Proficiency)d6 Temporary Hit Points, retirez tous les effets de Fear et de Charm sur vous, devenant immunisé à ces effets pour la prochaine minute en plus d'ignorer toutes les pénalités associées à votre Fatigue ou votre Strife.<br>• Recharge Long Rest." },
        { peupleskill: "Triomphe du Jour", cost: 2, Description: "Vous pouvez lancer le sort Daylight.<br>• Recharge Long Rest." },
        { peupleskill: "Influence d'Ahanine", cost: 1, Description: "Lorsque vous subissez du Necrotic damage, vous pouvez utiliser votre Reaction pour gagner un montant de Temporary Hit Points égal au dégât reçu au début de votre prochain tour.<br>• Recharge Long Rest." },
        { peupleskill: "Symbiose", cost: 4, Description: "Relevez un cadavre en tant que Zombie sous votre contrôle pour 24 heures.<br>• Nécessite Influence d'Ahanine.<br>• Recharge Long Rest.",prerequisite:"Influence d'Ahanine" },
    ],
    TenguNuit: [
        { peupleskill: '', cost: 0},
        { peupleskill: "La Marde au Cloaque", cost: 4, Description: "Vous avez deux points de chance supplémentaires." },
        { peupleskill: "Malchance", cost: 2, Description: "Vous pouvez utiliser un point de chance pour forcer un adversaire dans un rayon de 15' (3 hex) à re-rouler un Ability Check, un Attack Roll, ou un Saving Throw." },
        { peupleskill: "Chance Contagieuse", cost: 2, Description: "Vous pouvez utiliser un point de chance pour forcer un allié dans un rayon de 15' (3 hex) à re-rouler un Ability Check, un Attack Roll, ou un Saving Throw." },
        { peupleskill: "Dindon de la Farce", cost: 2, Description: "Vous pouvez lancer le sort Hideous Laughter.<br>• Recharge Long Rest." },
        { peupleskill: "Bond de foi", cost: 1, Description: "En Bonus Action, gagnez une Fly Speed égale à votre vitesse de marche jusqu'à la fin de votre tour. Vous pouvez utiliser cette capacité un nombre de fois égal à votre Proficiency Bonus.<br>• Recharge Long Rest." },
        { peupleskill: "Envergure d'Ahanine", cost: 7, Description: "Bond de foi dûre maintenant 1 heure par utilisation.<br>• Nécessite Bond de foi.", prerequisite:"Bond de foi" },
        { peupleskill: "Sombre Plumage", cost: 3, Description: "Lorsque vous êtes dans du Dim Light ou du Darkness, vous pouvez faire le Hide Action en Bonus Action." },
        { peupleskill: "Tombée de la Nuit", cost: 3, Description: "Vous pouvez lancer le sort Darkness.<br>• Recharge Long Rest." },
        { peupleskill: "Influence d'Amaù", cost: 2, Description: "Lorsque vous recevez un effet de guérison magique, vous pouvez utiliser votre réaction pour maximiser le résultat du jet. Vous pouvez utiliser cette capacité un nombre de fois égal à votre Proficiency Bonus.<br>• Recharge Long Rest." },
        { peupleskill: "Symbiose", cost: 4, Description: "Relever un cadavre en tant que Zombie sous votre contrôle pour 24 heures.<br>• Nécessite Influence d'Amaù.<br>• Recharge Long Rest.",prerequisite:"Influence d'Amaù" },
    ],
    Triton: [
        { peupleskill: '', cost: 0},
        { peupleskill: "La Langue des Bas Fonds", cost: 2, Description: "Vous pouvez communiquer avec n'importe quelle créature avec une Swim Speed, qu'importe vos langages et vos Intelligence Scores." },
        { peupleskill: "Maître des Mers", cost: 2, Description: "Vous pouvez lancer le sort Animal Friendship sur n'importe quelle créature avec une Swim Speed.<br>• Recharge Long Rest." },
        { peupleskill: "Glissant", cost: 1, Description: "Vous avez Advantage sur vos Saving Throws contre des effets qui Grab ou Restrain, et vous avez Advantage sur vos Ability Checks de Escape Artist pour sortir de ces effets." },
        { peupleskill: "Courants Polaires", cost: 2, Description: "Vous avez Resistance au Cold Damage." },
        { peupleskill: "Nuage d'encre", cost: 2, Description: "Vous pouvez lancer le sort Fog Cloud. Recharge Long Rest." },
        { peupleskill: "Écailles", cost: 3, Description: "Lorsque vous ne portez pas d'armure, votre AC est de 13+Dex." },
        { peupleskill: "Appel des Profondeurs", cost: 3, Description: "Vous pouvez lancer le sort Enthrall.<br>• Recharge Long Rest." },
        { peupleskill: "Acalmie", cost: 6, Description: "Après un Short Rest, vous gagnez le double de votre Proficiency Bonus en Temporary Hit Points. Sinon, une fois entre chaque Long Rest, vous pouvez choisir de regagner un sort d'un niveau égal ou moindre à votre Proficiency Bonus." },
        { peupleskill: "Mucus Empoisonné", cost: 5, Description: "En Bonus Action, vous pouvez frotter une de vos armes contre votre peau pour la couvrir de poison. Votre prochaine attaque qui touche force la cible à faire un Fortitude Save, ou subir (Proficiency)d4 Poison damage. Vous pouvez aussi imposer le Saving Throw à un adversaire qui vous Grab avec votre Reaction. Vous pouvez utiliser cette capacité deux fois.<br>• Recharge Short Rest." },
        { peupleskill: "Mucus Suintant", cost: 4, Description: "Votre Mucus impose aussi la condition Poisonned sur un échec du Saving Throw. Par ailleurs, vos alliés peuvent aussi prendre une Bonus Action pour enduire leur arme de votre Mucus.<br>• Nécessite Mucus empoisonné.", prerequisite:"Mucus Empoisonné" },
    ],
  };
//Culture descriptions, costs and dependencies//
  const cultureData = {
    Ashvattha: [
        { cultureskill: "Wilderness*", cost: 2, Description: "Vous débutez avec deux Skill Points dans Wilderness." },
        { cultureskill: "Climb*", cost: 2, Description: "Vous débutez avec deux Skill Points dans Climb." },
        { cultureskill: "Acrobatics*", cost: 2, Description: "Vous débutez avec deux Skill Points dans Acrobatics." },
        { cultureskill: "Cadeau de l'Arbre", cost: 5, Description: "Vous êtes Proficient et débutez avec une pièce d'équipement Verdoyant." },
        { cultureskill: "Murmures de la brise", cost: 2, Description: "En observant le ciel pour 1 minute, vous pouvez prévoir la météo des 24 prochaines heures. Vous ne pouvez pas percevoir des changements magiques, mais vous aurez l'opportunité de faire un Ability Check pour les constater." },
        { cultureskill: "Compagnon", cost: 2, Description: "Vous avez un animal de compagnie. Voir Narrateur pour les détails." },
        { cultureskill: "Pouce-Vert", cost: 4, Description: "Vous pouvez faire pousser et créer de l'équipement Verdoyant." },
    ],
    Cloison: [
        { cultureskill: "Swim*", cost: 2, Description: "Vous débutez avec deux Skill Points dans Swim." },
        { cultureskill: "Deception*", cost: 2, Description: "Vous débutez avec deux Skill Points dans Deception." },
        { cultureskill: "Awareness*", cost: 2, Description: "Vous débutez avec deux Skill Points dans Awareness." },
        { cultureskill: "Entrainement", cost: 4, Description: "Vous êtes Proficient avec le Light Armor et les Light Shields, ainsi qu'une Melee Martial Weapon et une Ranged Martial Weapon de votre choix." },
        { cultureskill: "Cuisine de quartier", cost: 3, Description: "Lorsque vous débutez un Short Rest, vous et chacun de vos alliés qui consomme un Supply gagne un nombre de Temporary Hit Points égal à 1d6+votre Proficiency Bonus." },
        { cultureskill: "Communauté", cost: 1, Description: "Vous avez une habileté presque surnaturelle à garder l'oeil sur vos compagnons. Tant qu'un allié est à moins de 60' (12 hex) de vous, vous connaissez toujours sa localisation et son état de santé général, même si vous ne pouvez pas le voir ou le sentir autrement." },
        { cultureskill: "Coudes serrés", cost: 4, Description: "Vous pouvez utiliser le Help Action avec une Bonus Action et la portée de l'action est augmentée à 15' (3 hex)." },
    ],
    Coron: [
        { cultureskill: "Persuasion*", cost: 2, Description: "Vous débutez avec deux Skill Points dans Persuasion." },
        { cultureskill: "Tactics and Logistics*", cost: 2, Description: "Vous débutez avec deux Skill Points dans Tactics and Logistics." },
        { cultureskill: "Power*", cost: 2, Description: "Vous débutez avec deux Skill Points dans Power." },
        { cultureskill: "Style bien à vous", cost: 4, Description: "Vous êtes Proficient et débutez avec une Rare Weapon ou une Rare Armor." },
        { cultureskill: "Le flair pour l'aubaine", cost: 3, Description: "Vous avez un Expertise Dice sur vos Ability Checks fait pour négocier un prix. Aussi, vous connaissez automatiquement la valeur de tout bien précieu que vous manipulez pendant 1 minute." },
        { cultureskill: "Caravanier", cost: 3, Description: "Vous pouvez créer un Cart ou un Wagon à partir de matériaux très limités en seulement 30 minutes. Votre véhicule fonctionne exactement comme un normal, sauf qu'il a la moitié des Hit Points et est automatiquement détruit s'il subit un Critical Hit." },
        { cultureskill: "Combattant Captivant", cost: 2, Description: "Vous avez un Expertise Dice sur vos Ability Checks de Charisma sur quelqu'un qui vous a vu combattre dans les 24 dernières heures." },
    ],
    GrisGallons: [
        { cultureskill: "Disguise*", cost: 2, Description: "Vous débutez avec deux Skill Points dans Disguise." },
        { cultureskill: "Thievery*", cost: 2, Description: "Vous débutez avec deux Skill Points dans Thievery." },
        { cultureskill: "Escape Artist*", cost: 2, Description: "Vous débutez avec deux Skill Points dans Escape Artist." },
        { cultureskill: "Entouré d'armes", cost: 3, Description: "Vous êtes Proficient avec les Improvised Weapons et infligez du dégât supplémentaire avec celles-ci." },
        { cultureskill: "Jamais au dépourvu", cost: 2, Description: "Vous avez un Preparedness Point supplémentaire." },
        { cultureskill: "Faim d'oiseau", cost: 4, Description: "Vous pouvez ignorer les effets associés au manque de Supply pour les trois premiers jours d'un voyage." },
        { cultureskill: "Fondre dans foule", cost: 2, Description: "Vous avec un Expertise Dice sur vos Ability Checks pour éviter d'être détecter dans un centre urbain." },
    ],
    LeCendrier: [
        { cultureskill: "Endurance*", cost: 2, Description: "Vous débutez avec deux Skill Points dans Endurance." },
        { cultureskill: "Old World*", cost: 2, Description: "Vous débutez avec deux Skill Points dans Old World." },
        { cultureskill: "Dungeoneering*", cost: 2, Description: "Vous débutez avec deux Skill Points dans Dungeoneering." },
        { cultureskill: "Morceau du Vieux-Monde", cost: 6, Description: "Vous êtes Proficient et débutez avec un morceau de Trace." },
        { cultureskill: "Nouveau jour, même merde", cost: 1, Description: "Vous ignorez toutes les pénalités associés au Lifestyle." },
        { cultureskill: "Heures supplémentaires", cost: 2, Description: "La première fois que votre Fatigue ou votre Strife augmenterait après un Long Rest, ignorez le." },
        { cultureskill: "Détection de Trace", cost: 4, Description: "En inspectant un morceau présumé de Trace pendant 10 minutes, vous pouvez déterminer s'il s'en agit, sa valeur approximative et sa puissance. Recharge Long Rest." },
    ],
    LePlateau: [
        { cultureskill: "Religion*", cost: 2, Description: "Vous débutez avec deux Skill Points dans Religion." },
        { cultureskill: "The City*", cost: 2, Description: "Vous débutez avec deux Skill Points dans The City." },
        { cultureskill: "Insight*", cost: 2, Description: "Vous débutez avec deux Skill Points dans Insight." },
        { cultureskill: "Dévoué", cost: 3, Description: "Vous êtes Proficient et débutez avec l'arme et l'armure d'un Dieux choisi." },
        { cultureskill: "Connections", cost: 4, Description: "Vous débutez avec un Allié supplémentaire. Il s'agit d'une personne influente du Plateau." },
        { cultureskill: "Richesses", cost: 4, Description: "Vous débutez avec une somme d'argent supplémentaire et une relique familiale." },
        { cultureskill: "Discrètement Armé", cost: 1, Description: "Vous avez un Expertise Dice sur vos Ability Checks fait pour convaincre les gens de vous laisser vos armes ou pour cacher vos armes ou autres objets sur votre personne." },
    ],
    Phénandre: [
        { cultureskill: "Arcana*", cost: 2, Description: "Vous débutez avec deux Skill Points dans Arcana." },
        { cultureskill: "Medecine*", cost: 2, Description: "Vous débutez avec deux Skill Points dans Medecine." },
        { cultureskill: "Concentration*", cost: 2, Description: "Vous débutez avec deux Skill Points dans Concentration." },
        { cultureskill: "Uniforme Universitaire", cost: 4, Description: "Vous êtes Proficient et débutez avec des Robes Phénanciennes." },
        { cultureskill: "Champ d'étude", cost: 3, Description: "Choisissez Architecture, Beaux-Arts, Mathématiques, Médecine ou Métaphysique. Vous obtenez un bénéfice lié à votre spécialité - Voir Narrateur." },
        { cultureskill: "Corps à la science", cost: 2, Description: "Lorsque votre maximum de Hit Points ou Ability Scores serait réduit, il est réduit de la moitié seulement (minimum 1)." },
        { cultureskill: "Alchimie", cost: 3, Description: "Vous pouvez créer des potions et des onguents - Vous êtes proficient et débutez avec des Alchemist's Tools." },
    ],
    ProjetFrontière: [
        { cultureskill: "Wilderness*", cost: 2, Description: "Vous débutez avec deux Skill Points dans Wilderness." },
        { cultureskill: "Old World*", cost: 2, Description: "Vous débutez avec deux Skill Points dans Old World." },
        { cultureskill: "Stealth*", cost: 2, Description: "Vous débutez avec deux Skill Points dans Stealth." },
        { cultureskill: "Sheriff", cost: 6, Description: "Vous êtes Proficient et débutez avec un Firearm." },
        { cultureskill: "Comme le fond de ma poche", cost: 3, Description: "Vous pouvez faire un Journey Activity spécial une fois par Long Rest qui récolte 2 Supply par jour, ou 5d de components." },
        { cultureskill: "Le monde est petit", cost: 2, Description: "Vous connaissez tout le monde des projets frontières et vous êtes aimé de tous." },
        { cultureskill: "Maîtres chez nous", cost: 4, Description: "Tant que vous êtes hors-terre, vous avez un Expertise Dice sur vos Journey Activities. Sauf dans les montagnes. On ne va pas dans les montagnes." },
    ],
    TroisPointes: [
        { cultureskill: "Streetwise*", cost: 2, Description: "Vous débutez avec deux Skill Points dans Streetwise." },
        { cultureskill: "Stealth*", cost: 2, Description: "Vous débutez avec deux Skill Points dans Stealth." },
        { cultureskill: "Intimidation*", cost: 2, Description: "Vous débutez avec deux Skill Points dans Intimidation." },
        { cultureskill: "C'est quoi lui, y'a un gun?", cost: 6, Description: "Vous êtes Proficient et débutez avec une Firearm." },
        { cultureskill: "Dormir d'un Oeil", cost: 1, Description: "Vous avec un Expertise Dice sur vos Ability Checks pendant votre tour de garde." },
        { cultureskill: "Gang de Rue", cost: 3, Description: "Vous faites partie, ou êtes en de très bons termes, avec une Gang de Trois-Pointes." },
        { cultureskill: "Bricoleur Créatif", cost: 3, Description: "Vous pouvez créer des gadgets et des gogosses. Vous êtes Proficient et débutez avec des Tinker's Tools." },
    ],
    ValléedYlère: [
        { cultureskill: "Disguise*", cost: 2, Description: "Vous débutez avec deux Skill Points dans Disguise." },
        { cultureskill: "Endurance*", cost: 2, Description: "Vous débutez avec deux Skill Points dans Endurance." },
        { cultureskill: "Climb*", cost: 2, Description: "Vous débutez avec deux Skill Points dans Climb." },
        { cultureskill: "Leçons de l'Homme-Vert", cost: 5, Description: "Vous avec un livre de sort avec deux Cantrips de Cleric de votre choix. Choisissez un sort niveau 1 de Cleric. Vous pouvez lancer le sort choisi, ou l'un des sorts Animal Friendship ou Speak with Animals, un nombre de fois égal à la moitié de votre proficiency bonus. Vous pouvez aussi utiliser de vos Spell Slots pour lancer ces sorts.<br>Recharge Long Rest." },
        { cultureskill: "Foulard Jaune", cost: 3, Description: "Lorsqu'un allié à moins de 30' (6 hex) de vous échoue un Courage Saving Throw. Vous pouvez utiliser votre réaction pour lui permettre de rouler contre l'effet à nouveau au début de son prochain tour.<br>Recharge Short Rest." },
        { cultureskill: "Non-Croyant", cost: 4, Description: " Lorsque vous tentez un Saving Throw contre un sort ou un effet magique, avant de rouler, vous pouvez choisir d'ajouter un dé d'expertise. Vous pouvez utiliser cette capacité un nombre de fois égale à votre Proficiency Bonus.<br>Recharge Long Rest." },
        { cultureskill: "Unis face au Tyrant", cost: 2, Description: "Lorsque vous faites un Group Check, vous êtes considéré comme ayant un nombre de rang dans le Skill égal au meilleur de votre groupe." },
    ],
    // Add other cultures and their cultureskills
};

//Historique descriptions and cost//
const historiqueData = {
    Criminel:[
        {historiqueskill:"Polisson", cost: 2, Description: "• Vous débutez avec 2 Skill Points à investir parmi Escape Artist, Stealth, Thievery.<br>• Vous avez toujours accès à un Lifestyle pauvre, même sans dépenses.<br>• Vous avez grandit dans les rues de la ville, beaucoup de visages vous sont familiers, et le vôtre l'est pour eux... "},
        {historiqueskill:"Scélérat", cost: 4, Description: "• Vous débutez avec 3 Skill Points à investir parmi Escape Artist, Stealth, Thievery.<br>• Vous pouvez communiquer en Thieve's Cant.<br>• Est-ce que l'on peut vraiment échapper à la vie de criminel...?"},
        {historiqueskill:"Empoisonneur", cost: 5, Description: "• Vous débutez avec 3 Skill Points à investir parmi Escape Artist, Stealth, Thievery.<br>• Vous êtes Proficient et débutez avec des Poisoncrafter's Tools.<br>• Votre ancienne clientèle ne vous a pas oublié pour autant..."}
    ],
    Érudit:[
        {historiqueskill:"Savant", cost: 2, Description: "• Vous débutez avec 2 Skill Points à investir parmi Awareness, Concentration, Medecine.<br>• Si vous passez votre Downtime à chercher la réponse à une question et que vous avez accès à une bibliothèque, vous réussissez (presque toujours) automatiquement.<br>• Vous connaissez parfois des choses particulièrement nichées..."},
        {historiqueskill:"Artiste", cost: 4, Description: "• Vous débutez avec 3 Skill Points à investir parmi Awareness, Concentration, Medecine.<br>• Vous pouvez offrir une performance artistique pour améliorer la qualité de votre lifestyle d'un niveau, jusqu'à un maximum d'un lifestyle riche.<br>• Des gens appréciant votre art pourraient vous porter une attention particulière..."},
        {historiqueskill:"Caligraphe", cost: 5, Description: "• Vous débutez avec 3 Skill Points à investir parmi Awareness, Concentration, Medecine.<br>• Vous êtes Proficient et débutez avec des Caligrapher's Tools.<br>• Des fois, vous avez l'impression que tous les anciens langages se ressemblent..."}
    ],
    Marchand:[
        {historiqueskill:"Commerçant", cost: 2, Description: "• Vous débutez avec 2 Skill Points à investir parmi Persuasion, Streetwise, The City.<br>• Si vous rapportez un bien en demande dans un établissement urbain, votre Lifestyle augmente d'un niveau, jusqu'à un maximum de riche.<br>• Des opportunités lucratives se rendent parfois à vos oreilles..."},
        {historiqueskill:"Agent Corporatif", cost: 3, Description: "• Vous débutez avec 3 Skill Points à investir parmi Persuasion, Streetwise, The City.<br>• Votre réputation avec une Corporation est augmentée de 1.<br>• Les Corporations ne sont pas reconnus offrir clémence sans n'attendre rien en retour..."},
        {historiqueskill:"Artisan", cost: 5, Description: "• Vous débutez avec 3 Skill Points à investir parmi Persuasion, Streetwise, The City.<br>• Vous êtes Proficient et débutez avec un Artisan's Tools de votre choix.<br>• Vous avez encore cette demande de commission spéciale absurde que l'on vous a donné quand vous veniez de débuter..."}
    ],
    Mystico:[
        {historiqueskill:"Incompris", cost: 2, Description: "• Vous débutez avec 2 Skill Points à investir parmi Arcana, Deception, Old World.<br>• Vous avez une voix dans votre tête qui vous conseille, peut-être votre conscience ou encore une haute puissance cosmique - qui sait?<br>• Votre voix intérieure ne vous a jamais mis sur le mauvais chemin à ce jour..."},
        {historiqueskill:"Traceur", cost: 4, Description: "• Vous débutez avec 3 Skill Points à investir parmi Arcana, Deception, Old World.<br>• Vous êtes Proficient et débutez avec des Tracer's Tools.<br>• Vos talents sont très en demande. Certains diraient trop en demande, mais on ne les a pas revus depuis qu'on est venu leur faire une offre..."},
        {historiqueskill:"Insuffleur", cost: 5, Description: "• Vous débutez avec 3 Skill Points à investir parmi Arcana, Deception, Old World.<br>• Vous êtes Proficient et débutez avec des Infuser's Tools.<br>• Les rumeurs disent que souffler de la Trace serait dangeureux pour l'âme..."}
    ],
    Religieux: [
        { historiqueskill: "Acolyte", cost: 2, Description: "• Vous débutez avec 2 Skill Points à investir parmi Disguise, Insight, Religion.<br>• Vous êtes éduqué pour faire les rites d'un Dieu en particulier et êtes récompensé d'un niveau de lifestyle lorsque vous les performez pour une communauté.<br>• Vous avez entendu un murmure dans vos rêves, mais il n'a fait que flouter votre destin... " },
        { historiqueskill: "Ex-Cultiste", cost: 3, Description: "• Vous débutez avec 3 Skill Points à investir parmi Disguise, Insight, Religion.<br>• Vous pouvez reconnaître les signes d'appels de votre culte et connaissez leurs pratiques. Si vous passez votre Downtime à chercher de l'information à propos de votre Culte et ses activités, vous réussissez (presque toujours) automatiquement.<br>• Personne de votre culte ne pourrait vous reconnaître, vous portiez toujours votre masque, n'est-ce pas...?" },
        { historiqueskill: "Advokiste", cost: 5, Description: "• Vous débutez avec 3 Skill Points à investir parmi Disguise, Insight, Religion.<br>• Vous représentez la Loi du Juge là où vous allez et votre personne est généralement tenue en haute estime. Vous pouvez généralement trouver une personne pieuse (ou en besoin d'indulgence) qui vous offrira l'équivalent d'un Lifestyle riche à ses frais. <br>• Rares sont les cadeaux qui ne sont pas accompagnés d'une requête..." },      
    ],
    Robuste:[
        {historiqueskill:"Garde", cost: 2, Description: "• Vous débutez avec 2 Skill Points à investir parmi Acrobatics, Intimidation, Tactics and Logistics.<br>• Les simples Métropolitains assument que vous êtes toujours membre de la garde de votre quartier et seront plus ouverts et cléments avec vous.<br>• Ce ne sont pas tous les habitants du quartier qui aiment leur garde locale..."},
        {historiqueskill:"Mercenaire", cost: 4, Description: "• Vous débutez avec 3 Skill Points à investir parmi Acrobatics, Intimidation, Tactics and Logistics.<br>• Les mercenaires se tiennent au courant entre eux. Lorsque vous croisez un mercenaire ou un soldat qui n'est pas en poste, il sera bien ouvert à vous échanger les histoires, potins et opportunités locales. Lorsque sur un contrat ou en poste, ils seront généralement moins bavard, mais demeureront ouvert à répondre à vos questions et vous traiteront avec respect.<br>• Vous avez abandonné cette vie suite a un contrat mal tourné..."},
        {historiqueskill:"Gladiateur", cost: 5, Description: "• Vous débutez avec 3  Skill Points à investir parmi Acrobatics, Intimidation, Tactics and Logistics.<br>• Lorsque vous échouez un jet lors de Downtime vous pouvez réclamer un duel gladiatorial pour tenter d'obtenir ce vous souhaitiez.<br>• Les gladiateurs sont des quasi-célébrités dans la Métropole, pour le meilleur et pour le pire..."}
    ],
    Travailleur:[
        {historiqueskill:"Fermier", cost: 2, Description: "• Vous débutez avec 2 Skill Points à investir parmi Dungeoneering, Endurance, Power.<br>• Vous pouvez transporter 2 Supply de plus.<br>• Quelque chose a forcé votre main à l'aventure..."},
        {historiqueskill:"Mineur", cost: 4, Description: "• Vous débutez avec 3 Skill Points à investir parmi Dungeoneering, Endurance, Power.<br>• Vous êtes Proficient et débutez avec des Miner's Tools.<br>• Personne n'a autant mainmise sur une industrie que Karpov sur le secteur minier..."},
        {historiqueskill:"Maçon", cost: 5, Description: "• Vous débutez avec 3 Skill Points à investir parmi Dungeoneering, Endurance, Power.<br>• Vous êtes Proficient et débutez avec des Masons's Tools.<br>• Il y a des murmures comme quoi il existerait un regroupement secrèt de maçons..."}
    ],
    Vagabond:[
        {historiqueskill:"Exilé", cost: 2, Description: "• Vous débutez avec 2 Skill Points à investir parmi Climb, Swim, Wilderness.<br>• Votre piètre réputation et l'expérience de vie unique venant avec elle vous est parfois pratique pour interagir avec d'autres figures solitaires ou reniées. Ce genre d'individu sera plus ouvert à converser avec vous et répondre à vos questions.<br>• Votre nom est encore sur les lèvres de votre quartier natif, et peu de positif y est associé..."},
        {historiqueskill:"Voyageur", cost: 3, Description: "• Vous débutez avec 3 Skill Points à investir parmi Climb, Swim, Wilderness.<br>• Vous pouvez effectuer votre Downtime comme si vous étiez dans deux établissements.<br>• Autant de va-et-viens finissent par attirer l'attention, et qui sait réellement qui scrute les grandes routes..."},
        {historiqueskill:"Rescapé", cost: 5, Description: "• Vous débutez avec 3 Skill Points à investir parmi Climb, Swim, Wilderness.<br>• Vous êtes Proficient et débutez avec un Survivor's Tools de votre choix.<br>• L'on raconte que vous êtes sortis des murs, mais vous-même n'en êtes pas certain..."}
    ],


}

function updateDedicaceCost(){
    
    dédicaceData.Connecté.cost = 5
    dédicaceData.Choisi.cost = 6
    dédicaceData.Prévoyant.cost = 5
    dédicaceData.Ritualiste.cost = 6

    const historiqueskillsContainer = document.getElementById('historiqueskills-container')
    var checkedCheckboxes = historiqueskillsContainer.querySelectorAll('input[type="checkbox"]:checked')
    checkedCheckboxes.forEach(checkbox => {
    //Criminel//
      if (checkbox.id == 'Polisson' || checkbox.id == 'Scélérat' || checkbox.id == 'Empoisonneur'){
        dédicaceData.Connecté.cost --
        if (checkbox.id == 'Scélérat'){
            dédicaceData.Connecté.cost --
        }   
      }
    //Érudit//
      if (checkbox.id == 'Savant' || checkbox.id == 'Artiste' || checkbox.id == 'Caligraphe') {
        dédicaceData.Ritualiste.cost --
        if (checkbox.id == 'Savant'){
            dédicaceData.Prévoyant.cost --
            dédicaceData.Ritualiste.cost --
        }
      }
    //Marchand//
      if (checkbox.id == 'Commerçant' || checkbox.id == 'Agent Corporatif' || checkbox.id == 'Artisan') {
        dédicaceData.Prévoyant.cost --
      }
    //Mystico//
      if (checkbox.id == 'Incompris' || checkbox.id == 'Traceur' || checkbox.id == 'Insuffleur') {
        dédicaceData.Ritualiste.cost --
      }
    //Religieux//
      if (checkbox.id == 'Acolyte' || checkbox.id == 'Ex-Cultiste' || checkbox.id == 'Advokiste') {
        dédicaceData.Choisi.cost --
        if (checkbox.id == 'Advokiste'){
            dédicaceData.Choisi.cost --
        }
      }
    //Robuste//
      if (checkbox.id == 'Garde' || checkbox.id == 'Mercenaire' || checkbox.id == 'Gladiateur') {
        dédicaceData.Choisi.cost --
      }
    //Travailleur//
      if (checkbox.id == 'Fermier' || checkbox.id == 'Mineur' || checkbox.id == 'Maçon') {
        dédicaceData.Connecté.cost --
      }
    //Vagabond//
      if (checkbox.id == 'Exilé' || checkbox.id == 'Voyageur' || checkbox.id == 'Rescapé') {
        dédicaceData.Prévoyant.cost --
      }
      }) 
      const cultureskillsContainer = document.getElementById('cultureskills-container')
      checkedCheckboxes = cultureskillsContainer.querySelectorAll('input[type="checkbox"]:checked')

      checkedCheckboxes.forEach(checkbox => {
        //Plateau & Ashvattha reduction//
          if (checkbox.id == 'Religion*' || checkbox.id == 'The City*' || checkbox.id == 'Insight*'|| checkbox.id == 'Dévoué'|| checkbox.id == 'Connections'|| checkbox.id == 'Richesses'|| checkbox.id == 'Discrètement Armé'|| checkbox.id == 'Wilderness*'|| checkbox.id == 'Climb*'|| checkbox.id == 'Acrobatics*'|| checkbox.id == "Cadeau de l'arbre" || checkbox.id == 'Murmures de la brise'|| checkbox.id == 'Compagnon'|| checkbox.id == 'Pouce-vert' ){
                dédicaceData.Choisi.cost --
          }
        //Cloison & Trois-Pointes reduction//
            if (checkbox.id == 'Swim*' || checkbox.id == 'Deception*' || checkbox.id == 'Awareness*'|| checkbox.id == 'Entrainement'|| checkbox.id == 'Cuisine de quartier'|| checkbox.id == 'Communauté'|| checkbox.id == 'Coudes serrés'|| checkbox.id == 'Streetwise*' || checkbox.id == 'Stealth*'|| checkbox.id == 'Intimidation*'|| checkbox.id == "C'est quoi lui, y'a un gun?"|| checkbox.id == "Dormir d'un Oeil" || checkbox.id == 'Gang de rue'|| checkbox.id == 'Cricoleur créatif'){
            dédicaceData.Connecté.cost --
            } 
        //Gris-Gallons & Coron reduction//
          if (checkbox.id == 'Disguise*' || checkbox.id == 'Thievery*' || checkbox.id == 'Escape Artist*'|| checkbox.id == "Entouré d'armes"|| checkbox.id == 'Jamais au dépourvu'|| checkbox.id == "Faim d'oiseau" || checkbox.id == 'Fondre dans foule'|| checkbox.id == 'Persuasion*' || checkbox.id == 'Tactics and Logistics*'|| checkbox.id == 'Power*'|| checkbox.id == 'Style bien à vous'|| checkbox.id == "Le flair pour l'aubaine" || checkbox.id == 'Caravanier'|| checkbox.id == 'Combattant captivant'){
             dédicaceData.Prévoyant.cost --
            }  
        //Cendrier & Phénandre reduction//
          if (checkbox.id == 'Endurance*' || checkbox.id == 'Old world*' || checkbox.id == 'Dungeoneering*'|| checkbox.id == 'Morceau du vieux-monde'|| checkbox.id == 'Nouveau jour, même merde'|| checkbox.id == 'Heures supplémentaires'|| checkbox.id == 'Détection de trace'|| checkbox.id == 'Arcana*'|| checkbox.id == 'Medecine*'|| checkbox.id == 'Concentration*'|| checkbox.id == "Uniforme Universitaire" || checkbox.id == "Champ d'étude"|| checkbox.id == 'Corps à la science'|| checkbox.id == 'Alchimie'){
            dédicaceData.Ritualiste.cost --
      }
       })





    document.getElementById('Choisi').value = dédicaceData.Choisi.cost
    document.getElementById('Connecté').value = dédicaceData.Connecté.cost
    document.getElementById('Prévoyant').value = dédicaceData.Prévoyant.cost
    document.getElementById('Ritualiste').value = dédicaceData.Ritualiste.cost

    
}
function createCustomTooltip(checkbox){
    checkbox.addEventListener('mouseover', (event) => {
        const tooltipText = event.target.dataset.tooltip; // Get the tooltip text
        // Assuming 'customTooltip' is the ID of your tooltip element
        const tooltip = document.getElementById('customTooltip');
        tooltip.innerHTML = tooltipText; // Set the text of the tooltip
        tooltip.style.display = 'block'; // Show the tooltip
        tooltip.style.left = event.clientX + 'px'; // Position the tooltip
        tooltip.style.top = event.clientY + 'px';
    });
    checkbox.addEventListener('mouseout', () => {
        const tooltip = document.getElementById('customTooltip');
        tooltip.style.display = 'none'; // Hide the tooltip
    });
}
function cultureScrollingMenu(menu) {

    // Define your options (example options)
    const options = ['', 'Ashvattha', 'Cloison', 'Gris-Gallons', 'Le Plateau', 'Le Cendrier', 'Phénandre', 'Projet Frontière', 'Trois-Pointes', "Vallée d'Ylère"];

    // Add options to the menu
    options.forEach(optionText => {
        const option = document.createElement('option');
        option.textContent = optionText;
        menu.appendChild(option);
    });
}
function historiquesAdditionnelsScrollingMenu(menu){
    const options = [
    {text:''}, 
    {text: 'CRIMINEL', disabled: true},
    {text: 'Polisson'},
    {text: 'Scélérat'} ,
    {text: 'Empoisonneur'} ,
    {text: 'ÉRUDIT', disabled: true},
    {text: 'Savant'},
    {text: 'Artiste'},
    {text: 'Caligraphe'},
    {text: 'MARCHAND', disabled: true},
    {text: 'Commerçant'},
    {text: 'Agent Corporatif'},
    {text: 'Artisan'},
    {text: 'MYSTICO', disabled: true},
    {text: 'Incompris'},
    {text: 'Traceur'},
    {text: 'Insuffleur'},
    {text: 'RELIGIEUX', disabled: true},
    {text: 'Acolyte'},
    {text: 'Ex-Cultiste'},
    {text: 'Advokiste'},
    {text: 'ROBUSTE', disabled: true},
    {text: 'Garde'},
    {text: 'Mercenaire'},
    {text: 'Gladiateur'},
    {text: 'TRAVAILLEUR', disabled: true},
    {text: 'Fermier'},
    {text: 'Mineur'},
    {text: 'Maçon'} ,
    {text: 'VAGABOND', disabled: true},
    {text: 'Exilé'},
    {text: 'Voyageur'},
    {text: 'Rescapé'}];

    options.forEach(optionObj => {
        const option = document.createElement('option');
        option.textContent = optionObj.text; // Use the text property for display text
        if (optionObj.disabled) {
            option.disabled = true; // Set the option as disabled if specified
        }
        if (optionObj.value) {
            option.value = optionObj.value; // Set the value if specified
        } else {
            option.value = optionObj.text; // Use text as value if specific value isn't provided
        }
        menu.appendChild(option);
    });

    
}

const cultureSelectionScrollingMenu1 = document.getElementById('cultureSelectionScrollingMenu1');
const cultureSelectionScrollingMenu2 = document.getElementById('cultureSelectionScrollingMenu2');
const cultureSelectionScrollingMenu3 = document.getElementById('cultureSelectionScrollingMenu3');
const cultureSelectionScrollingMenu4 = document.getElementById('cultureSelectionScrollingMenu4');
const cultureSelectionScrollingMenu5 = document.getElementById('cultureSelectionScrollingMenu5');



function ashvatthaScrollingMenu(scrollingMenu) {
    scrollingMenu.innerHTML = '';
    const options = ['', 'Wilderness*', 'Climb*', 'Acrobatics*', "Cadeau de l'arbre", 'Murmures de la brise', 'Compagnon', 'Pouce Vert'];
    options.forEach(optionText => {
        const option = document.createElement('option');
        option.textContent = optionText;
        scrollingMenu.appendChild(option); 
    });
}
function cloisonScrollingMenu(scrollingMenu) {
    scrollingMenu.innerHTML = '';
    const options = ['', 'Swim*', 'Deception*', 'Awareness*', "Entrainement", 'Cuisine de quartier', 'Communauté', 'Coudes serrés'];
    options.forEach(optionText => {
        const option = document.createElement('option');
        option.textContent = optionText;
        scrollingMenu.appendChild(option); 
    });
}
function coronScrollingMenu(scrollingMenu) {
    scrollingMenu.innerHTML = '';
    const options = ['', 'Persuasion*', 'Tactics and Logistics*', 'Power*', "Style bien à vous", "Le flair pour l'aubaine", 'Caravanier', 'Combattant Captivant'];
    options.forEach(optionText => {
        const option = document.createElement('option');
        option.textContent = optionText;
        scrollingMenu.appendChild(option); 
    });
}
function grisGallonsScrollingMenu(scrollingMenu) {
    scrollingMenu.innerHTML = '';
    const options = ['', 'Disguise*', 'Thievery*', 'Escape Artist*', "Entouré d'armes", 'Jamais au dépourvu', "Faim d'oiseau", 'Fondre dans foule'];
    options.forEach(optionText => {
        const option = document.createElement('option');
        option.textContent = optionText;
        scrollingMenu.appendChild(option); 
    });
}
function lePlateauScrollingMenu(scrollingMenu) {
    scrollingMenu.innerHTML = '';
    const options = ['', 'Religion*', 'The City*', 'Insight*', "Dévoué", 'Connections', "Richesses", 'Discrètement Armé'];
    options.forEach(optionText => {
        const option = document.createElement('option');
        option.textContent = optionText;
        scrollingMenu.appendChild(option); 
    });
}
function leCendrierScrollingMenu(scrollingMenu) {
    scrollingMenu.innerHTML = '';
    const options = ['', 'Endurance*', 'Old World*', 'Dungeoneering*', "Morceau du Vieux-Monde", 'Nouveau jour, même merde', "Heures supplémentaires", 'Détection de Trace'];
    options.forEach(optionText => {
        const option = document.createElement('option');
        option.textContent = optionText;
        scrollingMenu.appendChild(option); 
    });
}
function phénandreScrollingMenu(scrollingMenu) {
    scrollingMenu.innerHTML = '';
    const options = ['', 'Arcana*', 'Medecine*', 'Concentration*', "Uniforme Universitaire", "Champ d'étude", "Corps à la science", 'Alchimie'];
    options.forEach(optionText => {
        const option = document.createElement('option');
        option.textContent = optionText;
        scrollingMenu.appendChild(option); 
    });
}
function projetFrontièreScrollingMenu(scrollingMenu) {
    scrollingMenu.innerHTML = '';
    const options = ['', 'Wilderness*', 'Old World*', 'Stealth*', "Sheriff", 'Comme le fond de ma poche', "Le monde est petit", 'Maîtres chez nous'];
    options.forEach(optionText => {
        const option = document.createElement('option');
        option.textContent = optionText;
        scrollingMenu.appendChild(option); 
    });
}
function troisPointesScrollingMenu(scrollingMenu) {
    scrollingMenu.innerHTML = '';
    const options = ['', 'Streetwise*', 'Stealth*', 'Intimidation*', "C'est quoi lui, y'a un gun?", "Dormir d'un oeil", "Gang de Rue", 'Bricoleur Créatif'];
    options.forEach(optionText => {
        const option = document.createElement('option');
        option.textContent = optionText;
        scrollingMenu.appendChild(option); 
    });
}
function valléedYlèreScrollingMenu(scrollingMenu) {
    scrollingMenu.innerHTML = '';
    const options = ['', 'Disguise*', 'Endurance*', 'Climb*', "Leçons de l'Homme-Vert", 'Foulard Jaune', "Non-Croyant", 'Unis face au Tyrant'];
    options.forEach(optionText => {
        const option = document.createElement('option');
        option.textContent = optionText;
        scrollingMenu.appendChild(option); 
    });
}
function espèceOriginale(scrollingMenu) {
    scrollingMenu.innerHTML = '';
    const options = ['', 'Canevas', 'Drakéide', 'Elfe', "Genasi", 'Homoncule', 'Humain', 'Jord', 'Maimon', 'Moloch', 'Oni', 'Skaven', 'Talin', 'Tengu de Jour', 'Tengu de Nuit'];
    options.forEach(optionText => {
        const option = document.createElement('option');
        option.textContent = optionText;
        scrollingMenu.appendChild(option); 
    });

  
}




function CalculateKaméléonCost(scrollingMenu){
    
    var activeDropdown = document.getElementById(scrollingMenu.target.id).value
    const zeroCost = ['']
    const oneCost = ['Communauté', 'Discrètement Armé', "Nouveau jour, même merde", "Dormir d'un oeil"]
    const twoCost = ['Wilderness*', 'Climb*','Acrobatics*','Murmures de la brise','Compagnon', 'Pouce Vert', 'Swim*', 'Deception*' ,'Awareness*' ,'Persuasion*' , 'Tactics and Logistics*' , 'Power*' , 'Combattant Captivant' , 'Disguise*' , 'Thievery*' , 'Escape Artist*' , 'Jamais au dépourvu' , 'Fondre dans foule' , 'Religion*' , 'The City*' , 'Insight*' , 'Endurance*' , 'Old World*' , 'Dungeoneering*' , 'Heures supplémentaires' , 'Arcana*' , 'Medecine*' , 'Concentration*' , 'Corps à la science' , 'Stealth*' , 'Le monde est petit' , 'Intimidation*' , 'Unis face au Tyrant', 'Polisson', 'Savant', 'Commerçant', 'Incompris', 'Acolyte', 'Garde', 'Fermier', 'Exilé']
    const threeCost = ['Cuisine de quartier' , "Le flair pour l'aubaine" , 'Caravanier' , "Entouré d'armes" , 'Dévoué' , "Champ d'étude" , 'Alchimie' , 'Comme le fond de ma poche' , 'Gang de Rue' , 'Bricoleur Créatif' , 'Foulard Jaune', 'Agent Corporatif', 'Ex-Cultiste', 'Voyageur']
    const fourCost = ['Entrainement', 'Coudes serrés', 'Style bien à vous' , "Faim d'oiseau" , 'Connections' , 'Richesses' , 'Détection de Trace' , 'Uniforme Universitaire' , 'Maîtres chez nous' , 'Non-Croyant', 'Scélérat', 'Artiste', 'Traceur', 'Mercenaire', 'Mineur', '']
    const fiveCost = ["Cadeau de l'arbre" , "Leçons de l'Homme-Vert", 'Empoisonneur', 'Caligraphe', 'Artisan', 'Insuffleur', 'Advokiste', 'Gladiateur', 'Maçon', 'Rescapé']
    const sixCost = ['Morceau du Vieux-Monde', 'Sheriff', "C'est quoi lui, y'a un gun?"]

        if(valeurPrécédente2[scrollingMenu.target.id]){
            valeurPrécédente2[scrollingMenu.target.id] = false
            pointsContainer.value = parseInt(pointsContainer.value, 10) + parseInt(valeurPrécédente[scrollingMenu.target.id], 10)
            valeurPrécédente[scrollingMenu.target.id]= 0
            currentStar --

        }
        if(valeurPrécédente[scrollingMenu.target.id] != null){
            pointsContainer.value = parseInt(pointsContainer.value, 10) +  parseInt(valeurPrécédente[scrollingMenu.target.id], 10)
        }
        if (zeroCost.includes(activeDropdown)){
            valeurPrécédente[scrollingMenu.target.id]= 0
        }else if (oneCost.includes(activeDropdown)) {
            valeurPrécédente[scrollingMenu.target.id] = 1
            pointsContainer.value = pointsContainer.value -1
        }else if (twoCost.includes(activeDropdown)) {
            let valeurFinale = 2

            if (activeDropdown.includes('*')){
                currentStar++
                valeurPrécédente2[scrollingMenu.target.id] = true
                if (currentStar == 3) {
                    valeurFinale ++
                }
                if (currentStar == 4) {
                    valeurFinale = valeurFinale + 2
                }
                if (currentStar == 5) {
                    valeurFinale = valeurFinale + 3
                }                
            }
            pointsContainer.value = pointsContainer.value - valeurFinale
            valeurPrécédente[scrollingMenu.target.id] = valeurFinale

        }else if (threeCost.includes(activeDropdown)) {
            valeurPrécédente[scrollingMenu.target.id] = 3
            pointsContainer.value = pointsContainer.value -3
        }else if (fourCost.includes(activeDropdown)) {
            valeurPrécédente[scrollingMenu.target.id] = 4
            pointsContainer.value = pointsContainer.value -4
        }else if (fiveCost.includes(activeDropdown)) {
            valeurPrécédente[scrollingMenu.target.id] = 5
            pointsContainer.value = pointsContainer.value -5
        }else if (sixCost.includes(activeDropdown)) {
            valeurPrécédente[scrollingMenu.target.id] = 6
            pointsContainer.value = pointsContainer.value -6            
        }

       else {
            if (scrollingMenu.target.id == 'scrollingMenuCulture1'){          
                pointsContainer.value = parseInt(pointsContainer.value, 10) + parseInt(valeurPrécédente['cultureSelectionScrollingMenu1'], 10)
                valeurPrécédente['cultureSelectionScrollingMenu1'] = 0
            }
            if (scrollingMenu.target.id == 'scrollingMenuCulture2'){
                pointsContainer.value = parseInt(pointsContainer.value, 10) + parseInt(valeurPrécédente['cultureSelectionScrollingMenu2'], 10)
                valeurPrécédente['cultureSelectionScrollingMenu2'] = 0
            }
            if (scrollingMenu.target.id == 'scrollingMenuCulture3'){
                pointsContainer.value = parseInt(pointsContainer.value, 10) + parseInt(valeurPrécédente['cultureSelectionScrollingMenu3'], 10)
                valeurPrécédente['cultureSelectionScrollingMenu3'] = 0
            }
            if (scrollingMenu.target.id == 'scrollingMenuCulture4'){
                pointsContainer.value = parseInt(pointsContainer.value, 10) + parseInt(valeurPrécédente['cultureSelectionScrollingMenu4'], 10)
                valeurPrécédente['cultureSelectionScrollingMenu4'] = 0
            }
            if (scrollingMenu.target.id == 'scrollingMenuCulture5'){
                pointsContainer.value = parseInt(pointsContainer.value, 10) + parseInt(valeurPrécédente['cultureSelectionScrollingMenu5'], 10)
                valeurPrécédente['cultureSelectionScrollingMenu5'] = 0
            }


       }

}


délaisséMenu1.addEventListener('change', délaisséMenuChange)
délaisséMenu2.addEventListener('change', délaisséMenuChange)

function délaisséMenuChange(scrollingMenu){
    calculateDélaisséCost(scrollingMenu.target)
    délaisséHumainDémulticlass(previousDélaisséName[scrollingMenu.target.id], scrollingMenu.target)
    délaisséHumainMulticlass(scrollingMenu.target.value)
    
}

function calculateDélaisséCost(scrollingMenu){
    var selectedValue = peupleData[document.getElementById('espèceOriginaleMenu').value];
    var skillCost;
    if (document.getElementById('espèceOriginaleMenu').value == 'Tengu de Jour'){
        selectedValue = peupleData['TenguJour']
    }
    if (document.getElementById('espèceOriginaleMenu').value == 'Tengu de Nuit'){
        selectedValue = peupleData['TenguNuit']
    }

    if (scrollingMenu.value == 'Prouesse Innée'){
        skillCost = 5
    }
    else {
        const skill = selectedValue.find(skill => skill.peupleskill === scrollingMenu.value);
        skillCost = skill.cost
    }
    
    pointsContainer.value = parseInt(pointsContainer.value, 10) + parseInt(previousDélaisséSkill[scrollingMenu.id], 10)      
    previousDélaisséSkill[scrollingMenu.id] = skillCost
    pointsContainer.value = parseInt(pointsContainer.value, 10) - skillCost   
}

function délaisséHumainMulticlass(atout){

    if (atout == 'Kaméléon I'){
        const scrollingMenu1 = document.getElementById('scrollingMenuCulture1');
        cultureScrollingMenu(scrollingMenu1);
        scrollingMenu1.style.display = 'block';            
    }
    if (atout == 'Kaméléon II'){
        const scrollingMenu2 = document.getElementById('scrollingMenuCulture2');
        cultureScrollingMenu(scrollingMenu2);
        scrollingMenu2.style.display = 'block';
    }
    if (atout == 'Kaméléon III'){
        const scrollingMenu3 = document.getElementById('scrollingMenuCulture3');
        cultureScrollingMenu(scrollingMenu3);
        scrollingMenu3.style.display = 'block';
    }
    if (atout == 'Kaméléon IV'){
        const scrollingMenu4 = document.getElementById('scrollingMenuCulture4');
        cultureScrollingMenu(scrollingMenu4);
        scrollingMenu4.style.display = 'block';
    }
    if (atout == 'Kaméléon V'){
        const scrollingMenu5 = document.getElementById('scrollingMenuCulture5');
        cultureScrollingMenu(scrollingMenu5);
        scrollingMenu5.style.display = 'block';
    }
    if (atout == 'Touche-à-tout I'){
        const scrollingMenu = document.getElementById('historiqueAdditionnel1');
        historiquesAdditionnelsScrollingMenu(scrollingMenu)
        scrollingMenu.style.display = 'block';
        pointsContainer.value = parseInt(pointsContainer.value, 10) - 1
    }
    if (atout == 'Touche-à-tout II'){
        const scrollingMenu = document.getElementById('historiqueAdditionnel2');
        historiquesAdditionnelsScrollingMenu(scrollingMenu)
        scrollingMenu.style.display = 'block';
        pointsContainer.value = parseInt(pointsContainer.value, 10) - 2
    }

}
function délaisséHumainDémulticlass(atout, délaisséScrolldownMenu){
    if (atout == 'Kaméléon I'){
        const scrollingMenu = document.getElementById('scrollingMenuCulture1');
        const cultureOption = document.getElementById('cultureSelectionScrollingMenu1')
        scrollingMenu.innerHTML = '';
        scrollingMenu.style.display = 'none';
        cultureOption.style.display = 'none';
        if(valeurPrécédente[cultureOption.id] != null){
            pointsContainer.value = parseInt(pointsContainer.value, 10) +  parseInt(valeurPrécédente[cultureOption.id], 10)
            valeurPrécédente[cultureOption.id] = 0
        }
    }
    if (atout == 'Kaméléon II'){
        const scrollingMenu = document.getElementById('scrollingMenuCulture2');
        const cultureOption = document.getElementById('cultureSelectionScrollingMenu2')
        scrollingMenu.innerHTML = '';
        scrollingMenu.style.display = 'none';
        cultureOption.style.display = 'none';
        if(valeurPrécédente[cultureOption.id] != null){
            pointsContainer.value = parseInt(pointsContainer.value, 10) +  parseInt(valeurPrécédente[cultureOption.id], 10)
            valeurPrécédente[cultureOption.id] = 0
        }

    }
    if (atout == 'Kaméléon III'){
        const scrollingMenu = document.getElementById('scrollingMenuCulture3');
        const cultureOption = document.getElementById('cultureSelectionScrollingMenu3')
        scrollingMenu.innerHTML = '';
        scrollingMenu.style.display = 'none';
        cultureOption.style.display = 'none';
        if(valeurPrécédente[cultureOption.id] != null){
            pointsContainer.value = parseInt(pointsContainer.value, 10) +  parseInt(valeurPrécédente[cultureOption.id], 10)
            valeurPrécédente[cultureOption.id] = 0
        }
    }
    if (atout == 'Kaméléon IV'){
        const scrollingMenu = document.getElementById('scrollingMenuCulture4');
        const cultureOption = document.getElementById('cultureSelectionScrollingMenu4')
        scrollingMenu.innerHTML = '';
        scrollingMenu.style.display = 'none';
        cultureOption.style.display = 'none';
        if(valeurPrécédente[cultureOption.id] != null){
            pointsContainer.value = parseInt(pointsContainer.value, 10) +  parseInt(valeurPrécédente[cultureOption.id], 10)
            valeurPrécédente[cultureOption.id] = 0
        }
    }
    if (atout == 'Kaméléon V'){
        const scrollingMenu = document.getElementById('scrollingMenuCulture5');
        const cultureOption = document.getElementById('cultureSelectionScrollingMenu5')
        scrollingMenu.innerHTML = '';
        scrollingMenu.style.display = 'none';
        cultureOption.style.display = 'none';
        if(valeurPrécédente[cultureOption.id] != null){
            pointsContainer.value = parseInt(pointsContainer.value, 10) +  parseInt(valeurPrécédente[cultureOption.id], 10)
            valeurPrécédente[cultureOption.id] = 0
        }
    }
    if (atout == 'Touche-à-tout I'){
        const scrollingMenu = document.getElementById('historiqueAdditionnel1');
        scrollingMenu.innerHTML = '';
        scrollingMenu.style.display = 'none';
        pointsContainer.value = parseInt(pointsContainer.value, 10) + 1
        if(valeurPrécédente[scrollingMenu.id] != null){
            pointsContainer.value = parseInt(pointsContainer.value, 10) +  parseInt(valeurPrécédente[scrollingMenu.id], 10)
            valeurPrécédente[scrollingMenu.id] = 0
        }
    }
    if (atout == 'Touche-à-tout II'){
        const scrollingMenu = document.getElementById('historiqueAdditionnel2');
        scrollingMenu.innerHTML = '';
        scrollingMenu.style.display = 'none';
        pointsContainer.value = parseInt(pointsContainer.value, 10) + 2
        if(valeurPrécédente[scrollingMenu.id] != null){
            pointsContainer.value = parseInt(pointsContainer.value, 10) +  parseInt(valeurPrécédente[scrollingMenu.id], 10)
            valeurPrécédente[scrollingMenu.id] = 0
        }
    }
    previousDélaisséName[délaisséScrolldownMenu.id] = délaisséScrolldownMenu.value
}

//Peuple checkboxes and logic//
  document.addEventListener('DOMContentLoaded', () => {
    const peupleSelect = document.getElementById('Peuple');
    const scrollingMenu1 = document.getElementById('scrollingMenuCulture1');
    const scrollingMenu2 = document.getElementById('scrollingMenuCulture2');
    const scrollingMenu3 = document.getElementById('scrollingMenuCulture3');
    const scrollingMenu4 = document.getElementById('scrollingMenuCulture4');
    const scrollingMenu5 = document.getElementById('scrollingMenuCulture5');
    const délaisséMenu1 = document.getElementById('délaisséMenu1');
    const délaisséMenu2 = document.getElementById('délaisséMenu2');

  
    peupleSelect.addEventListener('change', function () {

      updatePeupleskills(this.value);
    });
    scrollingMenu1.addEventListener('change', handleKameleonDropdown);
    scrollingMenu2.addEventListener('change', handleKameleonDropdown);
    scrollingMenu3.addEventListener('change', handleKameleonDropdown);
    scrollingMenu4.addEventListener('change', handleKameleonDropdown);
    scrollingMenu5.addEventListener('change', handleKameleonDropdown);   
    document.getElementById('espèceOriginaleMenu').addEventListener('change', function(){

        if (this.value == 'Canevas'){
            document.getElementById('délaisséMenu1').innerHTML = '';
            document.getElementById('délaisséMenu2').innerHTML = '';
            peupleData['Canevas'].forEach(skills => {
                const option = document.createElement('option');
                option.textContent = skills.peupleskill;
                document.getElementById('délaisséMenu1').appendChild(option);
            });
            peupleData['Canevas'].forEach(skills => {
                const option = document.createElement('option');
                option.textContent = skills.peupleskill;
                document.getElementById('délaisséMenu2').appendChild(option)
            })
            const additionalOption1 = document.createElement('option');
            const additionalOption2 = document.createElement('option');
            additionalOption1.textContent = 'Prouesse Innée'
            additionalOption2.textContent = 'Prouesse Innée'
            document.getElementById('délaisséMenu1').appendChild(additionalOption1);
            document.getElementById('délaisséMenu2').appendChild(additionalOption2);
         }   

        if (this.value == 'Drakéide'){
            document.getElementById('délaisséMenu1').innerHTML = '';
            document.getElementById('délaisséMenu2').innerHTML = '';
            peupleData['Drakéide'].forEach(skills => {
                const option = document.createElement('option');
                option.textContent = skills.peupleskill;
                document.getElementById('délaisséMenu1').appendChild(option);
            });
            peupleData['Drakéide'].forEach(skills => {
                const option = document.createElement('option');
                option.textContent = skills.peupleskill;
                document.getElementById('délaisséMenu2').appendChild(option);
            });
            const additionalOption1 = document.createElement('option');
            const additionalOption2 = document.createElement('option');
            additionalOption1.textContent = 'Prouesse Innée'
            additionalOption2.textContent = 'Prouesse Innée'
            document.getElementById('délaisséMenu1').appendChild(additionalOption1);
            document.getElementById('délaisséMenu2').appendChild(additionalOption2);
            
        }            
        if (this.value == 'Elfe'){
            document.getElementById('délaisséMenu1').innerHTML = '';
            document.getElementById('délaisséMenu2').innerHTML = '';
            peupleData['Elfe'].forEach(skills => {
                const option = document.createElement('option');
                option.textContent = skills.peupleskill;
                document.getElementById('délaisséMenu1').appendChild(option);
            });
            peupleData['Elfe'].forEach(skills => {
                const option = document.createElement('option');
                option.textContent = skills.peupleskill;
                document.getElementById('délaisséMenu2').appendChild(option);
            });
            const additionalOption1 = document.createElement('option');
            const additionalOption2 = document.createElement('option');
            additionalOption1.textContent = 'Prouesse Innée'
            additionalOption2.textContent = 'Prouesse Innée'
            document.getElementById('délaisséMenu1').appendChild(additionalOption1);
            document.getElementById('délaisséMenu2').appendChild(additionalOption2);
            
        }   
        if (this.value == 'Genasi'){
            document.getElementById('délaisséMenu1').innerHTML = '';
            document.getElementById('délaisséMenu2').innerHTML = '';
            peupleData['Genasi'].forEach(skills => {
                const option = document.createElement('option');
                option.textContent = skills.peupleskill;
                document.getElementById('délaisséMenu1').appendChild(option);
            });
            peupleData['Genasi'].forEach(skills => {
                const option = document.createElement('option');
                option.textContent = skills.peupleskill;
                document.getElementById('délaisséMenu2').appendChild(option);
            });
            const additionalOption1 = document.createElement('option');
            const additionalOption2 = document.createElement('option');
            additionalOption1.textContent = 'Prouesse Innée'
            additionalOption2.textContent = 'Prouesse Innée'
            document.getElementById('délaisséMenu1').appendChild(additionalOption1);
            document.getElementById('délaisséMenu2').appendChild(additionalOption2);
            
        } 
        if (this.value == 'Homoncule'){
            document.getElementById('délaisséMenu1').innerHTML = '';
            document.getElementById('délaisséMenu2').innerHTML = '';
            peupleData['Homoncule'].forEach(skills => {
                const option = document.createElement('option');
                option.textContent = skills.peupleskill;
                document.getElementById('délaisséMenu1').appendChild(option);
            });
            peupleData['Homoncule'].forEach(skills => {
                const option = document.createElement('option');
                option.textContent = skills.peupleskill;
                document.getElementById('délaisséMenu2').appendChild(option);
            });
            const additionalOption1 = document.createElement('option');
            const additionalOption2 = document.createElement('option');
            additionalOption1.textContent = 'Prouesse Innée'
            additionalOption2.textContent = 'Prouesse Innée'
            document.getElementById('délaisséMenu1').appendChild(additionalOption1);
            document.getElementById('délaisséMenu2').appendChild(additionalOption2);
            
        } 
        if (this.value == 'Humain'){
            document.getElementById('délaisséMenu1').innerHTML = '';
            document.getElementById('délaisséMenu2').innerHTML = '';
            peupleData['Humain'].forEach(skills => {
                const option = document.createElement('option');
                option.textContent = skills.peupleskill;
                document.getElementById('délaisséMenu1').appendChild(option);
            });
            peupleData['Humain'].forEach(skills => {
                const option = document.createElement('option');
                option.textContent = skills.peupleskill;
                document.getElementById('délaisséMenu2').appendChild(option);
            });
            const additionalOption1 = document.createElement('option');
            const additionalOption2 = document.createElement('option');
            additionalOption1.textContent = 'Prouesse Innée'
            additionalOption2.textContent = 'Prouesse Innée'
            document.getElementById('délaisséMenu1').appendChild(additionalOption1);
            document.getElementById('délaisséMenu2').appendChild(additionalOption2); 
        } 
        if (this.value == 'Jord'){
            document.getElementById('délaisséMenu1').innerHTML = '';
            document.getElementById('délaisséMenu2').innerHTML = '';
            peupleData['Jord'].forEach(skills => {
                const option = document.createElement('option');
                option.textContent = skills.peupleskill;
                document.getElementById('délaisséMenu1').appendChild(option);
            });
            peupleData['Jord'].forEach(skills => {
                const option = document.createElement('option');
                option.textContent = skills.peupleskill;
                document.getElementById('délaisséMenu2').appendChild(option);
            });
            const additionalOption1 = document.createElement('option');
            const additionalOption2 = document.createElement('option');
            additionalOption1.textContent = 'Prouesse Innée'
            additionalOption2.textContent = 'Prouesse Innée'
            document.getElementById('délaisséMenu1').appendChild(additionalOption1);
            document.getElementById('délaisséMenu2').appendChild(additionalOption2);
        } 
        if (this.value == 'Maimon'){
            document.getElementById('délaisséMenu1').innerHTML = '';
            document.getElementById('délaisséMenu2').innerHTML = '';
            peupleData['Maimon'].forEach(skills => {
                const option = document.createElement('option');
                option.textContent = skills.peupleskill;
                document.getElementById('délaisséMenu1').appendChild(option);
            });
            peupleData['Maimon'].forEach(skills => {
                const option = document.createElement('option');
                option.textContent = skills.peupleskill;
                document.getElementById('délaisséMenu2').appendChild(option);
            });
            const additionalOption1 = document.createElement('option');
            const additionalOption2 = document.createElement('option');
            additionalOption1.textContent = 'Prouesse Innée'
            additionalOption2.textContent = 'Prouesse Innée'
            document.getElementById('délaisséMenu1').appendChild(additionalOption1);
            document.getElementById('délaisséMenu2').appendChild(additionalOption2);
        } 
        if (this.value == 'Moloch'){
            document.getElementById('délaisséMenu1').innerHTML = '';
            document.getElementById('délaisséMenu2').innerHTML = '';
            peupleData['Moloch'].forEach(skills => {
                const option = document.createElement('option');
                option.textContent = skills.peupleskill;
                document.getElementById('délaisséMenu1').appendChild(option);
            });
            peupleData['Moloch'].forEach(skills => {
                const option = document.createElement('option');
                option.textContent = skills.peupleskill;
                document.getElementById('délaisséMenu2').appendChild(option);
            });
            const additionalOption1 = document.createElement('option');
            const additionalOption2 = document.createElement('option');
            additionalOption1.textContent = 'Prouesse Innée'
            additionalOption2.textContent = 'Prouesse Innée'
            document.getElementById('délaisséMenu1').appendChild(additionalOption1);
            document.getElementById('délaisséMenu2').appendChild(additionalOption2); 
        } 
        if (this.value == 'Oni'){
            document.getElementById('délaisséMenu1').innerHTML = '';
            document.getElementById('délaisséMenu2').innerHTML = '';
            peupleData['Oni'].forEach(skills => {
                const option = document.createElement('option');
                option.textContent = skills.peupleskill;
                document.getElementById('délaisséMenu1').appendChild(option);
            });
            peupleData['Oni'].forEach(skills => {
                const option = document.createElement('option');
                option.textContent = skills.peupleskill;
                document.getElementById('délaisséMenu2').appendChild(option);
            });
            const additionalOption1 = document.createElement('option');
            const additionalOption2 = document.createElement('option');
            additionalOption1.textContent = 'Prouesse Innée'
            additionalOption2.textContent = 'Prouesse Innée'
            document.getElementById('délaisséMenu1').appendChild(additionalOption1);
            document.getElementById('délaisséMenu2').appendChild(additionalOption2);
        } 
        if (this.value == 'Skaven'){
            document.getElementById('délaisséMenu1').innerHTML = '';
            document.getElementById('délaisséMenu2').innerHTML = '';
            peupleData['Skaven'].forEach(skills => {
                const option = document.createElement('option');
                option.textContent = skills.peupleskill;
                document.getElementById('délaisséMenu1').appendChild(option);
            });
            peupleData['Skaven'].forEach(skills => {
                const option = document.createElement('option');
                option.textContent = skills.peupleskill;
                document.getElementById('délaisséMenu2').appendChild(option);
            });
            const additionalOption1 = document.createElement('option');
            const additionalOption2 = document.createElement('option');
            additionalOption1.textContent = 'Prouesse Innée'
            additionalOption2.textContent = 'Prouesse Innée'
            document.getElementById('délaisséMenu1').appendChild(additionalOption1);
            document.getElementById('délaisséMenu2').appendChild(additionalOption2);
        } 
        if (this.value == 'Talin'){
            document.getElementById('délaisséMenu1').innerHTML = '';
            document.getElementById('délaisséMenu2').innerHTML = '';
            peupleData['Talin'].forEach(skills => {
                const option = document.createElement('option');
                option.textContent = skills.peupleskill;
                document.getElementById('délaisséMenu1').appendChild(option);
            });
            peupleData['Talin'].forEach(skills => {
                const option = document.createElement('option');
                option.textContent = skills.peupleskill;
                document.getElementById('délaisséMenu2').appendChild(option);
            });
            const additionalOption1 = document.createElement('option');
            const additionalOption2 = document.createElement('option');
            additionalOption1.textContent = 'Prouesse Innée'
            additionalOption2.textContent = 'Prouesse Innée'
            document.getElementById('délaisséMenu1').appendChild(additionalOption1);
            document.getElementById('délaisséMenu2').appendChild(additionalOption2);
        } 
        if (this.value == 'Tengu de Jour'){
            document.getElementById('délaisséMenu1').innerHTML = '';
            document.getElementById('délaisséMenu2').innerHTML = '';
            peupleData['TenguJour'].forEach(skills => {
                const option = document.createElement('option');
                option.textContent = skills.peupleskill;
                document.getElementById('délaisséMenu1').appendChild(option);
            });
            peupleData['TenguJour'].forEach(skills => {
                const option = document.createElement('option');
                option.textContent = skills.peupleskill;
                document.getElementById('délaisséMenu2').appendChild(option);
            });
            const additionalOption1 = document.createElement('option');
            const additionalOption2 = document.createElement('option');
            additionalOption1.textContent = 'Prouesse Innée'
            additionalOption2.textContent = 'Prouesse Innée'
            document.getElementById('délaisséMenu1').appendChild(additionalOption1);
            document.getElementById('délaisséMenu2').appendChild(additionalOption2);
        } 
        if (this.value == 'Tengu de Nuit'){
            document.getElementById('délaisséMenu1').innerHTML = '';
            document.getElementById('délaisséMenu2').innerHTML = '';
            peupleData['TenguNuit'].forEach(skills => {
                const option = document.createElement('option');
                option.textContent = skills.peupleskill;
                document.getElementById('délaisséMenu1').appendChild(option);
            });
            peupleData['TenguNuit'].forEach(skills => {
                const option = document.createElement('option');
                option.textContent = skills.peupleskill;
                document.getElementById('délaisséMenu2').appendChild(option);
            }); 
            const additionalOption1 = document.createElement('option');
            const additionalOption2 = document.createElement('option');
            additionalOption1.textContent = 'Prouesse Innée'
            additionalOption2.textContent = 'Prouesse Innée'
            document.getElementById('délaisséMenu1').appendChild(additionalOption1);
            document.getElementById('délaisséMenu2').appendChild(additionalOption2);
        } 
        if (this.value == 'Triton'){
            document.getElementById('délaisséMenu1').innerHTML = '';
            document.getElementById('délaisséMenu2').innerHTML = '';
            peupleData['Triton'].forEach(skills => {
                const option = document.createElement('option');
                option.textContent = skills.peupleskill;
                document.getElementById('délaisséMenu1').appendChild(option);
            });
            peupleData['Triton'].forEach(skills => {
                const option = document.createElement('option');
                option.textContent = skills.peupleskill;
                document.getElementById('délaisséMenu2').appendChild(option);
            });  
            const additionalOption1 = document.createElement('option');
            const additionalOption2 = document.createElement('option');
            additionalOption1.textContent = 'Prouesse Innée'
            additionalOption2.textContent = 'Prouesse Innée'
            document.getElementById('délaisséMenu1').appendChild(additionalOption1);
            document.getElementById('délaisséMenu2').appendChild(additionalOption2);         
        } 
        if (this.value == ''){
            document.getElementById('délaisséMenu1').innerHTML = '';
            document.getElementById('délaisséMenu2').innerHTML = '';
            const emptyOption1 = document.createElement('option');
            const emptyOption2 = document.createElement('option');
            emptyOption1.textContent = ''
            emptyOption2.textContent = ''
            document.getElementById('délaisséMenu1').appendChild(emptyOption1);
            document.getElementById('délaisséMenu2').appendChild(emptyOption2);

            
        }
        
        document.getElementById('délaisséMenu1').dispatchEvent(new Event('change'))
        document.getElementById('délaisséMenu2').dispatchEvent(new Event('change'))

        
    })



    function updatePeupleskills(selectedPeuple) {
        const peupleskillsContainer = document.getElementById('peupleskills-container');
        const skills = peupleData[selectedPeuple];
        // Query all checked checkboxes within peupleskillsContainer
        const checkedCheckboxes = peupleskillsContainer.querySelectorAll('input[type="checkbox"]:checked');
        if (selectedPeuple == 'Délaissé'){
            espèceOriginale(document.getElementById('espèceOriginaleMenu'))
            document.getElementById('espèceOriginaleMenu').style.display = 'block'
        }else{
            document.getElementById('espèceOriginaleMenu').style.display = 'none'
        }

        if (selectedPeuple == 'Humain'){
            pointsContainer.value = parseInt(pointsContainer.value, 10) + 5

        }
        if (peuplePrécédent == 'Humain'){
            pointsContainer.value = parseInt(pointsContainer.value, 10) - 5           
        }
        peuplePrécédent = selectedPeuple



        // Loop through the NodeList of checked checkboxes
        checkedCheckboxes.forEach(checkbox => {
            if (checkbox.checked){
                checkbox.checked = false
                checkbox.dispatchEvent(new Event('change'));
            }



        });

        peupleskillsContainer.innerHTML = ''; // Clear the container

        skills.forEach(skill => {
            if (skill.peupleskill !== ''){
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = skill.peupleskill;
                checkbox.value = skill.cost;
                checkbox.dataset.tooltip = skill.Description;
                if (skill.prerequisite) {
                    checkbox.disabled = true;
                }

                checkbox.addEventListener('change', handlePeupleCheckboxes);
                const label = document.createElement('label');
                label.htmlFor = skill.peupleskill;
                label.appendChild(document.createTextNode(`${skill.peupleskill} (${skill.cost})`));
                peupleskillsContainer.appendChild(checkbox);
                peupleskillsContainer.appendChild(label);
                peupleskillsContainer.appendChild(document.createElement('br'));
                createCustomTooltip(checkbox)   
                // Event listener for mouseout (to hide the tooltip)
            }
        });

    }
   
    cultureSelectionScrollingMenu1.addEventListener('change', CalculateKaméléonCost)
    cultureSelectionScrollingMenu2.addEventListener('change', CalculateKaméléonCost)
    cultureSelectionScrollingMenu3.addEventListener('change', CalculateKaméléonCost)
    cultureSelectionScrollingMenu4.addEventListener('change', CalculateKaméléonCost)
    cultureSelectionScrollingMenu5.addEventListener('change', CalculateKaméléonCost)
    scrollingMenu1.addEventListener('change', CalculateKaméléonCost)
    scrollingMenu2.addEventListener('change', CalculateKaméléonCost)
    scrollingMenu3.addEventListener('change', CalculateKaméléonCost)
    scrollingMenu4.addEventListener('change', CalculateKaméléonCost)
    scrollingMenu5.addEventListener('change', CalculateKaméléonCost)
    historiqueAdditionnel1.addEventListener('change', CalculateKaméléonCost)
    historiqueAdditionnel2.addEventListener('change', CalculateKaméléonCost)


    

    // Initialize peupleskills with the first peuple
    updatePeupleskills(peupleSelect.value);

    function handleKameleonDropdown(event){

    if (event.target.value === 'Ashvattha' && event.target.id == 'scrollingMenuCulture1'){     ///FIELD 1///
        ashvatthaScrollingMenu(cultureSelectionScrollingMenu1)        
        cultureSelectionScrollingMenu1.style.display = 'block';
    }
    if (event.target.value === 'Cloison' && event.target.id == 'scrollingMenuCulture1'){
        cloisonScrollingMenu(cultureSelectionScrollingMenu1)        
        cultureSelectionScrollingMenu1.style.display = 'block';
    }
    if (event.target.value === 'Coron'&& event.target.id == 'scrollingMenuCulture1'){
        coronScrollingMenu(cultureSelectionScrollingMenu1)        
        cultureSelectionScrollingMenu1.style.display = 'block';
    }
    if (event.target.value === 'Gris-Gallons'&& event.target.id == 'scrollingMenuCulture1'){
        grisGallonsScrollingMenu(cultureSelectionScrollingMenu1)        
        cultureSelectionScrollingMenu1.style.display = 'block';
    }
    if (event.target.value === 'Le Plateau'&& event.target.id == 'scrollingMenuCulture1'){
        lePlateauScrollingMenu(cultureSelectionScrollingMenu1)        
        cultureSelectionScrollingMenu1.style.display = 'block';
    }
    if (event.target.value === 'Le Cendrier'&& event.target.id == 'scrollingMenuCulture1'){
        leCendrierScrollingMenu(cultureSelectionScrollingMenu1)        
        cultureSelectionScrollingMenu1.style.display = 'block';
    }
    if (event.target.value === 'Phénandre'&& event.target.id == 'scrollingMenuCulture1'){
        phénandreScrollingMenu(cultureSelectionScrollingMenu1)        
        cultureSelectionScrollingMenu1.style.display = 'block';
    }
    if (event.target.value === 'Projet Frontière'&& event.target.id == 'scrollingMenuCulture1'){
        projetFrontièreScrollingMenu(cultureSelectionScrollingMenu1)        
        cultureSelectionScrollingMenu1.style.display = 'block';
    }
    if (event.target.value === 'Trois-Pointes'&& event.target.id == 'scrollingMenuCulture1'){
        troisPointesScrollingMenu(cultureSelectionScrollingMenu1)        
        cultureSelectionScrollingMenu1.style.display = 'block';
    }
    if (event.target.value === "Vallée d'Ylère"&& event.target.id == 'scrollingMenuCulture1'){
        valléedYlèreScrollingMenu(cultureSelectionScrollingMenu1)        
        cultureSelectionScrollingMenu1.style.display = 'block';
    }
    if (event.target.value === 'Ashvattha' && event.target.id == 'scrollingMenuCulture2'){ ///FIELD 2///
        ashvatthaScrollingMenu(cultureSelectionScrollingMenu2)        
        cultureSelectionScrollingMenu2.style.display = 'block';
    }
    if (event.target.value === 'Cloison'&& event.target.id == 'scrollingMenuCulture2'){
        cloisonScrollingMenu(cultureSelectionScrollingMenu2)        
        cultureSelectionScrollingMenu2.style.display = 'block';
    }
    if (event.target.value === 'Coron'&& event.target.id == 'scrollingMenuCulture2'){
        coronScrollingMenu(cultureSelectionScrollingMenu2)        
        cultureSelectionScrollingMenu2.style.display = 'block';
    }
    if (event.target.value === 'Gris-Gallons'&& event.target.id == 'scrollingMenuCulture2'){
        grisGallonsScrollingMenu(cultureSelectionScrollingMenu2)        
        cultureSelectionScrollingMenu2.style.display = 'block';
    }
    if (event.target.value === 'Le Plateau'&& event.target.id == 'scrollingMenuCulture2'){
        lePlateauScrollingMenu(cultureSelectionScrollingMenu2)        
        cultureSelectionScrollingMenu2.style.display = 'block';
    }
    if (event.target.value === 'Le Cendrier'&& event.target.id == 'scrollingMenuCulture2'){
        leCendrierScrollingMenu(cultureSelectionScrollingMenu2)        
        cultureSelectionScrollingMenu2.style.display = 'block';
    }
    if (event.target.value === 'Phénandre'&& event.target.id == 'scrollingMenuCulture2'){
        phénandreScrollingMenu(cultureSelectionScrollingMenu2)        
        cultureSelectionScrollingMenu2.style.display = 'block';
    }
    if (event.target.value === 'Projet Frontière'&& event.target.id == 'scrollingMenuCulture2'){
        projetFrontièreScrollingMenu(cultureSelectionScrollingMenu2)        
        cultureSelectionScrollingMenu2.style.display = 'block';
    }
    if (event.target.value === 'Trois-Pointes'&& event.target.id == 'scrollingMenuCulture2'){
        troisPointesScrollingMenu(cultureSelectionScrollingMenu2)        
        cultureSelectionScrollingMenu2.style.display = 'block';
    }
    if (event.target.value === "Vallée d'Ylère"&& event.target.id == 'scrollingMenuCulture2'){
        valléedYlèreScrollingMenu(cultureSelectionScrollingMenu2)        
        cultureSelectionScrollingMenu2.style.display = 'block';
    }
    if (event.target.value === 'Ashvattha'&& event.target.id == 'scrollingMenuCulture3'){   ///FIELD 3///
        ashvatthaScrollingMenu(cultureSelectionScrollingMenu3)        
        cultureSelectionScrollingMenu3.style.display = 'block';
    }
    if (event.target.value === 'Cloison'&& event.target.id == 'scrollingMenuCulture3'){
        cloisonScrollingMenu(cultureSelectionScrollingMenu3)        
        cultureSelectionScrollingMenu3.style.display = 'block';
    }
    if (event.target.value === 'Coron'&& event.target.id == 'scrollingMenuCulture3'){
        coronScrollingMenu(cultureSelectionScrollingMenu3)        
        cultureSelectionScrollingMenu3.style.display = 'block';
    }
    if (event.target.value === 'Gris-Gallons'&& event.target.id == 'scrollingMenuCulture3'){
        grisGallonsScrollingMenu(cultureSelectionScrollingMenu3)        
        cultureSelectionScrollingMenu3.style.display = 'block';
    }
    if (event.target.value === 'Le Plateau'&& event.target.id == 'scrollingMenuCulture3'){
        lePlateauScrollingMenu(cultureSelectionScrollingMenu3)        
        cultureSelectionScrollingMenu3.style.display = 'block';
    }
    if (event.target.value === 'Le Cendrier'&& event.target.id == 'scrollingMenuCulture3'){
        leCendrierScrollingMenu(cultureSelectionScrollingMenu3)        
        cultureSelectionScrollingMenu3.style.display = 'block';
    }
    if (event.target.value === 'Phénandre'&& event.target.id == 'scrollingMenuCulture3'){
        phénandreScrollingMenu(cultureSelectionScrollingMenu3)        
        cultureSelectionScrollingMenu3.style.display = 'block';
    }
    if (event.target.value === 'Projet Frontière'&& event.target.id == 'scrollingMenuCulture3'){
        projetFrontièreScrollingMenu(cultureSelectionScrollingMenu3)        
        cultureSelectionScrollingMenu3.style.display = 'block';
    }
    if (event.target.value === 'Trois-Pointes'&& event.target.id == 'scrollingMenuCulture3'){
        troisPointesScrollingMenu(cultureSelectionScrollingMenu3)        
        cultureSelectionScrollingMenu3.style.display = 'block';
    }
    if (event.target.value === "Vallée d'Ylère"&& event.target.id == 'scrollingMenuCulture3'){
        valléedYlèreScrollingMenu(cultureSelectionScrollingMenu3)        
        cultureSelectionScrollingMenu3.style.display = 'block';
    }
    if (event.target.value === 'Ashvattha'&& event.target.id == 'scrollingMenuCulture4'){     ///FIELD 4///
        ashvatthaScrollingMenu(cultureSelectionScrollingMenu4)        
        cultureSelectionScrollingMenu4.style.display = 'block';
    }
    if (event.target.value === 'Cloison'&& event.target.id == 'scrollingMenuCulture4'){
        cloisonScrollingMenu(cultureSelectionScrollingMenu4)        
        cultureSelectionScrollingMenu4.style.display = 'block';
    }
    if (event.target.value === 'Coron'&& event.target.id == 'scrollingMenuCulture4'){
        coronScrollingMenu(cultureSelectionScrollingMenu4)        
        cultureSelectionScrollingMenu4.style.display = 'block';
    }
    if (event.target.value === 'Gris-Gallons'&& event.target.id == 'scrollingMenuCulture4'){
        grisGallonsScrollingMenu(cultureSelectionScrollingMenu4)        
        cultureSelectionScrollingMenu4.style.display = 'block';
    }
    if (event.target.value === 'Le Plateau'&& event.target.id == 'scrollingMenuCulture4'){
        lePlateauScrollingMenu(cultureSelectionScrollingMenu4)        
        cultureSelectionScrollingMenu4.style.display = 'block';
    }
    if (event.target.value === 'Le Cendrier'&& event.target.id == 'scrollingMenuCulture4'){
        leCendrierScrollingMenu(cultureSelectionScrollingMenu4)        
        cultureSelectionScrollingMenu4.style.display = 'block';
    }
    if (event.target.value === 'Phénandre'&& event.target.id == 'scrollingMenuCulture4'){
        phénandreScrollingMenu(cultureSelectionScrollingMenu4)        
        cultureSelectionScrollingMenu4.style.display = 'block';
    }
    if (event.target.value === 'Projet Frontière'&& event.target.id == 'scrollingMenuCulture4'){
        projetFrontièreScrollingMenu(cultureSelectionScrollingMenu4)        
        cultureSelectionScrollingMenu4.style.display = 'block';
    }
    if (event.target.value === 'Trois-Pointes'&& event.target.id == 'scrollingMenuCulture4'){
        troisPointesScrollingMenu(cultureSelectionScrollingMenu4)        
        cultureSelectionScrollingMenu4.style.display = 'block';
    }
    if (event.target.value === "Vallée d'Ylère"&& event.target.id == 'scrollingMenuCulture4'){
        valléedYlèreScrollingMenu(cultureSelectionScrollingMenu4)        
        cultureSelectionScrollingMenu4.style.display = 'block';
    }
    if (event.target.value === 'Ashvattha'&& event.target.id == 'scrollingMenuCulture5'){      ///FIELD 5///
        ashvatthaScrollingMenu(cultureSelectionScrollingMenu5)        
        cultureSelectionScrollingMenu5.style.display = 'block';
    }
    if (event.target.value === 'Cloison'&& event.target.id == 'scrollingMenuCulture5'){
        cloisonScrollingMenu(cultureSelectionScrollingMenu5)        
        cultureSelectionScrollingMenu5.style.display = 'block';
    }
    if (event.target.value === 'Coron'&& event.target.id == 'scrollingMenuCulture5'){
        coronScrollingMenu(cultureSelectionScrollingMenu5)        
        cultureSelectionScrollingMenu5.style.display = 'block';
    }
    if (event.target.value === 'Gris-Gallons'&& event.target.id == 'scrollingMenuCulture5'){
        grisGallonsScrollingMenu(cultureSelectionScrollingMenu5)        
        cultureSelectionScrollingMenu5.style.display = 'block';
    }
    if (event.target.value === 'Le Plateau'&& event.target.id == 'scrollingMenuCulture5'){
        lePlateauScrollingMenu(cultureSelectionScrollingMenu5)        
        cultureSelectionScrollingMenu5.style.display = 'block';
    }
    if (event.target.value === 'Le Cendrier'&& event.target.id == 'scrollingMenuCulture5'){
        leCendrierScrollingMenu(cultureSelectionScrollingMenu5)        
        cultureSelectionScrollingMenu5.style.display = 'block';
    }
    if (event.target.value === 'Phénandre'&& event.target.id == 'scrollingMenuCulture5'){
        phénandreScrollingMenu(cultureSelectionScrollingMenu5)        
        cultureSelectionScrollingMenu5.style.display = 'block';
    }
    if (event.target.value === 'Projet Frontière'&& event.target.id == 'scrollingMenuCulture5'){
        projetFrontièreScrollingMenu(cultureSelectionScrollingMenu5)        
        cultureSelectionScrollingMenu5.style.display = 'block';
    }
    if (event.target.value === 'Trois-Pointes'&& event.target.id == 'scrollingMenuCulture5'){
        troisPointesScrollingMenu(cultureSelectionScrollingMenu5)        
        cultureSelectionScrollingMenu5.style.display = 'block';
    }
    if (event.target.value === "Vallée d'Ylère"&& event.target.id == 'scrollingMenuCulture5'){
        valléedYlèreScrollingMenu(cultureSelectionScrollingMenu5)        
        cultureSelectionScrollingMenu5.style.display = 'block';
    }

}


    function handlePeupleCheckboxes(event){

        const specificCharacter = "*"
        const checkbox = event.target;
        let cost = parseInt(checkbox.value, 10)

        if (checkbox.checked) {
            
            if (this.id == 'Magie Élémentaire Mineure' && this.checked){
                document.getElementById('Magie Élémentaire').disabled = false
            }
            if (this.id == 'Magie Élémentaire' && this.checked){
                document.getElementById('Magie Élémentaire Supérieure').disabled = false
                document.getElementById('Maitrîse Élémentaire').disabled = false
            }
            if (this.id == 'Queue Préhensile' && this.checked){
                document.getElementById("Mieux qu'un Bras").disabled = false
            }
            if (this.id == 'Agile' && this.checked){
                document.getElementById("Très Agile").disabled = false
            }
            if(this.id == 'Jamais vu un rat mort'&& this.checked){
                document.getElementById("Jamais~ vu un rat mort").disabled = false
            }
            if(this.id == "Sang Noir"&& this.checked){
                document.getElementById("Cataplasme de Sang Noir").disabled = false
                document.getElementById("Poison de Sang Noir").disabled = false
                document.getElementById("Sang Noir Regénérateur").disabled = false
            }
            if(this.id == "Liaison d'âme" && this.checked){
                document.getElementById("Brouillard Mental").disabled = false
                document.getElementById("Nescience").disabled = false
                document.getElementById("Lecture Mentale").disabled = false
            }
            if(this.id == "Connaissant"&& this.checked){
                document.getElementById("Très Connaissant").disabled = false
            }
            if(this.id == "Bond de Foi"&& this.checked){
                document.getElementById("Envergure d'Amaù").disabled = false
            }
            if(this.id == "Influence d'Ahanine"&& this.checked){
                document.getElementById("Symbiose").disabled = false
            }
            if(this.id == "Bond de foi"&& this.checked){
                document.getElementById("Envergure d'Ahanine").disabled = false
            }
            if(this.id == "Influence d'Amaù"&& this.checked){
                document.getElementById("Symbiose").disabled = false
            }
            if(this.id == "Mucus Empoisonné" && this.checked){
                document.getElementById("Mucus Suintant").disabled = false
            }
            
            délaisséHumainMulticlass(checkbox.id)
          
            if (checkbox.id == 'Vieilles Façons Mortelles'){
                const délaisséMenu1 = document.getElementById('délaisséMenu1');
                délaisséMenu1.style.display = 'block'
            }
            if (checkbox.id == 'Anciennes Façons Mortelles'){
                const délaisséMenu2 = document.getElementById('délaisséMenu2');
                délaisséMenu2.style.display = 'block'
            }


            if (peuplePoints + cost > 15){
                checkbox.checked = false;
                return; 
            }else if (checkbox.id.includes(specificCharacter)){             
                    starPeupleSkills ++
                    pointsContainer.value = parseInt(pointsContainer.value, 10) - cost - starPeupleSkills
                    peuplePoints = peuplePoints + cost + starPeupleSkills                
            } else{
                peuplePoints += cost    
                pointsContainer.value = parseInt(pointsContainer.value, 10) - cost
            }
            
        }else if(checkbox.type=='checkbox' && checkbox.checked == false){
            if (checkbox.id == 'Vieilles Façons Mortelles'){
                délaisséMenu1.style.display = 'none'
                pointsContainer.value = parseInt(pointsContainer.value, 10) + parseInt(previousDélaisséSkill['délaisséMenu1'], 10)                         
                previousDélaisséSkill['délaisséMenu1'] = 0
                délaisséMenu1.value = ''
                délaisséMenu1.dispatchEvent(new Event('change'))
            }
            if (checkbox.id == 'Anciennes Façons Mortelles'){
                délaisséMenu2.style.display = 'none'
                pointsContainer.value = parseInt(pointsContainer.value, 10) + parseInt(previousDélaisséSkill['délaisséMenu2'], 10)   
                previousDélaisséSkill['délaisséMenu2'] = 0
                délaisséMenu2.value = ''
                délaisséMenu2.dispatchEvent(new Event('change'))
            }
            if (this.id == 'Magie Élémentaire Mineure' && this.checked == false){
                if (document.getElementById('Magie Élémentaire').checked){
                    document.getElementById('Magie Élémentaire').checked = false
                    document.getElementById('Magie Élémentaire').disabled = true    
                    document.getElementById('Magie Élémentaire').dispatchEvent(new Event('change'));
                }
                if (document.getElementById('Magie Élémentaire Supérieure').checked){
                    document.getElementById('Magie Élémentaire Supérieure').checked = false
                    document.getElementById('Magie Élémentaire Supérieure').disabled = true
                    document.getElementById('Magie Élémentaire Supérieure').dispatchEvent(new Event('change'));
                    
                }
                if (document.getElementById('Maitrîse Élémentaire').checked){
                    document.getElementById('Maitrîse Élémentaire').checked = false
                    document.getElementById('Maitrîse Élémentaire').disabled = true
                    document.getElementById('Maitrîse Élémentaire').dispatchEvent(new Event('change'));
                }
                else{
                    document.getElementById('Magie Élémentaire').checked = false
                    document.getElementById('Magie Élémentaire').disabled = true 
                    document.getElementById('Magie Élémentaire Supérieure').checked = false
                    document.getElementById('Magie Élémentaire Supérieure').disabled = true
                    document.getElementById('Maitrîse Élémentaire').checked = false
                    document.getElementById('Maitrîse Élémentaire').disabled = true               
                }                                
            }
            if (this.id == 'Magie Élémentaire' && this.checked == false){
                if (document.getElementById('Magie Élémentaire Supérieure').checked){
                    document.getElementById('Magie Élémentaire Supérieure').checked = false
                    document.getElementById('Magie Élémentaire Supérieure').disabled = true
                    document.getElementById('Magie Élémentaire Supérieure').dispatchEvent(new Event('change'));
                }
                if (document.getElementById('Maitrîse Élémentaire').checked){
                    document.getElementById('Maitrîse Élémentaire').checked = false
                    document.getElementById('Maitrîse Élémentaire').disabled = true
                    document.getElementById('Maitrîse Élémentaire').dispatchEvent(new Event('change'));
                }
                else{
                    document.getElementById('Magie Élémentaire Supérieure').checked = false
                    document.getElementById('Magie Élémentaire Supérieure').disabled = true
                    document.getElementById('Maitrîse Élémentaire').checked = false
                    document.getElementById('Maitrîse Élémentaire').disabled = true
                }
            }
            if (this.id == 'Queue Préhensile' && this.checked == false){
                if (document.getElementById("Mieux qu'un Bras").checked){
                    document.getElementById("Mieux qu'un Bras").checked = false
                    document.getElementById("Mieux qu'un Bras").disabled = true
                    document.getElementById("Mieux qu'un Bras").dispatchEvent(new Event('change'));
                }
                else{
                    document.getElementById("Mieux qu'un Bras").checked = false
                    document.getElementById("Mieux qu'un Bras").disabled = true
                }
            }
            if (this.id == 'Agile' && this.checked == false){
                if (document.getElementById("Très Agile").checked){
                    document.getElementById("Très Agile").checked = false
                    document.getElementById("Très Agile").disabled = true    
                    document.getElementById("Très Agile").dispatchEvent(new Event('change'));
                }
                else{
                    document.getElementById("Très Agile").checked = false
                    document.getElementById("Très Agile").disabled = true
                }
            }
            if (this.id == 'Jamais vu un rat mort' && this.checked == false){
                if (document.getElementById('Jamais~ vu un rat mort').checked){
                    document.getElementById('Jamais~ vu un rat mort').checked = false
                    document.getElementById('Jamais~ vu un rat mort').disabled = true
                    document.getElementById("Jamais~ vu un rat mort").dispatchEvent(new Event('change'));
                }
                else{
                    document.getElementById('Jamais~ vu un rat mort').checked = false
                    document.getElementById('Jamais~ vu un rat mort').disabled = true
                }
            }
            if (this.id == 'Sang Noir' && this.checked == false){
                if (document.getElementById('Cataplasme de Sang Noir').checked){
                    document.getElementById('Cataplasme de Sang Noir').checked = false
                    document.getElementById('Cataplasme de Sang Noir').disabled = true
                    document.getElementById("Cataplasme de Sang Noir").dispatchEvent(new Event('change'));
                }
                if (document.getElementById('Poison de Sang Noir').checked){
                    document.getElementById('Poison de Sang Noir').checked = false
                    document.getElementById('Poison de Sang Noir').disabled = true
                    document.getElementById("Poison de Sang Noir").dispatchEvent(new Event('change'));
                }
                if (document.getElementById('Sang Noir Regénérateur').checked){
                    document.getElementById('Sang Noir Regénérateur').checked = false
                    document.getElementById('Sang Noir Regénérateur').disabled = true
                    document.getElementById("Sang Noir Regénérateur").dispatchEvent(new Event('change'));
                }
                else{
                    document.getElementById('Cataplasme de Sang Noir').checked = false
                    document.getElementById('Cataplasme de Sang Noir').disabled = true
                    document.getElementById('Poison de Sang Noir').checked = false
                    document.getElementById('Poison de Sang Noir').disabled = true
                    document.getElementById('Sang Noir Regénérateur').checked = false
                    document.getElementById('Sang Noir Regénérateur').disabled = true
                }               
            }
            if(this.id == "Liaison d'âme" && this.checked == false){
                if (document.getElementById("Brouillard Mental").checked){
                    document.getElementById("Brouillard Mental").checked = false
                    document.getElementById("Brouillard Mental").disabled = true
                    document.getElementById("Brouillard Mental").dispatchEvent(new Event('change'));
                }
                if (document.getElementById("Nescience").checked){
                    document.getElementById("Nescience").checked = false
                    document.getElementById("Nescience").disabled = true
                    document.getElementById("Nescience").dispatchEvent(new Event('change'));
                }
                else{
                    document.getElementById("Brouillard Mental").checked = false
                    document.getElementById("Brouillard Mental").disabled = true
                    document.getElementById("Nescience").checked = false
                    document.getElementById("Nescience").disabled = true
                }
            }
            if(this.id == "Connaissant" && this.checked == false){
                if(document.getElementById("Très Connaissant").checked){
                    document.getElementById("Très Connaissant").checked = false
                    document.getElementById("Très Connaissant").disabled = true
                    document.getElementById("Très Connaissant").dispatchEvent(new Event('change'));
                }
                else{
                    document.getElementById("Très Connaissant").checked = false
                    document.getElementById("Très Connaissant").disabled = true
                }
            }
            if(this.id == "Bond de Foi" && this.checked == false){
                if(document.getElementById("Envergure d'Amaù").checked){
                    document.getElementById("Envergure d'Amaù").checked = false
                    document.getElementById("Envergure d'Amaù").disabled = true
                    document.getElementById("Envergure d'Amaù").dispatchEvent(new Event('change'));
                }
                else{
                    document.getElementById("Envergure d'Amaù").checked = false
                    document.getElementById("Envergure d'Amaù").disabled = true
                }
            }
            if(this.id == "Influence d'Ahanine" && this.checked == false){
                if(document.getElementById("Symbiose").checked){
                    document.getElementById("Symbiose").checked = false
                    document.getElementById("Symbiose").disabled = true
                    document.getElementById("Symbiose").dispatchEvent(new Event('change'));
                }
                else{
                    document.getElementById("Symbiose").checked = false
                    document.getElementById("Symbiose").disabled = true
                }
            }
            if(this.id == "Bond de foi" && this.checked == false){
                if(document.getElementById("Envergure d'Ahanine").checked){
                    document.getElementById("Envergure d'Ahanine").checked = false
                    document.getElementById("Envergure d'Ahanine").disabled = true
                    document.getElementById("Envergure d'Ahanine").dispatchEvent(new Event('change'));
                }
                else{
                    document.getElementById("Envergure d'Ahanine").checked = false
                    document.getElementById("Envergure d'Ahanine").disabled = true
                }
            }
            if(this.id == "Influence d'Amaù" && this.checked == false){
                if(document.getElementById("Symbiose").checked){
                    document.getElementById("Symbiose").checked = false
                    document.getElementById("Symbiose").disabled = true
                    document.getElementById("Symbiose").dispatchEvent(new Event('change'));
                }
                else{
                    document.getElementById("Symbiose").checked = false
                    document.getElementById("Symbiose").disabled = true
                }
            }
            if(this.id == "Mucus Empoisonné" && this.checked == false){
                if(document.getElementById("Mucus Suintant").checked){
                    document.getElementById("Mucus Suintant").checked = false
                    document.getElementById("Mucus Suintant").disabled = true
                    document.getElementById("Mucus Suintant").dispatchEvent(new Event('change'));
                }
                else{
                    document.getElementById("Mucus Suintant").checked = false
                    document.getElementById("Mucus Suintant").disabled = true
                }
            }
            délaisséHumainDémulticlass(checkbox.id, document.getElementById('délaisséMenu1'))        
              
            if (checkbox.id.includes(specificCharacter)){  

                peuplePoints = peuplePoints - cost - starPeupleSkills
                pointsContainer.value = parseInt(pointsContainer.value, 10) + cost + starPeupleSkills
                starPeupleSkills --
            } else{
                peuplePoints -= cost
                pointsContainer.value = parseInt(pointsContainer.value, 10) + cost          
            }
        }
    }   
  });
  

//Culture checkboxes and logic//
document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('Choisi').value = dédicaceData.Choisi.cost
    document.getElementById('Connecté').value = dédicaceData.Connecté.cost
    document.getElementById('Prévoyant').value = dédicaceData.Prévoyant.cost
    document.getElementById('Ritualiste').value = dédicaceData.Ritualiste.cost

    const cultureSelect = document.getElementById('Culture');
    const cultureskillsContainer = document.getElementById('cultureskills-container');
  
    cultureSelect.addEventListener('change', function () {
      updateCultureskills(this.value);
    });

    function updateCultureskills(selectedCulture) {
         // Query all checked checkboxes within cultureskillsContainer
         const checkedCheckboxes = cultureskillsContainer.querySelectorAll('input[type="checkbox"]:checked');

    // Loop through the NodeList of checked checkboxes
    checkedCheckboxes.forEach(checkbox => {
    checkbox.checked = false; // Uncheck the checkbox
    checkbox.dispatchEvent(new Event('change')); // Dispatch change event
    });

  cultureskillsContainer.innerHTML = ''; // Clear the container
      const skills = cultureData[selectedCulture];
      skills.forEach(skill => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = skill.cultureskill;
        checkbox.dataset.tooltip = skill.Description;
        checkbox.value = skill.cost;
        checkbox.addEventListener('change', handlecultureChange);
        const label = document.createElement('label');
        label.htmlFor = skill.cultureskill;
        label.appendChild(document.createTextNode(`${skill.cultureskill} (${skill.cost})`));
        cultureskillsContainer.appendChild(checkbox);
        cultureskillsContainer.appendChild(label);
        cultureskillsContainer.appendChild(document.createElement('br'));
        createCustomTooltip(checkbox)

      });
    }
  
    // Initialize cultureskills with the first culture
    updateCultureskills(cultureSelect.value);

    function handlecultureChange(event){
        var choisiCheckbox = document.getElementById('Choisi');
        var connectéCheckbox = document.getElementById('Connecté');
        var prévoyantCheckbox = document.getElementById('Prévoyant');
        var ritualisteCheckbox = document.getElementById('Ritualiste');

        const checkbox = event.target;
        
        let cost = parseInt(checkbox.value, 10); // Convert the cost to a number
        if (checkbox.checked) 
        {
            if(choisiCheckbox.checked && (checkbox.id == 'Religion*' || checkbox.id == 'The City*' || checkbox.id == 'Insight*'|| checkbox.id == 'Dévoué'|| checkbox.id == 'Connections'|| checkbox.id == 'Richesses'|| checkbox.id == 'Discrètement Armé'|| checkbox.id == 'Wilderness*'|| checkbox.id == 'Climb*'|| checkbox.id == 'Acrobatics*'|| checkbox.id == "Cadeau de l'arbre" || checkbox.id == 'Murmures de la brise'|| checkbox.id == 'Compagnon'|| checkbox.id == 'Pouce-vert'))
            {
            pointsContainer.value = parseInt(pointsContainer.value, 10) - cost + 1
                if (checkbox.id == 'Religion*' || checkbox.id == 'The City*' || checkbox.id == 'Insight*'||checkbox.id == 'Wilderness*'|| checkbox.id == 'Climb*'|| checkbox.id == 'Acrobatics*')
                    {
                    starCultureSkills ++    
                        if(starCultureSkills == 3)
                        {
                            pointsContainer.value = parseInt(pointsContainer.value, 10) - 1
                        }
                    }
            }
            else if(connectéCheckbox.checked && (checkbox.id == 'Swim*' || checkbox.id == 'Deception*' || checkbox.id == 'Awareness*'|| checkbox.id == 'Entrainement'|| checkbox.id == 'Cuisine de quartier'|| checkbox.id == 'Communauté'|| checkbox.id == 'Coudes serrés'|| checkbox.id == 'Streetwise*' || checkbox.id == 'Stealth*'|| checkbox.id == 'Intimidation*'|| checkbox.id == "C'est quoi lui, y'a un gun?"|| checkbox.id == "Dormir d'un Oeil" || checkbox.id == 'Gang de rue'|| checkbox.id == 'Bricoleur créatif'))
            {
            pointsContainer.value = parseInt(pointsContainer.value, 10) - cost + 1
                if (checkbox.id == 'Swim*' || checkbox.id == 'Deception*' || checkbox.id == 'Awareness*'||checkbox.id == 'Streetwise*' || checkbox.id == 'Stealth*'|| checkbox.id == 'Intimidation*')
                    {
                    starCultureSkills ++    
                        if(starCultureSkills == 3)
                        {
                            pointsContainer.value = parseInt(pointsContainer.value, 10) - 1
                        }
                    }
            }
            else if(prévoyantCheckbox.checked && (checkbox.id == 'Disguise*' || checkbox.id == 'Thievery*' || checkbox.id == 'Escape Artist*'|| checkbox.id == "Entouré d'armes"|| checkbox.id == 'Jamais au dépourvu'|| checkbox.id == "Faim d'oiseau" || checkbox.id == 'Fondre dans foule'|| checkbox.id == 'Persuasion*' || checkbox.id == 'Tactics and Logistics*'|| checkbox.id == 'Power*'|| checkbox.id == 'Style bien à vous'|| checkbox.id == "Le flair pour l'aubaine" || checkbox.id == 'Caravanier'|| checkbox.id == 'Combattant captivant'))
            {
            pointsContainer.value = parseInt(pointsContainer.value, 10) - cost + 1
                if (checkbox.id == 'Disguise*' || checkbox.id == 'Thievery*' || checkbox.id == 'Escape Artist*'||checkbox.id == 'Persuasion*' || checkbox.id == 'Tactics and Logistics*'|| checkbox.id == 'Power*')
                    {
                    starCultureSkills ++    
                        if(starCultureSkills == 3)
                        {
                            pointsContainer.value = parseInt(pointsContainer.value, 10) - 1
                        }
                    }
            }
            else if(ritualisteCheckbox.checked && (checkbox.id == 'Endurance*' || checkbox.id == 'Old world*' || checkbox.id == 'Dungeoneering*'|| checkbox.id == 'Morceau du vieux-monde'|| checkbox.id == 'Nouveau jour, même merde'|| checkbox.id == 'Heures supplémentaires'|| checkbox.id == 'Détection de trace'|| checkbox.id == 'Arcana*'|| checkbox.id == 'Medecine*'|| checkbox.id == 'Concentration*'|| checkbox.id == "Uniforme Universitaire" || checkbox.id == "Champ d'étude"|| checkbox.id == 'Corps à la science'|| checkbox.id == 'Alchimie'))
            {
            pointsContainer.value = parseInt(pointsContainer.value, 10) - cost + 1
                if (checkbox.id == 'Endurance*' || checkbox.id == 'Old world*' || checkbox.id == 'Dungeoneering*')
                    {
                    starCultureSkills ++    
                        if(starCultureSkills == 3)
                        {
                            pointsContainer.value = parseInt(pointsContainer.value, 10) - 1
                        }
                    }
            }

            

            else
                {
                pointsContainer.value = parseInt(pointsContainer.value, 10) - cost
                    if (checkbox.id == 'Wilderness*' || checkbox.id == 'Climb*'||checkbox.id == 'Acrobatics*'||checkbox.id == 'Swim*'||checkbox.id == 'Deception*'||checkbox.id == 'Awareness*'||checkbox.id == 'Persuasion*'||checkbox.id == 'Tactics and Logistics*'||checkbox.id == 'Power*'||checkbox.id == 'Disguise*'||checkbox.id == 'Thievery*'||checkbox.id == 'Escape Artist*'||checkbox.id == 'Religion*'||checkbox.id == 'The City*'||checkbox.id == 'Insight*'||checkbox.id == 'Endurance*'||checkbox.id == 'Old World*'||checkbox.id == 'Dungeoneering*'||checkbox.id == 'Arcana*'||checkbox.id == 'Medecine*'||checkbox.id == 'Concentration*'||checkbox.id == 'Wilderness*'||checkbox.id == 'Old World*'||checkbox.id == 'Stealth*'||checkbox.id == 'Streetwise*'||checkbox.id == 'Stealth*'||checkbox.id == 'Intimidation*'||checkbox.id == 'Disguise*'||checkbox.id == 'Endurance*'||checkbox.id == 'Climb*')
                    {
                        starCultureSkills ++    
                        if(starCultureSkills == 3)
                        {
                            pointsContainer.value = parseInt(pointsContainer.value, 10) - 1
                        }
                    }
                }
        }



        else if(choisiCheckbox.checked && (checkbox.id == 'Religion*' || checkbox.id == 'The City*' || checkbox.id == 'Insight*'|| checkbox.id == 'Dévoué'|| checkbox.id == 'Connections'|| checkbox.id == 'Richesses'|| checkbox.id == 'Discrètement Armé'|| checkbox.id == 'Wilderness*'|| checkbox.id == 'Climb*'|| checkbox.id == 'Acrobatics*'|| checkbox.id == "Cadeau de l'arbre" || checkbox.id == 'Murmures de la brise'|| checkbox.id == 'Compagnon'|| checkbox.id == 'Pouce-vert'))
            {
            pointsContainer.value = parseInt(pointsContainer.value, 10) + cost - 1
                if (checkbox.id == 'Religion*' || checkbox.id == 'The City*' || checkbox.id == 'Insight*')                   
                {
                    starCultureSkills --    
                    if(starCultureSkills == 2)
                    {
                        pointsContainer.value = parseInt(pointsContainer.value, 10) + 1
                    }
                }
                    
            }

        else if(connectéCheckbox.checked && (checkbox.id == 'Swim*' || checkbox.id == 'Deception*' || checkbox.id == 'Awareness*'|| checkbox.id == 'Entrainement'|| checkbox.id == 'Cuisine de quartier'|| checkbox.id == 'Communauté'|| checkbox.id == 'Coudes serrés'|| checkbox.id == 'Streetwise*' || checkbox.id == 'Stealth*'|| checkbox.id == 'Intimidation*'|| checkbox.id == "C'est quoi lui, y'a un gun?"|| checkbox.id == "Dormir d'un Oeil" || checkbox.id == 'Gang de rue'|| checkbox.id == 'Bricoleur créatif'))
        {
        pointsContainer.value = parseInt(pointsContainer.value, 10) + cost - 1
            if (checkbox.id == 'Swim*' || checkbox.id == 'Deception*' || checkbox.id == 'Awareness*')                   
            {
                starCultureSkills --    
                if(starCultureSkills == 2)
                {
                    pointsContainer.value = parseInt(pointsContainer.value, 10) + 1
                }
            }
                
        }
        else if(prévoyantCheckbox.checked && (checkbox.id == 'Disguise*' || checkbox.id == 'Thievery*' || checkbox.id == 'Escape Artist*'|| checkbox.id == "Entouré d'armes"|| checkbox.id == 'Jamais au dépourvu'|| checkbox.id == "Faim d'oiseau" || checkbox.id == 'Fondre dans foule'|| checkbox.id == 'Persuasion*' || checkbox.id == 'Tactics and Logistics*'|| checkbox.id == 'Power*'|| checkbox.id == 'Style bien à vous'|| checkbox.id == "Le flair pour l'aubaine" || checkbox.id == 'Caravanier'|| checkbox.id == 'Combattant captivant'))
        {
        pointsContainer.value = parseInt(pointsContainer.value, 10) + cost - 1
            if (checkbox.id == 'Swim*' || checkbox.id == 'Deception*' || checkbox.id == 'Awareness*')                   
            {
                starCultureSkills --    
                if(starCultureSkills == 2)
                {
                    pointsContainer.value = parseInt(pointsContainer.value, 10) + 1
                }
            }
                
        }

        else if(ritualisteCheckbox.checked && (checkbox.id == 'Endurance*' || checkbox.id == 'Old world*' || checkbox.id == 'Dungeoneering*'|| checkbox.id == 'Morceau du vieux-monde'|| checkbox.id == 'Nouveau jour, même merde'|| checkbox.id == 'Heures supplémentaires'|| checkbox.id == 'Détection de trace'|| checkbox.id == 'Arcana*'|| checkbox.id == 'Medecine*'|| checkbox.id == 'Concentration*'|| checkbox.id == "Uniforme Universitaire" || checkbox.id == "Champ d'étude"|| checkbox.id == 'Corps à la science'|| checkbox.id == 'Alchimie'))
        {
        pointsContainer.value = parseInt(pointsContainer.value, 10) + cost - 1
            if (checkbox.id == 'Endurance*' || checkbox.id == 'Old world*' || checkbox.id == 'Dungeoneering*')                   
            {
                starCultureSkills --    
                if(starCultureSkills == 2)
                {
                    pointsContainer.value = parseInt(pointsContainer.value, 10) + 1
                }
            }
                
        }
        else
                {
                pointsContainer.value = parseInt(pointsContainer.value, 10) + cost
                    if (checkbox.id == 'Wilderness*' || checkbox.id == 'Climb*'||checkbox.id == 'Acrobatics*'||checkbox.id == 'Swim*'||checkbox.id == 'Deception*'||checkbox.id == 'Awareness*'||checkbox.id == 'Persuasion*'||checkbox.id == 'Tactics and Logistics*'||checkbox.id == 'Power*'||checkbox.id == 'Disguise*'||checkbox.id == 'Thievery*'||checkbox.id == 'Escape Artist*'||checkbox.id == 'Religion*'||checkbox.id == 'The City*'||checkbox.id == 'Insight*'||checkbox.id == 'Endurance*'||checkbox.id == 'Old World*'||checkbox.id == 'Dungeoneering*'||checkbox.id == 'Arcana*'||checkbox.id == 'Medecine*'||checkbox.id == 'Concentration*'||checkbox.id == 'Wilderness*'||checkbox.id == 'Old World*'||checkbox.id == 'Stealth*'||checkbox.id == 'Streetwise*'||checkbox.id == 'Stealth*'||checkbox.id == 'Intimidation*'||checkbox.id == 'Disguise*'||checkbox.id == 'Endurance*'||checkbox.id == 'Climb*')
                    {
                        starCultureSkills --    
                        if(starCultureSkills == 2)
                        {
                            pointsContainer.value = parseInt(pointsContainer.value, 10) + 1
                        }
                    }
                }

        }   
        
    });

//Historique checkboxes and logic//
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('Choisi').value = dédicaceData.Choisi.cost
    document.getElementById('Connecté').value = dédicaceData.Connecté.cost
    document.getElementById('Prévoyant').value = dédicaceData.Prévoyant.cost
    document.getElementById('Ritualiste').value = dédicaceData.Ritualiste.cost
    const historiqueSelect = document.getElementById('Historique');
    const historiqueskillsContainer = document.getElementById('historiqueskills-container');
  
    historiqueSelect.addEventListener('change', function () {
      updateHistoriqueskills(this.value);
    });
  
    function updateHistoriqueskills(selectedHistorique) {
        // Query all checked checkboxes within historiqueskillsContainer
        const checkedCheckboxes = historiqueskillsContainer.querySelectorAll('input[type="checkbox"]:checked');
      
        // Loop through the NodeList of checked checkboxes
        checkedCheckboxes.forEach(checkbox => {
          checkbox.checked = false; // Uncheck the checkbox
          checkbox.dispatchEvent(new Event('change')); // Dispatch change event
        });
      
        historiqueskillsContainer.innerHTML = ''; // Clear the container
      
        // ... rest of updateHistoriqueskills function
        const skills = historiqueData[selectedHistorique];
        skills.forEach(skill => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = skill.historiqueskill;
            checkbox.value = skill.cost;
            checkbox.dataset.tooltip = skill.Description;
            checkbox.addEventListener('change', handlehistoriqueChange);
            const label = document.createElement('label');
            label.htmlFor = skill.historiqueskill;
            label.appendChild(document.createTextNode(`${skill.historiqueskill} (${skill.cost})`));
            historiqueskillsContainer.appendChild(checkbox);
            historiqueskillsContainer.appendChild(label);
            historiqueskillsContainer.appendChild(document.createElement('br'));
            createCustomTooltip(checkbox)
        });
      }
  
    // Initialize historiqueskills with the first historique
    updateHistoriqueskills(historiqueSelect.value);

    
    function handlehistoriqueChange(event){
        const checkbox = event.target;

        var choisiCheckbox = document.getElementById('Choisi');
        var connectéCheckbox = document.getElementById('Connecté');
        var prévoyantCheckbox = document.getElementById('Prévoyant');
        var ritualisteCheckbox = document.getElementById('Ritualiste');

        const checkboxes = document.querySelectorAll('#historiqueskills-container input[type="checkbox"]');
        let cost = parseInt(checkbox.value, 10); // Convert the cost to a number
        if (checkbox.checked) {          
            if(choisiCheckbox.checked && (checkbox.id == 'Acolyte' || checkbox.id == 'Ex-Cultiste' ||checkbox.id == 'Advokiste')|| (checkbox.id == 'Garde' || checkbox.id == 'Mercenaire' ||checkbox.id == 'Gladiateur')){
                pointsContainer.value = parseInt(pointsContainer.value, 10) - cost + 1
                    if (checkbox.id == 'Advokiste'){
                    pointsContainer.value = parseInt(pointsContainer.value, 10) + 1
                    }
                }
            else if(connectéCheckbox.checked && (checkbox.id == 'Polisson' || checkbox.id == 'Scélérat' ||checkbox.id == 'Empoisonneur') || (checkbox.id == 'Fermier' || checkbox.id == 'Mineur' ||checkbox.id == 'Maçon')){
                pointsContainer.value = parseInt(pointsContainer.value, 10) - cost + 1
                    if (checkbox.id == 'Scélérat'){
                    pointsContainer.value = parseInt(pointsContainer.value, 10) + 1
                    }
                }    
            else  if(prévoyantCheckbox.checked && (checkbox.id == 'Vagabond' || checkbox.id == 'Marchand' ||checkbox.id == 'Savant') || (checkbox.id == 'Commerçant' || checkbox.id == 'Agent Corporatif' ||checkbox.id == 'Artisan') || checkbox.id == 'Savant'){
                pointsContainer.value = parseInt(pointsContainer.value, 10) - cost + 1

                }
            else if(ritualisteCheckbox.checked && (checkbox.id == 'Érudit' || checkbox.id == 'Mystico' ||checkbox.id == 'Savant') || (checkbox.id == 'Incompris' || checkbox.id == 'Traceur' ||checkbox.id == 'Insuffleur')){
                pointsContainer.value = parseInt(pointsContainer.value, 10) - cost + 1
                if (checkbox.id == 'Savant'){
                    pointsContainer.value = parseInt(pointsContainer.value, 10) + 1
                    }
                }

            else{
                pointsContainer.value = parseInt(pointsContainer.value, 10) - cost
                }}   
         
        else if(choisiCheckbox.checked && (checkbox.id == 'Acolyte' || checkbox.id == 'Ex-Cultiste' ||checkbox.id == 'Advokiste')){
            pointsContainer.value = parseInt(pointsContainer.value, 10) + cost - 1
            if (checkbox.id == 'Advokiste'){
                pointsContainer.value = parseInt(pointsContainer.value, 10) - 1
                }
            }
        else if(connectéCheckbox.checked && (checkbox.id == 'Polisson' || checkbox.id == 'Scélérat' ||checkbox.id == 'Empoisonneur') || (checkbox.id == 'Fermier' || checkbox.id == 'Mineur' ||checkbox.id == 'Maçon')){
            pointsContainer.value = parseInt(pointsContainer.value, 10) + cost - 1
                if (checkbox.id == 'Scélérat'){
                pointsContainer.value = parseInt(pointsContainer.value, 10) - 1
                }
            }    
        else  if(prévoyantCheckbox.checked && (checkbox.id == 'Vagabond' || checkbox.id == 'Marchand' ||checkbox.id == 'Savant') || (checkbox.id == 'Commerçant' || checkbox.id == 'Agent Corporatif' ||checkbox.id == 'Artisan') || checkbox.id == 'Savant'){
                pointsContainer.value = parseInt(pointsContainer.value, 10) + cost - 1
                }
        else if(ritualisteCheckbox.checked && (checkbox.id == 'Érudit' || checkbox.id == 'Mystico' ||checkbox.id == 'Savant') || (checkbox.id == 'Incompris' || checkbox.id == 'Traceur' ||checkbox.id == 'Insuffleur')){
                pointsContainer.value = parseInt(pointsContainer.value, 10) + cost - 1
                if (checkbox.id == 'Savant'){
                    pointsContainer.value = parseInt(pointsContainer.value, 10) - 1
                    }
                }
        

        else{
        pointsContainer.value = parseInt(pointsContainer.value, 10) + cost
        }}   
    }
  );

//Dédicace descriptions and costs// 
  var dédicaceData = {
    Choisi:[
        {Cost: 6, Description: "• Pré-requis : Wis 13 et spécial, selon Dieu.<br>• Vous êtes né dans de circonstances cosmiques bien particulière, laissant votre âme et votre personne marquée par la constellation d'un Dieu. Vous avez accès à la constellation de votre Dieu et débutez avec le premier noeud de débloqué."},
    ],
    Connecté:[
        {Cost: 5, Description: "• Pré-requis : Cha 13 ou Str 13.<br>• Peu importe où vous allez, vous connaissez toujours quelqu'un qui vous en doit une. À chaque fois que vous complétez un Long Rest, vous gagnez un Friend Point spécial. Vous ne pouvez jamais avoir plus qu'un point d'accumulé avec cette Dédicace. Lorsque vous utilisez le point, vous procéder comme avec un Friend Point normal, mais le NPC créé vous est favorable pour un seul service."},
    ],
    Prévoyant:[
        {Cost: 5, Description: "• Pré-requis : Int 13.<br>• Le contenu de votre sac est plus qu'un mystère, mais il ne cesse jamais de vous sortir du pétrin. Lorsque vous utilisez un Preparedness Point, le coût est diminué de moitié et vous n'êtes pas limités aux objets standards."},
    ],
    Ritualiste:[
        {Cost: 6, Description: "• Pré-requis : Int 13 ou Wis 13.<br>• Vous avez longuement étudier les manières dont la magie s'exprime dans le monde et avez appris sa forme lente, mais puissante. Vous possédez un répertoire de rituels, avec l'apparence de votre choix, généralement des parchemins, un grimoire, ou une tablette, qui vous permet de lancer des sorts en tant que Ritual. Votre débutez avec deux sorts niveau 1 dans votre répertoire, et pourrez en découvrir d'autres à travers vos aventures, ou avec du Downtime."},
    ]
}

//Dédicace checkboxes and logic//  
document.addEventListener('DOMContentLoaded', () => {
    
    const tooltip = document.getElementById('customTooltip'); // Ensure this tooltip element exists in your HTML
    const dedicaceForm = document.getElementById('dédicace-form'); // Ensure the form is correctly selected
    dedicaceForm.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', handlededicaceChange);
        // Mouseover event listener to show the tooltip
        const key = checkbox.getAttribute('data-key'); // Get the key from data-key attribute
        const description = dédicaceData[key][0].Description; // Access the description from dédicaceData
        checkbox.dataset.tooltip = description
        createCustomTooltip(checkbox)
  
    });
  
    function handlededicaceChange(event) {
        const checkbox = event.target;
        if (checkbox.checked) {
            updateDedicaceCost()
            pointsContainer.value = parseInt(pointsContainer.value, 10) - parseInt(checkbox.getAttribute('value'), 10); // Retrieve the cost attribute;        
        } 
        else {
            updateDedicaceCost()
            pointsContainer.value = parseInt(pointsContainer.value, 10) + parseInt(checkbox.getAttribute('value'), 10); // Retrieve the cost attribute;   
        }
        
    }

    
});


