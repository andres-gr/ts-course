import ProjectInput from './components/project-input'
import ProjectList from './components/project-list'
import { ProjectStatus } from './models/project'

const project = new ProjectInput()
export const activeProjectList = new ProjectList(ProjectStatus.Active)
export const finishedProjectList = new ProjectList(ProjectStatus.Finished)

export default project
