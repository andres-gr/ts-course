import autobind from '../decorators/autobind'
import { DragTarget } from '../models/drag-drop'
import {
  Project,
  ProjectStatus,
} from '../models/project'
import { projectState } from '../state/project'
import BaseComponent from './base-component'
import ProjectItem from './project-item'

class ProjectList extends BaseComponent<HTMLDivElement, HTMLElement> implements DragTarget {
  projects: Project[] = []

  constructor (
    private type: ProjectStatus,
  ) {
    super({
      elemId        : `${type}-projects`,
      hostId        : 'app',
      insertAtStart : false,
      templateId    : 'project-list',
    })
    this.configure()
    this.renderContent()
  }

  @autobind
  handleDragDrop (e: DragEvent) {
    const id = e.dataTransfer!.getData('text/plain')
    projectState.moveProject({
      id,
      status: this.type,
    })
  }

  @autobind
  handleDragLeave () {
    const elem = this.elem.querySelector('ul')!
    elem.classList.remove('droppable')
  }

  @autobind
  handleDragOver (e: DragEvent) {
    if (e.dataTransfer?.types[0] === 'text/plain') {
      e.preventDefault()
      const elem = this.elem.querySelector('ul')!
      elem.classList.add('droppable')
    }
  }

  configure () {
    this.elem.addEventListener('dragleave', this.handleDragLeave)
    this.elem.addEventListener('dragover', this.handleDragOver)
    this.elem.addEventListener('drop', this.handleDragDrop)

    projectState.addListener(projects => {
      this.projects = projects.filter(project => project.status === this.type)
      this.renderProjects()
    })
  }

  renderContent () {
    const listId = `${this.type}-projects-list`
    this.elem.querySelector('ul')!.id = listId
    this.elem.querySelector('h2')!.textContent = `${this.type.toUpperCase()} PROJECTS`
  }

  private renderProjects () {
    const list = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement
    list.innerHTML = ''
    this.projects.forEach(project => new ProjectItem({
      hostId: this.elem.querySelector('ul')!.id,
      project,
    }))
  }
}

export default ProjectList
