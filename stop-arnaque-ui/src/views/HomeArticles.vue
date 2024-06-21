<script>

import InfoCards from "../components/articles/infocards.vue";
export default {
  name: "HomeArticles",
  components: {
    InfoCards,
  },

};
</script>

<template>
  <main>


    <header class="masthead">
      <div class="container">
        <div class="masthead-subheading">Arrêtez les arnaques dans leur élan
        </div>
        <div class="masthead-heading text-uppercase"> avec Stop Arnaque</div>
        <a class="btn btn-primary btn-xl text-uppercase" href="#services">
          <RouterLink to="signUp" class="btn search-button bg-primary text-light ">
            S'inscrire
          </RouterLink>
        </a>
      </div>
    </header>
    <section class="page-section" id="services">
      <div class="container">
        <div class="text-center">
          <h2 class="section-heading text-uppercase">Services</h2>
          <h3 class="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
        </div>
        <div class="row text-center">
          <div class="col-md-4 mb-5">
            <span class="fa-stack fa-4x">
              <i class="fas fa-circle fa-stack-2x text-primary"></i>
              <i class="fas fa-shopping-cart fa-stack-1x fa-inverse"></i>
            </span>
            <h4 class="my-3">DISPOSITIF<br>ANTI-PHISHING</h4>
            <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam
              architecto quo inventore harum ex magni, dicta impedit.</p>
          </div>
          <div class="col-md-4 mb-5">
            <span class="fa-stack fa-4x">
              <i class="fas fa-circle fa-stack-2x text-primary"></i>
              <i class="fas fa-laptop fa-stack-1x fa-inverse"></i>
            </span>
            <h4 class="my-3">RECOURS JURIDIQUE<br>SUR MESURE</h4>
            <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam
              architecto quo inventore harum ex magni, dicta impedit.</p>
          </div>
          <div class="col-md-4 mb-5">
            <span class="fa-stack fa-4x">
              <i class="fas fa-circle fa-stack-2x text-primary"></i>
              <i class="fas fa-lock fa-stack-1x fa-inverse"></i>
            </span>
            <h4 class="my-3">1K DE VICTIMES<br> PLUS JEUNE</h4>
            <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam
              architecto quo inventore harum ex magni, dicta impedit.</p>
          </div>
        </div>
      </div>
    </section>


    <InfoCards />
    <section class="page-section bg-light" id="team">
      <div class="container">
        <div class="row text-center">
          <h2 class="section-heading text-uppercase">Notre équipe</h2>
          <h3 class="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
        </div>
        <div class="row">
          <div class="col-lg-4">
            <div class="team-member">
              <img class="mx-auto rounded-circle" src="../../../public/images/1.jpg" alt="..." />
              <h4>Parveen Anand</h4>
              <h5 class="text-muted mt-2">Juriste en droit de la consommation</h5>
              <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="Parveen Anand Twitter Profile"><i
                  class="fab fa-twitter"></i></a>
              <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="Parveen Anand Facebook Profile"><i
                  class="fab fa-facebook-f"></i></a>
              <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="Parveen Anand LinkedIn Profile"><i
                  class="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="team-member">
              <img class="mx-auto rounded-circle" src="../../../public/images/2.jpg" alt="..." />
              <h4>Diana Petersen</h4>
              <h5 class="text-muted mt-2">Juriste à l'USCV</h5>
              <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="Diana Petersen Twitter Profile"><i
                  class="fab fa-twitter"></i></a>
              <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="Diana Petersen Facebook Profile"><i
                  class="fab fa-facebook-f"></i></a>
              <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="Diana Petersen LinkedIn Profile"><i
                  class="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="team-member">
              <img class="mx-auto rounded-circle" src="../../../public/images/3.jpg" alt="..." />
              <h4>Larry Parker</h4>
              <h5 class="text-muted mt-2">Avocat en droit pénal des affaires</h5>
              <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="Larry Parker Twitter Profile"><i
                  class="fab fa-twitter"></i></a>
              <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="Larry Parker Facebook Profile"><i
                  class="fab fa-facebook-f"></i></a>
              <a class="btn btn-dark btn-social mx-2" href="#!" aria-label="Larry Parker LinkedIn Profile"><i
                  class="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-8 mx-auto text-center">
            <p class="large text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut eaque,
              laboriosam veritatis, quos non quis ad perspiciatis, totam corporis ea, alias ut unde.</p>
          </div>
        </div>
      </div>
    </section>

    <div class="b-example-divider"></div>

    <div class="bg-dark text-secondary px-4 py-5 text-center">
      <div class="py-5">
        <h2 class="display-5 fw-bold text-white">De nouveaux services arrivent bientôt</h2>
        <div class="col-lg-6 mx-auto">
          <p class="fs-5 mb-4">Un contentieux ou une réclamation qui n'aboutit pas ? Nos avocats partenaires peuvent
            vous accompagner.</p>
          <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button type="button" class="btn btn-outline-primary btn-lg px-4 me-sm-3 fw-bold">Signaler une
              arnaque <i class="bi bi-alarm"></i>
            </button>
            <button type="button" class="btn btn-outline-light btn-lg px-4">Nous contacter <i
                class="bi bi-envelope white-envelope"></i></button>
          </div>
        </div>
      </div>
    </div>

    <div class="b-example-divider mb-0"></div>
    <div class="py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-3 col-sm-6 my-3">
            <a href="#!"><img class="img-fluid img-brand d-block mx-auto" src="../../../public/images/microsoft.svg"
                alt="..." aria-label="Microsoft Logo" /></a>
          </div>
          <div class="col-md-3 col-sm-6 my-3">
            <a href="#!"><img class="img-fluid img-brand d-block mx-auto" src="../../../public/images/google.svg"
                alt="..." aria-label="Google Logo" /></a>
          </div>
          <div class="col-md-3 col-sm-6 my-3">
            <a href="#!"><img class="img-fluid img-brand d-block mx-auto" src="../../../public/images/facebook.svg"
                alt="..." aria-label="Facebook Logo" /></a>
          </div>
          <div class="col-md-3 col-sm-6 my-3">
            <a href="#!"><img class="img-fluid img-brand d-block mx-auto" src="../../../public/images/ibm.svg" alt="..."
                aria-label="IBM Logo" /></a>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>