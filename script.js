document.addEventListener("DOMContentLoaded", function () {
  // Dados para as cartas
  const lettersData = [
    {
      sender: "Estevão",
      message:
        "Cami, você é como uma estrela cadente - rara, brilhante e capaz de iluminar até a noite mais escura. Sua energia positiva é contagiante e seu coração generoso inspira todos ao seu redor. Cada momento ao seu lado é um presente que ilumina nossos dias com alegria e significado. Você é verdadeiramente especial!",
    },
    {
      sender: "Karina",
      message:
        "Querida Cami, sua alma é um mapa estelar de bondade e inteligência. Sua capacidade de transformar o ordinário em extraordinário é admirável. Você traz luz e calor para nossas vidas, como um sol que nunca se põe. Seu sorriso ilumina os dias mais cinzentos e sua sabedoria guia como uma estrela polar. O mundo precisa de mais pessoas como você!",
    },
    {
      sender: "Júnior",
      message:
        "Cami, seu sorriso é como o primeiro raio de sol da manhã - aquece, ilumina e traz a promessa de um dia maravilhoso. Sua presença é como uma constelação que nunca falha em nos guiar. Você é aquela pessoa rara que consegue ser forte e delicada ao mesmo tempo, determinada e compreensiva, vibrante e serena. Você é única e insubstituível!",
    },
    {
      sender: "Gabriel",
      message:
        "Para a estrela mais brilhante do nosso céu: que você continue irradiando essa luz especial que torna tudo ao seu redor mais bonito e significativo. Sua capacidade de amar e sua inteligência emocional são como faróis em meio à tempestade. Você é a prova viva de que existem anjos na Terra, disfarçados de pessoas maravilhosas como você!",
    },
    {
      sender: "Isaac",
      message:
        "Cami, você é a prova de que existem pessoas feitas de constelações - raras, especiais e capazes de guiar quem tem a sorte de cruzar seu caminho! Sua combinação única de força e delicadeza, inteligência e compaixão, torna cada interação com você uma experiência enriquecedora. Você é como um eclipse - um fenômeno raro e belo que todos querem presenciar!",
    },
  ];

  // Dados para os presentes
  const giftsData = [
    { title: "Aventura Estelar", code: "CAMI-ST4R-ADV3NTUR3" },
    { title: "Expansão Dourada", code: "G0LD-C4M1-3XP4NS10N" },
    { title: "Pacote de Constelações", code: "C0NST3LL4T10N-P4CK" },
    { title: "Moedas da Via Láctea", code: "M1LKYW4Y-C01NS-2023" },
    { title: "Segredos do Zodíaco", code: "Z0D14C-S3CR3TS-C4M1" },
  ];

  // Elementos do DOM
  const envelopeContainer = document.querySelector(".envelope-container");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const giftsContainer = document.querySelector(".gifts-container");
  const starsContainer = document.querySelector(".stars-container");

  // Variáveis de estado
  let currentIndex = 0;
  let envelopes = [];
  let isAnimating = false;
  let isLetterOpen = false;

  // Inicialização
  createEnvelopes();
  createGiftCards();
  createRandomStars(20);

  // Criar envelopes
  function createEnvelopes() {
    lettersData.forEach((letter, index) => {
      const envelope = document.createElement("div");
      envelope.className = "envelope";
      envelope.dataset.index = index;
      envelope.innerHTML = `
                <div class="envelope-flap"></div>
                <div class="envelope-front">
                    <span><i class="fas fa-star gold-icon"></i> Para Cami <i class="fas fa-star gold-icon"></i></span>
                    <span>De: ${letter.sender}</span>
                </div>
                <div class="envelope-back"></div>
                <div class="letter">
                    <div class="sender">De: ${letter.sender}</div>
                    <div class="message">${letter.message}</div>
                    <div class="letter-footer">
                        <i class="fas fa-star gold-icon"></i>
                        <i class="fas fa-heart" style="color: #d44f4f; margin: 0 5px;"></i>
                        <i class="fas fa-star gold-icon"></i>
                    </div>
                </div>
            `;

      envelope.addEventListener("click", handleEnvelopeClick);
      envelopeContainer.appendChild(envelope);
      envelopes.push(envelope);
    });

    updateCarousel();
  }

  // Manipulador de clique no envelope
  function handleEnvelopeClick(e) {
    if (isAnimating) return;

    const envelope = e.currentTarget;
    const isOpening = !envelope.classList.contains("open");

    // Se clicou na carta, não faz nada
    if (e.target.closest(".letter")) return;

    // Fecha todas as outras cartas
    closeAllLetters();

    if (isOpening) {
      openLetter(envelope);
    } else {
      closeLetter(envelope);
    }
  }

  // Abrir carta
  function openLetter(envelope) {
    isLetterOpen = true;
    envelope.classList.add("open");
    document.body.classList.add("no-scroll");

    // Scroll para o envelope aberto
    setTimeout(() => {
      envelope.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  }

  // Fechar carta
  function closeLetter(envelope) {
    isLetterOpen = false;
    envelope.classList.remove("open");
    document.body.classList.remove("no-scroll");

    // Restaura animação
    const letter = envelope.querySelector(".letter");
    letter.style.animation = "none";
    setTimeout(() => {
      letter.style.animation = "";
    }, 10);
  }

  // Fechar todas as cartas
  function closeAllLetters() {
    document.querySelectorAll(".envelope.open").forEach((envelope) => {
      closeLetter(envelope);
    });
  }

  // Atualizar carrossel
  function updateCarousel() {
    if (isAnimating) return;
    isAnimating = true;

    envelopes.forEach((envelope, index) => {
      const distance =
        (index - currentIndex + envelopes.length) % envelopes.length;

      envelope.classList.remove("active", "prev", "next");

      if (distance === 0) {
        // Envelope ativo
        envelope.classList.add("active");
        envelope.style.transform = "scale(1) translateX(0)";
        envelope.style.opacity = "1";
        envelope.style.zIndex = "5";
      } else if (distance === 1 || distance === envelopes.length - 1) {
        // Envelopes adjacentes
        const direction = distance === 1 ? 1 : -1;
        envelope.classList.add(distance === 1 ? "next" : "prev");
        envelope.style.transform = `translateX(${direction * 80}%) scale(0.7)`;
        envelope.style.opacity = "0.6";
        envelope.style.zIndex = "3";
      } else {
        // Envelopes mais distantes
        const direction = index > currentIndex ? 1 : -1;
        const absDistance = Math.min(Math.abs(index - currentIndex), 3);
        envelope.style.transform = `translateX(${
          direction * (80 + 40 * absDistance)
        }%) scale(${Math.max(0.5, 0.7 - 0.1 * absDistance)})`;
        envelope.style.opacity = `${Math.max(0.1, 0.6 - 0.2 * absDistance)}`;
        envelope.style.zIndex = "1";
      }
    });

    setTimeout(() => {
      isAnimating = false;
    }, 500);
  }

  // Navegação do carrossel
  function navigate(direction) {
    if (isAnimating) return;

    // Se tem carta aberta, fecha antes de navegar
    if (isLetterOpen) {
      closeAllLetters();
      setTimeout(() => {
        performNavigation(direction);
      }, 300);
    } else {
      performNavigation(direction);
    }
  }

  function performNavigation(direction) {
    currentIndex =
      (currentIndex + direction + envelopes.length) % envelopes.length;
    updateCarousel();

    // Scroll suave para o novo envelope
    setTimeout(() => {
      const activeEnvelope = document.querySelector(".envelope.active");
      activeEnvelope.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  }

  // Criar cards de presente
  function createGiftCards() {
    giftsData.forEach((gift) => {
      const giftCard = document.createElement("div");
      giftCard.className = "gift-card";
      giftCard.innerHTML = `
                <div class="gift-title">
                    <i class="fas fa-gift gold-icon"></i> ${gift.title}
                </div>
                <div class="gift-code">${gift.code}
                    <span class="copy-feedback">Copiado!</span>
                </div>
            `;
      giftsContainer.appendChild(giftCard);

      setupCopyFunctionality(giftCard, gift.code);
    });
  }

  // Configurar funcionalidade de cópia
  function setupCopyFunctionality(card, code) {
    let holdTimer;

    card.addEventListener("mousedown", startHold);
    card.addEventListener("touchstart", startHold);

    card.addEventListener("mouseup", cancelHold);
    card.addEventListener("mouseleave", cancelHold);
    card.addEventListener("touchend", cancelHold);

    function startHold(e) {
      e.preventDefault();
      holdTimer = setTimeout(() => {
        copyToClipboard(code);
        card.classList.add("copied");
        setTimeout(() => {
          card.classList.remove("copied");
        }, 2000);
      }, 1000);
    }

    function cancelHold() {
      clearTimeout(holdTimer);
    }
  }

  // Função para copiar texto
  function copyToClipboard(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }

  // Criar estrelas aleatórias
  function createRandomStars(count) {
    for (let i = 0; i < count; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.width = `${10 + Math.random() * 20}px`;
      star.style.height = star.style.width;
      star.style.animationDelay = `${Math.random() * 3}s`;
      star.style.opacity = 0.3 + Math.random() * 0.7;

      if (Math.random() > 0.5) {
        star.style.filter = "brightness(1.5)";
      }

      starsContainer.appendChild(star);
    }
  }

  // Event listeners
  prevBtn.addEventListener("click", () => navigate(-1));
  nextBtn.addEventListener("click", () => navigate(1));

  // Navegação por teclado
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") navigate(-1);
    if (e.key === "ArrowRight") navigate(1);
    if (e.key === "Escape" && isLetterOpen) closeAllLetters();
  });

  // Fechar carta ao clicar fora
  document.addEventListener("click", (e) => {
    if (!isLetterOpen) return;

    const clickedEnvelope = e.target.closest(".envelope");
    const clickedLetter = e.target.closest(".letter");

    if (!clickedEnvelope && !clickedLetter) {
      closeAllLetters();
    }
  });

  // Navegação por swipe (mobile)
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  document.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    { passive: true }
  );

  function handleSwipe() {
    if (Math.abs(touchEndX - touchStartX) < 50) return;

    if (touchEndX < touchStartX) {
      navigate(1); // Swipe left
    } else {
      navigate(-1); // Swipe right
    }
  }
});
