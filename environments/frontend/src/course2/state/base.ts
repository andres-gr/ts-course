type Listener<T> = (items: T[]) => void

abstract class State<S> {
  protected listeners: Listener<S>[] = []
  
  addListener (fn: Listener<S>) {
    this.listeners.push(fn)
  }
}

export default State
