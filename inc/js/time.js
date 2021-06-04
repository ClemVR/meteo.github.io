const dayWeek = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
let ajd = new Date();
let options = {weekday: 'long'};

let jourActuel = ajd.toLocaleDateString('fr-FR', options);


jourActuel = jourActuel.charAt(0).toUpperCase()+ jourActuel.slice(1);


let tabDayOrder = dayWeek.slice(dayWeek.indexOf(jourActuel)).concat(dayWeek.slice(0, dayWeek.indexOf(dayWeek)));


console.log("nixam")

export default tabDayOrder;