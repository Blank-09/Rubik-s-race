const timeline = gsap.timeline({ defaults: { duration: 0.5, delay: 0.5 } });

timeline
  .to("#path17", { y: "-113%", delay: 2 })
  .to("#path18", { x: "-113%" })
  .to("#path13", { y: "113%" })
  .to("#path9", { y: "113%" })
  .to("#path8", { x: "113%" })
  .to("#path7", { x: "113%" })
  .to("#path12", { y: "-113%" })
  .to("#path16", { y: "-113%" })
  .to("#path18", { x: "+=-113%" })
  .to("#path17", { y: "0" });

setTimeout(() => {
  timeline.reverse();
}, 12000);
