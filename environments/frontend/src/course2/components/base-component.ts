abstract class BaseComponent<T extends HTMLElement, U extends HTMLElement> {
  protected elem: U

  protected hostElem: T

  protected templateElem: HTMLTemplateElement

  constructor (
    params: {
      elemId?: string
      hostId: string
      insertAtStart: boolean
      templateId: string
    },
  ) {
    this.hostElem = document.getElementById(params.hostId)! as T
    this.templateElem = document.getElementById(params.templateId)! as HTMLTemplateElement
    const importNode = document.importNode(this.templateElem.content, true)
    this.elem = importNode.firstElementChild as U
    if (params.elemId) {
      this.elem.id = params.elemId
    }
    this.attach(params.insertAtStart)
  }

  private attach (atStart: boolean) {
    this.hostElem.insertAdjacentElement(atStart ? 'afterbegin' : 'beforeend', this.elem)
  }

  abstract configure?(): void

  abstract renderContent?(): void
}

export default BaseComponent
