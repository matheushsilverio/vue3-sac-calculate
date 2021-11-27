<template>
  <div class="alignment">
    <div class="container">
      <div class="level">
        <div class="level-left">
          <h1 class="title is-4">SAC - Sistema de Amortizações Constantes</h1>
        </div>
        <div class="level-right">
          <div class="align-icons-external">
            <a
              href="https://github.com/matheushsilverio/vue3-sac-calculate"
              target="_blank"
            >
              <span class="icon">
                <i class="fab fa-github"></i>
              </span>
            </a>
          </div>
        </div>
      </div>

      <div class="columns is-multiline">
        <div class="column is-full">
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
        <div v-if="periodsSac.length > 0" class="column is-full">
          <div class="card">
            <div class="card-title">
              <div class="level">
                <div class="level-left">
                  <h2>Resultado</h2>
                </div>
                <div class="level-right">
                  <button
                    class="button is-danger has-right-icon is-small"
                    @click="resetSac"
                  >
                    <span class="icon">
                      <i class="fas fa-times"></i>
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body">
              <table class="table">
                <thead>
                  <tr>
                    <th>Período</th>
                    <th>Amortização</th>
                    <th>Juros</th>
                    <th>Prestação</th>
                    <th>Valor Pago</th>
                    <th>Saldo Devedor</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>Período</th>
                    <th>Amortização</th>
                    <th>Juros</th>
                    <th>Prestação</th>
                    <th>Valor Pago</th>
                    <th>Saldo Devedor</th>
                  </tr>
                </tfoot>
                <tbody>
                  <tr v-for="item of periodsSac" :key="item.index">
                    <th>{{ item.index }}</th>
                    <td>{{ formatValue(item.amortization) }}</td>
                    <td>{{ formatValue(item.interestRateBalance) }}</td>
                    <td>{{ formatValue(item.portion) }}</td>
                    <td>{{ formatValue(item.valuePaid) }}</td>
                    <td>{{ formatValue(item.balance) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-full">
        <div class="credits">
          2021. Desenvolvido por
          <a href="https://github.com/matheushsilverio">@matheushsilverio</a> e
          <a href="https://github.com/vinige">@vinige</a>
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
      periodsSac: [],
    };
  },
  methods: {
    handleSac() {
      const sac = new Sac(this.totalValue, this.qtdPeriod, this.taxa);
      this.periodsSac = sac.doSac();
    },
    resetSac() {
      this.periodsSac = [];
      this.taxa = null;
      this.totalValue = null;
      this.qtdPeriod = null;
    },
    formatValue(value) {
      return `R$ ${value.toFixed(2).replace(".", ",")}`;
    },
  },
};
</script>

<style lang="css" scoped>
.alignment {
  width: 40%;
  min-width: 761px;
  margin: 0 auto;
  height: 100%;
}
.credits {
  display: flex;
  align-items: center;
  justify-content: center;
}
.credits a {
  margin: 0 0.25em;
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
.card-body .table {
  width: 100%;
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
