//Affichage de la carte avec les coordonnées de 'l'utilisateur geolocalisé' '

const map = L.map("map").setView([45.75, 4.85], 13); // Affichage de la carte centrée sur Lyon avec un zoom de 13

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(map);

const apiKey = "5fabdcf45e49dfb35573ab6761df23f6d8a36d7f";
const apiUrl = `https://api.jcdecaux.com/vls/v3/stations?contract=Lyon&apiKey=${apiKey}`;

fetch(apiUrl) // Récupération des données des stations Velov avec une promesse (fetch) pour les afficher sur la carte les velov et les informations des stations
  .then((response) => response.json())
  .then((data) => {
    data.forEach((station) => {
      // Boucle pour afficher les informations des stations
      const stationName = station.name; // Nom des stations
      const availableBikes = station.num_bikes_available; // Nombre de vélos disponibles
      const address = station.address; // Adresse des stations
      const banking = station.banking; // Paiement par carte bancaire
      const status = station.status; // Statut des stations

      const marker = L.marker([
        station.position.latitude,
        station.position.longitude,
      ]) // Affichage des marqueurs sur la carte
        .addTo(map) // Ajout des marqueurs sur la carte
        .bindPopup(` 
              <strong>Station de vélos:</strong> ${stationName}<br>
              <strong>Available Bikes:</strong> ${availableBikes}<br>
              <strong>Adresse:</strong> ${address}
              <strong>Terminal de payement:</strong> ${banking}
              <strong>Status:</strong> ${status}
            `); // Affichage des informations des stations
          });
    
  })
  .catch((error) => {
    console.log(
      "Une erreur s'est produite lors de la récupération des données des stations Velov :",
      error
    ); // Affichage d'un message d'erreur si les données ne sont pas récupérées
  });

// Géolocalisation de l'utilisateur avec une promesse (navigator.geolocation) pour afficher sa position sur la carte

// if ("geolocation" in navigator) {
//   navigator.geolocation.getCurrentPosition((position) => {
//     const userPosition = [position.coords.latitude, position.coords.longitude]; // Récupération des coordonnées de l'utilisateur
//     const marker = L.marker(userPosition) // Affichage du marqueur sur la carte
//       .addTo(map) // Ajout du marqueur sur la carte
//       .bindPopup("Vous êtes ici"); // Affichage d'un message pour indiquer la position de l'utilisateur
//   });
// } else {
//   console.log("La géolocalisation n'est pas disponible"); // Affichage d'un message d'erreur si la géolocalisation n'est pas disponible
// }

