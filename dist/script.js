const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach((element) => revealObserver.observe(element));

const thumbs = [...document.querySelectorAll('.thumb')];
const productImage = document.querySelector('#product-image');
const galleryCount = document.querySelector('#gallery-count');

thumbs.forEach((thumb, index) => {
  thumb.addEventListener('click', () => {
    thumbs.forEach((item) => item.classList.remove('active'));
    thumb.classList.add('active');
    productImage.style.opacity = '0';
    window.setTimeout(() => {
      productImage.src = thumb.dataset.image;
      productImage.alt = thumb.dataset.alt;
      productImage.style.opacity = '1';
    }, 160);
    galleryCount.textContent = `${String(index + 1).padStart(2, '0')} / ${String(thumbs.length).padStart(2, '0')}`;
  });
});

const kitInputs = [...document.querySelectorAll('input[name="kit"]')];
const selectedPrice = document.querySelector('#selected-price');
const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

kitInputs.forEach((input) => {
  input.addEventListener('change', () => {
    document.querySelectorAll('.kit-option').forEach((option) => option.classList.remove('selected'));
    input.closest('.kit-option').classList.add('selected');
    selectedPrice.textContent = money.format(Number(input.dataset.price));
  });
});

const buyButton = document.querySelector('.buy-button');
const toast = document.querySelector('.toast');
let toastTimer;

buyButton.addEventListener('click', () => {
  const selected = document.querySelector('input[name="kit"]:checked');
  const units = selected.value === '1' ? '1 unidade' : `${selected.value} unidades`;
  toast.textContent = `${units} selecionadas · checkout disponível em breve.`;
  toast.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('show'), 3200);
});
