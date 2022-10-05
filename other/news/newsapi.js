//connexion aux bases de données Parse
Parse.initialize("AMa09UbnCvFl8yWQNkDaNRaaEWstk33D96fDHWm5", "jy5DhPcKZqCzQN0HaB8u7fYlHQC5g2OHVxV4WVYs");
Parse.serverURL = "https://parseapi.back4app.com/";

//Fonction asynchrone pour charges les news
async function getNews(){
    //Sous classe "News"
    let NewsParse = Parse.Object.extend("News");
    //Query pour rechercher tout les éléments dans "News"
    let query = new Parse.Query(NewsParse);
    try{
        //Obtenir tout les éléments dans "News"
        const news = await query.find();
        //Supprimer tout les éléments sauf les 4 derniers
        for(let i = 0;i<news.length - 4;i++)
        {
            news.removeItem(0, 1);
        }
        
    }
    catch
    {
        //Erreur lors de la recherche (pas de co, serveur down...)
    }
}

window.addEventListener('load', getNews());