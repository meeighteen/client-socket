<template>
  <div class="default-page">
    <!-- <div>Test</div> -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-8 col-md-8 col-sm-12">
          <!-- {{message}} -->
          <button @click="emitGetService">Iniciar recorrido</button>
          <button @click="emitEndService">Terminar servicio</button>
          <p> {{ service}} </p>
          <p> {{ location}} </p>
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
      location: {},
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
    this.sockets.subscribe("driver:service", (data) => {
      this.service = data;
      if(!data) {
        console.log("Devuelve false")
        }
    });
    this.sockets.subscribe("driver:location", (data) => {
      this.location = data;
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
      console.log("enviando para configuración")
      //añadir el ID de repartidor
      const IdDriver = "60b51f77fee3753218aa0b06"
      this.$socket.emit('driver:init', IdDriver)
    }, 
    emitSetLocation(){
      const data = [
        {
          id:"60b51f77fee3753218aa0b06", 
          coordinates:"-12.064100, -77.035800",
        },
        {
          id:"60b51f77fee3753218aa0b06", 
          coordinates:"-12.064115, -77.035826",
        },
        {
          id:"60b51f77fee3753218aa0b06", 
          coordinates:"-12.064114, -77.035811",          
        },
        {
          id:"60b51f77fee3753218aa0b06", 
          coordinates:"-12.064225, -77.040826",
        },
        {
          id:"60b51f77fee3753218aa0b06", 
          coordinates:"-12.064199, -77.035576",
        }
      ];
      let pos = Math.floor(Math.random() * 4);
      this.$socket.emit("driver:location", data[pos]);
    },
    emitGetService(){
      const data = [
        {
          id:"60b51f77fee3753218aa0b06", 
          coordinates:"-12.064100, -77.035800",
          
        },
        {
          id:"60b51f77fee3753218aa0b06", 
          coordinates:"-12.064115, -77.035826",
          
        },
        {
          id:"60b51f77fee3753218aa0b06", 
          coordinates:"-12.064114, -77.035811",          
          
        },
        {
          id:"60b51f77fee3753218aa0b06", 
          coordinates:"-12.064225, -77.040826",
          
        },
        {
          id:"60b51f77fee3753218aa0b06", 
          coordinates:"-12.064199, -77.035576",
          
        }
      ];
      let pos = Math.floor(Math.random() * 4);
      this.$socket.emit("driver:service", data[pos]);
      let intervalLocation = setInterval(this.emitSetLocation,5000);
    },
    emitEndService(){
      //id -> finalizar el servicio del dia
      const IdDriver = "60b51f77fee3753218aa0b06";
      this.$socket.emit("driver:end",IdDriver);

      this.service = {};
      this.location = {};
    }
  },
};
</script>

<style></style>
