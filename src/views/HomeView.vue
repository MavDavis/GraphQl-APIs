<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <Searchbar :data ="countries"/>
      </div>
      <div class="col-6 filter">
  <Filter  @select="filterCountry"/>
      </div>
    </div>
    <div class="row" v-if="this.$apollo.loading">
  <Modal/>
    </div>
    <div class="rows" v-else>
      <Country :datas="countries "/>
    </div>
  </div>
  </template>


<script>
import gql from 'graphql-tag';
import Filter from '@/components/filter.vue';
  import Searchbar from '@/components/searchbar.vue';
  import Country from '@/components/Country.vue';
  import Modal from '@/components/Modal.vue';
export default {
  name: 'HomeView',
  data(){
return{
  countries:[],
  loading:false,
  region:""

}  },

  components:{
      Filter,
      Searchbar,
      Country,
      Modal
  },
  apollo:{
    countries:{
query:gql`

query($regions:String){
  countries(region: $regions) {
    edges {
      node {
        name
        callingCodes
        capital
        region
        subregion
        population
        borders
        nativeName
        currencies {
          edges {
            node {
              name
              code
              symbol
            }
          }
        }
        languages {
          edges {
            node {
              name
              nativeName
            }
          }
        }
        flag
        cioc
      }
    }
  }
}
`,
variables(){
return{
  regions:this.region

}}
    }
  },
  methods:{
    filterCountry(region){
//   // this.countries = this.countries.edges.filter(country => country.node.region === region)
// let countries = this.countries
// countries = countries.edges.filter(country=>country.node.region === region)
// this.countries ={edges:countries}
this.region = region
},
  }
}
</script>

<style>
  .container{
    width: 100%;
    margin:2rem 0;
    position: relative;
  }
  .row{
    padding :0 5%;
       display: flex;
     max-width: 100%;
      
      justify-content: space-between;
      width: 100%;
      position:relative;
  }
  .rows{
    width: 100%;
    margin:2rem 0;
  
  }
  .col-6{
        position:relative;
     
  }
  .col-6.filter{
    display: flex;
    justify-content: flex-end;
  }
  @media(max-width:450px){
  .row{
    flex-direction:column;
  }
  .col-6.col-6.filter{
    justify-content: start;
  }
  
  }
  
  </style>