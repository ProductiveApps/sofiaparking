const PhoneImages = {
  MAP: 'map',
  MESSAGE: 'message',
  STATUS: 'status'
};

const phoneViews = [
  {
    viewType: PhoneImages.MAP,
    iconImageSrc: 'assets/images/secondary-section/map.svg',
    headerValue: 'Автоматично определяне на зона',
    paragraphValue: 'Винаги знаеш дали си в зона с платено паркиране',
    phoneImageSrc: 'assets/images/secondary-section/map-gps.svg'
  },
  {
    viewType: PhoneImages.MESSAGE,
    iconImageSrc: 'assets/images/secondary-section/message.svg',
    headerValue: 'Изпращане на SMS',
    paragraphValue: 'Заплати престоя си в синя или зелена зона само с един клик',
    phoneImageSrc: 'assets/images/secondary-section/zones.svg'
  },
  {
    viewType: PhoneImages.STATUS,
    iconImageSrc: 'assets/images/secondary-section/status.svg',
    headerValue: 'Статус в реално време',
    paragraphValue: 'Следи и подновявай оставащото време за паркиране в зона',
    phoneImageSrc: 'assets/images/secondary-section/live-status.svg'
  }
];
const smallPhoneScreen = window.matchMedia('(max-width: 575.98px)');
const phoneScreen = window.matchMedia('(min-width: 576px) and (max-width: 767.98px)');
const tabletScreen = window.matchMedia('(min-width: 768px) and (max-width: 991.98px)');
const desktopSmallScreen = window.matchMedia('(min-width: 992px) and (max-width: 1199px)');
const desktopMediumScreen = window.matchMedia('(min-width: 1200px) and (max-width: 1360px)');
const desktopLargeScreen = window.matchMedia('(min-width: 1360px)');

let isMobileView = false;
let phoneViewIndex = 0;

// Swipe gesture variables
let startX = 0;
let endX = 0;
let touchTarget = null;

const swipeContainer = document.getElementById('info-container-mobile');

if (swipeContainer) {
  swipeContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    touchTarget = e.target;
  });

  swipeContainer.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
  });

  swipeContainer.addEventListener('touchend', (e) => {
    const isArrowLink = touchTarget && (
      touchTarget.closest('.next') || touchTarget.closest('.previous')
    );
    if (isArrowLink) {
      touchTarget = null;
      startX = 0;
      endX = 0;
      return;
    }
    const deltaX = endX - startX;
    if (deltaX === 0) {
      return;
    }
    if (deltaX > 50) {
      previousView();
    } else if (deltaX < -50) {
      nextView();
    }
    startX = 0;
    endX = 0;
    touchTarget = null;
  });
}

window.onload = function () {
  checkScreenWidth();
};

window.addEventListener('resize', checkScreenWidth);

function checkScreenWidth() {
  const mobileInfo = document.getElementById('info-container-mobile');
  const desktopInfo = document.getElementById('info-container-desktop');
  if (!mobileInfo || !desktopInfo) return;

  phoneViewIndex = 0;

  if (smallPhoneScreen.matches || phoneScreen.matches || tabletScreen.matches) {
    mobileInfo.classList.remove('hidden');
    desktopInfo.classList.add('hidden');
    setMobileViewInfo();
  } else {
    mobileInfo.classList.add('hidden');
    desktopInfo.classList.remove('hidden');
    changeView(PhoneImages.MAP);
  }
}

function previousView() {
  phoneViewIndex--;
  if (phoneViewIndex < 0) {
    phoneViewIndex = 2;
  }
  setMobileViewInfo();
}

function nextView() {
  phoneViewIndex++;
  if (phoneViewIndex > 2) {
    phoneViewIndex = 0;
  }
  setMobileViewInfo();
}

function setMobileViewInfo() {
  const iconImage = document.querySelector('#mobile-info .title .title-icon img');
  const header = document.querySelector('#mobile-info .title h1');
  const paragraph = document.querySelector('#mobile-info .title p');
  const phoneImage = document.querySelector('#info-container-mobile #phone-image');
  if (!iconImage || !header || !paragraph || !phoneImage) return;

  iconImage.src = phoneViews[phoneViewIndex].iconImageSrc;
  header.textContent = phoneViews[phoneViewIndex].headerValue;
  paragraph.textContent = phoneViews[phoneViewIndex].paragraphValue;
  phoneImage.src = phoneViews[phoneViewIndex].phoneImageSrc;
}

function openGooglePlayStore() {}

function changeView(typeView) {
  const phoneImage = document.querySelector('#info-container-desktop #desktop-image');
  if (!phoneImage) return;

  resetStyle(PhoneImages.MAP);
  resetStyle(PhoneImages.MESSAGE);
  resetStyle(PhoneImages.STATUS);

  if (typeView === PhoneImages.MAP) {
    phoneImage.src = phoneViews[0].phoneImageSrc;
  } else if (typeView === PhoneImages.MESSAGE) {
    phoneImage.src = phoneViews[1].phoneImageSrc;
  } else if (typeView === PhoneImages.STATUS) {
    phoneImage.src = phoneViews[2].phoneImageSrc;
  }

  const selectedView = document.getElementById(typeView);
  if (selectedView) selectedView.classList.add('selected');
}

function setStyle(typeView, backgroundColor, borderRadius, width, height, paddingRight) {
  const view = document.getElementById(typeView);
  if (!view) return;
  view.style.backgroundColor = backgroundColor;
  view.style.borderRadius = borderRadius;
  view.style.width = width;
  view.style.height = height;
  view.style.paddingRight = paddingRight;
}

function resetStyle(typeView) {
  const view = document.getElementById(typeView);
  if (view) {
    setStyle(typeView, '', '', '', '', '');
    view.classList.remove('selected');
  }
}
