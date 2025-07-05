// Home page
function createHomePage() {
    return `
        ${createHeader('router.navigate("/login")')}
        <main>
            ${createHero('router.navigate("/login")')}
            ${createAbout()}
            ${createServices()}
            ${createTestimonials()}
            ${createContact()}
        </main>
        ${createFooter()}
    `;
}

function initializeHomePage() {
    initializeHeader();
    helpers.addScrollAnimation();
}