import {makeAutoObservable} from "mobx"

class PriceStore {
    buyPrice: number = 0
    sellPrice: number = 0

    constructor() {
        makeAutoObservable(this)
    }

    setBuyPrice(newPrice: number){
        this.buyPrice = newPrice
    }
    setSellPrice(newPrice: number){
        this.sellPrice = newPrice
    }
}

const priceStore = new PriceStore()
export default priceStore
