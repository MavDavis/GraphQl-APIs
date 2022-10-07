<template>
  <section>
    <div class="back" :class="{ bg: $store.state.theme }">
      <i class="fas fa-arrow-left"></i>
      <span @click="back()">Back</span>
    </div>
    <div v-if="!this.$apollo.loading">
    
    <div class="rowe" v-for="count in countries.edges" :key="count.node.cioc">
        <div class="col-2">
          <div class="image-container">
            <img :src="count.node.flag" alt="" />
          </div>
        </div>
        <div class="col-3">
          <div class="country-details">
            <div class="name">
              <h2>
                {{ count.node.name }}
              </h2>
            </div>
            <div class="details rowe2">
              <div class="col-6">
                <p>
                  Native Name:<span>
                    {{
                      count.node.nativeName
                    }}</span
                  >
                </p>
                <p>
                  Population:<span>{{
                    count.node.population.toLocaleString()
                  }}</span>
                </p>
                <p>
                  Region:<span>{{ count.node.region }}</span>
                </p>

                <p>
                  Sub Region:<span>{{ count.node.subregion }}</span>
                </p>
                <p>
                  Capital:<span>{{
                    count.node.capital
                  }}</span>
                </p>
              </div>
              <div class="col-6">
                <p>
                  Top Level Domain:<span v-for="cot in count.node.topLevelDomain" :key="cot">{{
                    cot
                  }}</span>
                </p>
                <p>
                  Currencies:
                  <span v-for="cot in count.node.currencies.edges" :key="cot.id">{{ cot.node.symbol}}</span>
                 
                </p>
                <p>
                  Languages:<span v-for="cot in count.node.languages.edges" :key="cot.id">{{ cot.node.name}}</span>
                </p>
              </div>
            </div>
            <div class="border">
              <p>Border Countries:</p>
              <div class="bod">
                <p
                  v-for="bord in count.node.borders"
                  :key="bord"
                  class="back"
                  :class="{ bg: $store.state.theme }"
                  @click="openNewDetail(bord)"
                >
                  {{
                    bord
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> 
   
    </div>
    <div v-else>
      <Modal/>
    </div>
  </section>
</template>

<script>
import gql from 'graphql-tag';
import Modal from '@/components/Modal.vue';
export default {
    name: "Details",
    data() {
        return {
            loading: true,
            countries: null,
            borders: null,
        };
    },
    mounted() {
        this.borders = this.$route.params.id;
        if(this.$apollo.loading === false){
          console.log(this.countries);
          this.countries.edges.forEach((item)=>{
            console.log(item.node.borders);
          })
        }
    },
    apollo: {
        countries: {
            query: gql `
query($id:String){
  countries(cioc: $id) {
    edges {
      node {
        name
        nativeName
        borders
        population
        capital
        region
        currencies {
         edges {
            node {
              id
              symbol
            }
          }
        }
        languages {
          edges {
            node {
              id
              name
            }
          }
        }
        subregion
        flag
        topLevelDomain
      }
    }
  }
}`,
            variables() {
                return {
                    id: this.borders
                };
            }
        }
    },
    computed: {},
    methods: {
        back() {
            this.$router.push("/");
        },
        openNewDetail(bord) {
            this.borders = bord;
        },
    },
    components: { Modal }
};
</script>

<style scoped>
section {
  position: relative;
  width: 100%;
  padding: 0 5%;
  margin: 2rem 0;
}
.back {
  background: var(--Light-Mode-Elements);
  color: var(--Light-Mode-Text);
  box-shadow: var(--box-shadow);
  padding: 5px 9px;
  border-radius: 10px;
  width: 100px;
  transition: ease 0.3s;
  margin: 2rem 0;
}
.back.bg {
  background: var(--Dark-Mode-Elements);
  color: var(--Dark-Mode-Text);
}
.back span {
  margin-left: 10px;
}
.back:hover {
  box-shadow: none;
  cursor: pointer;
}
.rowe,
.rowe2 {
  display: flex;
  max-width: 100%;

  justify-content: space-between;
  width: 100%;
  position: relative;
}
.details p {
  font-weight: 800;
  line-height: 1.6rem;
}
.details p span {
  font-weight: normal;
  margin-left: 5px;
}
.image-container {
  position: relative;
  height: 100%;
  max-width: 100%;
}
img {
  height: 100%;
  position: relative;
  max-width: 100%;
}
.rowe .col-2 {
  position: relative;
  width: 40%;
}
.rowe .col-3 {
  width: 56%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.border {
  margin-top: 3rem;
  display: flex;
}
.border p {
  font-weight: 800;
  margin-right: 1rem;
}
.border .bod {
  display: flex;
  flex-wrap: wrap;
     flex-direction: row;
}
.border .bod p.back {
   width: fit-content;
  margin: 0 10px 10px 10px;
  height: fit-content;
  background: var(--Light-Mode-Elements);
  color: var(--Light-Mode-Text);
  transition: ease 0.3s;
}
.border .bod p.bg {
   width: fit-content;
  margin: 0 10px 10px 10px;
  background: var(--Dark-Mode-Elements);
  color: var(--Dark-Mode-Text);
}

@media (max-width: 700px) {
  .rowe2 {
    flex-direction: column;
  }
  img {
    width: 100%;
  }
}
@media (max-width: 500px) {
  .border .bod {

     flex-direction: column;
}
  .rowe,
  .border {
    flex-direction: column;
  }
  .bod {
    margin-top: 2rem;
  }
  .rowe .col-2,
  .rowe .col-3 {
    width: 100%;
  }
}
</style>
