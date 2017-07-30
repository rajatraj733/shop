export class Person {
    constructor(
        public id: Number,
        public name: String,
        public address: String,
        public mobileNo: String,
        public identificationType: String,
        public identificationNumber: String,
        public isCustomer: boolean,
        public isSupplier: boolean,
        public balance: Number,
        public comment: String,
    ) {

    }
}