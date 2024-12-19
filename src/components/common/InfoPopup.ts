const InfoPopup = (text: string) => {
    const popup = document.createElement("div");
    popup.innerText = text;
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.padding = "20px";
    popup.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    popup.style.color = "white";
    popup.style.borderRadius = "10px";
    popup.style.zIndex = "1000";
    popup.style.textAlign = "center";

    document.body.appendChild(popup);

    setTimeout(() => {
        document.body.removeChild(popup);
    }, 3000);
};

export default InfoPopup;