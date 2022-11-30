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
    //Contenir tout les titre h2
    let titre = document.getElementById("contenu").getElementsByTagName("h2");
    //Ajouter les titres au navigateur
    for(let i = 0;i<titre.length;i++)
    {
        titre[i].id += "a" + String(i);
        document.getElementById("navigation").innerHTML += "<div><a href=\"#a" + String(i) + "\">" + titre[i].innerHTML + "</a></div>";
    }
}

addEventListener('load', loadProjet);