<script>
export default {
    data() {
        return {
            // count: 0,
        };
    },
    methods: {
        //   getElementFromDOM() {
        //     return document.getElementById("element");
        //   },
        //   isAvailableInDOM() {
        //     return this.getElementFromDOM() !== null;
        //   },
        //   getDOMCountValue() {
        //     return document.getElementById("count").textContent;
        //   },
    },
};
</script>
<template>
    <section id="contact" class="contact">
        <div class="container">
            <div class="section-title">
                <h1 class="row justify-content-center mt-1 mb-1">Contact</h1>
            </div>

            <div class="row justify-content-center">
                <div class="col-xl-3 col-lg-4 mt-4" data-aos="fade-up">
                    <div class="info-box">
                        <i class="bi bi-geo-alt mydimension"></i>
                        <h3>Localisation</h3>
                        <p class="justify-content">A108 Adam Street,73400, Paris, France</p>
                    </div>
                </div>

                <div class="col-xl-3 col-lg-4 mt-4" data-aos="fade-up" data-aos-delay="100">
                    <div class="info-box">
                        <i class="bi bi-mailbox mydimension"></i>
                        <h3>Adresse email</h3>
                        <p>info@gmail.com</p>
                        <p>rdv@gmail.com</p>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-4 mt-4" data-aos="fade-up" data-aos-delay="200">
                    <div class="info-box">
                        <i class="bi bi-telephone mydimension"></i>
                        <h3>Numéro</h3>
                        <p>+33 558 95 59 85<br />+33 558 95 59 89</p>
                    </div>
                </div>
            </div>

            <div class="row justify-content-center" data-aos="fade-up" data-aos-delay="300">
                <div class="col-xl-9 col-lg-12 mt-4">
                    <form method="post" role="form" class="email-form">
                        <div class="row">
                            <div class="col-md-6 form-group">
                                <input type="text" name="title" class="form-control" id="title" placeholder="Votre nom"
                                    required />
                            </div>
                            <div class="col-md-6 form-group mt-3 mt-md-0">
                                <input type="email" class="form-control" name="email" id="email" placeholder="Votre Email"
                                    required />
                            </div>
                        </div>
                        <div class="form-group mt-3">
                            <input type="text" class="form-control" name="sujet" id="subject" placeholder="Sujet"
                                required />
                        </div>
                        <div class="form-group mt-3">
                            <textarea class="form-control" name="message" rows="5" placeholder="Message "
                                required></textarea>
                        </div>
                        <div class="my-3">
                            <div class="loading">Chargement</div>
                            <div class="error-message"></div>
                            <div class="sent-message">
                                Votre message à été envoyé. Merci !
                            </div>
                        </div>
                        <div class="text-center d-flex justify-content-end">
                            <button class="btn btn-outline-primary col-2" type="submit">
                                Envoyer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>