export class Sac {
  constructor(value, periods, interestRate) {
    this.value = value;
    this.periods = periods;
    this.interestRate = interestRate;
  }

  getParams() {
    const amortization = this.value / this.periods;
    const balance = this.value;
    const percentage = this.interestRate / 100;

    return {
      amortization,
      percentage,
      balance,
    };
  }

  doSac() {
    let { amortization, percentage, balance } = this.getParams();
    let newBalance = balance;
    let valuePaid = 0;
    let sac = [];

    for (let k = 1; k <= this.periods; k++) {
      const interestRateBalance =
        (this.periods - k + 1) * amortization * percentage;
      const portion = amortization + interestRateBalance;

      newBalance -= amortization;
      valuePaid += portion;

      sac.push({
        index: k,
        amortization,
        interestRateBalance,
        portion,
        valuePaid,
        balance: newBalance,
      });
    }

    return sac;
  }
}
