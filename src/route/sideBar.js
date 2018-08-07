module.exports = {
    menus: [
        {
            key: 1,
            name: 'Home',
            icon: 'home',
            url: '/home',
            root: false
        },
        {
            key: 2,
            name: 'Gestion des Admins',
            icon: 'user',
            root: true,
            child: [
                {
                    name: 'Ajouter Administrateur',
                    key: 20,
                    url: '/add-admin'
                },
                {
                    name: 'List des administrateurs',
                    key: 21,
                    url: '/list-admins'
                }
            ]
        },
        {
          key: 3,
          name: 'Gestion des utilisateurs',
          icon: 'user',
          child: [
            {
              name: 'Ajouter Utilisateur',
              key: 30,
              url: '/add-user'
            },
            {
                name: 'List des utilisateurs',
                key: 31,
                url: '/list-users'
              }
          ]
        },
        {
          key: 4,
          name: 'Gestion des événements',
          icon: 'schedule',
          child: [
            {
              name: 'Ajouter Evénement',
              key: 40,
              url: '/add-event'
            },
            {
                name: 'List des événements',
                key: 41,
                url: '/events-list'
              }
          ]
        }
      ]
}
