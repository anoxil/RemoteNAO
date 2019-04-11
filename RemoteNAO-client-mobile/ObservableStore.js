import { observable } from "mobx";

class ObservableStore {

    @observable img64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

    updateTopCamera(image) {
        this.img64 = image;
    }

}

const observableStore = new ObservableStore();
export default observableStore;