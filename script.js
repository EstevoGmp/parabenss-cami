document.addEventListener("DOMContentLoaded", function () {
 
  const lettersData = [
    {
      sender: "Isaac",
      message:
        "Oiii não sei em que momento vc vai ler isso ou quantas vezes vc vai ler, mas só quero que vc saiba que eu te amo, vc é uma pessoa incrível meu amor, a melhor lux que eu já conheci, Bom  eu sei que está muito cedo ainda mas feliz aniversário meu amor muito obrigado por tudo que vc faz por mim e por me fazer tão bem",
    },
    {
      sender: "Junior",
      message:
        "Cami, se eu falasse para o meu eu mais novo que eu faria uma amizade em uma loja no shopping e que essa se tornaria uma de minhas amizade mais importantes eu acho que ele não acreditaria tenho muita sorte de ter encontrado você e de ter feito essa amizade que temos hoje. Desejo a você um ótimo niver e que continue sendo essa pessoa maravilhosa que você é.",
    },
    {
      sender: "Estevão",
      message:
        "Cami,\nTe conhecer numa mesa de jogos foi uma das melhores surpresas. Você é leve, divertida e generosa, até me deu um afilhado: o Miguel, esse gatinho maravilhoso e brincalhão! Que tua energia siga encantando todos ao redor, como já encantou a todos nós!",
    },
    {
      sender: "Karina",
      message:
        "Cami, espero que estejamos presentes em todos os seus próximos nivers pra te desejar muita alegria e tudo de bom que a vida pode te proporcionar. Sou muito grata por te ter como amiga, você é muito especial pra mim. Te amo muito diva!",
    },
    {
      sender: "Tutu",
      message:
        "<img src='tutu.jpg' alt='Tutu' style='height: 500px; width: auto;' />",
    },
    {
      sender: "Gabriel (Zumby)",
      message:
        "Cami, mesmo não te conhecendo há muito tempo, já te considero muito! Você sempre me faz rir, é super divertida e deixa qualquer momento mais leve. Espero que a gente continue ganhando (ou roubando!) em muitos jogos juntos. Que seu aniversário seja incrível, cheio de alegria!!!",
    },
    {
      sender: "Craft",
      message:
        "Pode escrever fala kame e o Craft então feliz aniversário viu muitos anos de vida e eu te odeio profundamente por me criticar bjs do tio Craft",
    },
    {
      sender: "Rafa",
      message:
        "Aoba Cams! A gente se falou pouco e tals, mas desde então te acho uma pessoa muito legal. De acordo com o junior; eu sou uma versão pocket sua akakak. Então você é foda guria!! Você tem uma energia cativante. Eu super teria uma amizade contigo! Feliz aniversário,que seu dia seja incrivel, que  seus dias adiante  sejam só sucesso ! Que Deus te Ensaboe. Ass: Rafa",
    },
    {
      sender: "🐾 Miguel 🐾",
      message: "Miaaaaaau <3",
    },
  ];

  
const giftsData = [
  { title: "Monster Prom 3: Monster Roadtrip", code: "DGC7Z-QY07Y-CV9Y3" },
  { title: "The Deed Dynasty", code: "WL36E-NJK4D-IXLG5" },
  { title: "Beneath Oresa", code: "NXDLZ-Q55F6-I309A" },
  { title: "Forbidden Planet", code: "4MEDZ-TRT85-QPMX7" },
  { title: "ReignMaker", code: "JXTAG-XYGLP-FYKDV" },
  { title: "Sentience: The Android's Tale", code: "GQDKG-F4E3F-5TEHR" },
  { title: "Crown Champion: Legend of The Arena", code: "E4AW9-9T0N3-RJX6P" },
  { title: "KarmaZoo", code: "FPXTQ-GZHMC-PGDGK" },
  { title: "Railway Islands - Puzzle", code: "89I0L-IYMVX-ZCZMV" },
  { title: "Memories of A Vagabond", code: "JGMDD-KGLG5-H6I40" },
];

  
  const envelopeContainer = document.querySelector(".envelope-container");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const giftsContainer = document.querySelector(".gifts-container");
  const starsContainer = document.querySelector(".stars-container");

  
  let currentIndex = 0;
  let envelopes = [];
  let isAnimating = false;
  let isLetterOpen = false;


  createEnvelopes();
  createGiftCards();
  createRandomStars(20);


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

  
  function handleEnvelopeClick(e) {
    if (isAnimating) return;

    const envelope = e.currentTarget;
    const isOpening = !envelope.classList.contains("open");

  
    if (e.target.closest(".letter")) return;

   
    closeAllLetters();

    if (isOpening) {
      openLetter(envelope);
    } else {
      closeLetter(envelope);
    }
  }

  
  function openLetter(envelope) {
    isLetterOpen = true;
    envelope.classList.add("open");
    document.body.classList.add("no-scroll");

    
    setTimeout(() => {
      envelope.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  }

 
  function closeLetter(envelope) {
    isLetterOpen = false;
    envelope.classList.remove("open");
    document.body.classList.remove("no-scroll");

    
    const letter = envelope.querySelector(".letter");
    letter.style.animation = "none";
    setTimeout(() => {
      letter.style.animation = "";
    }, 10);
  }

  
  function closeAllLetters() {
    document.querySelectorAll(".envelope.open").forEach((envelope) => {
      closeLetter(envelope);
    });
  }

  
  function updateCarousel() {
    if (isAnimating) return;
    isAnimating = true;
    const currentEnvelope = document.querySelector(".envelope.active");
    if (currentEnvelope) {
      currentEnvelope.style.transition = "opacity 0.3s ease";
      currentEnvelope.style.opacity = "0";
    }
    setTimeout(() => {
      envelopes.forEach((envelope, index) => {
        envelope.classList.remove("active", "prev", "next");
        envelope.style.display = "none";

        if (index === currentIndex) {
          envelope.classList.add("active");
          envelope.style.display = "block";
          envelope.style.opacity = "0";
          envelope.style.transition = "opacity 0.3s ease 0.1s";

         
          void envelope.offsetWidth;

          envelope.style.opacity = "1";
        }
      });

      isAnimating = false;
    }, 300);
  }

 
  function navigate(direction) {
    if (isAnimating) return;

   
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

    
    setTimeout(() => {
      const activeEnvelope = document.querySelector(".envelope.active");
      activeEnvelope.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  }

 
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

 
  function copyToClipboard(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }


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

  
  prevBtn.addEventListener("click", () => navigate(-1));
  nextBtn.addEventListener("click", () => navigate(1));


  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") navigate(-1);
    if (e.key === "ArrowRight") navigate(1);
    if (e.key === "Escape" && isLetterOpen) closeAllLetters();
  });

  document.addEventListener("click", (e) => {
    if (!isLetterOpen) return;

    const clickedEnvelope = e.target.closest(".envelope");
    const clickedLetter = e.target.closest(".letter");

    if (!clickedEnvelope && !clickedLetter) {
      closeAllLetters();
    }
  });


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
      navigate(1); 
    } else {
      navigate(-1); 
    }
  }
});

let clickCount = 0;
const camiElement = document.getElementById("cami");
const esconderElement = document.querySelector(".esconder");

camiElement.addEventListener("click", () => {
  clickCount++;
  if (clickCount === 5) {
    esconderElement.style.display = "block";
  }
});