db = db.getSiblingDB('BookHunt');


db.user.insertOne({
  username: "admin",
  email: "admin@example.com",
  password: "$2a$10$FL7dRTFIaPfRTWikCcwbKOfR62YnGeaHUpEFfI/EQRcBfD61Byat2",
  role: "ADMIN",
  clubs: []
});


db.club.insertMany([
    {
      name: "Club de Lectura Clásico",
      description: "Un club para amantes de la literatura clásica.",
      iconImageUrl: "/images/default-icon.png",
      book: "Don Quijote de la Mancha",
      members: []
    },
    {
      name: "Club de Ciencia Ficción",
      description: "Exploramos mundos futuristas y realidades alternativas.",
      iconImageUrl: "/images/default-icon.png",
      book: "Dune",
      members: []
    },
    {
      name: "Club de Misterio",
      description: "Desciframos enigmas y disfrutamos de relatos de intriga.",
      iconImageUrl: "/images/default-icon.png",
      book: "Sherlock Holmes: Estudio en escarlata",
      members: []
    },
    {
      name: "Club de Fantasía",
      description: "Un espacio para los fans de lo mágico y lo épico.",
      iconImageUrl: "/images/default-icon.png",
      book: "El Señor de los Anillos",
      members: []
    },
    {
      name: "Club de Historia",
      description: "Analizamos eventos históricos y sus repercusiones.",
      iconImageUrl: "/images/default-icon.png",
      book: "Sapiens: De animales a dioses",
      members: []
    },
    {
      name: "Club de Poesía",
      description: "Disfrutamos y compartimos versos que conmueven.",
      iconImageUrl: "/images/default-icon.png",
      book: "Veinte poemas de amor y una canción desesperada",
      members: []
    },
    {
      name: "Club de Novela Negra",
      description: "Discutimos crímenes, detectives y misterios urbanos.",
      iconImageUrl: "/images/default-icon.png",
      book: "El halcón maltés",
      members: []
    },
    {
      name: "Club de Literatura Contemporánea",
      description: "Exploramos obras modernas y su impacto en la sociedad.",
      iconImageUrl: "/images/default-icon.png",
      book: "La sombra del viento",
      members: []
    },
    {
      name: "Club de Ensayos",
      description: "Reflexionamos sobre ideas y pensamientos a través de ensayos.",
      iconImageUrl: "/images/default-icon.png",
      book: "Meditaciones",
      members: []
    },
    {
      name: "Club de Aventura",
      description: "Para los amantes de la adrenalina y la exploración.",
      iconImageUrl: "/images/default-icon.png",
      book: "La isla del tesoro",
      members: []
    }
  ]);