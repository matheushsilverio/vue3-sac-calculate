export class Financiamento {
    constructor(presentValue, interestedRate, periods) {
      this.presentValue = presentValue;
      this.interestedRate = interestedRate;
      this.periods = periods;
      this.amortization = 0;
      this.provisionFinancing = [];
      this.JurosTotal = 0;
      this.valorPrestacao = 0.0;
      this.valorTotalFinanciamento = 0;
    }
  
    formatarDados() {
      this.presentValue = Number(this.presentValue);
      this.interestedRate = Number(this.interestedRate) / 100;
      this.periods = parseInt(this.periods);
    }
  
    calculaAmortizacao() {
      this.amortization = this.presentValue / this.periods;
      return this.amortization;
    }
  
    formataMascara(label, valor) {
      let formato = {
        minimumFractionDigits: 2,
        style: "currency",
        currency: label,
      };
      return valor.toLocaleString("pt-BR", formato);
    }
  
    CalcularTotais() {
      var Total = {
        valorPrestacao: this.formataMascara("BRL", this.valorPrestacao),
        valorTotalFinanciamento: this.formataMascara(
          "BRL",
          this.valorTotalFinanciamento
        ),
        valorTotalJuros: this.formataMascara("BRL", this.jurosTotal),
      };
  
      return Total;
    }
  
    financiarPrice() {
      var parcelas = [];
  
      var parteDeCima =
        Math.pow(1 + this.interestedRate, this.periods) * this.interestedRate;
      var parteDeBaixo = Math.pow(1 + this.interestedRate, this.periods) - 1;
      var ValorFixoParcela = this.presentValue * (parteDeCima / parteDeBaixo);
      this.valorPrestacao = ValorFixoParcela;
      var ValorPago = 0;
      var saldoDevedor = this.presentValue;
      var jurosTotal = 0;
  
      for (var i = 1; i <= this.periods; i++) {
        var Valor = ValorFixoParcela;
        var Juros = saldoDevedor * this.interestedRate;
        var Amortizacao = ValorFixoParcela - saldoDevedor * this.interestedRate;
        var SaldoDevedor = saldoDevedor;
        ValorPago = ValorFixoParcela * i;
        jurosTotal = jurosTotal + Juros;
  
        var parcela = {
          ParcelaNumber: i,
          amortization: this.formataMascara("BRL", Amortizacao),
          interestRateBalance: this.formataMascara("BRL", Juros),
          balance: this.formataMascara("BRL", SaldoDevedor),
          portion: this.formataMascara("BRL", Valor),
          valuePaid: this.formataMascara("BRL", ValorPago),
        };
  
        this.jurosTotal = jurosTotal;
  
        parcelas.push(parcela);
  
        saldoDevedor -= Amortizacao;
      }
      this.valorTotalFinanciamento = ValorPago;
      return parcelas;
    }
  
    financiarSac() {
      this.calculaAmortizacao();
      let valuePaid = 0;
      let valuePaidWithInterestedRate = 0;
      let balance = this.presentValue;
      let sac = [];
  
      this.valorPrestacao = "PRESTAÇÃO VARIAVEL";
  
      for (let k = 1; k <= this.periods; k++) {
        const interestRateBalance =
          (this.periods - k + 1) * this.amortization * this.interestedRate;
        const portion = this.amortization + interestRateBalance;
  
        balance -= this.amortization;
        valuePaid += portion;
        valuePaidWithInterestedRate += interestRateBalance;
  
        sac.push({
          index: k,
          amortization: this.formataMascara("BRL", this.amortization),
          interestRateBalance: this.formataMascara("BRL", interestRateBalance),
          portion: this.formataMascara("BRL", portion),
          valuePaid: this.formataMascara("BRL", valuePaid),
          balance: this.formataMascara("BRL", balance),
        });
      }
  
      const valorTotalFinanciamento = this.formataMascara("BRL", valuePaid);
      const valorTotalJuros = this.formataMascara(
        "BRL",
        valuePaidWithInterestedRate
      );
  
      return {
        prestacoes: sac,
        valorTotalFinanciamento,
        valorTotalJuros,
      };
    }
  }