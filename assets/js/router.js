const routes = {
  //id-тата на темплейтите
  allRecepies: "allRecepiesPage-template",
  favRecepies: "favoriteRecepiesPage-template",
  login: "loginPage-template",
  register: `registerPage-template`,
  myProfile: "profilePage-template",
  createRecepie: "createRecepiePage-template",
};

function router() {
  let context = {
    user: userManager.getUserInfo(),
  };

  const app = document.getElementById("app");
  let hash = location.hash.slice(1);
  let template = Handlebars.compile(
    document.getElementById(routes[hash]).innerHTML
  );

  switch (hash) {
    case "allRecepies":
      recepiesManager.getAllRecepies().then((recepies) => {
        console.log(recepies);
        recepies.forEach((rec) => {
          if (context.user) {
            if (context.user.favoriteRecepies.includes(rec.id)) {
              rec.isLiked = true;
            }
          }
        });

        context.recepies = recepies;
        context.ingredients = recepiesManager.getAllIngredients(recepies);
        app.innerHTML = template(context);
      });

      break;

    case "favRecepies":
      recepiesManager.getAllRecepies().then((recepies) => {
        context.favRecepies = recepies.filter((rec) => {
          if (context.user.favoriteRecepies.includes(rec.id)) {
            rec.isLiked = true;
            return rec;
          }
        });

        context.ingredients = recepiesManager.getAllIngredients(recepies);
        app.innerHTML = template(context);
      });

      break;

    case "createRecepie":
      app.innerHTML = template(context);
      break;

    case "myProfile":
      //трябва обектът с coocked recepies в user, да стане масив от обекти, съсоящи се от recepie title и брой готвения
      let coockedRecepies = [];
      for (const title in context.user.coockedRecepies) {
        let newObj = {
          title: title,
          timesCooked: context.user.coockedRecepies[title],
        };
        coockedRecepies.push(newObj);
      }

      context.coockedRecepies = coockedRecepies;
      app.innerHTML = template(context);
      break;

    case "login":
      app.innerHTML = template(context);
      break;

    case "register":
      app.innerHTML = template(context);
      break;

    default:
      break;
  }
}
