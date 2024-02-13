import type Checker from './Checker'

class CheckerChainBuilder {
  head: Checker | null
  tail: Checker | null

  constructor () {
    this.head = null
    this.tail = null
  }

  addChecker (checker: Checker): this {
    if (this.head === null) {
      this.head = checker
      this.tail = this.head
    } else if (this.tail !== null) {
      this.tail.setNextChecker(checker)
      this.tail = checker
    }
    return this
  }

  getHead (): Checker | null {
    return this.head
  }
}

export default CheckerChainBuilder
