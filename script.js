const GraMemory = {
    liczKloc : 20,
    liczKlocRzad : 5,
    divPlansza : null,
    divWynik : null,
    klocki : [],
    klockiZaznaczone : [],
    ruchy : 0,
    czyKlik : true,
    pary : 0,
    klockiObr : [
        "./zdjecia/cplusplus.png",
        "./zdjecia/csharp.png",
        "./zdjecia/java.png",
        "./zdjecia/javascript.png",
        "./zdjecia/lua.png",
        "./zdjecia/mysql.png",
        "./zdjecia/php.png",
        "./zdjecia/python.png",
        "./zdjecia/ruby.png",
        "./zdjecia/swift.png"
    ],

    klocekKlik(w) 
    {
        if (this.czyKlik) 
        {
            if (!this.klockiZaznaczone[0] || (this.klockiZaznaczone[0].dataset.index !== w.target.dataset.index)) 
            {
                this.klockiZaznaczone.push(w.target);
                w.target.style.backgroundImage = `url(${this.klockiObr[w.target.dataset.typKarty]})`;
            }
            if (this.klockiZaznaczone.length === 2) 
            {
                this.czyKlik = false;
                if (this.klockiZaznaczone[0].dataset.typKarty === this.klockiZaznaczone[1].dataset.typKarty) 
                    setTimeout(() => this.klockiUsuwanie(), 500);
                else
                    setTimeout(() => this.klockiReset(), 500);
                this.ruchy++;
                this.divWynik.innerText = this.ruchy;
            }
        }
    },

    klockiUsuwanie() 
    {
        this.klockiZaznaczone.forEach(x => {
            const emptyDiv = document.createElement("div");
            x.after(emptyDiv);
            x.remove();
        });
        this.czyKlik = true;
        this.klockiZaznaczone = [];
        this.pary++;
        if (this.pary >= this.liczKloc / 2) 
            alert("Gratulacje! Znalazłeś wszystkie pary.");
    },

    klockiReset() 
    {
        this.klockiZaznaczone.forEach(x => x.style.backgroundImage = "");
        this.klockiZaznaczone = [];
        this.czyKlik = true;
    },

    startGry() 
    {
        this.divPlansza = document.querySelector("#plansza");
        this.divPlansza.innerHTML = "";
        this.divWynik = document.querySelector("#wynik");
        this.divWynik.innerHTML = 0;
        this.klocki = [];
        this.klockiZaznaczone = [];
        this.ruchy = 0;
        this.czyKlik = true;
        this.pary = 0;
        for (let i=0; i<this.liczKloc; i++)
            this.klocki.push(Math.floor(i/2));
        for (let i=this.liczKloc-1; i>0; i--) 
        {
            const zmiana = Math.floor(Math.random()*i);
            const dod = this.klocki[i];
            this.klocki[i] = this.klocki[zmiana];
            this.klocki[zmiana] = dod;
        }
        for (let i=0; i<this.liczKloc; i++) 
        {
            const tile = document.createElement("div");
            tile.classList.add("klocek");
            this.divPlansza.appendChild(tile);
            tile.dataset.typKarty = this.klocki[i];
            tile.dataset.index = i;
            tile.addEventListener("click", w => this.klocekKlik(w));
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const startPrzycisk = document.querySelector("#start");
    startPrzycisk.addEventListener("click", w => GraMemory.startGry());
});