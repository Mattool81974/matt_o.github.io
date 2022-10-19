//connexion aux bases de données Parse
Parse.initialize("AMa09UbnCvFl8yWQNkDaNRaaEWstk33D96fDHWm5", "jy5DhPcKZqCzQN0HaB8u7fYlHQC5g2OHVxV4WVYs");
Parse.serverURL = "https://parseapi.back4app.com/";

//Fonction permettant de lancer la page d'un projet
async function loadProject(p){
    //Ouverture de la page avec comme nom le nom du projet
    nw = window.open("other/projects/projet.html", p);
    nw.focus();
}

//Fonction asynchrone pour charges les projets
async function getProjects(){
    //Sous classe "Projects"
    let NewsParse = Parse.Object.extend("Projects");
    //Query pour rechercher tout les éléments dans "News"
    let query = new Parse.Query(NewsParse);
    //Texte finale pour les news (configuré pour une erreur)
    let texteFinale = "<p style=\"text-align: center;align-self: center;font-size: 36px;\">Erreur de connection inconnue.</p>";
    //Style du div parent (pour erreur de connection)
    let styleParent = "display: block;";
    try{
        //Obtenir tout les projets
        const projets = await query.find();

        //Reset texteFinale et styleParent
        styleParent="display: inline-flex;flex-wrap: wrap;flex-basis:5in;";
        texteFinale = "";
        //Création des éléments
        for(let i = 0;i<projets.length;i++)
        {
            texteFinale += "<article class=\"projet\" style=\"background-image: url(" + projets[i].get("BackgroundImageLink") + ");" + projets[i].get("ImageStyle") + "\">";
            texteFinale += "<h2><span style=\"" + projets[i].get("TitleStyle") + "\">" + projets[i].get("Name") + "</span></h2>";
            texteFinale += "<div class=\"support\" style=\"" + projets[i].get("SupportStyle") + "\"><p style=" + projets[i].get("TexteStyle") + ">"
                        + projets[i].get("Text") + "</p></div>";
            texteFinale += "<div class=\"boutonprojet\"><button type=\"button\" onclick=\"loadProject('" + projets[i].get("Name") + "')\" style=\"" + projets[i].get("ButtonStyle")
                        + "\">";
            texteFinale += "Accéder au projet \"" + projets[i].get("Name") + "\"</button></div>";
            texteFinale += "</article>"
        }
    }
    catch(err)
    {
        //En cas d'erreur
        texteFinale = "<p style=\"text-align: center;align-self: center;font-size: 36px;\">Erreur de connection: " + err.toString() + "</p>";
    }

    //Article apparaissant quoi qu'il arrive
    let contenuPremierArticle =
    "<article class=\"projet\" style=\"background-image: url('other/fond.png');\">"+
        "<h2 style=\"color: white;\">Site web</h2>"+
        "<div class=\"support\">" +
            "<p>Bon, est-je vraiment besoin de vous présenter celui là ? Pour le fun je vais le faire quand même. L'objectif est de partager plus facilement mon travail au monde entier."+ 
                "Avant, ça resté sur mon" +
                "pc et personne ne le voyais (ou on me traité de menteur). Donc voila. Je dit pas que c'est le " +
                "meilleur site du monde (définitevement pas), mais il devrai me permettre de faire ce que j'expecte" +
                "de lui. D'ailleurs, quoi qu'il arrive, vous devrez voir ce projets. Les autres peuvent être" +
                "supprimé n'importe quand." +
            "</p>"+
        "</div>"+
        "<div class=\"boutonprojet\">"+
            "<button type=\"button\ onclick=\"loadProject('Site web')\">"+
                "Accéder au projet \"Site web\"."+
            "</button>"+
        "</div>" +
    "</article>";

    //Assigner le style parent
    document.getElementById('projetconteneur').setAttribute('style', styleParent);
    //Assigner le texte
    document.getElementById('projetconteneur').innerHTML = contenuPremierArticle + texteFinale;
}

window.addEventListener('load', getProjects());