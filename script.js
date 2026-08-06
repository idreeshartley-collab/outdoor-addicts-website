document.getElementById('year')?.append(new Date().getFullYear());
const menuToggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');menuToggle?.addEventListener('click',()=>nav?.classList.toggle('open'));
const form=document.getElementById('enquiry-form'),successMessage=document.getElementById('success-message');form?.addEventListener('submit',async e=>{e.preventDefault();const data=new FormData(form);const response=await fetch(form.action,{method:'POST',body:data,headers:{Accept:'application/json'}});if(response.ok){form.reset();if(successMessage)successMessage.style.display='block';form.dispatchEvent(new CustomEvent('oa:form-success'))}else alert('Something went wrong while sending your enquiry. Please try again.')});
const lionsPrices={"1":{total:"R1400",pp:"R1400 pp",link:"https://pay.yoco.com/r/4ZWxZL"},"2":{total:"R2400",pp:"R1200 pp",link:"https://pay.yoco.com/r/me0PEp"},"3":{total:"R3150",pp:"R1050 pp",link:"https://pay.yoco.com/r/73NaQR"},"4":{total:"R4200",pp:"R1050 pp",link:"https://pay.yoco.com/r/2Qx6p9"},"5":{total:"R4750",pp:"R950 pp",link:"https://pay.yoco.com/r/7vZrYl"},"6":{total:"R5700",pp:"R950 pp",link:"https://pay.yoco.com/r/2wgDYj"},"7":{total:"R6650",pp:"R950 pp",link:"https://pay.yoco.com/r/2be5E0"},"8":{total:"R7200",pp:"R900 pp",link:"https://pay.yoco.com/r/4Gn51A"}};
const tablePrices={"1":{total:"R1600",pp:"R1600 pp",link:"https://pay.yoco.com/r/2Dzdxp"},"2":{total:"R2800",pp:"R1400 pp",link:"https://pay.yoco.com/r/mR5MRJ"},"3":{total:"R3750",pp:"R1250 pp",link:"https://pay.yoco.com/r/me0PEv"},"4":{total:"R5000",pp:"R1250 pp",link:"https://pay.yoco.com/r/mO1k3L"},"5":{total:"R5750",pp:"R1150 pp",link:"https://pay.yoco.com/r/2BGLYG"},"6":{total:"R6900",pp:"R1150 pp",link:"https://pay.yoco.com/r/7vZrYO"},"7":{total:"R8050",pp:"R1150 pp",link:"https://pay.yoco.com/r/7y6EYp"},"8":{total:"R8400",pp:"R1050 pp",link:"https://pay.yoco.com/r/2wgDoM"}};
const privatePrices={"1":{total:"R1750",pp:"R1750 pp",link:"https://pay.yoco.com/r/2be5d5"},"2":{total:"R3500",pp:"R1750 pp",link:"https://pay.yoco.com/r/2DzdJq"},"3":{total:"R4500",pp:"R1500 pp",link:"https://pay.yoco.com/r/mzxNVn"},"4":{total:"R6000",pp:"R1500 pp",link:"https://pay.yoco.com/r/4nJQYd"},"5":{total:"R7000",pp:"R1400 pp",link:"https://pay.yoco.com/r/mMEl5W"},"6":{total:"R8400",pp:"R1400 pp",link:"https://pay.yoco.com/r/mdO5Xg"},"7":{total:"R9800",pp:"R1400 pp",link:"https://pay.yoco.com/r/2LXkpW"},"8":{total:"R10800",pp:"R1350 pp",link:"https://pay.yoco.com/r/7Xl8KK"}};
function setupBooking(section){const groupSize=document.getElementById(`${section}-group-size`),price=document.getElementById(`${section}-price`),note=document.getElementById(`${section}-note`),link=document.getElementById(`${section}-book-link`);if(!groupSize||!price||!note||!link)return;const route=document.getElementById(`${section}-route`),experience=document.getElementById(`${section}-experience`),prices=section==='lions'?lionsPrices:section==='table'?tablePrices:privatePrices;function update(){const selected=prices[groupSize.value],groupText=groupSize.options[groupSize.selectedIndex].text;let optionText='';if(route)optionText=route.options[route.selectedIndex].text;if(experience)optionText=experience.options[experience.selectedIndex].text;price.textContent=selected.total;note.textContent=`For ${groupText.toLowerCase()} · ${selected.pp}${optionText?` · ${optionText}`:''}`;link.href=selected.link}groupSize.addEventListener('change',update);route?.addEventListener('change',update);experience?.addEventListener('change',update);update()}
setupBooking('lions');setupBooking('table');setupBooking('private');
const reviewPages=Array.from(document.querySelectorAll('[data-review-page]')),reviewDots=Array.from(document.querySelectorAll('[data-review-dot]'));function showReviewPage(index){reviewPages.forEach((page,i)=>page.classList.toggle('active',i===index));reviewDots.forEach((dot,i)=>dot.classList.toggle('active',i===index))}reviewDots.forEach(dot=>dot.addEventListener('click',()=>showReviewPage(Number(dot.dataset.reviewDot))));if(reviewPages.length)showReviewPage(0);


// Accordion pricing chooser
const pricingToggles = Array.from(document.querySelectorAll('.pricing-toggle'));
const pricingPanels = Array.from(document.querySelectorAll('.pricing-detail-panel'));

pricingToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const targetId = toggle.dataset.target;
    const targetPanel = document.getElementById(targetId);
    const isOpen = targetPanel && targetPanel.classList.contains('active');

    pricingPanels.forEach((panel) => panel.classList.remove('active'));
    pricingToggles.forEach((button) => {
      button.classList.remove('active');
      if (button.dataset.target === 'group-pricing-panel') button.textContent = 'View group hike pricing';
      if (button.dataset.target === 'private-pricing-panel') button.textContent = 'View private hike pricing';
    });

    if (!isOpen && targetPanel) {
      targetPanel.classList.add('active');
      toggle.classList.add('active');
      if (targetId === 'group-pricing-panel') toggle.textContent = 'Hide group hike pricing';
      if (targetId === 'private-pricing-panel') toggle.textContent = 'Hide private hike pricing';
      setTimeout(() => targetPanel.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  });
});


// Open pricing panel from popular experience buttons
document.querySelectorAll('[data-open-panel]').forEach((link) => {
  link.addEventListener('click', () => {
    const targetId = link.getAttribute('data-open-panel');
    const matchingToggle = document.querySelector(`.pricing-toggle[data-target="${targetId}"]`);
    const targetPanel = document.getElementById(targetId);
    setTimeout(() => {
      if (targetPanel && !targetPanel.classList.contains('active') && matchingToggle) {
        matchingToggle.click();
      } else if (targetPanel) {
        targetPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 120);
  });
});


// Direct pricing panels from experience buttons
const directPricingPanels = Array.from(document.querySelectorAll('.direct-pricing-panel'));

function openDirectPricing(panelId) {
  directPricingPanels.forEach((panel) => panel.classList.remove('active'));
  const panel = document.getElementById(panelId);
  if (panel) {
    panel.classList.add('active');
    setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  }
}

document.querySelectorAll('[data-open-pricing]').forEach((button) => {
  button.addEventListener('click', () => {
    openDirectPricing(button.getAttribute('data-open-pricing'));
  });
});

// Table private pricing mirror
const tablePrivateGroup = document.querySelector('.private-group-mirror');
const tablePrivateExperience = document.querySelector('.private-experience-mirror');
const tablePrivatePrice = document.getElementById('table-private-price');
const tablePrivateNote = document.getElementById('table-private-note');
const tablePrivateBook = document.getElementById('table-private-book-link');

function updateTablePrivateMirror() {
  if (!tablePrivateGroup || !tablePrivatePrice || !tablePrivateNote || !tablePrivateBook || typeof privatePrices === 'undefined') return;
  const selected = privatePrices[tablePrivateGroup.value];
  const groupText = tablePrivateGroup.options[tablePrivateGroup.selectedIndex].text;
  const expText = tablePrivateExperience ? tablePrivateExperience.options[tablePrivateExperience.selectedIndex].text : 'Table Mountain - India Venster';
  tablePrivatePrice.textContent = selected.total;
  tablePrivateNote.textContent = `For ${groupText.toLowerCase()} · ${selected.pp} · ${expText}`;
  tablePrivateBook.href = selected.link;
}

tablePrivateGroup?.addEventListener('change', updateTablePrivateMirror);
tablePrivateExperience?.addEventListener('change', updateTablePrivateMirror);
updateTablePrivateMirror();

// Review page interactions and analytics
const reviewDraft = document.getElementById('review-draft');
const copyReviewButton = document.getElementById('copy-review');
const copyReviewStatus = document.getElementById('copy-review-status');
const platformLinks = document.querySelectorAll('[data-review-platform]');

function trackReviewEvent(eventName, details = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...details });
}

if (document.body.classList.contains('review-page')) {
  trackReviewEvent('review_page_view');
}

copyReviewButton?.addEventListener('click', async () => {
  const reviewText = reviewDraft?.value.trim() || '';
  if (!reviewText) {
    copyReviewStatus.textContent = 'Please write your review first.';
    reviewDraft?.focus();
    return;
  }

  try {
    await navigator.clipboard.writeText(reviewText);
    copyReviewButton.textContent = '✓ Review copied';
    copyReviewStatus.textContent = 'Great! Open Google or Tripadvisor and paste your review.';
    trackReviewEvent('review_copied', {
      review_length: reviewText.length,
      experience: document.querySelector('input[name="review-experience"]:checked')?.value || 'not_selected'
    });
  } catch (error) {
    reviewDraft.select();
    document.execCommand('copy');
    copyReviewButton.textContent = '✓ Review copied';
    copyReviewStatus.textContent = 'Great! Open Google or Tripadvisor and paste your review.';
    trackReviewEvent('review_copied_fallback');
  }
});

reviewDraft?.addEventListener('input', () => {
  if (copyReviewButton?.textContent.includes('copied')) copyReviewButton.textContent = 'Copy my review';
  if (copyReviewStatus) copyReviewStatus.textContent = '';
});

platformLinks.forEach((link) => {
  link.addEventListener('click', () => {
    trackReviewEvent('review_platform_click', { platform: link.dataset.reviewPlatform });
  });
});

// Outdoor Addicts Phase 1 analytics events
window.dataLayer = window.dataLayer || [];

function trackOAEvent(eventName, parameters = {}) {
  window.dataLayer.push({
    event: eventName,
    page_path: window.location.pathname,
    page_title: document.title,
    ...parameters
  });
}

function normaliseText(value = '') {
  return value.trim().replace(/\s+/g, ' ').toLowerCase().replace(/[’']/g, '');
}

trackOAEvent('oa_homepage_view');

document.querySelectorAll('[data-open-pricing]').forEach((button) => {
  button.addEventListener('click', () => {
    const panelId = button.getAttribute('data-open-pricing') || '';
    const [experience, bookingType] = panelId.split('-');
    trackOAEvent('oa_booking_option_selected', {
      experience,
      booking_type: bookingType,
      button_text: button.textContent.trim()
    });
  });
});

const pricingSectionForTracking = document.getElementById('pricing');
if (pricingSectionForTracking && 'IntersectionObserver' in window) {
  let pricingViewed = false;
  const pricingObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !pricingViewed) {
        pricingViewed = true;
        trackOAEvent('oa_pricing_viewed');
        pricingObserver.disconnect();
      }
    });
  }, { threshold: 0.35 });
  pricingObserver.observe(pricingSectionForTracking);
}

document.querySelectorAll('#pricing select, #pricing input[type="date"]').forEach((field) => {
  field.addEventListener('change', () => {
    const panel = field.closest('.direct-pricing-panel');
    const fieldLabel = field.closest('.select-card')?.querySelector('label')?.textContent || field.id || 'selection';
    trackOAEvent('oa_pricing_selection_changed', {
      pricing_panel: panel?.id || 'unknown',
      selection_type: normaliseText(fieldLabel).replace(/\s+/g, '_'),
      selection_value: field.value
    });
  });
});

document.querySelectorAll('a[href*="pay.yoco.com"]').forEach((link) => {
  link.addEventListener('click', () => {
    const panel = link.closest('.direct-pricing-panel');
    trackOAEvent('begin_checkout', {
      booking_option: panel?.id || 'unknown',
      displayed_price: panel?.querySelector('.price-output strong')?.textContent.trim() || '',
      booking_summary: panel?.querySelector('.price-output span')?.textContent.trim() || '',
      payment_provider: 'yoco'
    });
  });
});

document.querySelectorAll('a[href*="contact.html#enquiry-form"]').forEach((link) => {
  link.addEventListener('click', () => {
    trackOAEvent('oa_custom_enquiry_clicked', { link_text: link.textContent.trim() });
  });
});

document.querySelectorAll('a[href^="https://wa.me/"], a[href^="http://wa.me/"]').forEach((link) => {
  link.addEventListener('click', () => {
    trackOAEvent('oa_whatsapp_clicked', {
      link_location: link.classList.contains('whatsapp-float') ? 'floating_button' : 'page_link'
    });
  });
});

document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
  link.addEventListener('click', () => {
    trackOAEvent('oa_email_clicked', {
      email_address: link.getAttribute('href').replace('mailto:', '')
    });
  });
});

document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
  link.addEventListener('click', () => {
    trackOAEvent('oa_phone_clicked', {
      phone_number: link.getAttribute('href').replace('tel:', '')
    });
  });
});

document.querySelectorAll('a[href*="reviews.html"]').forEach((link) => {
  link.addEventListener('click', () => {
    trackOAEvent('oa_review_page_clicked', { link_text: link.textContent.trim() });
  });
});

document.getElementById('enquiry-form')?.addEventListener('oa:form-success', () => {
  trackOAEvent('generate_lead', { lead_type: 'website_enquiry' });
});
