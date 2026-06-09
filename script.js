document.getElementById('year')?.append(new Date().getFullYear());
const menuToggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');menuToggle?.addEventListener('click',()=>nav?.classList.toggle('open'));
const form=document.getElementById('enquiry-form'),successMessage=document.getElementById('success-message');form?.addEventListener('submit',async e=>{e.preventDefault();const data=new FormData(form);const response=await fetch(form.action,{method:'POST',body:data,headers:{Accept:'application/json'}});if(response.ok){form.reset();if(successMessage)successMessage.style.display='block'}else alert('Something went wrong while sending your enquiry. Please try again.')});
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
      if (button.dataset.target === 'group-pricing-panel') button.textContent = 'View Popular Guided Hike Pricing';
      if (button.dataset.target === 'private-pricing-panel') button.textContent = 'View Private Hike Pricing';
    });

    if (!isOpen && targetPanel) {
      targetPanel.classList.add('active');
      toggle.classList.add('active');
      if (targetId === 'group-pricing-panel') toggle.textContent = 'Hide Popular Guided Hike Pricing';
      if (targetId === 'private-pricing-panel') toggle.textContent = 'Hide Private Hike Pricing';
      setTimeout(() => targetPanel.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  });
});
