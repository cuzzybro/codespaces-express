const randexp = require('randexp');

class NhiTools {

    #table = '^ABCDEFGHJKLMNPQRSTUVWXYZ';
    #isAlpha = false;
    #nhiInitialString = '';
    nhiNumber = '';
    #check = 0;
    #MODHIGH = 23;
    #MODLOW = 11;

    generateNhi() {
        this.#generateInitialString();
        if (this.isNhiValid(this.#nhiInitialString)) {
            console.log(`generated nhi: ${this.nhiNumber}`);
            return this.nhiNumber;
        } else {
            this.generateNhi();
        };
    };

    #generateInitialString() {
        let NHI = new randexp('^[A-HJ-NP-Z]{3}[0-9]{2}[A-HJ-NP-Z0-9]');
        this.#nhiInitialString = NHI.gen();
        return this.#nhiInitialString;
    }

    #setCheckAndNhi(total, nhi) {
        if (this.#isAlpha) {
            this.#check = this.#table[this.#MODHIGH - (total % this.#MODHIGH)];
            this.nhiNumber = `${nhi}${this.#check}`;
        } else {
            this.#check = this.#MODLOW - (total % this.#MODLOW);
            if (this.#check == 10) {
                this.#check = 0;
            };
            this.nhiNumber = `${nhi}${this.#check}`;
        };
    };

    #setThirdChar(nhi) {
        if (this.#table.includes(nhi[5])) {
            this.#isAlpha = true;
            return this.#table.indexOf(nhi[5]) * 2;
        } else {
            this.#isAlpha = false;
            return parseInt(nhi[5]) * 2;
        }
    }

    isNhiValid(nhi) {
        if (typeof nhi == 'undefined') return false;
        if (nhi.length <= 6 && nhi != this.#nhiInitialString) return false;
        let sectionOne = (this.#table.indexOf(nhi[0] * 7) + (this.#table.indexOf(nhi[1]) * 6) + (this.#table.indexOf(nhi[2]) * 5));
        let firstNumber = parseInt(nhi[3] * 4)
        let secondNumber = parseInt(nhi[4] * 3)
        let thirdChar = this.#setThirdChar(nhi)
        let total = sectionOne + firstNumber + secondNumber + thirdChar

        this.#setCheckAndNhi(total, nhi)

        if (this.#check == 11) return false;
        if (nhi.length === 7) this.nhiNumber = this.nhiNumber.slice(0, -1) + this.#check;
        if (this.nhiNumber === nhi | this.#nhiInitialString === nhi && this.nhiNumber.length ===7 | nhi.length < 8 | typeof this.nhiNumber != 'undefined') {
            return true;
        } else {
            return false;
        }
    }



}

module.exports = NhiTools