function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
            };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform
            ? "transform"
            : "fixed",
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}
locomotiveAnimation();

function landingtitle() {
    var tl = gsap.timeline()
    tl.from("#logo", {
        opacity: 0,
        y: -20,
        duration: 0.4
    })
    tl.from("#nav-part-2", {
        y: -50,
        opacity: 0,
        duration: 0.5,
    }, "-=0.2")
    tl.from("#title h1 ", {
        y: 500,
        duration: 0.48,
        stagger: 0.2,
    }, "-=0.3");
    tl.to("#page1 img", {
        opacity: "1",
        scale: "1"
    });
}
landingtitle()

function navbarAnimations() {

    function scrolltriggers() {
        gsap.to("#nav-part-2 .links", {
            opacity: 0,
            scrollTrigger: {
                trigger: "#page1",
                scroller: "#main",
                start: "top 0",
                end: "top -5%",
                scrub: true,
            }
        });
    }
    scrolltriggers()

    function menuanimation() {
        document.querySelector("#navbar-icons a").addEventListener("click", function (event) {
            event.preventDefault();
        })
        let ismenuclose = true
        document.getElementById("menuicon").addEventListener("click", function () {
            var menu = document.querySelector("#menu")
            var links = document.querySelectorAll("#nav-part-2 a")
            var logo = document.querySelector("#logo svg")
            var backgroundicons = document.querySelector('#navbar-icons')

            var menulinks = document.querySelectorAll(".menulinks h2")
            var elem = document.querySelector("#elem404")

            if (ismenuclose == false) {
                var logoBpin = document.querySelector("#logo #b")
                var logoWpin = document.querySelector("#logo #w")
                

                gsap.to(backgroundicons, {
                    background: "#F7F7F7"
                })
                var tback = gsap.timeline()

                tback.to(elem, {
                    opacity: 0,
                    duration: 0.3
                })

                tback.to(menu, {
                    height: "0vh",
                    duration: 0.3
                });

                tback.to(links, {
                    color: "black"
                }, '-=0.3');

                tback.to(logo, {
                    color: "black"
                }, '-=0.3');

                tback.to(logoWpin,{
                    y: "0%",
                    duration: 0.3
                },"-=0.7")
                tback.to(logoBpin,{
                    y: "0%",
                    duration: 0.25
                },"-=0.5")

                ismenuclose = true
            }

            else {
                var logoBpin = document.querySelector("#logo #b")
                var logoWpin = document.querySelector("#logo #w")

                

                gsap.to(backgroundicons, {
                    background: "transparent"
                })

                gsap.to(menu, {
                    height: "100vh",
                    duration: 0.4
                });
                gsap.to(logoBpin,{
                    y: "100%",   
                })
                gsap.to(logoWpin,{
                    y: "-100%", 
                })

                links.forEach(link => {
                    gsap.to(link, {
                        color: "white"
                    })
                });

                var tl = gsap.timeline()
                tl.from(menulinks, {
                    y: "350px",
                    ease: "power2.out",
                    duration: 0.55
                });
                
                tl.to(elem, {
                    opacity: "1",
                    duration: 0.4
                })

                

                ismenuclose = false
            }
        });
    }
    menuanimation()

}
navbarAnimations()

document.addEventListener("mousemove", function (dets) {
    gsap.to("#circle", {
        x: dets.x,
        y: dets.y,
    });
});

var child = document.querySelectorAll("#page4 .child")
var circle = document.querySelector("#circle")
child.forEach(child => {
    child.addEventListener("mouseenter", function () {
        gsap.to(circle, {
            opacity: 1,
            scale: 1,
        });
    });

    child.addEventListener("mouseleave", function () {
        gsap.to(circle, {
            opacity: 0,
            scale: 0,
        });
    });
});

function menulinksanime() {
    var menulinksanime = document.querySelectorAll(".menulinks")
    menulinksanime.forEach(links => {
        links.addEventListener("mouseenter", function () {
            gsap.to(links, {
                x : "-2vw",
            });
            gsap.to(links.querySelector("h2"), {
                color: "#ffcc00",
            });
        });
        links.addEventListener("mouseleave", function () {
            gsap.to(links, {
                x : "0vw",
            });
            gsap.to(links.querySelector("h2"), {
                color: "#f7f7f7",
            });
        });
    })
}
menulinksanime()

function page2video() {
    var page2center = document.querySelector("#page2-center")
    var video = document.querySelector("#video")
    var showreel = document.querySelector('#showreel')

    page2center.addEventListener("click", function () {
        video.play()
        gsap.to(video, {
            display: "flex",
            transform: "scaleX(1) scaleY(1)",
            borderRadius: "0",
            opacity: "1",

        })
        gsap.to(showreel, {
            display: "flex"
        })
    })
    video.addEventListener("click", function () {
        video.pause()
        gsap.to(video, {
            transform: "scaleX(0.7) scaleY(0)",
            borderRadius: "40px",
            opacity: 0,
            display: "none",

        })
    })
}
page2video()











