export class Financiamento {
  constructor(presentValue, interestedRate, periods) {
    this.presentValue = presentValue;
    this.interestedRate = interestedRate;
    this.periods = periods;
    this.amortization = 0;
    this.provisionFinancing = [];
  }

  formatarDados() {
    this.presentValue = parseInt(this.presentValue);
    this.interestedRate = parseFloat(this.interestedRate) / 100;
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

  financiarPrice() {
    let installment =
      (this.presentValue *
        (Math.pow(1 + this.interestedRate, this.periods) *
          this.interestedRate)) /
      (Math.pow(1 + this.interestedRate, this.periods) - 1);
    this.provisionFinancing.push(installment);

    const valorPrestacao = this.formataMascara(
      "BRL",
      this.provisionFinancing[0]
    );
    const valorTotalFinanciamento = installment * this.periods;
    const valorTotalJuros = valorTotalFinanciamento - this.presentValue;

    let valuePaid = 0;
    let balance = this.presentValue;
    let valuePaidWithInterestedRate = 0;
    let price = [];

    for (let i = 1; i <= this.periods; i++) {
      const interestedRateBalance = balance * this.interestedRate;
      const amortizationBalance = installment - balance * this.interestedRate;

      valuePaid = installment * i;
      valuePaidWithInterestedRate *= interestedRateBalance;

      price.push({
        index: i,
        amortization: this.formataMascara("BRL", amortizationBalance),
        interestRateBalance: this.formataMascara("BRL", interestedRateBalance),
        portion: this.formataMascara("BRL", installment),
        valuePaid: this.formataMascara("BRL", valuePaid),
        balance: this.formataMascara("BRL", balance),
      });

      balance -= amortizationBalance;
    }

    return {
      valorPrestacao,
      prestacoes: price,
      valorTotalFinanciamento: this.formataMascara(
        "BRL",
        valorTotalFinanciamento
      ),
      valorTotalJuros: this.formataMascara("BRL", valorTotalJuros),
    };
  }

  financiarSac() {
    this.calculaAmortizacao();
    let valuePaid = 0;
    let valuePaidWithInterestedRate = 0;
    let balance = this.presentValue;
    let sac = [];

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
