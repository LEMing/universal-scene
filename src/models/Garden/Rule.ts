
class Rule {
  private readonly a: string;
  private readonly b: string;
  constructor({a, b}: {a: string, b: string}) {
    this.a = a;
    this.b = b;
  }
  getA() {
    return this.a;
  }
  getB() {
    return this.b;
  }
}

export default Rule;
