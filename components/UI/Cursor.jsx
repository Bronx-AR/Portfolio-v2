import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Cursor = () => {
    const router = useRouter();

    const handleHoverItemMouseOver = (hoverItem) => {
        const cursorInner = document.querySelector(".cursor-inner");
        cursorInner.innerHTML = "<div class='mouse-caption'><h2>" + hoverItem.getAttribute('data-hover-caption') + "</h2></div>";
        cursorInner.classList.add("visible");
    };

    const handleHoverItemMouseOut = () => {
        const cursorInner = document.querySelector(".cursor-inner");
        cursorInner.innerHTML = "";
    };

    const handleHoverImgMouseOver = (hoverImg) => {
        const cursorInner = document.querySelector(".cursor-inner");
        cursorInner.innerHTML = "<img src='" + hoverImg.getAttribute('data-hover-img') + "'>";
        cursorInner.classList.add("visible");
    };

    const handleHoverImgMouseOut = () => {
        const cursorInner = document.querySelector(".cursor-inner");
        cursorInner.innerHTML = "";
    };

    useEffect(() => {
        const cursor = document.querySelector(".cursors");

        const handleMouseMove = (event) => {
            cursor.style.left = event.pageX + "px";
            cursor.style.top = event.pageY + "px";
        };

        document.addEventListener("mousemove", handleMouseMove);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    useEffect(() => {
        const handleRouteChange = () => {
            document.querySelectorAll("div[data-hover-caption]").forEach(hoverItem => {
                hoverItem.addEventListener("mouseover", () => handleHoverItemMouseOver(hoverItem));
                hoverItem.addEventListener("mouseout", handleHoverItemMouseOut);
            });

            document.querySelectorAll("[data-hover-img]").forEach(hoverImg => {
                hoverImg.addEventListener("mouseover", () => handleHoverImgMouseOver(hoverImg));
                hoverImg.addEventListener("mouseout", handleHoverImgMouseOut);
            });
        };

        handleRouteChange(); // Call once to set up listeners initially

        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);

    return (
        <div className="cursors">
            <div className="cursor-inner"></div>
        </div>
    );
}

export default Cursor;
