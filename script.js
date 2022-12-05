let H1 = document.querySelector("p.title");
let Name = document.querySelector("p.name");
let Banner = document.querySelector("p.banner");
let Hornos = document.querySelector("p.Hornos");
let Button = document.querySelector("button");

let bars = document.querySelectorAll("div.progressBar div");
let progress = [0, 0];
let galletas = 0, gpTick = 0, gpClick = 1, pH = 10;
let gArr = [{
    galletas: 0,
    title: "Clicker - 0 galletas",
    gpTick: 0,
    pH: 20
}];

let Comprar = () => {
    if (galletas >= pH) {
        galletas -= pH;
        ActualizarH1();
        gpTick++;
        pH += Math.ceil( 0.35 * pH );
        Button.innerText = "COMPRAR HORNO 🥨\n(" + pH + " galletas)";
        Hornos.innerText = "🥨 x" + gpTick;
        Delante();
    }
}

let ReiniciarBars = (porcentaje = 0) => {
    bars.forEach(el => el.style = "--progress: " + porcentaje + "%;");
}

let ActualizarH1 = () => {
    H1.innerText = galletas + " 🍪";
}

let Atras = () => {

    bars[progress[0]].style = "--progress: 0%;";

    if ( progress[0] != 0 ) progress[0]--;
    else if (gArr.length > 5) {
        progress[0] = 24;
        ReiniciarBars(100);
    }
    else progress[0] = 0;
    progress[1] = 0;

    if ( gArr.length != 0 ) {
        gArr.pop();
        galletas = gArr[gArr.length - 1].galletas || 0;
        pH = gArr[gArr.length - 1].pH || 0;
        gpTick = gArr[gArr.length - 1].gpTick || 0;
        Name.innerText = gArr[gArr.length - 1].title || "Clicker - 0 galletas";
        Banner.innerText = "COMPRAR HORNO 🥨\n(" + pH + " galletas)" || "COMPRAR HORNO 🥨\n(10 galletas)";
        Hornos.innerText = "🥨 x" + gpTick || "🥨 x0";
        if ( progress[0] == 24 )
            Banner.animate({
                opacity: [1, 1, 0],
                zIndex: 10
            }, 2000);
        Button.innerText = "COMPRAR HORNO 🥨\n(" + pH + " galletas)";

    } else galletas = 0;
    ActualizarH1();
}

let Delante = () => {
    bars[progress[0]].style = "--progress: 100%;";
    progress[0]++;
    progress[1] = 0;
    galletas += gpTick;

    ActualizarH1();

    if (progress[0] == 25) {
        progress[0] = 0;
        Name.innerText = "Clicker - " + galletas + " galletas";
        Banner.innerText = "Clicker - " + galletas + " galletas";
        Banner.animate({
            opacity: [1, 1, 0],
            zIndex: 10
        }, 2000)
        ReiniciarBars();
    }

    gArr.push({
        galletas,
        title: Name.innerText,
        gpTick,
        pH
    });
}

let Click = () => {
    galletas += gpClick;
    Delante();
}

let CargaProgress = () => {
    if ( progress[1] == 100 ) Delante();
    progress[1]++;
    bars[progress[0]].style = "--progress: " + progress[1] + "%;";
}

setInterval(CargaProgress, 50);