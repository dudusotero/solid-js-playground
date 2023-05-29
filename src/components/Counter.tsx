import { createEffect, createSignal, type Component } from 'solid-js'

type Props = {
  initialCount?: number
}

const Counter: Component<Props> = (props) => {
  const [count, setCount] = createSignal(props.initialCount || 0)

  const interval = setInterval(() => {
    setCount(count() + 1)
  }, 1000)

  createEffect(() => {
    if (count() >= 10) clearInterval(interval)
  })

  return (
    <div>
      <h1>{count()}</h1>
    </div>
  )
}

export default Counter
