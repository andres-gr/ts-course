import autobind from '../decorators/autobind'
import { Draggable } from '../models/drag-drop'
import { Project } from '../models/project'
import BaseComponent from './base-component'

class ProjectItem extends BaseComponent<HTMLUListElement, HTMLLIElement> implements Draggable {
  private project: Project

  constructor (params: {
    hostId: string
    project: Project
  }) {
    super({
      elemId        : params.project.id,
      hostId        : params.hostId,
      insertAtStart : false,
      templateId    : 'single-project',
    })
    this.project = params.project
    this.configure()
    this.renderContent()
  }

  get persons () {
    const { people } = this.project
    return people > 1 ? `${people} persons` : '1 person'
  }

  @autobind
  handleDragEnd (e: DragEvent) {
    console.log(this, e)
  }

  @autobind
  handleDragStart (e: DragEvent) {
    e.dataTransfer!.setData('text/plain', this.project.id)
    e.dataTransfer!.effectAllowed = 'move'
  }

  configure () {
    this.elem.addEventListener('dragend', this.handleDragEnd)
    this.elem.addEventListener('dragstart', this.handleDragStart)
  }

  renderContent () {
    this.elem.querySelector('h2')!.textContent = this.project.title
    this.elem.querySelector('h3')!.textContent = `${this.persons} assigned`
    this.elem.querySelector('p')!.textContent = this.project.description
  }
}

export default ProjectItem
