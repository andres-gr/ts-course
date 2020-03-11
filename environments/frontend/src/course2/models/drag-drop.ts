export interface Draggable {
  handleDragEnd (e: DragEvent): void
  handleDragStart (e: DragEvent): void
}

export interface DragTarget {
  handleDragDrop (e: DragEvent): void
  handleDragLeave (e: DragEvent): void
  handleDragOver (e: DragEvent): void
}
