class AmountToWord {

    constructor() {


    }



    amount_to_word_english(num: any): string {
        let argument_number = Math.abs(num)
        let below_20 = [

            {
                id: 0,
                value: "Zero"
            },

            {
                id: 1,
                value: "One"
            },

            {
                id: 2,
                value: "Two"
            },
            {
                id: 3,
                value: "Three"
            }, {
                id: 4,
                value: "Four"
            },
            {
                id: 5,
                value: "Five"
            },
            {
                id: 6,
                value: "Six"
            },
            {
                id: 7,
                value: "Seven",
            },
            {
                id: 8,
                value: "Eight"
            },
            {
                id: 9,
                value: "Nine"
            },
            {
                id: 10,
                value: "Ten"
            },
            {
                id: 11,
                value: "Eleven"
            },
            {
                id: 12,
                value: "Twelve"
            },
            {
                id: 13,
                value: "Thirteen"
            },
            {
                id: 14,
                value: "Fourteen"
            },
            {
                id: 15,
                value: "Fifteen"
            },
            {
                id: 16,
                value: "Sixteen"
            },
            {
                id: 17,
                value: "Seventeen"
            },
            {
                id: 18,
                value: "Eighteen"
            },
            {
                id: 19,
                value: "Nineteen"
            }

        ]

        let below_100 = [
            {
                id: 2,
                value: "Twenty"
            },
            {
                id: 3,
                value: "Thirty"
            },
            {
                id: 4,
                value: "Fourty"
            },
            {
                id: 5,
                value: "Fifty"
            },
            {
                id: 6,
                value: "Sixty"
            },
            {
                id: 7,
                value: "Seventy"
            },
            {
                id: 8,
                value: "Eighty"
            },
            {
                id: 9,
                value: "Ninethy"
            }
        ]
        let amount = parseInt(argument_number.toString().split('.')[0])
        let paisa = parseInt(argument_number.toString().split('.')[1])
        let word = 'Opps to big Number!!!'

        if (Math.floor(amount) == 0) {
            word = ''
        }
        else if (Math.floor(amount) >= 1 && Math.floor(amount) <= 19) {
            word = below_20.filter(item => item.id == Math.floor(amount))[0].value

        }
        else if (Math.floor(amount) >= 20 && Math.floor(amount) <= 99) {

            let place_first = below_100.filter(item => item.id == parseInt((Math.floor(amount) / 10).toFixed(2)))[0].value
            let place_rest = this.amount_to_word_english((amount % 10).toFixed(2))
            word = `${place_first} ${place_rest}`
        }
        else if (Math.floor(amount) >= 100 && Math.floor(amount) <= 999) {
            let place_first = this.amount_to_word_english((Math.floor(amount) / 100).toFixed(2))
            let place_rest = this.amount_to_word_english((amount % 100).toFixed(2))
            word = `${place_first} Hundred ${place_rest}`

        }
        else if (Math.floor(amount) >= 1000 && Math.floor(amount) <= 99999) {
            let place_first = this.amount_to_word_english((Math.floor(amount) / 1000).toFixed(2))
            let place_rest = this.amount_to_word_english((amount % 1000).toFixed(2))
            word = `${place_first} Thousand ${place_rest}`

        }
        else if (Math.floor(amount) >= 100000 && Math.floor(amount) <= 9999999) {
            let place_first = this.amount_to_word_english((Math.floor(amount) / 100000).toFixed(2))
            let place_rest = this.amount_to_word_english((amount % 100000).toFixed(2))
            word = `${place_first} Lakh ${place_rest}`

        }
        else if (Math.floor(amount) >= 10000000 && Math.floor(amount) <= 999999999) {
            let place_first = this.amount_to_word_english((Math.floor(amount) / 10000000).toFixed(2))
            let place_rest = this.amount_to_word_english((amount % 10000000).toFixed(2))
            word = `${place_first} Crore ${place_rest}`

        }
        else if (Math.floor(amount) >= 100000000 && Math.floor(amount) <= 99999999999) {
            let place_first = this.amount_to_word_english((Math.floor(amount) / 100000000).toFixed(2))
            let place_rest = this.amount_to_word_english((amount % 100000000).toFixed(2))
            word = `${place_first} Arab ${place_rest}`

        }
        else if (Math.floor(amount) >= 1000000000 && Math.floor(amount) <= 9999999999999) {
            let place_first = this.amount_to_word_english((Math.floor(amount) / 1000000000).toFixed(2))
            let place_rest = this.amount_to_word_english((amount % 1000000000).toFixed(2))
            word = `${place_first} Kharab ${place_rest}`

        }
        else {
            word = "Opps!! So Big... Number !!!!"
        }

        return word
    }


}


export default new AmountToWord();

