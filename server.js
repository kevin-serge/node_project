const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// 📌 Remplace cette URL par la tienne depuis MongoDB Atlas
const mongoURI = 'mongodb+srv://commande_user:PwAtlas01@cluster0.mn3ihia.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connexion à MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connecté à MongoDB Atlas'))
  .catch(err => console.error('❌ Erreur MongoDB :', err));

// Schéma de commande
const commandeSchema = new mongoose.Schema({
  nom: String,
  produit: String,
  quantite: Number,
  date: { type: Date, default: Date.now }
});

// Modèle Mongoose
const Commande = mongoose.model('Commande', commandeSchema);

// Route POST pour recevoir une commande
app.post('/commande', async (req, res) => {
  const { nom, produit, quantite } = req.body;

  try {
    const nouvelleCommande = new Commande({ nom, produit, quantite });
    await nouvelleCommande.save();
    res.send('✅ Commande enregistrée dans la BDD');
  } catch (err) {
    console.error('❌ Erreur lors de l’enregistrement :', err);
    res.status(500).send('Erreur serveur');
  }
});
const path = require('path');
app.use(express.static(path.join(__dirname)));

// Route pour récupérer toutes les commandes
app.get('/admin/commandes', async (req, res) => {
  try {
    const commandes = await Commande.find().sort({ date: -1 }); // Les plus récentes en haut
    res.json(commandes);
  } catch (err) {
    console.error('❌ Erreur récupération des commandes :', err);
    res.status(500).send('Erreur serveur');
  }
});

// ✅ Modifier une commande (UPDATE)
app.put('/admin/commandes/:id', async (req, res) => {
  const { id } = req.params;
  const { nom, produit, quantite } = req.body;

  try {
    await Commande.findByIdAndUpdate(id, { nom, produit, quantite });
    res.send('✅ Commande mise à jour');
  } catch (err) {
    console.error('❌ Erreur lors de la mise à jour :', err);
    res.status(500).send('Erreur serveur');
  }
});

// ✅ Supprimer une commande (DELETE)
app.delete('/admin/commandes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Commande.findByIdAndDelete(id);
    res.send('🗑️ Commande supprimée');
  } catch (err) {
    console.error('❌ Erreur lors de la suppression :', err);
    res.status(500).send('Erreur serveur');
  }
});


// Lancement du serveur
app.listen(3000, () => {
  console.log('🚀 Serveur lancé sur http://localhost:3000');
});

