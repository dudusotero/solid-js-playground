import { createContext, useContext, type ParentComponent } from 'solid-js'
import { createStore } from 'solid-js/store'

export type CounterContextState = {
  readonly count: number
}
export type CounterContextValue = [
  state: CounterContextState,
  actions: {
    setCount: (count: number) => void
    start: () => void
    stop: () => void
  }
]

const defaultState: CounterContextState = {
  count: 0,
}

const CounterContext = createContext<CounterContextValue>([
  defaultState,
  {
    setCount: () => undefined,
    start: () => undefined,
    stop: () => undefined,
  },
])

export const CounterProvider: ParentComponent = (props) => {
  const [state, setState] = createStore({
    count: defaultState.count,
  })
  let interval: NodeJS.Timer | null = null

  const setCount = (count: number) => setState('count', count)
  const start = () => {
    if (interval) return
    interval = setInterval(() => {
      setCount(state.count + 1)
    }, 1000)
  }
  const stop = () => {
    if (!interval) return
    clearInterval(interval)
    interval = null
  }

  start()

  return (
    <CounterContext.Provider value={[state, { setCount, start, stop }]}>
      {props.children}
    </CounterContext.Provider>
  )
}

export const useCounter = () => useContext(CounterContext)
