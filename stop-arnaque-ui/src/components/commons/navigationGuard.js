/**
 * Le but de ce guard navigation est de contrôler l'accès aux différentes routes de l'application
 * en fonction de l'état d'authentification de l'utilisateur.
 * ici je ne check que l'authentification mais les guard peuvent être utilisés pour une variété de cas d'utilisation,
 * comme la gestion des permissions(si l'app utilse des rôles), Validation des données de formulaire, Confirmation de navigation,
 * Redirections dynamiques etc
 */

/**
 * Les arguments to, from, et next sont fournis par Vue.js dans le cadre de son système de navigation guards.
 * Vue.js injecte automatiquement ces trois arguments dans la fonction que vous fournissez.
 * from : L'objet Route actuelle d'où provient la navigation.
 * to : représente la route depuis laquelle l'utilisateur navigue.
 * next : permet d'autoriser la navigation à se poursuivre ou rediriger etc
 */

// const navigationGuard = (to, from, next) => {
//   const isAuthenticated = Boolean(localStorage.getItem("isAuthenticated"));
//   if (to.meta.requiresAuth && !isAuthenticated) {
//     next("/signIn");
//   } else {
    
//     next();
//   }
// };

// export default navigationGuard;
