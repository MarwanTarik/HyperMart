abstract class Checker {
  private next: Checker

  abstract check (): Promise<boolean>

  setNextChecker (next: Checker): void {
    this.next = next
  }

  async callNext (): Promise<boolean> {
    if (this.next != null) {
      return await this.next.check()
    }
    return true
  }
}

export default Checker
