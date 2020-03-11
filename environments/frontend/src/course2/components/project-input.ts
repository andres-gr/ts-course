/* eslint-disable no-alert */
import autobind from '../decorators/autobind'
import { Project } from '../models/project'
import { projectState } from '../state/project'
import {
  validate,
  ValidateObj,
} from '../util/validation'
import BaseComponent from './base-component'

class ProjectInput extends BaseComponent<HTMLDivElement, HTMLFormElement> {
  titleInput: HTMLInputElement

  descriptionInput: HTMLInputElement

  peopleInput: HTMLInputElement

  constructor () {
    super({
      elemId        : 'user-input',
      hostId        : 'app',
      insertAtStart : true,
      templateId    : 'project-input',
    })
    this.titleInput = document.querySelector('#title')! as HTMLInputElement
    this.descriptionInput = document.querySelector('#description')! as HTMLInputElement
    this.peopleInput = document.querySelector('#people')! as HTMLInputElement
    this.configure()
  }

  @autobind
  private handleSubmit (e: Event) {
    e.preventDefault()
    const userInput = this.gatherUserInput()
    if (Array.isArray(userInput)) {
      const [
        title,
        description,
        people,
      ] = userInput
      const project = new Project({
        description,
        people,
        title,
      })
      projectState.addProject(project)
      this.clearInputs()
    }
  }

  private gatherUserInput (): [string, string, number] | void {
    const title = this.titleInput.value,
          desc = this.descriptionInput.value,
          people = +this.peopleInput.value
    const titleValidate: ValidateObj = {
            required : true,
            value    : title,
          },
          descValidate: ValidateObj = {
            minLen   : 5,
            required : true,
            value    : desc,
          },
          peopleValidate: ValidateObj = {
            max      : 5,
            min      : 1,
            required : true,
            value    : people,
          }
    if (!validate(titleValidate) || !validate(descValidate) || !validate(peopleValidate)) {
      alert('Invalid input!')
      return
    }
    return [
      title,
      desc,
      people,
    ]
  }
  
  private clearInputs () {
    this.titleInput.value = ''
    this.descriptionInput.value = ''
    this.peopleInput.value = ''
  }

  configure () {
    this.elem.addEventListener('submit', this.handleSubmit)
  }

  renderContent: undefined
}

export default ProjectInput
