document.getElementById('year')?.append(new Date().getFullYear());
const menuToggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');menuToggle?.addEventListener('click',()=>nav?.classList.toggle('open'));
const form=document.getElementById('enquiry-form'),successMessage=document.getElementById('success-message');form?.addEventListener('submit',async e=>{e.preventDefault();const data=new FormData(form);const response=await fetch(form.action,{method:'POST',body:data,headers:{Accept:'application/json'}});if(response.ok){form.reset();if(successMessage)successMessage.style.display='block';form.dispatchEvent(new CustomEvent('oa:form-success'))}else alert('Something went wrong while sending your enquiry. Please try again.')});
const lionsPrices={"1":{total:"R1250",pp:"R1250 pp",link:"https://pay.yoco.com/outdoor-addicts"},"2":{total:"R2500",pp:"R1250 pp",link:"https://pay.yoco.com/outdoor-addicts"},"3":{total:"R3450",pp:"R1150 pp",link:"https://pay.yoco.com/outdoor-addicts"},"4":{total:"R4600",pp:"R1150 pp",link:"https://pay.yoco.com/outdoor-addicts"},"5":{total:"R5250",pp:"R1050 pp",link:"https://pay.yoco.com/outdoor-addicts"},"6":{total:"R6300",pp:"R1050 pp",link:"https://pay.yoco.com/outdoor-addicts"},"7":{total:"R7350",pp:"R1050 pp",link:"https://pay.yoco.com/outdoor-addicts"},"8":{total:"R7600",pp:"R950 pp",link:"https://pay.yoco.com/outdoor-addicts"}};
const tablePrices={"1":{total:"R1250",pp:"R1250 pp",link:"https://pay.yoco.com/outdoor-addicts"},"2":{total:"R2500",pp:"R1250 pp",link:"https://pay.yoco.com/outdoor-addicts"},"3":{total:"R3450",pp:"R1150 pp",link:"https://pay.yoco.com/outdoor-addicts"},"4":{total:"R4600",pp:"R1150 pp",link:"https://pay.yoco.com/outdoor-addicts"},"5":{total:"R5250",pp:"R1050 pp",link:"https://pay.yoco.com/outdoor-addicts"},"6":{total:"R6300",pp:"R1050 pp",link:"https://pay.yoco.com/outdoor-addicts"},"7":{total:"R7350",pp:"R1050 pp",link:"https://pay.yoco.com/outdoor-addicts"},"8":{total:"R7600",pp:"R950 pp",link:"https://pay.yoco.com/outdoor-addicts"}};
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
  const finalName = eventName.startsWith('oa_') ? eventName : `oa_${eventName}`;
  window.dataLayer.push({
    event: finalName,
    page_path: window.location.pathname,
    page_title: document.title,
    ...details
  });
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

// Outdoor Addicts Phase 2 conversion and engagement tracking
window.dataLayer = window.dataLayer || [];

function trackOAEvent(eventName, parameters = {}) {
  window.dataLayer.push({
    event: eventName,
    page_path: window.location.pathname,
    page_title: document.title,
    page_location: window.location.href,
    ...parameters
  });
}

function normaliseText(value = '') {
  return value.trim().replace(/\s+/g, ' ').toLowerCase().replace(/[’']/g, '');
}

function inferLinkLocation(link) {
  if (link.classList.contains('whatsapp-float')) return 'floating_button';
  if (link.closest('.oa-footer, .site-footer')) return 'footer';
  if (link.closest('.site-header, header')) return 'header';
  if (link.closest('#pricing')) return 'pricing';
  if (link.closest('.review-page-main')) return 'review_page';
  if (link.closest('.contact-shell')) return 'contact_page';
  return 'page_content';
}

// Page-level context
trackOAEvent('oa_page_viewed', {
  page_type:
    document.body.classList.contains('home-page') ? 'homepage' :
    document.body.classList.contains('review-page') ? 'review_page' :
    window.location.pathname.includes('/blog/') ? 'blog_article' :
    window.location.pathname.includes('waiver') ? 'waiver' :
    window.location.pathname.includes('scheduled-hikes') ? 'scheduled_hikes' :
    window.location.pathname.includes('contact') ? 'contact' :
    window.location.pathname.includes('about') ? 'about' :
    window.location.pathname.includes('news') ? 'news' :
    window.location.pathname.includes('privacy-policy') ? 'privacy_policy' :
    window.location.pathname.includes('refund-policy') ? 'refund_policy' :
    'standard_page'
});

if (document.body.classList.contains('home-page')) {
  trackOAEvent('oa_homepage_view');
}

if (window.location.pathname.includes('waiver')) {
  trackOAEvent('oa_waiver_viewed');
}

if (window.location.pathname.includes('scheduled-hikes')) {
  trackOAEvent('oa_scheduled_hikes_viewed');
}

if (window.location.pathname.includes('/blog/')) {
  trackOAEvent('oa_blog_article_viewed', {
    article_slug: window.location.pathname.split('/').pop()?.replace('.html', '') || ''
  });
}

// Experience and booking selections
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

// Pricing section visibility
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

// Pricing selector activity
document.querySelectorAll('#pricing select, #pricing input[type="date"]').forEach((field) => {
  field.addEventListener('change', () => {
    const panel = field.closest('.direct-pricing-panel');
    const fieldLabel =
      field.closest('.select-card')?.querySelector('label')?.textContent ||
      field.id ||
      'selection';

    trackOAEvent('oa_pricing_selection_changed', {
      pricing_panel: panel?.id || 'unknown',
      selection_type: normaliseText(fieldLabel).replace(/\s+/g, '_'),
      selection_value: field.value
    });
  });
});

// Yoco checkout clicks
document.querySelectorAll('a[href*="pay.yoco.com"]').forEach((link) => {
  link.addEventListener('click', () => {
    const panel = link.closest('.direct-pricing-panel');
    const priceText = panel?.querySelector('.price-output strong')?.textContent.trim() || '';
    const value = Number(priceText.replace(/[^\d.]/g, '')) || undefined;

    trackOAEvent('begin_checkout', {
      booking_option: panel?.id || 'unknown',
      displayed_price: priceText,
      value,
      currency: 'ZAR',
      booking_summary: panel?.querySelector('.price-output span')?.textContent.trim() || '',
      payment_provider: 'yoco'
    });
  });
});

// Contact and enquiry actions
document.querySelectorAll('a[href*="contact.html#enquiry-form"]').forEach((link) => {
  link.addEventListener('click', () => {
    trackOAEvent('oa_custom_enquiry_clicked', {
      link_text: link.textContent.trim(),
      link_location: inferLinkLocation(link)
    });
  });
});

document.querySelectorAll('a[href^="https://wa.me/"], a[href^="http://wa.me/"]').forEach((link) => {
  link.addEventListener('click', () => {
    const href = link.getAttribute('href') || '';
    const scheduledIntent = /scheduled|upcoming|group%20hikes/i.test(href);

    trackOAEvent(
      scheduledIntent ? 'oa_scheduled_hike_whatsapp_clicked' : 'oa_whatsapp_clicked',
      {
        link_location: inferLinkLocation(link),
        link_text: link.textContent.trim(),
        destination: 'whatsapp'
      }
    );
  });
});

document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
  link.addEventListener('click', () => {
    trackOAEvent('oa_email_clicked', {
      email_address: link.getAttribute('href').replace('mailto:', ''),
      link_location: inferLinkLocation(link)
    });
  });
});

document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
  link.addEventListener('click', () => {
    trackOAEvent('oa_phone_clicked', {
      phone_number: link.getAttribute('href').replace('tel:', ''),
      link_location: inferLinkLocation(link)
    });
  });
});

document.getElementById('enquiry-form')?.addEventListener('oa:form-success', () => {
  trackOAEvent('generate_lead', {
    lead_type: 'website_enquiry',
    form_id: 'enquiry-form'
  });
});

// Review funnel
document.querySelectorAll('a[href*="reviews.html"]').forEach((link) => {
  link.addEventListener('click', () => {
    trackOAEvent('oa_review_page_clicked', {
      link_text: link.textContent.trim(),
      link_location: inferLinkLocation(link)
    });
  });
});

document.querySelectorAll('a[href*="google.com"][href*="review"], a[href*="g.page"]').forEach((link) => {
  link.addEventListener('click', () => {
    trackOAEvent('oa_google_review_clicked', {
      link_location: inferLinkLocation(link)
    });
  });
});

document.querySelectorAll('a[href*="tripadvisor"]').forEach((link) => {
  link.addEventListener('click', () => {
    trackOAEvent('oa_tripadvisor_clicked', {
      link_location: inferLinkLocation(link)
    });
  });
});

// Waiver and policy interest
document.querySelectorAll('a[href$="waiver.html"], a[href*="/waiver.html"]').forEach((link) => {
  link.addEventListener('click', () => {
    trackOAEvent('oa_waiver_clicked', {
      link_location: inferLinkLocation(link)
    });
  });
});

document.querySelectorAll('a[href*="refund-policy.html"]').forEach((link) => {
  link.addEventListener('click', () => {
    trackOAEvent('oa_refund_policy_clicked', {
      link_location: inferLinkLocation(link)
    });
  });
});

// Blog engagement: 50% and 90% read depth
if (window.location.pathname.includes('/blog/')) {
  const firedDepths = new Set();

  const trackReadDepth = () => {
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return;

    const percent = Math.round((window.scrollY / scrollable) * 100);

    [50, 90].forEach((depth) => {
      if (percent >= depth && !firedDepths.has(depth)) {
        firedDepths.add(depth);
        trackOAEvent('oa_article_read_depth', {
          article_slug: window.location.pathname.split('/').pop()?.replace('.html', '') || '',
          percent_scrolled: depth
        });
      }
    });
  };

  window.addEventListener('scroll', trackReadDepth, { passive: true });
}

// Generic outbound social links
document.querySelectorAll(
  'a[href*="instagram.com"], a[href*="facebook.com"]'
).forEach((link) => {
  link.addEventListener('click', () => {
    const platform =
      link.href.includes('instagram.com') ? 'instagram' :
      link.href.includes('facebook.com') ? 'facebook' :
      'social';

    trackOAEvent('oa_social_link_clicked', {
      platform,
      link_location: inferLinkLocation(link)
    });
  });
});

// Outdoor Addicts booking capture + identifiable Yoco Payment Page checkout
// Captures the full booking before payment, emails it via Formspree, then sends
// the guest to Yoco with the same unique reference used in Yoco's payment email.
(() => {
  const PAYMENT_PAGE = 'https://pay.yoco.com/outdoor-addicts';
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mzdkllal';
  const SUCCESS_URL = 'https://www.outdoor-addicts.com/booking-success.html';

  const bookingLinks = Array.from(document.querySelectorAll(
    '#lions-book-link, #table-book-link, #private-book-link, #table-private-book-link'
  ));
  if (!bookingLinks.length) return;

  function fieldByLabel(panel, labelText) {
    const cards = Array.from(panel.querySelectorAll('.select-card'));
    const card = cards.find((item) => (item.querySelector('label')?.textContent || '').trim().toLowerCase().includes(labelText));
    return card?.querySelector('input, select') || null;
  }

  function selectedText(field) {
    if (!field) return '';
    if (field.tagName === 'SELECT') return field.options[field.selectedIndex]?.text || field.value;
    return field.value || '';
  }

  function makeReference(panelId) {
    const codes = {
      'lions-group': 'LH-GRP',
      'table-group': 'TM-GRP',
      'lions-private': 'LH-PRI',
      'table-private': 'TM-PRI'
    };
    const now = new Date();
    const stamp = [
      now.getFullYear().toString().slice(-2),
      String(now.getMonth() + 1).padStart(2, '0'),
      String(now.getDate()).padStart(2, '0'),
      String(now.getHours()).padStart(2, '0'),
      String(now.getMinutes()).padStart(2, '0'),
      String(now.getSeconds()).padStart(2, '0')
    ].join('');
    const random = Math.random().toString(36).slice(2, 5).toUpperCase();
    return `OA-${codes[panelId] || 'BOOK'}-${stamp}-${random}`;
  }

  const modal = document.createElement('div');
  modal.className = 'booking-modal';
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = `
    <div class="booking-modal-backdrop" data-booking-close></div>
    <div class="booking-modal-card" role="dialog" aria-modal="true" aria-labelledby="booking-modal-title">
      <button class="booking-modal-close" type="button" aria-label="Close" data-booking-close>×</button>
      <span class="eyebrow">Secure your booking</span>
      <h4 id="booking-modal-title">Guest details</h4>
      <p class="booking-modal-intro">Enter the lead guest's details. We'll record your booking before sending you to Yoco for secure payment.</p>
      <div class="booking-modal-summary" id="booking-modal-summary"></div>
      <form id="booking-capture-form">
        <div class="booking-modal-grid">
          <div><label for="booking-first-name">First name</label><input id="booking-first-name" type="text" autocomplete="given-name" required></div>
          <div><label for="booking-last-name">Last name</label><input id="booking-last-name" type="text" autocomplete="family-name" required></div>
          <div><label for="booking-email">Email address</label><input id="booking-email" type="email" autocomplete="email" required></div>
          <div><label for="booking-phone">Phone / WhatsApp</label><input id="booking-phone" type="tel" autocomplete="tel" required></div>
        </div>
        <p class="booking-modal-note">Your booking is only confirmed once payment is successfully completed on Yoco.</p>
        <p class="booking-modal-error" id="booking-modal-error" role="alert"></p>
        <button class="btn btn-primary booking-continue" type="submit">Continue to secure payment</button>
      </form>
    </div>`;
  document.body.appendChild(modal);

  const form = modal.querySelector('#booking-capture-form');
  const summaryBox = modal.querySelector('#booking-modal-summary');
  const errorBox = modal.querySelector('#booking-modal-error');
  const submitButton = modal.querySelector('.booking-continue');
  let activeBooking = null;

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    activeBooking = null;
    errorBox.textContent = '';
  }

  modal.querySelectorAll('[data-booking-close]').forEach((el) => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  bookingLinks.forEach((link) => {
    // Remove the legacy fixed-link behaviour. Payment URL is generated after details are captured.
    link.removeAttribute('target');
    link.removeAttribute('rel');
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const panel = link.closest('.direct-pricing-panel');
      if (!panel) return;

      const dateField = fieldByLabel(panel, 'preferred date');
      if (!dateField?.value) {
        dateField?.focus();
        dateField?.reportValidity?.();
        alert('Please select your preferred hike date before continuing to payment.');
        return;
      }

      const priceText = panel.querySelector('.price-output strong')?.textContent.trim() || '';
      const amount = Number(priceText.replace(/[^\d.]/g, ''));
      const summary = panel.querySelector('.price-output span')?.textContent.trim() || '';
      const transport = selectedText(fieldByLabel(panel, 'transport interest'));
      const groupSizeField = fieldByLabel(panel, 'group size');
      const groupSize = selectedText(groupSizeField);
      const experienceField = fieldByLabel(panel, panel.id.includes('private') ? 'preferred experience' : (panel.id === 'table-group' ? 'select route' : 'select option'));
      const experience = selectedText(experienceField);
      const bookingType = panel.id.includes('private') ? 'Private hike' : 'Join-a-group';
      const experienceName = panel.id.startsWith('table-') ? 'Table Mountain' : 'Lion’s Head';
      const experienceDisplay = experience ? `${experienceName} – ${experience.replace(/^Table Mountain\s*-\s*/i, '')}` : experienceName;
      const reference = makeReference(panel.id);

      activeBooking = {
        reference,
        panelId: panel.id,
        amount,
        priceText,
        summary,
        preferredDate: dateField.value,
        transport,
        groupSize,
        experienceDisplay,
        bookingType
      };

      summaryBox.innerHTML = `<strong>${summary}</strong><span>Preferred date: ${dateField.value}</span><span>${transport}</span><span>Total: ${priceText}</span>`;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      setTimeout(() => modal.querySelector('#booking-first-name')?.focus(), 50);
    }, true);
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!activeBooking || !form.reportValidity()) return;

    const firstName = modal.querySelector('#booking-first-name').value.trim();
    const lastName = modal.querySelector('#booking-last-name').value.trim();
    const email = modal.querySelector('#booking-email').value.trim();
    const phone = modal.querySelector('#booking-phone').value.trim();

    submitButton.disabled = true;
    submitButton.textContent = 'Preparing secure payment…';
    errorBox.textContent = '';

    const payload = new FormData();
    payload.append('_subject', `NEW WEBSITE BOOKING - ${activeBooking.reference} - PAYMENT PENDING`);
    const readableDate = (() => {
      const [year, month, day] = activeBooking.preferredDate.split('-').map(Number);
      if (!year || !month || !day) return activeBooking.preferredDate;
      return new Date(year, month - 1, day).toLocaleDateString('en-ZA', {
        day: 'numeric', month: 'long', year: 'numeric'
      });
    })();
    const transportDisplay =
      activeBooking.transport === 'Interested in return transport' ? 'Return transport requested' :
      activeBooking.transport === 'Interested in one-way transport' ? 'One-way transport requested' :
      'No transport requested';

    // Keep these labels human-readable: Formspree uses them directly in the notification email.
    payload.append('Status', 'PAYMENT PENDING - guest sent to Yoco');
    payload.append('Reference', activeBooking.reference);
    payload.append('Experience', activeBooking.experienceDisplay);
    payload.append('Booking type', activeBooking.bookingType);
    payload.append('Guests', activeBooking.groupSize);
    payload.append('Tour date', readableDate);
    payload.append('Transport', transportDisplay);
    payload.append('Amount due', activeBooking.priceText);
    payload.append('Lead guest', `${firstName} ${lastName}`);
    payload.append('Email', email);
    payload.append('Phone / WhatsApp', phone);
    payload.append('Payment provider', 'Yoco Payment Page');
    payload.append('Important', 'Match this reference with the Yoco successful-payment notification before treating the booking as confirmed.');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: payload,
        headers: { Accept: 'application/json' }
      });
      if (!response.ok) throw new Error('Booking notification could not be sent');

      if (typeof trackOAEvent === 'function') {
        trackOAEvent('oa_booking_details_captured', {
          booking_reference: activeBooking.reference,
          booking_option: activeBooking.panelId,
          value: activeBooking.amount,
          currency: 'ZAR'
        });
      }

      const params = new URLSearchParams({
        amount: activeBooking.amount.toFixed(2),
        reference: activeBooking.reference,
        firstName,
        lastName,
        email,
        redirectOnPaymentSuccess: SUCCESS_URL
      });
      window.location.href = `${PAYMENT_PAGE}?${params.toString()}`;
    } catch (error) {
      errorBox.textContent = 'We could not prepare your booking for payment. Please try again, or contact us on WhatsApp for assistance.';
      submitButton.disabled = false;
      submitButton.textContent = 'Continue to secure payment';
    }
  });
})();


// OA navigation label: Hiking Guides & FAQs
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a[href="hiking-guides.html"], a[href="/hiking-guides.html"]').forEach(function (link) {
    if (link.textContent.trim() === 'Hiking Guides & FAQs') link.textContent = 'Hiking Guides & FAQs';
  });
});
