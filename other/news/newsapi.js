//connexion aux bases de données Parse
Parse.initialize("AMa09UbnCvFl8yWQNkDaNRaaEWstk33D96fDHWm5", "jy5DhPcKZqCzQN0HaB8u7fYlHQC5g2OHVxV4WVYs");
Parse.serverURL = "https://parseapi.back4app.com/";

//Fonction asynchrone pour charges les news
async function getNews(){
    //Sous classe "News"
    let NewsParse = Parse.Object.extend("News");
    //Query pour rechercher tout les éléments dans "News"
    let query = new Parse.Query(NewsParse);
    //Texte finale pour les news (configuré pour une erreur)
    let texteFinale = "Erreur de connection inconnu.";
    //Style du div parent (pour erreur de connection)
    let styleParent = "display: inline-flex;flex-wrap: wrap;";
    try{
        //Obtenir tout les éléments dans "News"
        const news = await query.find();
        //Supprimer tout les éléments sauf les 4 derniers
        for(let i = 0;i<news.length - 4;i++)
        {
            news.removeItem(0, 1);
        }
        
        //Reset du texte finale (pas d'erreur de connection)
        texteFinale = "";
        //Créer le html de news conteneur
        for(let i = 0;i<news.length;i++)
        {
            let date = "";
            if(news[i].get("Date").getDate() < 10)
            {
                date += "0" + String(news[i].get("Date").getDate());
            }
            else
            {
                date += String(news[i].get("Date").getDate());
            }
            date += "/";
            if(news[i].get("Date").getMonth() + 1 < 10)
            {
                date += "0" + String(news[i].get("Date").getMonth() + 1);
            }
            else
            {
                date += String(news[i].get("Date").getMonth() + 1);
            }
            date += "/" + String(news[i].get("Date").getFullYear());
            texteFinale += "<article class=\"news\" style=\"background-image:url('" + news[i].get("ImageLien") + "');" + news[i].get("StyleNews") + "\">";
            texteFinale += "<h1 style=\"" + news[i].get("StyleNewsH1") + "\">" + news[i].get("Titre") + "</h1>";
            texteFinale += "<div class=\"support\" style=\"" + news[i].get("StyleNewsTexte") + "\"><p>" + news[i].get("Texte") + "</br></p></div>";
            texteFinale += "<h2 style=\"" + news[i].get("StyleNewsH2") + "\">Ajouté par " + news[i].get("Auteur") + " le " + date + "</h2>";
            texteFinale += "</article>";
        }
    }
    catch
    {
        //Erreur lors de la recherche (pas de co, serveur down...)
        styleParent = "display: block;";
        texteFinale = "<p style=\"text-align: center;align-self: center;font-size: 23px;\">Erreur de connection...</p>"
    }

    //Assigner le style parent
    document.getElementById('newsconteneur').setAttribute('style', styleParent);
    //Assigner le texte
    document.getElementById('newsconteneur').innerHTML = texteFinale;
}

window.addEventListener('load', getNews());