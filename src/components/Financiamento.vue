<template>
  <div class="alignment">
    <div class="container">
      <div class="level">
        <div class="level-left">
          <h1 class="title is-4">Simulação de Financiamento</h1>
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
                  :class="{ 'is-danger': validators['value'] }"
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
                  :class="{ 'is-danger': validators['periods'] }"
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
                    :class="{ 'is-danger': validators['taxa'] }"
                    type="number"
                    placeholder="ex: 2"
                  />
                  <span class="icon is-right">
                    <i class="fas fa-percentage"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="">Tipo de Simulação</label>
                <div class="control control-select">
                  <div
                    class="select"
                    :class="{ 'is-danger': validators['type'] }"
                  >
                    <select v-model="type">
                      <option value="sac">SAC</option>
                      <option value="price">Price</option>
                    </select>
                  </div>
                </div>
              </div>
              <button
                class="button is-success is-fullwidth"
                @click="handleFinancing"
              >
                Simular Financiamento
              </button>
            </div>
          </div>
        </div>
        <div v-if="price" class="column is-full">
          <div class="card">
            <div class="card-title">
              <div class="level">
                <div class="level-left">
                  <h2>Price</h2>
                </div>
                <div class="level-right">
                  <button
                    class="button is-danger has-right-icon is-small"
                    @click="resetPrice"
                  >
                    <span class="icon">
                      <i class="fas fa-times"></i>
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="columns is-multiline">
                <div class="column is-full">
                  <div class="currency-detail">
                    <label>Valor da Prestação</label>
                    <p>{{ price.valorPrestacao }}</p>
                  </div>
                </div>
                <div class="column is-full">
                  <div class="currency-detail">
                    <label>Valor total do Financiamento</label>
                    <p>{{ price.valorTotalFinanciamento }}</p>
                  </div>
                </div>
                <div class="column is-full">
                  <div class="currency-detail">
                    <label>Valor total de Juros pago</label>
                    <p>{{ price.valorTotalJuros }}</p>
                  </div>
                </div>
              </div>

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
                  <tr v-for="item of price.prestacoes" :key="item.index">
                    <th>{{ item.index }}</th>
                    <td>{{ item.amortization }}</td>
                    <td>{{ item.interestRateBalance }}</td>
                    <td>{{ item.portion }}</td>
                    <td>{{ item.valuePaid }}</td>
                    <td>{{ item.balance }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div v-if="sac" class="column is-full">
          <div class="card">
            <div class="card-title">
              <div class="level">
                <div class="level-left">
                  <h2>SAC - Sistema de Amortizações Constantes</h2>
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
              <div class="columns is-multiline">
                <div class="column is-full">
                  <div class="currency-detail">
                    <label>Valor total do Financiamento</label>
                    <p>{{ sac.valorTotalFinanciamento }}</p>
                  </div>
                </div>
                <div class="column is-full">
                  <div class="currency-detail">
                    <label>Valor total de Juros pago</label>
                    <p>{{ sac.valorTotalJuros }}</p>
                  </div>
                </div>
              </div>

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
                  <tr v-for="item of sac.prestacoes" :key="item.index">
                    <th>{{ item.index }}</th>
                    <td>{{ item.amortization }}</td>
                    <td>{{ item.interestRateBalance }}</td>
                    <td>{{ item.portion }}</td>
                    <td>{{ item.valuePaid }}</td>
                    <td>{{ item.balance }}</td>
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
import { Financiamento } from "../lib/financing";

export default {
  data() {
    return {
      type: null,
      taxa: null,
      totalValue: null,
      qtdPeriod: null,
      sac: null,
      price: null,
      validators: {},
    };
  },
  methods: {
    handleSac() {
      const sac = new Financiamento(this.totalValue, this.taxa, this.qtdPeriod);
      sac.formatarDados();

      this.sac = sac.financiarSac();
    },
    handlePrice() {
      const price = new Financiamento(
        this.totalValue,
        this.taxa,
        this.qtdPeriod
      );
      price.formatarDados();
      this.price = price.financiarPrice();
    },
    handleFinancing() {
      if (!this.validate()) return;

      if (this.type === "sac") this.handleSac();
      else if (this.type === "price") this.handlePrice();
    },
    validate() {
      this.validators = {};
      if (!this.type) this.validators["type"] = true;
      if (!this.taxa) this.validators["taxa"] = true;
      if (!this.totalValue) this.validators["value"] = true;
      if (!this.qtdPeriod) this.validators["periods"] = true;

      return Object.keys(this.validators).length === 0;
    },
    resetPrice() {
      this.price = null;
      this.taxa = null;
      this.totalValue = null;
      this.qtdPeriod = null;
    },
    resetSac() {
      this.sac = null;
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

.currency-detail {
  display: flex;
  flex-direction: column;
}
.currency-detail label {
  font-size: 0.9em;
}

.currency-detail p {
  font-size: 1em;
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
.select {
  width: 100%;
}
.control-select .select select {
  width: 100%;
}
</style>
