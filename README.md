# APOCALIPCY Frontend

Frontend React avec Vite, TypeScript et Tailwind CSS pour l'interface utilisateur de l'application de traitement de documents PDF avec IA.

## 🚀 Lancement avec Docker

### Prérequis
- Docker installé
- Git installé

### Étapes de lancement

1. **Cloner le projet**
```bash
git clone <votre-repo-url>
cd APOCALIPCY-FRONT-CLEAN
```

2. **Lancer avec Docker Compose**
```bash
docker-compose up --build
```

3. **Attendre le chargement**
- Vite démarre le serveur de développement
- Hot reload activé
- Frontend accessible sur le port 5173

4. **Accéder à l'application**
- **Frontend** : http://localhost:5173

## 📋 Commandes utiles

### Démarrer en arrière-plan
```bash
docker-compose up -d
```

### Voir les logs
```bash
docker-compose logs -f
```

### Arrêter les services
```bash
docker-compose down
```

## ⚠️ Notes importantes

- **Backend requis** : Assurez-vous que le backend est démarré sur http://localhost:3000
- **Hot reload** : Les modifications de code sont automatiquement prises en compte

## 🔍 Dépannage

### Si le frontend ne se connecte pas au backend :
- Vérifiez que le backend est démarré sur le port 3000
- Vérifiez la variable VITE_API_URL dans docker-compose.yml

### Si les ports sont occupés :
```bash
docker-compose down
docker system prune -a
docker-compose up --build
```
