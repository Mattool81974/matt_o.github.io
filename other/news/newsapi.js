//connexion aux bases de données Parse
Parse.initialize("AMa09UbnCvFl8yWQNkDaNRaaEWstk33D96fDHWm5", "jy5DhPcKZqCzQN0HaB8u7fYlHQC5g2OHVxV4WVYs");
Parse.serverURL = "https://parseapi.back4app.com/";

//Fonction asynchrone pour charges les news
async function getNews(){
    //Sous classe "News"
    let NewsParse = Parse.Object.extend("News");
    //Query pour rechercher tout les éléments dans "News"
    let query = new Parse.Query(NewsParse);
    //Texte finale pour les news
    let texteFinale = "";
    try{
        //Obtenir tout les éléments dans "News"
        const news = await query.find();
        //Supprimer tout les éléments sauf les 4 derniers
        for(let i = 0;i<news.length - 4;i++)
        {
            news.removeItem(0, 1);
        }
        
        //Créer le html de news conteneur
        for(let i = 0;i<4;i++)
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

        document.getElementById('newsconteneur').innerHTML = texteFinale;
    }
    catch
    {
        //Erreur lors de la recherche (pas de co, serveur down...)
    }
}

window.addEventListener('load', getNews());