<template>
  <div class="default-page">
    <!-- <div>Test</div> -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-8 col-md-8 col-sm-12">
          <!-- {{message}} -->
          <button @click="emitInit">emit init</button>
          <p> {{ service}} </p>
        </div>
      </div>
    </div>
    <!-- <p>{{message}}</p> -->
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      message: [],
      service: {}
    };
  },
  sockets: {
    connect: () => {
      console.log("conectado");
    },
  },
  mounted() {
    //cuando se crea la vista se ejecuta lo de acá
    this.sockets.subscribe("client:getDetailService", (data) => {
      this.service = data; 
      if(!data) { this.emitInit() }
    });
    console.log("suscribe");
    this.emitInit();
  },
  beforeDestroy() {
    //cuando sale de la vista se ejecuta esta parte
    this.sockets.unsubscribe("location");
    console.log("unsuscribe");
  },
  methods: {
    emitInit() {
      console.log("enviando el idServicio")
      const idServicio = "60bc186571804c0638341e04"
      this.$socket.emit('client:detailService', idServicio)      
    }
  },
};
</script>

<style></style>
