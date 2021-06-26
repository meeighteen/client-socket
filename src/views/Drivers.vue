<template>
  <div class="default-page">
    <!-- <div>Test</div> -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-8 col-md-8 col-sm-12">
          <button @click="emitInit">Listar Drivers</button>
          <p> {{ drivers}} </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      drivers: {}
    };
  },
  sockets: {
    connect: () => {
      console.log("conectado");
    },
  },
  mounted() {
    //cuando se crea la vista se ejecuta lo de acá
    this.sockets.subscribe("admin:getAllDrivers", (data) => {
      this.drivers = data; 
      if(!data) { this.emitInit() }
    });
    console.log("suscribe");
    // this.emitInit();
  },
  beforeDestroy() {
    //cuando sale de la vista se ejecuta esta parte
    this.sockets.unsubscribe("location");
    console.log("unsuscribe");
  },
  methods: {
    emitInit() {
      console.log("obteniendo infoDriver[] de Redis");
      const idUser = "60b1e27d4a1fb73e3871d71a";
      this.$socket.emit('admin:drivers', idUser);   
    }
  },
};
</script>

<style></style>
