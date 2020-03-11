import {
  Project,
  ProjectStatus,
} from '../models/project'
import State from './base'

class ProjectState extends State<Project> {
  private static instance: ProjectState

  static getInstance () {
    if (this.instance) return this.instance
    this.instance = new ProjectState()
    return this.instance
  }

  private projects: Project[] = []

  private constructor () {
    super()
  }

  private updateListeners () {
    this.listeners.forEach(fn => {
      fn(this.projects.slice())
    })
  }

  addProject ({
    description,
    people,
    title,
  }: Omit<Project, 'id'>) {
    const project = new Project({
      description,
      people,
      title,
    })
    this.projects.push(project)
    this.updateListeners()
  }

  moveProject (params: {
    id: string
    status: ProjectStatus
  }) {
    const project = this.projects.find(({ id }) => params.id === id)
    if (project && project.status !== params.status) {
      project.status = params.status
      this.updateListeners()
    }
  }
}

const projectState = ProjectState.getInstance()

export {
  projectState,
  ProjectState,
}
