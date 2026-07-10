document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');

    // Mudar estilo da navbar ao rolar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Animações simples para os cards do menu
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Aplicar estilos iniciais para animação e observar
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";
        item.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // Carousel de depoimentos
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const testimonialGrid = document.querySelector('.testimonial-grid');

    if (prevBtn && nextBtn && testimonialGrid) {
        prevBtn.addEventListener('click', () => {
            const scrollAmount = testimonialGrid.clientWidth;
            // Se estiver no início, vai para o final
            if (testimonialGrid.scrollLeft <= 0) {
                testimonialGrid.scrollTo({ left: testimonialGrid.scrollWidth, behavior: 'smooth' });
            } else {
                testimonialGrid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        });
        
        nextBtn.addEventListener('click', () => {
            const scrollAmount = testimonialGrid.clientWidth;
            // Se estiver no final (com uma folga de 5px para arredondamento), volta pro início
            if (testimonialGrid.scrollLeft + scrollAmount >= testimonialGrid.scrollWidth - 5) {
                testimonialGrid.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                testimonialGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        });
    }
});
