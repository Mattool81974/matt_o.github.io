//connexion aux bases de données Parse
Parse.initialize("AMa09UbnCvFl8yWQNkDaNRaaEWstk33D96fDHWm5", "jy5DhPcKZqCzQN0HaB8u7fYlHQC5g2OHVxV4WVYs");
Parse.serverURL = "https://parseapi.back4app.com/";

//Chargement de la page selon le projet
async function loadProjet(){
    //Avoir le nom du projet
    let nom = window.name;
    //Changer le titre de la page
    window.document.title = nom;
    document.getElementById("titreprincipalepage").innerHTML = nom;
    //Query le projet
    let projets = Parse.Object.extend("Projects");
    let query = new Parse.Query(projets);
    query.equalTo("Name", nom);
    let projet = await query.find();
    //Changer le html
    document.getElementById("contenu").innerHTML = projet[0].get("HTMLBody");
}

addEventListener('load', loadProjet);