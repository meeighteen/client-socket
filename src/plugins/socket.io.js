import * as io from "socket.io-client";
import VueSocketIO from "vue-socket.io";
import store from "../store"

export const vueSocketIO = new VueSocketIO({
    debug: true, //quitar o poner en false para quitar los logs
    connection: io('http://localhost:3000', {  //cambiar url si es necesario
        path: "/api/socket.io"
    }),
    vuex: {
        store,
    }
})