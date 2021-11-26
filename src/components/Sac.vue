<template>
  <div class="alignment">
    <div class="container">
      <div class="level">
        <div class="level-left">
          <h1 class="title">SAC</h1>
        </div>
        <div class="level-right">
          <div class="align-icons-external">
            <a href="">
              <span class="icon">
                <i class="fab fa-github"></i>
              </span>
            </a>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-title">
          <h2>Cálculo do financiamento</h2>
        </div>
        <div class="card-body">
          <div class="field">
            <label for="sac-input-total-value"
              >Valor total do financiamento</label
            >
            <input
              id="sac-input-total-value"
              v-model="totalValue"
              class="input"
              type="text"
              placeholder="ex: 1000"
            />
          </div>
          <div class="field">
            <label for="sac-input-qtd-period">Quantidade de períodos</label>
            <input
              id="sac-input-qtd-period"
              v-model="qtdPeriod"
              class="input"
              type="number"
              placeholder="ex: 12"
            />
          </div>
          <div class="field">
            <label for="sac-input-juros">Taxa de Juros (%)</label>
            <div class="control has-icons-right">
              <input
                id="sac-input-juros"
                v-model="taxa"
                class="input"
                type="number"
                placeholder="ex: 2"
              />
              <span class="icon is-right">
                <i class="fas fa-percentage"></i>
              </span>
            </div>
          </div>
          <button class="button is-success is-fullwidth" @click="handleSac">
            Simular Financiamento
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Sac } from "../lib/sac";

export default {
  data() {
    return {
      taxa: null,
      totalValue: null,
      qtdPeriod: null,
      tableSac: [],
    };
  },
  methods: {
    handleSac() {
      const sac = new Sac(this.totalValue, this.qtdPeriod, this.taxa);
      this.tableSac = sac.doSac();
      console.log(this.tableSac);
    },
  },
};
</script>

<style lang="css" scoped>
.alignment {
  width: 40%;
  margin: 0 auto;
  height: 100%;
}

.container {
  padding: 2rem 0;
}

.card {
  border-radius: 7px;
}
.card-title {
  width: 100%;
  border-bottom: 1px solid rgb(233, 233, 233);
  padding: 1rem;
}
.card-title h2 {
  font-size: 1em;
  font-weight: 600;
}

.card-body {
  padding: 1rem;
}

.field label {
  margin-bottom: 0.5em;
  font-size: 0.9em;
}

.align-icons-external {
  font-size: 1.3em;
  display: flex;
}
</style>
