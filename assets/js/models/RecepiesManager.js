let recepiesManager = (function () {
    var db = firebase.firestore();

    // recepies.forEach(recepie => {
    //     db.collection("recepies").add(recepie)
    // });

    class RecepiesManager {
        constructor() {}

        getAllRecepies() {
            return db
                .collection("recepies")
                .get()
                .then((resRecepies) => {
                    return resRecepies.docs.map((recepie) => {
                        return {
                            ...recepie.data(),
                            id: recepie.id,
                            isLiked: false,
                        };
                    });
                });
        }

        add(recepie) {
            // if (recepie instanceof Recepie) {
            db.collection("recepies").add(recepie);
            // }
        }

        filterByIngredient(ingredient) {
            return this.getAllRecepies().then((recepies) =>
                recepies.filter((rec) => rec.ingredients.includes(ingredient))
            );
        }

        filterByName(text) {
            return this.getAllRecepies().then((recepies) =>
                recepies.filter((rec) =>
                    rec.title.toLowerCase().includes(text.toLowerCase())
                )
            );
        }

        getAllIngredients(recepies) {
            let allIngrediendsOptions = new Set(); //!using set for all ingredients for the select element because we don't need duplicates

            recepies.forEach((recepie) => {
                let receIngredients = recepie.ingredients.split(", ");

                for (let i = 0; i < receIngredients.length; i++) {
                    allIngrediendsOptions.add(receIngredients[i].trim()); //вкарваме ingredients в set-а, с уникални стойности
                }
            });

            return Array.from(allIngrediendsOptions).sort((a, b) => a.localeCompare(b));
        }
    }

    return new RecepiesManager();
})();