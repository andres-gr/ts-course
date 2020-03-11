enum ProjectStatus {
  Active = 'active',
  Finished = 'finished',
}

class Project {
  description: string

  id: string

  people: number

  status: ProjectStatus

  title: string

  constructor (protected params: {
    description: string
    people: number
    status?: ProjectStatus
    title: string
  }) {
    this.id = Math.random().toString()
    this.description = params.description
    this.people = params.people
    this.status = params.status || ProjectStatus.Active
    this.title = params.title
  }
}

export {
  Project,
  ProjectStatus,
}
