Projet commande et achat

Techno : Node.js + Express (API)
         MongoDB : Atlas (base de données en ligne)

But : Permettre de commander en ligne, enregistrer les commandes dans une BDD distante
      et afficher la liste des commandes dans une interface admin avec options de gestion (CRUD)

Structure :

server.js :
    - Connexion à la BDD MongoDB Atlas (via URI sécurisé)
    - Mise en place des routes pour :
        • Ajouter une commande (POST)
        • Récupérer toutes les commandes (GET)
        • Supprimer une commande (DELETE)
        • Modifier une commande (PUT)
    - Démarrage du serveur local sur le port 3000

admin.html :
    - Interface admin pour voir toutes les commandes enregistrées
    - Actions possibles : lire / modifier / supprimer des commandes (appel aux routes du server.js)

index.html :
    - Formulaire pour que l’utilisateur passe une commande
    - Envoi des données vers la BDD via le backend (server.js) connecté à MongoDB

accueil.html :
    - Page vitrine simple pour présenter les produits
    - Bouton "Faire une commande" qui redirige vers : http://localhost:3000/index.html

node_modules :
    - Dossier des modules installés via npm (automatique après `npm install`)
    - ⚠️ À ne pas modifier à la main – à ignorer dans un .gitignore si versionné

Procédé :

1. Initialiser Node.js :
      npm init -y
   → Crée automatiquement le fichier package.json

2. Installer Express :
      npm install express
   → Ajoute express dans node_modules et dans package.json

3. Créer le fichier server.js (backend principal)

4. Créer un compte MongoDB Atlas :
    a. Créer un Cluster (gratuit)
    b. Créer un utilisateur BDD dans "Database Access" (user + mot de passe)
    c. Ajouter une IP d’accès dans "Network Access" (choisir 0.0.0.0/0 pour accès global)
    d. Récupérer l’URI de connexion :
       "Connect > Connect your application > Driver : Node.js"
       Exemple de lien :
       mongodb+srv://<user>:<password>@cluster0.xxx.mongodb.net/?retryWrites=true&w=majority

    ⚠️ Attention : bien remplacer <password> et encoder les caractères spéciaux si besoin
    (ex: @ → %40)

5. Dans server.js :
    - Coller l’URI
    - Utiliser MongoClient ou Mongoose pour la connexion (dans ce projet : MongoClient)
    - Définir les routes (voir plus haut)

6. Enregistrer les modifications dans VS Code

7. Lancer le serveur :
      node server.js
   → Démarre le serveur sur http://localhost:3000

8. Tester dans le navigateur :
      http://localhost:3000/index.html     (page commande)
      http://localhost:3000/admin.html     (interface admin)

9. Scénario de test :
    - Remplir le formulaire de commande et cliquer "Envoyer"
    - Vérifier dans l’interface admin si la commande est bien reçue
    - Tester la suppression ou la modification de commande depuis l’interface

10. Pour arrêter le serveur :
      Ctrl + C dans le terminal

11. Une fois le projet testé et validé : vous méritez une pause de 5 minutes !

